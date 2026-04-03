import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const appDir = path.join(os.homedir(), '.story-forge-pro');
const configPath = path.join(appDir, 'config.json');

export function ensureAppDir() {
  fs.mkdirSync(appDir, { recursive: true });
  return appDir;
}

export function loadConfig() {
  ensureAppDir();
  if (!fs.existsSync(configPath)) {
    return {
      anthropicApiKey: '',
      model: 'sonnet',
      permissionMode: 'default',
      lastWorkspace: '',
      lastMode: 'novel',
      lastPreset: ''
    };
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

export function saveConfig(nextConfig) {
  ensureAppDir();
  fs.writeFileSync(configPath, JSON.stringify(nextConfig, null, 2), 'utf8');
  return nextConfig;
}

export { appDir, configPath };
