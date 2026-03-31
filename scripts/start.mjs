import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline/promises';
import { spawn } from 'node:child_process';
import { stdin as input, stdout as output } from 'node:process';

const root = process.cwd();
const packs = JSON.parse(fs.readFileSync(path.join(root, 'config', 'starter-packs.json'), 'utf8'));
const rl = readline.createInterface({ input, output });

try {
  const type = await choose('你想开始哪种项目？', [
    ['novel', '小说'],
    ['screenplay', '剧本']
  ]);

  const presets = Object.entries(packs[type]);
  const preset = await choose('选一个最接近你的方向：', presets.map(([key, value]) => [key, value.label]));
  const createWorkspace = await choose('要不要顺手创建项目文件夹？', [
    ['yes', '要，帮我创建'],
    ['no', '先不创建，直接进入']
  ]);

  if (createWorkspace === 'yes') {
    const suggested = type === 'novel' ? 'my-first-story' : 'my-first-script';
    const name = (await rl.question(`项目名（直接回车用 ${suggested}）: `)).trim() || suggested;
    await run('node', ['scripts/create-project.mjs', type, name]);
  }

  const extra = (await rl.question('补一句你想写的感觉或灵感（可留空）: ')).trim();
  const prompt = [packs[type][preset].prompt, extra].filter(Boolean).join('\n补充要求：');
  const script = 'bin/story-forge.js';
  await run('node', [script, type, prompt]);
} finally {
  rl.close();
}

async function choose(question, options) {
  console.log(`\n${question}`);
  options.forEach(([, label], index) => console.log(`${index + 1}. ${label}`));
  while (true) {
    const answer = (await rl.question('请输入数字: ')).trim();
    const index = Number(answer) - 1;
    if (Number.isInteger(index) && options[index]) return options[index][0];
    console.log('输入无效，请输入上面的数字。');
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', cwd: root, env: process.env });
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Command failed: ${command} ${args.join(' ')}`)));
    child.on('error', reject);
  });
}
