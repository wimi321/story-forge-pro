#!/usr/bin/env node
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import dotenv from 'dotenv';
import { MODES, createCliArgs, defaultStarterPrompt, getAppEnv } from '../src-core/storyForgeCli.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

if (process.argv[2] === '--help' || process.argv[2] === '-h') {
  printHelp();
  process.exit(0);
}

for (const envFile of ['.env.local', '.env']) {
  dotenv.config({ path: path.join(root, envFile), override: envFile === '.env.local' });
}

const mode = pickMode(process.argv[2]);
const userArgs = mode.consumedArg ? process.argv.slice(3) : process.argv.slice(2);
const env = getAppEnv(root);

if (!env.ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY. Run `npm run setup` first.');
  process.exit(1);
}

const { args, mergedPromptPath } = createCliArgs({
  root,
  modeName: mode.name,
  prompt: userArgs.length > 0 ? userArgs.join(' ') : defaultStarterPrompt(mode.name),
  model: env.STORY_FORGE_MODEL,
  permissionMode: env.STORY_FORGE_PERMISSION_MODE
});

const child = spawn(process.execPath, args, {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: {
    ...env,
    STORY_FORGE_MODE: mode.name
  }
});

child.on('close', code => {
  fs.rmSync(mergedPromptPath, { force: true });
  process.exit(code ?? 0);
});

child.on('error', error => {
  console.error('Failed to launch Story Forge Pro:', error.message);
  process.exit(1);
});

function pickMode(arg) {
  if (arg === 'novel') return { name: 'novel', consumedArg: true };
  if (arg === 'screenplay') return { name: 'screenplay', consumedArg: true };
  if (arg === 'outline') return { name: 'outline', consumedArg: true };
  return { name: 'novel', consumedArg: false };
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
  ANTHROPIC_API_KEY             Required API key
  STORY_FORGE_MODEL             Optional model alias, default: sonnet
  STORY_FORGE_PERMISSION_MODE   Optional permission mode, default: default
  CLAUDE_CODE_CLI_PATH          Optional absolute path to Claude Code cli.js

Desktop:
  npm run desktop               Launch the desktop app
`);
}
