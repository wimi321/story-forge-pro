const state = {
  config: null,
  packs: null,
  mode: 'novel',
  running: false,
  unsubscribe: null
};

const els = {
  navItems: [...document.querySelectorAll('.nav-item')],
  views: [...document.querySelectorAll('.view')],
  status: document.getElementById('app-status'),
  modeSwitch: document.getElementById('mode-switch'),
  presetSelect: document.getElementById('preset-select'),
  presetHints: document.getElementById('preset-hints'),
  workspaceInput: document.getElementById('workspace-input'),
  chooseFolderBtn: document.getElementById('choose-folder-btn'),
  projectNameInput: document.getElementById('project-name-input'),
  createProjectBtn: document.getElementById('create-project-btn'),
  projectResult: document.getElementById('project-result'),
  promptInput: document.getElementById('prompt-input'),
  runBtn: document.getElementById('run-btn'),
  cancelBtn: document.getElementById('cancel-btn'),
  outputLog: document.getElementById('output-log'),
  apiKeyInput: document.getElementById('api-key-input'),
  modelInput: document.getElementById('model-input'),
  permissionModeSelect: document.getElementById('permission-mode-select'),
  saveSettingsBtn: document.getElementById('save-settings-btn')
};

init().catch(showFatal);

async function init() {
  wireViews();
  wireModeSwitch();
  wireActions();

  const payload = await window.storyForgeApp.bootstrap();
  state.config = payload.config;
  state.packs = payload.packs;
  state.mode = payload.config.lastMode || 'novel';

  hydrateSettings(payload.config);
  els.workspaceInput.value = payload.config.lastWorkspace || payload.defaults.workspaceBase;
  syncModeUI();
  renderPresetOptions();
  renderPresetHints();
  setStatus('准备就绪，可以开始。');

  state.unsubscribe = window.storyForgeApp.onStoryEvent(handleStoryEvent);
}

function wireViews() {
  els.navItems.forEach(button => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      els.navItems.forEach(item => item.classList.toggle('active', item === button));
      els.views.forEach(section => section.classList.toggle('active', section.id === `view-${view}`));
    });
  });
}

function wireModeSwitch() {
  els.modeSwitch.addEventListener('click', event => {
    const button = event.target.closest('.segment');
    if (!button) return;
    state.mode = button.dataset.mode;
    syncModeUI();
    renderPresetOptions();
    renderPresetHints();
  });
}

function wireActions() {
  els.chooseFolderBtn.addEventListener('click', chooseFolder);
  els.createProjectBtn.addEventListener('click', createProject);
  els.saveSettingsBtn.addEventListener('click', saveSettings);
  els.runBtn.addEventListener('click', runPrompt);
  els.cancelBtn.addEventListener('click', cancelRun);
  els.presetSelect.addEventListener('change', renderPresetHints);
}

function syncModeUI() {
  [...els.modeSwitch.querySelectorAll('.segment')].forEach(button => {
    button.classList.toggle('active', button.dataset.mode === state.mode);
  });
}

function renderPresetOptions() {
  const group = state.packs[state.mode] || {};
  const entries = Object.entries(group);
  els.presetSelect.innerHTML = '';

  if (entries.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = '当前模式没有预设';
    els.presetSelect.append(option);
    return;
  }

  entries.forEach(([key, value], index) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = value.label;
    if ((state.config.lastPreset && state.config.lastPreset === key) || index === 0) option.selected = true;
    els.presetSelect.append(option);
  });
}

function renderPresetHints() {
  const group = state.packs[state.mode] || {};
  const selected = els.presetSelect.value || Object.keys(group)[0];
  const entry = group[selected];
  els.presetHints.innerHTML = '';

  if (!entry) {
    els.presetHints.innerHTML = '<div class="quick-card"><strong>当前模式</strong><span>只做结构规划和大纲，不直接展开正文。</span></div>';
    return;
  }

  const card = document.createElement('div');
  card.className = 'quick-card';
  card.innerHTML = `<strong>${entry.label}</strong><span>${entry.prompt}</span>`;
  els.presetHints.append(card);
}

function hydrateSettings(config) {
  els.apiKeyInput.value = config.anthropicApiKey || '';
  els.modelInput.value = config.model || 'sonnet';
  els.permissionModeSelect.value = config.permissionMode || 'default';
}

async function chooseFolder() {
  const folder = await window.storyForgeApp.chooseFolder();
  if (!folder) return;
  els.workspaceInput.value = folder;
  setStatus('已选择工作目录。');
}

async function createProject() {
  try {
    const name = els.projectNameInput.value.trim() || (state.mode === 'screenplay' ? 'my-first-script' : 'my-first-story');
    const kind = state.mode === 'outline' ? 'novel' : state.mode;
    const result = await window.storyForgeApp.createWorkspace({
      kind,
      name,
      parentDir: els.workspaceInput.value.trim() || undefined
    });
    els.workspaceInput.value = result.targetDir;
    els.projectResult.textContent = `项目已创建：\n${result.targetDir}`;
    setStatus('项目骨架已创建。');
  } catch (error) {
    els.projectResult.textContent = error.message;
    setStatus('创建项目失败。');
  }
}

async function saveSettings() {
  const next = await window.storyForgeApp.saveSettings({
    anthropicApiKey: els.apiKeyInput.value.trim(),
    model: els.modelInput.value.trim() || 'sonnet',
    permissionMode: els.permissionModeSelect.value,
    lastWorkspace: els.workspaceInput.value.trim(),
    lastMode: state.mode,
    lastPreset: els.presetSelect.value
  });
  state.config = next;
  setStatus('配置已保存。');
}

async function runPrompt() {
  if (state.running) return;
  const prompt = els.promptInput.value.trim();
  if (!prompt) {
    setStatus('请先输入一句你的想法。');
    return;
  }

  await saveSettings();
  state.running = true;
  els.outputLog.textContent = '';
  setStatus('正在生成，请稍候...');

  try {
    await window.storyForgeApp.runPrompt({
      mode: state.mode,
      preset: els.presetSelect.value,
      prompt,
      workspace: els.workspaceInput.value.trim(),
      anthropicApiKey: els.apiKeyInput.value.trim(),
      model: els.modelInput.value.trim() || 'sonnet',
      permissionMode: els.permissionModeSelect.value
    });
  } catch (error) {
    appendOutput(`\n[error]\n${error.message}\n`);
    state.running = false;
    setStatus('生成失败。');
  }
}

async function cancelRun() {
  await window.storyForgeApp.cancelRun();
}

function handleStoryEvent(event) {
  if (event.type === 'stdout') appendOutput(event.text);
  if (event.type === 'stderr') appendOutput(`\n[stderr]\n${event.text}`);
  if (event.type === 'status') setStatus(event.message);
  if (event.type === 'error') {
    appendOutput(`\n[error]\n${event.message}\n`);
    state.running = false;
    setStatus('生成失败。');
  }
  if (event.type === 'done') {
    state.running = false;
    setStatus(event.code === 0 ? '生成完成。' : `任务结束，退出码 ${event.code}`);
  }
}

function appendOutput(text) {
  els.outputLog.textContent += text;
  els.outputLog.scrollTop = els.outputLog.scrollHeight;
}

function setStatus(text) {
  els.status.textContent = text;
}

function showFatal(error) {
  console.error(error);
  setStatus('启动失败。');
  els.outputLog.textContent = error.stack || error.message;
}
