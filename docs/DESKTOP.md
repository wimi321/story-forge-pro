# Desktop App

Story Forge Pro now includes a desktop application built with Electron.

## What the Desktop App Gives You

- clickable UI instead of terminal-first workflow
- built-in settings form for `ANTHROPIC_API_KEY`
- one-click workspace creation
- mode switching for novel, screenplay, and outline
- real-time output panel
- multi-platform packaging scripts

## Local Launch

```bash
npm run desktop
```

## Build Commands

Build for the current platform:

```bash
npm run dist
```

Build macOS packages:

```bash
npm run dist:mac
```

Build Windows packages:

```bash
npm run dist:win
```

Build Linux packages:

```bash
npm run dist:linux
```

## Verified in This Repository

On this machine, the desktop app was launched successfully and a macOS app bundle was built at:

```text
release/mac-arm64/Story Forge Pro.app
```

## Notes

- Windows and Linux package scripts are configured, but cross-platform artifacts should be verified on their respective target environments.
- macOS notarization is not configured by default.
