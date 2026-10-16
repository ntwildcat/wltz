# 散修长生录 · 桌面版（Steam）

Electron 外壳。游戏本体和网页版是**同一份** `game.js` / `style.css` / `凡人修仙放置版.html`（在仓库根目录），这里不放游戏代码；改游戏照常改根目录，网页版和桌面版一起生效。

## 常用命令（在 `desktop/` 目录下）

| 命令 | 作用 |
|---|---|
| `npm install` | 第一次使用时安装依赖（Electron、打包工具、去注释工具），版本已在 package.json 里锁定 |
| `npm start` | 直接用根目录源码打开桌面窗口，改完代码按 F5 刷新、F12 开发者工具 |
| `npm run smoke` | 自动测试：在临时目录真实启动游戏，检查建角色、存档落盘、重新载入、损坏退回备份、关窗存档、删除存档（不碰真实存档） |
| `npm run smoke:packed` / `smoke:demo` | 先生成打包用的 `app/`（完整版 / 试玩版），再对它跑同一套测试（试玩版额外检查化神突破被拦下） |
| `npm run dist` | 打包完整版 → `dist/full/win-unpacked/SanxiuChangsheng.exe`（这个文件夹就是上传 Steam 的内容） |
| `npm run dist:demo` | 打包试玩版 → `dist/demo/win-unpacked/` |
| `npm run icons` | 重新生成 exe 图标与全部成就图标（`assets/`，成就清单从 game.js 读）；新增 / 改名成就后要跑一次 |

测试连 Steam：先打开 Steam 客户端，再用 `SANXIU_STEAM_APPID=480`（Valve 官方测试应用）运行 `npm start` 或 `npm run smoke`。试玩版源码调试：`SANXIU_EDITION=demo npm start`。

## 要点

- **存档**：桌面版的存档是 `%APPDATA%\SanxiuChangsheng\saves\xiuxianIdleGame_slot1~3.json`。每次写入先写临时文件再替换，并保留上一份 `.bak`，主文件损坏时自动读备份。以后在 Steam 后台把云存档（Auto-Cloud）指向这个目录即可。网页版导出的存档文件可以在桌面版「设置 → 导入存档」导入。
- **打包前的检查**：`scripts/build.js` 会去掉 JS / CSS / HTML 里的注释，再扫描产物，发现原著专有名词（清单见 `去IP替换清单.md`）就中止打包。
- **只能开一个窗口**：两个窗口同时自动存档会互相覆盖，第二次打开只会把已有窗口调到前台。
- **版本号**：`package.json` 的 `version` 与游戏版本保持一致，每次发版同步修改。
- **Steam**：App ID 填在 `steam.json`（`fullAppId` / `demoAppId`，0 = 不连 Steam）。连上后成就会同步到 Steam；读档时，存档里记过的成就会全部重发一遍，试玩版或离线期间达成的也不会丢。打包版如果不是从 Steam 启动，会交给 Steam 重新启动。上架步骤、成就后台配置表和云存档设置见 `STEAM上架指南.md`。
- **试玩版**：`game.js` 的 `DEMO_REALM_CAP`（当前 25 = 元婴大圆满）控制试玩范围；`build.js --demo` 会写入 `app/build-info.json`，外壳据此注入 `edition: 'demo'`。
- `node_modules/`、`app/`、`dist/` 不进 git（`.gitignore`），需要时用上面的命令重新生成。
