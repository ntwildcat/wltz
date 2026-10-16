// 把仓库根目录的网页版游戏复制到 desktop/app/ 供打包：
// 1. HTML 改名 index.html；game.js 用 terser 去注释（不改名、不压缩逻辑，出错时堆栈仍可读）；CSS / HTML 去注释
// 2. 检查产物里没有原著专有名词（注释里的原著出处说明只该留在源码里，不能随游戏发出去）
// 3. 写 build-info.json：版本号与 edition（node scripts/build.js --demo 打试玩版，否则完整版）
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(__dirname, '..', 'app');
const pkg = require('../package.json');
const EDITION = process.argv.includes('--demo') ? 'demo' : 'full';

// 与 去IP替换清单.md 保持一致；发现就中止打包
const BANNED = /凡人修仙传|凡人修仙放置|韩立|掌天瓶|小绿瓶|青竹蜂云|金雷竹|忘语|原著|假婴|飞仙劫|仙窍|仙灵力|窍衰|仙衰|身衰|魂衰|煞衰|法则之丝|灵域覆灵|玉仙|宝花|古或今|古道神|弥罗|三千道神|空间节点|人界|灵界/g;

function stripCssComments(css) {
    // 逐字符扫描，跳过字符串，只删 /* … */
    let out = '', i = 0;
    while (i < css.length) {
        const c = css[i];
        if (c === '"' || c === "'") {
            let j = i + 1;
            while (j < css.length && css[j] !== c) { if (css[j] === '\\') j++; j++; }
            out += css.slice(i, j + 1); i = j + 1; continue;
        }
        if (c === '/' && css[i + 1] === '*') {
            const end = css.indexOf('*/', i + 2);
            i = end < 0 ? css.length : end + 2; continue;
        }
        out += c; i++;
    }
    return out.replace(/\n\s*\n+/g, '\n');
}

// 不用 fs.cpSync：Node 22 在 Windows 上遇到中文路径（仓库在「网页」目录下）会直接崩溃
function copyDir(from, to) {
    fs.mkdirSync(to, { recursive: true });
    for (const ent of fs.readdirSync(from, { withFileTypes: true })) {
        const a = path.join(from, ent.name), b = path.join(to, ent.name);
        if (ent.isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b);
    }
}

async function stripJs(code) {
    const r = await minify(code, { compress: false, mangle: false, format: { comments: false, beautify: true } });
    return r.code;
}

async function main() {
    fs.rmSync(OUT, { recursive: true, force: true });
    fs.mkdirSync(OUT, { recursive: true });

    const js = await stripJs(fs.readFileSync(path.join(ROOT, 'game.js'), 'utf8'));
    fs.writeFileSync(path.join(OUT, 'game.js'), js);

    fs.writeFileSync(path.join(OUT, 'style.css'), stripCssComments(fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8')));

    let html = fs.readFileSync(path.join(ROOT, '凡人修仙放置版.html'), 'utf8');
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    // 页面头部的内联脚本也去注释
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
    for (const m of scripts) html = html.replace(m[1], '\n' + await stripJs(m[1]) + '\n');
    fs.writeFileSync(path.join(OUT, 'index.html'), html);

    copyDir(path.join(ROOT, 'fonts'), path.join(OUT, 'fonts'));

    // 检查原著专有名词
    const problems = [];
    for (const f of ['index.html', 'game.js', 'style.css']) {
        const text = fs.readFileSync(path.join(OUT, f), 'utf8');
        const found = text.match(BANNED);
        if (found) problems.push(`${f}: ${[...new Set(found)].join('、')}`);
    }
    if (problems.length) {
        console.error('✗ 打包产物里还有原著专有名词，已中止：\n  ' + problems.join('\n  '));
        process.exit(1);
    }

    fs.writeFileSync(path.join(OUT, 'build-info.json'), JSON.stringify({ edition: EDITION, version: pkg.version, builtAt: new Date().toISOString() }, null, 2));

    const size = f => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0) + 'KB';
    console.log(`✓ app/ 已生成（v${pkg.version} · ${EDITION === 'demo' ? '试玩版' : '完整版'}）：index.html ${size('index.html')} · game.js ${size('game.js')} · style.css ${size('style.css')} · fonts/`);
}

main().catch(e => { console.error(e); process.exit(1); });
