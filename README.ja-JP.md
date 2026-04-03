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

> 小説と脚本のために最適化された、初心者向けのワンクリック AI ライティングスタジオです。

## ひと目でわかること

| やりたいこと | Story Forge Pro がすること |
|---|---|
| プロンプトがわからない | `npm start` やデスクトップ UI で順番に案内 |
| 小説を書きたい | 企画、人物、対立、構成、本文へと段階的に進行 |
| 脚本を書きたい | logline、beat sheet、scene list を先に整理 |
| AI の空疎な文章は嫌だ | 大綱、カード、場面、改稿素材を優先して出力 |
| ターミナルは苦手 | クリック中心のデスクトップ版を用意 |

## 初心者に向いている理由

- prompt engineering を前提にしない
- 物語理論を先に知らなくてもよい
- 手動でプロジェクト構造を作らなくてよい
- 最初から長文を書かせない
- 小さく進められる次の一手を優先する

## 一般的な AI ライティングツールとの違い

| 観点 | 一般的な AI ツール | Story Forge Pro |
|---|---|---|
| 初心者導線 | 何を頼むか知っている前提 | わからなくても順番に案内 |
| 出力の形 | 長い文章をそのまま返しがち | 大綱、場面、人物、チェックリストを優先 |
| 小説向け支援 | 文章の続きに寄りがち | 企画、人物、対立、章構成まで整理 |
| 脚本向け支援 | beat や場面分解が弱い | logline、beat sheet、scene list から始める |
| プロジェクト管理 | チャット履歴中心 | 保存しやすいプロジェクト構造を作る |
| 使い方 | チャット中心 | ガイド付き CLI とデスクトップ UI の両方 |
| 初心者への姿勢 | ユーザーに決断を委ねがち | 一歩ずつ次の行動を提示する |

## デスクトップ版プレビュー

<img src="assets/desktop-preview.svg" alt="Story Forge Pro Desktop Preview" width="100%" />

### 小説モードプレビュー

<img src="assets/novel-mode-preview.svg" alt="Story Forge Pro Novel Mode Preview" width="100%" />

### 脚本モードプレビュー

<img src="assets/screenplay-mode-preview.svg" alt="Story Forge Pro Screenplay Mode Preview" width="100%" />

## ドキュメント

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

## 概要

Story Forge Pro は Claude Code を、創作向けの実務ワークステーションとして再構成したプロジェクトです。

対応内容:

- 企画立案
- キャラクター設計
- プロット構築
- 小説執筆
- 脚本ビート作成
- シーン設計
- セリフ改善
- 商業性を意識した改稿

## 特徴

- macOS / Windows 向けワンクリック起動
- モード選択・設定保存・プロジェクト作成・出力表示を備えたデスクトップ UI
- 初心者向けセットアップウィザード
- 小説 / 脚本 / アウトラインの 3 モード
- 役割別エージェントを標準搭載
- 再利用しやすいテンプレート
- GitHub 向けの CI / Issue Template を同梱
- 多言語 README

## 入口の選び方

| 状況 | おすすめ |
|---|---|
| 完全な初心者 | `npm start` |
| ボタン中心で使いたい | `npm run desktop` |
| すぐに小説を書きたい | `npm run novel` |
| すぐに脚本を書きたい | `npm run screenplay` |
| 先に企画だけ進めたい | `npm run outline` |

## クイックスタート

Repository:

```bash
git clone https://github.com/wimi321/story-forge-pro.git
cd story-forge-pro
```

### 1. Node.js をインストール

`Node.js 18+` が必要です。

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 初期設定

```bash
npm run setup
```

### 4. 起動

完全な初心者なら、まずはこちらです:

```bash
npm start
```

このガイドモードでは、種類・方向・プロジェクト作成の有無を順番に選ぶだけで始められます。

デスクトップ版を直接起動する場合:

```bash
npm run desktop
```

小説モード:

```bash
npm run novel
```

脚本モード:

```bash
npm run screenplay
```

アウトラインモード:

```bash
npm run outline
```

## 法的注意

このリポジトリに含まれるのは Story Forge Pro 独自のラッパー層のみです。
Anthropic の公式プロジェクトではありません。
詳細は [NOTICE.md](NOTICE.md) を参照してください。

## パッケージ化

```bash
npm run desktop
npm run dist
npm run dist:mac
npm run dist:win
npm run dist:linux
```

## このプロジェクトが伸びる理由

- 初心者向けに本気で設計されている
- 小説と脚本の両方を扱える
- デスクトップ版がある
- テンプレートと starter packs を同梱
- 今後ジャンル別に拡張しやすい
