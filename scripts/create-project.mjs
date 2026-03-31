import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const kind = process.argv[2];
const rawName = process.argv[3] || (kind === 'screenplay' ? 'my-screenplay-project' : 'my-novel-project');
const safeName = rawName.trim().replace(/\s+/g, '-').toLowerCase();
const root = process.cwd();
const sourceDir = path.join(root, 'templates', kind);
const targetDir = path.join(root, 'workspace', safeName);

if (!kind || !fs.existsSync(sourceDir)) {
  console.error('Usage: node scripts/create-project.mjs <novel|screenplay> [project-name]');
  process.exit(1);
}

if (fs.existsSync(targetDir)) {
  console.error(`Target already exists: ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
copyDir(sourceDir, targetDir);
console.log(`Created ${kind} project at ${targetDir}`);
console.log(`Next: cd ${path.relative(root, targetDir)} && npm run ${kind === 'screenplay' ? 'screenplay' : 'novel'}`);

function copyDir(source, target) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}
