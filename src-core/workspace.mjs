import fs from 'node:fs';
import path from 'node:path';

export function createWorkspaceFromTemplate({ root, kind, name, parentDir }) {
  const safeName = sanitizeProjectName(name || (kind === 'screenplay' ? 'my-first-script' : 'my-first-story'));
  const sourceDir = path.join(root, 'templates', kind);
  const baseDir = parentDir || path.join(root, 'workspace');
  const targetDir = path.join(baseDir, safeName);

  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Template not found for kind: ${kind}`);
  }
  if (fs.existsSync(targetDir)) {
    throw new Error(`Target already exists: ${targetDir}`);
  }

  fs.mkdirSync(targetDir, { recursive: true });
  copyDir(sourceDir, targetDir);
  return { targetDir, safeName };
}

export function sanitizeProjectName(name) {
  return name.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_\u4e00-\u9fa5]/g, '').toLowerCase() || 'story-project';
}

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
