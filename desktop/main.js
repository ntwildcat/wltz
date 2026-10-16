// 散修长生录 · 桌面版（Steam）外壳
// 游戏本体与网页版是同一份 game.js / style.css / HTML：开发时（npm start）直接读仓库根目录，
// 打包时由 scripts/build.js 复制到 desktop/app/（去注释）再封进安装包。这里只负责窗口、存档文件和外链。
const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const DEV = !app.isPackaged;
// npm start 直接跑仓库根目录的源码；npm run start:packed（--packed-preview）跑 scripts/build.js 生成的 app/，用来检查打包产物
const USE_BUILT = app.isPackaged || process.argv.includes('--packed-preview');
const GAME_DIR = USE_BUILT ? path.join(__dirname, 'app') : path.join(__dirname, '..');
const GAME_PAGE = USE_BUILT ? 'index.html' : '凡人修仙放置版.html';

// 用户数据目录固定为 %APPDATA%/SanxiuChangsheng（英文名，Steam 云存档按这个路径配置）
// （自动测试 scripts/smoke.js 用 SANXIU_USER_DATA 指到临时目录，不碰真实存档）
app.setPath('userData', process.env.SANXIU_USER_DATA || path.join(app.getPath('appData'), 'SanxiuChangsheng'));
const SAVE_DIR = path.join(app.getPath('userData'), 'saves');

// 同时只允许开一个游戏窗口：两个窗口各自自动存档会互相覆盖
if (!app.requestSingleInstanceLock()) {
    app.quit();
}

// ---------------- 版本（完整版 / 试玩版） ----------------
// 打包时 scripts/build.js 写 app/build-info.json（--demo 时 edition = 'demo'）；直接跑源码时默认完整版，可用 SANXIU_EDITION=demo 试试玩版
const PKG_VERSION = require('./package.json').version;
function readBuildInfo() {
    try { return JSON.parse(fs.readFileSync(path.join(GAME_DIR, 'build-info.json'), 'utf8')); } catch (e) { return {}; }
}
const BUILD_INFO = readBuildInfo();
const EDITION = process.env.SANXIU_EDITION || BUILD_INFO.edition || 'full';

// ---------------- Steam ----------------
// App ID 填在 steam.json（Steamworks 后台建好应用后才有）；没填就不连 Steam，游戏照常运行（成就只记在存档里，以后连上再补同步）。
// 测试可用 SANXIU_STEAM_APPID=480（Valve 官方测试应用 Spacewar）。
function readSteamConfig() {
    try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'steam.json'), 'utf8')); } catch (e) { return {}; }
}
const STEAM_CONFIG = readSteamConfig();
const STEAM_APP_ID = Number(process.env.SANXIU_STEAM_APPID) || Number(EDITION === 'demo' ? STEAM_CONFIG.demoAppId : STEAM_CONFIG.fullAppId) || 0;
const FULL_APP_ID = Number(STEAM_CONFIG.fullAppId) || 0;
let steam = null;
let steamError = '';
if (STEAM_APP_ID) {
    try {
        const steamworks = require('steamworks.js');
        // 正式打包版不是从 Steam 启动的（直接双击 exe）：交给 Steam 重新启动，保证成就、云存档、在线状态正常
        if (app.isPackaged && !process.env.SANXIU_STEAM_APPID && steamworks.restartAppIfNecessary(STEAM_APP_ID)) {
            app.exit(0);
        } else {
            steam = steamworks.init(STEAM_APP_ID);
            steamworks.electronEnableSteamOverlay();
        }
    } catch (e) {
        steamError = e.message;   // Steam 没开 / 没拥有这个应用：不连 Steam 继续玩
        steam = null;
    }
}
function unlockSteamAchievement(id) {
    if (!steam || !/^ACH_[A-Z0-9_]+$/.test(String(id))) return false;
    try { return steam.achievement.activate(id); } catch (e) { return false; }
}
function openStorePage() {
    if (!FULL_APP_ID) return;
    if (steam) {
        try { steam.overlay.activateToStore(FULL_APP_ID, 0); return; } catch (e) { /* 浮层不可用就开网页 */ }
    }
    shell.openExternal(`https://store.steampowered.com/app/${FULL_APP_ID}/`);
}

// ---------------- 存档文件 ----------------
// 只接受游戏用到的存档键（旧版单存档 + 3 个槽位），每个键对应 saves/<键>.json
const SAVE_KEY_RE = /^xiuxianIdleGame(_slot[1-3])?$/;
function saveFile(key) {
    if (!SAVE_KEY_RE.test(String(key))) throw new Error('无效的存档键：' + key);
    return path.join(SAVE_DIR, key + '.json');
}
function readSave(key) {
    const file = saveFile(key);
    for (const f of [file, file + '.bak']) {   // 主文件损坏或缺失（比如写到一半断电）时退回上一份
        try {
            const text = fs.readFileSync(f, 'utf8');
            JSON.parse(text);
            return text;
        } catch (e) { /* 试下一份 */ }
    }
    return null;
}
function writeSave(key, text) {
    JSON.parse(text);   // 不是合法 JSON 就不写，免得覆盖掉好存档
    const file = saveFile(key);
    fs.mkdirSync(SAVE_DIR, { recursive: true });
    const tmp = file + '.tmp';
    fs.writeFileSync(tmp, text, 'utf8');
    if (fs.existsSync(file)) fs.copyFileSync(file, file + '.bak');
    fs.renameSync(tmp, file);
}
function removeSave(key) {
    const file = saveFile(key);
    for (const f of [file, file + '.bak', file + '.tmp']) fs.rmSync(f, { force: true });
}
// 同步 IPC：游戏里的存档调用原本是同步的 localStorage，关窗口时的最后一次存档也必须同步写完
ipcMain.on('saves:get', (e, key) => { try { e.returnValue = { ok: true, value: readSave(key) }; } catch (err) { e.returnValue = { ok: false, error: err.message }; } });
ipcMain.on('saves:set', (e, key, text) => { try { writeSave(key, text); e.returnValue = { ok: true }; } catch (err) { e.returnValue = { ok: false, error: err.message }; } });
ipcMain.on('saves:remove', (e, key) => { try { removeSave(key); e.returnValue = { ok: true }; } catch (err) { e.returnValue = { ok: false, error: err.message }; } });
ipcMain.on('app:info', e => {
    let steamUser = '';
    try { steamUser = steam ? steam.localplayer.getName() : ''; } catch (err) { /* 忽略 */ }
    e.returnValue = { version: PKG_VERSION, edition: EDITION, saveDir: SAVE_DIR, steam: !!steam, steamAppId: STEAM_APP_ID, steamUser, steamError, canOpenStore: !!FULL_APP_ID };
});
ipcMain.on('steam:achieve', (e, id) => { unlockSteamAchievement(id); });
ipcMain.on('app:openStore', () => openStorePage());

// ---------------- 窗口 ----------------
let win = null;
function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 820,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: '#15140f',   // 松烟铜器底色，避免启动时白屏一闪
        title: EDITION === 'demo' ? '散修长生录 试玩版' : '散修长生录',
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            devTools: DEV
        }
    });
    win.once('ready-to-show', () => win.show());
    win.loadFile(path.join(GAME_DIR, GAME_PAGE));

    // 外部链接用系统浏览器打开；窗口本身只允许停留在游戏页面
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (/^https?:\/\//.test(url)) shell.openExternal(url);
        return { action: 'deny' };
    });
    win.webContents.on('will-navigate', (e, url) => {
        if (!url.startsWith('file://')) { e.preventDefault(); if (/^https?:\/\//.test(url)) shell.openExternal(url); }
    });
    if (DEV) {
        win.webContents.on('before-input-event', (e, input) => {
            if (input.type === 'keyDown' && input.key === 'F12') win.webContents.toggleDevTools();
            if (input.type === 'keyDown' && input.key === 'F5') win.webContents.reload();
        });
    }
}

app.on('second-instance', () => {
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
});
app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();
});
app.on('window-all-closed', () => app.quit());
