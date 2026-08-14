# spec-superpowers 技能组

Spec+Superpowers 融合工作流技能组：用 superpowers 的方法保证"想清楚和做对"，用 openspec 的制品保证"记清楚"。

- 技能：`skills/` 下 20 个技能，均为可编辑普通文件
- 外部依赖：`grilling`（mattpocock/skills 官方全局版，用于设计/计划双决策门）、`openspec` CLI（制品生命周期管理）

## 快速安装（官方 skills CLI）

```bash
npx skills@latest add Small-Sagittarius/spec-superpowers
```

按提示选择要装的技能和 agent。**务必包含 `using-superpowers` 和 `writing-plans`**（工作流主流程技能）。

装完在仓库根目录（或全局）执行一次 `/using-superpowers` 完成初始配置。

### 其他 agent（Codex / Cursor / 等）

```bash
npx skills@latest add Small-Sagittarius/spec-superpowers -a codex -a cursor
```

> 完整安装（5 个必选组件：openspec / 自建技能组 / mattpocock / android-pilot MCP / superpowers 规则块）与更新、版本约定见 [docs/users/01-安装与更新.md](./docs/users/01-安装与更新.md)。

## 文档索引

| 文档 | 内容 |
|------|------|
| [docs/users/01-安装与更新.md](./docs/users/01-安装与更新.md) | 使用者向：环境级安装：5 组件安装 / 更新 / 版本约定 / 安装 FAQ |
| [docs/users/02-融合工作流.md](./docs/users/02-融合工作流.md) | 使用者向：融合工作流（superpowers 方法 × openspec 制品）：理念 + 从 0 接入 + 完整任务 |
| [docs/users/03-mattpocock-skills.md](./docs/users/03-mattpocock-skills.md) | 使用者向：mattpocock 技能组使用指南（grilling 等） |
| [docs/users/04-android-pilot-mcp.md](./docs/users/04-android-pilot-mcp.md) | 使用者向：android-pilot MCP 接入指南 |
| [docs/maintainers/维护与发版.md](./docs/maintainers/维护与发版.md) | 维护者向：版本模型 / 发版流程 / CI 行为 / 应急恢复 |
| [CLAUDE.md](./CLAUDE.md) | superpowers 规则块注入模板（sentinel 标记，随安装注入） |

## 文档结构与引用关系

文档按受众分两类目录管理：

- `docs/users/` — 使用者向（安装 / 更新 / 使用技能）
- `docs/maintainers/` — 维护者向（版本管理 / 发版 / CI）

| 文档 | 受众 | 引用 |
|------|------|------|
| docs/users/01-安装与更新.md | 使用者 | → 02、03、04 |
| docs/users/02-融合工作流.md | 使用者 | → 01 |
| docs/users/03-mattpocock-skills.md | 使用者 | （独立） |
| docs/users/04-android-pilot-mcp.md | 使用者 | （独立） |
| docs/maintainers/维护与发版.md | 维护者 | → docs/users/01（版本约定） |

> 使用者文档之间互相引用，均在同一目录内；维护者文档引用使用者文档的版本约定，跨目录用 `../users/`。

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
