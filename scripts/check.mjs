import fs from 'node:fs';
import path from 'node:path';

const required = [
  'package.json',
  'bin/story-forge.js',
  'config/starter-packs.json',
  'prompts/shared.md',
  'prompts/beginner.md',
  'prompts/novel.md',
  'prompts/screenplay.md',
  'config/agents.json',
  'README.md',
  'scripts/start.mjs'
];

const missing = required.filter(file => !fs.existsSync(path.resolve(file)));
if (missing.length > 0) {
  console.error('Missing required files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

console.log('Story Forge Pro project check passed.');
