# mattpocock skills 使用指南

> 本文内容翻译自官方仓库 [mattpocock/skills](https://github.com/mattpocock/skills) 的 README.md 与 `.agents/install-block.md`（安装命令以官方原文为准）。源仓库的最新说明以 `https://aihero.dev/skills-<技能名>` 和各技能 `docs/` 页面为准。

## 一、技能组是什么

作者 Matt Pocock 日常用于"真实工程"（而非 vibe coding）的 agent 技能集合。GSD、BMAD、Spec-Kit 这类方案试图接管流程，却剥夺了你的控制权，还让流程里的 bug 难以排查。这套技能刻意保持**小巧、易改造、可组合**，适配任意模型，基于数十年工程经验沉淀，可以随意改写、变成你自己的东西。

技能按存放位置分桶（bucket）：

- `engineering/` —— 日常代码工作
- `productivity/` —— 日常非代码工作流工具
- `misc/` —— 保留但少用，不推广
- `in-progress/` —— beta 版：公开征集反馈，不随插件发布
- `deprecated/` —— 已弃用

## 二、安装（官方两种方式，二选一）

两种入口、两种理念，**互斥，只能选一个**：

| 方式 | 理念 | 更新 |
|------|------|------|
| **Claude Code 插件** | 托管、只读的技能包，订阅制 | 自动更新 |
| **skills.sh（文件方式）** | 把可编辑的技能文件复制进项目，你可以 hack 它们 | 手动 `npx skills update` |

> 同时装两种会把每个技能装两遍——官方明确要求"选一个"。

### 方式一：Claude Code 插件（只读、自动更新）

```bash
claude plugins install mattpocock-skills
```

或在会话内执行：

```
/plugin install mattpocock-skills
```

该插件已收录在 **Claude Code 官方 marketplace**（配置名 `claude-plugins-official`，源仓库 `anthropics/claude-plugins-official`），开箱即用，无需先添加任何 marketplace。官方 Anthropic marketplace 默认开启自动更新，所以"更新自动到达"是真实承诺。

### 方式二：skills.sh（可编辑文件，适用于 Codex 及其他 agent）

```bash
npx skills@latest add mattpocock/skills
```

安装器会**让你挑选要装的技能和安装到哪些 agent**——请务必确保 `setup-matt-pocock-skills` 在选中之列。

它会把这些技能作为普通文件写进你的仓库/agent 目录，文件归你所有、可自由编辑；不会在背后偷偷更新，想拉取最新改动时手动执行：

```bash
npx skills update
```

### 单技能安装 / 更新

```bash
npx skills@latest add mattpocock/skills --skill=<技能名>
npx skills@latest update <技能名>
```

## 三、首次配置（每个仓库跑一次）

在你的 agent 中对**每个仓库各执行一次** `/setup-matt-pocock-skills`，它会依次询问：

1. 使用哪个 issue 跟踪器（GitHub、Linear 或本地文件）
2. triage 时给工单打什么标签（`/triage` 依赖标签）
3. 新建文档保存到哪里

配置完成后即可开始使用。

## 四、技能清单（Reference）

技能按"谁可以调用"分两类：

- **User-invoked（用户调用）**：只有你输入（如 `/grill-me`）才能触发，职责是编排流程。
- **Model-invoked（模型调用）**：你可以调用，agent 在任务匹配时也会自动调用，承载可复用的纪律。用户调用型技能可以调用模型调用型技能，但绝不调用另一个用户调用型技能。

### Engineering 工程类（日常代码工作）

**User-invoked（用户调用）**

- **ask-matt** —— 询问哪个技能或流程适合当前处境，是仓库内用户调用技能的"路由器"。
- **grill-with-docs** —— 拷问式访谈，同时构建项目领域模型：打磨术语，并就地更新 `CONTEXT.md` 与 ADR。
- **triage** —— 让 issue 在一套 triage 角色状态机中流转。
- **improve-codebase-architecture** —— 扫描代码库寻找"加深"机会，以可视化 HTML 报告呈现，再对选中的候选做拷问式访谈。
- **setup-matt-pocock-skills** —— 为仓库配置工程类技能（issue 跟踪器、triage 标签、领域文档布局）。每个仓库用其他工程技能前先跑一次。
- **to-spec** —— 把当前对话变成 spec 并发布到 issue 跟踪器。不做访谈，只综合你已讨论的内容。
- **to-tickets** —— 把任何计划/spec/对话拆成一组 tracer-bullet 工单，每个工单声明其阻塞边——写成本地文件文本，或作为真实跟踪器上的原生阻塞链接。
- **implement** —— 实现 spec 或工单集描述的工作：在约定接缝处驱动 `/tdd`，提交前用 `/code-review` 收尾。
- **wayfinder** —— 把超过单次 agent 会话容量的大块工作，规划成 issue 跟踪器上一张共享的决策工单地图——逐个解决，直到通往目的地的路清晰。

**Model-invoked（模型调用）**

- **prototype** —— 构建一次性原型回答设计问题：状态/逻辑问题用单个可分享的 HTML 文件，UI 变体则做多个差异极大的方案、从一个路由切换。
- **diagnosing-bugs** —— 针对疑难 bug 和性能回退的纪律化诊断循环：构建一个在该 bug 上"变红"的反馈环 → 最小化 → 假设 → 插桩 → 修复 → 回归测试。
- **research** —— 针对高可信一手资料调研问题，把结论写成仓库内带引用的 Markdown 文件，以后台 agent 方式运行。
- **tdd** —— 红-绿-重构循环的测试驱动开发，一次一个垂直切片地构建功能或修复 bug。
- **domain-modeling** —— 主动构建和打磨项目领域模型：用术语表挑战术语、用边界场景压力测试，并就地更新 `CONTEXT.md` 与 ADR。
- **codebase-design** —— 设计深模块的共享纪律与词汇：小接口承载大量行为、放在干净的接缝、可通过该接口测试。
- **code-review** —— 对自固定点以来的 diff 做双轴评审：**标准**（是否符合仓库编码标准 + Fowler 坏味道基线）与 **Spec**（是否忠实实现来源 issue/spec），以并行子 agent 运行互不污染。
- **resolving-merge-conflicts** —— 逐块处理进行中的 git merge/rebase 冲突，按意图追溯到两侧一手来源解决，然后完成操作——绝不 `--abort`。
- **wizard** —— 生成交互式 bash 向导，引导人类完成只有他们能做的步骤：开通基础设施、配置凭据或 CI 密钥、走不熟悉的三方面板、执行一次性迁移或切换。

### Productivity 生产力类（非代码工作流）

**User-invoked（用户调用）**

- **grill-me** —— 针对计划或设计接受毫不留情的访谈，直到设计树的每个分支都被解决。
- **handoff** —— 把当前对话压缩成交接文档，让另一个 agent 继续工作。
- **teach** —— 跨多次会话教会用户一项新技能/概念，把当前目录当作有状态的授课工作区。
- **to-questionnaire** —— 把你独自无法回答的决策，转成给唯一能回答之人的 Markdown 问卷——异步填写，或会上一起过。它拷问的是"发送"（发给谁、需要什么回报），而不是主题本身。
- **wait-wait** —— 消息没听懂的瞬间触发。agent 用你缺失的上下文、以你的 `CONTEXT.md` 词汇重新阐述，用大白话重讲一遍。

**Model-invoked（模型调用）**

- **grilling** —— 对计划、决策或想法做不停歇访谈，直到设计树每个分支被解决。是 `grill-me`、`grill-with-docs`、`triage`、`wayfinder`、`improve-codebase-architecture` 背后可复用的访谈原语。
- **writing-for-agents** —— 为 agent 写文档：技能、AGENTS.md/CLAUDE.md，以及任何 agent 通过指针触达的文档。

## 五、各技能的详细说明

每个 `engineering/` 和 `productivity/` 技能在仓库 `docs/<bucket>/<技能名>.md` 都有面向人的文档页，固定四节：**What it does（做什么）**、**When to reach for it（何时使用）**、**Common questions（常见问题）**、**It's working if（生效标志）**。发布后的 URL 统一为：

```
https://aihero.dev/skills-<技能名>
```

## 六、设计动机（为什么这些技能存在）

作者针对 coding agent 的四个常见失败模式各配了技能：

1. **agent 没按你的意思做** —— 症结是对齐问题。对策是"拷问式访谈"（`/grill-me`、`/grill-with-docs`），开始前先对齐、深想这次改动，每次改动都用。
2. **agent 太啰嗦** —— 症结是缺乏共享语言。对策是共享语言文档（`CONTEXT.md`），帮 agent 解码项目黑话；`/grill-with-docs` 会顺带构建领域模型、把难解释的决策写进 ADR。
3. **代码不工作** —— 症结是反馈环缺失。对策是静态类型、浏览器访问、自动化测试；红-绿-重构用 `/tdd`，调试用 `/diagnosing-bugs`。
4. **代码变成大泥球** —— 症结是熵加速。对策是关心代码设计：`/to-spec` 建 spec 前先拷问模块边界，`/improve-codebase-architecture` 定期扫描加深机会（是普查、不是救援）。
