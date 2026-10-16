// 桌面版冒烟测试：npm run smoke（跑源码）/ npm run smoke:packed（跑 build.js 生成的 app/）
// 在临时目录里真实启动游戏窗口，走一遍 建角色 → 存档落盘 → 重新载入 → 主文件损坏退回 .bak → 关窗口时存档 → 删除存档，
// 全部通过退出码 0，否则 1。不碰 %APPDATA% 里的真实存档。
const os = require('os');
const path = require('path');
const fs = require('fs');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sanxiu-smoke-'));
process.env.SANXIU_USER_DATA = tmp;
const { app, BrowserWindow } = require('electron');
require('../main.js');

const saveDir = path.join(tmp, 'saves');
const slotFile = path.join(saveDir, 'xiuxianIdleGame_slot1.json');
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail }); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const loaded = wc => new Promise(r => wc.once('did-finish-load', r));

function finish() {
    for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.detail ? '  — ' + r.detail : ''}`);
    const failed = results.filter(r => !r.ok).length;
    console.log(failed ? `\n${failed} 项失败` : `\n全部 ${results.length} 项通过`);
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { /* 忽略 */ }
    app.exit(failed ? 1 : 0);
}

app.on('browser-window-created', (_, win) => {
    const wc = win.webContents;
    const js = code => wc.executeJavaScript(code, true);
    const consoleErrors = [];
    wc.on('console-message', e => { if (e.level === 'error') consoleErrors.push(e.message); });
    (async () => {
        await loaded(wc);
        await sleep(800);
        const page = decodeURIComponent(await js('location.pathname'));
        const wantBuilt = process.argv.includes('--packed-preview');
        check('加载的页面', wantBuilt ? page.endsWith('/desktop/app/index.html') : page.endsWith('/凡人修仙放置版.html'), page);
        check('页面标题', (await js('document.title')) === '散修长生录', await js('document.title'));
        check('存档接口已注入', await js('!!window.desktopSaves && saveStore === window.desktopSaves'));
        check('版本信息', await js('window.desktopApp && window.desktopApp.edition === "steam"'), JSON.stringify(await js('window.desktopApp')));

        // 建角色并存档
        await js(`openSlot(1)`); await sleep(300);
        await js(`document.getElementById('playerName').value = '冒烟测试';
                  document.getElementById('playerOrigin').value = 'orphan';
                  document.getElementById('playerSpiritRoot').value = 'wood';
                  document.getElementById('playerRootGrade').value = 'zhen';
                  startGame();`);
        await sleep(800);
        await js(`try { closeTutorial() } catch (e) {} gameState.player.coins = 12345; saveGame();`);
        const saved = fs.existsSync(slotFile) && JSON.parse(fs.readFileSync(slotFile, 'utf8'));
        check('存档写成文件', saved && saved.player.name === '冒烟测试' && saved.player.coins === 12345, slotFile);
        await js('saveGame()');
        check('第二次存档留下 .bak', fs.existsSync(slotFile + '.bak'));
        if (process.env.SANXIU_SHOT) {   // 顺便截一张游戏界面（给人看渲染是否正常）
            await sleep(600);
            fs.writeFileSync(process.env.SANXIU_SHOT, (await wc.capturePage()).toPNG());
        }

        // 重新载入后能读到
        wc.reload(); await loaded(wc); await sleep(800);
        check('重新载入后存档列表显示角色', (await js(`document.getElementById('slotSelect').innerText`)).includes('冒烟测试'));
        await js('openSlot(1)'); await sleep(800);
        check('进入存档后数据正确', await js(`gameState.player.name === '冒烟测试' && gameState.player.coins >= 12345`), String(await js('gameState.player.coins')));

        // 主文件损坏 → 退回 .bak
        await js('gameRunning = false; clearInterval(tickInterval)');   // 先停自动存档，免得把坏文件又写回去
        fs.writeFileSync(slotFile, '{坏掉的存档');
        check('主文件损坏时读取 .bak', await js(`(() => { const r = readSlot(1); return !!r && JSON.parse(r).player.name === '冒烟测试'; })()`));

        // 非法写入被拒绝（不是 JSON 不落盘，也不能写别的文件）
        check('拒绝写入非 JSON', await js(`(() => { try { saveStore.set('xiuxianIdleGame_slot2', 'abc'); return false; } catch (e) { return true; } })()`));
        check('拒绝非存档键', await js(`(() => { try { saveStore.set('../../evil', '{}'); return false; } catch (e) { return true; } })()`));

        // 关窗口前最后一次存档（beforeunload）
        await js(`openSlot(1)`); await sleep(800);
        await js(`gameState.player.coins = 777777`);
        wc.reload(); await loaded(wc); await sleep(500);
        const afterClose = JSON.parse(fs.readFileSync(slotFile, 'utf8'));
        check('离开页面时自动存档', afterClose.player.coins === 777777, String(afterClose.player.coins));

        // 删除存档
        await js(`window.confirm = () => true; deleteSlot(1)`); await sleep(200);
        check('删除存档连同 .bak 一起删', !fs.existsSync(slotFile) && !fs.existsSync(slotFile + '.bak'));

        check('控制台无报错', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
        finish();
    })().catch(e => { check('测试脚本异常', false, e.stack); finish(); });

});

setTimeout(() => { check('超时', false, '60 秒内没跑完'); finish(); }, 60000);
