# Story Forge Pro

[English](README.en.md) | [简体中文](README.md) | [日本語](README.ja-JP.md)

> 面向小白用户的一键式小说 / 剧本创作工作台。安装后双击即可启动，底层由 Claude Code 驱动，但工作流、提示词、角色分工、模板、项目脚手架和文档全部针对“专业写作”重做。

## 它解决什么问题

大多数 AI 写作工具有两个毛病：

1. 对新手不友好，用户不知道该怎么提需求。
2. 会写几段漂亮话，但不会真的带你完成长篇小说或剧本生产流程。

`Story Forge Pro` 的目标不是“陪你聊灵感”，而是把你从一个想法，带到一套能落地执行的写作项目：

- 定位题材与卖点
- 搭建人物与冲突系统
- 产出大纲、章节卡、场景卡
- 连续推进正文或剧本
- 对对白、节奏、钩子、商业化方向做专业修订

## 核心特性

- 一键启动：`launch-novel.command` / `launch-screenplay.command` 双击即可跑起来
- 小白友好：首次运行会自动进入配置向导，保存 `.env.local`
- 专业分工：内置 `story-architect`、`character-doctor`、`dialogue-polisher`、`scene-director`、`market-editor`
- 双模式创作：小说模式、剧本模式、纯大纲模式
- 项目模板：快速生成小说工程、剧本工程
- 多语言文档：中文、英文、日文 README
- GitHub 级工程化：CI、Issue 模板、MIT License、NOTICE、规范目录结构

## 适合谁

- 从 0 开始写小说、网文、短篇、中长篇的人
- 想写电影、短剧、动画、游戏叙事的人
- 有创意但不会拆流程的人
- 想把 AI 从“聊天玩具”变成“创作生产力”的人

## 3 分钟上手

### 1. 安装 Node.js

需要 `Node.js 18+`。

### 2. 安装依赖

```bash
npm install
```

### 3. 首次配置

```bash
npm run setup
```

脚本会要求你输入：

- `ANTHROPIC_API_KEY`
- 默认模型别名，默认是 `sonnet`
- 权限模式，默认是 `default`

### 4. 启动写作模式

小说模式：

```bash
npm run novel
```

剧本模式：

```bash
npm run screenplay
```

大纲模式：

```bash
npm run outline
```

macOS 用户也可以直接双击：

- `launch-novel.command`
- `launch-screenplay.command`

Windows 用户可以双击：

- `launch-novel.bat`
- `launch-screenplay.bat`

## 一键创建项目骨架

创建小说工程：

```bash
npm run new:novel -- my-book
```

创建剧本工程：

```bash
npm run new:screenplay -- my-drama
```

生成后会在 `workspace/` 下创建结构化写作目录。

## 工作流设计

### 小说模式

- 概念定位
- 主角 / 反派 / 关系线打磨
- 世界观与规则系统
- 大纲梯子与章节规划
- 章节写作
- 连载节奏与钩子修订

### 剧本模式

- 一句话梗概
- 主题与人物弧光
- Beat Sheet
- 场景清单
- 分场写作
- 对白与表演感修订

### 大纲模式

- 适合前期开发
- 先把创意做强，再决定要不要进入正文

## 目录结构

```text
bin/                 启动器
config/              专业角色配置
prompts/             写作系统提示词
templates/           小说 / 剧本项目模板
scripts/             配置向导、项目创建、检查脚本
.github/             CI 与 Issue 模板
```

## 法律与发布说明

这个仓库发布的是 `Story Forge Pro` 自己的封装层代码。

- 它不是 Anthropic 官方项目
- 它不包含工作目录中的研究性逆向产物
- 如需使用上游能力，请遵守 `@anthropic-ai/claude-code` 的许可与服务条款

详细说明见 [NOTICE.md](NOTICE.md)。

## 建议的 GitHub 项目定位

如果你准备公开发布，推荐定位文案：

> One-click AI writing studio for beginners who want professional novel and screenplay workflows.

## 开发检查

```bash
npm run check
```

## 下一步可以继续做什么

1. 增加“长篇连载模式”和“短剧拆条模式”
2. 为中文网文加入更细的题材模板
3. 接入封面生成、角色卡生成、剧情一致性检查
