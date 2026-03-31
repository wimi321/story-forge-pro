import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const root = process.cwd();
const envPath = path.join(root, '.env.local');

if (fs.existsSync(envPath)) {
  console.log('.env.local already exists. You can edit it directly if needed.');
  process.exit(0);
}

const rl = readline.createInterface({ input, output });

try {
  const apiKey = (await rl.question('Paste your ANTHROPIC_API_KEY: ')).trim();
  if (!apiKey) {
    console.error('Setup cancelled: API key is required.');
    process.exit(1);
  }

  const model = ((await rl.question('Default model alias (press Enter for sonnet): ')).trim() || 'sonnet');
  const permissionMode = ((await rl.question('Permission mode (press Enter for default): ')).trim() || 'default');

  const content = [
    `ANTHROPIC_API_KEY=${apiKey}`,
    `STORY_FORGE_MODEL=${model}`,
    `STORY_FORGE_PERMISSION_MODE=${permissionMode}`,
    ''
  ].join('\n');

  fs.writeFileSync(envPath, content, 'utf8');
  console.log('Setup complete. Next step: npm run novel');
} finally {
  rl.close();
}
