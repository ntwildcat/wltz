// 生成图标：npm run icons
// - assets/icon.png（512×512，exe / 任务栏图标，与游戏里的「仙」字印同一风格）
// - assets/achievements/<成就ID>.jpg 与 <成就ID>_locked.jpg（64×64，Steamworks 后台上传用：已达成 / 未达成）
// - assets/achievements/_preview.png（全部成就图标的预览图，方便检查）
// 成就清单直接从 game.js 的 ACHIEVEMENTS 读，和游戏里永远一致。用楷体绘制（系统自带 KaiTi）。
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(__dirname, '..', 'assets');
const ACH_OUT = path.join(OUT, 'achievements');

const DRAW = `
(() => {
    const FONT = "'KaiTi', 'STKaiti', serif";
    const C = { ink: '#15140f', ink2: '#1f1e18', cinnabar: '#a83a2e', cinnabarDeep: '#8a2e24', paper: '#efe6cf', bronze: '#a68a52',
                lockBg: '#1c1b16', lockSeal: '#3d3a31', lockGlyph: '#8c8572', lockLine: '#5c5646' };
    const canvas = n => { const c = document.createElement('canvas'); c.width = c.height = n; return c; };
    const diamond = (g, x, y, r, color) => { g.fillStyle = color; g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r, y); g.lineTo(x, y + r); g.lineTo(x - r, y); g.closePath(); g.fill(); };
    // 印章：朱砂方块 + 内框细线 + 两个菱形角标 + 居中一个字
    function seal(n, glyph, locked, opts = {}) {
        const c = canvas(n), g = c.getContext('2d');
        const pad = opts.pad != null ? opts.pad : n * 0.08;
        if (opts.bg !== false) { g.fillStyle = locked ? C.lockBg : C.ink; g.fillRect(0, 0, n, n); }
        const s = n - pad * 2;
        const radius = opts.radius || n * 0.04;
        g.fillStyle = locked ? C.lockSeal : C.cinnabar;
        g.beginPath(); g.roundRect(pad, pad, s, s, radius); g.fill();
        // 印面做一点斑驳的深浅，像钤印
        if (!locked) {
            const grd = g.createRadialGradient(n * 0.35, n * 0.3, n * 0.05, n * 0.5, n * 0.5, n * 0.75);
            grd.addColorStop(0, 'rgba(255,255,255,0.08)'); grd.addColorStop(1, 'rgba(0,0,0,0.18)');
            g.fillStyle = grd; g.beginPath(); g.roundRect(pad, pad, s, s, radius); g.fill();
        }
        const inset = s * 0.07;
        g.strokeStyle = locked ? C.lockLine : 'rgba(239,230,207,0.75)';
        g.lineWidth = Math.max(1, n * 0.018);
        g.strokeRect(pad + inset, pad + inset, s - inset * 2, s - inset * 2);
        const dr = Math.max(1.5, n * 0.035);
        diamond(g, pad + inset, pad + inset, dr, locked ? C.lockLine : C.paper);
        diamond(g, n - pad - inset, n - pad - inset, dr, locked ? C.lockLine : C.paper);
        g.fillStyle = locked ? C.lockGlyph : C.paper;
        g.textAlign = 'center'; g.textBaseline = 'middle';
        g.font = (s * 0.66) + 'px ' + FONT;
        g.fillText(glyph, n / 2, n / 2 + s * 0.03);
        return c;
    }
    const icon = seal(512, '仙', false, { bg: false, pad: 24, radius: 56 }).toDataURL('image/png');
    const ach = ACHIEVEMENTS.map(a => ({
        id: a.id, name: a.name,
        on: seal(64, a.glyph, false).toDataURL('image/jpeg', 0.95),
        off: seal(64, a.glyph, true).toDataURL('image/jpeg', 0.95)
    }));
    // 预览：每行 8 个，达成 / 未达成上下两行，放大 2 倍
    const cols = 8, cell = 140, rows = Math.ceil(ach.length / cols);
    const pv = document.createElement('canvas'); pv.width = cols * cell; pv.height = rows * cell * 1.25;
    const pg = pv.getContext('2d'); pg.fillStyle = '#0e0d0a'; pg.fillRect(0, 0, pv.width, pv.height);
    const imgs = ach.map(a => [a.on, a.off].map(src => { const im = new Image(); im.src = src; return im; }));
    return new Promise(res => setTimeout(() => {
        ach.forEach((a, i) => {
            const x = (i % cols) * cell, y = Math.floor(i / cols) * cell * 1.25;
            pg.imageSmoothingEnabled = false;
            pg.drawImage(imgs[i][0], x + 6, y + 6, 64, 64);
            pg.drawImage(imgs[i][1], x + 72, y + 6, 64, 64);
            pg.fillStyle = '#d8ccae'; pg.font = '15px ' + FONT; pg.textAlign = 'center';
            pg.fillText(a.name, x + cell / 2, y + 96);
            pg.fillStyle = '#8c8572'; pg.font = '11px monospace';
            pg.fillText(a.id, x + cell / 2, y + 116);
        });
        res({ icon, ach, preview: pv.toDataURL('image/png') });
    }, 300));
})()`;

const writeData = (file, dataUrl) => fs.writeFileSync(file, Buffer.from(dataUrl.split(',')[1], 'base64'));

app.whenReady().then(async () => {
    const win = new BrowserWindow({ show: false, width: 800, height: 600, webPreferences: { offscreen: true } });
    await win.loadFile(path.join(ROOT, '凡人修仙放置版.html'));
    await new Promise(r => setTimeout(r, 800));
    const out = await win.webContents.executeJavaScript(DRAW, true);
    fs.mkdirSync(ACH_OUT, { recursive: true });
    for (const f of fs.readdirSync(ACH_OUT)) fs.rmSync(path.join(ACH_OUT, f));   // 删掉旧的，免得留下已改名成就的图标
    writeData(path.join(OUT, 'icon.png'), out.icon);
    for (const a of out.ach) {
        writeData(path.join(ACH_OUT, a.id + '.jpg'), a.on);
        writeData(path.join(ACH_OUT, a.id + '_locked.jpg'), a.off);
    }
    writeData(path.join(ACH_OUT, '_preview.png'), out.preview);
    console.log(`✓ assets/icon.png + ${out.ach.length} 个成就图标（各 2 张）→ assets/achievements/`);
    app.exit(0);
});
