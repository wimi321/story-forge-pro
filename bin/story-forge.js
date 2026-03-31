#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

if (process.argv[2] === '--help' || process.argv[2] === '-h') {
  printHelp();
  process.exit(0);
}

for (const envFile of ['.env.local', '.env']) {
  const envPath = path.join(root, envFile);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: envFile === '.env.local' });
  }
}

const mode = pickMode(process.argv[2]);
const userArgs = mode.consumedArg ? process.argv.slice(3) : process.argv.slice(2);
const promptFiles = {
  novel: path.join(root, 'prompts', 'novel.md'),
  screenplay: path.join(root, 'prompts', 'screenplay.md'),
  outline: path.join(root, 'prompts', 'outline.md')
};

const cliPath = resolveClaudeCli(root);
if (!cliPath) {
  console.error('Story Forge Pro could not find Claude Code. Run `npm install` first.');
  process.exit(1);
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY. Run `npm run setup` first.');
  process.exit(1);
}

const agentsPath = path.join(root, 'config', 'agents.json');
const agents = fs.readFileSync(agentsPath, 'utf8');
const mergedPromptPath = buildMergedPromptFile([
  path.join(root, 'prompts', 'shared.md'),
  promptFiles[mode.name]
]);

const starterPrompt = userArgs.length > 0 ? userArgs.join(' ') : defaultStarterPrompt(mode.name);
const baseArgs = [
  cliPath,
  '--append-system-prompt-file', mergedPromptPath,
  '--agents', agents,
  '--model', process.env.STORY_FORGE_MODEL || 'sonnet',
  '--permission-mode', process.env.STORY_FORGE_PERMISSION_MODE || 'default',
  '--name', `Story Forge Pro · ${mode.label}`,
  starterPrompt
];

const child = spawn(process.execPath, baseArgs, {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: {
    ...process.env,
    STORY_FORGE_MODE: mode.name
  }
});

child.on('exit', code => process.exit(code ?? 0));
child.on('error', error => {
  console.error('Failed to launch Story Forge Pro:', error.message);
  process.exit(1);
});

function pickMode(arg) {
  if (arg === 'novel') return { name: 'novel', label: 'Novel', consumedArg: true };
  if (arg === 'screenplay') return { name: 'screenplay', label: 'Screenplay', consumedArg: true };
  if (arg === 'outline') return { name: 'outline', label: 'Outline', consumedArg: true };
  return { name: 'novel', label: 'Novel', consumedArg: false };
}

function resolveClaudeCli(projectRoot) {
  const candidates = [
    process.env.CLAUDE_CODE_CLI_PATH,
    path.join(projectRoot, 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js'),
    path.join(projectRoot, 'claude-code-sourcemap_副本2', 'package', 'cli.js')
  ].filter(Boolean);

  return candidates.find(candidate => fs.existsSync(candidate));
}

function buildMergedPromptFile(files) {
  const content = files
    .map(file => fs.readFileSync(file, 'utf8').trim())
    .filter(Boolean)
    .join('\n\n');
  const tempPath = path.join(os.tmpdir(), `story-forge-${mode.name}-prompt.md`);
  fs.writeFileSync(tempPath, `${content}\n`, 'utf8');
  return tempPath;
}

function defaultStarterPrompt(modeName) {
  const prompts = {
    novel: '你现在是我的专业中文小说总编与写作搭档。先不要直接开写，先用适合小白的方式，带我在 3 步内确定题材、卖点和主角冲突，然后再给我一份可直接开写的执行方案。',
    screenplay: '你现在是我的专业编剧室主编。先用适合小白的方式，帮我快速确定一句话梗概、角色冲突和核心看点，再整理成可直接写剧本的 beat sheet。',
    outline: '你现在是我的故事架构师。请先帮我把创意整理成一个清晰、可执行、适合新手推进的故事大纲。'
  };

  return prompts[modeName];
}

function printHelp() {
  console.log(`
Story Forge Pro

Usage:
  node bin/story-forge.js [novel|screenplay|outline] [prompt]

Examples:
  npm run novel
  npm run screenplay
  npm run outline
  node bin/story-forge.js novel 写一个高概念悬疑小说项目

Environment variables:
  ANTHROPIC_API_KEY        Required API key
  STORY_FORGE_MODEL        Optional model alias, default: sonnet
  STORY_FORGE_PERMISSION_MODE Optional permission mode, default: default
  CLAUDE_CODE_CLI_PATH     Optional absolute path to Claude Code cli.js
`);
}
