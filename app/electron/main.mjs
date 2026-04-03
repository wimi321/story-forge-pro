import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { randomUUID } from 'node:crypto';
import { loadConfig, saveConfig } from '../shared/configStore.mjs';
import { loadJson, runCliStreaming } from '../../src-core/storyForgeCli.mjs';
import { createWorkspaceFromTemplate } from '../../src-core/workspace.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
let mainWindow;
let runningChild = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1480,
    height: 960,
    minWidth: 1180,
    minHeight: 820,
    backgroundColor: '#f3e7d7',
    title: 'Story Forge Pro',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.loadFile(path.join(root, 'app', 'ui', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('app:bootstrap', async () => {
  const config = loadConfig();
  const packs = loadJson(root, 'config/starter-packs.json');
  return {
    root,
    config,
    packs,
    defaults: {
      workspaceBase: path.join(root, 'workspace')
    }
  };
});

ipcMain.handle('settings:save', async (_event, payload) => {
  const nextConfig = saveConfig({
    ...loadConfig(),
    ...payload
  });
  return nextConfig;
});

ipcMain.handle('dialog:chooseFolder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory']
  });

  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle('workspace:create', async (_event, payload) => {
  const result = createWorkspaceFromTemplate({ root, ...payload });
  const current = loadConfig();
  saveConfig({ ...current, lastWorkspace: result.targetDir, lastMode: payload.kind });
  return result;
});

ipcMain.handle('story:run', async (_event, payload) => {
  if (runningChild) {
    throw new Error('A story run is already in progress. Please wait or cancel it first.');
  }

  const currentConfig = loadConfig();
  const envOverrides = {
    ANTHROPIC_API_KEY: payload.anthropicApiKey || currentConfig.anthropicApiKey,
    STORY_FORGE_MODEL: payload.model || currentConfig.model || 'sonnet',
    STORY_FORGE_PERMISSION_MODE: payload.permissionMode || currentConfig.permissionMode || 'default'
  };

  if (!envOverrides.ANTHROPIC_API_KEY) {
    throw new Error('Please enter your ANTHROPIC_API_KEY in Settings first.');
  }

  const packs = loadJson(root, 'config/starter-packs.json');
  const presetPrompt = payload.preset ? packs[payload.mode]?.[payload.preset]?.prompt : '';
  const finalPrompt = [presetPrompt, payload.prompt].filter(Boolean).join('\n\n补充要求：');
  const sessionId = randomUUID();

  return await new Promise((resolve, reject) => {
    mainWindow.webContents.send('story:event', { type: 'status', message: 'Story run started...' });
    try {
      runningChild = runCliStreaming({
        root,
        modeName: payload.mode,
        prompt: finalPrompt,
        cwd: payload.workspace || root,
        envOverrides,
        model: envOverrides.STORY_FORGE_MODEL,
        permissionMode: envOverrides.STORY_FORGE_PERMISSION_MODE,
        sessionId
      }, {
        onStdout(text) {
          mainWindow.webContents.send('story:event', { type: 'stdout', text });
        },
        onStderr(text) {
          mainWindow.webContents.send('story:event', { type: 'stderr', text });
        },
        onClose(code) {
          runningChild = null;
          mainWindow.webContents.send('story:event', { type: 'done', code, sessionId });
          resolve({ ok: code === 0, code, sessionId });
        },
        onError(error) {
          runningChild = null;
          mainWindow.webContents.send('story:event', { type: 'error', message: error.message });
          reject(error);
        }
      });
    } catch (error) {
      runningChild = null;
      reject(error);
    }
  });
});

ipcMain.handle('story:cancel', async () => {
  if (!runningChild) return { ok: true, cancelled: false };
  runningChild.kill('SIGTERM');
  runningChild = null;
  mainWindow.webContents.send('story:event', { type: 'status', message: 'Story run cancelled.' });
  return { ok: true, cancelled: true };
});
