<div align="center">
  <h1>Story Forge Pro</h1>
  <p><a href="README.en.md">English</a> | <a href="README.md">简体中文</a> | <a href="README.ja-JP.md">日本語</a></p>
  <p>
    <a href="https://github.com/wimi321/story-forge-pro/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/wimi321/story-forge-pro/actions/workflows/ci.yml/badge.svg"></a>
    <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green.svg"></a>
    <a href="https://github.com/wimi321/story-forge-pro"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-story--forge--pro-black?logo=github"></a>
  </p>
  <img src="assets/story-forge-banner.svg" alt="Story Forge Pro Banner" width="100%" />
</div>

> A one-click AI writing studio for beginners who want professional novel and screenplay workflows.

## At A Glance

| What you want | What Story Forge Pro does |
|---|---|
| I do not know prompting | Guided flow through `npm start` or the desktop app |
| I want to write a novel | Helps with premise, characters, conflict, outline, then drafting |
| I want to write a screenplay | Helps with logline, beat sheet, scene list, then scene writing |
| I do not want generic AI fluff | Pushes toward outlines, cards, scenes, and revision assets |
| I do not want terminal friction | Includes a clickable desktop UI |

## Why It Fits Beginners Better

- no prompt-engineering knowledge required
- no story-theory prerequisite required
- no manual project setup required
- no pressure to write a whole book on turn one
- defaults to small, usable next steps

## How It Differs From Generic AI Writing Tools

| Dimension | Generic AI writing tools | Story Forge Pro |
|---|---|---|
| Beginner onboarding | assumes the user already knows what to ask | assumes the user does not, and guides first |
| Output style | often long blocks of text | prioritizes outlines, scenes, characters, and checklists |
| Novel workflow | often just continues prose | builds premise, characters, conflict, and chapter flow |
| Screenplay workflow | often weak on beats and scenes | starts with logline, beat sheet, and scene list |
| Project structure | often just chat history | creates reusable project folders and templates |
| Product form | often chat-only | supports guided CLI and desktop UI |
| Beginner support | asks the user to decide everything | leads the user step by step |

## What Is Already Included

- guided CLI mode via `npm start`
- desktop app launch via `npm run desktop`
- novel, screenplay, and outline workflows
- project scaffolding
- genre starter packs
- multi-platform packaging scripts
- multi-language docs

## Desktop Preview

<img src="assets/desktop-preview.svg" alt="Story Forge Pro Desktop Preview" width="100%" />

### Novel Mode Preview

<img src="assets/novel-mode-preview.svg" alt="Story Forge Pro Novel Mode Preview" width="100%" />

### Screenplay Mode Preview

<img src="assets/screenplay-mode-preview.svg" alt="Story Forge Pro Screenplay Mode Preview" width="100%" />

## Documentation

- [Beginner Guide](docs/BEGINNER-GUIDE.md)
- [Beginner Modes](docs/BEGINNER-MODES.md)
- [Desktop App](docs/DESKTOP.md)
- [Benchmark Notes](docs/BENCHMARK.md)
- [FAQ](docs/FAQ.md)
- [Roadmap](docs/ROADMAP.md)
- [Showcase](docs/SHOWCASE.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Changelog](CHANGELOG.md)

## What It Does

Story Forge Pro turns Claude Code into a focused creative-writing workstation.
Instead of giving users a generic AI chat box, it provides a guided production flow for:

- story positioning
- character and conflict design
- novel outlining
- screenplay beat sheets
- chapter and scene drafting
- dialogue polishing
- market-aware revision

## Why It Exists

Most AI writing tools fail in one of two ways:

1. They expect the user to already know how to prompt.
2. They generate pretty paragraphs, but they do not manage a real writing pipeline.

Story Forge Pro is built to help complete beginners move from idea to execution.

## Features

- One-click launchers for macOS and Windows
- Desktop UI for mode picking, settings, workspace creation, and live output
- Beginner-friendly setup wizard
- Dedicated novel, screenplay, and outline modes
- Specialist writing agents for structure, character, dialogue, scenes, and market fit
- Reusable project templates
- GitHub-ready repo structure with CI and issue templates
- Multi-language documentation

## Entry Points

| Situation | Best command |
|---|---|
| Complete beginner | `npm start` |
| Prefer desktop UI | `npm run desktop` |
| Go straight into novel work | `npm run novel` |
| Go straight into screenplay work | `npm run screenplay` |
| Planning only | `npm run outline` |

## Quick Start

Repository:

```bash
git clone https://github.com/wimi321/story-forge-pro.git
cd story-forge-pro
```

### 1. Install Node.js

Use `Node.js 18+`.

### 2. Install dependencies

```bash
npm install
```

### 3. Run setup

```bash
npm run setup
```

You will be asked for:

- `ANTHROPIC_API_KEY`
- default model alias
- permission mode

### 4. Launch a mode

If you are a total beginner, start here:

```bash
npm start
```

This guided mode walks you through:

- novel or screenplay
- genre direction
- whether to create a project folder
- then launches the right workflow automatically

If you want the desktop app directly:

```bash
npm run desktop
```

Novel mode:

```bash
npm run novel
```

Screenplay mode:

```bash
npm run screenplay
```

Outline mode:

```bash
npm run outline
```

macOS launchers:

- `launch-novel.command`
- `launch-screenplay.command`

Windows launchers:

- `launch-novel.bat`
- `launch-screenplay.bat`

## Project Scaffolding

Create a novel workspace:

```bash
npm run new:novel -- my-book
```

Create a screenplay workspace:

```bash
npm run new:screenplay -- my-show
```

## Examples

- [Novel thriller brief](examples/novel-thriller/brief.md)
- [Short screenplay logline](examples/screenplay-short/logline.md)

## Typical Flow

### For novel users

1. pick a direction
2. create a workspace
3. write one sentence of intent
4. get characters and outline first
5. draft chapter by chapter

### For screenplay users

1. pick short film, feature, or vertical drama
2. create a script workspace
3. write one sentence of premise
4. get a beat sheet and scene list
5. draft scene by scene

## Repo Layout

```text
bin/         launchers
config/      specialist agents
prompts/     writing system prompts
templates/   novel and screenplay templates
scripts/     setup and project automation
.github/     CI and issue templates
```

## Legal Notes

This repository publishes only the Story Forge Pro wrapper layer.
It is not affiliated with Anthropic.
Any reverse-engineering or research artifacts in the local working directory are excluded from version control.

See [NOTICE.md](NOTICE.md) for details.

## Packaging

```bash
npm run desktop
npm run dist
npm run dist:mac
npm run dist:win
npm run dist:linux
```

Verified locally in this repository:

- desktop app launch
- macOS app bundle at `release/mac-arm64/Story Forge Pro.app`

## Why It Can Become A High-Star Project

- truly beginner-first, not just AI-branded
- supports both novels and screenplays
- includes a desktop app, not only a CLI wrapper
- ships with templates, starter packs, and guided workflows
- easy to extend for genre-specific writing pipelines
