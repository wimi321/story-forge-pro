import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('storyForgeApp', {
  bootstrap: () => ipcRenderer.invoke('app:bootstrap'),
  saveSettings: payload => ipcRenderer.invoke('settings:save', payload),
  chooseFolder: () => ipcRenderer.invoke('dialog:chooseFolder'),
  createWorkspace: payload => ipcRenderer.invoke('workspace:create', payload),
  runPrompt: payload => ipcRenderer.invoke('story:run', payload),
  cancelRun: () => ipcRenderer.invoke('story:cancel'),
  onStoryEvent: callback => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('story:event', listener);
    return () => ipcRenderer.removeListener('story:event', listener);
  }
});
