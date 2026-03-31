# Story Forge Pro

[English](README.en.md) | [简体中文](README.md) | [日本語](README.ja-JP.md)

[![CI](https://github.com/wimi321/story-forge-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/wimi321/story-forge-pro/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Repo](https://img.shields.io/badge/GitHub-story--forge--pro-black?logo=github)](https://github.com/wimi321/story-forge-pro)

> A one-click AI writing studio for beginners who want professional novel and screenplay workflows.

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
- Beginner-friendly setup wizard
- Dedicated novel, screenplay, and outline modes
- Specialist writing agents for structure, character, dialogue, scenes, and market fit
- Reusable project templates
- GitHub-ready repo structure with CI and issue templates
- Multi-language documentation

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
