# 散修长生录 · 桌面版（Steam）

Electron 外壳。游戏本体和网页版是**同一份** `game.js` / `style.css` / `凡人修仙放置版.html`（在仓库根目录），这里不放游戏代码；改游戏照常改根目录，网页版和桌面版一起生效。

## 常用命令（在 `desktop/` 目录下）

| 命令 | 作用 |
|---|---|
| `npm install` | 第一次使用时安装依赖（Electron、打包工具、去注释工具），版本已在 package.json 里锁定 |
| `npm start` | 直接用根目录源码打开桌面窗口，改完代码按 F5 刷新、F12 开发者工具 |
| `npm run smoke` | 自动测试：在临时目录真实启动游戏，检查建角色、存档落盘、重新载入、损坏退回备份、关窗存档、删除存档（不碰真实存档） |
| `npm run smoke:packed` | 先生成打包用的 `app/`，再对它跑同一套测试 |
| `npm run dist` | 生成 `app/` 并打包成 `dist/win-unpacked/SanxiuChangsheng.exe`（这个文件夹就是以后上传 Steam 的内容） |

## 要点

- **存档**：桌面版的存档是 `%APPDATA%\SanxiuChangsheng\saves\xiuxianIdleGame_slot1~3.json`。每次写入先写临时文件再替换，并保留上一份 `.bak`，主文件损坏时自动读备份。以后在 Steam 后台把云存档（Auto-Cloud）指向这个目录即可。网页版导出的存档文件可以在桌面版「设置 → 导入存档」导入。
- **打包前的检查**：`scripts/build.js` 会去掉 JS / CSS / HTML 里的注释，再扫描产物，发现原著专有名词（清单见 `去IP替换清单.md`）就中止打包。
- **只能开一个窗口**：两个窗口同时自动存档会互相覆盖，第二次打开只会把已有窗口调到前台。
- **版本号**：`package.json` 的 `version` 与游戏版本保持一致，每次发版同步修改。
- `node_modules/`、`app/`、`dist/` 不进 git（`.gitignore`），需要时用上面的命令重新生成。
