# android-pilot MCP 接入指南

## 一、工具简介

**android-pilot-mcp** 是一个开源的 [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 服务，为 AI 编程工具（Claude Code、Cursor、Windsurf 等）提供 Android 开发能力。基于 **stdio 传输**，通过 **npm 分发**，源码托管在 `github.com/sitharaj88/android-pilot-mcp`，MIT 协议。

共提供 **39 个工具、7 大类**：

| 类别 | 数量 | 典型能力 |
|------|------|----------|
| Build & Lint | 6 | Gradle 构建、任务执行、依赖树、Lint 分析 |
| Device Management | 15 | 模拟器/真机管理、APK 安装、应用启动、WiFi ADB |
| Debugging | 7 | logcat、截图、录屏、UI 层级 dump、shell |
| Scaffolding | 4 | 工程/Activity/Fragment/Compose 页面脚手架 |
| APK Analysis | 2 | APK 信息与权限分析 |
| Intents & Deep Links | 3 | Intent、广播、深链测试 |
| SDK Management | 2 | SDK 包查询与安装 |

## 二、前置条件

| 依赖 | 要求 | 说明 |
|------|------|------|
| Node.js | >= 20 | 运行时，MCP 服务本身 |
| Android SDK | platform-tools / emulator / cmdline-tools | adb、模拟器、avdmanager 等 |
| JDK | >= 17 | 仅 Gradle 构建类工具需要 |

**环境变量**：`ANDROID_HOME` 指向 SDK 路径（必需）；`JAVA_HOME` 建议配置。未设 `ANDROID_HOME` 时，服务会回退检查 `ANDROID_SDK_ROOT` 和 macOS 默认路径。

## 三、安装方式（官方三种）

### 方式 A：全局安装
```bash
npm install -g android-pilot-mcp
```
装好后命令行直接有 `android-pilot-mcp` 命令。

### 方式 B：npx 免安装（官方首选）
```bash
npx android-pilot-mcp
```
无需任何安装，按需从 npm 拉取，适合尝鲜/临时使用。

### 方式 C：源码安装（面向二次开发）
```bash
git clone https://github.com/sitharaj88/android-pilot-mcp.git
cd android-pilot-mcp
npm install
npm run build   # 产物在 build/，入口 build/index.js
```

## 四、客户端接入配置

### Claude Code
编辑项目 `.mcp.json` 或全局 `~/.claude/mcp.json`（或 `settings.json` 的 `mcpServers` 段）：

```json
{
  "mcpServers": {
    "android-pilot": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "android-pilot-mcp"]
    }
  }
}
```

若已全局安装，可简化为：
```json
{
  "mcpServers": {
    "android-pilot": {
      "type": "stdio",
      "command": "android-pilot-mcp"
    }
  }
}
```

> 内网/离线环境替代方案：本地 `npm install android-pilot-mcp` 后，直接指到本地入口，如
> `{"command": "node", "args": ["<本地路径>/node_modules/android-pilot-mcp/build/index.js"]}`，冷启动最快且不依赖网络。

### Cursor
Settings > MCP 新增服务器，或编辑 `~/.cursor/mcp.json`：
```json
{
  "mcpServers": {
    "android-pilot": {
      "command": "npx",
      "args": ["-y", "android-pilot-mcp"]
    }
  }
}
```

### Windsurf
Settings > MCP 新增：
```json
{
  "mcpServers": {
    "android-pilot": {
      "command": "npx",
      "args": ["-y", "android-pilot-mcp"]
    }
  }
}
```

### 其他 MCP 客户端
任何支持 stdio 的 MCP 客户端均可，把命令指向 `android-pilot-mcp` 或 `npx -y android-pilot-mcp` 即可。

## 五、验证接入

1. 重启客户端，MCP 工具列表中出现 `android_pilot_*` 前缀的工具（如 `device_list`、`gradle_build`）。
2. 执行 `device_list`，能返回设备/模拟器列表即接入成功（需先启动模拟器或连接真机）。
3. 常见排查：确认 `ANDROID_HOME` 已配置，`adb devices` 命令行可用。

## 六、升级与卸载

| 安装方式 | 升级 | 卸载 |
|----------|------|------|
| 全局 | `npm update -g android-pilot-mcp` | `npm uninstall -g android-pilot-mcp` |
| npx | 自动使用最新版 | 无需卸载，删除配置项即可 |
| 本地目录 | 目录内 `npm update android-pilot-mcp` | 删除目录 + 删除配置项 |

## 七、常见问题

- **Windows 下 npx 启动失败**：部分客户端需用 `npx.cmd` 而非 `npx`；本地 node 直跑可绕开此问题。
- **Gradle 构建失败**：多为 `JAVA_HOME` 未配或版本低于 17。
- **无法找到设备**：确认 `ANDROID_HOME` 且 `platform-tools` 在 PATH。
