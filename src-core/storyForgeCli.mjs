import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';

export const MODES = {
  novel: { label: 'Novel', promptFile: 'novel.md' },
  screenplay: { label: 'Screenplay', promptFile: 'screenplay.md' },
  outline: { label: 'Outline', promptFile: 'outline.md' }
};

export function loadJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

export function resolveClaudeCli(root) {
  const candidates = [
    process.env.CLAUDE_CODE_CLI_PATH,
    path.join(root, 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js'),
    path.join(root, 'claude-code-sourcemap_副本2', 'package', 'cli.js')
  ].filter(Boolean);

  return candidates.find(candidate => fs.existsSync(candidate));
}

export function buildMergedPromptFile(root, modeName) {
  const promptFiles = [
    path.join(root, 'prompts', 'shared.md'),
    path.join(root, 'prompts', 'beginner.md'),
    path.join(root, 'prompts', MODES[modeName].promptFile)
  ];

  const content = promptFiles
    .map(file => fs.readFileSync(file, 'utf8').trim())
    .filter(Boolean)
    .join('\n\n');

  const tempPath = path.join(os.tmpdir(), `story-forge-${modeName}-${randomUUID()}.md`);
  fs.writeFileSync(tempPath, `${content}\n`, 'utf8');
  return tempPath;
}

export function defaultStarterPrompt(modeName) {
  const prompts = {
    novel: '你现在是我的专业中文小说总编与写作搭档。先不要直接开写，先用适合小白的方式，带我在 3 步内确定题材、卖点和主角冲突，然后再给我一份可直接开写的执行方案。',
    screenplay: '你现在是我的专业编剧室主编。先用适合小白的方式，帮我快速确定一句话梗概、角色冲突和核心看点，再整理成可直接写剧本的 beat sheet。',
    outline: '你现在是我的故事架构师。请先帮我把创意整理成一个清晰、可执行、适合新手推进的故事大纲。'
  };

  return prompts[modeName];
}

export function getAppEnv(root, overrides = {}) {
  const env = {
    ...process.env,
    ...overrides
  };

  for (const fileName of ['.env', '.env.local']) {
    const filePath = path.join(root, fileName);
    if (!fs.existsSync(filePath)) continue;
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      if (!line || line.trim().startsWith('#')) continue;
      const index = line.indexOf('=');
      if (index <= 0) continue;
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      if (!(key in env) || fileName === '.env.local') env[key] = value;
    }
  }

  return env;
}

export function createCliArgs({ root, modeName, prompt, model, permissionMode, sessionId, outputFormat = 'text', print = false }) {
  const cliPath = resolveClaudeCli(root);
  if (!cliPath) throw new Error('Story Forge Pro could not find Claude Code. Run npm install first or set CLAUDE_CODE_CLI_PATH.');

  const mergedPromptPath = buildMergedPromptFile(root, modeName);
  const agents = fs.readFileSync(path.join(root, 'config', 'agents.json'), 'utf8');
  const args = [
    cliPath,
    '--append-system-prompt-file', mergedPromptPath,
    '--agents', agents,
    '--model', model || 'sonnet',
    '--permission-mode', permissionMode || 'default',
    '--name', `Story Forge Pro · ${MODES[modeName].label}`
  ];

  if (print) {
    args.push('--print', '--output-format', outputFormat);
  }

  if (sessionId) {
    args.push('--session-id', sessionId);
  }

  args.push(prompt || defaultStarterPrompt(modeName));
  return { cliPath, mergedPromptPath, args };
}

export function runCliStreaming({ root, modeName, prompt, cwd, envOverrides, model, permissionMode, sessionId }, handlers = {}) {
  const env = getAppEnv(root, envOverrides);
  if (!env.ANTHROPIC_API_KEY) {
    throw new Error('Missing ANTHROPIC_API_KEY. Run setup first.');
  }

  const { args, mergedPromptPath } = createCliArgs({
    root,
    modeName,
    prompt,
    model: model || env.STORY_FORGE_MODEL,
    permissionMode: permissionMode || env.STORY_FORGE_PERMISSION_MODE,
    sessionId,
    print: true,
    outputFormat: 'text'
  });

  const child = spawn(process.execPath, args, {
    cwd: cwd || root,
    env: {
      ...env,
      STORY_FORGE_MODE: modeName
    }
  });

  child.stdout.on('data', chunk => handlers.onStdout?.(chunk.toString()));
  child.stderr.on('data', chunk => handlers.onStderr?.(chunk.toString()));
  child.on('close', code => {
    fs.rmSync(mergedPromptPath, { force: true });
    handlers.onClose?.(code ?? 0);
  });
  child.on('error', error => {
    fs.rmSync(mergedPromptPath, { force: true });
    handlers.onError?.(error);
  });

  return child;
}
