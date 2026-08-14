# Changelog

本仓库的版本变更记录。版本约定见 [docs/01-安装与更新.md](./docs/01-安装与更新.md)。

**发版规则**：每次打 tag（如 `v1.1.0`）时，全部 20 个技能的 frontmatter `version` 必须对齐到 tag 版本（即 `1.1.0`）。
发布前用 `node scripts/check-release.mjs` 校验，CI 也会在打 tag / 提 PR 时自动校验。

格式遵循 [Keep a Changelog](https://keepachangelog.com/)。

## [Unreleased]

### 文档
- 迁移三份接入指南到仓库 `docs/`（mattpocock / android-pilot / 融合工作流）
- 统一整改文档体系（结构 / 命名 / mermaid / 规则注入）

## [1.0.0] - 2026-08-14

首个公开发布版本。

### 新增
- 初始导入 20 个 superpowers 融合技能（`skills/` 下全部技能）
- 加入 superpowers `CLAUDE.md` 注入模板（sentinel 标记 `<!-- superpowers:begin -->` / `<!-- superpowers:end -->`）
- 配套安装/更新文档与版本约定（[docs/01-安装与更新.md](./docs/01-安装与更新.md)）

[Unreleased]: https://github.com/Small-Sagittarius/spec-superpowers/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Small-Sagittarius/spec-superpowers/releases/tag/v1.0.0
