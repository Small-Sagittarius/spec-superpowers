# spec-superpowers 技能组

Spec+Superpowers 融合工作流技能组：用 superpowers 的方法保证"想清楚和做对"，用 openspec 的制品保证"记清楚"。

- 技能：`skills/` 下 20 个技能，均为可编辑普通文件
- 工作流指南：`framework-guide.md`（superpowers 方法 × openspec 制品 完整说明）
- 外部依赖：`grilling`（mattpocock/skills 官方全局版，用于设计/计划双决策门）、`openspec` CLI（制品生命周期管理）

## 安装（官方 skills CLI）

```bash
npx skills@latest add Small-Sagittarius/spec-superpowers
```

按提示选择要装的技能和 agent。**务必包含 `using-superpowers` 和 `writing-plans`**（工作流主流程技能）。

装完在仓库根目录（或全局）执行一次 `/using-superpowers` 完成初始配置。

### 其他 agent（Codex / Cursor / 等）

```bash
npx skills@latest add Small-Sagittarius/spec-superpowers -a codex -a cursor
```

### 单技能安装

```bash
npx skills@latest add Small-Sagittarius/spec-superpowers --skill=brainstorming
```

## 更新

```bash
npx skills update
```

或更新单个技能：

```bash
npx skills update brainstorming
```

## 版本约定

- 技能 frontmatter 中 `version` 字段为技能自身版本号（当前 `1.0.0`），修改技能内容时必须递增
- 仓库 release 用于整包版本记录：打 tag 时同步将所有技能 `version` 升到同一版本
- `skills` CLI 通过 lock 文件 hash 追踪安装版本，`npx skills update` 按 hash 差异增量更新
- 变更技能内容后：递增 `version` → 提交 → 打 tag → 推送，使用者 `npx skills update` 即可拉取

## 外部依赖

| 依赖 | 用途 | 安装 |
|------|------|------|
| `grilling`（mattpocock/skills） | 设计/计划 grilling 决策门 | `npx skills@latest add mattpocock/skills --skill=grilling` |
| `openspec` CLI | 制品落盘/校验/归档 | `npm install -g @fission-ai/openspec@1.8.0` |

## 技能清单（20）

- **brainstorming** — 创造性工作前的需求分析（探索意图/澄清/方案对比/逐节批准）
- **writing-plans** — 有规格或需求时编写实现计划
- **subagent-driven-development** — 分解执行实现计划（子代理双审）
- **systematic-debugging** — 遇到 bug/测试失败/异常行为时系统化排查
- **test-driven-development** — 实现前先写测试（TDD 红绿重构）
- **finishing-a-development-branch** — 实现完成后的合并/PR/清理决策
- **using-git-worktrees** — 隔离工作区开发
- **using-superpowers** — 会话开始时的技能匹配入口
- **verification-before-completion** — 声称完成前必须验证
- **dispatching-parallel-agents** — 并行任务分发
- **executing-plans** — 跨会话执行书面计划
- **receiving-code-review** — 收到审查反馈后的处理
- **requesting-code-review** — 完成/合并前请求审查
- **workflow-runner** — 直接运行 YAML 工作流
- **writing-skills** — 创建/编辑/验证技能
- **mcp-builder** — MCP 服务器构建方法论
- **chinese-code-review** — 中文 review 沟通参考
- **chinese-commit-conventions** — 中文 commit 规范参考
- **chinese-documentation** — 中文文档排版参考
- **chinese-git-workflow** — 国内 Git 平台配置参考
