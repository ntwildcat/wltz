// ==================== 战斗舞台美术（v7.25，国漫风） ====================
// 全部是矢量：墨色剪影 + 属性色轮廓光 + 身后气焰 + 发光的眼睛，配水墨山水背景与漫画式出手特效（毛笔剑痕、集中线、书法大字、墨点飞溅、闪电）。
// 敌人不逐只单画：按名字归到十类原型（妖兽 / 魔物 / 魂影 / 傀儡 / 修士 / 龙蛟 / 草木 / 虫蝶 / 雷灵 / 镜像），再按属性换轮廓光和气焰颜色。
// 每张图的滤镜 / 渐变 id 带自增编号，同一页面放多张不会串色。由 game.js 的 setMonsterSprite / showDamageFloat 等调用；
// 不依赖 game.js 的任何东西，可以单独在页面里预览。
const BattleArt = (() => {
    let uid = 0;
    const INK = '#0e0c09', INK2 = '#1d1913', INK3 = '#2c261d', FOLD = '#4d4436';
    // 属性 → 轮廓光 / 气焰颜色（敌人用 monster.type 的中文，玩家用灵根 id）
    const ELEMENT = { 金: '#f3d36a', 木: '#7fe0a0', 水: '#6fb8ff', 火: '#ff6a3d', 土: '#e0a55a', 风: '#9ff0d8', 雷: '#b98cff', 冰: '#a6eeff', 无: '#e9d6a4' };
    const ROOT = { metal: '金', wood: '木', water: '水', fire: '火', earth: '土', wind: '风', thunder: '雷', ice: '冰' };
    const colorOf = el => ELEMENT[el] || ELEMENT[ROOT[el]] || ELEMENT.无;

    function defs(u, c) {
        return `<defs>
            <filter id="rim${u}" x="-35%" y="-35%" width="170%" height="170%">
                <feMorphology in="SourceAlpha" operator="dilate" radius="1.3" result="d"/>
                <feFlood flood-color="${c}"/><feComposite in2="d" operator="in" result="edge"/>
                <feGaussianBlur in="edge" stdDeviation="2.8" result="glow"/>
                <feMerge><feMergeNode in="glow"/><feMergeNode in="glow"/><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow${u}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <radialGradient id="aura${u}" cx="50%" cy="58%" r="55%"><stop offset="0" stop-color="${c}" stop-opacity=".55"/><stop offset=".55" stop-color="${c}" stop-opacity=".16"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
            <linearGradient id="flame${u}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${c}" stop-opacity=".75"/><stop offset=".6" stop-color="${c}" stop-opacity=".25"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>
            <linearGradient id="ink${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${INK3}"/><stop offset="1" stop-color="${INK}"/></linearGradient>
        </defs>`;
    }
    // 身后的气焰：一团光晕 + 三股火舌（CSS 让它们各自起伏）
    const aura = (u, cx, cy, rx, ry, base, top) => `<g class="bs-aura">
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#aura${u})"/>
        <path class="bs-flame f1" d="M${cx - rx * .7} ${base} Q${cx - rx * .9} ${top + 40} ${cx - rx * .45} ${top + 18} Q${cx - rx * .4} ${top + 38} ${cx - rx * .2} ${top + 44} Q${cx - rx * .25} ${top + 10} ${cx} ${top} Q${cx + rx * .1} ${top + 30} ${cx + rx * .25} ${top + 38} Q${cx + rx * .3} ${top + 14} ${cx + rx * .5} ${top + 20} Q${cx + rx * .85} ${top + 44} ${cx + rx * .7} ${base} Z" fill="url(#flame${u})"/>
        <path class="bs-flame f2" d="M${cx - rx * .5} ${base} Q${cx - rx * .6} ${top + 56} ${cx - rx * .15} ${top + 30} Q${cx} ${top + 52} ${cx + rx * .12} ${top + 26} Q${cx + rx * .55} ${top + 60} ${cx + rx * .5} ${base} Z" fill="url(#flame${u})" opacity=".8"/>
    </g>`;
    const svg = (vb, body, cls) => `<svg class="bs-art ${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
    const eyes = (u, c, d, w = 1.8) => `<path class="bs-eye" d="${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none" filter="url(#glow${u})"/>`;

    // ---------------- 玩家：持剑修士（面朝右） ----------------
    function player(root = 'wood', opts = {}) {
        const u = ++uid, c = opts.color || colorOf(root);
        const eyeC = opts.eye || '#fff8e6';
        const body = `${defs(u, c)}
            ${aura(u, 60, 98, 46, 62, 152, 30)}
            <g class="bs-ribbon"><path d="M50 94 Q34 92 24 80 Q14 68 2 72 Q14 76 18 88 Q26 102 48 104 Z" fill="${INK2}" filter="url(#rim${u})"/></g>
            <g filter="url(#rim${u})" fill="url(#ink${u})">
                <path class="bs-hair" d="M53 22 Q41 30 37 46 Q31 60 23 72 Q36 64 43 55 Q41 67 39 79 Q49 64 53 48 Z"/>
                <path d="M51 46 Q38 52 30 70 Q22 88 19 106 Q27 101 34 106 Q36 92 42 82 Q48 72 55 63 Z"/>
                <path d="M50 44 L70 44 Q76 60 78 84 Q80 110 88 132 Q92 142 97 151 L27 151 Q33 141 38 128 Q44 106 46 84 Q46 60 50 44 Z"/>
                <path d="M66 46 Q78 52 86 63 Q92 71 95 79 L89 84 Q82 76 74 70 Q68 66 64 62 Z"/>
                <circle cx="92" cy="82" r="3.6"/>
                <path d="M52 30 Q52 18 61 17 Q70 17 71 26 Q75 29 73 32 Q71 33 71 35 Q69 42 61 43 Q54 42 52 30 Z"/>
                <ellipse cx="58" cy="15" rx="7" ry="5.6"/>
                <path d="M57 40 L65 40 L66 47 L56 47 Z"/>
                <path d="M43 151 L54 151 L52 157 L39 157 Z"/><path d="M66 151 L78 151 L83 157 L68 157 Z"/>
            </g>
            <g stroke="${FOLD}" stroke-width="1.3" fill="none" stroke-linecap="round">
                <path d="M56 62 Q58 92 53 124"/><path d="M66 64 Q70 98 77 130"/><path d="M45 118 Q40 134 34 146"/><path d="M33 80 Q29 92 27 102"/>
            </g>
            <path d="M47 85 Q60 89 75 85" stroke="${c}" stroke-width="2.4" fill="none" opacity=".9"/>
            <path d="M49 13 L71 9" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
            ${eyes(u, eyeC, 'M66 28.5 L70.5 27.8')}
            <g class="bs-sword">
                <path d="M92 79 L96 81 L121 147 L118 148 Z" fill="${c}" opacity=".45" filter="url(#glow${u})"/>
                <path d="M92.6 79.4 L95.4 80.8 L120 146.6 L118.4 147.2 Z" fill="#f4faff"/>
                <path d="M87 77 L99 85" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
            </g>`;
        return svg('0 0 124 160', body, 'bs-player-art' + (opts.mirror ? ' bs-mirror' : ''));
    }

    // ---------------- 敌人原型（面朝左） ----------------
    const ARCH = {
        beast: (u, c) => `${aura(u, 82, 100, 72, 50, 152, 52)}
            <g filter="url(#rim${u})" fill="url(#ink${u})">
                <path d="M138 70 Q160 54 156 26 Q152 46 140 56 Q150 40 146 30 Q140 50 132 62 Z"/>
                <path d="M34 86 Q30 72 40 64 Q56 54 80 58 Q104 55 122 62 Q138 68 144 84 Q146 100 138 110 L141 151 L130 151 L126 116 Q112 120 100 118 L98 151 L88 151 L88 120 Q74 118 66 110 L62 151 L51 151 L54 106 Q40 100 34 86 Z"/>
                <path d="M46 64 L53 44 L58 60 L66 40 L70 58 L80 46 L80 60 Z"/>
                <path d="M46 68 Q36 56 22 59 Q10 61 1 70 Q8 74 17 74 Q8 80 6 87 Q18 87 28 83 Q42 85 50 78 Z"/>
                <path d="M30 59 L27 39 L40 54 Z"/><path d="M38 57 L43 39 L49 56 Z"/>
            </g>
            <g stroke="${FOLD}" stroke-width="1.3" fill="none"><path d="M70 72 Q78 90 72 108"/><path d="M104 68 Q112 86 106 110"/><path d="M128 76 Q134 92 130 112"/></g>
            <path d="M8 76 L10 82 L12 76 Z M15 77 L17 83 L19 77 Z" fill="#fffaf0"/>
            ${eyes(u, c, 'M18 64 L26 66', 2.4)}`,
        demon: (u, c) => `${aura(u, 80, 96, 70, 64, 152, 18)}
            <path d="M44 60 Q20 90 16 151 L30 142 L40 151 L52 140 L64 151 L96 151 L108 140 L120 151 L130 142 L144 151 Q140 92 116 60 Z" fill="${INK2}" filter="url(#rim${u})"/>
            <g filter="url(#rim${u})" fill="url(#ink${u})">
                <path d="M56 56 Q40 60 34 78 Q30 96 40 108 L46 151 L70 151 L74 118 L86 118 L90 151 L114 151 L120 108 Q130 96 126 78 Q120 60 104 56 Q92 50 80 52 Q68 50 56 56 Z"/>
                <path d="M40 70 Q22 84 18 104 Q16 114 22 118 L28 112 Q30 100 44 88 Z"/>
                <path d="M18 115 L10 127 L21 121 L18 132 L27 121 L30 129 L31 116 Z"/>
                <path d="M120 70 Q138 84 140 104 Q140 114 134 118 L130 112 Q128 100 116 88 Z"/>
                <path d="M66 52 Q64 34 80 32 Q96 34 94 52 Q88 58 80 58 Q72 58 66 52 Z"/>
                <path d="M68 38 Q50 28 48 8 Q60 24 72 32 Z"/><path d="M92 38 Q110 28 112 8 Q100 24 88 32 Z"/>
            </g>
            <g stroke="${FOLD}" stroke-width="1.3" fill="none"><path d="M60 70 Q64 90 58 106"/><path d="M100 70 Q96 90 102 106"/><path d="M80 98 L80 116"/></g>
            <circle cx="80" cy="82" r="7" stroke="${c}" stroke-width="1.8" fill="none" filter="url(#glow${u})"/>
            <path d="M80 76 L80 88 M74 82 L86 82" stroke="${c}" stroke-width="1.2" filter="url(#glow${u})"/>
            ${eyes(u, c, 'M70 43 L77 45.5 M90 43 L83 45.5', 2.2)}`,
        ghost: (u, c) => `${aura(u, 80, 88, 60, 66, 152, 14)}
            <g class="bs-float" filter="url(#rim${u})" fill="url(#ink${u})">
                <path d="M80 18 Q54 20 50 52 Q46 82 40 108 Q34 128 20 150 Q36 143 44 150 Q52 137 60 150 Q66 139 74 152 Q82 139 90 150 Q98 137 106 150 Q112 139 122 148 Q112 128 110 106 Q105 80 110 52 Q106 20 80 18 Z"/>
                <path d="M54 68 Q30 78 18 98 Q14 107 20 109 Q28 94 50 86 Z"/>
                <path d="M106 68 Q126 82 132 104 Q134 112 128 112 Q122 94 104 86 Z"/>
            </g>
            <path class="bs-float" d="M66 38 Q80 28 94 38 Q96 56 80 63 Q64 56 66 38 Z" fill="#000"/>
            <g class="bs-float">${eyes(u, c, 'M73 48 L76 48 M84 48 L87 48', 3)}</g>
            <g stroke="${c}" stroke-width="1" opacity=".5" fill="none"><path d="M30 140 Q40 128 38 114"/><path d="M120 138 Q112 124 116 112"/></g>`,
        golem: (u, c) => `${aura(u, 80, 100, 66, 58, 152, 30)}
            <g filter="url(#rim${u})" fill="url(#ink${u})">
                <path d="M48 70 L112 70 L118 112 L104 116 L106 151 L86 151 L84 118 L76 118 L74 151 L54 151 L56 116 L42 112 Z"/>
                <path d="M65 38 L95 38 L99 66 L61 66 Z"/>
                <path d="M35 64 L57 58 L59 82 L33 88 Z"/><path d="M103 58 L125 64 L127 88 L101 82 Z"/>
                <path d="M24 88 L45 88 L47 113 L22 113 Z"/><path d="M115 88 L136 88 L138 113 L113 113 Z"/>
            </g>
            <g stroke="${FOLD}" stroke-width="1.4" fill="none"><path d="M50 92 L110 92"/><path d="M62 70 L60 112"/><path d="M98 70 L100 112"/></g>
            <g stroke="${c}" stroke-width="1.6" fill="none" filter="url(#glow${u})" class="bs-rune"><path d="M70 78 L78 88 L73 100"/><path d="M91 76 L86 90 L94 102"/><path d="M28 98 L40 98 M120 98 L132 98"/></g>
            <rect x="70" y="49" width="20" height="4" fill="${c}" filter="url(#glow${u})" class="bs-eye"/>`,
        elder: (u, c) => `${aura(u, 80, 84, 64, 70, 140, 6)}
            <circle cx="80" cy="34" r="24" stroke="${c}" stroke-width="1.6" fill="none" opacity=".75" filter="url(#glow${u})" class="bs-halo"/>
            <g class="bs-float">
                <g filter="url(#rim${u})" fill="url(#ink${u})">
                    <path d="M61 56 Q48 64 45 90 Q42 118 32 140 L128 140 Q118 118 115 90 Q112 64 99 56 Z"/>
                    <path d="M61 62 Q38 70 28 94 Q41 99 52 90 Q58 77 67 72 Z"/><path d="M99 62 Q122 70 132 94 Q119 99 108 90 Q102 77 93 72 Z"/>
                    <path d="M68 30 Q68 44 80 46 Q92 44 92 30 Q90 23 80 23 Q70 23 68 30 Z"/>
                    <path d="M66 26 L71 14 L80 22 L89 14 L94 26 Z"/>
                </g>
                <path d="M70 41 Q68 60 80 76 Q92 60 90 41 Q80 47 70 41 Z" fill="#e6dfcf"/>
                <path d="M74 50 Q80 64 86 50" stroke="#b9b0a0" stroke-width="1" fill="none"/>
                <g stroke="${FOLD}" stroke-width="1.3" fill="none"><path d="M70 80 Q66 108 60 136"/><path d="M90 80 Q94 108 100 136"/></g>
                <path d="M34 94 L28 58" stroke="#c9b48a" stroke-width="2.4" stroke-linecap="round"/>
                <g stroke="#f4efe2" stroke-width="1.2" fill="none" opacity=".9"><path d="M28 58 Q18 44 10 40"/><path d="M28 58 Q20 40 18 28"/><path d="M28 58 Q14 52 6 54"/><path d="M28 58 Q24 38 28 26"/></g>
                ${eyes(u, c, 'M72.5 33 L77 34 M83 34 L87.5 33', 1.6)}
            </g>
            <g class="bs-cloud" fill="${c}" opacity=".35"><ellipse cx="80" cy="146" rx="56" ry="9"/><ellipse cx="54" cy="141" rx="20" ry="8"/><ellipse cx="106" cy="141" rx="22" ry="8"/></g>`,
        dragon: (u, c) => `${aura(u, 86, 92, 72, 64, 152, 20)}
            <path d="M146 151 Q154 118 122 110 Q86 102 96 76 Q104 52 80 46 Q62 42 48 50" stroke="${INK}" stroke-width="20" fill="none" stroke-linecap="round" filter="url(#rim${u})"/>
            <path d="M146 151 Q154 118 122 110 Q86 102 96 76 Q104 52 80 46 Q62 42 48 50" stroke="${c}" stroke-width="2" stroke-dasharray="3 6" fill="none" opacity=".55"/>
            <g fill="url(#ink${u})" filter="url(#rim${u})">
                <path d="M120 101 L126 88 L130 104 Z M104 92 L104 78 L112 92 Z M104 66 L114 58 L110 72 Z M90 46 L96 32 L98 48 Z M74 42 L76 28 L82 44 Z"/>
                <path d="M48 50 Q32 40 15 46 Q8 50 10 56 Q22 56 28 60 Q20 64 16 70 Q30 70 40 64 Q52 60 48 50 Z"/>
                <path d="M40 44 Q44 24 60 18 Q50 30 47 46 Z"/><path d="M46 46 Q56 32 70 32 Q58 38 50 48 Z"/>
            </g>
            <g stroke="${c}" stroke-width="1.3" fill="none" opacity=".85"><path d="M14 52 Q2 60 0 78"/><path d="M18 60 Q8 76 13 92"/></g>
            <path d="M12 58 L14 63 L16 58 Z" fill="#fffaf0"/>
            ${eyes(u, c, 'M24 49 L31 51', 2.4)}`,
        plant: (u, c) => `${aura(u, 80, 96, 66, 60, 152, 24)}
            <g stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round" filter="url(#rim${u})">
                <path d="M80 151 Q76 120 80 92"/><path d="M78 130 Q50 132 36 112 Q28 100 36 92"/><path d="M82 126 Q112 128 124 108 Q130 96 122 90"/>
                <path d="M74 146 Q46 150 28 140 Q16 132 20 120"/>
            </g>
            <g filter="url(#rim${u})" fill="url(#ink${u})">
                ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M80 62 Q70 40 80 22 Q90 40 80 62 Z" transform="rotate(${a} 80 62)"/>`).join('')}
                <path d="M86 140 Q110 130 120 146 Q100 152 86 140 Z"/><path d="M74 138 Q50 126 40 142 Q60 150 74 138 Z"/>
            </g>
            <circle cx="80" cy="62" r="15" fill="#000"/>
            <g fill="#fffaf0">${[0, 40, 80, 120, 160, 200, 240, 280, 320].map(a => `<path d="M80 48 L82 54 L78 54 Z" transform="rotate(${a} 80 62)"/>`).join('')}</g>
            <circle cx="80" cy="62" r="6" fill="${c}" filter="url(#glow${u})" class="bs-eye"/>`,
        insect: (u, c) => `${aura(u, 80, 84, 72, 56, 140, 20)}
            <g class="bs-wings" filter="url(#rim${u})" fill="url(#ink${u})">
                <path d="M78 70 Q40 14 10 34 Q12 70 76 80 Z"/><path d="M82 70 Q120 14 150 34 Q148 70 84 80 Z"/>
                <path d="M78 84 Q46 96 28 128 Q60 124 78 94 Z"/><path d="M82 84 Q114 96 132 128 Q100 124 82 94 Z"/>
            </g>
            <g fill="${c}" filter="url(#glow${u})" opacity=".9"><circle cx="38" cy="44" r="6"/><circle cx="122" cy="44" r="6"/><circle cx="50" cy="108" r="4"/><circle cx="110" cy="108" r="4"/></g>
            <g fill="#000"><circle cx="38" cy="44" r="2.5"/><circle cx="122" cy="44" r="2.5"/></g>
            <ellipse cx="80" cy="84" rx="6" ry="26" fill="${INK}" filter="url(#rim${u})"/>
            <g stroke="${INK}" stroke-width="2" fill="none"><path d="M78 60 Q68 40 60 36"/><path d="M82 60 Q92 40 100 36"/></g>
            ${eyes(u, c, 'M76 62 L77 62 M83 62 L84 62', 3)}`,
        thunder: (u, c) => `${aura(u, 80, 92, 66, 66, 152, 8)}
            <g filter="url(#rim${u})" fill="url(#ink${u})" class="bs-crackle">
                <path d="M80 20 L92 34 L88 46 L104 52 L120 44 L114 62 L128 76 L110 80 L106 100 L118 118 L104 120 L110 151 L92 151 L88 126 L80 132 L72 126 L68 151 L50 151 L56 120 L42 118 L54 100 L50 80 L32 76 L46 62 L40 44 L56 52 L72 46 L68 34 Z"/>
            </g>
            <g stroke="#fffaf0" stroke-width="1.6" fill="none" filter="url(#glow${u})" class="bs-crackle">
                <path d="M80 54 L74 72 L84 80 L76 100 L82 118"/><path d="M62 70 L50 64"/><path d="M98 70 L112 64"/>
            </g>
            ${eyes(u, c, 'M72 38 L77 40 M88 38 L83 40', 2.4)}`
    };

    // 按名字归类（先匹配更具体的词）；镜像 Boss（心魔 / 衰相 / 三尸 / 证道）在调用处单独处理
    const RULES = [
        ['dragon', /龙|蛟|蛇|鲲|蜥/], ['insect', /蝶|蜂|虫|蛾/], ['plant', /花|草|树|藤|芝|莲|木灵/],
        ['thunder', /雷|劫|霆/], ['golem', /傀|石像|甲|金刚|守将|守卫|守望|兵器|塔灵/],
        ['demon', /魔|恶|煞|妖王|噬|罗刹|鬼帝/],
        ['beast', /狼|虎|熊|猪|兽|猿|豹|狐|犬|麒|鹏|鹰/],
        ['ghost', /魂|魄|影|魇|幽|幻|雾|瘴|鬼|灵童|游仙|残/],
        ['elder', /尊|君|祖|道|仙|修|使|圣|者|主|人|子|将|意志|化身|天|帝|卫/]
    ];
    function archetypeOf(name) {
        for (const [k, re] of RULES) if (re.test(name || '')) return k;
        return 'demon';
    }
    // ctx：{ mirror: 'demon' | 'shuai' | 'corpse' | 'dao' | null, root: 玩家灵根 }
    const MIRROR_COLORS = { demon: '#ff3b3b', shuai: '#a9a294', corpse: '#c070ff', dao: '#ffe08a' };
    function enemy(monster, ctx = {}) {
        if (ctx.mirror) {
            // 镜像：照着玩家画，面朝左，换成对方的颜色（心魔血红、衰相灰败、三尸紫、道祖金）
            return player(ctx.root, { color: MIRROR_COLORS[ctx.mirror], eye: ctx.mirror === 'dao' ? '#fffbe8' : MIRROR_COLORS[ctx.mirror], mirror: true });
        }
        const u = ++uid, c = colorOf(monster && monster.type);
        const kind = archetypeOf(monster && monster.name);
        return svg('0 0 160 160', defs(u, c) + ARCH[kind](u, c), 'bs-enemy-art bs-' + kind + (monster && monster.isBoss ? ' bs-boss' : ''));
    }

    // ---------------- 背景：水墨山水（按境界档换色调） ----------------
    const TIERS = {
        mortal:  { sky: ['#232b36', '#59616b'], orb: '#ece6d6', orbR: 16, far: '#3b4652', mid: '#2a333d', near: '#171c22', mist: '#c9d2d8' },
        cultist: { sky: ['#2f2230', '#c4794a'], orb: '#ffd59a', orbR: 22, far: '#5c4040', mid: '#3a2b2e', near: '#1c1517', mist: '#f0c8a8' },
        upper:   { sky: ['#17132e', '#4b3f80'], orb: '#ddd4ff', orbR: 18, far: '#3b3468', mid: '#26214b', near: '#13102a', mist: '#c8bfff' },
        immortal:{ sky: ['#2c1f0c', '#c9a24a'], orb: '#fff2c4', orbR: 30, far: '#6c5321', mid: '#3f3015', near: '#1e170a', mist: '#ffe9b0' },
        trib:    { sky: ['#07060c', '#2a2140'], orb: null, far: '#1d1830', mid: '#141022', near: '#0a0812', mist: '#6b5a9a' }
    };
    function tierOf(realmIndex, special) {
        if (special) return 'trib';
        return realmIndex >= 42 ? 'immortal' : realmIndex >= 30 ? 'upper' : realmIndex >= 14 ? 'cultist' : 'mortal';
    }
    function scene(tierKey) {
        const t = TIERS[tierKey] || TIERS.mortal, u = ++uid;
        const isles = tierKey === 'upper' ? `<g fill="${t.mid}" opacity=".85"><path d="M250 92 Q270 80 300 84 Q296 100 276 108 Q262 104 250 92 Z"/><path d="M60 70 Q74 62 92 66 Q88 78 76 82 Q66 80 60 70 Z"/></g>` : '';
        const palace = tierKey === 'immortal' ? `<g fill="${t.far}" opacity=".9"><path d="M268 118 L268 98 L262 98 L280 84 L298 98 L292 98 L292 118 Z"/><path d="M274 84 L280 70 L286 84 Z"/><rect x="250" y="112" width="60" height="6"/></g>` : '';
        const storm = tierKey === 'trib' ? `<g class="bs-storm" fill="#000" opacity=".55"><ellipse cx="80" cy="18" rx="120" ry="34"/><ellipse cx="300" cy="14" rx="140" ry="36"/></g>` : '';
        return `<svg class="bs-bg-svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id="sky${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.sky[0]}"/><stop offset="1" stop-color="${t.sky[1]}"/></linearGradient>
                ${t.orb ? `<radialGradient id="orb${u}"><stop offset="0" stop-color="${t.orb}"/><stop offset=".35" stop-color="${t.orb}" stop-opacity=".55"/><stop offset="1" stop-color="${t.orb}" stop-opacity="0"/></radialGradient>` : ''}
                <filter id="mist${u}"><feGaussianBlur stdDeviation="6"/></filter>
            </defs>
            <rect width="400" height="240" fill="url(#sky${u})"/>
            ${t.orb ? `<circle cx="300" cy="62" r="${t.orbR * 3}" fill="url(#orb${u})"/><circle cx="300" cy="62" r="${t.orbR}" fill="${t.orb}" opacity=".92"/>` : ''}
            ${storm}${isles}
            <path d="M0 150 L30 112 L52 128 L90 82 L124 120 L150 104 L188 138 L222 96 L262 128 L292 100 L330 132 L362 92 L400 124 L400 240 L0 240 Z" fill="${t.far}" opacity=".85"/>
            ${palace}
            <g class="bs-mist" fill="${t.mist}" opacity=".16" filter="url(#mist${u})"><ellipse cx="90" cy="150" rx="120" ry="14"/><ellipse cx="320" cy="140" rx="110" ry="12"/></g>
            <path d="M0 176 L42 140 L74 160 L118 126 L160 164 L204 142 L246 170 L292 138 L338 166 L374 146 L400 160 L400 240 L0 240 Z" fill="${t.mid}"/>
            <g class="bs-mist bs-mist2" fill="${t.mist}" opacity=".12" filter="url(#mist${u})"><ellipse cx="220" cy="178" rx="160" ry="12"/></g>
            <path d="M0 214 Q60 196 120 206 Q190 218 250 202 Q320 188 400 206 L400 240 L0 240 Z" fill="${t.near}"/>
        </svg>`;
    }

    // ---------------- 出手特效 ----------------
    // 所有特效都往 layer（战斗舞台上的特效层）里加元素，播完自己删掉。x / y 用舞台宽高的百分比
    function add(layer, html, life) {
        if (!layer) return null;
        const wrap = document.createElement('div');
        wrap.innerHTML = html.trim();
        const el = wrap.firstChild;
        layer.appendChild(el);
        setTimeout(() => el.remove(), life);
        return el;
    }
    // 毛笔剑痕：一道月牙形的笔触从左上划到右下（暴击是交叉的两道、金色、更粗）
    function slash(layer, opts = {}) {
        const c = opts.color || '#f4faff', crit = !!opts.crit;
        const stroke = (rot, w, delay) => `<path class="bs-slash-stroke" style="animation-delay:${delay}s" d="M8 96 Q62 34 152 18 Q70 44 8 96 Z" transform="rotate(${rot} 80 60) scale(1 ${w})" fill="#fffef6" stroke="${c}" stroke-width="2.4"/>`;
        return add(layer, `<svg class="bs-fx-slash${crit ? ' crit' : ''}" viewBox="0 0 160 120" style="left:${opts.x || 62}%;top:${opts.y || 38}%">
            <defs><filter id="sg${++uid}"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
            <g filter="drop-shadow(0 0 6px ${c})">${stroke(0, 1, 0)}${crit ? stroke(78, 1.1, 0.06) : ''}</g>
            ${crit ? `<g fill="${INK}">${[[30, 70, 4], [120, 30, 3], [60, 100, 2.6], [140, 80, 3.4], [22, 30, 2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>` : ''}
        </svg>`, 520);
    }
    // 集中线：从四周射向中心的速度线（漫画里的冲击感）
    function speedLines(layer, opts = {}) {
        const n = 44, cx = opts.cx || 64, cy = opts.cy || 52;
        let lines = '';
        for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2 + Math.random() * 0.08;
            const r0 = 34 + Math.random() * 18, r1 = 140;
            lines += `<line x1="${cx + Math.cos(a) * r0}" y1="${cy + Math.sin(a) * r0 * 0.7}" x2="${cx + Math.cos(a) * r1}" y2="${cy + Math.sin(a) * r1 * 0.7}" stroke-width="${0.6 + Math.random() * 2.2}"/>`;
        }
        return add(layer, `<svg class="bs-fx-lines" viewBox="0 0 128 104" preserveAspectRatio="none"><g stroke="${opts.color || '#fffef6'}" opacity=".85">${lines}</g></svg>`, 420);
    }
    // 书法大字：毛笔字砸下来，后面一团墨迹
    function stamp(layer, text, opts = {}) {
        const c = opts.color || '#fff1c8';
        return add(layer, `<div class="bs-stamp${opts.big ? ' big' : ''}" style="left:${opts.x || 50}%;top:${opts.y || 34}%;--rot:${opts.rot != null ? opts.rot : -8}deg;--c:${c}">
            <svg class="bs-stamp-ink" viewBox="0 0 120 60"><path d="M6 34 Q4 14 30 10 Q52 2 78 8 Q108 6 114 26 Q118 44 96 50 Q70 58 42 54 Q12 54 6 34 Z" fill="${opts.ink || INK}"/><circle cx="112" cy="50" r="3" fill="${opts.ink || INK}"/><circle cx="8" cy="12" r="2.2" fill="${opts.ink || INK}"/></svg>
            <span>${text}</span></div>`, opts.life || 900);
    }
    // 敌人出手：三道爪痕落在玩家那一侧
    function claw(layer, opts = {}) {
        const c = opts.color || '#ff4a3a';
        return add(layer, `<svg class="bs-fx-claw" viewBox="0 0 80 80" style="left:${opts.x || 10}%;top:${opts.y || 34}%"><g fill="none" stroke="${c}" stroke-linecap="round" filter="drop-shadow(0 0 4px ${c})">
            <path d="M14 10 Q30 40 22 72" stroke-width="5"/><path d="M34 6 Q50 38 42 74" stroke-width="6"/><path d="M54 10 Q68 40 60 70" stroke-width="5"/></g></svg>`, 480);
    }
    // 天雷：一道折线闪电从天而降，劈在 x%
    function lightning(layer, opts = {}) {
        const x = opts.x || 66;
        let pts = '', px = 50, py = 0;
        while (py < 100) { pts += `${px},${py} `; px += (Math.random() - 0.5) * 22; py += 8 + Math.random() * 12; }
        pts += `${50},${100}`;
        return add(layer, `<svg class="bs-fx-bolt" viewBox="0 0 100 100" preserveAspectRatio="none" style="left:${x - 14}%"><polyline points="${pts}" fill="none" stroke="${opts.color || '#e6dcff'}" stroke-width="5" filter="drop-shadow(0 0 6px ${opts.color || '#b98cff'})"/><polyline points="${pts}" fill="none" stroke="#fff" stroke-width="1.6"/></svg>`, 520);
    }
    // 元婴离体：一个金色小人从玩家飞向敌人
    function nascent(layer, opts = {}) {
        const c = opts.color || '#ffd86b';
        return add(layer, `<svg class="bs-fx-nascent" viewBox="0 0 40 40"><g fill="${c}" filter="drop-shadow(0 0 6px ${c})"><circle cx="20" cy="11" r="6"/><path d="M12 18 Q20 15 28 18 L30 32 Q20 36 10 32 Z"/><path d="M12 20 L3 15 M28 20 L37 15" stroke="${c}" stroke-width="3" stroke-linecap="round"/></g></svg>`, 700);
    }
    // 墨点飞溅：击杀时敌人化作一团墨迹散开
    function inkBurst(layer, opts = {}) {
        const c = opts.color || INK;
        let dots = '';
        for (let i = 0; i < 16; i++) {
            const a = Math.random() * Math.PI * 2, r = 20 + Math.random() * 34;
            dots += `<circle class="bs-ink-dot" style="--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r}px" cx="60" cy="60" r="${2 + Math.random() * 5}"/>`;
        }
        return add(layer, `<svg class="bs-fx-ink" viewBox="0 0 120 120" style="left:${opts.x || 70}%;top:${opts.y || 50}%"><g fill="${c}">${dots}</g><circle class="bs-ink-ring" cx="60" cy="60" r="30" fill="none" stroke="${opts.ring || '#fff1c8'}" stroke-width="2"/></svg>`, 800);
    }
    // ---------------- 突破特效用：盘膝打坐的修士（正面）与全屏集中线 ----------------
    function meditator(root = 'wood') {
        const u = ++uid, c = colorOf(root);
        return svg('0 0 160 150', `${defs(u, c)}
            ${aura(u, 80, 84, 74, 66, 140, 0)}
            <g filter="url(#rim${u})" fill="url(#ink${u})">
                <path d="M80 18 Q70 20 68 30 Q66 42 72 48 L88 48 Q94 42 92 30 Q90 20 80 18 Z"/>
                <ellipse cx="80" cy="14" rx="8" ry="6"/>
                <path d="M74 46 L86 46 L88 54 L72 54 Z"/>
                <path d="M62 54 Q52 60 50 82 Q48 100 56 112 L104 112 Q112 100 110 82 Q108 60 98 54 Z"/>
                <path d="M62 58 Q40 72 36 100 Q44 104 56 98 Q58 80 66 72 Z"/><path d="M98 58 Q120 72 124 100 Q116 104 104 98 Q102 80 94 72 Z"/>
                <path d="M26 128 Q30 108 56 106 L104 106 Q130 108 134 128 Q120 138 80 138 Q40 138 26 128 Z"/>
            </g>
            <g stroke="${FOLD}" stroke-width="1.3" fill="none"><path d="M70 66 Q66 88 68 106"/><path d="M90 66 Q94 88 92 106"/><path d="M44 124 Q80 116 116 124"/></g>
            <ellipse cx="80" cy="104" rx="10" ry="5" fill="${c}" opacity=".8" filter="url(#glow${u})"/>
            ${eyes(u, c, 'M73 32 L77 33 M83 33 L87 32', 1.5)}`, 'bs-meditator');
    }
    function burstLines(color = '#fffef6', n = 64) {
        let lines = '';
        for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2 + Math.random() * 0.05, r0 = 20 + Math.random() * 16;
            lines += `<line x1="${50 + Math.cos(a) * r0}" y1="${50 + Math.sin(a) * r0}" x2="${50 + Math.cos(a) * 90}" y2="${50 + Math.sin(a) * 90}" stroke-width="${0.12 + Math.random() * 0.45}"/>`;
        }
        return `<svg class="fx-burst-lines" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><g stroke="${color}">${lines}</g></svg>`;
    }
    // ---------------- 开始界面主视觉：山水 + 立于崖上的修士 + 毛笔大字标题 ----------------
    function startHero(root = 'wood', opts = {}) {
        return `<div class="start-hero">
            <div class="sh-bg">${scene(opts.tier || 'cultist')}</div>
            <div class="sh-figure">${player(root)}</div>
            <div class="sh-text"><div class="sh-title">散修长生录${opts.demo ? '<small>试玩版</small>' : ''}</div><div class="sh-sub">一介散修　问道长生</div></div>
        </div>`;
    }
    // ---------------- Boss 登场：左右斜切的两格分镜对峙，中间 VS，Boss 一侧配名字与一句台词 ----------------
    function versus(o) {
        return `<div class="vs-overlay">
            <div class="vs-panel vs-left" style="--c:${o.playerColor}"><div class="vs-art">${o.playerArt}</div><div class="vs-name">${o.leftName}</div></div>
            <div class="vs-panel vs-right" style="--c:${o.enemyColor}"><div class="vs-art">${o.enemyArt}</div><div class="vs-name">${o.rightName}</div><div class="vs-bubble">${o.line}</div></div>
            <div class="vs-slash"></div>
            <div class="vs-mark">VS</div>
            <div class="vs-skip">点击跳过</div>
        </div>`;
    }
    return { player, enemy, scene, tierOf, meditator, burstLines, startHero, versus, archetypeOf, colorOf, slash, speedLines, stamp, claw, lightning, nascent, inkBurst, ELEMENT, ROOT };
})();
