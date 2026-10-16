// 桌面版预加载脚本：给游戏页面提供 window.desktopSaves（存档文件读写）和 window.desktopApp（版本信息）。
// 接口与 localStorage 同为同步调用，game.js 里的 saveStore 自动改用它；网页版没有这个对象，照旧用 localStorage。
const { contextBridge, ipcRenderer } = require('electron');

function call(channel, ...args) {
    const r = ipcRenderer.sendSync(channel, ...args);
    if (!r || !r.ok) throw new Error((r && r.error) || '存档读写失败');
    return r.value;
}

contextBridge.exposeInMainWorld('desktopSaves', {
    get: key => call('saves:get', key),
    set: (key, value) => { call('saves:set', key, String(value)); },
    remove: key => { call('saves:remove', key); }
});
const info = ipcRenderer.sendSync('app:info');
contextBridge.exposeInMainWorld('desktopApp', {
    ...info,
    unlockAchievement: id => ipcRenderer.send('steam:achieve', String(id)),   // 成就同步到 Steam（没连上 Steam 时什么也不做）
    openStore: info.canOpenStore ? () => ipcRenderer.send('app:openStore') : null
});
