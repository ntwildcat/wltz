        // ==================== 游戏数据结构 ====================
        const GAME_CONFIG = {
            realms: [
                // 索引0：凡人（初始境界）
                { name: '凡人', nextReq: 50, baseStats: { hp: 50, atk: 5, def: 2, spd: 5 }, bonusPerLevel: { atk: 0.2, def: 0.05, spd: 0.05 }, isMortal: true },
                // 指数级修为曲线: 基础值100 × (索引)^2.5
                { name: '练气初期', nextReq: 100 },      // 100 × 1^2.5 = 100
                { name: '练气中期', nextReq: 566 },      // 100 × 2^2.5 ≈ 566
                { name: '练气后期', nextReq: 1559 },     // 100 × 3^2.5 ≈ 1559
                { name: '练气巅峰', nextReq: 3200 },     // 100 × 4^2.5 ≈ 3200
                { name: '筑基初期', nextReq: 5590 },     // 100 × 5^2.5 ≈ 5590
                { name: '筑基中期', nextReq: 8839 },     // 100 × 6^2.5 ≈ 8839
                { name: '筑基后期', nextReq: 13077 },    // 100 × 7^2.5 ≈ 13077
                { name: '筑基圆满', nextReq: 18379 },    // 100 × 8^2.5 ≈ 18379
                // P6 金丹期扩展（索引9-12，大阶段突破点）
                { name: '金丹初期', nextReq: 25000, baseStats: { hp: 400, atk: 40, def: 20, spd: 20 }, bonusPerLevel: { atk: 2.0, def: 0.4, spd: 0.4 } },       // 100 × 9^2.5 ≈ 24300
                { name: '金丹中期', nextReq: 31600, baseStats: { hp: 450, atk: 45, def: 22, spd: 22 }, bonusPerLevel: { atk: 2.2, def: 0.44, spd: 0.44 } },   // 100 × 10^2.5 ≈ 31623
                { name: '金丹后期', nextReq: 39200, baseStats: { hp: 500, atk: 50, def: 25, spd: 24 }, bonusPerLevel: { atk: 2.5, def: 0.5, spd: 0.5 } },     // 100 × 11^2.5 ≈ 39200
                { name: '金丹圆满', nextReq: 48000, baseStats: { hp: 560, atk: 56, def: 28, spd: 26 }, bonusPerLevel: { atk: 2.8, def: 0.56, spd: 0.56 } },   // 100 × 12^2.5 ≈ 48000
                // P7 元婴期扩展（索引13-16，大阶段突破点）
                { name: '元婴初期', nextReq: 58000, baseStats: { hp: 800, atk: 80, def: 40, spd: 30 }, bonusPerLevel: { atk: 4.0, def: 0.8, spd: 0.6 } },      // 100 × 13^2.5 ≈ 58000
                { name: '元婴中期', nextReq: 70000, baseStats: { hp: 900, atk: 90, def: 45, spd: 33 }, bonusPerLevel: { atk: 4.4, def: 0.88, spd: 0.66 } },    // 100 × 14^2.5 ≈ 70000
                { name: '元婴后期', nextReq: 83000, baseStats: { hp: 1000, atk: 100, def: 50, spd: 36 }, bonusPerLevel: { atk: 5.0, def: 1.0, spd: 0.72 } },   // 100 × 15^2.5 ≈ 83000
                { name: '元婴圆满', nextReq: 98000, baseStats: { hp: 1150, atk: 115, def: 58, spd: 40 }, bonusPerLevel: { atk: 5.6, def: 1.12, spd: 0.8 } },  // 100 × 16^2.5 ≈ 98000
                // P9 化神期扩展（索引17-20，大阶段突破点；属性由 P4 公式按境界索引自动延伸）
                { name: '化神初期', nextReq: 116000 },   // 沿曲线 100 × n^2.5，取整
                { name: '化神中期', nextReq: 136000 },
                { name: '化神后期', nextReq: 158000 },
                { name: '化神圆满', nextReq: 182000 }
            ],
            // P2功能：秘境系统
            dungeons: {
                mysteryTower: {
                    id: 'mysteryTower',
                    name: '神秘之塔',
                    desc: '五行试炼·通关掉落灵草种子',
                    icon: '🔮',
                    minRealmIndex: 2,                    // 最低需要练气中期（索引2）
                    baseRealmIndex: 2,                   // 秘径内怪物的基础境界（新索引）
                    recommendedLevel: '练气中期~练气后期',
                    monsters: [
                        { name: '塔灵傀儡', type: '金', hp: 50, atk: 8, spd: 35, def: 5, attackSpeed: 2.5, drop: 'coins', dropQty: 30 },
                        { name: '灵雾幽魂', type: '水', hp: 45, atk: 10, spd: 50, def: 3, attackSpeed: 2.2, drop: 'coins', dropQty: 35 },
                        { name: '火纹蜥蜴', type: '火', hp: 55, atk: 12, spd: 45, def: 4, attackSpeed: 2.3, drop: 'coins', dropQty: 40 },
                        { name: '土甲石像', type: '土', hp: 70, atk: 6, spd: 30, def: 8, attackSpeed: 2.7, drop: 'coins', dropQty: 35 },
                        { name: '玄机子', type: '木', hp: 100, atk: 15, spd: 40, def: 6, attackSpeed: 3.2, isBoss: true, drop: 'coins', dropQty: 100 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'seed_cleangrass', qty: [3, 5] }
                        ],
                        random: [
                            { id: 'seed_mushroom', qty: 1, probability: 0.2 },
                            { id: 'stone', qty: [2, 4], probability: 1 }
                        ],
                        coins: [200, 500],
                        skillExp: 30
                    }
                },
                mysteriousForest: {
                    id: 'mysteriousForest',
                    name: '诡异森林',
                    desc: '灵植妖物·通关掉落灵芝种子',
                    icon: '🌲',
                    minRealmIndex: 4,                    // 最低需要练气巅峰（索引4）
                    baseRealmIndex: 4,                   // 秘径内怪物的基础境界（新索引）
                    recommendedLevel: '练气巅峰~筑基初期',
                    monsters: [
                        { name: '食人花妖', type: '木', hp: 150, atk: 11, spd: 40, def: 6, attackSpeed: 2.4, drop: 'coins', dropQty: 40 },
                        { name: '腐沼瘴气', type: '水', hp: 135, atk: 9, spd: 55, def: 4, attackSpeed: 2.1, drop: 'coins', dropQty: 45 },
                        { name: '幻影蝶', type: '风', hp: 165, atk: 13, spd: 60, def: 3, attackSpeed: 2.0, drop: 'coins', dropQty: 50 },
                        { name: '古树守卫', type: '木', hp: 210, atk: 7, spd: 35, def: 10, attackSpeed: 2.8, drop: 'coins', dropQty: 55 },
                        { name: '灵草魅影', type: '木', hp: 165, atk: 10, spd: 45, def: 5, attackSpeed: 2.3, drop: 'seed_cleangrass', dropQty: 1 },
                        { name: '森林之心', type: '木', hp: 300, atk: 18, spd: 42, def: 8, attackSpeed: 3.0, isBoss: true, drop: 'coins', dropQty: 200 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'seed_mushroom', qty: [2, 4] }
                        ],
                        random: [
                            { id: 'seed_tea', qty: 1, probability: 0.3 },
                            { id: 'cleangrass', qty: [3, 5], probability: 1 }
                        ],
                        coins: [500, 1200],
                        skillExp: 50
                    }
                },
                ancientRuin: {
                    id: 'ancientRuin',
                    name: '古老遗迹',
                    desc: '法则残片·通关掉落九叶莲种子',
                    icon: '⚱️',
                    minRealmIndex: 6,                    // 最低需要筑基中期（索引6）
                    baseRealmIndex: 6,                   // 秘径内怪物的基础境界（新索引）
                    recommendedLevel: '筑基中期~筑基圆满',
                    monsters: [
                        { name: '残魂守卫', type: '雷', hp: 450, atk: 14, spd: 45, def: 7, attackSpeed: 2.3, drop: 'coins', dropQty: 60 },
                        { name: '空间裂隙', type: '风', hp: 405, atk: 11, spd: 65, def: 4, attackSpeed: 1.9, drop: 'coins', dropQty: 65 },
                        { name: '冰晶傀儡', type: '冰', hp: 495, atk: 12, spd: 40, def: 8, attackSpeed: 2.4, drop: 'coins', dropQty: 70 },
                        { name: '法则残片', type: '无', hp: 630, atk: 13, spd: 50, def: 6, attackSpeed: 2.2, drop: 'coins', dropQty: 75 },
                        { name: '遗迹意志', type: '无', hp: 900, atk: 20, spd: 48, def: 10, attackSpeed: 3.1, isBoss: true, drop: 'coins', dropQty: 300 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'seed_lotus', qty: 1 }
                        ],
                        random: [
                            { id: 'seed_tea', qty: 1, probability: 0.5 },
                            { id: 'crystal', qty: [2, 3], probability: 1 }
                        ],
                        coins: [1000, 2000],
                        skillExp: 80
                    }
                },
                // P6 金丹期秘境：天劫之地
                tribulationGround: {
                    id: 'tribulationGround',
                    name: '天劫之地',
                    desc: '雷劫淬体·通关掉落金丹秘药材料',
                    icon: '⚡',
                    minRealmIndex: 8,                       // 最低筑基圆满：这里掉落突破金丹所需的金丹秘药，必须在突破前就能进入
                    baseRealmIndex: 9,                      // 怪物境界为金丹初期
                    recommendedLevel: '筑基圆满~金丹中期',
                    monsters: [
                        { name: '雷劫残魂', type: '雷', hp: 1200, atk: 35, spd: 55, def: 15, attackSpeed: 2.2, drop: 'coins', dropQty: 150 },
                        { name: '天雷傀儡', type: '雷', hp: 1500, atk: 40, spd: 50, def: 18, attackSpeed: 2.3, drop: 'coins', dropQty: 180 },
                        { name: '劫云化身', type: '风', hp: 1350, atk: 45, spd: 65, def: 12, attackSpeed: 1.8, drop: 'coins', dropQty: 200 },
                        { name: '雷劫核心', type: '雷', hp: 1800, atk: 50, spd: 45, def: 22, attackSpeed: 2.4, drop: 'coins', dropQty: 250 },
                        { name: '天劫意志', type: '无', hp: 3000, atk: 60, spd: 55, def: 25, attackSpeed: 3.2, isBoss: true, drop: 'coins', dropQty: 800 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'danhuo_seed', qty: [2, 4] }
                        ],
                        random: [
                            { id: 'goldenpill', qty: 1, probability: 0.4 },
                            { id: 'crystal', qty: [3, 5], probability: 1 },
                            { id: 'spiritore', qty: [5, 8], probability: 1 }
                        ],
                        coins: [3000, 6000],
                        skillExp: 150
                    }
                },
                // P7 元婴期秘境：化神秘境
                huashenRealm: {
                    id: 'huashenRealm',
                    name: '元婴秘境',
                    desc: '元神试炼·通关掉落元婴丹材料',
                    icon: '🌌',
                    minRealmIndex: 12,                      // 最低金丹圆满：这里掉落突破元婴所需的元婴丹，必须在突破前就能进入
                    baseRealmIndex: 13,                     // 怪物境界为元婴初期
                    recommendedLevel: '金丹圆满~元婴中期',
                    monsters: [
                        { name: '元神残影', type: '无', hp: 5000, atk: 80, spd: 60, def: 30, attackSpeed: 2.1, drop: 'coins', dropQty: 400 },
                        { name: '虚空吞噬者', type: '风', hp: 6000, atk: 90, spd: 70, def: 25, attackSpeed: 1.8, drop: 'coins', dropQty: 450 },
                        { name: '神识傀儡', type: '雷', hp: 5500, atk: 85, spd: 55, def: 35, attackSpeed: 2.2, drop: 'coins', dropQty: 500 },
                        { name: '幻梦妖灵', type: '水', hp: 6500, atk: 95, spd: 65, def: 28, attackSpeed: 2.0, drop: 'coins', dropQty: 550 },
                        { name: '化神意志', type: '无', hp: 12000, atk: 120, spd: 60, def: 40, attackSpeed: 3.3, isBoss: true, drop: 'coins', dropQty: 2000 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'shenshi_seed', qty: [3, 6] }
                        ],
                        random: [
                            { id: 'yuanyingpill', qty: 1, probability: 0.35 },
                            { id: 'lotus', qty: [2, 4], probability: 1 },
                            { id: 'crystal', qty: [5, 10], probability: 1 }
                        ],
                        coins: [8000, 15000],
                        skillExp: 250
                    }
                },
                // P9 化神期秘境：太虚幻境（入口元婴圆满；这里掉落突破化神所需的化神丹，必须在突破前就能进入）
                taixuDream: {
                    id: 'taixuDream',
                    name: '太虚幻境',
                    desc: '虚实交织的幻境·通关掉落化神丹材料',
                    icon: '🌠',
                    minRealmIndex: 16,                      // 最低元婴圆满
                    baseRealmIndex: 17,                     // 怪物境界为化神初期
                    recommendedLevel: '元婴圆满~化神中期',
                    monsters: [
                        { name: '幻境行者', type: '风', hp: 20600, atk: 150, spd: 70, def: 50, attackSpeed: 2.0, drop: 'coins', dropQty: 800 },
                        { name: '虚实道人', type: '水', hp: 24720, atk: 165, spd: 65, def: 55, attackSpeed: 2.1, drop: 'coins', dropQty: 900 },
                        { name: '万象傀儡', type: '雷', hp: 22660, atk: 170, spd: 60, def: 65, attackSpeed: 2.2, drop: 'coins', dropQty: 1000 },
                        { name: '心魔化身', type: '无', hp: 26780, atk: 180, spd: 75, def: 60, attackSpeed: 1.9, drop: 'coins', dropQty: 1100 },
                        { name: '太虚道主', type: '无', hp: 51500, atk: 220, spd: 70, def: 70, attackSpeed: 3.2, isBoss: true, drop: 'coins', dropQty: 4000 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'seed_daofruit', qty: [2, 4] }
                        ],
                        random: [
                            { id: 'huashenpill', qty: 1, probability: 0.35 },
                            { id: 'lotus', qty: [3, 5], probability: 1 },
                            { id: 'immortalore', qty: [3, 6], probability: 1 }
                        ],
                        coins: [15000, 30000],
                        skillExp: 400
                    }
                }
            },
            skills: {
                cultivation: {
                    name: '修炼',
                    icon: '🧘',
                    level: 1,
                    exp: 0,
                    recipes: {
                        basic: { name: '吐纳灵气', desc: '基础修为', duration: 5, output: { cultivation: 5, skill: 'cultivation', exp: 8 }, requiredRealmIndex: 0, unlocked: true },
                        small: { name: '小周天', desc: '效率提升', duration: 8, output: { cultivation: 15, skill: 'cultivation', exp: 15 }, requiredRealmIndex: 1, unlocked: false },
                        big: { name: '大周天', desc: '中期主力', duration: 12, output: { cultivation: 30, skill: 'cultivation', exp: 25 }, requiredRealmIndex: 3, unlocked: false },
                        breath: { name: '龟息术', desc: '高产出', duration: 20, output: { cultivation: 100, skill: 'cultivation', exp: 40 }, requiredRealmIndex: 4, unlocked: false },
                        epiphany: { name: '顿悟', desc: '后期爆发', duration: 60, output: { cultivation: 500, skill: 'cultivation', exp: 80 }, requiredRealmIndex: 6, unlocked: false },
                        // P6 金丹期配方
                        golden_temper: { name: '金丹淬炼', desc: '金丹初期主力', duration: 30, output: { cultivation: 300, skill: 'cultivation', exp: 120 }, requiredRealmIndex: 9, unlocked: false },
                        fire_body: { name: '丹火炼体', desc: '金丹中期高产', duration: 45, output: { cultivation: 600, skill: 'cultivation', exp: 180 }, requiredRealmIndex: 10, unlocked: false },
                        golden_perfect: { name: '金丹圆满', desc: '金丹期最终法', duration: 90, output: { cultivation: 1500, skill: 'cultivation', exp: 300 }, requiredRealmIndex: 11, unlocked: false },
                        // P7 元婴期配方
                        yuanying_nurture: { name: '元婴温养', desc: '元婴初期主力', duration: 45, output: { cultivation: 800, skill: 'cultivation', exp: 200 }, requiredRealmIndex: 13, unlocked: false },
                        soul_travel: { name: '元神出窍', desc: '元婴中期高产', duration: 60, output: { cultivation: 1400, skill: 'cultivation', exp: 280 }, requiredRealmIndex: 14, unlocked: false },
                        yuanying_dao: { name: '元婴合道', desc: '元婴期最终法', duration: 120, output: { cultivation: 3500, skill: 'cultivation', exp: 450 }, requiredRealmIndex: 15, unlocked: false },
                        // P9 化神期配方
                        huashen_ning: { name: '化神凝元', desc: '化神初期主力', duration: 60, output: { cultivation: 2400, skill: 'cultivation', exp: 500 }, requiredRealmIndex: 17, unlocked: false },
                        yuanshen_huaxu: { name: '元神化虚', desc: '化神中期高产', duration: 80, output: { cultivation: 4200, skill: 'cultivation', exp: 650 }, requiredRealmIndex: 18, unlocked: false },
                        tiandi_gongming: { name: '天地共鸣', desc: '化神期最终法', duration: 150, output: { cultivation: 9000, skill: 'cultivation', exp: 900 }, requiredRealmIndex: 19, unlocked: false }
                    },
                    actions: {}
                },
                alchemy: {
                    name: '炼丹',
                    icon: '🧪',
                    level: 1,
                    exp: 0,
                    recipes: {
                        study: { name: '看丹书', desc: '增加经验', duration: 10, output: { skill: 'alchemy', exp: 15 }, requiredLevel: 1, unlocked: true },
                        millet_porridge: { name: '灵米粥', desc: '灵米 ×2（战斗食物：恢复100生命）', duration: 8, output: { items: [{ id: 'millet_porridge', qty: 2 }], skill: 'alchemy', exp: 12 }, requiredLevel: 1, requires: { millet: 2 }, unlocked: false },
                        herb_soup: { name: '灵草汤', desc: '清灵草 ×2 + 灵米 ×1（战斗食物：恢复250生命）', duration: 12, output: { items: [{ id: 'herb_soup', qty: 2 }], skill: 'alchemy', exp: 30 }, requiredLevel: 3, requires: { cleangrass: 2, millet: 1 }, unlocked: false },
                        breakthrough: { name: '筑基丹', desc: '清灵草 ×3（练气巅峰突破必需）', duration: 12, output: { items: [{ id: 'pill', qty: 1 }], skill: 'alchemy', exp: 45 }, requiredLevel: 4, requires: { cleangrass: 3 }, unlocked: false },
                        golden_pill_alchemy: { name: '金丹秘药', desc: '灵芝 ×3 + 玄晶 ×1 + 灵矿石 ×2（筑基圆满突破必需）', duration: 60, output: { items: [{ id: 'goldenpill', qty: 1 }], skill: 'alchemy', exp: 200 }, requiredLevel: 8, requires: { mushroom: 3, crystal: 1, spiritore: 2 }, unlocked: false },
                        mushroom_stew: { name: '灵芝羹', desc: '灵芝 ×2 + 灵米 ×2（战斗食物：恢复500生命）', duration: 30, output: { items: [{ id: 'mushroom_stew', qty: 2 }], skill: 'alchemy', exp: 240 }, requiredLevel: 9, requires: { mushroom: 2, millet: 2 }, unlocked: false },
                        yuanying_pill_alchemy: { name: '元婴丹', desc: '九叶莲 ×3 + 悟道茶 ×5 + 灵晶 ×2（金丹圆满突破必需）', duration: 90, output: { items: [{ id: 'yuanyingpill', qty: 1 }], skill: 'alchemy', exp: 400 }, requiredLevel: 12, requires: { lotus: 3, tea: 5, spiritcrystal: 2 }, unlocked: false },
                        huashen_pill_alchemy: { name: '化神丹', desc: '九叶莲 ×5 + 悟道茶 ×8 + 仙矿 ×2（元婴圆满突破必需）', duration: 120, output: { items: [{ id: 'huashenpill', qty: 1 }], skill: 'alchemy', exp: 700 }, requiredLevel: 17, requires: { lotus: 5, tea: 8, immortalore: 2 }, unlocked: false },
                        immortal_peach: { name: '蟠桃', desc: '悟道茶 ×3 + 灵芝 ×2（战斗食物：恢复1000生命）', duration: 60, output: { items: [{ id: 'immortal_peach', qty: 2 }], skill: 'alchemy', exp: 500 }, requiredLevel: 14, requires: { tea: 3, mushroom: 2 }, unlocked: false },
                        jade_nectar: { name: '琼浆玉液', desc: '悟道果 ×2 + 悟道茶 ×3（战斗食物：恢复2000生命，冷却更短）', duration: 80, output: { items: [{ id: 'jade_nectar', qty: 2 }], skill: 'alchemy', exp: 900 }, requiredLevel: 19, requires: { daofruit: 2, tea: 3 }, unlocked: false }
                    },
                    actions: {}
                },
                forging: {
                    name: '炼器',
                    icon: '🔨',
                    level: 1,
                    exp: 0,
                    recipes: {
                        practice: { name: '打铁练习', desc: '增加技能经验', duration: 10, output: { skill: 'forging', exp: 15 }, requiredLevel: 1, unlocked: true },
                        ironsword: { name: '铸造铁剑', desc: '铁矿石 ×3', duration: 20, output: { items: [{ id: 'sword', qty: 1 }], skill: 'forging', exp: 40 }, requiredLevel: 3, requires: { ironore: 3 }, unlocked: false },
                        iron_armor: { name: '铁甲', desc: '铁矿石 ×5', duration: 30, output: { items: [{ id: 'ironarmor', qty: 1 }], skill: 'forging', exp: 60 }, requiredLevel: 4, requires: { ironore: 5 }, unlocked: false },
                        spirit_sword: { name: '灵剑', desc: '灵矿石 ×3 + 玄晶 ×1', duration: 45, output: { items: [{ id: 'spiritsword', qty: 1 }], skill: 'forging', exp: 130 }, requiredLevel: 7, requires: { spiritore: 3, crystal: 1 }, unlocked: false },
                        spirit_armor: { name: '灵甲', desc: '灵矿石 ×4 + 玄晶 ×1', duration: 45, output: { items: [{ id: 'spiritarmor', qty: 1 }], skill: 'forging', exp: 150 }, requiredLevel: 8, requires: { spiritore: 4, crystal: 1 }, unlocked: false },
                        golden_sword: { name: '金丹剑', desc: '灵矿石 ×5 + 玄晶 ×2', duration: 60, output: { items: [{ id: 'goldensword', qty: 1 }], skill: 'forging', exp: 220 }, requiredLevel: 10, requires: { spiritore: 5, crystal: 2 }, unlocked: false },
                        golden_armor: { name: '金丹法袍', desc: '灵矿石 ×5 + 玄晶 ×2', duration: 60, output: { items: [{ id: 'goldenarmor', qty: 1 }], skill: 'forging', exp: 260 }, requiredLevel: 11, requires: { spiritore: 5, crystal: 2 }, unlocked: false },
                        golden_pendant: { name: '金丹佩', desc: '灵晶 ×1 + 玄晶 ×3', duration: 50, output: { items: [{ id: 'goldenpendant', qty: 1 }], skill: 'forging', exp: 300 }, requiredLevel: 12, requires: { spiritcrystal: 1, crystal: 3 }, unlocked: false },
                        yuanying_sword: { name: '元婴灵剑', desc: '灵晶 ×3 + 玄晶 ×5', duration: 90, output: { items: [{ id: 'yuanyingsword', qty: 1 }], skill: 'forging', exp: 500 }, requiredLevel: 15, requires: { spiritcrystal: 3, crystal: 5 }, unlocked: false },
                        yuanying_armor: { name: '元婴法衣', desc: '灵晶 ×4 + 玄晶 ×4', duration: 90, output: { items: [{ id: 'yuanyingarmor', qty: 1 }], skill: 'forging', exp: 560 }, requiredLevel: 16, requires: { spiritcrystal: 4, crystal: 4 }, unlocked: false },
                        yuanying_pendant: { name: '元婴佩', desc: '灵晶 ×2 + 仙矿 ×1', duration: 80, output: { items: [{ id: 'yuanyingpendant', qty: 1 }], skill: 'forging', exp: 620 }, requiredLevel: 17, requires: { spiritcrystal: 2, immortalore: 1 }, unlocked: false },
                        huashen_sword: { name: '化神剑', desc: '混沌石 ×3 + 仙矿 ×2', duration: 110, output: { items: [{ id: 'huashensword', qty: 1 }], skill: 'forging', exp: 800 }, requiredLevel: 19, requires: { chaosstone: 3, immortalore: 2 }, unlocked: false },
                        huashen_armor: { name: '化神法衣', desc: '混沌石 ×4 + 仙矿 ×2', duration: 110, output: { items: [{ id: 'huashenarmor', qty: 1 }], skill: 'forging', exp: 880 }, requiredLevel: 20, requires: { chaosstone: 4, immortalore: 2 }, unlocked: false },
                        huashen_pendant: { name: '化神佩', desc: '混沌石 ×2 + 灵晶 ×3', duration: 100, output: { items: [{ id: 'huashenpendant', qty: 1 }], skill: 'forging', exp: 950 }, requiredLevel: 21, requires: { chaosstone: 2, spiritcrystal: 3 }, unlocked: false }
                    },
                    actions: {}
                },
                farming: {
                    name: '灵田',
                    icon: '🌾',
                    level: 1,
                    exp: 0,
                    recipes: {
                        millet: { name: '种植灵米', desc: '食物', duration: 5, output: { items: [{ id: 'millet', qty: 1 }], skill: 'farming', exp: 10 }, requiredLevel: 1, unlocked: true },
                        grass: { name: '种植清灵草', desc: '炼丹材料 需灵草种子', duration: 10, output: { items: [{ id: 'cleangrass', qty: 1 }], skill: 'farming', exp: 20 }, requiredLevel: 2, requires: { seed_cleangrass: 1 }, unlocked: false },
                        mushroom: { name: '种植灵芝', desc: '高级材料 需灵芝种子', duration: 30, output: { items: [{ id: 'mushroom', qty: 1 }], skill: 'farming', exp: 70 }, requiredLevel: 5, requires: { seed_mushroom: 1 }, unlocked: false },
                        tea: { name: '种植悟道茶', desc: '特殊材料 需悟道茶种子', duration: 60, output: { items: [{ id: 'tea', qty: 1 }], skill: 'farming', exp: 190 }, requiredLevel: 9, requires: { seed_tea: 1 }, unlocked: false },
                        lotus: { name: '种植九叶莲', desc: '渡劫材料 需九叶莲种子', duration: 300, output: { items: [{ id: 'lotus', qty: 1 }], skill: 'farming', exp: 320 }, requiredLevel: 12, requires: { seed_lotus: 1 }, unlocked: false },
                        daofruit: { name: '种植悟道果', desc: '化神材料 需悟道果种子（太虚幻境掉落）', duration: 480, output: { items: [{ id: 'daofruit', qty: 1 }], skill: 'farming', exp: 600 }, requiredLevel: 16, requires: { seed_daofruit: 1 }, unlocked: false }
                    },
                    actions: {}
                },
                mining: {
                    name: '采矿',
                    icon: '⛏️',
                    level: 1,
                    exp: 0,
                    recipes: {
                        stone: { name: '采石', desc: '产出碎石', duration: 5, output: { items: [{ id: 'stone', qty: 1 }], skill: 'mining', exp: 10 }, requiredLevel: 1, unlocked: true },
                        ironore: { name: '采铁矿', desc: '产出铁矿石', duration: 8, output: { items: [{ id: 'ironore', qty: 1 }], skill: 'mining', exp: 25 }, requiredLevel: 3, unlocked: false },
                        spiritore: { name: '采灵矿', desc: '产出灵矿石', duration: 12, output: { items: [{ id: 'spiritore', qty: 1 }], skill: 'mining', exp: 60 }, requiredLevel: 6, unlocked: false },
                        crystal: { name: '采玄晶', desc: '产出玄晶', duration: 20, output: { items: [{ id: 'crystal', qty: 1 }], skill: 'mining', exp: 110 }, requiredLevel: 8, unlocked: false },
                        spiritcrystal: { name: '采灵晶', desc: '产出灵晶', duration: 25, output: { items: [{ id: 'spiritcrystal', qty: 1 }], skill: 'mining', exp: 220 }, requiredLevel: 12, unlocked: false },
                        immortalore: { name: '采仙矿', desc: '产出仙矿', duration: 35, output: { items: [{ id: 'immortalore', qty: 1 }], skill: 'mining', exp: 330 }, requiredLevel: 15, unlocked: false },
                        chaosstone: { name: '采混沌石', desc: '产出混沌石', duration: 50, output: { items: [{ id: 'chaosstone', qty: 1 }], skill: 'mining', exp: 600 }, requiredLevel: 18, unlocked: false }
                    },
                    actions: {}
                },
                battle: {
                    name: '战斗',
                    icon: '⚔️',
                    level: 1,
                    exp: 0,
                    actions: {}
                },
                // P6 丹火技能（金丹期新技能）
                danhuo: {
                    name: '丹火',
                    icon: '🔥',
                    level: 1,
                    exp: 0,
                    recipes: {
                        gather: { name: '凝聚丹火', desc: '从金丹中提取丹火', duration: 15, output: { items: [{ id: 'danhuo', qty: 1 }], skill: 'danhuo', exp: 30 }, requiredLevel: 1, unlocked: true },
                        seed: { name: '培育丹火', desc: '以丹火种子培育，一次得到 4 份丹火（种子来自天劫之地）', duration: 20, output: { items: [{ id: 'danhuo', qty: 4 }], skill: 'danhuo', exp: 60 }, requiredLevel: 2, requires: { danhuo_seed: 1 }, unlocked: false },
                        temper: { name: '淬炼法器', desc: '用丹火强化装备', duration: 30, output: { items: [{ id: 'tempered_essence', qty: 1 }], skill: 'danhuo', exp: 90 }, requiredLevel: 3, requires: { danhuo: 3 }, unlocked: false },
                        golden_pill: { name: '炼制元婴丹', desc: '丹火 ×5 + 九叶莲 ×1 + 悟道茶 ×3（金丹圆满突破必需）', duration: 60, output: { items: [{ id: 'yuanyingpill', qty: 1 }], skill: 'danhuo', exp: 300 }, requiredLevel: 6, requires: { danhuo: 5, lotus: 1, tea: 3 }, unlocked: false },
                        huashen_pill_fire: { name: '炼制化神丹', desc: '丹火 ×8 + 九叶莲 ×2 + 悟道茶 ×4（元婴圆满突破必需）', duration: 90, output: { items: [{ id: 'huashenpill', qty: 1 }], skill: 'danhuo', exp: 500 }, requiredLevel: 10, requires: { danhuo: 8, lotus: 2, tea: 4 }, unlocked: false }
                    },
                    actions: {}
                },
                // P9 悟道技能（化神期新技能）：八种法则，每种一个「参悟」行动，法则等级见 LAW_EFFECTS
                wudao: {
                    name: '悟道',
                    icon: '☯️',
                    level: 1,
                    exp: 0,
                    recipes: {
                        metal: { name: '参悟金之法则', desc: '锋锐与杀伐之道', duration: 30, output: { skill: 'wudao', exp: 20 }, requiredLevel: 1, unlocked: false },
                        wood: { name: '参悟木之法则', desc: '生机与繁育之道', duration: 30, output: { skill: 'wudao', exp: 20 }, requiredLevel: 1, unlocked: false },
                        water: { name: '参悟水之法则', desc: '滋养与流转之道', duration: 30, output: { skill: 'wudao', exp: 20 }, requiredLevel: 1, unlocked: false },
                        fire: { name: '参悟火之法则', desc: '焚灭与淬炼之道', duration: 30, output: { skill: 'wudao', exp: 20 }, requiredLevel: 1, unlocked: false },
                        earth: { name: '参悟土之法则', desc: '厚重与承载之道', duration: 30, output: { skill: 'wudao', exp: 20 }, requiredLevel: 1, unlocked: false },
                        wind: { name: '参悟风之法则', desc: '迅捷与自在之道', duration: 30, output: { skill: 'wudao', exp: 20 }, requiredLevel: 1, unlocked: false },
                        thunder: { name: '参悟雷之法则', desc: '雷霆与天罚之道', duration: 30, output: { skill: 'wudao', exp: 20 }, requiredLevel: 1, unlocked: false },
                        ice: { name: '参悟冰之法则', desc: '寒凝与静守之道', duration: 30, output: { skill: 'wudao', exp: 20 }, requiredLevel: 1, unlocked: false }
                    },
                    actions: {}
                },
                // P7 神识技能（元婴期新技能）
                shenshi: {
                    name: '神识',
                    icon: '👁️',
                    level: 1,
                    exp: 0,
                    recipes: {
                        gather: { name: '凝练神识', desc: '从元婴中提取神识', duration: 20, output: { items: [{ id: 'shenshi', qty: 1 }], skill: 'shenshi', exp: 40 }, requiredLevel: 1, unlocked: true },
                        seed: { name: '培育神识', desc: '以神识种子培育，一次得到 4 份神识（种子来自元婴秘境）', duration: 25, output: { items: [{ id: 'shenshi', qty: 4 }], skill: 'shenshi', exp: 80 }, requiredLevel: 2, requires: { shenshi_seed: 1 }, unlocked: false },
                        huashen_pill: { name: '炼制化神丹', desc: '神识 ×12 + 悟道茶 ×5 + 九叶莲 ×3（元婴圆满突破必需）', duration: 100, output: { items: [{ id: 'huashenpill', qty: 1 }], skill: 'shenshi', exp: 400 }, requiredLevel: 8, requires: { shenshi: 12, tea: 5, lotus: 3 }, unlocked: false },
                        scout: { name: '神识探查', desc: '用神识探查秘境，提升掉落率', duration: 40, output: { items: [{ id: 'shenshi_map', qty: 1 }], skill: 'shenshi', exp: 120 }, requiredLevel: 3, requires: { shenshi: 2 }, unlocked: false },
                        meditate: { name: '神识入定', desc: '悟道果 ×1 → 神识 ×3', duration: 60, output: { items: [{ id: 'shenshi', qty: 3 }], skill: 'shenshi', exp: 260 }, requiredLevel: 10, requires: { daofruit: 1 }, unlocked: false }
                    },
                    actions: {}
                }
            },
            items: {
                // 食物和材料
                millet: { name: '灵米', icon: '🌾', type: 'material', sellPrice: 10 },
                cleangrass: { name: '清灵草', icon: '🍃', type: 'material', sellPrice: 25 },
                mushroom: { name: '灵芝', icon: '🍄', type: 'material', sellPrice: 50 },
                tea: { name: '悟道茶叶', icon: '🍵', type: 'material', sellPrice: 100 },
                lotus: { name: '九叶莲', icon: '🌸', type: 'material', sellPrice: 200 },

                // 种子（秘境掉落）
                seed_millet: { name: '灵米种子', icon: '🌱', type: 'seed', sellPrice: 5 },
                seed_cleangrass: { name: '清灵草种子', icon: '🌿', type: 'seed', sellPrice: 15 },
                seed_mushroom: { name: '灵芝种子', icon: '🍄', type: 'seed', sellPrice: 30 },
                seed_tea: { name: '悟道茶种子', icon: '🌾', type: 'seed', sellPrice: 60 },
                seed_lotus: { name: '九叶莲种子', icon: '🌸', type: 'seed', sellPrice: 150 },

                // 矿石
                stone: { name: '碎石', icon: '🪨', type: 'ore', sellPrice: 5 },
                ironore: { name: '铁矿石', icon: '🔩', type: 'ore', sellPrice: 20 },
                spiritore: { name: '灵矿石', icon: '✨', type: 'ore', sellPrice: 50 },
                crystal: { name: '玄晶', icon: '💎', type: 'ore', sellPrice: 200 },

                // 丹药
                restpill: { name: '回气丹', icon: '💊', type: 'consumable', sellPrice: 30 },
                pill: { name: '筑基丹', icon: '🔮', type: 'breakthrough_material', sellPrice: 60 },  // 突破材料
                gatherpill: { name: '聚灵丹', icon: '🔵', type: 'consumable', sellPrice: 100 },
                realmpill: { name: '破境丹', icon: '🟣', type: 'special', sellPrice: 200 },  // 已弃用，仅供收集
                marrpill: { name: '洗髓丹', icon: '🟡', type: 'consumable', sellPrice: 500 },
                goldenpill: { name: '金丹秘药', icon: '🟤', type: 'breakthrough_material' },  // P6 突破材料

                // 特殊材料
                spiritstone: { name: '灵石', icon: '💎', type: 'currency' },
                jade: { name: '灵玉', icon: '📿', type: 'jewelry', sellPrice: 80, effect: { workSpeed: 0.95 } },

                // P6 丹火相关物品
                danhuo: { name: '丹火', icon: '🔥', type: 'material', sellPrice: 500 },
                danhuo_seed: { name: '丹火种子', icon: '🔥', type: 'seed', sellPrice: 50 },
                tempered_essence: { name: '淬炼精华', icon: '✨', type: 'material', sellPrice: 100 },

                // P7 神识相关物品
                shenshi: { name: '神识', icon: '👁️', type: 'material', sellPrice: 2000 },
                shenshi_seed: { name: '神识种子', icon: '👁️', type: 'seed', sellPrice: 100 },
                yuanyingpill: { name: '元婴丹', icon: '⭕', type: 'breakthrough_material' },
                huashenpill: { name: '化神丹', icon: '🔮', type: 'breakthrough_material' },  // P9 突破材料
                shenshi_map: { name: '神识地图', icon: '🗺️', type: 'material', sellPrice: 200 },

                // 装备
                sword: { name: '桃木剑', icon: '⚔️', type: 'weapon', sellPrice: 60, stats: { atk: 15 } },
                ironarmor: { name: '铁甲', icon: '🛡️', type: 'armor', sellPrice: 120, stats: { def: 10 } },
                spiritsword: { name: '灵剑', icon: '⚡', type: 'weapon', sellPrice: 400, stats: { atk: 40 } },
                goldenarmor: { name: '金丹法袍', icon: '👔', type: 'armor', sellPrice: 1200, stats: { def: 25, hp: 50 } },
                yuanyingsword: { name: '元婴灵剑', icon: '✨', type: 'weapon', sellPrice: 4000, stats: { atk: 80 } },

                // P6/P7 新丹药
                spiritpill: { name: '聚灵丹（高级）', icon: '🔷', type: 'consumable' },

                // P6/P7 新矿石和种子
                spiritcrystal: { name: '灵晶', icon: '🔹', type: 'ore', sellPrice: 200 },
                immortalore: { name: '仙矿', icon: '✨', type: 'ore', sellPrice: 800 },
                chaosstone: { name: '混沌石', icon: '🌑', type: 'ore', sellPrice: 1200 },
                daofruit: { name: '悟道果', icon: '🍇', type: 'material', sellPrice: 600 },
                seed_daofruit: { name: '悟道果种子', icon: '🌰', type: 'seed', sellPrice: 300 },

                // P6/P7 新作物
                // 战斗食物（在炼丹中制作；在战斗中HP低于50%时自动食用）
                millet_porridge: { name: '灵米粥', icon: '🍲', type: 'food', sellPrice: 20 },
                herb_soup: { name: '灵草汤', icon: '🍜', type: 'food', sellPrice: 60 },
                mushroom_stew: { name: '灵芝羹', icon: '🥣', type: 'food', sellPrice: 150 },
                immortal_peach: { name: '蟠桃', icon: '🍑', type: 'food', sellPrice: 400 },
                jade_nectar: { name: '琼浆玉液', icon: '🍶', type: 'food', sellPrice: 1200 },
                // 炼器新增装备
                spiritarmor: { name: '灵甲', icon: '🛡️', type: 'armor', sellPrice: 160, stats: { def: 16, hp: 30 } },
                goldensword: { name: '金丹剑', icon: '🗡️', type: 'weapon', sellPrice: 260, stats: { atk: 62 } },
                goldenpendant: { name: '金丹佩', icon: '📿', type: 'jewelry', sellPrice: 300, stats: { spd: 6, hp: 40 } },
                yuanyingarmor: { name: '元婴法衣', icon: '🥋', type: 'armor', sellPrice: 1100, stats: { def: 45, hp: 120 } },
                yuanyingpendant: { name: '元婴佩', icon: '📿', type: 'jewelry', sellPrice: 700, stats: { spd: 10, hp: 80 } },
                huashensword: { name: '化神剑', icon: '🗡️', type: 'weapon', sellPrice: 3500, stats: { atk: 110 } },
                huashenarmor: { name: '化神法衣', icon: '🥼', type: 'armor', sellPrice: 4200, stats: { def: 65, hp: 170 } },
                huashenpendant: { name: '化神佩', icon: '📿', type: 'jewelry', sellPrice: 2500, stats: { spd: 14, hp: 110 } }
            },
            shop: {
                upgrades: [
                    { id: 'inventory_slot', name: '背包扩展', icon: '📦', price: 100, desc: '+5格容量', type: 'upgrade', bought: false },
                    { id: 'farming_slot', name: '第二块灵田', icon: '🌾', price: 5000, desc: '解锁第二块灵田：可与主角同时种植灵田配方，速度相同，可种同一种作物（只能买一次）', type: 'upgrade', bought: false },
                    { id: 'jewelry_slot2', name: '第二饰品栏位', icon: '💍', price: 8000, desc: '解锁第二个饰品栏位（可同时佩戴两件不同的饰品）', minRealmIndex: 9, type: 'upgrade', bought: false }
                ],
                food: [
                    { id: 'millet', name: '灵米', icon: '🌾', price: 10, desc: '普通食物' },
                    { id: 'cleangrass', name: '清灵草', icon: '🍃', price: 25, desc: '炼丹材料' },
                    { id: 'mushroom', name: '灵芝', icon: '🍄', price: 50, desc: '高级材料' }
                ],
                equipment: [
                    { id: 'sword', name: '桃木剑', icon: '⚔️', price: 150, desc: '攻击力+15', minRealmIndex: 0 },
                    { id: 'ironarmor', name: '铁甲', icon: '🛡️', price: 300, desc: '防御力+10', minRealmIndex: 5 },
                    { id: 'spiritsword', name: '灵剑', icon: '⚡', price: 1000, desc: '攻击力+40', minRealmIndex: 8 },
                    { id: 'goldenarmor', name: '金丹法袍', icon: '👔', price: 3000, desc: '防御力+25', minRealmIndex: 9 },
                    { id: 'yuanyingsword', name: '元婴灵剑', icon: '✨', price: 10000, desc: '攻击力+80', minRealmIndex: 13 }
                ],
                materials: [
                    { id: 'spiritore', name: '灵矿石', icon: '✨', price: 150, desc: '炼器材料', minRealmIndex: 5 },
                    { id: 'crystal', name: '玄晶', icon: '💎', price: 300, desc: '高级材料', minRealmIndex: 8 },
                    { id: 'spiritcrystal', name: '灵晶', icon: '🔹', price: 500, desc: '元婴级材料', minRealmIndex: 9 },
                    { id: 'immortalore', name: '仙矿', icon: '✨', price: 2000, desc: '顶级材料', minRealmIndex: 13 }
                ],
                arts: [
                    { id: 'qingmu_art', name: '青木诀', icon: '🌿', price: 200, desc: '修炼速度 ×1.1', minRealmIndex: 1, type: 'art' },
                    { id: 'liuyun_art', name: '流云诀', icon: '☁️', price: 1200, desc: '修炼速度 ×1.25', minRealmIndex: 3, type: 'art' },
                    { id: 'xuanshui_art', name: '玄水经', icon: '💧', price: 4000, desc: '修炼速度 ×1.35', minRealmIndex: 5, type: 'art' },
                    { id: 'lieyang_art', name: '烈阳功', icon: '☀️', price: 8000, desc: '修炼速度 ×1.45', minRealmIndex: 7, type: 'art' },
                    { id: 'golden_art', name: '金丹大道', icon: '📜', price: 10000, desc: '修炼速度 ×1.5', minRealmIndex: 8, type: 'art' },
                    { id: 'fire_art', name: '焚天诀', icon: '🔥', price: 20000, desc: '修炼速度 ×1.8', minRealmIndex: 9, type: 'art' },
                    { id: 'yuanying_art', name: '元婴真解', icon: '👁️', price: 30000, desc: '修炼速度 ×2.2', minRealmIndex: 11, type: 'art' },
                    { id: 'soul_art', name: '太虚元神诀', icon: '🌌', price: 50000, desc: '修炼速度 ×2.8', minRealmIndex: 13, type: 'art' },
                { id: 'huashen_art', name: '化神真经', icon: '📖', price: 120000, desc: '修炼速度 ×3.4', minRealmIndex: 17, type: 'art' },
                { id: 'primordial_art', name: '太初混元诀', icon: '☯️', price: 300000, desc: '修炼速度 ×4.2', minRealmIndex: 19, type: 'art' }
                ]
            }
        };

        // P0-4 食物系统配置
        const FOOD_CONFIG = {
            foods: {
                // 基础食物
                millet_porridge: {
                    id: 'millet_porridge',
                    name: '灵米粥',
                    icon: '🍲',
                    hpRestore: 100,           // 恢复HP
                    cooldown: 1.0,            // 使用冷却（秒）
                    minRealm: 1,              // 最低可用境界
                    description: '简单的灵米粥，恢复100点生命值'
                },
                // 中级食物
                herb_soup: {
                    id: 'herb_soup',
                    name: '灵草汤',
                    icon: '🍜',
                    hpRestore: 250,           // 恢复HP
                    cooldown: 2.0,
                    minRealm: 4,              // 练气巅峰
                    description: '由清灵草熬制的汤，恢复250点生命值'
                },
                // 高级食物
                mushroom_stew: {
                    id: 'mushroom_stew',
                    name: '灵芝羹',
                    icon: '🥣',
                    hpRestore: 500,           // 恢复HP
                    cooldown: 3.0,
                    minRealm: 9,              // 金丹初期
                    description: '灵芝熬制的浓羹，恢复500点生命值'
                },
                // 极品食物
                immortal_peach: {
                    id: 'immortal_peach',
                    name: '蟠桃',
                    icon: '🍑',
                    hpRestore: 1000,          // 恢复HP
                    cooldown: 5.0,
                    minRealm: 13,             // 元婴初期
                    description: '传说中的仙果，完全恢复生命值'
                },
                // 化神期食物：恢复量更大、冷却更短
                jade_nectar: {
                    id: 'jade_nectar',
                    name: '琼浆玉液',
                    icon: '🍶',
                    hpRestore: 2000,          // 恢复HP
                    cooldown: 3.0,
                    minRealm: 17,             // 化神初期
                    description: '化神修士的琼浆，饮下瞬间生机勃发，冷却比蟠桃更短'
                }
            },
            // 默认食物配置
            defaultFood: 'millet_porridge',
            // 自动进食配置
            autoEatConfig: {
                hpThreshold: 0.5,             // HP低于50%时自动吃饭
                cooldown: 1.0                 // 自动进食的冷却时间
            }
        };

        // Priority 4: 战斗系统完整公式
        // P4 平衡层：秘境怪物的原始数值按旧属性体系设计，P4 改为「境界×线性倍数」后玩家属性
        // 明显偏低，这里按系数缩放怪物血量与攻击。系数由战斗模拟标定：以「8 个灵根的平均通关率」为准
        // （保留真实的怪物属性和克制关系），最低境界平均通关率约 60%~90%。原始数值保留在 GAME_CONFIG.dungeons，
        // 调平衡只需改此表。修改装备/属性/灵根特效后需要重新标定，临界点很陡。
        const P4_MONSTER_SCALE = {
            mysteryTower: 0.7,
            mysteriousForest: 0.54,
            ancientRuin: 0.416,
            tribulationGround: 0.1365,
            huashenRealm: 0.0636,
            taixuDream: 0.03
        };
        Object.entries(P4_MONSTER_SCALE).forEach(([dungeonId, scale]) => {
            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            if (!dungeon) return;
            dungeon.monsters.forEach(m => {
                m.hp = Math.max(1, Math.round(m.hp * scale));
                m.atk = Math.max(1, Math.round(m.atk * scale));
            });
        });

        // 普通战斗区域的敌人系数：血量与攻击分开缩放（原始模板见 enterBattleArea）。
        // 标定：无特效玩家（桃木剑、最低境界）通关率约 65%，且敌人平均每击约打掉玩家 12% 最大生命，
        // 让防御/闪避/生命类特效在普通战斗里同样有价值（只缩放血量会变成纯输出检定，输出型灵根占尽优势）。
        const P4_AREA_SCALE = {
            forest: { hp: 1.071, atk: 1.071 }, mountain: { hp: 1.056, atk: 1.117 }, deepMountain: { hp: 0.876, atk: 1.079 },
            swamp: { hp: 0.978, atk: 1.206 }, abyss: { hp: 0.775, atk: 1.104 }, goldenPlains: { hp: 0.572, atk: 0.735 },
            tribulationGround: { hp: 0.424, atk: 0.654 }, voidSea: { hp: 0.15, atk: 0.497 }, abyssRuins: { hp: 0.047, atk: 0.353 },
            chaosWastes: { hp: 0.037, atk: 0.18 }, nineNether: { hp: 0.0175, atk: 0.14 }
        };

        const BATTLE_FORMULAS = {
            // 基础命中率（与速度差成反比）
            // 命中率 = 0.95 - (敌人SPD - 玩家SPD) / (玩家SPD * 10)
            // 例：玩家SPD 100, 敌人SPD 80: 命中率 = 0.95 + (80-100)/(100*10) = 0.93
            calculateHitChance: (playerSPD, enemySPD) => {
                let hitChance = 0.95 - (enemySPD - playerSPD) / (playerSPD * 10);
                return Math.max(0.4, Math.min(0.99, hitChance)); // 命中率范围: 40%-99%
            },

            // 闪避率 = 敌人SPD / (玩家SPD + 敌人SPD)
            // 例：玩家SPD 100, 敌人SPD 80: 闪避率 = 80/180 ≈ 44%
            calculateEvasion: (playerSPD, enemySPD) => {
                return enemySPD / (playerSPD + enemySPD);
            },

            // 防御减伤 = 防守者DEF / (攻击者ATK + 防守者DEF) * 0.75
            // 例：玩家ATK 50, 敌人DEF 20: 减伤 = 20/(50+20) * 0.75 = 17.1%
            calculateDamageReduction: (attackerATK, defenderDEF) => {
                return (defenderDEF / (attackerATK + defenderDEF)) * 0.75;
            },

            // 实际伤害 = 基础伤害 × (1 - 防御减伤) × 克制倍数
            // 基础伤害 = ATK + 随机值(±30%) + 装备等级加成
            calculateDamage: (attacker, defender) => {
                // 基础伤害
                let baseDmg = attacker.atk || 10;
                baseDmg += Math.random() * baseDmg * 0.3 - baseDmg * 0.15; // ±15%随机

                // 防御减伤 (使用原始攻击力计算，符合技术文档)
                const defenseDEF = defender.def || 0;
                const damageReduction = (defenseDEF / ((attacker.atk || 10) + defenseDEF)) * 0.75;
                baseDmg *= (1 - damageReduction);

                return Math.max(1, Math.floor(baseDmg)); // 最少1点伤害
            }
        };

        // 技能等级效果配置
        const SKILL_LEVEL_EFFECTS = {
            cultivation: {
                name: '修炼',
                effectPer: 2,
                effectType: 'output',
                // 每级修为产出 +2%/级: 等级1 = 1.0x, 等级50 = 1.98x
                formula: (level) => 1 + (level - 1) * 0.02
            },
            alchemy: {
                name: '炼丹',
                effectPer: 5,
                effectType: 'quantity',
                // 每5级产量 +1: 1-5级产1个, 6-10级产2个, 11-15级产3个
                formula: (level) => Math.floor(1 + Math.floor((level - 1) / 5))
            },
            forging: {
                name: '炼器',
                effectPer: 0.5,
                effectType: 'quality',
                // 每级装备属性 +0.5%（对身上所有装备生效）: 等级21 = +10%
                formula: (level) => 1 + (level - 1) * 0.005
            },
            farming: {
                name: '灵田',
                effectPer: 1,
                effectType: 'speed',
                // 每级速度 -1%: 等级50时速度×0.5(快50%)
                formula: (level) => 1 - (level - 1) * 0.01
            },
            mining: {
                name: '采矿',
                effectPer: 2,
                effectType: 'output',
                formula: (level) => 1 + (level - 1) * 0.02
            },
            shenshi: {
                name: '神识',
                effectPer: 1,
                effectType: 'clone',
                // 分身做事的耗时倍率：基础 ×1.6，神识每级 -0.01，最低 ×1.2（41 级达到）
                formula: (level) => Math.max(1.2, 1.6 - (level - 1) * 0.01)
            },
            battle: {
                name: '战斗',
                effectPer: 0.5,
                effectType: 'damage',
                // 每级伤害 +0.5%（普通战斗与秘境）
                formula: (level) => 1 + (level - 1) * 0.005
            }
        };

        let gameState = {
            version: 1,  // 游戏数据版本，用于自动迁移
            player: {
                name: '',
                gender: '男',
                origin: '',
                spiritRoot: '',
                realmIndex: 0,
                cultivationXP: 0,
                currentArt: 'basic_art',        // 当前装备的功法
                coins: 100,
                inventory: [],
                equipment: { weapon: null, armor: null, jewelry: [] },
                lastBreakthroughTime: 0,
                // 永久升级跟踪（P1功能）
                inventoryCapacity: 50,
                farmingSlots: 1,
                boughtUpgrades: [],  // 已购买的永久升级ID列表
                temperLevel: 0,      // 丹火淬炼次数（最多3次，每次装备属性+10%）
                scoutBonus: false,   // 神识探查：下次秘境掉落率+30%
                // P2功能：属性系统
                stats: {
                    hp: { current: 100, max: 100 },  // 生命值（当前/最大）[P8修改]
                    atk: 10,           // 攻击力
                    def: 5,            // 防御力
                    spd: 10            // 攻击速度
                },
                // P8 战斗系统：双向攻击 + HP管理
                attackTimer: 0,                      // 玩家攻击计时器（秒）
                foodSlot: null,                      // 装备的食物ID
                foodCount: 0,                        // 食物数量
                autoEat: true,                       // 是否自动吃饭
                foodUseTimer: 0,                     // 食物使用计时器
                lastHPRecoverTime: Date.now()        // 最后HP恢复时间（离线恢复用）
            },
            skills: JSON.parse(JSON.stringify(GAME_CONFIG.skills)),
            currentAction: null,
            currentActionProgress: 0,
            workSpeedMultiplier: 1,
            lastSaveTime: Date.now(),
            lastActiveTime: Date.now(),
            // 秘境系统
            dungeons: {
                currentDungeon: null,  // 当前进入的秘境ID，null表示未在秘境中
                currentMonsterIndex: 0,  // 当前怪物在序列中的位置
                currentMonsterHP: 0,   // 当前怪物的生命值
                defeatCount: 0,  // 已击败的怪物数
                bossDefeated: false,  // BOSS是否已被击败
                // P8 双向战斗系统
                monsterAttackTimer: 0,              // 怪物攻击计时器（秒）
                battleState: 'idle',                // 战斗状态：idle/fighting/player_dead/monster_dead/dungeon_clear
                playerDeathCount: 0,                // 本次秘境中死亡次数
                // P0-3 死亡处理系统
                deathHistory: [],                   // 死亡历史记录
                totalDeathCount: 0,                 // 总死亡次数（全游戏）
                totalCultivationLost: 0,            // 总损失修为
                totalFoodLost: 0,                   // 总损失食物
                // 各秘境的通关记录
                mysteryTower: {
                    completed: false
                },
                mysteriousForest: {
                    completed: false
                },
                ancientRuin: {
                    completed: false
                },
                tribulationGround: {
                    completed: false
                },
                huashenRealm: {
                    completed: false
                }
            },
            // P2功能：用户设置
            settings: {
                maxOfflineHours: 24,           // 最多离线奖励小时数
                enableNotifications: true,      // 启用通知（关闭后只显示失败 / 警告等重要提示）
                fontScale: 100,                 // 字体大小（百分比：90 小 / 100 中 / 115 大 / 130 特大）
                breakthroughFx: true,           // 突破特效
                notificationSeconds: 2,         // 通知停留时间（秒）
                theme: 'dark'                   // 主题（dark/light）
            }
        };

        let gameRunning = false;
        let tickInterval = null;

        // ==================== 初始化和启动 ====================
        // ==================== 新手引导 ====================
        // 简短的玩法介绍：新角色创建后自动弹出一次，设置面板里可随时重看
        const TUTORIAL_STEPS = [
            { title: '🌄 欢迎来到凡人修仙', body: `你从一个凡人起步，目标是一步步修炼、突破境界，成为一方强者。<br/><br/>
                这是一款<b>放置游戏</b>：点一个行动，它就会自动重复进行；<b>离开游戏也会继续</b>（默认最多结算 24 小时），回来时领取收益。` },
            { title: '🧘 修炼与突破', body: `<b>修炼</b>获得修为，修为满了就可以<b>突破</b>到更高境界，属性会大幅提升，也会解锁新的配方、战斗区域和秘境。<br/><br/>
                部分大境界的突破需要材料（筑基丹、金丹秘药、元婴丹），可以靠<b>炼丹</b>或<b>秘境掉落</b>获得——留意突破界面里的提示。` },
            { title: '🔨 生活技能', body: `<b>采矿、灵田</b>产出材料，<b>炼丹、炼器</b>用材料制作丹药、食物和装备，后期还有<b>丹火、神识</b>。配方按技能等级解锁。<br/><br/>
                每个配方做得越多，<b>🎓 精通</b>等级越高，会带来翻倍、省材料、缩短耗时等加成；把鼠标悬停（手机上点一下）可以看到详情。` },
            { title: '⚔️ 战斗', body: `进入<b>战斗区域</b>打怪，获得灵石和经验，区域随境界解锁。战斗时生命低会自动吃你装备的<b>食物</b>（在炼丹里制作，背包里设为战斗食物）。<br/><br/>
                <b>🔁 循环战斗</b>：进入战斗区域后会一直打下去，点「撤退」才退出，离线也会继续。<b>秘境</b>同样会一直循环挑战，掉落种子和突破材料，但被击败会损失修为和食物，量力而行。灵根之间有克制关系，克制敌人伤害更高。` },
            { title: '🏪 商城与小提示', body: `用灵石在<b>商城</b>买装备、材料、食物和功法；功法和灵根都有各自的特效，可以在修炼面板切换功法。<br/><br/>
                💾 存档保存在浏览器本地，建议偶尔在设置里<b>导出存档</b>备份。这个介绍可以在<b>设置 → 玩法介绍</b>里随时重看。祝你道途顺遂！` }
        ];
        let tutorialStep = 0;

        function showTutorial(step = 0) {
            tutorialStep = Math.max(0, Math.min(TUTORIAL_STEPS.length - 1, step));
            const t = TUTORIAL_STEPS[tutorialStep];
            const last = tutorialStep === TUTORIAL_STEPS.length - 1;
            document.getElementById('tutorialContent').innerHTML = `
                <div class="tutorial-title">${t.title}</div>
                <div class="tutorial-body">${t.body}</div>
                <div class="tutorial-dots">${TUTORIAL_STEPS.map((_, i) => `<i class="${i === tutorialStep ? 'on' : ''}"></i>`).join('')}</div>
                <div class="tutorial-actions">
                    ${tutorialStep > 0 ? '<button class="btn" onclick="showTutorial(tutorialStep - 1)">上一步</button>' : '<button class="btn tutorial-skip" onclick="closeTutorial()">跳过</button>'}
                    ${last ? '<button class="btn" onclick="closeTutorial()">开始修仙</button>' : '<button class="btn" onclick="showTutorial(tutorialStep + 1)">下一步</button>'}
                </div>`;
            document.getElementById('tutorialModal').classList.add('show');
        }

        function closeTutorial() {
            document.getElementById('tutorialModal').classList.remove('show');
            if (gameState && !gameState.tutorialSeen) {
                gameState.tutorialSeen = true;
                saveGame();
            }
        }

        function startGame() {
            const name = document.getElementById('playerName').value.trim();
            const origin = document.getElementById('playerOrigin').value;
            const spiritRoot = document.getElementById('playerSpiritRoot').value;

            if (!name || !origin || !spiritRoot) {
                alert('请完整填写所有必填项！');
                return;
            }

            gameState.player.name = name;
            gameState.player.gender = document.getElementById('playerGender').value;
            gameState.player.origin = origin;
            gameState.player.spiritRoot = spiritRoot;

            // 初始化玩家为凡人境界
            gameState.player.realmIndex = 0;
            gameState.player.cultivationXP = 0;

            // 根据出身给予初始物品和功法
            if (origin === 'orphan') {
                gameState.player.equipment.jewelry.push('jade');
                gameState.player.currentArt = 'basic_art';  // 分配基础功法
            } else if (origin === 'disciple') {
                gameState.player.equipment.weapon = 'sword';
                addToInventory('pill', 1);
                gameState.player.currentArt = 'advanced_art';  // 分配高阶功法
            }
            gameState.player.ownedArts = [gameState.player.currentArt];

            // 初始化战斗技能的行动
            initializeBattleActions();
            initializeDungeons();

            // 隐藏开始屏幕，显示游戏
            document.getElementById('startScreen').classList.remove('show');
            document.getElementById('gameScreen').classList.remove('hidden');

            // 启动Tick系统
            startGameTick();
            buildSkillTree();

            // P4BugFix：延迟初始化UI以确保DOM完全加载
            setTimeout(() => {
                switchPanel('cultivation');
                updateUI();
                calculateStats();
                updateStatsDisplay();
            }, 50);
            gameRunning = true;

            // 立即保存游戏（确保新创建的角色不会丢失）
            gameState.tutorialSeen = false;
            gameState.equipSlotsV2 = true;   // 新角色本来就是装备栏与背包分开，不需要迁移
            saveGame();
            updateSlotLabel();

            // 自动保存（每30秒）
            startAutoSave();

            // 新手引导（只对新创建的角色自动弹出）
            setTimeout(() => showTutorial(0), 300);
        }

        // 自动保存定时器只保留一个（重开新游戏时不会叠加）
        let autoSaveTimer = null;
        function startAutoSave() {
            if (autoSaveTimer) return;
            autoSaveTimer = setInterval(() => {
                if (gameRunning) saveGame();
            }, GAME_BALANCE.AUTO_SAVE_INTERVAL);
        }

        function showStartScreen() {
            if (gameRunning) return;
            document.getElementById('startScreen').classList.add('show');
        }

        // ==================== 游戏Tick系统 ====================
        // ==================== 分身系统 ====================
        // 元婴初期起自带第 1 个分身，化神初期起有第 2 个：主角之外并行做生活技能配方（不能修炼 / 战斗），
        // 且任意两个行动（主角与各分身）不能做同一个配方。
        // 分身耗时 = 主角调整后耗时 × getCloneFactor()（基础 1.6，神识每级 -0.01，最低 1.2）；
        // 共用背包与材料，享受精通 / 特效等全部加成；离线也会结算。
        const CLONE_UNLOCK_REALMS = [13, 17];   // 第 1、2 个分身的解锁境界：元婴初期、化神初期

        function getCloneSlotCount() {
            return CLONE_UNLOCK_REALMS.filter(r => gameState.player.realmIndex >= r).length;
        }

        function isCloneUnlocked() {
            return getCloneSlotCount() > 0;
        }

        // 全部分身槽（数组恒有 CLONE_UNLOCK_REALMS.length 项，只有前 getCloneSlotCount() 个已解锁）；兼容 v6.2 的单分身存档
        function getClones() {
            if (!gameState.clones) {
                gameState.clones = gameState.clone ? [gameState.clone] : [];
                delete gameState.clone;
            }
            while (gameState.clones.length < CLONE_UNLOCK_REALMS.length) gameState.clones.push({ action: null, progress: 0 });
            return gameState.clones;
        }

        function activeClones() {
            return getClones().slice(0, getCloneSlotCount());
        }

        // 哪个分身槽在做这个配方（没有返回 -1）
        function findCloneFor(skill, key) {
            return activeClones().findIndex(c => c.action && c.action.skill === skill && c.action.action === key);
        }

        function getCloneFactor() {
            return SKILL_LEVEL_EFFECTS.shenshi.formula((gameState.skills.shenshi || {}).level || 1) / (1 + getMod('cloneSpeed'));
        }

        function getCloneDuration(skill, duration, key) {
            return getAdjustedDuration(skill, duration, key) * getCloneFactor();
        }

        function cloneHasMaterials(action) {
            if (!action.requires) return true;
            return Object.entries(action.requires).every(([itemId, qty]) => {
                const inv = gameState.player.inventory.find(i => i.id === itemId);
                return inv && inv.qty >= qty;
            });
        }

        // 让分身开始做某个配方（不指定槽位时用第一个空闲的分身）
        function assignClone(skill, key, slot = null) {
            if (!isCloneUnlocked()) { showNotification('🔒 分身要到元婴初期才会出现', '#c98a3e'); return; }
            if (!LIFE_SKILLS.includes(skill)) { showNotification('分身只能做生活技能的配方', '#c98a3e'); return; }
            const recipe = getAction(skill, key);
            if (!recipe || !getRecipeUnlockState(skill, recipe).unlocked) { showNotification('🔒 这个配方还没解锁', '#c98a3e'); return; }
            const main = gameState.currentAction;
            if (main && main.skill === skill && main.action === key) {
                showNotification('主角正在做这个配方，分身不能重复（请让分身做别的）', '#c98a3e');
                return;
            }
            if (findCloneFor(skill, key) >= 0) { showNotification('已有分身在做这个配方，不能重复', '#c98a3e'); return; }
            if (!cloneHasMaterials(recipe)) { showNotification(`${recipe.name}所需材料不足`, '#c4483a', 'error'); return; }
            const clones = activeClones();
            if (slot === null) slot = clones.findIndex(c => !c.action);
            if (slot < 0) { showNotification('分身都在忙，请先停止一个', '#c98a3e'); return; }
            const c = clones[slot];
            const prev = c.action;
            c.action = { skill, action: key };
            c.progress = 0;
            showNotification(`🌀 分身${slot + 1}开始：${recipe.name}`, '#b89a5b');
            if (prev && prev.skill !== skill) generateRecipeList(prev.skill);
            generateRecipeList(skill);
            renderCloneBar();
            saveGame();
        }

        function stopClone(slot = 0, silent = false) {
            const c = getClones()[slot];
            if (!c) return;
            const prev = c.action;
            c.action = null;
            c.progress = 0;
            if (!silent && prev) showNotification(`🌀 分身${slot + 1}已停止`, '#b89a5b');
            if (prev) generateRecipeList(prev.skill);
            renderCloneBar();
        }

        // 每个游戏 tick（0.1 秒）推进每个分身的行动
        function tickClone() {
            activeClones().forEach((c, slot) => {
                if (!c.action) return;
                const action = getAction(c.action.skill, c.action.action);
                if (!action || !action.output) { stopClone(slot, true); return; }
                if (!cloneHasMaterials(action)) {
                    showNotification(`🌀 分身${slot + 1}：${action.name}所需材料不足，已停止`, '#c4483a', 'error');
                    stopClone(slot, true);
                    return;
                }
                c.progress += 0.1;
                const duration = getCloneDuration(c.action.skill, action.duration, c.action.action);
                if (c.progress >= duration) {
                    completeAction(c.action);
                    c.progress = 0;
                }
                tickCloneBar(slot, duration);
            });
        }

        // 分身状态条：整体重绘（分配 / 停止 / 解锁时）
        function renderCloneBar() {
            const bar = document.getElementById('cloneBar');
            if (!bar) return;
            if (!isCloneUnlocked()) { bar.style.display = 'none'; return; }
            bar.style.display = 'block';
            const factor = getCloneFactor();
            const rows = activeClones().map((c, slot) => {
                const action = c.action ? getAction(c.action.skill, c.action.action) : null;
                if (action) {
                    return `<div class="clone-row"><div class="clone-bar-top"><span>🌀 分身${slot + 1}：<b>${action.name}</b></span><span id="cloneRemain${slot}"></span>
                        <button class="btn btn-secondary clone-stop" onclick="stopClone(${slot})">停止</button></div>
                        <div class="progress-bar" style="height: 6px;"><div id="cloneFill${slot}" class="progress-fill" style="width: 0%; height: 100%;"></div></div></div>`;
                }
                return `<div class="clone-row"><div class="clone-bar-top"><span>🌀 分身${slot + 1}空闲</span>${slot === 0 ? `<span class="clone-hint">在生活技能的配方卡片上点「交给分身」（耗时 ×${factor.toFixed(2)}）</span>` : ''}</div></div>`;
            });
            bar.innerHTML = rows.join('');
        }

        // 分身状态条：每 tick 只更新进度
        function tickCloneBar(slot, duration) {
            const c = getClones()[slot];
            const pct = Math.min(100, (c.progress / duration) * 100);
            const fill = document.getElementById('cloneFill' + slot);
            if (fill) fill.style.width = pct + '%';
            const remain = document.getElementById('cloneRemain' + slot);
            if (remain) remain.textContent = Math.max(0, duration - c.progress).toFixed(1) + 's';
            const card = document.getElementById('action-' + c.action.skill + '-' + c.action.action);
            const cardFill = card && card.querySelector('.action-progress-fill');
            if (cardFill) cardFill.style.width = pct + '%';
        }

        // 分身离线结算：与主角的离线规则一致（材料限制、节省材料、产出翻倍、技能 / 精通经验），耗时按分身倍率
        function settleCloneOffline(offlineSeconds) {
            if (!isCloneUnlocked() || !(offlineSeconds >= 1)) return;
            activeClones().forEach((c, slot) => settleOneClone(c, `分身${slot + 1}`, offlineSeconds));
            renderCloneBar();
        }

        function settleOneClone(c, label, offlineSeconds, durationFn = getCloneDuration) {
            if (!c.action) return;
            const { skill, action: key } = c.action;
            const action = getAction(skill, key);
            if (!action || !action.output) { c.action = null; return; }
            const budget = Math.min(offlineSeconds, (gameState.settings?.maxOfflineHours || 24) * 3600);
            const duration = durationFn(skill, action.duration, key);
            if (!(duration > 0)) return;
            let n = Math.floor(budget / duration);
            let ranOut = false;
            if (action.requires) {
                Object.entries(action.requires).forEach(([itemId, qty]) => {
                    const owned = (gameState.player.inventory.find(i => i.id === itemId) || { qty: 0 }).qty;
                    const affordable = Math.floor(owned / qty);
                    if (affordable < n) { n = affordable; ranOut = true; }
                });
                const saveRate = Math.min(0.9, getSkillMod('save', skill) + getMasteryBonus(skill, key).save);
                Object.entries(action.requires).forEach(([itemId, qty]) => {
                    if (n > 0) consumeItem(itemId, Math.round(qty * n * (1 - saveRate)));
                });
            }
            if (n > 0) {
                const per = JSON.parse(JSON.stringify(action.output));
                applySkillLevelBonus(skill, per);
                const doubleRate = getSkillMod('double', skill) + getMasteryBonus(skill, key).double;
                gameState.player.coins += (per.coins || 0) * n;
                (per.items || []).forEach(item => {
                    const qty = Math.floor(item.qty * n * (1 + doubleRate) + 1e-9);
                    if (qty > 0) addToInventory(item.id, qty);
                });
                if (per.skill && per.exp) addSkillExp(per.skill, per.exp * n, key);
                addMasteryExp(skill, key, action.duration * n);
                showNotification(`🌀 ${label}离线完成 ${n} 次：${action.name}${ranOut ? '（材料用完，已停止）' : ''}`, '#6fa980');
            }
            if (ranOut) { c.action = null; generateRecipeList(skill); }
            c.progress = 0;
        }

        // ==================== 第二块灵田 ====================
        // 商城购买「第二块灵田」（boughtUpgrades 里的 farming_slot，5000 灵石，只能买一次）后，主角之外多一块田：
        // 并行做灵田配方，速度与主角相同（不打折），可与主角种同一种作物；共用背包与材料，离线也结算。
        function isFarmPlotUnlocked() {
            return (gameState.player.boughtUpgrades || []).includes('farming_slot');
        }

        function getFarmPlot() {
            if (!gameState.farmPlot) gameState.farmPlot = { action: null, progress: 0 };
            return gameState.farmPlot;
        }

        function assignFarmPlot(key) {
            if (!isFarmPlotUnlocked()) { showNotification('🔒 需要先在商城购买「第二块灵田」', '#c98a3e'); return; }
            const recipe = getAction('farming', key);
            if (!recipe || !getRecipeUnlockState('farming', recipe).unlocked) { showNotification('🔒 这个配方还没解锁', '#c98a3e'); return; }
            if (!cloneHasMaterials(recipe)) { showNotification(`${recipe.name}所需材料不足`, '#c4483a', 'error'); return; }
            const f = getFarmPlot();
            f.action = { skill: 'farming', action: key };
            f.progress = 0;
            showNotification(`🌾 第二块田开始：${recipe.name}`, '#b89a5b');
            generateRecipeList('farming');
            renderPlotBar();
            saveGame();
        }

        function stopFarmPlot(silent = false) {
            const f = getFarmPlot();
            const had = !!f.action;
            f.action = null;
            f.progress = 0;
            if (!silent && had) showNotification('🌾 第二块田已停止', '#b89a5b');
            generateRecipeList('farming');
            renderPlotBar();
        }

        function tickFarmPlot() {
            if (!isFarmPlotUnlocked()) return;
            const f = getFarmPlot();
            if (!f.action) return;
            const action = getAction('farming', f.action.action);
            if (!action || !action.output) { stopFarmPlot(true); return; }
            if (!cloneHasMaterials(action)) {
                showNotification(`🌾 第二块田：${action.name}所需材料不足，已停止`, '#c4483a', 'error');
                stopFarmPlot(true);
                return;
            }
            f.progress += 0.1;
            const duration = getAdjustedDuration('farming', action.duration, f.action.action);
            if (f.progress >= duration) {
                completeAction(f.action);
                f.progress = 0;
            }
            tickPlotBar(duration);
        }

        function renderPlotBar() {
            const bar = document.getElementById('plotBar');
            if (!bar) return;
            if (!isFarmPlotUnlocked()) { bar.style.display = 'none'; return; }
            bar.style.display = 'block';
            const f = getFarmPlot();
            const action = f.action ? getAction('farming', f.action.action) : null;
            bar.innerHTML = action
                ? `<div class="clone-row"><div class="clone-bar-top"><span>🌾 第二块田：<b>${action.name}</b></span><span id="plotRemain"></span>
                    <button class="btn btn-secondary clone-stop" onclick="stopFarmPlot()">停止</button></div>
                    <div class="progress-bar" style="height: 6px;"><div id="plotFill" class="progress-fill" style="width: 0%; height: 100%;"></div></div></div>`
                : `<div class="clone-row"><div class="clone-bar-top"><span>🌾 第二块田空闲</span><span class="clone-hint">在灵田面板的配方卡片上点「种到第二块田」</span></div></div>`;
        }

        function tickPlotBar(duration) {
            const f = getFarmPlot();
            const pct = Math.min(100, (f.progress / duration) * 100);
            const fill = document.getElementById('plotFill');
            if (fill) fill.style.width = pct + '%';
            const remain = document.getElementById('plotRemain');
            if (remain) remain.textContent = Math.max(0, duration - f.progress).toFixed(1) + 's';
        }

        // 离线结算：与分身共用同一套离线规则，只是耗时不打折
        function settleFarmPlotOffline(offlineSeconds) {
            if (!isFarmPlotUnlocked() || !(offlineSeconds >= 1)) return;
            settleOneClone(getFarmPlot(), '第二块田', offlineSeconds, getAdjustedDuration);
            renderPlotBar();
        }

        function startGameTick() {
            tickInterval = setInterval(() => {
                tickFarmPlot();
                tickClone();
                if (!gameState.currentAction) return;

                // 秘境战斗特殊处理
                if (gameState.currentAction.isDungeon) {
                    processDungeonTick();
                    return;
                }

                // 普通战斗特殊处理（P1-5扩展）
                if (gameState.currentAction.isBattle && gameState.battles && gameState.battles.battleState === 'fighting') {
                    performNormalBattleTick();
                    return;
                }

                const action = getAction(gameState.currentAction.skill, gameState.currentAction.action);
                if (!action) {
                    gameState.currentAction = null;
                    gameState.currentActionProgress = 0;
                    return;
                }

                // 检查所需物品是否充足，不足则停止action
                if (action.requires) {
                    let materialShortage = false;
                    for (const [itemId, requiredQty] of Object.entries(action.requires)) {
                        const invItem = gameState.player.inventory.find(i => i.id === itemId);
                        const currentQty = invItem ? invItem.qty : 0;
                        if (currentQty < requiredQty) {
                            materialShortage = true;
                            break;
                        }
                    }
                    if (materialShortage) {
                        showNotification(`${action.name}所需物品不足，已停止`, '#c4483a', 'error');
                        gameState.currentAction = null;
                        gameState.currentActionProgress = 0;
                        updateUI();
                        return;
                    }
                }

                gameState.currentActionProgress += 0.1;
                const adjustedDuration = getAdjustedDuration(gameState.currentAction.skill, action.duration, gameState.currentAction.action);

                if (gameState.currentActionProgress >= adjustedDuration) {
                    completeAction();
                    gameState.currentActionProgress = 0;
                }

                updateProgressBars();
            }, 100);
        }

        // P8 双向战斗系统：辅助函数

        // 计算玩家对怪物的伤害
        // 战斗技能等级带来的伤害倍率（每级 +0.5%）
        function getBattleSkillDmgMult() {
            return SKILL_LEVEL_EFFECTS.battle.formula((gameState.skills.battle || {}).level || 1);
        }

        // 秘境：玩家命中怪物的概率（含境界压制、灵根克制、灵根 / 功法命中特效）
        function getDungeonPlayerHit(monster) {
            const playerSPD = gameState.player.stats.spd || 50;
            const monsterSPD = monster.spd || 40;
            let hitChance = BATTLE_FORMULAS.calculateHitChance(playerSPD, monsterSPD);
            const monsterRealmIndex = GAME_CONFIG.dungeons[gameState.dungeons.currentDungeon].baseRealmIndex || 0;
            const realmSuppression = REALM_SUPPRESSION.calculate(gameState.player.realmIndex, monsterRealmIndex);
            hitChance *= realmSuppression.hitMod;
            const monsterTypeId = SPIRIT_ROOT_MAPPING[monster.type] || monster.type;
            const counterModifier = COUNTER_SYSTEM.getCounterModifier(gameState.player.spiritRoot, monsterTypeId);
            hitChance *= counterModifier.hit;
            hitChance += getMod('hit');   // 灵根/功法命中特效
            hitChance = Math.max(0.05, Math.min(Math.min(0.99, 0.95 + getMod('hit')), hitChance));
            return { hitChance, realmSuppression, counterModifier };
        }

        // 秘境：怪物命中玩家的概率（含反向境界压制、克制、玩家闪避特效）
        function getDungeonMonsterHit(monster) {
            const monsterSPD = monster.spd || 40;
            const playerSPD = gameState.player.stats.spd || 50;
            let hitChance = BATTLE_FORMULAS.calculateHitChance(monsterSPD, playerSPD);
            const monsterRealmIndex = GAME_CONFIG.dungeons[gameState.dungeons.currentDungeon].baseRealmIndex || 0;
            const realmSuppression = REALM_SUPPRESSION.calculate(monsterRealmIndex, gameState.player.realmIndex);
            hitChance *= realmSuppression.hitMod;
            const monsterTypeId = SPIRIT_ROOT_MAPPING[monster.type] || monster.type;
            const counterModifier = COUNTER_SYSTEM.getCounterModifier(monsterTypeId, gameState.player.spiritRoot);
            hitChance *= counterModifier.hit;
            hitChance *= 1 - Math.min(0.6, getMod('dodge'));   // 灵根 / 功法闪避特效：降低被命中率
            hitChance = Math.max(0.05, Math.min(0.95, hitChance));
            return { hitChance, realmSuppression, counterModifier };
        }

        function performPlayerAttack(monster) {
            const { hitChance, realmSuppression, counterModifier } = getDungeonPlayerHit(monster);

            if (Math.random() < hitChance) {
                const baseDmg = gameState.player.stats.atk || 20;
                let playerDmg = BATTLE_FORMULAS.calculateDamage({ atk: baseDmg }, { def: monster.def || 0 });
                playerDmg = Math.floor(playerDmg * realmSuppression.dmgMod);
                playerDmg = Math.floor(playerDmg * counterModifier.damage);
                playerDmg = Math.floor(playerDmg * getBattleSkillDmgMult());   // 战斗技能等级加成
                // 暴击（基础5%、×1.5，灵根/功法可提高）
                const isCrit = Math.random() < BASE_CRIT.rate + getMod('crit');
                if (isCrit) playerDmg = Math.floor(playerDmg * (BASE_CRIT.dmg + getMod('critDmg')));
                playerDmg = Math.max(1, playerDmg);

                gameState.dungeons.currentMonsterHP -= playerDmg;

                // P1-1 显示伤害飘字和日志
                showDamageFloat(-playerDmg, false);
                addBattleLog(`${isCrit ? '暴击！' : ''}造成${playerDmg}点伤害`, 'player-hit');
            } else {
                // P1-1 显示未命中日志
                addBattleLog('攻击落空', 'miss');
            }
        }

        // 计算怪物对玩家的伤害
        function performMonsterAttack(monster) {
            const { hitChance, realmSuppression, counterModifier } = getDungeonMonsterHit(monster);

            if (Math.random() < hitChance) {
                const baseDmg = monster.atk || 10;
                let monsterDmg = baseDmg + Math.random() * baseDmg * 0.3 - baseDmg * 0.15;

                // 玩家防御减伤
                const playerDef = gameState.player.stats.def || 5;
                const damageReduction = (playerDef / (monsterDmg + playerDef + 1)) * 0.75;
                monsterDmg *= (1 - damageReduction);

                // 怪物攻击也受境界压制
                monsterDmg = Math.floor(monsterDmg * realmSuppression.dmgMod);

                // 克制修正
                monsterDmg = Math.floor(monsterDmg * counterModifier.damage);
                monsterDmg = Math.max(1, Math.floor(monsterDmg));

                gameState.player.stats.hp.current -= monsterDmg;

                // P1-1 显示伤害飘字和日志
                showDamageFloat(-monsterDmg, true);
                addBattleLog(`受到${monsterDmg}点伤害`, 'monster-hit');
            } else {
                // P1-1 显示敌人未命中日志
                addBattleLog(`${monster.name}的攻击落空`, 'miss');
            }
        }

        // 处理怪物死亡
        function handleMonsterDeath(dungeonId, monster) {
            gameState.dungeons.defeatCount++;
            const dropCoins = Math.floor(monster.dropQty * (0.8 + Math.random() * 0.4));
            gameState.player.coins += dropCoins;

            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            if (gameState.dungeons.currentMonsterIndex < dungeon.monsters.length - 1) {
                gameState.dungeons.currentMonsterIndex++;
                const nextMonster = dungeon.monsters[gameState.dungeons.currentMonsterIndex];
                gameState.dungeons.currentMonsterHP = nextMonster.hp;
                gameState.dungeons.monsterAttackTimer = 0;
                gameState.dungeons.battleState = 'monster_dead';

                // P1-1 添加怪物死亡日志
                addBattleLog(`${monster.name}被击败！`, 'victory');
            } else {
                gameState.dungeons.battleState = 'dungeon_clear';
                // P1-1 添加秘径通关日志
                addBattleLog(`🎉 秘径${dungeon.name}已通关！`, 'victory');
                completeDungeon(dungeonId);
            }
        }

        // P0-3 更新全局死亡统计
        function updateGlobalDeathStats(lostCultivation, foodLost) {
            gameState.dungeons.totalDeathCount++;
            gameState.dungeons.totalCultivationLost += lostCultivation;
            gameState.dungeons.totalFoodLost += foodLost;
        }

        // P0-3 获取死亡统计信息
        function getDeathStats() {
            return {
                totalDeaths: gameState.dungeons.totalDeathCount,
                cultivationLost: gameState.dungeons.totalCultivationLost,
                foodLost: gameState.dungeons.totalFoodLost,
                recentDeaths: gameState.dungeons.deathHistory.slice(-5), // 最近5次死亡
                mostDangerousMonster: getMostDangerousMonster(),
                deadliestDungeon: getDeadliestDungeon()
            };
        }

        // P0-3 获取最危险的怪物（击败最多次的）
        function getMostDangerousMonster() {
            if (!gameState.dungeons.deathHistory || gameState.dungeons.deathHistory.length === 0) {
                return null;
            }
            const monsterDeaths = {};
            gameState.dungeons.deathHistory.forEach(record => {
                monsterDeaths[record.monsterName] = (monsterDeaths[record.monsterName] || 0) + 1;
            });
            const mostDangerous = Object.entries(monsterDeaths).sort((a, b) => b[1] - a[1])[0];
            return mostDangerous ? { name: mostDangerous[0], deaths: mostDangerous[1] } : null;
        }

        // P0-3 获取最致命的秘径
        function getDeadliestDungeon() {
            if (!gameState.dungeons.deathHistory || gameState.dungeons.deathHistory.length === 0) {
                return null;
            }
            const dungeonDeaths = {};
            gameState.dungeons.deathHistory.forEach(record => {
                dungeonDeaths[record.dungeonName] = (dungeonDeaths[record.dungeonName] || 0) + 1;
            });
            const deadliest = Object.entries(dungeonDeaths).sort((a, b) => b[1] - a[1])[0];
            return deadliest ? { name: deadliest[0], deaths: deadliest[1] } : null;
        }

        // P0-3 处理玩家死亡（扩展版本）
        function handlePlayerDeath() {
            gameState.dungeons.playerDeathCount++;
            const dungeonId = gameState.dungeons.currentDungeon;
            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            const monster = dungeon.monsters[gameState.dungeons.currentMonsterIndex];

            // === 死亡统计记录 ===
            const deathRecord = {
                timestamp: Date.now(),
                dungeonId: dungeonId,
                dungeonName: dungeon.name,
                monsterName: monster.name,
                monsterHP: gameState.dungeons.currentMonsterHP,
                playerLevel: gameState.player.realmIndex,
                playerHPBefore: gameState.player.stats.hp.max,
                damageDealt: Math.floor((dungeon.monsters[gameState.dungeons.currentMonsterIndex].hp - gameState.dungeons.currentMonsterHP) / dungeon.monsters[gameState.dungeons.currentMonsterIndex].hp * 100),
                deathRound: gameState.dungeons.defeatCount + 1
            };

            // === 计算损失 ===
            // 1. 损失修为（10%）
            const lostCultivation = Math.floor(gameState.player.cultivationXP * 0.1);
            gameState.player.cultivationXP = Math.max(0, gameState.player.cultivationXP - lostCultivation);
            deathRecord.cultivationLost = lostCultivation;

            // 2. 损失食物（50%）
            let foodLost = 0;
            gameState.player.inventory.forEach(item => {
                if (GAME_CONFIG.items[item.id] && GAME_CONFIG.items[item.id].type === 'food') {
                    const lose = Math.ceil(item.qty * 0.5);
                    item.qty -= lose;
                    foodLost += lose;
                }
            });
            gameState.player.inventory = gameState.player.inventory.filter(item => item.qty > 0);
            deathRecord.foodLost = foodLost;

            // 3. HP恢复到50%
            const hpBefore = gameState.player.stats.hp.current;
            gameState.player.stats.hp.current = Math.floor(gameState.player.stats.hp.max * 0.5);
            deathRecord.hpRecovered = gameState.player.stats.hp.current;

            // === 记录死亡事件 ===
            if (!gameState.dungeons.deathHistory) {
                gameState.dungeons.deathHistory = [];
            }
            gameState.dungeons.deathHistory.push(deathRecord);

            // === 退出秘境 ===
            resetBattleState('player_dead');

            // === P2修复：生成更详细的死亡通知 ===
            const damagePercent = ((hpBefore - gameState.player.stats.hp.current) / gameState.player.stats.hp.max * 100).toFixed(0);
            const notificationText = `✗ 被${monster.name}击败！\n\n` +
                                    `丢失修为: ${lostCultivation} (10%)\n` +
                                    `丢失食物: ${foodLost}份 (50%)\n` +
                                    `血量: ${gameState.player.stats.hp.current}/${gameState.player.stats.hp.max} (+50%)`;
            showNotification(notificationText, '#c4483a', 'danger');

            // === 更新全局死亡统计 ===
            updateGlobalDeathStats(lostCultivation, foodLost);

            // === 触发死亡UI动画（未来P1实装） ===
            // showDeathAnimation(monster.name, dungeon.name);

            // P1-1 添加死亡日志
            addBattleLog(`💀 你被${monster.name}击败了...`, 'death');

            updateUI();
            saveGame();

            // 被击败：循环结束，回到战斗界面的秘境列表
            switchPanel('battle');
            switchBattleTab('dungeons');
        }

        // 战斗食物：食物是背包里的物品（在炼丹中制作），foodSlot 保存当前选择的食物ID
        function getFoodCount() {
            const foodId = gameState.player.foodSlot;
            if (!foodId) return 0;
            const inv = gameState.player.inventory.find(i => i.id === foodId);
            return inv ? inv.qty : 0;
        }

        // 战斗开始时：当前食物不可用（没有/吃完/境界不足）就自动换成背包里恢复量最高的可用食物
        function pickBestFood() {
            const realm = gameState.player.realmIndex;
            const usable = id => FOOD_CONFIG.foods[id] && FOOD_CONFIG.foods[id].minRealm <= realm;
            const current = gameState.player.foodSlot;
            if (current && usable(current) && getFoodCount() > 0) return;
            let best = null;
            gameState.player.inventory.forEach(i => {
                if (i.qty > 0 && usable(i.id) && (!best || FOOD_CONFIG.foods[i.id].hpRestore > FOOD_CONFIG.foods[best].hpRestore)) {
                    best = i.id;
                }
            });
            if (best) gameState.player.foodSlot = best;
        }

        function updateFoodBar() {
            const foodId = gameState.player.foodSlot;
            const cfg = foodId && FOOD_CONFIG.foods[foodId];
            const icon = document.getElementById('foodIcon');
            const name = document.getElementById('foodName');
            const count = document.getElementById('foodCountText');
            if (!icon || !name || !count) return;
            icon.textContent = cfg ? cfg.icon : '🍽️';
            name.textContent = cfg ? cfg.name : '无食物';
            count.textContent = cfg ? `×${getFoodCount()}（+${cfg.hpRestore}）` : '在炼丹中制作';
            const toggle = document.getElementById('autoEatToggle');
            if (toggle) toggle.checked = !!gameState.player.autoEat;
        }

        // P0-4 使用食物恢复HP。hpObj 为要恢复的生命值对象（秘境用玩家生命，普通战斗用战斗内生命）
        function consumeFood(hpObj = gameState.player.stats.hp, logFn = null) {
            // 检查是否装备了食物
            const foodId = gameState.player.foodSlot;
            if (!foodId) {
                return false; // 没有装备食物
            }

            // 获取装备的食物配置
            const foodConfig = FOOD_CONFIG.foods[foodId];
            if (!foodConfig) {
                console.warn(`未找到食物配置: ${foodId}`);
                return false;
            }

            // 境界不足或食物不足
            if (gameState.player.realmIndex < foodConfig.minRealm || getFoodCount() <= 0) {
                return false;
            }

            // 检查冷却时间
            if (gameState.player.foodUseTimer < foodConfig.cooldown) {
                return false; // 仍在冷却中
            }

            // 计算恢复量（不超过最大HP）
            const hpRestore = Math.min(Math.floor(foodConfig.hpRestore * (1 + getMod('foodPct'))), hpObj.max - hpObj.current);

            // 只有有恢复量时才能进食
            if (hpRestore <= 0) {
                return false; // HP满了，不需要进食
            }

            hpObj.current += hpRestore;

            // 消耗背包里的食物
            consumeItem(foodId, 1);
            gameState.player.foodUseTimer = 0; // 重置冷却

            const message = `使用${foodConfig.name}，恢复${hpRestore}HP`;
            if (logFn) {
                logFn(message);
            } else {
                // P1-1 秘境战斗：治疗日志和飘字
                showDamageFloat(hpRestore, true);
                addBattleLog(message, 'heal');
            }
            updateFoodBar();

            return true; // 成功进食
        }

        // ==================== P1-1 战斗UI系统函数 ====================

        // P1-1 初始化战斗UI
        function renderBattleUI(keepLog = false) {
            const battleContainer = document.getElementById('battleContainer');

            // 隐藏所有面板，显示战斗UI
            document.querySelectorAll('.panel-content').forEach(el => el.classList.add('hidden'));
            battleContainer.classList.remove('hidden');
            document.getElementById('battleTitle').textContent = '⚔️ 秘境战斗中';

            // 初始化HP条
            updateBattleHP();
            updateFoodBar();

            // 手动进入时清空日志；循环续战（通关后再进）保留最近 30 条
            if (!keepLog) resetBattleLog(); else renderBattleLog(true);

            // 设置初始速度
            gameState.battleSpeed = 1;
            document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.speed-btn[data-speed="1"]').classList.add('active');

            // 初始化玩家和怪物信息
            const dungeonId = gameState.dungeons.currentDungeon;
            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            const monster = dungeon.monsters[gameState.dungeons.currentMonsterIndex];

            document.getElementById('playerNameBattle').textContent = gameState.player.name || '玩家';
            document.getElementById('monsterNameBattle').textContent = monster.name || '敌人';
            document.getElementById('monsterSprite').textContent = monster.icon || '👾';

            addBattleLog(`与${monster.name}开始战斗！`, 'info');
        }

        // P1-1 更新HP条显示
        function updateBattleHP() {
            const playerHp = gameState.player.stats.hp.current;
            const playerMaxHp = gameState.player.stats.hp.max;
            const playerPercent = Math.max(0, Math.min(100, (playerHp / playerMaxHp) * 100));

            const dungeonId = gameState.dungeons.currentDungeon;
            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            const monster = dungeon.monsters[gameState.dungeons.currentMonsterIndex];
            const monsterHp = gameState.dungeons.currentMonsterHP;
            const monsterMaxHp = monster.hp;
            const monsterPercent = Math.max(0, Math.min(100, (monsterHp / monsterMaxHp) * 100));

            // 更新HP条宽度
            const playerBar = document.getElementById('playerHPBar');
            const monsterBar = document.getElementById('monsterHPBar');
            playerBar.style.width = playerPercent + '%';
            monsterBar.style.width = monsterPercent + '%';

            // 根据HP百分比改变颜色
            playerBar.classList.toggle('low', playerPercent < 30);
            monsterBar.classList.toggle('low', monsterPercent < 30);

            // 更新HP数值显示
            document.getElementById('playerHPText').textContent = `${Math.floor(playerHp)}/${playerMaxHp}`;
            document.getElementById('monsterHPText').textContent = `${Math.floor(monsterHp)}/${monsterMaxHp}`;

            // 更新属性显示
            document.getElementById('playerAtk').textContent = Math.floor(gameState.player.stats.atk);
            document.getElementById('playerDef').textContent = Math.floor(gameState.player.stats.def);
            document.getElementById('monsterAtk').textContent = Math.floor(monster.atk);
            document.getElementById('monsterDef').textContent = Math.floor(monster.def);
            document.getElementById('playerHit').textContent = Math.round(getDungeonPlayerHit(monster).hitChance * 100) + '%';
            document.getElementById('monsterHit').textContent = Math.round(getDungeonMonsterHit(monster).hitChance * 100) + '%';
        }

        // P1-1 显示伤害飘字
        function showDamageFloat(damage, isPlayer) {
            const floatLayer = document.getElementById('damageFloatLayer');
            const floatDiv = document.createElement('div');
            floatDiv.className = 'damage-float';

            if (damage < 0) {
                floatDiv.textContent = damage;
                floatDiv.style.color = '#c4483a';
            } else {
                floatDiv.textContent = '+' + damage;
                floatDiv.style.color = '#7fae9a';
            }

            // 随机X偏移
            const xOffset = Math.random() * 100 - 50;
            const yOffset = isPlayer ? 30 : 90;
            floatDiv.style.left = (50 + xOffset) + '%';
            floatDiv.style.top = yOffset + 'px';

            floatLayer.appendChild(floatDiv);

            // 1.5秒后移除
            setTimeout(() => floatDiv.remove(), 1500);
        }

        // P1-1 添加战斗日志
        // 战斗日志：一次循环战斗（从进入战斗区域 / 秘境到撤退或被击败）期间共用一份，保留最近 30 条，可上下滚动查看。
        // 条目是字符串或 { text, cls }；普通战斗的 battle.log 直接指向这份数组（stepNormalBattle 往里 push 字符串）
        const BATTLE_LOG_MAX = 30;
        const battleLogEntries = [];
        let battleLogRendered = '';

        function trimBattleLog(arr = battleLogEntries) {
            while (arr.length > BATTLE_LOG_MAX) arr.shift();
        }

        function battleLogClass(entry) {
            if (typeof entry !== 'string') return entry.cls || 'info';
            if (/^获得/.test(entry)) return 'heal';
            if (/落空/.test(entry)) return 'miss';
            if (/^玩家/.test(entry)) return 'player-hit';
            if (/使用|恢复/.test(entry)) return 'heal';
            if (/击败|战胜|遭遇|——/.test(entry)) return /遭遇|——/.test(entry) ? 'info' : 'victory';
            return 'monster-hit';
        }

        // 重绘日志；用户往上翻看时保持滚动位置，停在底部时才自动跟随最新一条
        function renderBattleLog(force = false) {
            const el = document.getElementById('battleLog');
            if (!el) return;
            const last = battleLogEntries[battleLogEntries.length - 1];
            const key = battleLogEntries.length + '|' + (last ? (typeof last === 'string' ? last : last.text) : '');
            if (!force && key === battleLogRendered) return;
            battleLogRendered = key;
            const stick = el.scrollHeight - el.scrollTop - el.clientHeight < 28;
            const prev = el.scrollTop;
            el.innerHTML = battleLogEntries.map(e => `<div class="log-entry log-${battleLogClass(e)}">${typeof e === 'string' ? e : e.text}</div>`).join('');
            el.scrollTop = stick ? el.scrollHeight : prev;
        }

        function resetBattleLog() {
            battleLogEntries.length = 0;
            renderBattleLog(true);
        }

        function addBattleLog(msg, type = 'info') {
            const time = new Date().toLocaleTimeString('zh-CN', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});
            battleLogEntries.push({ text: `[${time}] ${msg}`, cls: type });
            trimBattleLog();
            renderBattleLog();
        }

        // P1-1 设置战斗速度
        function setBattleSpeed(speed) {
            gameState.battleSpeed = speed;
            document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.speed-btn[data-speed="${speed}"]`).classList.add('active');
            addBattleLog(`战斗速度调整为 ${speed}x`, 'info');
        }

        // P1-1 切换自动进食
        function toggleAutoEat(enabled) {
            gameState.player.autoEat = enabled;
            const status = enabled ? '已启用' : '已禁用';
            addBattleLog(`自动进食${status}`, 'info');
        }

        // 重置战斗状态（撤退和死亡时使用）
        function resetBattleState(newState = 'idle') {
            gameState.dungeons.currentDungeon = null;
            gameState.currentAction = null;
            gameState.currentActionProgress = 0;
            gameState.dungeons.battleState = newState;
            const battleContainer = document.getElementById('battleContainer');
            if (battleContainer) {
                battleContainer.classList.add('hidden');
            }
        }

        // P1-4 从秘径撤退（模态对话框版本）
        function retreatFromDungeon() {
            const isNormalBattle = !!(gameState.currentAction && gameState.currentAction.isBattle);
            if (!isNormalBattle && gameState.dungeons.battleState !== 'fighting') return;

            // 显示自定义确认模态框
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            `;

            const dialog = document.createElement('div');
            dialog.style.cssText = `
                background: rgba(26,31,58,0.95);
                border: 2px solid #6f9c8a;
                border-radius: 8px;
                padding: 30px;
                text-align: center;
                color: #dcd1b6;
                min-width: 300px;
            `;

            dialog.innerHTML = `
                <p style="font-size: 1.1em; margin-bottom: 20px;">确定要撤退${isNormalBattle ? '' : '秘境'}吗?</p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button style="
                        padding: 10px 20px;
                        background: #6f9c8a;
                        border: 1px solid #6f9c8a;
                        color: #fff;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: bold;
                    ">确认撤退</button>
                    <button style="
                        padding: 10px 20px;
                        background: rgba(100,100,100,0.3);
                        border: 1px solid #666;
                        color: #aaa;
                        border-radius: 4px;
                        cursor: pointer;
                    ">取消</button>
                </div>
            `;

            modal.appendChild(dialog);
            document.body.appendChild(modal);

            // 事件处理
            const buttons = dialog.querySelectorAll('button');
            buttons[0].onclick = () => {
                modal.remove();
                if (isNormalBattle) {
                    stopAction();
                    showNotification('已撤退', '#c2a25f');
                    switchPanel('battle');
                    switchBattleTab('areas');
                } else {
                    resetBattleState('idle');
                    showNotification('已撤退秘境', '#c2a25f');
                    updateUI();
                    switchPanel('battle');
                    switchBattleTab('dungeons');
                }
            };
            buttons[1].onclick = () => {
                modal.remove();
            };
        }

        // P0-4 自动进食逻辑
        function checkAndAutoEat(hpObj = gameState.player.stats.hp, logFn = null) {
            // 检查自动进食是否启用
            if (!gameState.player.autoEat) {
                return;
            }

            // 检查是否需要进食（HP低于阈值）
            const hpPercent = hpObj.current / hpObj.max;
            if (hpPercent >= FOOD_CONFIG.autoEatConfig.hpThreshold) {
                return; // HP足够，不需要进食
            }

            // 增加食物使用计时器（受战斗速度影响）
            const speedMultiplier = gameState.battleSpeed || 1;
            gameState.player.foodUseTimer += 0.1 * speedMultiplier;

            // 尝试进食
            consumeFood(hpObj, logFn);
        }

        // P0-4 双向战斗系统重写
        function processDungeonTick() {
            const dungeonId = gameState.dungeons.currentDungeon;
            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            const monster = dungeon.monsters[gameState.dungeons.currentMonsterIndex];

            // P1-1 应用战斗速度倍率
            const speedMultiplier = gameState.battleSpeed || 1;
            const timeDelta = 0.1 * speedMultiplier;
            applyRegen(gameState.player.stats.hp, timeDelta);   // 灵根/功法的战斗回复特效

            // 定义攻击间隔（秒）
            const playerAttackInterval = 2.0 / (1 + gameState.player.stats.spd / 100);
            const monsterAttackInterval = monster.attackSpeed || 2.5;

            // 1. 玩家攻击计时
            gameState.player.attackTimer += timeDelta;
            if (gameState.player.attackTimer >= playerAttackInterval) {
                performPlayerAttack(monster);
                gameState.player.attackTimer = 0;
            }

            // 2. 怪物攻击计时
            gameState.dungeons.monsterAttackTimer += timeDelta;
            if (gameState.dungeons.monsterAttackTimer >= monsterAttackInterval) {
                performMonsterAttack(monster);
                gameState.dungeons.monsterAttackTimer = 0;
            }

            // 3. 检查怪物状态
            if (gameState.dungeons.currentMonsterHP <= 0) {
                handleMonsterDeath(dungeonId, monster);
                if (gameState.dungeons.battleState === 'dungeon_clear') {
                    updateProgressBars();
                    return;
                }
            }

            // 4. P0-4 自动进食逻辑（在死亡检查前）
            checkAndAutoEat();

            // 5. 检查玩家状态
            if (gameState.player.stats.hp.current <= 0) {
                handlePlayerDeath();
                updateProgressBars();
                return;
            }

            // 累积进度
            gameState.currentActionProgress += timeDelta;

            // P1-1 更新UI显示
            updateBattleHP();
            updateProgressBars();
        }

        // 普通战斗处理（P1-5扩展：简化版，10秒自动完成）
        // 普通战斗推进一步（0.1 秒 × 战斗速度）：计时、双方回合结算、自动进食；不含任何界面更新
        // 在线战斗与离线自动战斗共用，保证两者规则一致
        function stepNormalBattle(battle) {
            const timeDelta = 0.1;

            // 增加战斗计时（受战斗速度按钮影响）
            const prevRound = Math.floor((battle.turnCount || 0) / 2);
            battle.turnCount = (battle.turnCount || 0) + timeDelta * (gameState.battleSpeed || 1);
            applyRegen(battle.playerHP, timeDelta * (gameState.battleSpeed || 1));   // 灵根/功法的战斗回复特效

            // 每2秒一个回合：双方按真实属性结算（命中、防御减伤、境界压制）
            if (Math.floor(battle.turnCount / 2) > prevRound) {
                const enemy = battle.currentEnemy;
                const areaRealm = getAction('battle', battle.currentArea).areaData.minLevel;
                const playerStats = gameState.player.stats;

                const toEnemy = rollNormalAttack(playerStats, enemy, REALM_SUPPRESSION.calculate(gameState.player.realmIndex, areaRealm),
                    { hit: getMod('hit'), crit: BASE_CRIT.rate + getMod('crit'), critMult: BASE_CRIT.dmg + getMod('critDmg'),
                      dmgMult: (1 + getMasteryBonus('battle', battle.currentArea).dmg) * getBattleSkillDmgMult() });
                if (toEnemy.hit) {
                    enemy.currentHP -= toEnemy.dmg;
                    battle.log.push(`玩家${toEnemy.crit ? '暴击！' : ''}造成${toEnemy.dmg}点伤害`);
                } else {
                    battle.log.push('玩家攻击落空');
                }

                if (enemy.currentHP > 0) {
                    const toPlayer = rollNormalAttack(enemy, playerStats, REALM_SUPPRESSION.calculate(areaRealm, gameState.player.realmIndex),
                        { dodge: getMod('dodge') });
                    if (toPlayer.hit) {
                        battle.playerHP.current -= toPlayer.dmg;
                        battle.log.push(`${enemy.name}造成${toPlayer.dmg}点伤害`);
                    } else {
                        battle.log.push(`${enemy.name}攻击落空`);
                    }
                }
                trimBattleLog(battle.log);
            }

            // 战斗食物：生命低于阈值时自动进食（恢复战斗内的生命值）
            checkAndAutoEat(battle.playerHP, msg => battle.log.push(msg));
        }

        function performNormalBattleTick() {
            if (!gameState.battles) return;

            const battle = gameState.battles;

            stepNormalBattle(battle);

            // 更新UI
            updateNormalBattleUI();

            // 战斗完成：敌人HP <= 0、玩家倒下 或 10秒经过
            if (battle.currentEnemy.currentHP <= 0 || battle.playerHP.current <= 0 || battle.turnCount >= 10) {
                completeNormalBattle();
            }
        }

        // 普通战斗单次攻击判定
        // mods：{ hit 命中加成, crit 暴击率, critMult 暴击倍率, dodge 守方闪避 }（玩家攻击带 hit/crit，敌人攻击带 dodge）
        function rollNormalAttack(attacker, defender, suppression, mods = {}) {
            let hitChance = BATTLE_FORMULAS.calculateHitChance(attacker.spd, defender.spd) * suppression.hitMod;
            hitChance = hitChance * (1 - Math.min(0.6, mods.dodge || 0)) + (mods.hit || 0);
            hitChance = Math.max(0.05, Math.min(Math.min(0.99, 0.95 + (mods.hit || 0)), hitChance));
            if (Math.random() >= hitChance) return { hit: false, dmg: 0, crit: false };
            let dmg = Math.floor(BATTLE_FORMULAS.calculateDamage({ atk: attacker.atk }, { def: defender.def }) * suppression.dmgMod * (mods.dmgMult || 1));
            const crit = mods.crit ? Math.random() < mods.crit : false;
            if (crit) dmg = Math.floor(dmg * (mods.critMult || BASE_CRIT.dmg));
            return { hit: true, dmg: Math.max(1, dmg), crit };
        }

        // 更新普通战斗UI
        function updateNormalBattleUI() {
            if (!gameState.battles) return;

            const battle = gameState.battles;
            const player = gameState.player;
            const playerHPPercent = (battle.playerHP.current / battle.playerHP.max) * 100;
            const enemyHPPercent = Math.max(0, (battle.currentEnemy.currentHP / battle.currentEnemy.hp) * 100);

            // 更新玩家信息
            const playerName = document.getElementById('playerNameBattle');
            if (playerName) playerName.textContent = player.name || '玩家';

            // 更新敌人信息
            const monsterName = document.getElementById('monsterNameBattle');
            if (monsterName) monsterName.textContent = `${battle.currentEnemy.icon || '👹'} ${battle.currentEnemy.name}`;

            // 更新玩家HP
            const playerHPBar = document.querySelector('.combatant.player .hp-fill');
            if (playerHPBar) {
                playerHPBar.style.width = Math.max(0, playerHPPercent) + '%';
                playerHPBar.classList.toggle('low', playerHPPercent < 30);
            }
            const playerHPText = document.querySelector('.combatant.player .hp-text');
            if (playerHPText) {
                playerHPText.textContent = `${Math.max(0, Math.floor(battle.playerHP.current))}/${Math.floor(battle.playerHP.max)}`;
            }

            // 更新敌人HP
            const enemyHPBar = document.querySelector('.combatant.monster .hp-fill');
            if (enemyHPBar) {
                enemyHPBar.style.width = enemyHPPercent + '%';
                enemyHPBar.classList.toggle('low', enemyHPPercent < 30);
            }
            const enemyHPText = document.querySelector('.combatant.monster .hp-text');
            if (enemyHPText) {
                enemyHPText.textContent = `${Math.max(0, Math.floor(battle.currentEnemy.currentHP))}/${Math.floor(battle.currentEnemy.hp)}`;
            }

            // 双方命中率
            {
                const areaRealm = getAction('battle', battle.currentArea).areaData.minLevel;
                const pSup = REALM_SUPPRESSION.calculate(player.realmIndex, areaRealm);
                const eSup = REALM_SUPPRESSION.calculate(areaRealm, player.realmIndex);
                const e = battle.currentEnemy;
                const clamp = (v, hi) => Math.max(0.05, Math.min(hi, v));
                const ph = clamp(BATTLE_FORMULAS.calculateHitChance(player.stats.spd, e.spd) * pSup.hitMod + getMod('hit'), Math.min(0.99, 0.95 + getMod('hit')));
                const eh = clamp(BATTLE_FORMULAS.calculateHitChance(e.spd, player.stats.spd) * eSup.hitMod * (1 - Math.min(0.6, getMod('dodge'))), 0.95);
                const ph1 = document.getElementById('playerHit'), eh1 = document.getElementById('monsterHit');
                if (ph1) ph1.textContent = Math.round(ph * 100) + '%';
                if (eh1) eh1.textContent = Math.round(eh * 100) + '%';
            }

            // 标题、双方攻防、怪物图标
            const setText = (id, text) => {
                const el = document.getElementById(id);
                if (el) el.textContent = text;
            };
            updateFoodBar();
            const areaData = getAction('battle', battle.currentArea).areaData;
            setText('battleTitle', `⚔️ 战斗中 · ${areaData.name}`);
            setText('playerAtk', player.stats.atk);
            setText('playerDef', player.stats.def);
            setText('monsterAtk', battle.currentEnemy.atk);
            setText('monsterDef', battle.currentEnemy.def);
            setText('monsterSprite', battle.currentEnemy.icon || '👾');

            // 更新战斗日志（共用日志，仅在有新条目时重绘，保留用户的滚动位置）
            renderBattleLog();
        }

        // 普通战斗完成处理
        function completeNormalBattle() {
            const battle = gameState.battles;
            const areaKey = gameState.currentAction.action;
            const action = getAction('battle', areaKey);
            const areaData = action.areaData;

            // 隐藏战斗UI
            const battleContainer = document.getElementById('battleContainer');
            if (battleContainer) {
                battleContainer.classList.add('hidden');
            }

            // 给予奖励
            const won = battle.currentEnemy.currentHP <= 0;
            const auto = getAutoBattle();
            battleLogEntries.push(won ? `🎉 战胜${battle.currentEnemy.name}` : (battle.playerHP.current <= 0 ? `💀 被${battle.currentEnemy.name}击败` : `⚔️ 未能击败${battle.currentEnemy.name}（超时）`));
            trimBattleLog();
            if (won) {
                const { coins, exp } = grantNormalBattleWin(areaKey);
                auto.wins++; auto.coins += coins; auto.exp += exp;
                battleLogEntries.push(`获得 ${coins} 灵石、${exp} 经验`);
                trimBattleLog();
                // 托管中不逐场弹胜利提示，统计显示在托管栏里
                if (!auto.enabled) {
                    showNotification(`🎉 战胜${battle.currentEnemy.name}！
+${coins}灵石 +${exp}经验`, '#6fa980');
                }
            } else if (battle.playerHP.current <= 0) {
                showNotification(`💀 被${battle.currentEnemy.name}击败，重伤逃出${areaData.name}（血量恢复至50%）`, '#c4483a');
            } else {
                showNotification(`⚔️ 战斗失败，逃出${areaData.name}`, '#c4483a');
            }

            // 结算玩家HP：倒下则恢复至50%，否则保留战斗后的剩余血量
            gameState.player.stats.hp.current = battle.playerHP.current <= 0
                ? Math.floor(gameState.player.stats.hp.max * 0.5)
                : Math.min(gameState.player.stats.hp.max, battle.playerHP.current);

            gameState.battles.battleState = 'finished';
            gameState.currentAction = null;
            gameState.currentActionProgress = 0;

            updateUI();
            saveGame();

            // 循环战斗：打完一场立刻在同一区域开下一场，直到玩家点击「撤退」才退出；
            // 但玩家被击败（生命归零）时循环结束，回到战斗界面，不能靠反复死亡赖在战斗里
            auto.streak = won ? 0 : auto.streak + 1;
            if (!won) auto.losses++;
            const died = !won && battle.playerHP.current <= 0;
            if (died) {
                showNotification('💀 你被击败了，本轮循环战斗结束', '#c4483a');
                switchPanel('battle');
                switchBattleTab('areas');
                renderAutoBattleBar();
                return;
            }
            enterBattleArea(areaKey, true);
        }

        // 一场普通战斗取胜的奖励：精通加成后的灵石 / 经验，并获得该区域精通经验（每胜一场 10）
        function grantNormalBattleWin(areaKey) {
            const areaData = getAction('battle', areaKey).areaData;
            const reward = 1 + getMasteryBonus('battle', areaKey).reward;
            const coins = Math.round(areaData.coins * reward);
            const exp = Math.round(areaData.exp * reward);
            gameState.player.coins += coins;
            addSkillExp('battle', exp);
            addMasteryExp('battle', areaKey, 10);
            return { coins, exp };
        }

        // ==================== 自动战斗托管 ====================
        const AUTO_BATTLE_MAX_LOSS_STREAK = 3;   // 连续几场没赢就停止托管
        const AUTO_BATTLE_OFFLINE_EFFICIENCY = 0.8;   // 离线 / 后台托管的效率：同样时长只完成 80% 的场次（奖励与食物消耗同比例）

        function getAutoBattle() {
            if (!gameState.autoBattle) {
                gameState.autoBattle = { enabled: true, wins: 0, losses: 0, streak: 0, coins: 0, exp: 0 };
            }
            gameState.autoBattle.enabled = true;   // 循环战斗是默认行为（旧存档里可能存着 false）
            return gameState.autoBattle;
        }

        function renderAutoBattleBar() {
            const auto = getAutoBattle();
            const fighting = !!(gameState.currentAction && gameState.currentAction.isBattle);
            const stats = (auto.wins + auto.losses) > 0
                ? ` · 本次 胜${auto.wins} 负${auto.losses} · +${auto.coins}灵石 +${auto.exp}经验` : '';
            const bar = document.getElementById('autoBattleBar');
            if (bar) bar.innerHTML = `<span class="auto-battle-stat">🔁 进入战斗区域后会一直循环战斗，点击「撤退」才会退出；离线也会继续（消耗食物，离线时连败 3 场自动停止）${fighting ? stats : ''}</span>`;
            const st = document.getElementById('autoBattleStatus');
            if (st) st.textContent = fighting ? `🔁 循环战斗 胜${auto.wins} 负${auto.losses}` : '';
        }

        // 离线自动战斗：用与在线完全相同的战斗规则无头模拟（真实消耗食物、真实胜负、真实奖励）
        // 战斗速度临时设为 5，使每步 0.5 秒，既保证食物冷却 / 回复按时间折算，又控制计算量
        function runOfflineAutoBattle(areaKey, budgetSeconds) {
            const auto = getAutoBattle();
            const hp = gameState.player.stats.hp;
            const savedSpeed = gameState.battleSpeed;
            const savedTimer = gameState.player.foodUseTimer;
            gameState.battleSpeed = 5;
            const r = { fights: 0, wins: 0, losses: 0, coins: 0, exp: 0, stopped: false };
            let elapsed = 0, streak = 0;
            try {
                while (elapsed < budgetSeconds && r.fights < 20000) {
                    const battle = { currentArea: areaKey, playerHP: { current: hp.current, max: hp.max },
                        currentEnemy: createAreaEnemy(areaKey), log: [], turnCount: 0 };
                    gameState.player.foodUseTimer = FOOD_CONFIG.autoEatConfig.cooldown;
                    pickBestFood();
                    do {
                        stepNormalBattle(battle);
                    } while (battle.currentEnemy.currentHP > 0 && battle.playerHP.current > 0 && battle.turnCount < 10);
                    elapsed += battle.turnCount / Math.min(1, AUTO_BATTLE_OFFLINE_EFFICIENCY + getMod('autoOffline'));   // 每场按 1/效率 倍时间计（基础 0.8，悟道·冰之法则可提高）
                    r.fights++;
                    const won = battle.currentEnemy.currentHP <= 0;
                    hp.current = battle.playerHP.current <= 0 ? Math.floor(hp.max * 0.5) : Math.min(hp.max, battle.playerHP.current);
                    if (won) {
                        const g = grantNormalBattleWin(areaKey);
                        r.wins++; r.coins += g.coins; r.exp += g.exp; streak = 0;
                    } else {
                        r.losses++;
                        if (battle.playerHP.current <= 0) { r.died = true; break; }   // 被击败：与在线一致，循环结束
                        if (++streak >= AUTO_BATTLE_MAX_LOSS_STREAK) { r.stopped = true; break; }
                    }
                }
            } finally {
                gameState.battleSpeed = savedSpeed;
                gameState.player.foodUseTimer = savedTimer;
            }
            auto.wins += r.wins; auto.losses += r.losses; auto.coins += r.coins; auto.exp += r.exp; auto.streak = streak;
            r.elapsed = Math.round(elapsed);
            return r;
        }

        // 秘境完成处理
        function completeDungeon(dungeonId) {
            // 隐藏战斗UI
            const battleContainer = document.getElementById('battleContainer');
            if (battleContainer) {
                battleContainer.classList.add('hidden');
            }

            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            const rewards = dungeon.rewards;

            // 标记秘境为完成
            gameState.dungeons[dungeonId].completed = true;
            gameState.dungeons.currentDungeon = null;
            gameState.currentAction = null;
            gameState.currentActionProgress = 0;

            // 分配奖励
            let rewardMsg = `✓ 通关 ${dungeon.name}！\n`;

            // 固定掉落种子
            if (rewards.fixed) {
                rewards.fixed.forEach(drop => {
                    const qty = Array.isArray(drop.qty) ? Math.floor(Math.random() * (drop.qty[1] - drop.qty[0] + 1)) + drop.qty[0] : drop.qty;
                    addToInventory(drop.id, qty);
                    const item = GAME_CONFIG.items[drop.id];
                    rewardMsg += `+ ${item.name} x${qty}\n`;
                });
            }

            // 随机掉落（神识地图：本次秘境掉落率×1.3，用后消耗）
            const scoutMult = (gameState.player.scoutBonus ? 1.3 : 1) * (1 + getMod('dropPct'));
            if (gameState.player.scoutBonus) {
                gameState.player.scoutBonus = false;
                rewardMsg += '🗺️ 神识地图生效：掉落率+30%\n';
            }
            if (rewards.random) {
                rewards.random.forEach(drop => {
                    if (Math.random() < drop.probability * scoutMult) {
                        const qty = Array.isArray(drop.qty) ? Math.floor(Math.random() * (drop.qty[1] - drop.qty[0] + 1)) + drop.qty[0] : drop.qty;
                        addToInventory(drop.id, qty);
                        const item = GAME_CONFIG.items[drop.id];
                        rewardMsg += `+ ${item.name} x${qty}\n`;
                    }
                });
            }

            // 技能经验（指数级：100 × level^1.8）
            if (rewards.skillExp) {
                const skill = gameState.skills.battle;
                skill.exp += rewards.skillExp;
                while (skill.exp >= 100 * Math.pow(skill.level, 1.8)) {
                    skill.exp -= 100 * Math.pow(skill.level, 1.8);
                    skill.level++;
                }
                rewardMsg += `+ 战斗经验 x${rewards.skillExp}`;
            }

            showNotification(rewardMsg.trim(), '#6f9c8a');
            updateUI();
            saveGame();

            // 循环挑战：通关后立刻再进同一个秘境，直到撤退或被击败
            enterDungeon(dungeonId, true);
        }

        // 境界压制系统（纵向位阶感）
        const REALM_SUPPRESSION = {
            // 大阶段划分：每4个境界为一个大阶段（凡人单独为0）
            REALMS_PER_TIER: 4,  // 凡人(0), 练气(1-4), 筑基(5-8), 金丹(9-12)...

            // 压制系数（相对值）
            MAJOR_TIER_HIT_PENALTY: 0.15,      // 大境界差每级命中 -15%
            MAJOR_TIER_DMG_PENALTY: 0.12,      // 大境界差每级伤害 -12%
            MINOR_TIER_HIT_PENALTY: 0.03,      // 小境界差每级命中 -3%
            MINOR_TIER_DMG_PENALTY: 0.02,      // 小境界差每级伤害 -2%

            // 上下限
            MIN_SUPPRESSION_RATIO: 0.40,       // 被压制方最低40%
            MAX_SUPPRESSION_RATIO: 1.30,       // 压制方最高130%

            // 计算境界压制系数
            calculate: function(playerRealmIndex, monsterRealmIndex) {
                // 计算大阶段
                const playerTier = Math.floor(playerRealmIndex / this.REALMS_PER_TIER);
                const monsterTier = Math.floor(monsterRealmIndex / this.REALMS_PER_TIER);
                const tierDiff = playerTier - monsterTier;

                // 计算小境界差
                let minorDiff = 0;
                if (tierDiff === 0) {
                    // 同大阶段：直接比较索引
                    minorDiff = playerRealmIndex - monsterRealmIndex;
                } else {
                    // 跨大阶段：计算同阶内位置的差
                    const playerMinor = playerRealmIndex % this.REALMS_PER_TIER;
                    const monsterMinor = monsterRealmIndex % this.REALMS_PER_TIER;
                    minorDiff = playerMinor - monsterMinor;
                }

                // 计算修正系数
                let hitMod = 1 + tierDiff * this.MAJOR_TIER_HIT_PENALTY + minorDiff * this.MINOR_TIER_HIT_PENALTY;
                let dmgMod = 1 + tierDiff * this.MAJOR_TIER_DMG_PENALTY + minorDiff * this.MINOR_TIER_DMG_PENALTY;

                // 应用上下限
                hitMod = Math.max(this.MIN_SUPPRESSION_RATIO, Math.min(this.MAX_SUPPRESSION_RATIO, hitMod));
                dmgMod = Math.max(this.MIN_SUPPRESSION_RATIO, Math.min(this.MAX_SUPPRESSION_RATIO, dmgMod));

                return { hitMod, dmgMod, tierDiff, minorDiff };
            },

            // 获取压制描述文本
            getDescription: function(playerRealmIndex, monsterRealmIndex) {
                const result = this.calculate(playerRealmIndex, monsterRealmIndex);
                const hitPct = Math.round((result.hitMod - 1) * 100);
                const dmgPct = Math.round((result.dmgMod - 1) * 100);

                if (hitPct > 0) {
                    return `🔥境界压制: 命中 +${hitPct}% / 伤害 +${dmgPct}%`;
                } else if (hitPct < 0) {
                    return `⚠️被压制: 命中 ${hitPct}% / 伤害 ${dmgPct}%`;
                } else {
                    return `平行：无压制效果`;
                }
            }
        };

        // 大境界突破需要的丹药配置
        // 键为当前境界索引（突破时的源境界），值为所需丹药信息
        // 新索引：凡人(0), 练气初期(1)...练气巅峰(4), 筑基初期(5)...筑基圆满(8), 金丹初期(9)...金丹圆满(12), 元婴初期(13)...元婴圆满(16)
        const MAJOR_BREAKTHROUGH_PILLS = {
            4: { pillId: 'pill', pillName: '筑基丹', qty: 1 },   // 练气巅峰(索引4)→筑基初期(索引5)
            8: { pillId: 'goldenpill', pillName: '金丹秘药', qty: 1 },  // P6 筑基圆满(索引8)→金丹初期(索引9)
            12: { pillId: 'yuanyingpill', pillName: '元婴丹', qty: 1 },  // P7 金丹圆满(索引12)→元婴初期(索引13)
            16: { pillId: 'huashenpill', pillName: '化神丹', qty: 1 }   // P9 元婴圆满(索引16)→化神初期(索引17)
        };

        // 功法系统（绑定到角色出身，影响修炼速度）
        const CULTIVATION_ARTS = {
            // 基础功法（孤儿出身初始）
            basic_art: {
                id: 'basic_art',
                name: '引气诀',
                tier: 1,
                speedMultiplier: 1.0,               // 修炼速度倍率：1.0x（标准速度）
                description: '最基础的引气入体之法，凡人亦可修习。',
                origin: 'orphan'                    // 该功法绑定的出身
            },
            // 高阶功法（玄门后裔出身初始）
            advanced_art: {
                id: 'advanced_art',
                name: '玄元真诀',
                tier: 2,
                speedMultiplier: 1.2,               // 修炼速度倍率：1.2x（快20%）
                description: '玄门正宗功法，引气效率远超寻常法门。',
                origin: 'disciple'                  // 该功法绑定的出身
            },
            // 练气/筑基期功法（商城购买，有境界要求）
            qingmu_art: {
                id: 'qingmu_art',
                name: '青木诀',
                tier: 2,
                speedMultiplier: 1.1,
                effects: { 'time:farming': -0.10, 'exp:farming': 0.10 },  // 特效
                description: '以草木生机滋养灵脉的入门功法，比引气诀略快。',
                origin: null
            },
            liuyun_art: {
                id: 'liuyun_art',
                name: '流云诀',
                tier: 2,
                speedMultiplier: 1.25,
                effects: { 'time:life': -0.05, dodge: 0.03 },  // 特效
                description: '灵气如流云般周转不息，练气后期的常见选择。',
                origin: null
            },
            xuanshui_art: {
                id: 'xuanshui_art',
                name: '玄水经',
                tier: 3,
                speedMultiplier: 1.35,
                effects: { 'time:alchemy': -0.12, foodPct: 0.15 },  // 特效
                description: '水属性中阶功法，灵气绵长，适合筑基修士打磨根基。',
                origin: null
            },
            lieyang_art: {
                id: 'lieyang_art',
                name: '烈阳功',
                tier: 3,
                speedMultiplier: 1.45,
                effects: { atkPct: 0.08, 'time:forging': -0.10 },  // 特效
                description: '至阳至刚的筑基功法，修炼极快但对经脉要求很高。',
                origin: null
            },
            // P6 金丹期功法（可获取，非出身绑定）
            golden_art: {
                id: 'golden_art',
                name: '金丹大道',
                tier: 3,
                speedMultiplier: 1.5,               // 修炼速度快50%
                effects: { hpPct: 0.10, 'exp:alchemy': 0.15, 'exp:danhuo': 0.15 },  // 特效
                description: '金丹修士的标配功法，以丹火淬炼经脉，修炼效率远超筑基功法。',
                origin: null                        // 非出身绑定
            },
            // 金丹期高阶功法（稀有）
            fire_art: {
                id: 'fire_art',
                name: '焚天诀',
                tier: 4,
                speedMultiplier: 1.8,               // 修炼速度快80%
                effects: { atkPct: 0.15, crit: 0.05, defPct: -0.10 },  // 特效
                description: '火属性顶级功法，以丹火焚烧杂质，修炼极快、攻击强悍，但护体不足。',
                origin: null                        // 非出身绑定
            },
            // P7 元婴期功法（可获取，非出身绑定）
            yuanying_art: {
                id: 'yuanying_art',
                name: '元婴真解',
                tier: 5,
                speedMultiplier: 2.2,               // 修炼速度快120%
                effects: { 'exp:life': 0.10, hpPct: 0.10 },  // 特效
                description: '元婴修士的标配功法，元神与肉身双修，修炼效率是金丹功法的数倍。',
                origin: null
            },
            // 元婴期高阶功法（稀有）
            soul_art: {
                id: 'soul_art',
                name: '太虚元神诀',
                tier: 6,
                speedMultiplier: 2.8,               // 修炼速度快180%
                effects: { 'exp:shenshi': 0.30, 'time:shenshi': -0.15, dropPct: 0.10 },  // 特效
                description: '太虚宗门不传之秘，以元神直接吞吐天地灵气，修炼极快，神识修行事半功倍。',
                origin: null
            },
            // P9 化神期功法
            huashen_art: {
                id: 'huashen_art',
                name: '化神真经',
                tier: 7,
                speedMultiplier: 3.4,               // 修炼速度快240%
                effects: { atkPct: 0.10, critDmg: 0.15, 'exp:life': 0.10 },  // 特效
                description: '化神修士的根本大典，神魂与法力合一，出手凌厉，修行万事皆顺。',
                origin: null
            },
            // 化神期高阶功法（稀有）
            primordial_art: {
                id: 'primordial_art',
                name: '太初混元诀',
                tier: 8,
                speedMultiplier: 4.2,               // 修炼速度快320%
                effects: { hpPct: 0.12, defPct: 0.10, 'time:life': -0.08 },  // 特效
                description: '相传自太初而来的混元之法，肉身与元神浑然一体，修行与劳作皆事半功倍。',
                origin: null
            }
        };

        // 重要说明：
        // - 每个玩家根据出身自动获得一个功法，无法修改
        // - 所有配方对所有功法都可用（配方解锁仅取决于境界，不取决于功法）
        // - 功法只影响修炼速度倍率
        // - 孤儿出身 → 引气诀(1.0x) → 可在修炼面板切换功法，但选项只有引气诀
        // - 玄门后裔 → 玄元真诀(1.2x) → 可在修炼面板切换功法，但选项只有玄元真诀

        // 克制系统改版 (双层机制：命中修正 + 伤害修正)
        const COUNTER_SYSTEM = {
            // 完整双向克制关系表
            relations: {
                metal: { counters: 'wood', countered_by: 'fire' },
                wood: { counters: 'earth', countered_by: 'metal' },
                water: { counters: 'fire', countered_by: 'earth' },
                fire: { counters: 'metal', countered_by: 'water' },
                earth: { counters: 'water', countered_by: 'wood' },
                thunder: { counters: 'ice', countered_by: 'ice' },      // 互克
                ice: { counters: 'thunder', countered_by: 'thunder' },  // 互克
                wind: { counters: null, countered_by: null }            // 无克制
            },

            // 灵根被动属性（战斗风格）
            passives: {
                metal: { name: '金灵根', atk_bonus: 0.10, desc: '攻击力 +10%' },
                wood: { name: '木灵根', hp_bonus: 0.15, desc: '生命上限 +15%' },
                water: { name: '水灵根', hit_bonus: 0.10, desc: '命中率 +10%' },
                fire: { name: '火灵根', crit_rate: 0.05, desc: '暴击率 +5%' },
                earth: { name: '土灵根', def_bonus: 0.15, desc: '防御力 +15%' },
                thunder: { name: '雷灵根', crit_dmg: 0.20, desc: '暴击伤害 +20%' },
                ice: { name: '冰灵根', evasion_bonus: 0.10, desc: '闪避率 +10%' },
                wind: { name: '风灵根', atkspd_bonus: 0.10, evasion_bonus: 0.05, desc: '攻速 +10%, 闪避 +5%' }
            },

            // 计算克制修正（命中和伤害）
            getCounterModifier: function(playerRoot, enemyType) {
                const rel = this.relations[playerRoot];
                if (!rel) return { hit: 1.0, damage: 1.0 };

                if (rel.counters === enemyType) {
                    // 克制：命中 ×1.25，伤害 ×1.3
                    return { hit: 1.25, damage: 1.3 };
                } else if (rel.countered_by === enemyType) {
                    // 被克制：命中 ×0.75，伤害 ×0.8
                    return { hit: 0.75, damage: 0.8 };
                }
                // 无关系
                return { hit: 1.0, damage: 1.0 };
            }
        };

        // 中文属性类型到英文标识符的映射
        const SPIRIT_ROOT_MAPPING = {
            '金': 'metal',
            '木': 'wood',
            '水': 'water',
            '火': 'fire',
            '土': 'earth',
            '雷': 'thunder',
            '冰': 'ice',
            '风': 'wind',
            '无': null
        };

        // 旧的克制关系映射（保留向后兼容）
        const COUNTER_RELATIONS = {
            metal: 'wood',
            wood: 'earth',
            water: 'fire',
            fire: 'metal',
            earth: 'water',
            wind: null,
            thunder: 'ice',
            ice: 'thunder'
        };

        // ==================== 灵根与功法特效系统 ====================
        // 灵根（出身时选定）和功法（当前装备）各自带一组特效，玩家的总加成 = 两者之和。
        // 特效键（数值为小数，可为负）：
        //   战斗：atkPct / hpPct / defPct / spdPct  属性百分比（作用于境界基础属性）
        //         hit 命中率加成（上限随之放宽）、crit 暴击率加成、critDmg 暴击伤害倍率加成、dodge 被命中率降低
        //         regen 战斗中每秒恢复生命上限的比例
        //         foodPct 食物恢复量加成、dropPct 秘境随机掉落概率加成
        //   生活：time:<技能> 耗时变化（负数=更快）、exp:<技能> 经验加成、
        //         double:<技能> 产出翻倍概率、save:<技能> 不消耗材料的概率
        //         <技能> 可写 life 表示所有生活技能（炼丹/炼器/灵田/采矿/丹火/神识）
        const LIFE_SKILLS = ['alchemy', 'forging', 'farming', 'mining', 'danhuo', 'shenshi'];
        const BASE_CRIT = { rate: 0.05, dmg: 1.5 };   // 所有玩家的基础暴击率与暴击倍率

        const SPIRIT_ROOT_EFFECTS = {
            metal:   { name: '金灵根', effects: { atkPct: 0.13, 'time:mining': -0.15, 'save:forging': 0.10 } },
            wood:    { name: '木灵根', effects: { hpPct: 0.17, 'time:farming': -0.15, 'double:farming': 0.15 } },
            water:   { name: '水灵根', effects: { regen: 0.0015, foodPct: 0.25, 'time:alchemy': -0.15 } },
            fire:    { name: '火灵根', effects: { crit: 0.20, atkPct: 0.06, 'time:forging': -0.15, 'exp:danhuo': 0.25 } },
            earth:   { name: '土灵根', effects: { defPct: 0.40, 'double:mining': 0.15, 'exp:farming': 0.15 } },
            thunder: { name: '雷灵根', effects: { crit: 0.06, critDmg: 0.5, 'exp:life': 0.10, 'exp:shenshi': 0.15 } },
            ice:     { name: '冰灵根', effects: { dodge: 0.17, 'save:alchemy': 0.10, 'exp:alchemy': 0.10 } },
            wind:    { name: '风灵根', effects: { spdPct: 0.10, dodge: 0.07, 'time:life': -0.06 } }
        };

        const EFFECT_SKILL_NAMES = { cultivation: '修炼', alchemy: '炼丹', forging: '炼器', farming: '灵田', mining: '采矿', danhuo: '丹火', shenshi: '神识', battle: '战斗', wudao: '悟道', life: '所有生活技能' };

        // ==================== 悟道：八种法则 ====================
        // 化神初期起可用。每种法则有独立的领悟等级（累计经验推算，不单独存等级），效果 = 每级效果 × 等级 + 各里程碑加成，
        // 通过 getMod() 统一接入战斗 / 生活技能 / 全局加成。等级上限随境界提高（化神初期 10，每高一个境界 +5，最高 30）。
        // 与自身灵根同名的法则，参悟速度 +50%。
        const LAW_IDS = ['metal', 'wood', 'water', 'fire', 'earth', 'wind', 'thunder', 'ice'];
        const LAW_MAX_LEVEL = 30;
        const LAW_UNLOCK_REALM = 17;            // 化神初期
        const LAW_EXP_PER_COMPLETION = 12;      // 每次参悟获得的法则经验
        const LAW_RESONANCE_BONUS = 0.5;        // 与灵根同名的法则，经验 +50%
        const LAW_MILESTONE_LEVELS = [5, 10, 15, 20, 25];

        const LAW_EFFECTS = {
            metal:   { name: '金之法则', icon: '🟡', perLevel: { atkPct: 0.004 },
                       milestones: { 5: { crit: 0.02 }, 10: { 'save:forging': 0.03 }, 15: { crit: 0.02 }, 20: { 'save:forging': 0.03 }, 25: { critDmg: 0.10 } } },
            wood:    { name: '木之法则', icon: '🟢', perLevel: { hpPct: 0.004 },
                       milestones: { 5: { regen: 0.0005 }, 10: { 'double:farming': 0.03 }, 15: { regen: 0.0005 }, 20: { 'double:farming': 0.03 }, 25: { cloneSpeed: 0.08 } } },
            water:   { name: '水之法则', icon: '🔵', perLevel: { foodPct: 0.006 },
                       milestones: { 5: { regen: 0.0005 }, 10: { 'exp:alchemy': 0.05 }, 15: { 'save:alchemy': 0.03 }, 20: { 'exp:alchemy': 0.05 }, 25: { 'save:alchemy': 0.03 } } },
            fire:    { name: '火之法则', icon: '🔴', perLevel: { critDmg: 0.006 },
                       milestones: { 5: { atkPct: 0.02 }, 10: { 'time:danhuo': -0.04 }, 15: { atkPct: 0.02 }, 20: { 'time:alchemy': -0.04 }, 25: { 'time:danhuo': -0.04 } } },
            earth:   { name: '土之法则', icon: '🟤', perLevel: { defPct: 0.006 },
                       milestones: { 5: { hpPct: 0.02 }, 10: { 'double:mining': 0.03 }, 15: { hpPct: 0.02 }, 20: { 'double:mining': 0.03 }, 25: { 'exp:mining': 0.10 } } },
            wind:    { name: '风之法则', icon: '🌪️', perLevel: { spdPct: 0.004 },
                       milestones: { 5: { dodge: 0.02 }, 10: { 'time:life': -0.02 }, 15: { dodge: 0.02 }, 20: { 'time:life': -0.02 }, 25: { 'time:life': -0.02 } } },
            thunder: { name: '雷之法则', icon: '🟣', perLevel: { crit: 0.002 },
                       milestones: { 5: { hit: 0.02 }, 10: { 'exp:shenshi': 0.06 }, 15: { dropPct: 0.05 }, 20: { 'exp:shenshi': 0.06 }, 25: { dropPct: 0.05 } } },
            ice:     { name: '冰之法则', icon: '❄️', perLevel: { dodge: 0.003 },
                       milestones: { 5: { defPct: 0.02 }, 10: { cultSpeed: 0.05 }, 15: { autoOffline: 0.03 }, 20: { cultSpeed: 0.05 }, 25: { autoOffline: 0.04 } } }
        };

        // 升到 level 级所需的累计法则经验（level 级 = 从 level-1 升上来所需 lawNeed(level)）
        function lawNeed(level) { return Math.round(25 * Math.pow(level, 1.5)); }
        function lawCumulative(level) {
            let sum = 0;
            for (let l = 1; l <= level; l++) sum += lawNeed(l);
            return sum;
        }

        // 当前境界允许领悟到的最高等级（未到化神初期为 0）
        function lawLevelCap() {
            const realm = gameState.player.realmIndex;
            if (realm < LAW_UNLOCK_REALM) return 0;
            return Math.min(LAW_MAX_LEVEL, 10 + 5 * (realm - LAW_UNLOCK_REALM));
        }

        function getLawStore() {
            if (!gameState.laws) gameState.laws = {};
            return gameState.laws;
        }

        function getLawInfo(id) {
            let exp = Math.floor(getLawStore()[id] || 0);
            let level = 0;
            while (level < LAW_MAX_LEVEL && exp >= lawNeed(level + 1)) {
                exp -= lawNeed(level + 1);
                level++;
            }
            const maxed = level >= LAW_MAX_LEVEL;
            const need = maxed ? 0 : lawNeed(level + 1);
            return { level, exp: maxed ? 0 : exp, need, percent: maxed ? 100 : (exp / need) * 100, maxed };
        }

        // 某个法则在指定等级下的全部效果
        function getLawEffectsAt(id, level) {
            const def = LAW_EFFECTS[id];
            const total = {};
            if (!def || level <= 0) return total;
            const add = (eff, mult) => Object.entries(eff).forEach(([k, v]) => { total[k] = (total[k] || 0) + v * mult; });
            add(def.perLevel, level);
            Object.entries(def.milestones).forEach(([lv, eff]) => { if (level >= Number(lv)) add(eff, 1); });
            return total;
        }

        // 全部法则的加成合计（带缓存；法则升级或读档时失效）
        let lawTotalsCache = null;
        function invalidateLawTotals() { lawTotalsCache = null; }
        function getLawTotals() {
            if (!lawTotalsCache) {
                lawTotalsCache = {};
                LAW_IDS.forEach(id => {
                    Object.entries(getLawEffectsAt(id, getLawInfo(id).level)).forEach(([k, v]) => {
                        lawTotalsCache[k] = (lawTotalsCache[k] || 0) + v;
                    });
                });
            }
            return lawTotalsCache;
        }

        function isLawResonant(id) {
            return gameState.player.spiritRoot === id;
        }

        // 参悟获得法则经验；返回是否已到当前境界的领悟上限
        function addLawExp(id, completions = 1) {
            if (!LAW_EFFECTS[id]) return false;
            const cap = lawLevelCap();
            const store = getLawStore();
            const before = getLawInfo(id).level;
            const mult = 1 + getSkillMod('exp', 'wudao') + (isLawResonant(id) ? LAW_RESONANCE_BONUS : 0);
            const capExp = lawCumulative(cap);
            store[id] = Math.min(capExp, (store[id] || 0) + LAW_EXP_PER_COMPLETION * completions * mult);
            const after = getLawInfo(id).level;
            if (after > before) {
                invalidateLawTotals();
                const def = LAW_EFFECTS[id];
                const isMs = LAW_MILESTONE_LEVELS.includes(after);
                const msText = isMs ? '（里程碑：' + describeEffects(def.milestones[after]).join('、') + '）' : '';
                showNotification(`${def.icon} ${def.name} 领悟到 Lv.${after}${msText}`, '#b89a5b');
            }
            if (document.body.dataset.panel === 'wudao') generateLawList();
            return after >= cap;
        }

        function describeLawNext(id) {
            const { level } = getLawInfo(id);
            const next = LAW_MILESTONE_LEVELS.find(m => m > level);
            if (!next) return '';
            return `下一里程碑 Lv.${next}：${describeEffects(LAW_EFFECTS[id].milestones[next]).join('、')}`;
        }

        // 悟道面板：八种法则卡片
        function generateLawList() {
            const list = document.getElementById('wudaoActions');
            if (!list) return;
            const cap = lawLevelCap();
            const cur = gameState.currentAction;
            list.innerHTML = '';
            LAW_IDS.forEach(id => {
                const def = LAW_EFFECTS[id];
                const info = getLawInfo(id);
                const eff = describeEffects(getLawEffectsAt(id, info.level));
                const atCap = info.level >= cap;
                const active = cur && cur.skill === 'wudao' && cur.action === id;
                const card = document.createElement('div');
                card.className = 'action-item law-card' + (active ? ' active' : '') + (atCap ? ' law-capped' : '');
                card.id = 'action-wudao-' + id;
                card.innerHTML = `
                    <div class="recipe-header"><span class="recipe-icon">${def.icon}</span><span class="recipe-name">${def.name}</span>${isLawResonant(id) ? '<span class="law-resonant" title="与你的灵根相合：参悟速度 +50%">✦ 灵根相合</span>' : ''}</div>
                    <div class="law-level">Lv.${info.level} <small>/ ${cap}</small></div>
                    <div class="mastery-track"><div class="mastery-fill" style="width: ${info.percent}%"></div></div>
                    <div class="law-exp">${atCap ? '已至当前境界上限，突破后可继续领悟' : `${info.exp} / ${info.need}`}</div>
                    <div class="law-effects">${eff.length ? eff.join(' · ') : '尚未领悟'}</div>
                    <div class="law-next">${describeLawNext(id)}</div>
                    <div class="action-progress-bar ${active ? 'active' : ''}"><div class="action-progress-fill" style="width: 0%"></div></div>`;
                card.onclick = () => selectAction('wudao', id);
                list.appendChild(card);
            });
        }

        // 当前灵根 + 当前功法 + 悟道法则提供的某项特效总和
        function getMod(key) {
            const player = gameState && gameState.player;
            if (!player) return 0;
            let total = 0;
            const rootEffects = SPIRIT_ROOT_EFFECTS[player.spiritRoot]?.effects;
            if (rootEffects && rootEffects[key]) total += rootEffects[key];
            const artEffects = CULTIVATION_ARTS[player.currentArt]?.effects;
            if (artEffects && artEffects[key]) total += artEffects[key];
            total += getLawTotals()[key] || 0;
            return total;
        }

        // 某个技能的特效（含「所有生活技能」通配）
        function getSkillMod(kind, skill) {
            let total = getMod(`${kind}:${skill}`);
            if (LIFE_SKILLS.includes(skill)) total += getMod(`${kind}:life`);
            return total;
        }

        // 战斗中的生命回复（regen 特效）：按秒累积，攒够整数才回血，避免出现小数生命值
        function applyRegen(hpObj, seconds) {
            const rate = getMod('regen');
            if (rate <= 0 || hpObj.current <= 0 || hpObj.current >= hpObj.max) return;
            gameState.player.regenAcc = (gameState.player.regenAcc || 0) + hpObj.max * rate * seconds;
            const whole = Math.floor(gameState.player.regenAcc);
            if (whole > 0) {
                gameState.player.regenAcc -= whole;
                hpObj.current = Math.min(hpObj.max, hpObj.current + whole);
            }
        }

        // 把特效表转成中文描述列表
        function describeEffects(effects) {
            if (!effects) return [];
            const sign = v => (v > 0 ? '+' : '') + Math.round(v * 100) + '%';
            const fixed = {
                atkPct: v => `攻击 ${sign(v)}`, hpPct: v => `生命 ${sign(v)}`, defPct: v => `防御 ${sign(v)}`, spdPct: v => `速度 ${sign(v)}`,
                hit: v => `命中 ${sign(v)}`, crit: v => `暴击率 ${sign(v)}`, critDmg: v => `暴击伤害 ${sign(v)}`, dodge: v => `闪避 ${sign(v)}`,
                foodPct: v => `食物恢复 ${sign(v)}`, dropPct: v => `秘境掉落 ${sign(v)}`,
                cultSpeed: v => `修炼速度 ${sign(v)}`, cloneSpeed: v => `分身速度 ${sign(v)}`, autoOffline: v => `离线自动战斗效率 ${sign(v)}`, regen: v => `战斗回复 ${parseFloat((v * 100).toFixed(2))}%生命/秒`
            };
            return Object.entries(effects).map(([key, v]) => {
                if (fixed[key]) return fixed[key](v);
                const [kind, skill] = key.split(':');
                const name = EFFECT_SKILL_NAMES[skill] || skill;
                if (kind === 'time') return `${name}耗时 ${sign(v)}`;
                if (kind === 'exp') return `${name}经验 ${sign(v)}`;
                if (kind === 'double') return `${name}产出翻倍 ${sign(v)}`;
                if (kind === 'save') return `${name}节省材料 ${sign(v)}`;
                return key;
            });
        }

        const ROOT_ICONS = { metal: '🟡', wood: '🟢', water: '🔵', fire: '🔴', earth: '🟤', thunder: '🟣', ice: '❄️', wind: '🌪️' };

        // 侧栏：当前灵根与功法的特效
        function updateBonusPanel() {
            const el = document.getElementById('bonusList');
            if (!el) return;
            const player = gameState.player;
            const root = SPIRIT_ROOT_EFFECTS[player.spiritRoot];
            const art = CULTIVATION_ARTS[player.currentArt];
            let html = '';
            if (root) {
                html += `<div><b style="color:#b89a5b">${ROOT_ICONS[player.spiritRoot]} ${root.name}</b>：${describeEffects(root.effects).join(' · ')}</div>`;
            }
            if (art) {
                const eff = describeEffects(art.effects);
                html += `<div><b style="color:#7d9bb5">📜 ${art.name}</b>（修炼×${art.speedMultiplier}）：${eff.length ? eff.join(' · ') : '无特殊效果'}</div>`;
            }
            // 悟道：已领悟的法则合计
            const lawParts = LAW_IDS.filter(id => getLawInfo(id).level > 0).map(id => `${LAW_EFFECTS[id].icon}${LAW_EFFECTS[id].name.replace('之法则', '')}Lv.${getLawInfo(id).level}`);
            if (lawParts.length) {
                html += `<div><b style="color:#c084fc">☯️ 悟道</b>：${lawParts.join(' ')}</div>`;
            }
            el.innerHTML = html || '无';
        }

        // 灵根说明弹窗里的特效列表
        function fillRootEffectList() {
            const el = document.getElementById('rootEffectList');
            if (!el) return;
            el.innerHTML = Object.entries(SPIRIT_ROOT_EFFECTS)
                .map(([key, root]) => `${ROOT_ICONS[key]} ${root.name}：${describeEffects(root.effects).join('，')}`)
                .join('<br/>');
        }

        // 创建角色时的灵根选项：写明克制关系与特效
        function populateRootOptions() {
            const select = document.getElementById('playerSpiritRoot');
            if (!select) return;
            select.querySelectorAll('option').forEach(option => {
                const root = SPIRIT_ROOT_EFFECTS[option.value];
                if (!root) return;
                const counter = COUNTER_RELATIONS[option.value];
                const counterText = counter ? `克制${SPIRIT_ROOT_EFFECTS[counter].name}` : '无克制';
                option.textContent = `${root.name} - ${counterText}｜${describeEffects(root.effects).join('、')}`;
            });
        }

        // 商城功法卡片的说明：修炼速度 + 特效
        function getArtShopDesc(item) {
            const eff = describeEffects(CULTIVATION_ARTS[item.id]?.effects);
            return item.desc + (eff.length ? `<br/><span style="color:#6fa980">${eff.join('<br/>')}</span>` : '');
        }

        // 游戏配置常量（便于调整平衡性）
        const GAME_BALANCE = {
            AUTO_SAVE_INTERVAL: 30000,      // 自动保存间隔（毫秒）
            OFFLINE_REWARD_MAX_HOURS: 24,   // 离线奖励最多小时数
            NOTIFICATION_DURATION: 2000,    // 普通通知持续时间（毫秒）
            TICK_INTERVAL: 100,             // 游戏Tick间隔（毫秒）
            WORK_SPEED_MODIFIER: 0.95,      // 孤儿出身工作速度倍数
            COUNTER_DAMAGE_MULTIPLIER: 1.5, // 克制伤害倍数
            NORMAL_DAMAGE_MULTIPLIER: 1.0   // 正常伤害倍数
        };


        // 检查修炼配方是否解锁（境界 + 功法双门槛）
        function isCultivationRecipeUnlocked(recipeKey) {
            const recipe = GAME_CONFIG.skills.cultivation.recipes[recipeKey];
            const playerRealmIndex = gameState.player.realmIndex;

            if (!recipe) return false;

            // 仅检查境界要求（不检查功法，所有配方对所有功法都可用）
            if (playerRealmIndex < (recipe.requiredRealmIndex || 0)) {
                return false;
            }

            return true;
        }

        // 计算调整后的行动持续时间
        // 修炼：仅受功法速度倍率 = duration ÷ speedMultiplier
        // 工作速度倍率：来自已装备物品的 effect.workSpeed（如灵玉 0.95 = 生活技能与悟道耗时 -5%），同一件只算一次
        function getWorkSpeedMultiplier() {
            const eq = gameState.player.equipment || {};
            const ids = new Set([eq.weapon, eq.armor, ...(eq.jewelry || [])].filter(Boolean));
            let mult = 1;
            ids.forEach(id => {
                const ws = GAME_CONFIG.items[id]?.effect?.workSpeed;
                if (ws) mult *= ws;
            });
            return mult;
        }

        // 其他技能：仅受工作速度倍率 = duration × getWorkSpeedMultiplier()
        function getAdjustedDuration(skill, duration, recipeKey = null) {
            if (skill === 'cultivation') {
                const currentArt = CULTIVATION_ARTS[gameState.player.currentArt];
                const cultMult = 1 + getMod('cultSpeed');   // 悟道法则的修炼速度加成
                if (currentArt) {
                    return duration / (currentArt.speedMultiplier * cultMult); // 倍率越高，持续时间越短
                }
                return duration / cultMult;
            } else {
                // 灵根/功法的耗时特效（下限30%，避免叠加后过快）
                const timeMod = Math.max(0.3, 1 + getSkillMod('time', skill) + getMasteryBonus(skill, recipeKey).time);
                // 灵田等级：每级耗时 -1%（SKILL_LEVEL_EFFECTS.farming）
                const levelMod = skill === 'farming' ? SKILL_LEVEL_EFFECTS.farming.formula((gameState.skills.farming || {}).level || 1) : 1;
                return duration * getWorkSpeedMultiplier() * timeMod * levelMod;
            }
        }

        // 获取灵根克制的目标
        function getCounteredType(spiritRoot) {
            return COUNTER_RELATIONS[spiritRoot];
        }

        // ==================== 配方精通系统 ====================
        // 每个配方（六个生活技能）/ 战斗区域有独立的精通等级 1~20，精通经验 = 每次完成的配方基础耗时秒数（战斗区域每胜一场 10）。
        //   生活技能：每级 +0.75% 翻倍产出（采矿/灵田）或节省材料（炼丹/炼器/丹火/神识）；
        //             5/10/15/20 级各 -3% 耗时；20 级该配方获得的技能经验 +10%
        //   战斗区域：每级 +1% 灵石与经验；5/10/15/20 级各 +2% 伤害
        // 修炼不设精通（修炼由境界和功法驱动，不能打乱主线节奏）。精通数据存在 gameState.skills[技能].mastery。
        const MASTERY_MAX_LEVEL = 20;
        const MASTERY_MILESTONES = [5, 10, 15, 20];
        const MASTERY_DOUBLE_SKILLS = ['mining', 'farming'];

        // 升到下一级所需精通经验
        function masteryNeed(level) {
            return Math.round(12 * Math.pow(level, 1.4));
        }

        function getMasteryStore(skillName) {
            const skill = gameState.skills[skillName];
            if (!skill) return null;
            if (!skill.mastery) skill.mastery = { recipes: {}, pool: 0 };
            return skill.mastery;
        }

        // 精通进度：由累计精通经验推算等级（不单独存等级，避免数据不一致）
        function getMasteryInfo(skillName, key) {
            const store = getMasteryStore(skillName);
            let exp = Math.floor((store && store.recipes[key]) || 0);
            let level = 1;
            while (level < MASTERY_MAX_LEVEL && exp >= masteryNeed(level)) {
                exp -= masteryNeed(level);
                level++;
            }
            const maxed = level >= MASTERY_MAX_LEVEL;
            const need = maxed ? 0 : masteryNeed(level);
            return { level, exp: maxed ? 0 : exp, need, percent: maxed ? 100 : (exp / need) * 100, maxed };
        }

        // ---- 精通池（阶段二）：每个生活技能一个共用池，做任何配方都会有 25% 的精通经验额外流入 ----
        const MASTERY_POOL_RATE = 0.25;
        const MASTERY_POOL_PER_RECIPE = 7030;   // 池容量 = 该技能配方数 × 一个配方满级所需经验
        const MASTERY_POOL_CHECKPOINTS = [
            { at: 0.10, exp: 0.05, desc: '技能经验 +5%' },
            { at: 0.25, time: -0.03, desc: '全部配方耗时 -3%' },
            { at: 0.50, main: 0.03, desc: '全部配方产出翻倍/节省材料 +3%' },
            { at: 0.95, time: -0.03, main: 0.03, desc: '再来一次：耗时 -3%、翻倍/节省 +3%' }
        ];

        function getMasteryPoolCap(skillName) {
            const cfg = GAME_CONFIG.skills[skillName];
            const n = cfg && cfg.recipes ? Object.keys(cfg.recipes).length : 0;
            return Math.max(1, n) * MASTERY_POOL_PER_RECIPE;
        }

        function getMasteryPoolInfo(skillName) {
            const store = getMasteryStore(skillName);
            const cap = getMasteryPoolCap(skillName);
            const exp = Math.min(cap, Math.floor((store && store.pool) || 0));
            const percent = exp / cap;
            return { exp, cap, percent, reached: MASTERY_POOL_CHECKPOINTS.filter(c => percent >= c.at) };
        }

        // ---- 技能等级里程碑（第一层）：生活技能自身等级达到 10/20/30/50 时，全部配方获得加成 ----
        const SKILL_MILESTONES = [
            { level: 10, exp: 0.05, desc: '技能经验 +5%' },
            { level: 20, time: -0.03, desc: '全部配方耗时 -3%' },
            { level: 30, main: 0.03, desc: '全部配方产出翻倍/节省材料 +3%' },
            { level: 50, time: -0.03, main: 0.03, desc: '耗时 -3%、翻倍/节省 +3%' }
        ];

        function getSkillMilestones(skillName) {
            const level = (gameState.skills[skillName] || {}).level || 1;
            return { reached: SKILL_MILESTONES.filter(m => level >= m.level), next: SKILL_MILESTONES.find(m => level < m.level) };
        }

        // 技能层面的加成 = 精通池检查点 + 技能等级里程碑（对该技能所有配方生效）
        function getMasteryPoolBonus(skillName) {
            const b = { main: 0, time: 0, exp: 0 };
            if (!LIFE_SKILLS.includes(skillName)) return b;
            getMasteryPoolInfo(skillName).reached.concat(getSkillMilestones(skillName).reached).forEach(c => {
                b.main += c.main || 0; b.time += c.time || 0; b.exp += c.exp || 0;
            });
            return b;
        }

        // 把池里的精通经验灌入某个配方（最多灌到下一级；1:1，池减少会失去检查点加成）
        function infuseMastery(skillName, key) {
            const store = getMasteryStore(skillName);
            if (!store || !LIFE_SKILLS.includes(skillName)) return;
            const info = getMasteryInfo(skillName, key);
            if (info.maxed) return;
            const amount = Math.min(Math.floor(store.pool || 0), info.need - info.exp);
            if (amount <= 0) { showNotification('精通池是空的', '#b89a5b'); return; }
            store.pool -= amount;
            addMasteryExp(skillName, key, amount, true);
            if (typeof generateRecipeList === 'function') generateRecipeList(skillName);
            updateSkillHeaders();
        }

        // 精通带来的加成（double/save 为概率，time 为耗时变化，exp 为技能经验加成，dmg 为战斗伤害，reward 为战斗奖励）
        function getMasteryBonus(skillName, key) {
            const none = { double: 0, save: 0, time: 0, exp: 0, dmg: 0, reward: 0 };
            if (LIFE_SKILLS.includes(skillName) && !key) {
                const pb = getMasteryPoolBonus(skillName);
                const isD = MASTERY_DOUBLE_SKILLS.includes(skillName);
                return { ...none, double: isD ? pb.main : 0, save: isD ? 0 : pb.main, time: pb.time, exp: pb.exp };
            }
            if (!key) return none;
            const { level } = getMasteryInfo(skillName, key);
            const steps = level - 1;
            const tiers = MASTERY_MILESTONES.filter(t => level >= t).length;
            if (skillName === 'battle') return { ...none, reward: 0.01 * steps, dmg: 0.02 * tiers };
            if (!LIFE_SKILLS.includes(skillName)) return none;
            const pb = getMasteryPoolBonus(skillName);
            const perLevel = 0.0075 * steps + pb.main;
            const isDouble = MASTERY_DOUBLE_SKILLS.includes(skillName);
            return {
                ...none,
                double: isDouble ? perLevel : 0,
                save: isDouble ? 0 : perLevel,
                time: -0.03 * tiers + pb.time,
                exp: (level >= MASTERY_MAX_LEVEL ? 0.10 : 0) + pb.exp
            };
        }

        // 精通加成的文字说明（用于悬停提示）
        function describeMastery(skillName, key) {
            const b = getMasteryBonus(skillName, key);
            const pct = v => parseFloat((v * 100).toFixed(2)) + '%';
            const lines = [];
            if (b.double) lines.push(`产出翻倍 +${pct(b.double)}`);
            if (b.save) lines.push(`节省材料 +${pct(b.save)}`);
            if (b.time) lines.push(`耗时 ${pct(b.time)}`);
            if (b.exp) lines.push(`技能经验 +${pct(b.exp)}`);
            if (b.reward) lines.push(`灵石与经验 +${pct(b.reward)}`);
            if (b.dmg) lines.push(`伤害 +${pct(b.dmg)}`);
            const { level } = getMasteryInfo(skillName, key);
            const next = MASTERY_MILESTONES.find(t => t > level);
            if (next) lines.push(`下一个里程碑：Lv.${next}`);
            return lines.length ? lines.join('；') : '暂无加成';
        }

        // 增加配方精通经验；升级时提示
        function addMasteryExp(skillName, key, amount, fromPool = false) {
            const store = getMasteryStore(skillName);
            if (!store || !key || !(amount > 0)) return;
            const before = getMasteryInfo(skillName, key).level;
            if (!fromPool && LIFE_SKILLS.includes(skillName)) {
                const cap = getMasteryPoolCap(skillName);
                const poolBefore = getMasteryPoolInfo(skillName).reached.length;
                store.pool = Math.min(cap, (store.pool || 0) + amount * MASTERY_POOL_RATE);
                const rc = getMasteryPoolInfo(skillName).reached;
                if (rc.length > poolBefore) {
                    showNotification(`🎓 ${gameState.skills[skillName].name}精通池达到 ${Math.round(rc[rc.length - 1].at * 100)}%：${rc[rc.length - 1].desc}`, '#b89a5b');
                }
            }
            store.recipes[key] = (store.recipes[key] || 0) + amount;
            const after = getMasteryInfo(skillName, key).level;
            if (after > before) {
                const name = (getAction(skillName, key) || {}).name || key;
                const milestone = MASTERY_MILESTONES.includes(after) ? '（里程碑！）' : '';
                showNotification(`🎓 ${name} 精通 Lv.${after}${milestone}`, '#b89a5b');
            }
        }

        // 升到下一级所需经验（指数级: 100 × level^1.8）
        function skillExpNeeded(level) {
            return Math.round(100 * Math.pow(level, 1.8));
        }

        // 技能经验进度：当前经验、升级所需、还差多少、百分比
        function getSkillExpInfo(skillName) {
            const skill = gameState.skills[skillName];
            if (!skill) return null;
            const level = skill.level || 1;
            const exp = Math.floor(skill.exp || 0);
            const need = skillExpNeeded(level);
            return { level, exp, need, remain: Math.max(0, need - exp), percent: Math.min(100, (exp / need) * 100) };
        }

        // 技能面板顶部的技能头：等级 + 经验条 + 还差多少升级
        function updateSkillHeaders() {
            document.querySelectorAll('.skill-exp-header').forEach(el => {
                const skillName = el.dataset.skill;
                const skill = gameState.skills[skillName];
                const info = getSkillExpInfo(skillName);
                if (!skill || !info) return;
                el.innerHTML = `
                    <div class="skill-exp-top">
                        <span class="skill-exp-name">${skill.icon} ${skill.name}</span>
                        <span class="skill-exp-level">Lv.${info.level}</span>
                    </div>
                    <div class="skill-exp-track"><div class="skill-exp-fill" style="width: ${info.percent}%"></div></div>
                    <div class="skill-exp-text">经验 ${info.exp} / ${info.need} · 还差 <b>${info.remain}</b> 升到 Lv.${info.level + 1}</div>
                    ${LIFE_SKILLS.includes(skillName) ? (() => {
                        const sm = getSkillMilestones(skillName);
                        const tipM = SKILL_MILESTONES.map(m => `${info.level >= m.level ? '✓' : '○'} Lv.${m.level}：${m.desc}`).join('&#10;');
                        return `<div class="skill-pool" title="${tipM}">🏅 技能里程碑 ${sm.reached.length}/${SKILL_MILESTONES.length}${sm.next ? ` · 下一个 Lv.${sm.next.level}：${sm.next.desc}` : ' · 已全部达成'}</div>`;
                    })() : ''}
                    ${LIFE_SKILLS.includes(skillName) ? (() => {
                        const pi = getMasteryPoolInfo(skillName);
                        const tip = MASTERY_POOL_CHECKPOINTS.map(c => `${pi.percent >= c.at ? '✓' : '○'} ${Math.round(c.at * 100)}%：${c.desc}`).join('&#10;');
                        return `<div class="skill-pool" title="${tip}">🎓 精通池 ${pi.exp}/${pi.cap}（${(pi.percent * 100).toFixed(1)}%）
                            <div class="skill-exp-track pool-track"><div class="skill-exp-fill pool-fill" style="width: ${pi.percent * 100}%"></div>${MASTERY_POOL_CHECKPOINTS.map(c => `<i class="pool-mark" style="left:${c.at * 100}%"></i>`).join('')}</div></div>`;
                    })() : ''}
                `;
            });
        }

        // 手机没有悬停：点击精通池 / 技能里程碑 / 配方精通区域时，把 title 提示内容以通知形式显示
        document.addEventListener('click', e => {
            if (e.target.closest('.infuse-btn')) return;
            const el = e.target.closest('.skill-pool, .recipe-mastery');
            if (!el || !el.title) return;
            const text = el.title.replace(/&#10;/g, '\n');
            e.stopPropagation();   // 点精通区域只看说明，不触发配方卡片的开始行动
            showNotification(text, '#b89a5b');
        }, true);

        // 增加技能经验并处理升级，在线结算与离线结算共用
        function addSkillExp(skillName, exp, recipeKey = null) {
            const skill = gameState.skills[skillName];
            if (!skill) return;
            // 灵根/功法的经验特效 + 该配方的精通经验加成
            skill.exp += Math.round(exp * (1 + getSkillMod('exp', skillName) + getMasteryBonus(skillName, recipeKey).exp));
            while (skill.exp >= skillExpNeeded(skill.level)) {
                skill.exp -= skillExpNeeded(skill.level);
                skill.level++;
                const effect = calculateSkillLevelEffect(skillName, skill.level);
                showNotification(`${skill.name}升到${skill.level}级 ${effect}`, '#6f9c8a', 'normal');
                const ms = LIFE_SKILLS.includes(skillName) && SKILL_MILESTONES.find(m => m.level === skill.level);
                if (ms) showNotification(`🏅 ${skill.name}达到 Lv.${ms.level} 里程碑：${ms.desc}`, '#b89a5b');
            }
        }

        function completeAction(act = gameState.currentAction) {
            const action = getAction(act.skill, act.action);
            if (!action.output) return;

            // 消耗所需的材料（P2功能 - 材料消耗）；灵根/功法的「节省材料」特效有概率整次不消耗
            const actionKey = act.action;
            const mastery = getMasteryBonus(act.skill, actionKey);
            const saveMaterials = action.requires && Math.random() < getSkillMod('save', act.skill) + mastery.save;
            if (saveMaterials) showNotification('✨ 材料节省：本次未消耗材料', '#6fa980');
            if (action.requires && !saveMaterials) {
                Object.entries(action.requires).forEach(([itemId, qty]) => {
                    const invIndex = gameState.player.inventory.findIndex(i => i.id === itemId);
                    if (invIndex !== -1) {
                        gameState.player.inventory[invIndex].qty -= qty;
                        if (gameState.player.inventory[invIndex].qty <= 0) {
                            gameState.player.inventory.splice(invIndex, 1);
                        }
                    }
                });
            }

            let finalOutput = JSON.parse(JSON.stringify(action.output));

            // 应用技能等级效果
            applySkillLevelBonus(act.skill, finalOutput);

            // 战斗特殊处理（掉落）
            if (act.skill === 'battle') {
                const areaData = action.areaData;

                // 战斗掉落：根据地区难度产出矿石
                const drops = [];
                const areaLevel = areaData.maxLevel;

                if (areaLevel === 2) {
                    drops.push({ id: 'stone', qty: Math.floor(Math.random() * 3) + 1 });
                } else if (areaLevel === 4) {
                    drops.push({ id: 'ironore', qty: Math.floor(Math.random() * 2) + 1 });
                    if (Math.random() > 0.5) drops.push({ id: 'stone', qty: 1 });
                } else if (areaLevel === 6) {
                    drops.push({ id: 'spiritore', qty: Math.floor(Math.random() * 2) + 1 });
                    drops.push({ id: 'crystal', qty: Math.random() > 0.7 ? 1 : 0 });
                }

                finalOutput.items = drops;
            }

            // 灵根/功法的「产出翻倍」特效
            if (finalOutput.items && finalOutput.items.length && Math.random() < getSkillMod('double', act.skill) + mastery.double) {
                finalOutput.items.forEach(item => { item.qty *= 2; });
                showNotification('✨ 产出翻倍！', '#6fa980');
            }

            // 处理输出
            if (finalOutput.coins) {
                gameState.player.coins += finalOutput.coins;
            }
            if (finalOutput.items) {
                finalOutput.items.forEach(item => {
                    if (item.qty > 0) addToInventory(item.id, item.qty);
                });
            }

            // 处理技能经验
            if (finalOutput.skill && finalOutput.exp) {
                addSkillExp(finalOutput.skill, finalOutput.exp, actionKey);
            }

            // 配方精通经验（生活技能）
            if (LIFE_SKILLS.includes(act.skill)) {
                addMasteryExp(act.skill, actionKey, action.duration);
            }

            // 悟道：参悟一次增加对应法则的经验；到当前境界上限则停止
            if (act.skill === 'wudao' && addLawExp(actionKey, 1)) {
                showNotification(`${LAW_EFFECTS[actionKey].name}已至当前境界的领悟上限，突破后可继续`, '#c98a3e');
                gameState.currentAction = null;
                gameState.currentActionProgress = 0;
            }

            // 如果有修为产出（修炼/战斗）
            if (finalOutput.cultivation) {
                const currentRealm = GAME_CONFIG.realms[gameState.player.realmIndex];
                const realmCapacity = currentRealm.nextReq;

                // 检查修为是否会超过本境界上限
                if (gameState.player.cultivationXP + finalOutput.cultivation >= realmCapacity) {
                    // 修为达到上限，停止当前行动并设置为上限值
                    gameState.player.cultivationXP = realmCapacity;
                    gameState.currentAction = null;
                    gameState.currentActionProgress = 0;
                    showNotification(`修为已达 ${currentRealm.name} 上限，请进行突破`, '#c2a25f');
                } else {
                    // 正常增加修为
                    gameState.player.cultivationXP += finalOutput.cultivation;
                }
            }

            updateUI();
            saveGame();
        }

        // 计算技能等级效果显示文本
        function calculateSkillLevelEffect(skillName, level) {
            const effect = SKILL_LEVEL_EFFECTS[skillName];
            if (!effect) return '';

            const multiplier = effect.formula(level);

            if (effect.effectType === 'output') {
                const percentage = Math.round((multiplier - 1) * 100);
                return `产出 +${percentage}%`;
            } else if (effect.effectType === 'quantity') {
                return `产量 +${Math.floor(multiplier - 1)}`;
            } else if (effect.effectType === 'quality') {
                return `装备属性 +${parseFloat(((multiplier - 1) * 100).toFixed(1))}%`;
            } else if (effect.effectType === 'speed') {
                const speedup = Math.round((1 - multiplier) * 100);
                return `速度 +${speedup}%`;
            } else if (effect.effectType === 'damage') {
                const percentage = Math.round((multiplier - 1) * 100);
                return `伤害 +${percentage}%`;
            } else if (effect.effectType === 'clone') {
                return `分身耗时 ×${multiplier.toFixed(2)}`;
            }
            return '';
        }

        // 应用技能等级加成到产出
        function applySkillLevelBonus(skillName, output) {
            const skill = gameState.skills[skillName];
            const effect = SKILL_LEVEL_EFFECTS[skillName];

            if (!skill || !effect || skill.level < 2) return; // 等级1不提供加成

            const multiplier = effect.formula(skill.level);

            if (effect.effectType === 'output' && output.cultivation) {
                // 修炼输出加成：修为 + exp都乘以倍数
                output.cultivation = Math.floor(output.cultivation * multiplier);
                if (output.exp) output.exp = Math.floor(output.exp * multiplier);
            } else if (effect.effectType === 'output' && output.coins) {
                // 灵石输出加成
                output.coins = Math.floor(output.coins * multiplier);
            } else if (effect.effectType === 'quantity' && output.items) {
                // 产量加成：物品数量+1每5级
                const bonusQty = Math.floor((skill.level - 1) / 5);
                if (bonusQty > 0) {
                    output.items.forEach(item => {
                        item.qty += bonusQty;
                    });
                }
            } else if (effect.effectType === 'output' && output.items) {
                // 采矿等输出加成
                output.items.forEach(item => {
                    item.qty = Math.floor(item.qty * multiplier);
                });
            }
        }

        // ==================== 功能函数 ====================
        function switchPanel(panelName) {
            // 隐藏所有面板
            document.querySelectorAll('.panel-content').forEach(p => p.classList.add('hidden'));
            // 显示选中面板
            const panel = document.getElementById('panel-' + panelName);
            if (panel) panel.classList.remove('hidden');
            document.body.dataset.panel = panelName;
            updateSkillHeaders();
            if (panelName === 'battle') renderAutoBattleBar();
            syncMobileTab(panelName);
            renderMobileSkillBar();

            // 只有技能相关面板才更新技能树高亮
            if (['cultivation', 'alchemy', 'forging', 'farming', 'mining', 'battle', 'danhuo', 'shenshi', 'wudao'].includes(panelName)) {
                updateSkillTree(panelName);
            }

            // 生成配方/技能列表
            if (['cultivation', 'alchemy', 'forging', 'farming', 'mining', 'danhuo', 'shenshi'].includes(panelName)) {
                generateRecipeList(panelName);
            } else if (panelName === 'wudao') {
                generateLawList();
            } else if (panelName === 'battle') {
                generateBattleList();
            } else if (panelName === 'shop') {
                updateShop();
            } else if (panelName === 'inventory') {
                updateInventory();
            } else if (panelName === 'equipment') {
                renderEquipmentPanel();
            } else if (panelName === 'settings') {
                loadSettingsPanel();
            }
        }

        function updateSetting(settingName, value) {
            // 转换值类型
            if (settingName === 'maxOfflineHours' || settingName === 'fontScale' || settingName === 'notificationSeconds') {
                value = parseInt(value);
            }
            gameState.settings[settingName] = value;
            updateSettingDisplay(settingName);
            if (settingName === 'fontScale') applyDisplaySettings();
            saveGame();
            if (settingName === 'notificationSeconds') showNotification(`通知将停留 ${value} 秒`, '#b89a5b');
        }

        function updateSettingDisplay(settingName) {
            const settings = gameState.settings;
            if (settingName === 'enableNotifications') {
                document.getElementById('notificationStatus').textContent = settings.enableNotifications ? '已启用' : '已禁用';
            }
        }

        // 显示设置：字体大小（缩放根字号，界面里以 em 为单位的文字随之缩放）
        function applyDisplaySettings() {
            const pct = (gameState.settings && gameState.settings.fontScale) || 100;
            document.documentElement.style.fontSize = pct + '%';
        }

        function loadSettingsPanel() {
            const settings = gameState.settings;
            document.getElementById('maxOfflineHours').value = settings.maxOfflineHours;
            document.getElementById('enableNotifications').checked = settings.enableNotifications;
            document.getElementById('fontScale').value = String(settings.fontScale || 100);
            document.getElementById('breakthroughFx').checked = settings.breakthroughFx !== false;
            document.getElementById('notificationSeconds').value = String(settings.notificationSeconds || 2);
            updateSettingDisplay('enableNotifications');
        }

        function getRealmName(index) {
            const realm = GAME_CONFIG.realms[index];
            return realm ? realm.name : `未知境界${index}`;
        }

        function isBattleAreaUnlocked(action) {
            const minRealm = action.areaData ? action.areaData.minLevel : 1;
            return gameState.player.realmIndex >= minRealm;
        }

        function getVisibleSkills() {
            const skills = ['cultivation', 'alchemy', 'forging', 'farming', 'mining', 'battle'];
            const realmIdx = gameState.player.realmIndex;
            if (realmIdx >= 9) skills.push('danhuo');
            if (realmIdx >= 13) skills.push('shenshi');
            if (realmIdx >= LAW_UNLOCK_REALM) skills.push('wudao');
            return skills.filter(name => gameState.skills[name]);
        }

        function renderMobileSkillBar() {
            const bar = document.getElementById('mobileSkillBar');
            if (!bar) return;
            const current = document.body.dataset.panel;
            bar.innerHTML = '';
            getVisibleSkills().forEach(skillName => {
                const skill = gameState.skills[skillName];
                const btn = document.createElement('button');
                btn.className = 'mobile-skill-btn' + (skillName === current ? ' active' : '');
                const info = getSkillExpInfo(skillName);
                btn.textContent = `${skill.icon} ${skill.name} Lv.${info.level} · ${Math.floor(info.percent)}%`;
                btn.title = `经验 ${info.exp} / ${info.need}，还差 ${info.remain} 升级`;
                btn.onclick = () => switchPanel(skillName);
                bar.appendChild(btn);
            });
            // 手机顶部栏最前面的「装备」入口（放在最前，免得被挤到横向滚动的看不见处）
            const eqBtn = document.createElement('button');
            eqBtn.className = 'mobile-skill-btn' + (current === 'equipment' ? ' active' : '');
            eqBtn.textContent = '🎽 装备';
            eqBtn.onclick = () => switchPanel('equipment');
            bar.insertBefore(eqBtn, bar.firstChild);
        }

        function syncMobileTab(panelName) {
            const tabName = panelName === 'equipment' ? 'inventory' : (['battle', 'shop', 'settings', 'inventory'].includes(panelName) ? panelName : 'cultivation');
            document.querySelectorAll('.mobile-tab-item').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.tab === tabName);
            });
        }

        function buildSkillTree() {
            renderMobileSkillBar();
            const tree = document.getElementById('skillTree');
            if (!tree) return;
            tree.innerHTML = '';

            getVisibleSkills().forEach(skillName => {
                const skill = gameState.skills[skillName];
                if (!skill) return;
                const item = document.createElement('div');
                item.className = 'skill-item';
                item.id = 'skill-' + skillName;
                item.onclick = () => switchPanel(skillName);

                const info = getSkillExpInfo(skillName);
                const level = info.level;
                item.title = `${skill.name} Lv.${level}：经验 ${info.exp} / ${info.need}，还差 ${info.remain} 升级`;

                item.innerHTML = `
                    <div class="skill-name">${skill.icon} ${skill.name}</div>
                    <div class="skill-level">Lv.${level}</div>
                `;
                item.style.position = 'relative';
                tree.appendChild(item);
            });
        }

        function updateSkillTree(activeSkill) {
            buildSkillTree();
            document.querySelectorAll('.skill-item').forEach(item => item.classList.remove('active'));
            const activeItem = document.getElementById('skill-' + activeSkill);
            if (activeItem) activeItem.classList.add('active');
        }

        // ===== P2: 配方卡片三态四信息系统 =====

        /**
         * 判断配方解锁状态
         * @returns { unlocked, reason, currentValue, requiredValue }
         */
        function getRecipeUnlockState(skillName, recipe) {
            if (skillName === 'cultivation') {
                const currentRealmIdx = gameState.player.realmIndex;
                const requiredRealmIdx = recipe.requiredRealmIndex || 0;
                const isUnlocked = currentRealmIdx >= requiredRealmIdx;
                return {
                    unlocked: isUnlocked,
                    reason: isUnlocked ? null : 'realm',
                    currentValue: currentRealmIdx,
                    requiredValue: requiredRealmIdx
                };
            } else {
                const skill = gameState.skills[skillName];
                const currentLevel = skill.level;
                const requiredLevel = recipe.requiredLevel || 1;
                const isUnlocked = currentLevel >= requiredLevel;
                return {
                    unlocked: isUnlocked,
                    reason: isUnlocked ? null : 'level',
                    currentValue: currentLevel,
                    requiredValue: requiredLevel
                };
            }
        }

        /**
         * 计算配方效率（产出/周期）
         */
        function calculateRecipeEfficiency(skillName, recipe, recipeKey = null) {
            // 用调整后的耗时（含装备 / 功法 / 精通等全部加成），让卡片上的效率与实际一致
            const duration = getAdjustedDuration(skillName, recipe.duration || 1, recipeKey) || 1;

            // 修炼：修为/秒
            if (recipe.output && recipe.output.cultivation) {
                return recipe.output.cultivation / duration;
            }

            // 其他技能：产出数量/秒
            if (recipe.output && recipe.output.items && recipe.output.items.length > 0) {
                return recipe.output.items[0].qty / duration;
            }

            return 0;
        }

        /**
         * 检查材料充足度
         */
        function checkMaterialAvailability(recipe) {
            if (!recipe.requires || Object.keys(recipe.requires).length === 0) {
                return [];
            }

            return Object.entries(recipe.requires).map(([itemId, required]) => {
                const item = GAME_CONFIG.items[itemId];
                const invItem = gameState.player.inventory.find(i => i.id === itemId);
                const owned = invItem ? invItem.qty : 0;
                return {
                    id: itemId,
                    name: item?.name || itemId,
                    icon: item?.icon || '❓',
                    required,
                    owned,
                    enough: owned >= required
                };
            });
        }

        /**
         * 格式化产出显示
         */
        function formatRecipeOutput(output) {
            const parts = [];

            if (output.cultivation) {
                parts.push(`✨ +${output.cultivation}修为`);
            }
            if (output.coins) {
                parts.push(`💎 +${output.coins}`);
            }
            if (output.exp) {
                parts.push(`+${output.exp}exp`);
            }
            if (output.items && output.items.length > 0) {
                output.items.forEach(item => {
                    const cfg = GAME_CONFIG.items[item.id];
                    if (cfg) {
                        parts.push(`→ ${cfg.icon}×${item.qty}`);
                    }
                });
            }

            return parts.join('  ');
        }

        /**
         * 格式化锁定提示
         */
        function formatRecipeLockHint(skillName, state) {
            if (!state.unlocked) {
                if (state.reason === 'realm') {
                    const requiredName = getRealmName(state.requiredValue);
                    const currentName = getRealmName(state.currentValue);
                    return `🔒 需要 ${requiredName}（当前：${currentName}）`;
                } else if (state.reason === 'level') {
                    return `🔒 需要 Lv.${state.requiredValue}（当前 Lv.${state.currentValue}）`;
                }
            }
            return '';
        }

        /**
         * 渲染单个配方卡片（新系统）
         */
        function renderRecipeCard(skillName, recipeKey, recipe) {
            const card = document.createElement('div');
            const isActive = gameState.currentAction &&
                            gameState.currentAction.skill === skillName &&
                            gameState.currentAction.action === recipeKey;

            // 1. 判断解锁状态
            const unlockState = getRecipeUnlockState(skillName, recipe);

            // 2. 计算效率
            const efficiency = calculateRecipeEfficiency(skillName, recipe, recipeKey);
            // 卡片显示实际耗时（含装备、功法、精通等加成）；与基础耗时不同时附上基础值
            const adjDur = getAdjustedDuration(skillName, recipe.duration, recipeKey);
            const fmt = v => parseFloat(v.toFixed(v < 10 ? 2 : 1));
            const timeText = Math.abs(adjDur - recipe.duration) > 0.005 ? `${fmt(adjDur)}s <small style="color:#888">基础 ${recipe.duration}s</small>` : `${recipe.duration}s`;

            // 3. 检查材料充足度
            const materials = checkMaterialAvailability(recipe);

            // 4. 判断类名
            let className = 'action-item';
            if (isActive) className += ' active';
            if (!unlockState.unlocked) className += ' disabled';
            if (materials.length > 0 && !materials.every(m => m.enough) && unlockState.unlocked) {
                className += ' recipe-materials-lack';
            }

            card.className = className;
            card.id = 'action-' + skillName + '-' + recipeKey;

            // 5. 构建 HTML
            let materialsHtml = '';
            if (materials.length > 0) {
                const matsStr = materials.map(m => `
                    <span class="${m.enough ? 'recipe-mat-enough' : 'recipe-mat-lack'}" title="${m.name}">
                        ${m.icon}×${m.required} (${m.owned})
                    </span>
                `).join('');
                materialsHtml = `<div class="recipe-materials">${matsStr}</div>`;
            }

            const lockHint = formatRecipeLockHint(skillName, unlockState);
            const lockHintHtml = lockHint ? `<div class="recipe-lock-hint">${lockHint}</div>` : '';
            // 无论是否解锁都显示等级/境界要求（已达成为绿色，未达成为橙色）
            const reqText = unlockState.reason === 'realm' || skillName === 'cultivation'
                ? `境界要求：${getRealmName(unlockState.requiredValue)}`
                : `等级要求：Lv.${unlockState.requiredValue}`;
            const reqHtml = `<div class="recipe-req ${unlockState.unlocked ? 'met' : 'unmet'}">${unlockState.unlocked ? '✓' : '✗'} ${reqText}</div>`;

            const outputStr = formatRecipeOutput(recipe.output || {});
            // 产出是装备时直接显示属性，方便对比
            const outEquip = ((recipe.output && recipe.output.items) || []).find(i => isEquipmentItem(i.id));
            const equipStatsHtml = outEquip
                ? `<div class="recipe-equip-stats" title="${GAME_CONFIG.items[outEquip.id].name}">${GAME_CONFIG.items[outEquip.id].icon} ${formatItemStats(outEquip.id)}</div>` : '';
            const efficiencyStr = efficiency > 0 ? `<div class="recipe-efficiency">效率: ${efficiency.toFixed(2)}/秒</div>` : '';

            // 配方精通（生活技能）：等级、进度条，悬停显示具体加成
            let masteryHtml = '';
            if (LIFE_SKILLS.includes(skillName) && unlockState.unlocked) {
                const m = getMasteryInfo(skillName, recipeKey);
                masteryHtml = `<div class="recipe-mastery" title="${describeMastery(skillName, recipeKey)}">
                    🎓 精通 <b>Lv.${m.level}</b>${m.maxed ? ' ✦满级' : ` · ${m.exp}/${m.need}`}
                    <div class="mastery-track"><div class="mastery-fill" style="width: ${m.percent}%"></div></div>
                    ${!m.maxed && getMasteryPoolInfo(skillName).exp > 0 ? `<button class="infuse-btn" onclick="event.stopPropagation(); infuseMastery('${skillName}', '${recipeKey}')" title="从精通池转入经验，直到升下一级（池减少，可能失去检查点加成）">灌注</button>` : ''}
                </div>`;
            }

            // 分身（元婴初期起）：把这个配方交给分身做
            let cloneHtml = '';
            if (LIFE_SKILLS.includes(skillName) && unlockState.unlocked && isCloneUnlocked()) {
                const cloneSlot = findCloneFor(skillName, recipeKey);
                const cloneHere = cloneSlot >= 0;
                if (cloneHere) className += ' clone-active';
                cloneHtml = cloneHere
                    ? `<button class="clone-btn on" onclick="event.stopPropagation(); stopClone(${cloneSlot})">🌀 分身${cloneSlot + 1}进行中 · 点击停止</button>`
                    : `<button class="clone-btn" onclick="event.stopPropagation(); assignClone('${skillName}', '${recipeKey}')">🌀 交给分身</button>`;
                card.className = className;
            }

            // 第二块灵田（商城购买后）：灵田配方可以种到第二块田
            if (skillName === 'farming' && unlockState.unlocked && isFarmPlotUnlocked()) {
                const fa = getFarmPlot().action;
                const plotHere = fa && fa.action === recipeKey;
                if (plotHere) className += ' clone-active';
                cloneHtml += plotHere
                    ? `<button class="clone-btn on" onclick="event.stopPropagation(); stopFarmPlot()">🌾 第二块田进行中 · 点击停止</button>`
                    : `<button class="clone-btn" onclick="event.stopPropagation(); assignFarmPlot('${recipeKey}')">🌾 种到第二块田</button>`;
                card.className = className;
            }

            card.innerHTML = `
                <div class="recipe-header">
                    <span class="recipe-icon">${unlockState.unlocked ? '🟢' : '⭕'}</span>
                    <span class="recipe-name">${recipe.name}</span>
                </div>
                <div class="recipe-time">⏱ ${timeText}</div>
                ${reqHtml}
                ${masteryHtml}
                ${cloneHtml}
                <div class="recipe-output">${outputStr}</div>
                ${equipStatsHtml}
                ${materialsHtml}
                ${efficiencyStr}
                ${lockHintHtml}
                <div class="action-progress-bar ${isActive ? 'active' : ''}">
                    <div class="action-progress-fill" style="width: 0%"></div>
                </div>
            `;

            // 6. 绑定事件
            if (unlockState.unlocked && materials.every(m => m.enough || materials.length === 0)) {
                card.style.cursor = 'pointer';
                card.onclick = () => selectAction(skillName, recipeKey);
            } else {
                card.style.cursor = 'not-allowed';
            }

            return card;
        }

        function generateRecipeList(skillName) {
            const skill = gameState.skills[skillName];
            if (!skill || !skill.recipes) return;

            const elementId = skillName + 'Actions';
            const actionList = document.getElementById(elementId);
            if (!actionList) return;

            actionList.innerHTML = '';

            Object.entries(skill.recipes).forEach(([key, recipe]) => {
                try {
                    const card = renderRecipeCard(skillName, key, recipe);
                    if (card) {
                        actionList.appendChild(card);
                    }
                } catch (e) {
                    console.error('[ERROR] Failed to render recipe card:', key, e);
                }
            });

            // 显示第一个配方的详情
            const firstRecipeKey = Object.keys(skill.recipes)[0];
            if (firstRecipeKey) {
                const detailDiv = document.getElementById('action-detail-' + skillName);
                if (detailDiv) {
                    detailDiv.classList.add('show');
                }
            }
        }

        // 战斗区域奖励说明：每场灵石 / 经验（含该区域精通加成）；战斗区域目前没有物品掉落
        function areaRewardHtml(areaKey, action) {
            const a = action.areaData;
            const bonus = 1 + getMasteryBonus('battle', areaKey).reward;
            const enemies = (BATTLE_ENEMY_CONFIGS[areaKey] || []).map(e => `${e.icon || ''}${e.name}`).join('、');
            return `<div class="area-reward">
                    <div>敌人：${enemies || '—'}</div>
                    <div>每场奖励：💎 ${Math.round(a.coins * bonus)} 灵石 · ${Math.round(a.exp * bonus)} 战斗经验${bonus > 1 ? '（含精通加成）' : ''}</div>
                    <div class="area-drops">掉落物：无（只获得灵石与经验）</div>
                </div>`;
        }

        // 秘境奖励说明：固定掉落、随机掉落（含概率）、灵石与经验
        function dungeonDropHtml(dungeon) {
            const name = id => (GAME_CONFIG.items[id] || {}).name || id;
            const qty = q => Array.isArray(q) ? (q[0] === q[1] ? q[0] : `${q[0]}–${q[1]}`) : q;
            const r = dungeon.rewards || {};
            const fixed = (r.fixed || []).map(d => `${name(d.id)}×${qty(d.qty)}（必掉）`);
            const random = (r.random || []).map(d => `${name(d.id)}×${qty(d.qty)}（${Math.round((d.probability || 1) * 100)}%）`);
            const coins = Array.isArray(r.coins) ? `${r.coins[0]}–${r.coins[1]} 灵石` : (r.coins ? `${r.coins} 灵石` : '');
            const list = fixed.concat(random);
            return `<div class="area-reward">
                    <div class="area-drops">通关掉落：${list.length ? list.join('、') : '无物品'}</div>
                    <div>另有：${coins}${r.skillExp ? ' · ' + r.skillExp + ' 战斗经验' : ''}（每只怪物还会掉灵石）</div>
                </div>`;
        }

        function generateBattleList() {
            const skill = gameState.skills.battle;
            const actionList = document.getElementById('battleActions');
            actionList.innerHTML = '';

            const spiritRootNames = {
                metal: '金灵根', wood: '木灵根', water: '水灵根', fire: '火灵根',
                earth: '土灵根', wind: '风灵根', thunder: '雷灵根', ice: '冰灵根'
            };

            // 克制预览条（P0功能）
            const counterPreview = document.getElementById('battleCounterPreview');
            const counterInfo = document.getElementById('counterInfo');
            if (counterPreview) {
                const playerRoot = gameState.player.spiritRoot;
                const playerRootName = spiritRootNames[playerRoot] || playerRoot;

                const counters = {
                    metal: { name: '金灵根', counters: '木灵根' },
                    wood: { name: '木灵根', counters: '土灵根' },
                    water: { name: '水灵根', counters: '火灵根' },
                    fire: { name: '火灵根', counters: '金灵根' },
                    earth: { name: '土灵根', counters: '水灵根' },
                    wind: { name: '风灵根', counters: '无克制' },
                    thunder: { name: '雷灵根', counters: '冰灵根' },
                    ice: { name: '冰灵根', counters: '雷灵根' }
                };

                const playerInfo = counters[playerRoot];
                // P3优化：增强克制信息显示，包含更详细的说明
                const counterHelpText = playerInfo.counters === '无克制'
                    ? `你的灵根: ${playerRootName} → 无克制关系<br/>✨ 特性：攻速 +10%, 闪避 +5%`
                    : `你的灵根: ${playerRootName}<br/>⭐ 克制 ${playerInfo.counters} → 伤害 ×1.3, 命中 ×1.25<br/>⚠️ 被克制时 → 伤害 ×0.8, 命中 ×0.75`;
                counterInfo.innerHTML = counterHelpText;
                counterPreview.style.display = 'block';
            }

            Object.entries(skill.actions).forEach(([key, action]) => {
                const div = document.createElement('div');
                const isActive = gameState.currentAction && gameState.currentAction.skill === 'battle' && gameState.currentAction.action === key;

                // 检查是否可用
                const isUnlocked = isBattleAreaUnlocked(action);
                const isDisabled = !isUnlocked;

                let className = 'action-item';
                if (isActive) className += ' active';
                if (isDisabled) className += ' disabled';

                div.className = className;
                div.id = 'action-battle-' + key;

                // 不可用提示
                let statusHint = '';
                if (isDisabled) {
                    statusHint = `<div style="color: #c4483a; font-size: 0.75em; margin-top: 5px;">🔒 需要${getRealmName(action.areaData.minLevel)}</div>`;
                }

                div.innerHTML = `
                    <div>
                        <div class="action-name">${action.name}</div>
                        <div class="action-desc">${action.desc}</div>
                        ${areaRewardHtml(key, action)}
                        <div class="recipe-req ${isDisabled ? 'unmet' : 'met'}">${isDisabled ? '✗' : '✓'} 境界要求：${getRealmName(action.areaData.minLevel)}</div>
                        ${isDisabled ? '' : (() => { const m = getMasteryInfo('battle', key); return `<div class="recipe-mastery" title="${describeMastery('battle', key)}">🎓 精通 <b>Lv.${m.level}</b>${m.maxed ? ' ✦满级' : ` · ${m.exp}/${m.need}`}<div class="mastery-track"><div class="mastery-fill" style="width: ${m.percent}%"></div></div></div>`; })()}
                        ${statusHint}
                    </div>
                    <div class="action-progress-bar ${isActive ? 'active' : ''}">
                        <div class="action-progress-fill" style="width: 0%"></div>
                    </div>
                `;

                if (!isDisabled) {
                    div.onclick = () => selectAction('battle', key);
                } else {
                    div.style.opacity = '0.5';
                    div.style.cursor = 'not-allowed';
                }
                actionList.appendChild(div);
            });
        }

        function selectAction(skill, action) {
            // 凡人无法参与战斗
            if (gameState.player.realmIndex === 0 && skill === 'battle') {
                showNotification('凡人无法参与战斗，请先突破到练气初期', '#c98a3e', 'warning');
                return;
            }

            // 检查是否已解锁
            const actionObj = getAction(skill, action);

            // 修炼配方有特殊的解锁逻辑（境界+功法）
            if (skill === 'cultivation') {
                if (!isCultivationRecipeUnlocked(action)) {
                    const realmReq = actionObj.requiredRealmIndex || 0;
                    const currentArt = CULTIVATION_ARTS[gameState.player.currentArt];

                    if (gameState.player.realmIndex < realmReq) {
                        showNotification(`🔒 需要境界: ${getRealmName(realmReq)}`, '#c98a3e', 'normal');
                    } else if (currentArt && !currentArt.unlockedRecipes.includes(action)) {
                        showNotification(`🔒 当前功法 ${currentArt.name} 不支持此配方`, '#c98a3e', 'normal');
                    }
                    return;
                }
            } else if (skill === 'battle') {
                // 战斗区域按境界解锁（与战斗列表的显示保持一致）
                if (!isBattleAreaUnlocked(actionObj)) {
                    showNotification(`🔒 ${actionObj.name}需要${getRealmName(actionObj.areaData.minLevel)}`, '#c98a3e', 'normal');
                    return;
                }
            } else if (skill === 'wudao') {
                // 悟道：化神初期起可参悟；法则到当前境界上限后不能继续
                if (gameState.player.realmIndex < LAW_UNLOCK_REALM) {
                    showNotification(`🔒 悟道需要${getRealmName(LAW_UNLOCK_REALM)}`, '#c98a3e', 'normal');
                    return;
                }
                if (getLawInfo(action).level >= lawLevelCap()) {
                    showNotification(`${LAW_EFFECTS[action].name}已至当前境界的领悟上限，突破后可继续`, '#c98a3e', 'normal');
                    return;
                }
            } else if (actionObj.requiredLevel) {
                // 其他技能使用等级检查
                const currentLevel = gameState.skills[skill].level;
                const isActuallyUnlocked = currentLevel >= actionObj.requiredLevel;

                if (!isActuallyUnlocked) {
                    showNotification(`🔒 ${actionObj.name}需要等级 ${actionObj.requiredLevel}（当前 ${currentLevel}）`, '#c98a3e', 'normal');
                    return;
                }
            }

            // 分身正在做的配方，主角不能重复做
            if (isCloneUnlocked() && findCloneFor(skill, action) >= 0) {
                showNotification('分身正在做这个配方，主角不能重复（请让分身停下或选别的配方）', '#c98a3e');
                return;
            }

            if (gameState.currentAction) {
                stopAction();
            }

            // 检查材料（P2功能 - 材料检查）
            if (actionObj.requires) {
                for (const [itemId, requiredQty] of Object.entries(actionObj.requires)) {
                    const inventoryItem = gameState.player.inventory.find(i => i.id === itemId);
                    const actualQty = inventoryItem ? inventoryItem.qty : 0;
                    if (actualQty < requiredQty) {
                        const itemConfig = GAME_CONFIG.items[itemId];
                        showNotification(`${itemConfig.name}不足（需要${requiredQty}，有${actualQty}）`, '#c4483a', 'error');
                        return;
                    }
                }
            }

            // 普通战斗启用实时战斗UI
            if (skill === 'battle') {
                enterBattleArea(action);
                return;
            }

            gameState.currentAction = { skill, action };
            gameState.currentActionProgress = 0;

            // 更新所有action-item的active状态
            document.querySelectorAll('.action-item').forEach(item => {
                item.classList.remove('active');
                const progressBar = item.querySelector('.action-progress-bar');
                if (progressBar) progressBar.classList.remove('active');
            });

            // 激活当前选中的action-item
            const activeItem = document.getElementById('action-' + skill + '-' + action);
            if (activeItem) {
                activeItem.classList.add('active');
                const progressBar = activeItem.querySelector('.action-progress-bar');
                if (progressBar) progressBar.classList.add('active');
            }

            // 更新UI显示
            document.getElementById('activeActionDisplay').textContent = actionObj.name;
            document.getElementById('stopBtn').style.display = 'block';

            updateUI();
        }

        function stopAction() {
            // 如果是普通战斗，隐藏战斗UI
            if (gameState.currentAction && gameState.currentAction.isBattle) {
                const battleContainer = document.getElementById('battleContainer');
                if (battleContainer) {
                    battleContainer.classList.add('hidden');
                }
                gameState.battles = null;
            }

            gameState.currentAction = null;
            gameState.currentActionProgress = 0;
            document.getElementById('stopBtn').style.display = 'none';

            // 隐藏所有进度条
            document.querySelectorAll('.action-progress-bar').forEach(bar => {
                bar.classList.remove('active');
            });
            document.querySelectorAll('.action-item').forEach(item => {
                item.classList.remove('active');
            });

            updateUI();
        }

        function getAction(skill, action) {
            const skillObj = gameState.skills[skill];
            // 优先级：recipes > actions > dungeons
            if (skillObj.recipes) {
                return skillObj.recipes[action];
            }
            if (skillObj.actions && skillObj.actions[action]) {
                return skillObj.actions[action];
            }
            if (skillObj.dungeons && skillObj.dungeons[action]) {
                return skillObj.dungeons[action];
            }
            return null;
        }

        function addToInventory(itemId, qty = 1) {
            // 检查背包容量
            const inventoryCount = gameState.player.inventory.length;
            const maxCapacity = gameState.player.inventoryCapacity || 50;
            const itemName = GAME_CONFIG.items[itemId]?.name || itemId;

            const existing = gameState.player.inventory.find(i => i.id === itemId);
            if (existing) {
                existing.qty += qty;
                // 检查是否接近满载
                if (inventoryCount >= maxCapacity * 0.9) {
                    showNotification(`⚠️ 背包即将满满！(${inventoryCount}/${maxCapacity}) 建议购买背包扩展`, '#c98a3e', 'warning');
                }
            } else {
                // 检查是否有空间添加新物品
                if (inventoryCount >= maxCapacity) {
                    showNotification(`❌ 背包已满无法获取 ${itemName}！请扩展背包容量`, '#c4483a', 'error');
                    return false; // 返回false表示失败
                }
                gameState.player.inventory.push({ id: itemId, qty });
                // 检查是否接近满载
                if (inventoryCount + 1 >= maxCapacity * 0.8) {
                    showNotification(`⚠️ 背包容量即将满满！(${inventoryCount + 1}/${maxCapacity})`, '#c98a3e', 'warning');
                }
            }
            return true; // 返回true表示成功
        }

        // ==================== 物品交互系统（P1功能）====================
        function showItemDetail(itemId, qty) {
            const itemConfig = GAME_CONFIG.items[itemId];
            if (!itemConfig) return;

            // 填充物品信息
            document.getElementById('itemIcon').textContent = itemConfig.icon;
            document.getElementById('itemName').textContent = itemConfig.name;
            document.getElementById('itemType').textContent = itemConfig.type;
            document.getElementById('itemQty').textContent = qty;

            // 获取物品用途（根据物品类型和配方）
            let usageText = '暂无已知用途';
            const usages = [];

            // 检查所有技能的配方中是否使用了此物品
            Object.entries(gameState.skills).forEach(([skillName, skill]) => {
                if (skill.recipes) {
                    Object.entries(skill.recipes).forEach(([recipeKey, recipe]) => {
                        // 简单的用途提示：如果这个物品是产出，显示来源；如果是消耗品，显示用途
                        if (recipe.output && recipe.output.items) {
                            recipe.output.items.forEach(outputItem => {
                                if (outputItem.id === itemId) {
                                    usages.push(`可从${skill.name}的【${recipe.name}】获得`);
                                }
                            });
                        }
                    });
                }
            });

            // P3优化：扩展的物品用途说明
            const specialUsages = {
                // 丹药
                pill: '突破修为必备丹药，用于大境界突破',
                xujidan: '虚极丹：增强突破成功率，大阶段突破必需',
                yingyangdan: '阴阳丹：平衡属性，提升修炼效率',
                shenqidan: '神器丹：提升灵根资质，增加所有属性',

                // 灵田产出
                millet: '灵米：灵田产出，炼丹的重要材料',
                cleangrass: '清灵草：灵田主要产出，炼丹必需材料',
                peach_branch: '桃木枝：灵田稀有产出，炼器高级材料',

                // 采矿产出
                stone: '灵石碎片：采矿基础产出，炼器基础材料',
                ironore: '灵铁矿：采矿中级产出，炼器中级材料',
                spiritore: '灵精矿：采矿高级产出，炼器高级材料',
                crystal: '灵晶：采矿顶级产出，炼器最高级材料',

                // 其他物品
                shenshi_map: '神识地图：使用后，下一次通关秘境的随机掉落率 +30%',
                tempered_essence: '淬炼精华：使用后所有装备属性 +10%，最多叠加3次',
                danhuo: '丹火：可炼制金丹秘药、淬炼装备，或出售换取灵石',
                shenshi: '神识：可炼制元婴丹、探查秘境，或出售换取灵石'
            };

            if (specialUsages[itemId]) {
                usages.unshift(specialUsages[itemId]);
            }
            if (isEquipmentItem(itemId)) {
                usages.unshift(`<b style="color:#7fae9a">装备属性：${formatItemStats(itemId) || '无'}</b>`);
            }
            if (itemConfig.effect && itemConfig.effect.workSpeed) {
                usages.unshift(`装备后工作速度 +${Math.round((1 / itemConfig.effect.workSpeed - 1) * 100)}%（生活技能与悟道耗时 -${Math.round((1 - itemConfig.effect.workSpeed) * 100)}%）`);
            }
            if (FOOD_CONFIG.foods[itemId]) {
                const food = FOOD_CONFIG.foods[itemId];
                usages.unshift(`恢复${food.hpRestore}点生命 · 冷却${food.cooldown}秒 · 需要${getRealmName(food.minRealm)}`);
            }

            if (!itemConfig.sellPrice) {
                usages.push(itemConfig.type === 'breakthrough_material' ? '突破丹药不能出售（大境界突破必需）' : '此物品不可出售');
            }

            if (usages.length > 0) {
                usageText = usages.join('<br/>');
            }

            // 装备对比：武器 / 护甲显示换上后的属性变化
            let comparisonHTML = '';
            if (itemConfig.stats && (itemConfig.type === 'weapon' || itemConfig.type === 'armor')) {
                comparisonHTML = '<div style="margin-top: 10px; padding: 10px; background: rgba(111,156,138,0.1); border-radius: 5px;"><strong>与当前装备对比：</strong><br/>' + describeEquipDiff(itemId) + '</div>';
            }

            // P3优化：添加物品类别说明
            const categoryExplanations = {
                consumable: '💊 消耗品：一次性使用，在特定情况下消耗（如丹药用于突破）',
                material: '🧪 材料：用于制作、合成或升级其他物品的基础材料',
                ore: '⛏️ 矿物：采矿得到的矿物，用于炼器合成',
                food: '🍲 战斗食物：设为战斗食物后，战斗中生命低于50%时自动食用恢复生命（死亡会损失一半食物）',
                armor: '🛡️ 护甲：穿戴后提升防御和生命，只能同时穿戴一件',
                weapon: '⚔️ 武器装备：穿戴后提升攻击力和其他属性',
                jewelry: '✨ 首饰：穿戴后提升防御、血量等防御属性',
                upgrade: '🔧 永久升级：一次性升级，永久提升游戏能力（无法重复购买）'
            };

            const itemUsageEl = document.getElementById('itemUsage');
            if (itemUsageEl) {
                let categoryHint = categoryExplanations[itemConfig.type] || '';
                if (categoryHint) {
                    categoryHint = '<div style="margin-bottom: 10px; padding: 8px; background: rgba(100,100,100,0.2); border-radius: 3px; font-size: 0.85em; color: #b89a5b;">' + categoryHint + '</div>';
                }
                itemUsageEl.innerHTML = categoryHint + usageText + comparisonHTML;
            }

            // 处理装备按钮显示（P2功能：equipping/unequipping）
            const actionBtn = document.getElementById('itemActionBtn');
            if (actionBtn) {
                if (itemConfig.type === 'weapon' || itemConfig.type === 'armor' || itemConfig.type === 'jewelry') {
                    actionBtn.textContent = '装备';
                    actionBtn.style.display = 'block';
                    actionBtn.dataset.itemId = itemId;
                    actionBtn.dataset.itemType = itemConfig.type;
                } else if (itemConfig.type === 'food') {
                    actionBtn.textContent = gameState.player.foodSlot === itemId ? '当前战斗食物' : '设为战斗食物';
                    actionBtn.style.display = 'block';
                    actionBtn.dataset.itemId = itemId;
                    actionBtn.dataset.itemType = 'food';
                } else if (itemId === 'tempered_essence') {
                    actionBtn.textContent = `淬炼装备 (${gameState.player.temperLevel || 0}/3)`;
                    actionBtn.style.display = 'block';
                    actionBtn.dataset.itemId = itemId;
                    actionBtn.dataset.itemType = 'use';
                } else if (itemId === 'shenshi_map') {
                    actionBtn.textContent = gameState.player.scoutBonus ? '已生效' : '使用';
                    actionBtn.style.display = 'block';
                    actionBtn.dataset.itemId = itemId;
                    actionBtn.dataset.itemType = 'use';
                } else {
                    actionBtn.style.display = 'none';
                }
            }

            const sellBtn = document.getElementById('itemSellBtn');
            const sellAllBtn = document.getElementById('itemSellAllBtn');
            const qtyRow = document.getElementById('itemSellQtyRow');
            if (sellBtn && sellAllBtn) {
                const sellable = getSellableQty(itemId);
                if (itemConfig.sellPrice && sellable > 0) {
                    const input = document.getElementById('itemSellQty');
                    input.max = sellable;
                    input.value = 1;
                    input.dataset.itemId = itemId;
                    if (qtyRow) qtyRow.style.display = sellable > 1 ? 'flex' : 'none';
                    sellBtn.dataset.itemId = itemId;
                    sellBtn.style.display = 'block';
                    sellAllBtn.textContent = `全部出售 (+${itemConfig.sellPrice * sellable})`;
                    sellAllBtn.dataset.itemId = itemId;
                    sellAllBtn.style.display = sellable > 1 ? 'block' : 'none';
                    updateSellQtyLabel();
                } else {
                    if (qtyRow) qtyRow.style.display = 'none';
                    sellBtn.style.display = 'none';
                    sellAllBtn.style.display = 'none';
                }
            }

            // 显示模态框
            const modalEl = document.getElementById('itemDetailModal');
            if (modalEl) {
                modalEl.style.display = 'flex';
            }
        }

        function consumeItem(itemId, qty) {
            const idx = gameState.player.inventory.findIndex(i => i.id === itemId);
            if (idx === -1 || gameState.player.inventory[idx].qty < qty) return false;
            gameState.player.inventory[idx].qty -= qty;
            if (gameState.player.inventory[idx].qty <= 0) gameState.player.inventory.splice(idx, 1);
            return true;
        }

        // 可出售数量：装备中的物品要留下1件
        function getSellableQty(itemId) {
            const inv = gameState.player.inventory.find(i => i.id === itemId);
            return inv ? inv.qty : 0;   // 装备与背包已分开，已装备的不在背包里
        }

        // 出售数量选择：+ / − / 最大 / 直接输入，按钮文字实时显示数量和收入
        function changeSellQty(delta) {
            const input = document.getElementById('itemSellQty');
            const max = parseInt(input.max, 10) || 1;
            const cur = parseInt(input.value, 10) || 1;
            input.value = delta === 'max' ? max : Math.max(1, Math.min(max, cur + delta));
            updateSellQtyLabel();
        }

        function updateSellQtyLabel() {
            const input = document.getElementById('itemSellQty');
            const sellBtn = document.getElementById('itemSellBtn');
            const cfg = GAME_CONFIG.items[input.dataset.itemId];
            if (!cfg || !sellBtn) return;
            const max = parseInt(input.max, 10) || 1;
            let q = parseInt(input.value, 10) || 1;
            q = Math.max(1, Math.min(max, q));
            sellBtn.textContent = `出售${q}个 (+${cfg.sellPrice * q})`;
        }

        function sellItem(all) {
            const itemId = document.getElementById(all ? 'itemSellAllBtn' : 'itemSellBtn').dataset.itemId;
            const itemConfig = GAME_CONFIG.items[itemId];
            if (!itemConfig || !itemConfig.sellPrice) return;
            const sellable = getSellableQty(itemId);
            const qty = all ? sellable : Math.max(1, Math.min(sellable, parseInt(document.getElementById('itemSellQty').value, 10) || 1));
            if (qty <= 0 || !consumeItem(itemId, qty)) return;
            const gain = itemConfig.sellPrice * qty;
            gameState.player.coins += gain;
            showNotification(`出售${itemConfig.name}×${qty} +${gain}灵石`, '#6f9c8a');
            updateUI();
            saveGame();
            const remaining = gameState.player.inventory.find(i => i.id === itemId);
            if (remaining) {
                showItemDetail(itemId, remaining.qty);
            } else {
                closeItemDetail();
            }
        }

        // ==================== 装备系统 ====================
        // 装备栏与背包分开：装备 = 把物品从背包挪到装备栏，卸下 = 放回背包，换装备时旧的自动回背包。
        // 武器、护甲各 1 件；饰品初始 1 个栏位，商城购买「第二饰品栏位」（金丹初期起）后有 2 个，同名饰品不能重复佩戴。
        const STAT_LABELS = { hp: '生命', atk: '攻击', def: '防御', spd: '速度' };
        const EQUIP_TYPES = ['weapon', 'armor', 'jewelry'];
        const EQUIP_TYPE_NAMES = { weapon: '武器', armor: '护甲', jewelry: '饰品' };

        function isEquipmentItem(itemId) {
            const cfg = GAME_CONFIG.items[itemId];
            return !!cfg && EQUIP_TYPES.includes(cfg.type);
        }

        // 装备属性文字，如「攻击+40 · 生命+30」，带特殊效果（如灵玉的工作速度）
        function formatItemStats(itemId) {
            const cfg = GAME_CONFIG.items[itemId];
            if (!cfg) return '';
            const parts = [];
            if (cfg.stats) Object.entries(cfg.stats).forEach(([k, v]) => parts.push(`${STAT_LABELS[k] || k}+${v}`));
            if (cfg.effect && cfg.effect.workSpeed) parts.push(`工作速度 +${Math.round((1 / cfg.effect.workSpeed - 1) * 100)}%`);
            return parts.join(' · ');
        }

        function getJewelrySlots() {
            return 1 + ((gameState.player.boughtUpgrades || []).includes('jewelry_slot2') ? 1 : 0);
        }

        function equipAfterChange() {
            calculateStats();
            updateUI();
            saveGame();
            renderEquipmentPanel();
        }

        // 从背包装备（武器 / 护甲：替换并把旧的放回背包；饰品：需要有空栏位）
        function equipFromBag(itemId) {
            const cfg = GAME_CONFIG.items[itemId];
            if (!cfg || !EQUIP_TYPES.includes(cfg.type)) return false;
            const inv = gameState.player.inventory.find(i => i.id === itemId);
            if (!inv || inv.qty < 1) { showNotification('背包里没有这件装备', '#c98a3e'); return false; }
            const eq = gameState.player.equipment;
            if (cfg.type === 'jewelry') {
                if ((eq.jewelry || []).includes(itemId)) { showNotification('已经佩戴同名饰品，不能重复', '#c98a3e'); return false; }
                if ((eq.jewelry || []).length >= getJewelrySlots()) {
                    showNotification(getJewelrySlots() < 2 ? '饰品栏位已满，请先卸下（第二饰品栏位可在商城购买）' : '饰品栏位已满，请先卸下一件', '#c98a3e');
                    return false;
                }
                consumeItem(itemId, 1);
                eq.jewelry.push(itemId);
            } else {
                const old = eq[cfg.type];
                consumeItem(itemId, 1);
                eq[cfg.type] = itemId;
                if (old && !addToInventory(old)) {
                    // 背包放不下旧装备：回滚
                    eq[cfg.type] = old;
                    addToInventory(itemId, 1);
                    return false;
                }
            }
            showNotification(`已装备${cfg.name}`, '#6f9c8a');
            equipAfterChange();
            return true;
        }

        // 卸下装备放回背包（背包满则失败）
        function unequipItem(kind, itemId) {
            const eq = gameState.player.equipment;
            const cfg = GAME_CONFIG.items[itemId];
            if (!cfg) return false;
            if (kind === 'jewelry' ? !(eq.jewelry || []).includes(itemId) : eq[kind] !== itemId) return false;
            if (!addToInventory(itemId, 1)) return false;
            if (kind === 'jewelry') eq.jewelry = eq.jewelry.filter(id => id !== itemId);
            else eq[kind] = null;
            showNotification(`已卸下${cfg.name}`, '#6f9c8a');
            equipAfterChange();
            return true;
        }

        // 换上 candidate 相对当前同槽装备的属性变化（武器 / 护甲），返回带颜色的 HTML；饰品直接显示属性
        function describeEquipDiff(itemId) {
            const cfg = GAME_CONFIG.items[itemId];
            const eq = gameState.player.equipment;
            if (cfg.type === 'jewelry') return '';
            const cur = GAME_CONFIG.items[eq[cfg.type]]?.stats || {};
            const keys = new Set([...Object.keys(cfg.stats || {}), ...Object.keys(cur)]);
            const out = [];
            keys.forEach(k => {
                const d = ((cfg.stats || {})[k] || 0) - (cur[k] || 0);
                if (d) out.push(`<span style="color:${d > 0 ? '#7fae9a' : '#c4483a'}">${STAT_LABELS[k] || k}${d > 0 ? '+' : ''}${d}</span>`);
            });
            return out.length ? `（换上后 ${out.join(' ')}）` : '（属性相同）';
        }

        // 装备界面：三类装备栏 + 总属性 + 背包里可换的装备
        function renderEquipmentPanel() {
            const box = document.getElementById('equipmentContent');
            if (!box) return;
            const eq = gameState.player.equipment;
            const stats = gameState.player.stats;
            const slotCard = (kind, itemId, label) => {
                if (!itemId) return `<div class="equip-slot empty"><div class="equip-slot-label">${label}</div><div class="equip-slot-empty">— 空 —</div></div>`;
                const cfg = GAME_CONFIG.items[itemId];
                return `<div class="equip-slot"><div class="equip-slot-label">${label}</div>
                    <div class="equip-slot-name">${cfg.icon} ${cfg.name}</div>
                    <div class="equip-slot-stats">${formatItemStats(itemId) || '无属性'}</div>
                    <button class="btn btn-secondary equip-btn" onclick="unequipItem('${kind}', '${itemId}')">卸下</button></div>`;
            };
            let slots = slotCard('weapon', eq.weapon, '⚔️ 武器') + slotCard('armor', eq.armor, '🛡️ 护甲');
            const jSlots = getJewelrySlots();
            for (let i = 0; i < jSlots; i++) slots += slotCard('jewelry', (eq.jewelry || [])[i], `📿 饰品${jSlots > 1 ? i + 1 : ''}`);
            if (jSlots < 2) {
                const canBuy = gameState.player.realmIndex >= 9;
                slots += `<div class="equip-slot locked"><div class="equip-slot-label">📿 饰品2</div>
                    <div class="equip-slot-empty">🔒 第二饰品栏位</div>
                    <div class="equip-slot-stats">${canBuy ? '可在商城购买（8000灵石）' : '金丹初期后可在商城购买'}</div>
                    ${canBuy ? `<button class="btn btn-secondary equip-btn" onclick="switchPanel('shop')">去商城</button>` : ''}</div>`;
            }
            const temper = gameState.player.temperLevel || 0;
            const forgeBonus = parseFloat(((SKILL_LEVEL_EFFECTS.forging.formula((gameState.skills.forging || {}).level || 1) - 1) * 100).toFixed(1));
            const summary = `<div class="equip-summary">
                <span>❤️ 生命 ${stats.hp.max}</span><span>⚔️ 攻击 ${stats.atk}</span><span>🛡️ 防御 ${stats.def}</span><span>💨 速度 ${stats.spd}</span>
                <div class="equip-summary-sub">装备加成：淬炼 ${temper}/3（装备属性 +${temper * 10}%）${forgeBonus > 0 ? ` · 炼器等级（装备属性 +${forgeBonus}%）` : ''}</div></div>`;
            // 背包里的装备
            const bagItems = gameState.player.inventory.filter(i => isEquipmentItem(i.id));
            let bag = '';
            EQUIP_TYPES.forEach(type => {
                const list = bagItems.filter(i => GAME_CONFIG.items[i.id].type === type);
                if (!list.length) return;
                bag += `<div class="equip-bag-title">${EQUIP_TYPE_NAMES[type]}（背包中）</div>` + list.map(i => {
                    const cfg = GAME_CONFIG.items[i.id];
                    return `<div class="equip-bag-row"><span class="equip-bag-name">${cfg.icon} ${cfg.name}${i.qty > 1 ? ' ×' + i.qty : ''}</span>
                        <span class="equip-bag-stats">${formatItemStats(i.id)} ${describeEquipDiff(i.id)}</span>
                        <button class="btn equip-btn" onclick="equipFromBag('${i.id}')">装备</button></div>`;
                }).join('');
            });
            box.innerHTML = `<div class="equip-slots">${slots}</div>${summary}${bag || '<div class="equip-empty-hint">背包里没有可更换的装备（炼器可以打造，商城也有出售）</div>'}`;
        }

        // 旧存档迁移：装备曾同时保留在背包里，现在装备栏与背包分开。每件已装备的物品从背包扣掉 1 件；
        // 已戴 ≥2 件饰品的老玩家自动送第二饰品栏位，超过 2 件的放回背包。
        function migrateEquipmentSlots() {
            if (gameState.equipSlotsV2 || !gameState.player) return;
            const eq = gameState.player.equipment || (gameState.player.equipment = { weapon: null, armor: null, jewelry: [] });
            if (!eq.jewelry) eq.jewelry = [];
            const inv = gameState.player.inventory;
            [eq.weapon, eq.armor, ...eq.jewelry].filter(Boolean).forEach(id => {
                const it = inv.find(i => i.id === id);
                if (it) { it.qty -= 1; if (it.qty <= 0) inv.splice(inv.indexOf(it), 1); }
            });
            if (!gameState.player.boughtUpgrades) gameState.player.boughtUpgrades = [];
            if (eq.jewelry.length >= 2 && !gameState.player.boughtUpgrades.includes('jewelry_slot2')) gameState.player.boughtUpgrades.push('jewelry_slot2');
            while (eq.jewelry.length > getJewelrySlots()) {
                const id = eq.jewelry.pop();
                const it = inv.find(i => i.id === id);
                if (it) it.qty += 1; else inv.push({ id, qty: 1 });
            }
            gameState.equipSlotsV2 = true;
        }

        function isItemEquipped(itemId) {
            const cfg = GAME_CONFIG.items[itemId];
            const eq = gameState.player.equipment;
            if (!cfg) return false;
            if (cfg.type === 'weapon') return eq.weapon === itemId;
            if (cfg.type === 'armor') return eq.armor === itemId;
            if (cfg.type === 'jewelry') return (eq.jewelry || []).includes(itemId);
            return false;
        }

        function closeItemDetail() {
            document.getElementById('itemDetailModal').style.display = 'none';
        }

        function performItemAction() {
            const btn = document.getElementById('itemActionBtn');
            const itemId = btn.dataset.itemId;
            const itemType = btn.dataset.itemType;

            if (!itemId || !itemType) {
                closeItemDetail();
                return;
            }

            const itemConfig = GAME_CONFIG.items[itemId];
            if (!itemConfig) return;

            if (itemType === 'food') {
                const foodConfig = FOOD_CONFIG.foods[itemId];
                if (!foodConfig) return;
                if (gameState.player.realmIndex < foodConfig.minRealm) {
                    showNotification(`${itemConfig.name}需要${getRealmName(foodConfig.minRealm)}才能食用`, '#c98a3e');
                    return;
                }
                gameState.player.foodSlot = itemId;
                showNotification(`已设为战斗食物：${itemConfig.name}（生命低于50%时自动食用）`, '#6f9c8a');
                updateFoodBar();
                closeItemDetail();
                saveGame();
                return;
            }

            if (itemType === 'use') {
                if (itemId === 'tempered_essence') {
                    if ((gameState.player.temperLevel || 0) >= 3) {
                        showNotification('装备已淬炼至最高3次', '#c98a3e');
                        return;
                    }
                    if (!consumeItem(itemId, 1)) return;
                    gameState.player.temperLevel = (gameState.player.temperLevel || 0) + 1;
                    showNotification(`🔥 淬炼成功！装备属性 +${gameState.player.temperLevel * 10}%`, '#6f9c8a');
                } else if (itemId === 'shenshi_map') {
                    if (gameState.player.scoutBonus) {
                        showNotification('神识地图效果已生效，通关下一个秘境后消耗', '#c98a3e');
                        return;
                    }
                    if (!consumeItem(itemId, 1)) return;
                    gameState.player.scoutBonus = true;
                    showNotification('🗺️ 下次秘境掉落率 +30%', '#6f9c8a');
                }
                calculateStats();
                updateUI();
                closeItemDetail();
                saveGame();
                return;
            }

            // 装备与背包分开：从背包装备（旧的自动回背包）；卸下在「装备」界面进行
            equipFromBag(itemId);
            closeItemDetail();
        }

        function initializeBattleActions() {
            const battleAreas = {
                forest: { name: '森林', desc: '野兽出没', minLevel: 1, maxLevel: 2, enemies: ['wolf', 'boar'], coins: 50, exp: 20 },
                mountain: { name: '十万大山外围', desc: '危险地带', minLevel: 3, maxLevel: 4, enemies: ['tiger', 'bear'], coins: 100, exp: 50 },
                deepMountain: { name: '十万大山核心', desc: '极度危险', minLevel: 5, maxLevel: 6, enemies: ['demon', 'spirit'], coins: 200, exp: 100 },
                swamp: { name: '妖兽沼泽', desc: '诡异危险', minLevel: 5, maxLevel: 6, enemies: ['poisonBeast', 'serpent'], coins: 180, exp: 90 },
                abyss: { name: '魔窟深渊', desc: '极端危险', minLevel: 7, maxLevel: 8, enemies: ['demon-lord', 'abyssal'], coins: 300, exp: 150 },
                // P6 金丹期新增
                goldenPlains: { name: '金丹平原', desc: '金丹修士的猎场', minLevel: 9, maxLevel: 10, enemies: ['golden-beast', 'spirit-wolf'], coins: 500, exp: 200 },
                tribulationGround: { name: '天劫之地', desc: '雷劫试炼', minLevel: 10, maxLevel: 11, enemies: ['thunder-demon', 'tribulation-spirit'], coins: 800, exp: 350 },
                // P7 元婴期新增
                voidSea: { name: '虚空之海', desc: '元婴修士的试炼场', minLevel: 13, maxLevel: 14, enemies: ['void-creature', 'soul-devourer'], coins: 1000, exp: 400 },
                abyssRuins: { name: '深渊遗迹', desc: '极端危险的废墟', minLevel: 15, maxLevel: 16, enemies: ['abyss-lord', 'ancient-god'], coins: 2000, exp: 800 },
                // P9 化神期新增
                chaosWastes: { name: '混沌荒原', desc: '化神修士的试炼场', minLevel: 17, maxLevel: 18, enemies: ['chaos-beast', 'void-walker'], coins: 4000, exp: 1600 },
                nineNether: { name: '九幽冥渊', desc: '幽冥深处的绝地', minLevel: 19, maxLevel: 20, enemies: ['nether-lord', 'ghost-emperor'], coins: 8000, exp: 3200 }
            };

            const actions = {};
            Object.entries(battleAreas).forEach(([key, area]) => {
                actions[key] = {
                    name: area.name,
                    desc: area.desc,
                    duration: 0,
                    output: { coins: area.coins, exp: area.exp },
                    areaData: area,
                    requiredLevel: area.minLevel,
                    isBattle: true,
                    enemies: area.enemies
                };
            });

            gameState.skills.battle.actions = actions;
        }

        // 初始化秘境
        function initializeDungeons() {
            const dungeonList = Object.keys(GAME_CONFIG.dungeons);
            const dungeonActions = {};

            dungeonList.forEach(dungeonId => {
                const dungeon = GAME_CONFIG.dungeons[dungeonId];
                dungeonActions[dungeonId] = {
                    name: dungeon.name,
                    desc: dungeon.desc,
                    icon: dungeon.icon,
                    duration: 0,  // 秘境持续时间由战斗逻辑决定
                    minCultivation: dungeon.minCultivation,
                    output: {
                        coins: dungeon.rewards.coins,
                        seeds: true,
                        skillExp: dungeon.rewards.skillExp
                    },
                    requiredLevel: Math.ceil(dungeon.minCultivation / 100)
                };
            });

            gameState.skills.battle.dungeons = dungeonActions;
        }

        // 切换战斗/秘境标签页
        function switchBattleTab(tab) {
            renderAutoBattleBar();
            const areaBtn = document.getElementById('battleTab-areas');
            const dungeonBtn = document.getElementById('battleTab-dungeons');
            const areaContent = document.getElementById('battleContent-areas');
            const dungeonContent = document.getElementById('battleContent-dungeons');

            if (tab === 'areas') {
                areaBtn.style.color = '#c2a25f';
                areaBtn.style.borderBottomColor = '#c2a25f';
                dungeonBtn.style.color = '#666';
                dungeonBtn.style.borderBottomColor = 'transparent';
                areaContent.style.display = 'block';
                dungeonContent.style.display = 'none';
            } else {
                areaBtn.style.color = '#666';
                areaBtn.style.borderBottomColor = 'transparent';
                dungeonBtn.style.color = '#c2a25f';
                dungeonBtn.style.borderBottomColor = '#c2a25f';
                areaContent.style.display = 'none';
                dungeonContent.style.display = 'block';
                updateDungeonDisplay();
            }
        }

        // 更新秘境显示
        function updateDungeonDisplay() {
            const container = document.getElementById('dungeonActions');
            container.innerHTML = '';

            const dungeonIds = Object.keys(GAME_CONFIG.dungeons);

            dungeonIds.forEach(dungeonId => {
                const dungeon = GAME_CONFIG.dungeons[dungeonId];
                const record = gameState.dungeons[dungeonId];

                // 检查是否满足境界要求（仅基于最低境界索引）
                const meetsRequirement = gameState.player.realmIndex >= dungeon.minRealmIndex;
                const statusColor = record.completed ? '#6f9c8a' : meetsRequirement ? '#c2a25f' : '#666';
                const statusText = record.completed ? '✓ 已通关' : meetsRequirement ? '✓ 可进入' : '⛔ 境界不足';

                const requiredRealmName = getRealmName(dungeon.minRealmIndex);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'action-row';
                actionDiv.style.opacity = meetsRequirement ? '1' : '0.5';
                actionDiv.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="enterDungeon('${dungeonId}')">
                        <span style="font-size: 24px;">${dungeon.icon}</span>
                        <div style="flex: 1;">
                            <div style="font-weight: bold; color: #c2a25f;">${dungeon.name}</div>
                            <div style="font-size: 0.85em; color: #aaa;">${dungeon.desc}</div>
                            <div style="font-size: 0.75em; color: ${statusColor}; margin-top: 4px;">${statusText} · 入口：${requiredRealmName}</div>
                            ${dungeonDropHtml(dungeon)}
                        </div>
                    </div>
                `;
                actionDiv.onclick = () => {
                    if (meetsRequirement) {
                        enterDungeon(dungeonId);
                    } else {
                        showNotification(`需要达到 ${requiredRealmName} 才能进入`, '#c4483a', 'error');
                    }
                };
                container.appendChild(actionDiv);
            });
        }

        // 进入普通战斗区域（扩展P1-1 UI到所有5个区域）
        // 各战斗区域的敌人模板（按区域难度）；实际血量 / 攻击再乘 P4_AREA_SCALE
        const BATTLE_ENEMY_CONFIGS = {
                forest: [
                    { name: '野狼', hp: 25, atk: 8, def: 2, spd: 45, icon: '🐺' },
                    { name: '野猪', hp: 35, atk: 10, def: 4, spd: 35, icon: '🐗' }
                ],
                mountain: [
                    { name: '虎妖', hp: 50, atk: 15, def: 5, spd: 40, icon: '🐯' },
                    { name: '熊妖', hp: 60, atk: 12, def: 8, spd: 30, icon: '🐻' }
                ],
                deepMountain: [
                    { name: '恶魔', hp: 80, atk: 20, def: 8, spd: 35, icon: '👹' },
                    { name: '灵兽', hp: 90, atk: 18, def: 10, spd: 40, icon: '✨' }
                ],
                swamp: [
                    { name: '毒兽', hp: 70, atk: 16, def: 6, spd: 38, icon: '🐢' },
                    { name: '蛇妖', hp: 75, atk: 18, def: 5, spd: 50, icon: '🐍' }
                ],
                abyss: [
                    { name: '魔王', hp: 120, atk: 25, def: 12, spd: 40, icon: '👿' },
                    { name: '深渊生物', hp: 110, atk: 22, def: 10, spd: 35, icon: '🌀' }
                ],
                // P6 金丹期敌人
                goldenPlains: [
                    { name: '金甲兽', hp: 200, atk: 40, def: 15, spd: 30, icon: '🦁' },
                    { name: '灵狼', hp: 150, atk: 45, def: 10, spd: 50, icon: '🐺' }
                ],
                tribulationGround: [
                    { name: '雷劫残魂', hp: 250, atk: 50, def: 18, spd: 35, icon: '⚡' },
                    { name: '天雷傀儡', hp: 280, atk: 55, def: 20, spd: 30, icon: '🤖' }
                ],
                // P7 元婴期敌人
                voidSea: [
                    { name: '虚空生物', hp: 800, atk: 80, def: 30, spd: 40, icon: '🌀' },
                    { name: '噬魂者', hp: 700, atk: 90, def: 25, spd: 55, icon: '👻' }
                ],
                abyssRuins: [
                    { name: '深渊领主', hp: 2000, atk: 120, def: 50, spd: 35, icon: '👿' },
                    { name: '古神残影', hp: 2500, atk: 150, def: 60, spd: 30, icon: '🌑' }
                ],
                // P9 化神期敌人
                chaosWastes: [
                    { name: '混沌兽', hp: 3000, atk: 200, def: 80, spd: 40, icon: '🐲' },
                    { name: '虚空行者', hp: 2600, atk: 230, def: 70, spd: 55, icon: '🌀' }
                ],
                nineNether: [
                    { name: '九幽魔君', hp: 6000, atk: 320, def: 120, spd: 45, icon: '😈' },
                    { name: '幽冥鬼帝', hp: 5200, atk: 350, def: 110, spd: 55, icon: '💀' }
                ]
            };

        // 按区域随机生成一个敌人（在线战斗与离线自动战斗共用）
        function createAreaEnemy(areaKey) {
            const areaEnemies = BATTLE_ENEMY_CONFIGS[areaKey] || BATTLE_ENEMY_CONFIGS.forest;
            const enemyTemplate = areaEnemies[Math.floor(Math.random() * areaEnemies.length)];
            // P4 平衡层：按区域系数缩放敌人血量与攻击（见 P4_AREA_SCALE）
            const areaScale = P4_AREA_SCALE[areaKey] || { hp: 1, atk: 1 };
            const scaledHP = Math.max(1, Math.round(enemyTemplate.hp * areaScale.hp));
            return {
                ...enemyTemplate,
                hp: scaledHP,
                atk: Math.max(1, Math.round(enemyTemplate.atk * areaScale.atk)),
                currentHP: scaledHP
            };
        }

        function enterBattleArea(areaKey, auto = false) {
            const action = getAction('battle', areaKey);
            const areaData = action.areaData;


            // 初始化普通战斗状态
            gameState.battles = gameState.battles || {};
            gameState.battles.currentArea = areaKey;
            gameState.battles.playerHP = { current: gameState.player.stats.hp.current, max: gameState.player.stats.hp.max };
            gameState.battles.startPlayerHP = gameState.player.stats.hp.current;

            // 随机生成敌人
            gameState.battles.currentEnemy = createAreaEnemy(areaKey);

            gameState.battles.battleState = 'fighting';
            gameState.battles.playerAttackTimer = 0;
            gameState.battles.enemyAttackTimer = 0;
            if (!auto) resetBattleLog();
            gameState.battles.log = battleLogEntries;   // 整个循环战斗共用一份日志（最近 30 条）
            battleLogEntries.push(`—— 遭遇 ${gameState.battles.currentEnemy.name} ——`);
            trimBattleLog();
            gameState.battles.turnCount = 0;
            gameState.player.foodUseTimer = FOOD_CONFIG.autoEatConfig.cooldown;
            pickBestFood();

            gameState.currentAction = {
                skill: 'battle',
                action: areaKey,
                isBattle: true
            };
            gameState.currentActionProgress = 0;

            const battleContainer = document.getElementById('battleContainer');
            if (battleContainer) {
                battleContainer.classList.remove('hidden');
            }

            // 手动进入时重置本次托管统计；自动续战不弹进入提示，避免每场刷屏
            if (!auto) {
                Object.assign(getAutoBattle(), { wins: 0, losses: 0, streak: 0, coins: 0, exp: 0 });
                showNotification(`进入${areaData.name}！遇到${gameState.battles.currentEnemy.name}！`, '#b89a5b');
            }
            updateNormalBattleUI();
            renderAutoBattleBar();
            updateUI();
        }

        // 进入秘境
        function enterDungeon(dungeonId, auto = false) {
            const dungeon = GAME_CONFIG.dungeons[dungeonId];

            // 凡人无法进入秘境
            if (gameState.player.realmIndex === 0) {
                showNotification('凡人无法进入秘径，请先突破到练气初期', '#c98a3e', 'warning');
                return;
            }

            // 检查最低境界要求（唯一的准入条件）
            if (gameState.player.realmIndex < dungeon.minRealmIndex) {
                const currentRealm = getRealmName(gameState.player.realmIndex);
                const requiredRealm = getRealmName(dungeon.minRealmIndex);
                showNotification(`需要 ${requiredRealm} 才能进入（当前 ${currentRealm}）`, '#c4483a', 'error');
                return;
            }

            // 初始化秘境战斗状态
            gameState.dungeons.currentDungeon = dungeonId;
            gameState.dungeons.currentMonsterIndex = 0;
            gameState.dungeons.defeatCount = 0;
            gameState.dungeons.bossDefeated = false;
            gameState.dungeons.playerDeathCount = 0;

            // P8 双向战斗初始化
            gameState.dungeons.monsterAttackTimer = 0;
            gameState.dungeons.battleState = 'fighting';
            gameState.player.attackTimer = 0;
            // 确保玩家HP是current/max结构
            if (typeof gameState.player.stats.hp === 'number') {
                gameState.player.stats.hp = { current: gameState.player.stats.hp, max: gameState.player.stats.hp };
            } else if (!auto) {
                // 手动进入：恢复到最大HP；循环续战时不回血（与战斗区域一致，靠食物和生命回复撑下去）
                gameState.player.stats.hp.current = gameState.player.stats.hp.max;
            }

            // P0-4 食物系统初始化
            gameState.player.foodUseTimer = FOOD_CONFIG.autoEatConfig.cooldown; // 进食冷却完成
            pickBestFood(); // 当前食物不可用时，自动换成背包里最好的可用食物

            // 初始化第一个怪物
            const firstMonster = dungeon.monsters[0];
            gameState.dungeons.currentMonsterHP = firstMonster.hp;

            gameState.currentAction = {
                skill: 'battle',
                action: dungeonId,
                isDungeon: true
            };
            gameState.currentActionProgress = 0;

            if (!auto) showNotification(`进入 ${dungeon.name}！循环挑战，点「撤退」或被击败才会退出`, '#c2a25f');
            updateActionDisplay();
            updateUI();

            // P1-1 初始化战斗UI
            renderBattleUI(auto);
        }

        // ==================== UI更新 ====================
        // 当前打开的配方 / 法则 / 战斗列表随数据实时刷新：突破后解锁的配方、技能升级后解锁的配方、
        // 精通等级与进度、材料数量等，不用再切换面板才能看到变化
        const RECIPE_PANELS = ['cultivation', 'alchemy', 'forging', 'farming', 'mining', 'danhuo', 'shenshi'];
        function refreshVisiblePanelLists() {
            const panel = document.body.dataset.panel;
            if (RECIPE_PANELS.includes(panel)) {
                generateRecipeList(panel);
            } else if (panel === 'wudao') {
                generateLawList();
            } else if (panel === 'battle') {
                const a = gameState.currentAction;
                if (!(a && (a.isBattle || a.isDungeon))) generateBattleList();   // 战斗进行中不重绘，避免打断战斗界面
            }
        }

        function updateUI() {
            if (getCloneSlotCount() >= 2 && !gameState.cloneUnlockNotified2) {
                gameState.cloneUnlockNotified2 = true;
                gameState.cloneUnlockNotified = true;
                showNotification('🌀 化神境界——第二个分身解锁！现在可以同时让两个分身做事', '#b89a5b');
            } else if (isCloneUnlocked() && !gameState.cloneUnlockNotified) {
                gameState.cloneUnlockNotified = true;
                showNotification('🌀 元婴出窍——分身解锁！它能在生活技能里与你并行做事（配方卡片上点「交给分身」）', '#b89a5b');
            }
            renderCloneBar();
            renderPlotBar();
            if (document.body.dataset.panel === 'equipment') renderEquipmentPanel();
            refreshVisiblePanelLists();
            updatePlayerInfo();
            updateProgressBars();
            updateInventory();
            updateSkillExperience();
            buildSkillTree();
            updateEquipment();
            updateActionDisplay();
            updateCoinDisplay();
            updateShop();
            updateArtDisplay();  // 更新功法显示
            updateBonusPanel();
        }

        // 选择性更新UI（仅更新指定的部分，提高性能）
        // 使用: selectiveUpdate('inventory', 'coins', 'stats')
        function selectiveUpdate(...updates) {
            const updateFunctions = {
                player: updatePlayerInfo,
                progress: updateProgressBars,
                inventory: updateInventory,
                skill: updateSkillExperience,
                tree: buildSkillTree,
                equipment: updateEquipment,
                action: updateActionDisplay,
                coins: updateCoinDisplay,
                shop: updateShop
            };

            updates.forEach(update => {
                if (updateFunctions[update]) {
                    updateFunctions[update]();
                }
            });
        }

        // 通知类型系统（P1功能）
        // 通知关闭时仍要显示的「重要提示」：类型为 error / danger / warning，或使用了警示 / 错误色的通知
        const IMPORTANT_NOTIFICATION_COLORS = ['#c4483a', '#c98a3e', '#ef4444', '#f59e0b', '#ff6b6b', '#f39c12'];
        function showNotification(message, color = '#6f9c8a', type = 'normal') {
            const st = (gameState && gameState.settings) || {};
            if (st.enableNotifications === false && !['error', 'danger', 'warning'].includes(type) &&
                !IMPORTANT_NOTIFICATION_COLORS.includes(String(color).toLowerCase())) {
                return;
            }
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.style.setProperty('--accent', color);   // 颜色只用作左侧色条，底色由样式统一
            notification.style.minWidth = '300px';

            // 统一UI：所有通知都显示关闭按钮
            // 屏幕阅读器朗读区（aria-live）：同步一份纯文本
            const liveRegion = document.getElementById('notificationLive');
            if (liveRegion) liveRegion.textContent = String(message).replace(/<[^>]*>/g, ' ');
            notification.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
                    <span>${message}</span>
                    <button aria-label="关闭通知" onclick="this.parentElement.parentElement.remove()" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: #fff;
                        cursor: pointer;
                        padding: 5px 10px;
                        border-radius: 3px;
                        font-weight: bold;
                    ">×</button>
                </div>
            `;

            document.body.appendChild(notification);

            // error类型持久显示，其他类型自动消失（用户也可手动关闭）
            if (type !== 'error') {
                setTimeout(() => {
                    if (notification.parentElement) notification.remove();
                }, ((gameState.settings && gameState.settings.notificationSeconds) || GAME_BALANCE.NOTIFICATION_DURATION / 1000) * 1000);
            }
        }

        function updatePlayerInfo() {
            const nameEl = document.getElementById('playerNameDisplay');
            nameEl.textContent = gameState.player.name || '-';
            nameEl.title = gameState.player.name || '';   // 名字被截断时可悬停查看全名
            const realm = GAME_CONFIG.realms[gameState.player.realmIndex];
            document.getElementById('realmDisplay').textContent = realm.name;
            document.getElementById('nextBreakthrough').textContent = realm.nextReq;
        }

        function updateProgressBars() {
            const realm = GAME_CONFIG.realms[gameState.player.realmIndex];
            const percentage = Math.min((gameState.player.cultivationXP / realm.nextReq) * 100, 100);
            document.getElementById('cultivationBar').style.width = percentage + '%';
            document.getElementById('cultivationProgress').style.width = percentage + '%';
            document.getElementById('progressText').textContent = Math.round(percentage) + '%';
            // 修为显示：达到上限时提示可突破；大境界缺丹药时明确写出缺什么
            const full = gameState.player.cultivationXP >= realm.nextReq;
            const isMajor = (gameState.player.realmIndex % 4 === 0 && gameState.player.realmIndex > 0) && !!GAME_CONFIG.realms[gameState.player.realmIndex + 1];
            const req = isMajor ? MAJOR_BREAKTHROUGH_PILLS[gameState.player.realmIndex] : null;
            const pillQty = req ? ((gameState.player.inventory.find(item => item.id === req.pillId) || {}).qty || 0) : 0;
            const lackPill = full && !!req && pillQty < req.qty;
            let cultivationDisplay = `${gameState.player.cultivationXP}/${realm.nextReq}`;
            if (full) cultivationDisplay += lackPill ? ` ⚠ 缺${req.pillName}` : ` ✨ 可突破`;
            document.getElementById('cultivationXP').textContent = cultivationDisplay;

            // 突破按钮：修为满了就显示。大境界缺丹药时也显示，点开能看到所需丹药和获取方式
            const btBtn = document.getElementById('breakThroughBtn');
            if (full && GAME_CONFIG.realms[gameState.player.realmIndex + 1]) {
                btBtn.style.display = 'block';
                btBtn.classList.toggle('btn-warn', lackPill);
                btBtn.textContent = lackPill ? `⚠ 修为已满 · 需${req.pillName}×${req.qty}（点击查看获取方式）` : '✨ 尝试突破 ✨';
            } else if (full) {
                btBtn.style.display = 'block';   // 已是最高境界：点开会提示尽头
                btBtn.classList.remove('btn-warn');
                btBtn.textContent = '✨ 尝试突破 ✨';
            } else {
                btBtn.style.display = 'none';
            }

            if (gameState.currentAction) {
                const action = getAction(gameState.currentAction.skill, gameState.currentAction.action);
                const duration = getAdjustedDuration(gameState.currentAction.skill, action.duration, gameState.currentAction.action);
                const progress = Math.min((gameState.currentActionProgress / duration) * 100, 100);
                document.getElementById('activeProgress').textContent = Math.round(progress) + '%';

                // 全局进度条（P0功能）
                const globalBar = document.getElementById('globalProgressBar');
                if (globalBar) {
                    globalBar.style.display = 'block';
                    document.getElementById('progressActionName').textContent = action.name;
                    document.getElementById('globalProgressFill').style.width = progress + '%';
                    const remainTime = Math.max(0, (duration - gameState.currentActionProgress)).toFixed(1);
                    document.getElementById('progressTimeRemain').textContent = remainTime + 's';
                }

                // 更新action-item内的进度条
                const activeItem = document.getElementById('action-' + gameState.currentAction.skill + '-' + gameState.currentAction.action);
                if (activeItem) {
                    const progressFill = activeItem.querySelector('.action-progress-fill');
                    if (progressFill) {
                        progressFill.style.width = progress + '%';
                    }
                }
            } else {
                // 隐藏全局进度条
                const globalBar = document.getElementById('globalProgressBar');
                if (globalBar) {
                    globalBar.style.display = 'none';
                }
            }
        }

        function updateInventory() {
            const inventory = gameState.player.inventory;
            const grid = document.getElementById('inventoryGrid');
            if (!grid) return;
            grid.innerHTML = '';

            // 按类型分类
            const byType = {};
            inventory.forEach(item => {
                const itemConfig = GAME_CONFIG.items[item.id];
                if (!itemConfig) return;

                if (!byType[itemConfig.type]) byType[itemConfig.type] = [];
                byType[itemConfig.type].push(item);
            });

            // 按类型显示
            const typeNames = { material: '材料', ore: '矿石', consumable: '丹药', weapon: '装备', jewelry: '首饰' };
            Object.entries(byType).forEach(([type, items]) => {
                const typeLabel = document.createElement('div');
                typeLabel.style.cssText = 'grid-column: 1/-1; font-weight: bold; color: #6f9c8a; margin-top: 10px; margin-bottom: 5px;';
                typeLabel.textContent = typeNames[type] || type;
                grid.appendChild(typeLabel);

                items.forEach(item => {
                    const itemConfig = GAME_CONFIG.items[item.id];
                    const slot = document.createElement('div');
                    slot.className = 'item-slot';
                    slot.style.cursor = 'pointer';
                    slot.innerHTML = `
                        <div class="item-icon">${itemConfig.icon}</div>
                        <div class="item-name">${itemConfig.name}</div>
                        ${isEquipmentItem(item.id) ? `<div class="item-stats">${formatItemStats(item.id)}</div>` : ''}
                        <div class="item-qty">×${item.qty}</div>
                    `;
                    if (isEquipmentItem(item.id)) slot.title = `${itemConfig.name}：${formatItemStats(item.id)}（点击查看 / 装备）`;
                    // 点击物品显示详情（P1功能）
                    slot.onclick = () => showItemDetail(item.id, item.qty);
                    grid.appendChild(slot);
                });
            });

            document.getElementById('inventoryCapacity').textContent = `${inventory.length}/${gameState.player.inventoryCapacity}`;
        }

        // 普通商品（食物 / 材料 / 装备）可以选购买数量；功法、永久升级等独一无二的只能买一次，仍直接购买
        function isBulkBuyable(item) {
            return !!item && !['art', 'upgrade', 'unlock'].includes(item.type);
        }

        function findShopItem(itemId) {
            let found = null;
            Object.values(GAME_CONFIG.shop).forEach(category => {
                const f = category.find(i => i.id === itemId);
                if (f) found = f;
            });
            return found;
        }

        // 购买数量对话框：数量 / 总价实时显示，最多可买 = 灵石 ÷ 单价
        function openBuyDialog(shopId, itemId) {
            const item = findShopItem(itemId);
            if (!item) return;
            const modal = document.getElementById('buyModal');
            const input = document.getElementById('buyQty');
            modal.dataset.shopId = shopId;
            modal.dataset.itemId = itemId;
            document.getElementById('buyIcon').textContent = item.icon;
            document.getElementById('buyName').textContent = item.name;
            document.getElementById('buyDesc').textContent = item.desc || '';
            document.getElementById('buyUnitPrice').textContent = `${item.price} 灵石`;
            document.getElementById('buyOwned').textContent = (gameState.player.inventory.find(i => i.id === itemId) || { qty: 0 }).qty;
            document.getElementById('buyCoins').textContent = gameState.player.coins;
            input.value = 1;
            modal.style.display = 'flex';
            updateBuyLabel();
        }

        function closeBuyDialog() {
            document.getElementById('buyModal').style.display = 'none';
        }

        function getBuyMax() {
            const modal = document.getElementById('buyModal');
            const item = findShopItem(modal.dataset.itemId);
            if (!item) return 1;
            return Math.max(1, Math.min(999, Math.floor(gameState.player.coins / item.price)));
        }

        function changeBuyQty(delta) {
            const input = document.getElementById('buyQty');
            const max = getBuyMax();
            const cur = parseInt(input.value, 10) || 1;
            input.value = delta === 'max' ? max : Math.max(1, Math.min(max, cur + delta));
            updateBuyLabel();
        }

        function updateBuyLabel() {
            const modal = document.getElementById('buyModal');
            const item = findShopItem(modal.dataset.itemId);
            if (!item) return;
            const input = document.getElementById('buyQty');
            const q = Math.max(1, Math.min(999, parseInt(input.value, 10) || 1));
            const total = item.price * q;
            const btn = document.getElementById('buyConfirmBtn');
            btn.textContent = `购买 ${q} 个（${total} 灵石）`;
            btn.disabled = total > gameState.player.coins;
            document.getElementById('buyTotalHint').textContent = total > gameState.player.coins ? '灵石不足' : '';
        }

        function confirmBuy() {
            const modal = document.getElementById('buyModal');
            const q = Math.max(1, Math.min(999, parseInt(document.getElementById('buyQty').value, 10) || 1));
            if (buyItem(modal.dataset.shopId, modal.dataset.itemId, q)) {
                // 买完更新对话框里的持有数量与灵石，方便继续买；不够钱时自动收起
                document.getElementById('buyOwned').textContent = (gameState.player.inventory.find(i => i.id === modal.dataset.itemId) || { qty: 0 }).qty;
                document.getElementById('buyCoins').textContent = gameState.player.coins;
                changeBuyQty(0);
            }
        }

        function buyItem(shopId, itemId, qty = 1) {
            let item = null;
            let price = 0;

            // 查找商品
            Object.values(GAME_CONFIG.shop).forEach(category => {
                const found = category.find(i => i.id === itemId);
                if (found) {
                    item = found;
                    price = found.price;
                }
            });

            if (!item) return;

            if (item.type === 'unlock') {
                showNotification('该功能尚未开放', '#c98a3e');
                return;
            }

            // 已拥有的功法：直接装备，不重复扣费
            if (item.type === 'art' && (gameState.player.ownedArts || []).includes(itemId)) {
                switchCultivationArt(itemId);
                updateUI();
                saveGame();
                return;
            }

            // 境界要求（商品显示与购买都要校验）
            if ((item.minRealmIndex || 0) > gameState.player.realmIndex) {
                showNotification(`🔒 ${item.name}需要${getRealmName(item.minRealmIndex)}`, '#c98a3e');
                return;
            }

            // 永久升级特殊处理（P1功能）
            if (item.type === 'upgrade') {
                if (gameState.player.boughtUpgrades.includes(itemId)) {
                    showNotification(`已拥有此升级！`, '#c2a25f');
                    return;
                }
            }

            // 检查灵石
            if (gameState.player.coins < price) {
                showNotification(`灵石不足！需要${price}，拥有${gameState.player.coins}`, '#c4483a', 'error');
                return;
            }

            // 只有普通商品可以一次买多个；独一无二的固定按 1 个
            if (!isBulkBuyable(item)) qty = 1;
            qty = Math.max(1, Math.floor(qty));
            const totalPrice = price * qty;
            if (gameState.player.coins < totalPrice) {
                showNotification(`灵石不足！需要${totalPrice}，拥有${gameState.player.coins}`, '#c4483a', 'error');
                return false;
            }
            price = totalPrice;

            // 扣灵石
            gameState.player.coins -= price;

            // 处理不同类型的购买
            if (item.type === 'upgrade') {
                // 永久升级处理
                gameState.player.boughtUpgrades.push(itemId);

                if (itemId === 'inventory_slot') {
                    gameState.player.inventoryCapacity += 5;
                    showNotification(`✨ 背包已扩展至${gameState.player.inventoryCapacity}格！`, '#6f9c8a');
                } else if (itemId === 'farming_slot') {
                    showNotification('✨ 已解锁第二块灵田！在灵田面板的配方卡片上点「种到第二块田」', '#6f9c8a');
                    updateUI();
                } else if (itemId === 'jewelry_slot2') {
                    showNotification('✨ 已解锁第二个饰品栏位！去「装备」界面佩戴', '#6f9c8a');
                }
            } else if (item.type === 'art') {
                // 功法购买处理 - 记录拥有；只有比当前功法更快才自动装备
                if (!gameState.player.ownedArts.includes(itemId)) gameState.player.ownedArts.push(itemId);
                const art = CULTIVATION_ARTS[itemId];
                const currentSpeed = CULTIVATION_ARTS[gameState.player.currentArt]?.speedMultiplier || 1;

                if (art && art.speedMultiplier > currentSpeed) {
                    gameState.player.currentArt = itemId;
                    calculateStats();   // 功法特效可能改变属性
                    const speedBonus = ((art.speedMultiplier - 1) * 100).toFixed(0);
                    showNotification(
                        `✨ 已装备功法：${item.name}！\n修炼速度 ${art.speedMultiplier.toFixed(2)}x（提升${speedBonus}%）`,
                        '#7fae9a',
                        'success'
                    );
                } else {
                    showNotification(
                        `已习得${item.name}（${art?.speedMultiplier?.toFixed(2)}x），当前功法更快，未自动装备`,
                        '#7fae9a',
                        'success'
                    );
                }

                // 更新UI显示新的修炼时间
                updateArtDisplay();
                updateActionDisplay();
            } else {
                // 消耗品处理
                if (!addToInventory(itemId, qty)) {
                    gameState.player.coins += price;   // 背包放不下：退款
                    return false;
                }
                showNotification(`购买成功：${item.name} ×${qty}`, '#6f9c8a');
            }

            updateUI();
            saveGame();
            return true;
        }

        function updateShop() {
            const shopContainer = document.getElementById('shopGrid');
            if (!shopContainer) return;

            shopContainer.innerHTML = '';

            const categoryNames = {
                upgrades: '⭐ 永久升级',
                food: '🌾 食物',
                pills: '💊 丹药',
                equipment: '⚔️ 装备',
                materials: '🪨 材料',
                arts: '📜 功法',
                special: '✨ 特殊'
            };

            const realmNames = ['凡人', '练气初期', '练气中期', '练气后期', '练气巅峰', '筑基初期', '筑基中期', '筑基后期', '筑基圆满', '金丹初期', '金丹中期', '金丹后期', '金丹圆满', '元婴初期', '元婴中期', '元婴后期', '元婴圆满'];
            const currentRealmIdx = gameState.player.realmIndex;
            const currentRealmName = realmNames[currentRealmIdx] || '未知';

            Object.entries(GAME_CONFIG.shop).forEach(([category, items]) => {
                // 筛选该分类中可见的商品（境界满足要求的）
                // 功法始终显示（未到境界的灰显并标注要求），其余商品未到境界时隐藏
                const visibleItems = items.filter(item => {
                    const minRealm = item.minRealmIndex !== undefined ? item.minRealmIndex : 0;
                    return item.type === 'art' || currentRealmIdx >= minRealm;
                });

                if (visibleItems.length === 0) return; // 如果没有可见商品，跳过该分类

                const title = document.createElement('div');
                title.style.cssText = 'grid-column: 1/-1; font-weight: bold; color: #6f9c8a; margin-top: 10px; margin-bottom: 5px;';
                title.textContent = categoryNames[category] || category;
                shopContainer.appendChild(title);

                visibleItems.forEach(item => {
                    // 检查永久升级是否已购买
                    const isBought = item.type === 'upgrade' && gameState.player.boughtUpgrades.includes(item.id);
                    const isOwnedArt = item.type === 'art' && (gameState.player.ownedArts || []).includes(item.id);
                    const isLocked = !isOwnedArt && currentRealmIdx < (item.minRealmIndex || 0);

                    const card = document.createElement('div');
                    card.className = 'shop-item';

                    let cardStyle = 'padding: 15px; background: rgba(0,0,0,0.3); border: 1px solid #555; border-radius: 4px; transition: all 0.3s; text-align: center;';
                    if (isBought) {
                        cardStyle += 'opacity: 0.5; background: rgba(0,0,0,0.5); border-color: #888; cursor: not-allowed;';
                    } else if (isLocked) {
                        cardStyle += 'opacity: 0.55; border-style: dashed; cursor: not-allowed;';
                    } else {
                        cardStyle += 'cursor: pointer;';
                    }
                    card.style.cssText = cardStyle;

                    if (!isBought && !isLocked) {
                        card.onmouseover = () => card.style.borderColor = '#6f9c8a';
                        card.onmouseout = () => card.style.borderColor = '#555';
                    }

                    const priceDisplay = isBought ? '✓ 已拥有'
                        : isOwnedArt ? (gameState.player.currentArt === item.id ? '✓ 当前功法' : '已拥有 · 点击装备')
                        : isLocked ? `🔒 需要${getRealmName(item.minRealmIndex)}`
                        : `${item.price} 灵石`;
                    const priceColor = isBought ? '#6f9c8a' : isLocked ? '#c98a3e' : '#c2a25f';
                    // 未拥有的功法同时显示价格与境界要求，方便对比规划
                    const artExtra = item.type === 'art' && !isOwnedArt
                        ? `<div style="font-size: 0.75em; color: #888; margin-top: 4px;">${isLocked ? item.price + ' 灵石' : '需要' + getRealmName(item.minRealmIndex) + '（已达成）'}</div>`
                        : '';

                    card.innerHTML = `
                        <div style="font-size: 24px; margin-bottom: 5px;">${item.icon}</div>
                        <div style="font-weight: bold; color: #6f9c8a; margin-bottom: 3px;">${item.name}</div>
                        <div style="font-size: 0.8em; color: #888; margin-bottom: 8px;">${item.type === 'art' ? getArtShopDesc(item) : item.desc}</div>
                        <div style="color: ${priceColor}; font-weight: bold;">${priceDisplay}</div>
                        ${artExtra}
                    `;

                    if (isLocked) {
                        card.onclick = () => showNotification(`🔒 ${item.name}需要${getRealmName(item.minRealmIndex)}`, '#c98a3e');
                    } else if (!isBought) {
                        card.onclick = () => (isBulkBuyable(item) ? openBuyDialog(category, item.id) : buyItem(category, item.id));
                    }
                    shopContainer.appendChild(card);
                });
            });
        }

        function updateSkillExperience() {
            const list = document.getElementById('skillExperienceList');
            list.innerHTML = '';

            Object.entries(gameState.skills).forEach(([key, skill]) => {
                const row = document.createElement('div');
                row.className = 'stat-row';
                const info = getSkillExpInfo(key);
                row.innerHTML = `
                    <span class="stat-label">${skill.icon} ${skill.name}:</span>
                    <span class="stat-value" title="还差 ${info.remain} 升级">Lv.${info.level} <small style="color:#888">(${info.exp}/${info.need})</small></span>
                `;
                list.appendChild(row);
            });
            updateSkillHeaders();

            // 更新修炼面板的解锁状态
            updateCultivationRecipes();
        }

        // 更新修炼配方的解锁状态显示
        function updateCultivationRecipes() {
            const recipes = ['basic', 'small', 'big', 'breath', 'epiphany'];
            const currentRealm = gameState.player.realmIndex;
            const currentRealmName = getRealmName(currentRealm);

            recipes.forEach(recipeKey => {
                const recipe = GAME_CONFIG.skills.cultivation.recipes[recipeKey];
                // 使用双门槛检查：境界 + 功法
                const isUnlocked = isCultivationRecipeUnlocked(recipeKey);

                // 获取配方对应的DOM元素
                const actionItems = document.querySelectorAll('#panel-cultivation .action-item');
                let targetItem = null;

                // 找到对应的action-item
                for (let item of actionItems) {
                    if (item.innerHTML.includes(recipe.name)) {
                        targetItem = item;
                        break;
                    }
                }

                if (targetItem) {
                    // 更新是否锁定
                    if (isUnlocked) {
                        targetItem.classList.remove('action-locked');
                        recipe.unlocked = true;
                        // 更新显示样式为已解锁
                        const nameDiv = targetItem.querySelector('.action-name');
                        if (nameDiv) {
                            nameDiv.textContent = nameDiv.textContent.replace('⭕', '🟢');
                        }
                    } else {
                        targetItem.classList.add('action-locked');
                        recipe.unlocked = false;
                        // 更新显示样式为未解锁
                        const nameDiv = targetItem.querySelector('.action-name');
                        if (nameDiv) {
                            nameDiv.textContent = nameDiv.textContent.replace('🟢', '⭕');
                        }
                        // 更新境界提示（修炼用境界而非等级）
                        const hintSpan = targetItem.querySelector(`#lock-level-${recipeKey}`);
                        if (hintSpan) {
                            const requiredRealm = recipe.requiredRealmIndex || 0;
                            const requiredRealmName = getRealmName(requiredRealm);
                            hintSpan.textContent = `需要${requiredRealmName}（当前${currentRealmName}）`;
                        }
                    }
                }
            });
        }

        function updateEquipment() {
            const weapon = gameState.player.equipment.weapon;
            const armor = gameState.player.equipment.armor;
            const jewelry = gameState.player.equipment.jewelry;

            document.getElementById('weaponDisplay').textContent = weapon ? GAME_CONFIG.items[weapon].name : '无';
            document.getElementById('armorDisplay').textContent = armor ? GAME_CONFIG.items[armor].name : '无';
            document.getElementById('jewelryDisplay').textContent = jewelry.length > 0 ? jewelry.map(j => GAME_CONFIG.items[j].name).join(', ') : '无';

            // P2功能：装备变化时重新计算属性
            calculateStats();
        }

        // 工具函数：检查配方/行动是否解锁（支持技能等级或境界等级）
        function isActionUnlocked(requirement, checkType = 'skill') {
            if (checkType === 'skill') {
                // 检查技能等级
                return gameState.skills[requirement.skill] &&
                       gameState.skills[requirement.skill].level >= requirement.requiredLevel;
            } else if (checkType === 'realm') {
                // 检查境界等级
                return gameState.player.realmIndex >= (requirement.requiredLevel - 1);
            }
            return false;
        }

        function calculateStats() {
            // P4重写：境界驱动的属性系统（替代技能等级驱动）
            const realmIndex = gameState.player.realmIndex;

            // === 第一步：从凡人境界基础属性开始 ===
            // 使用凡人阶段作为基准，避免各境界baseStats不一致
            const mortalsConfig = GAME_CONFIG.realms[0]; // 凡人配置
            const baseStats = { ...mortalsConfig.baseStats }; // {hp: 50, atk: 5, def: 2, spd: 5}

            // === 第二步：境界驱动倍数（核心改动） ===
            // 每个境界提升对应属性：
            // - 生命 +40%/级（快速增长，提升续航）
            // - 攻击 +30%/级（显著提升）
            // - 防御 +25%/级（稳定防守）
            // - 速度 +30%/级（战斗体验）
            const hpMultiplier = 1 + realmIndex * 0.40;
            const atkMultiplier = 1 + realmIndex * 0.30;
            const defMultiplier = 1 + realmIndex * 0.25;
            const spdMultiplier = 1 + realmIndex * 0.30;

            // === 第三步：灵根 + 功法的属性百分比特效（作用于境界基础属性，先乘后取整，避免小数值被吃掉）===
            // 正向加成四舍五入（但不低于无加成时的值），负向加成向下取整，避免小数值的加成被取整吃掉
            const applyPct = (raw, pct) => pct > 0
                ? Math.max(Math.floor(raw), Math.round(raw * (1 + pct)))
                : Math.floor(raw * (1 + pct));
            let totalStats = {
                hp: applyPct(baseStats.hp * hpMultiplier, getMod('hpPct')),
                atk: applyPct(baseStats.atk * atkMultiplier, getMod('atkPct')),
                def: applyPct(baseStats.def * defMultiplier, getMod('defPct')),
                spd: applyPct(baseStats.spd * spdMultiplier, getMod('spdPct'))
            };

            // === 第四步：从装备获取属性加成（叠加，不覆盖） ===
            const weapon = gameState.player.equipment.weapon;
            const armor = gameState.player.equipment.armor;
            const jewelry = gameState.player.equipment.jewelry;
            // 淬炼 +10%/次，炼器等级 +0.5%/级（SKILL_LEVEL_EFFECTS.forging）
            const temperMult = (1 + 0.1 * (gameState.player.temperLevel || 0)) * SKILL_LEVEL_EFFECTS.forging.formula((gameState.skills.forging || {}).level || 1);

            if (weapon && GAME_CONFIG.items[weapon]?.stats) {
                Object.entries(GAME_CONFIG.items[weapon].stats).forEach(([stat, value]) => {
                    if (totalStats.hasOwnProperty(stat)) {
                        totalStats[stat] += Math.floor(value * temperMult);
                    }
                });
            }

            if (armor && GAME_CONFIG.items[armor]?.stats) {
                Object.entries(GAME_CONFIG.items[armor].stats).forEach(([stat, value]) => {
                    if (totalStats.hasOwnProperty(stat)) {
                        totalStats[stat] += Math.floor(value * temperMult);
                    }
                });
            }

            jewelry.forEach(jewelryId => {
                if (GAME_CONFIG.items[jewelryId]?.stats) {
                    Object.entries(GAME_CONFIG.items[jewelryId].stats).forEach(([stat, value]) => {
                        if (totalStats.hasOwnProperty(stat)) {
                            totalStats[stat] += Math.floor(value * temperMult);
                        }
                    });
                }
            });

            // P8 修改：HP改为 {current, max} 结构
            const oldMaxHP = gameState.player.stats?.hp?.max || gameState.player.stats?.hp || baseStats.hp;
            const newMaxHP = totalStats.hp;

            // 保存旧的current HP（如果存在）
            const oldCurrentHP = gameState.player.stats?.hp?.current;

            // 转换为新的HP结构
            totalStats.hp = {
                current: oldCurrentHP !== undefined ? Math.min(oldCurrentHP, newMaxHP) : newMaxHP,
                max: newMaxHP
            };

            gameState.player.stats = totalStats;
            updateStatsDisplay();
        }

        function updateStatsDisplay() {
            const stats = gameState.player.stats;
            // P8 修改：HP显示为 current/max
            const hpDisplay = typeof stats.hp === 'object'
                ? `${stats.hp.current}/${stats.hp.max}`
                : stats.hp;
            document.getElementById('hpDisplay').textContent = hpDisplay;
            document.getElementById('atkDisplay').textContent = stats.atk;
            document.getElementById('defDisplay').textContent = stats.def;
            document.getElementById('spdDisplay').textContent = stats.spd;
        }

        function updateActionDisplay() {
            if (gameState.currentAction) {
                const action = getAction(gameState.currentAction.skill, gameState.currentAction.action);
                document.getElementById('activeActionDisplay').textContent = action.name;

                // 更新输出显示标签和值
                const outputLabel = document.querySelector('[id*="activeOutput"]')?.parentElement?.querySelector('span:first-child');

                // 计算实际持续时间（修炼和其他技能使用不同倍率）
                const adjustedDuration = getAdjustedDuration(gameState.currentAction.skill, action.duration, gameState.currentAction.action);

                if (action.output.cultivation) {
                    if (outputLabel) outputLabel.textContent = '获得修为:';
                    document.getElementById('activeOutput').textContent = `${action.output.cultivation} (每${adjustedDuration.toFixed(1)}秒)`;
                } else if (action.output.coins) {
                    if (outputLabel) outputLabel.textContent = '获得灵石:';
                    document.getElementById('activeOutput').textContent = `${action.output.coins} (每${adjustedDuration.toFixed(1)}秒)`;
                }
            }
        }

        function updateCoinDisplay() {
            document.getElementById('coinAmount').textContent = gameState.player.coins;
            const shopCoin = document.getElementById('shopCoin');
            if (shopCoin) shopCoin.textContent = gameState.player.coins;
        }

        // ==================== 突破系统 ====================
        // 某种突破丹药的获取途径：从配置里自动汇总（配方 + 秘境掉落），避免文字与实际脱节
        function getPillSources(pillId) {
            const lines = [];
            const itemName = id => (GAME_CONFIG.items[id] || {}).name || id;
            Object.entries(gameState.skills).forEach(([skillName, skill]) => {
                Object.values(skill.recipes || {}).forEach(recipe => {
                    if (!((recipe.output && recipe.output.items) || []).some(i => i.id === pillId)) return;
                    const mats = Object.entries(recipe.requires || {}).map(([id, q]) => `${itemName(id)}×${q}`).join('、');
                    const ok = skill.level >= (recipe.requiredLevel || 1);
                    lines.push(`${ok ? '✓' : '○'} ${skill.name}·${recipe.name}（需${skill.name} Lv.${recipe.requiredLevel}，当前 Lv.${skill.level}${mats ? '；材料：' + mats : ''}）`);
                });
            });
            Object.values(GAME_CONFIG.dungeons).forEach(d => {
                const drop = [...((d.rewards || {}).fixed || []), ...((d.rewards || {}).random || [])].find(x => x.id === pillId);
                if (!drop) return;
                const ok = gameState.player.realmIndex >= d.minRealmIndex;
                lines.push(`${ok ? '✓' : '○'} 秘境「${d.name}」通关掉落${drop.probability ? '（约 ' + Math.round(drop.probability * 100) + '%）' : ''}（入口：${getRealmName(d.minRealmIndex)}）`);
            });
            if (pillId === 'pill') lines.push('玄门后裔出身开局自带 1 个');
            return lines;
        }

        function showBreakthroughModal() {
            const realmIndex = gameState.player.realmIndex;
            const currentRealm = GAME_CONFIG.realms[realmIndex];
            const nextRealm = GAME_CONFIG.realms[realmIndex + 1];

            // 判断是否为大境界突破（新索引规则：凡人后为大境界）
            const isMajorBreakthrough = (realmIndex % 4 === 0 && realmIndex > 0);

            document.getElementById('btCurrentRealm').textContent = currentRealm.name;
            document.getElementById('btNextRealm').textContent = nextRealm ? nextRealm.name : '大道尽头';

            // 隐藏丹药需求区域
            document.getElementById('btPillRequirement').style.display = 'none';

            if (isMajorBreakthrough && nextRealm) {
                // 大境界突破
                document.getElementById('btModalTitle').textContent = `✨ 突破${nextRealm ? nextRealm.name : '大道尽头'} ✨`;
                document.getElementById('btBreakthroughType').textContent = '需丹药辅助';

                // 显示丹药需求
                const pillReq = MAJOR_BREAKTHROUGH_PILLS[realmIndex];
                if (pillReq) {
                    document.getElementById('btPillRequirement').style.display = 'block';
                    document.getElementById('btPillName').textContent = `${pillReq.pillName} ×${pillReq.qty}`;

                    // 检查背包中的丹药数量
                    const pillInInventory = gameState.player.inventory.find(item => item.id === pillReq.pillId);
                    const currentQty = pillInInventory ? pillInInventory.qty : 0;

                    const qtyDisplay = currentQty >= pillReq.qty
                        ? `${currentQty} ✅`
                        : `${currentQty} ❌`;
                    document.getElementById('btPillCount').textContent = qtyDisplay;

                    // 丹药不足时列出获取方式
                    const guide = document.getElementById('btPillGuide');
                    if (guide) {
                        if (currentQty >= pillReq.qty) {
                            guide.style.display = 'none';
                        } else {
                            guide.style.display = 'block';
                            guide.innerHTML = '<div class="bt-guide-title">获取方式（✓ 已满足条件，○ 尚未满足）</div>' +
                                getPillSources(pillReq.pillId).map(t => `<div class="bt-guide-line">${t}</div>`).join('');
                        }
                    }
                }

                // 更新按钮文本
                const button = document.getElementById('btButton');
                if (pillReq && (gameState.player.inventory.find(item => item.id === pillReq.pillId)?.qty || 0) >= pillReq.qty) {
                    button.textContent = '🌟 服丹突破 🌟';
                } else {
                    button.textContent = '丹药不足';
                }
            } else if (!nextRealm) {
                document.getElementById('btBreakthroughType').textContent = '暂无后续境界';
                document.getElementById('btButton').textContent = '已至大道尽头';
            } else {
                // 小境界突破
                document.getElementById('btModalTitle').textContent = '✨ 突破修为 ✨';
                document.getElementById('btBreakthroughType').textContent = '自然突破';
                document.getElementById('btButton').textContent = '🌟 开始突破 🌟';
            }

            document.getElementById('breakthroughModal').classList.add('show');
        }

        function closeBreakthroughModal() {
            document.getElementById('breakthroughModal').classList.remove('show');
        }

        function attemptBreakthrough() {
            const realmIndex = gameState.player.realmIndex;
            const currentRealm = GAME_CONFIG.realms[realmIndex];

            // 检查修为是否足够
            if (gameState.player.cultivationXP < currentRealm.nextReq) {
                showNotification('修为不足，无法突破', '#c98a3e', 'warning');
                return;
            }

            // 已是最高境界，没有下一境界可突破
            if (!GAME_CONFIG.realms[realmIndex + 1]) {
                showNotification('已至当前大道尽头，后续境界敬请期待', '#c98a3e', 'warning');
                closeBreakthroughModal();
                return;
            }

            // 判断是否为大境界突破（新索引规则）
            const isMajorBreakthrough = (realmIndex % 4 === 0 && realmIndex > 0);

            if (isMajorBreakthrough) {
                // 大境界突破：需要丹药
                performMajorBreakthrough();
            } else {
                // 小境界突破：直接成功
                performBreakthrough();
            }
        }

        // ==================== 突破特效 ====================
        // 小境界：一圈铜色涟漪加火花 + 朱印「破」，约 1.6 秒，不挡操作。
        // 大境界：每个境界有自己的特效（约 4 秒，点击可跳过）：
        //   筑基 = 地脉升起（大地色石柱自下而上拔起、尘土飞扬、震动）
        //   金丹 = 金丹凝结（金色光点旋转汇聚成丹，光环扩散）
        //   元婴 = 元神出窍（青白色婴儿元神从丹田升起，拖出光带）
        //   化神 = 天地法则（雷霆劈落、八种法则符文环绕旋转、屏幕震动）
        // 用 canvas 绘制，不依赖外部资源；尊重「减少动态效果」；设置里可关闭。
        const BREAKTHROUGH_FX = {
            5:  { name: '筑基', line: '根基已成，百脉皆通', kind: 'foundation', dur: 4.2 },
            9:  { name: '金丹', line: '丹成九转，金光内蕴', kind: 'core', dur: 4.2 },
            13: { name: '元婴', line: '元神出窍，神游太虚', kind: 'nascent', dur: 4.4 },
            17: { name: '化神', line: '天地法则，尽在掌中', kind: 'law', dur: 4.6 }
        };
        const LAW_RUNES = [['金', '#d8c078'], ['木', '#7fae9a'], ['水', '#7d9bb5'], ['火', '#d9614f'], ['土', '#b08d5a'], ['风', '#b7c9c2'], ['雷', '#b39ddb'], ['冰', '#a8d8e8']];
        let fxState = null;

        function stopBreakthroughFx() {
            if (!fxState) return;
            cancelAnimationFrame(fxState.raf);
            clearTimeout(fxState.timer);
            fxState.el.remove();
            document.body.classList.remove('fx-shake');
            fxState = null;
        }

        const fxEase = t => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
        const fxRand = (a, b) => a + Math.random() * (b - a);

        // ---- 各特效的绘制函数：draw(ctx, W, H, t, s)，t 为秒，s 为该特效的持久状态 ----
        function fxDrawMinor(ctx, W, H, t, s) {
            const cx = W / 2, cy = H * 0.42;
            const p = Math.min(1, t / 1.3);
            for (let k = 0; k < 2; k++) {
                const pk = Math.min(1, Math.max(0, (t - k * 0.22) / 1.1));
                if (pk <= 0) continue;
                ctx.strokeStyle = `rgba(194, 162, 95, ${0.65 * (1 - pk)})`;
                ctx.lineWidth = 3 - k;
                ctx.beginPath();
                ctx.arc(cx, cy, 30 + fxEase(pk) * Math.min(W, H) * 0.3, 0, Math.PI * 2);
                ctx.stroke();
            }
            if (!s.sparks) s.sparks = Array.from({ length: 18 }, () => ({ a: fxRand(0, 6.28), v: fxRand(0.6, 1.3), r: fxRand(1.5, 3) }));
            s.sparks.forEach(sp => {
                const d = 30 + fxEase(p) * Math.min(W, H) * 0.26 * sp.v;
                ctx.fillStyle = `rgba(232, 212, 160, ${0.9 * (1 - p)})`;
                ctx.beginPath();
                ctx.arc(cx + Math.cos(sp.a) * d, cy + Math.sin(sp.a) * d, sp.r * (1 - p * 0.5), 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function fxDrawFoundation(ctx, W, H, t, s) {
            const fade = Math.min(1, t / 0.5) * (t > 3.5 ? Math.max(0, (4.2 - t) / 0.7) : 1);
            ctx.fillStyle = `rgba(14, 12, 8, ${0.6 * fade})`;
            ctx.fillRect(0, 0, W, H);
            if (!s.pillars) {
                const n = Math.max(7, Math.round(W / 150));
                s.pillars = Array.from({ length: n }, (_, i) => ({ x: (i + 0.5) * W / n, w: W / n * 0.62, h: fxRand(0.32, 0.72) * H, d: 0.12 * i + fxRand(0, 0.15) }));
                s.dust = Array.from({ length: 90 }, () => ({ x: fxRand(0, W), y: fxRand(H * 0.5, H), v: fxRand(20, 70), r: fxRand(1, 3), d: fxRand(0, 2) }));
            }
            s.pillars.forEach(p => {
                const k = fxEase((t - 0.25 - p.d) / 0.95);
                if (k <= 0) return;
                const h = p.h * k, x = p.x - p.w / 2, y = H - h;
                const g = ctx.createLinearGradient(0, y, 0, H);
                g.addColorStop(0, `rgba(146, 116, 70, ${0.92 * fade})`);
                g.addColorStop(1, `rgba(52, 42, 28, ${0.92 * fade})`);
                ctx.fillStyle = g;
                ctx.fillRect(x, y, p.w, h);
                ctx.fillStyle = `rgba(232, 212, 160, ${0.85 * fade})`;
                ctx.fillRect(x, y, p.w, 4);
                ctx.strokeStyle = `rgba(20, 16, 10, ${0.5 * fade})`;
                for (let yy = y + 26; yy < H; yy += 26) { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + p.w, yy); ctx.stroke(); }
            });
            s.dust.forEach(d => {
                if (t < d.d) return;
                const y = d.y - (t - d.d) * d.v;
                ctx.fillStyle = `rgba(200, 176, 120, ${0.5 * fade * Math.max(0, 1 - (t - d.d) / 2.6)})`;
                ctx.beginPath(); ctx.arc(d.x, y, d.r, 0, Math.PI * 2); ctx.fill();
            });
            const ln = fxEase((t - 1.6) / 0.9);
            if (ln > 0) {
                ctx.strokeStyle = `rgba(232, 212, 160, ${0.8 * fade})`;
                ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(W / 2 - ln * W / 2, H * 0.62); ctx.lineTo(W / 2 + ln * W / 2, H * 0.62); ctx.stroke();
            }
            document.body.classList.toggle('fx-shake', t > 0.3 && t < 1.6);
        }

        function fxDrawCore(ctx, W, H, t, s) {
            const cx = W / 2, cy = H * 0.32, R = Math.max(W, H) * 0.55;
            const fade = t > 3.6 ? Math.max(0, (4.2 - t) / 0.6) : 1;
            ctx.fillStyle = `rgba(12, 10, 6, ${0.55 * Math.min(1, t / 0.4) * fade})`;
            ctx.fillRect(0, 0, W, H);
            if (!s.pts) s.pts = Array.from({ length: 170 }, () => ({ a: fxRand(0, 6.28), d: fxRand(0.35, 1) * R, w: fxRand(1.2, 3.2), r: fxRand(1.2, 2.8) }));
            const conv = fxEase(t / 1.7);
            s.pts.forEach(p => {
                const dist = p.d * (1 - conv), ang = p.a + conv * p.w * 2.4;
                const x = cx + Math.cos(ang) * dist, y = cy + Math.sin(ang) * dist;
                ctx.fillStyle = `rgba(232, 204, 120, ${0.9 * fade * (t < 1.9 ? 1 : Math.max(0, 1 - (t - 1.9) / 0.4))})`;
                ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
            });
            const orb = fxEase((t - 1.2) / 0.9);
            if (orb > 0) {
                const rr = 26 + orb * 62 + Math.sin(t * 9) * 3 * orb;
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr * 2.2);
                g.addColorStop(0, `rgba(255, 246, 214, ${0.95 * fade})`);
                g.addColorStop(0.35, `rgba(240, 200, 100, ${0.85 * fade})`);
                g.addColorStop(1, 'rgba(200, 150, 60, 0)');
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(cx, cy, rr * 2.2, 0, Math.PI * 2); ctx.fill();
            }
            [2.0, 2.45, 2.9].forEach((t0, i) => {
                const k = (t - t0) / 1.1;
                if (k <= 0 || k >= 1) return;
                ctx.strokeStyle = `rgba(232, 204, 120, ${0.7 * (1 - k) * fade})`;
                ctx.lineWidth = 4 - i;
                ctx.beginPath(); ctx.arc(cx, cy, 60 + fxEase(k) * Math.max(W, H) * 0.42, 0, Math.PI * 2); ctx.stroke();
            });
            if (t > 2.0) {
                if (!s.spark) s.spark = Array.from({ length: 40 }, () => ({ a: fxRand(0, 6.28), v: fxRand(0.2, 0.8), r: fxRand(1.5, 3.5) }));
                s.spark.forEach(sp => {
                    const k = Math.min(1, (t - 2.0) / 1.6);
                    ctx.fillStyle = `rgba(255, 236, 170, ${0.9 * (1 - k) * fade})`;
                    ctx.beginPath(); ctx.arc(cx + Math.cos(sp.a) * fxEase(k) * R * sp.v, cy + Math.sin(sp.a) * fxEase(k) * R * sp.v, sp.r, 0, Math.PI * 2); ctx.fill();
                });
            }
        }

        function fxDrawNascent(ctx, W, H, t, s) {
            const cx = W / 2, base = H * 0.86;
            const fade = t > 3.7 ? Math.max(0, (4.4 - t) / 0.7) : 1;
            const bg = ctx.createRadialGradient(cx, H * 0.5, 0, cx, H * 0.5, Math.max(W, H) * 0.7);
            bg.addColorStop(0, `rgba(20, 44, 46, ${0.55 * fade * Math.min(1, t / 0.5)})`);
            bg.addColorStop(1, `rgba(6, 12, 14, ${0.85 * fade * Math.min(1, t / 0.5)})`);
            ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
            for (let k = 0; k < 3; k++) {
                const pk = (t - k * 0.35) / 1.5;
                if (pk <= 0 || pk >= 1) continue;
                ctx.strokeStyle = `rgba(160, 226, 216, ${0.6 * (1 - pk) * fade})`;
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.ellipse(cx, base, 30 + pk * 160, 8 + pk * 34, 0, 0, Math.PI * 2); ctx.stroke();
            }
            const rise = fxEase((t - 0.5) / 2.1);
            const sy = base - rise * (base - H * 0.3), sx = cx + Math.sin(t * 2.6) * 14 * rise;
            if (!s.wisps) s.wisps = [];
            if (t > 0.5 && t < 3.2) for (let i = 0; i < 2; i++) s.wisps.push({ x: sx + fxRand(-10, 10), y: sy + fxRand(8, 26), vx: fxRand(-14, 14), vy: fxRand(10, 40), r: fxRand(2, 5), born: t });
            s.wisps = s.wisps.filter(w => t - w.born < 1.2);
            s.wisps.forEach(w => {
                const a = 1 - (t - w.born) / 1.2;
                ctx.fillStyle = `rgba(190, 240, 230, ${0.55 * a * fade})`;
                ctx.beginPath(); ctx.arc(w.x + w.vx * (t - w.born), w.y + w.vy * (t - w.born), w.r * a + 1, 0, Math.PI * 2); ctx.fill();
            });
            if (t > 0.5) {
                const sc = 0.6 + 0.4 * rise;
                ctx.save();
                ctx.shadowColor = 'rgba(170, 245, 232, 0.95)';
                ctx.shadowBlur = 46 * fade;
                const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 60 * sc);
                g.addColorStop(0, `rgba(255, 255, 255, ${0.95 * fade})`);
                g.addColorStop(1, `rgba(150, 230, 220, ${0.6 * fade})`);
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(sx, sy - 26 * sc, 17 * sc, 0, Math.PI * 2); ctx.fill();          // 头
                ctx.beginPath(); ctx.ellipse(sx, sy + 4 * sc, 13 * sc, 22 * sc, 0, 0, Math.PI * 2); ctx.fill();   // 身
                ctx.restore();
            }
            const bk = (t - 2.7) / 0.9;
            if (bk > 0 && bk < 1) {
                ctx.strokeStyle = `rgba(210, 255, 246, ${0.9 * (1 - bk)})`;
                ctx.lineWidth = 5 * (1 - bk) + 1;
                ctx.beginPath(); ctx.arc(sx, H * 0.3, 40 + fxEase(bk) * Math.max(W, H) * 0.5, 0, Math.PI * 2); ctx.stroke();
                ctx.fillStyle = `rgba(230, 255, 250, ${0.35 * (1 - bk)})`; ctx.fillRect(0, 0, W, H);
            }
        }

        function fxDrawLaw(ctx, W, H, t, s) {
            const cx = W / 2, cy = H * 0.32, R = Math.min(W, H) * 0.2;
            const fade = t > 3.9 ? Math.max(0, (4.6 - t) / 0.7) : 1;
            ctx.fillStyle = `rgba(8, 8, 14, ${0.72 * Math.min(1, t / 0.3) * fade})`;
            ctx.fillRect(0, 0, W, H);
            const flashes = [[0.12, 0.7], [0.85, 0.55], [1.5, 0.4]];
            flashes.forEach(([t0, a]) => {
                const k = (t - t0) / 0.35;
                if (k > 0 && k < 1) { ctx.fillStyle = `rgba(230, 236, 255, ${a * (1 - k)})`; ctx.fillRect(0, 0, W, H); }
            });
            if (!s.bolts) s.bolts = flashes.map(([t0]) => ({ t0, list: Array.from({ length: 3 }, () => {
                let x = fxRand(W * 0.15, W * 0.85), y = 0; const pts = [[x, y]];
                const endY = fxRand(H * 0.55, H * 0.9);
                while (y < endY) { y += fxRand(30, 70); x += fxRand(-40, 40); pts.push([x, y]); }
                return pts;
            }) }));
            s.bolts.forEach(b => {
                const k = (t - b.t0) / 0.28;
                if (k <= 0 || k >= 1) return;
                b.list.forEach(pts => {
                    ctx.strokeStyle = `rgba(210, 220, 255, ${1 - k})`;
                    ctx.lineWidth = 3;
                    ctx.shadowColor = 'rgba(160, 180, 255, 0.9)'; ctx.shadowBlur = 18;
                    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
                    ctx.shadowBlur = 0;
                });
            });
            const grow = fxEase((t - 0.5) / 1.2);
            if (grow > 0) {
                const rr = R * grow;
                ctx.strokeStyle = `rgba(200, 190, 230, ${0.55 * fade})`;
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(cx, cy, rr * 0.62, 0, Math.PI * 2); ctx.stroke();
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr * 0.9);
                g.addColorStop(0, `rgba(230, 226, 255, ${0.35 * fade})`);
                g.addColorStop(1, 'rgba(120, 110, 180, 0)');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rr * 0.9, 0, Math.PI * 2); ctx.fill();
                ctx.font = `bold ${Math.round(Math.min(W, H) * 0.06)}px KaiTi, STKaiti, serif`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                LAW_RUNES.forEach(([ch, col], i) => {
                    const a = (i / 8) * Math.PI * 2 + t * 0.9;
                    ctx.save();
                    ctx.shadowColor = col; ctx.shadowBlur = 16;
                    ctx.fillStyle = col;
                    ctx.globalAlpha = grow * fade;
                    ctx.fillText(ch, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
                    ctx.restore();
                });
            }
            const bk = (t - 2.9) / 1.0;
            if (bk > 0 && bk < 1) {
                ctx.strokeStyle = `rgba(230, 226, 255, ${0.9 * (1 - bk)})`;
                ctx.lineWidth = 6 * (1 - bk) + 1;
                ctx.beginPath(); ctx.arc(cx, cy, R + fxEase(bk) * Math.max(W, H) * 0.6, 0, Math.PI * 2); ctx.stroke();
            }
            document.body.classList.toggle('fx-shake', t < 1.9);
        }

        const FX_DRAWERS = { minor: fxDrawMinor, foundation: fxDrawFoundation, core: fxDrawCore, nascent: fxDrawNascent, law: fxDrawLaw };

        // 播放突破特效：newRealmIndex = 突破后的境界索引；major = 是否大境界突破
        function playBreakthroughEffect(newRealmIndex, major) {
            if (gameState.settings && gameState.settings.breakthroughFx === false) return;
            stopBreakthroughFx();
            const realmName = getRealmName(newRealmIndex);
            const cfg = major ? (BREAKTHROUGH_FX[newRealmIndex] || { name: realmName.slice(0, 2), line: '大道更进一步', kind: 'core', dur: 4.2 }) : null;
            const dur = major ? cfg.dur : 1.6;
            const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const el = document.createElement('div');
            el.className = 'fx-overlay ' + (major ? 'fx-major fx-' + cfg.kind : 'fx-minor') + (reduce ? ' fx-reduced' : '');
            el.setAttribute('aria-hidden', 'true');
            el.innerHTML = (reduce ? '' : '<canvas class="fx-canvas"></canvas>') + (major
                ? `<div class="fx-text"><div class="fx-title">${cfg.name.split('').join(' ')}</div><div class="fx-sub">${realmName} · ${cfg.line}</div><div class="fx-skip">点击任意处跳过</div></div>`
                : `<div class="fx-text"><div class="fx-title">突 破</div><div class="fx-sub">${realmName}</div><div class="fx-seal">破</div></div>`);
            document.body.appendChild(el);
            fxState = { el, raf: 0, timer: 0, draw: null, dur };
            if (major) el.addEventListener('click', stopBreakthroughFx);
            if (reduce) {
                fxState.timer = setTimeout(stopBreakthroughFx, major ? 2600 : 1600);
                return;
            }
            const canvas = el.querySelector('canvas');
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            const W = window.innerWidth, H = window.innerHeight;
            canvas.width = W * dpr; canvas.height = H * dpr;
            const ctx = canvas.getContext('2d');
            const drawer = FX_DRAWERS[major ? cfg.kind : 'minor'];
            const s = {};
            fxState.draw = t => {
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, W, H);
                ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic'; ctx.globalAlpha = 1; ctx.shadowBlur = 0;
                drawer(ctx, W, H, t, s);
            };
            const start = performance.now();
            const frame = now => {
                if (!fxState) return;
                const t = (now - start) / 1000;
                if (t >= dur) { stopBreakthroughFx(); return; }
                fxState.draw(t);
                fxState.raf = requestAnimationFrame(frame);
            };
            fxState.raf = requestAnimationFrame(frame);
            // 页面在后台时 rAF 会被暂停，兜底：到点强制清理
            fxState.timer = setTimeout(stopBreakthroughFx, (dur + 1) * 1000);
        }

        function performBreakthrough() {
            const nextRealmIndex = gameState.player.realmIndex + 1;
            if (!GAME_CONFIG.realms[nextRealmIndex]) return;
            const wasMajor = gameState.player.realmIndex % 4 === 0 && gameState.player.realmIndex > 0;   // 从大境界圆满突破
            gameState.player.realmIndex = nextRealmIndex;
            gameState.player.cultivationXP = 0;

            const newRealm = GAME_CONFIG.realms[nextRealmIndex];
            showNotification(`突破成功！当前境界：${newRealm.name}`, '#6f9c8a', 'success');

            closeBreakthroughModal();
            updateUI();
            saveGame();
            playBreakthroughEffect(nextRealmIndex, wasMajor);
        }

        function performMajorBreakthrough() {
            const realmIndex = gameState.player.realmIndex;
            const requirement = MAJOR_BREAKTHROUGH_PILLS[realmIndex];

            if (!requirement) {
                // 没有配置丹药需求，直接突破（兼容未来扩展）
                performBreakthrough();
                return;
            }

            // 检查背包中是否有对应丹药
            const pillInInventory = gameState.player.inventory.find(
                item => item.id === requirement.pillId
            );
            const currentQty = pillInInventory ? pillInInventory.qty : 0;

            if (currentQty < requirement.qty) {
                showNotification(
                    `突破需要 ${requirement.pillName} ×${requirement.qty}（当前 ${currentQty}）`,
                    '#c4483a',
                    'error'
                );
                return;
            }

            // 消耗丹药
            pillInInventory.qty -= requirement.qty;
            if (pillInInventory.qty <= 0) {
                const idx = gameState.player.inventory.indexOf(pillInInventory);
                gameState.player.inventory.splice(idx, 1);
            }

            // 执行突破
            performBreakthrough();

            // 额外通知：消耗了丹药
            showNotification(`消耗了 ${requirement.pillName} ×${requirement.qty}`, '#7d9bb5', 'info');
        }

        // ==================== 存档系统 ====================
        function saveGame() {
            if (!currentSlot) return;   // 还没选择存档槽位（存档选择界面）时不保存
            gameState.lastSaveTime = Date.now();
            gameState.lastActiveTime = gameState.lastSaveTime;
            try {
                localStorage.setItem(slotKey(currentSlot), JSON.stringify(gameState));
            } catch (e) {
                console.error('Failed to save game:', e);
                if (e.name === 'QuotaExceededError') {
                    showNotification('📦 存储空间已满，无法保存存档', '#c4483a', 'error');
                } else if (e.name === 'SecurityError') {
                    showNotification('🔒 本地存储被禁用（在data: URL中）- 请下载HTML文件到本地打开', '#ff9800', 'error');
                }
            }
        }

        function migrateGameData() {
            // 版本迁移函数：自动更新旧数据以支持新配方
            if (!gameState.version) gameState.version = 0;
            invalidateLawTotals();   // 读档 / 导入后重新计算悟道法则加成
            gameState.workSpeedMultiplier = 1;   // 旧版把孤儿的 5% 存在这里且与灵玉脱钩；现在只由装备的灵玉提供（getWorkSpeedMultiplier）
            migrateEquipmentSlots();
            if (gameState.tutorialSeen === undefined) gameState.tutorialSeen = true;   // 已有存档的玩家不再自动弹出引导

            const currentVersion = 2;  // P4：属性系统重写 + 初始化BugFix

            // 版本1→2 迁移
            if (gameState.version < 1) {
                // 从GAME_CONFIG更新所有技能配方
                Object.keys(GAME_CONFIG.skills).forEach(skillName => {
                    if (gameState.skills[skillName] && GAME_CONFIG.skills[skillName].recipes) {
                        gameState.skills[skillName].recipes = JSON.parse(JSON.stringify(GAME_CONFIG.skills[skillName].recipes));
                    }
                });
            }

            // 版本2：属性系统重新计算（使用新的境界倍数）
            if (gameState.version < 2) {
                calculateStats(); // 重新计算属性使用新系统
                console.log('✅ 游戏数据已升级至v2（属性系统已更新）');
            }

            if (gameState.version < currentVersion) {
                gameState.version = currentVersion;
            }

            // 新增技能（如丹火/神识）自动补进旧存档，无需清缓存；
            // 配方由配置派生，每次读档都按最新配置重建（保留技能等级和经验），新增/调整配方对旧存档立即生效
            Object.keys(GAME_CONFIG.skills).forEach(skillName => {
                if (!gameState.skills[skillName]) {
                    gameState.skills[skillName] = JSON.parse(JSON.stringify(GAME_CONFIG.skills[skillName]));
                } else if (GAME_CONFIG.skills[skillName].recipes) {
                    gameState.skills[skillName].recipes = JSON.parse(JSON.stringify(GAME_CONFIG.skills[skillName].recipes));
                }
                if (!gameState.skills[skillName].mastery) gameState.skills[skillName].mastery = { recipes: {}, pool: 0 };
            });
            Object.keys(GAME_CONFIG.dungeons).forEach(dungeonId => {
                if (!gameState.dungeons[dungeonId]) gameState.dungeons[dungeonId] = { completed: false };
            });
            // 战斗区域/秘境的行动表由配置派生，读档时重建，保证新增内容对旧存档生效
            initializeBattleActions();
            initializeDungeons();
            // 境界索引越界（曾经在最高境界突破会写入不存在的境界）时修回最高境界
            const maxRealmIndex = GAME_CONFIG.realms.length - 1;
            if (!(gameState.player.realmIndex >= 0) || gameState.player.realmIndex > maxRealmIndex) {
                gameState.player.realmIndex = maxRealmIndex;
                gameState.player.cultivationXP = Math.min(gameState.player.cultivationXP || 0, GAME_CONFIG.realms[maxRealmIndex].nextReq);
            }

            // 功法：修正曾经写错的商城功法id，并补全「已拥有功法」记录
            if (gameState.player.currentArt === 'void_art') gameState.player.currentArt = 'soul_art';
            if (!CULTIVATION_ARTS[gameState.player.currentArt]) {
                gameState.player.currentArt = gameState.player.origin === 'disciple' ? 'advanced_art' : 'basic_art';
            }
            if (!Array.isArray(gameState.player.ownedArts)) {
                const originArt = gameState.player.origin === 'disciple' ? 'advanced_art' : 'basic_art';
                gameState.player.ownedArts = [...new Set([originArt, gameState.player.currentArt])];
            }
            if (gameState.player.temperLevel === undefined) gameState.player.temperLevel = 0;
            if (gameState.player.scoutBonus === undefined) gameState.player.scoutBonus = false;

            // 确保equipment字段存在（向后兼容）
            if (!gameState.player.equipment) {
                gameState.player.equipment = { weapon: null, armor: null, jewelry: [] };
            }
            if (!gameState.player.inventoryCapacity) gameState.player.inventoryCapacity = 50;
            if (!gameState.player.farmingSlots) gameState.player.farmingSlots = 1;
            if (!gameState.player.boughtUpgrades) gameState.player.boughtUpgrades = [];
            if (!gameState.player.stats) {
                gameState.player.stats = { hp: 100, atk: 10, def: 5, spd: 10 };
            }
            // P2功能：用户设置初始化
            // 补全设置默认值（旧存档没有字体大小 / 通知停留时间；原「音效」设置从未有实际作用，已删除）
            gameState.settings = Object.assign({
                maxOfflineHours: 24,
                enableNotifications: true,
                fontScale: 100,
                breakthroughFx: true,
                notificationSeconds: 2,
                theme: 'dark'
            }, gameState.settings || {});
            delete gameState.settings.enableSoundEffects;
        }

        // ---- 多存档（最多 3 个槽位）----
        // 每个槽位独立存在 localStorage['xiuxianIdleGame_slot1..3']；进入游戏后当前槽位记在 currentSlot。
        // 切换存档 / 删除存档都会重新载入页面，保证不同存档的状态互不串扰。
        const SAVE_SLOT_COUNT = 3;
        const LEGACY_SAVE_KEY = 'xiuxianIdleGame';   // 旧版单存档键，首次运行时迁移到槽位 1
        let currentSlot = null;

        function slotKey(n) { return `${LEGACY_SAVE_KEY}_slot${n}`; }

        function readSlot(n) {
            try {
                const raw = localStorage.getItem(slotKey(n));
                return raw ? raw : null;
            } catch (e) {
                return null;
            }
        }

        // 旧版单存档迁移：只在三个槽位都为空、且存在旧存档时执行一次
        function migrateLegacySave() {
            try {
                const legacy = localStorage.getItem(LEGACY_SAVE_KEY);
                if (!legacy) return;
                const anySlot = [1, 2, 3].some(n => localStorage.getItem(slotKey(n)));
                if (!anySlot) localStorage.setItem(slotKey(1), legacy);
                localStorage.removeItem(LEGACY_SAVE_KEY);
            } catch (e) { /* 存储不可用时忽略 */ }
        }

        // 渲染存档选择界面
        function renderSlotSelect() {
            const box = document.getElementById('slotSelect');
            if (!box) return;
            let html = '';
            for (let n = 1; n <= SAVE_SLOT_COUNT; n++) {
                const raw = readSlot(n);
                if (!raw) {
                    html += `<div class="slot-card empty" onclick="openSlot(${n})">
                        <div class="slot-title">存档 ${n}</div>
                        <div class="slot-info">＋ 新建角色</div>
                    </div>`;
                    continue;
                }
                let info;
                try {
                    const d = JSON.parse(raw);
                    const realm = GAME_CONFIG.realms[d.player.realmIndex] ? getRealmName(d.player.realmIndex) : '未知境界';
                    const when = d.lastSaveTime ? new Date(d.lastSaveTime).toLocaleString() : '—';
                    info = `<div class="slot-name">${d.player.name || '无名'} · ${realm}</div>
                        <div class="slot-info">灵石 ${d.player.coins} · 最后保存 ${when}</div>`;
                } catch (e) {
                    info = '<div class="slot-name">⚠️ 存档已损坏</div><div class="slot-info">可以删除后重新创建</div>';
                }
                html += `<div class="slot-card" onclick="openSlot(${n})">
                    <div class="slot-title">存档 ${n}</div>
                    ${info}
                    <button class="slot-delete" onclick="event.stopPropagation(); deleteSlot(${n})" title="删除此存档" aria-label="删除此存档">🗑</button>
                </div>`;
            }
            box.innerHTML = html;
        }

        function showSlotSelect() {
            document.getElementById('createSection').style.display = 'none';
            document.getElementById('slotSelect').style.display = '';
            document.getElementById('slotHint').style.display = '';
            renderSlotSelect();
        }

        function deleteSlot(n) {
            if (!confirm(`确定要删除存档 ${n} 吗？此存档的所有进度将永久丢失！`)) return;
            try { localStorage.removeItem(slotKey(n)); } catch (e) { /* 忽略 */ }
            renderSlotSelect();
        }

        // 点击槽位：有存档则进入，没有则打开创建角色界面（新角色自动播放新手引导）
        function openSlot(n) {
            currentSlot = n;
            const raw = readSlot(n);
            if (raw) {
                enterSavedGame(raw);
            } else {
                document.getElementById('slotSelect').style.display = 'none';
                document.getElementById('slotHint').style.display = 'none';
                document.getElementById('createSection').style.display = '';
                document.getElementById('createSlotLabel').textContent = `存档 ${n}`;
            }
        }

        // 游戏内：保存后回到存档选择（重新载入页面以彻底清空当前存档状态）
        function backToSlotSelect() {
            if (gameRunning) saveGame();
            gameRunning = false;
            location.reload();
        }

        function enterSavedGame(raw) {
            let loaded;
            try {
                loaded = JSON.parse(raw);
            } catch (e) {
                alert('存档已损坏，无法读取');
                currentSlot = null;
                return;
            }
            gameState = loaded;

            // 数据迁移：自动更新旧数据（P2功能）
            migrateGameData();

            // 处理离线时间
            handleOfflineTime();

            // 显示游戏界面
            document.getElementById('startScreen').classList.remove('show');
            document.getElementById('gameScreen').classList.remove('hidden');
            startGameTick();
            switchPanel('cultivation');
            updateUI();
            calculateStats();
            updateStatsDisplay();
            gameRunning = true;
            updateSlotLabel();
            applyDisplaySettings();

            startAutoSave();

            // 新角色看引导时刷新了页面：引导还没看完，继续弹出
            if (gameState.tutorialSeen === false) setTimeout(() => showTutorial(0), 300);
        }

        function updateSlotLabel() {
            const el = document.getElementById('currentSlotLabel');
            if (el) el.textContent = currentSlot ? `当前：存档 ${currentSlot}（${gameState.player.name}）` : '';
        }

        // 页面加载：迁移旧存档，显示存档选择界面
        function loadGame() {
            let storageAvailable = true;
            try {
                localStorage.getItem(LEGACY_SAVE_KEY);
            } catch (e) {
                // localStorage unavailable - 在data: URL中会发生
                storageAvailable = false;
            }
            migrateLegacySave();
            document.getElementById('startScreen').classList.add('show');
            document.getElementById('gameScreen').classList.add('hidden');
            showSlotSelect();
            if (!storageAvailable) {
                showNotification('💾 本地存储不可用 - 使用本地HTML文件打开游戏以保存存档', '#ff9800', 'normal');
            }
        }

        // quietUnder：离开时间小于该秒数且无特殊情况时，只结算收益、不弹结算窗（用于切换标签页）
        function handleOfflineTime(quietUnder = 0) {
            const now = Date.now();
            const lastActive = gameState.lastActiveTime;
            const offlineSeconds = (now - lastActive) / 1000;

            // 分身的离线结算（与主角行动无关，先结算）
            settleCloneOffline(offlineSeconds);
            settleFarmPlotOffline(offlineSeconds);

            // 战斗/秘境无法在离线时进行，重新打开页面时战斗界面已丢失，直接中断
            const savedAction = gameState.currentAction;

            // 开了自动战斗托管的普通战斗：离线期间按真实战斗规则模拟，之后接着在线续战
            const autoCfg = getAutoBattle();
            if (savedAction && savedAction.isBattle && autoCfg.enabled) {
                const areaAction = getAction('battle', savedAction.action);
                if (areaAction && isBattleAreaUnlocked(areaAction) && offlineSeconds < 10) {
                    // 刷新页面等极短离开：直接开一场新战斗续上
                    gameState.battles = null;
                    gameState.lastActiveTime = now;
                    enterBattleArea(savedAction.action, true);
                    return;
                }
                if (areaAction && isBattleAreaUnlocked(areaAction)) {
                    const maxOffline = (gameState.settings?.maxOfflineHours || 24) * 60 * 60;
                    const budget = Math.min(offlineSeconds, maxOffline);
                    gameState.battles = null;
                    gameState.currentAction = null;
                    gameState.currentActionProgress = 0;
                    const res = runOfflineAutoBattle(savedAction.action, budget);
                    gameState.lastActiveTime = now;
                    const mins = Math.max(1, Math.round(res.elapsed / 60));
                    const msg = `🤖 自动战斗 ${mins} 分钟：共 ${res.fights} 场，胜 ${res.wins} 负 ${res.losses}\n+${res.coins}灵石 +${res.exp}战斗经验` +
                        (res.stopped ? `\n⚠️ 连续 ${AUTO_BATTLE_MAX_LOSS_STREAK} 场未能取胜，已停止（请检查装备与食物）` : '');
                    showNotification(msg + (res.died ? `
💀 第 ${res.fights} 场被击败，循环战斗已结束（生命恢复至50%，请检查装备与食物）` : ''), (res.stopped || res.died) ? '#c98a3e' : '#6fa980');
                    if (!res.stopped && !res.died) enterBattleArea(savedAction.action, true);
                    renderAutoBattleBar();
                    saveGame();
                    return;
                }
            }

            if (savedAction && (savedAction.isBattle || savedAction.isDungeon)) {
                if (savedAction.isDungeon) {
                    resetBattleState('idle');
                } else {
                    gameState.battles = null;
                    gameState.currentAction = null;
                    gameState.currentActionProgress = 0;
                    const battleContainer = document.getElementById('battleContainer');
                    if (battleContainer) battleContainer.classList.add('hidden');
                }
                gameState.lastActiveTime = now;
                showNotification('⚔️ 上次的战斗因离开游戏而中断', '#c98a3e');
                return;
            }

            if (offlineSeconds < 1 || !gameState.currentAction) {
                gameState.lastActiveTime = now;
                return;
            }

            // 计算离线收益（根据设置限制最多离线时间）
            const maxOfflineSeconds = (gameState.settings?.maxOfflineHours || 24) * 60 * 60;
            const actualOfflineSeconds = Math.min(offlineSeconds, maxOfflineSeconds);

            // P2修复：检查是否超过离线上限
            const exceedsLimit = offlineSeconds > maxOfflineSeconds;
            const wastedHours = exceedsLimit ? Math.floor((offlineSeconds - maxOfflineSeconds) / 3600) : 0;

            const action = getAction(gameState.currentAction.skill, gameState.currentAction.action);
            if (!action || !action.output) {
                gameState.currentAction = null;
                gameState.lastActiveTime = now;
                return;
            }
            // 应用工作速度和功法倍率（修炼特殊处理）
            const duration = getAdjustedDuration(gameState.currentAction.skill, action.duration, gameState.currentAction.action);
            if (!(duration > 0)) {
                gameState.lastActiveTime = now;
                return;
            }
            let completions = Math.floor(actualOfflineSeconds / duration);

            // 需要材料的配方：完成次数受材料库存限制，并扣除离线消耗
            let materialsRanOut = false;
            if (action.requires) {
                Object.entries(action.requires).forEach(([itemId, qty]) => {
                    const owned = (gameState.player.inventory.find(i => i.id === itemId) || { qty: 0 }).qty;
                    const affordable = Math.floor(owned / qty);
                    if (affordable < completions) {
                        completions = affordable;
                        materialsRanOut = true;
                    }
                });
                // 「节省材料」特效：按概率折算实际消耗（库存判断仍按全额，偏保守）
                const saveRate = Math.min(0.9, getSkillMod('save', savedAction.skill) + getMasteryBonus(savedAction.skill, savedAction.action).save);
                Object.entries(action.requires).forEach(([itemId, qty]) => {
                    if (completions > 0) consumeItem(itemId, Math.round(qty * completions * (1 - saveRate)));
                });
                if (materialsRanOut) gameState.currentAction = null;
            }

            let offlineRewards = {
                coins: 0,
                items: [],
                cultivation: 0,
                skillExp: {}
            };

            // 与在线 completeAction 一致：先对单次产出应用技能等级加成，再乘以完成次数
            const perAction = JSON.parse(JSON.stringify(action.output));
            applySkillLevelBonus(savedAction.skill, perAction);
            offlineRewards.coins = (perAction.coins || 0) * completions;
            offlineRewards.cultivation = (perAction.cultivation || 0) * completions;
            // 「产出翻倍」特效：按概率折算（期望值）
            const doubleRate = getSkillMod('double', savedAction.skill) + getMasteryBonus(savedAction.skill, savedAction.action).double;
            (perAction.items || []).forEach(item => {
                offlineRewards.items.push({ id: item.id, qty: Math.floor(item.qty * completions * (1 + doubleRate) + 1e-9) });
            });
            if (perAction.skill && perAction.exp && completions > 0) {
                offlineRewards.skillExp[perAction.skill] = perAction.exp * completions;
            }
            offlineRewards.items = offlineRewards.items.filter(item => item.qty > 0);

            // 应用离线奖励
            gameState.player.coins += offlineRewards.coins;

            // 处理修为，检查是否会超过本境界上限
            if (offlineRewards.cultivation > 0) {
                const currentRealm = GAME_CONFIG.realms[gameState.player.realmIndex];
                const realmCapacity = currentRealm.nextReq;

                // 计算本应获得的修为
                const baseCultivation = offlineRewards.cultivation;

                // 计算实际能增加的修为（不超过上限）
                const remainingCapacity = realmCapacity - gameState.player.cultivationXP;
                const actualCultivation = Math.min(baseCultivation, remainingCapacity);

                // 计算溢出部分
                const overflowCultivation = Math.max(0, baseCultivation - actualCultivation);

                // 应用修为
                gameState.player.cultivationXP += actualCultivation;

                // 溢出转灵石 (比例 100:1)
                const overflowCoins = Math.floor(overflowCultivation / 100);
                if (overflowCoins > 0) {
                    gameState.player.coins += overflowCoins;
                    // 标记溢出信息用于显示
                    offlineRewards.cultivationOverflow = overflowCultivation;
                    offlineRewards.overflowCoins = overflowCoins;
                }

                // 更新记录的修为值
                offlineRewards.cultivation = actualCultivation;

                // 如果修为已满，停止行动
                if (gameState.player.cultivationXP >= realmCapacity) {
                    gameState.currentAction = null;
                }
            }

            offlineRewards.items.forEach(item => addToInventory(item.id, item.qty));
            Object.entries(offlineRewards.skillExp).forEach(([skill, exp]) => {
                addSkillExp(skill, exp, savedAction.action);
            });
            // 离线期间的配方精通经验（按完成次数 × 配方基础耗时）
            if (LIFE_SKILLS.includes(savedAction.skill) && completions > 0) {
                addMasteryExp(savedAction.skill, savedAction.action, action.duration * completions);
            }
            // 离线期间的悟道：按完成次数增加法则经验，到上限则停止
            if (savedAction.skill === 'wudao' && completions > 0 && addLawExp(savedAction.action, completions)) {
                gameState.currentAction = null;
            }

            gameState.lastActiveTime = now;

            // 检查修为是否达到上限
            const cultivationCapped = gameState.player.cultivationXP >= GAME_CONFIG.realms[gameState.player.realmIndex].nextReq;

            // 没有任何收益（例如刷新页面只离开几秒）时不弹结算窗
            const earnedAnything = offlineRewards.coins > 0 || offlineRewards.cultivation > 0 ||
                offlineRewards.items.length > 0 || Object.keys(offlineRewards.skillExp).length > 0 ||
                (offlineRewards.overflowCoins || 0) > 0;
            const quiet = offlineSeconds < quietUnder && !exceedsLimit && !cultivationCapped;
            if (quiet) {
                if (earnedAnything) showNotification(`⏱️ 离开${Math.floor(offlineSeconds)}秒，已结算期间收益`, '#6fa980');
            } else if (earnedAnything || exceedsLimit || cultivationCapped) {
                // P2修复：显示离线结算（传入超限标志）
                showOfflineModal(offlineRewards, actualOfflineSeconds, cultivationCapped, exceedsLimit, wastedHours);
            }
        }

        function showOfflineModal(rewards, offlineSeconds, cultivationCapped = false, exceedsLimit = false, wastedHours = 0) {
            const hours = Math.floor(offlineSeconds / 3600);
            const minutes = Math.floor((offlineSeconds % 3600) / 60);
            const maxHours = gameState.settings?.maxOfflineHours || 24;

            let content = `<div class="stat-panel">
                <div class="stat-row">
                    <span class="stat-label">离线时长:</span>
                    <span class="stat-value">${hours}小时${minutes}分钟</span>
                </div>`;

            // P2修复：显示超限警告
            if (exceedsLimit) {
                content += `<div class="stat-row" style="background: rgba(196,72,58,0.1); border: 1px solid #c4483a; padding: 8px; margin: 5px 0;">
                    <span class="stat-label" style="color: #c4483a;">⚠️ 离线超过${maxHours}小时上限</span>
                </div>
                <div class="stat-row" style="background: rgba(196,72,58,0.1); border: 1px solid #c4483a; padding: 8px; margin: 5px 0;">
                    <span class="stat-label" style="color: #999;">✗ 超时${wastedHours}小时，奖励已达上限</span>
                </div>`;
            }

            if (rewards.coins > 0) {
                content += `<div class="stat-row">
                    <span class="stat-label">获得灵石:</span>
                    <span class="stat-value">+${rewards.coins}</span>
                </div>`;
            }

            if (rewards.cultivation > 0) {
                content += `<div class="stat-row">
                    <span class="stat-label">获得修为:</span>
                    <span class="stat-value">+${rewards.cultivation}</span>
                </div>`;
            }

            // 显示修为溢出转灵石
            if (rewards.cultivationOverflow && rewards.cultivationOverflow > 0) {
                content += `<div class="stat-row" style="background: rgba(201,138,62,0.1); border: 1px solid #c98a3e; padding: 8px; margin: 5px 0;">
                    <span class="stat-label">⚠️ 修为已达上限</span>
                </div>
                <div class="stat-row" style="background: rgba(201,138,62,0.1); border: 1px solid #c98a3e; padding: 8px; margin: 5px 0;">
                    <span class="stat-label">溢出部分:</span>
                    <span class="stat-value">+${rewards.cultivationOverflow}修为 → +${rewards.overflowCoins}灵石</span>
                </div>`;
            }

            if (rewards.items.length > 0) {
                content += `<div class="stat-row" style="flex-direction: column; align-items: flex-start;">
                    <span class="stat-label" style="margin-bottom: 10px;">获得物品:</span>`;
                rewards.items.forEach(item => {
                    const itemConfig = GAME_CONFIG.items[item.id];
                    content += `<span style="color: #6f9c8a;">  ${itemConfig.icon} ${itemConfig.name} x${item.qty}</span>`;
                });
                content += `</div>`;
            }

            content += `</div>`;

            // 检测是否满足突破条件（P1功能）
            const realm = GAME_CONFIG.realms[gameState.player.realmIndex];
            if (gameState.player.cultivationXP >= realm.nextReq) {
                content = `<div style="background: rgba(111,156,138,0.1); border: 2px solid #6f9c8a; border-radius: 4px; padding: 15px; margin-bottom: 15px;">
                    <div style="color: #6f9c8a; font-weight: bold; margin-bottom: 10px;">✨ 你已准备好突破！</div>
                    <button class="btn" onclick="showBreakthroughModal(); closeOfflineModal()" style="width: 100%; margin-bottom: 10px;">🌟 前往突破 🌟</button>
                </div>` + content;
            }

            document.getElementById('offlineContent').innerHTML = content;
            document.getElementById('offlineModal').classList.add('show');
        }

        function closeOfflineModal() {
            document.getElementById('offlineModal').classList.remove('show');
            updateUI();
        }

        // 功法切换模态框
        function showArtSwitchModal() {
            const listDiv = document.getElementById('artSwitchList');
            listDiv.innerHTML = '';

            // 出身功法 + 商城购买的功法
            const availableArts = (gameState.player.ownedArts || []).filter(key => CULTIVATION_ARTS[key]);

            // 只显示该角色拥有的功法
            availableArts.forEach(artKey => {
                const art = CULTIVATION_ARTS[artKey];
                if (!art) return;

                const isCurrentArt = gameState.player.currentArt === artKey;
                const itemDiv = document.createElement('div');
                itemDiv.style.cssText = `
                    background: ${isCurrentArt ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.1)'};
                    border: 1px solid ${isCurrentArt ? '#7fae9a' : '#7d9bb5'};
                    border-radius: 4px;
                    padding: 12px;
                    margin-bottom: 10px;
                    cursor: ${isCurrentArt ? 'default' : 'pointer'};
                `;

                const statusText = isCurrentArt ? '✓ 当前功法' : '点击切换';

                itemDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: start; gap: 10px;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; color: #c2a25f; font-size: 1em;">${art.name}</div>
                            <div style="font-size: 0.85em; color: #aaa; margin-top: 4px;">${art.description}</div>
                            <div style="font-size: 0.8em; color: #888; margin-top: 6px;">
                                修炼速度倍率：<span style="color: #7d9bb5;">${art.speedMultiplier.toFixed(2)}x</span>
                            </div>
                            ${describeEffects(art.effects).length ? `<div style="font-size: 0.8em; color: #6fa980; margin-top: 4px;">特效：${describeEffects(art.effects).join(' · ')}</div>` : ''}
                        </div>
                        <div style="text-align: right; color: ${isCurrentArt ? '#7fae9a' : '#888'}; font-size: 0.9em;">
                            ${statusText}
                        </div>
                    </div>
                `;

                if (!isCurrentArt) {
                    itemDiv.onclick = () => {
                        switchCultivationArt(artKey);
                        closeArtSwitchModal();
                    };
                }

                listDiv.appendChild(itemDiv);
            });

            document.getElementById('artSwitchModal').classList.add('show');
        }

        function closeArtSwitchModal() {
            document.getElementById('artSwitchModal').classList.remove('show');
        }

        // P3优化：克制系统教程函数
        function showCounterSystemModal() {
            fillRootEffectList();
            document.getElementById('counterSystemModal').classList.add('show');
        }

        function closeCounterSystemModal() {
            document.getElementById('counterSystemModal').classList.remove('show');
        }

        function switchCultivationArt(artKey) {
            if (!CULTIVATION_ARTS[artKey]) {
                showNotification('❌ 功法不存在', '#c4483a', 'error');
                return;
            }

            // 检查该角色是否拥有这个功法（出身功法或商城购买）
            if (!(gameState.player.ownedArts || []).includes(artKey)) {
                showNotification('🔒 你不拥有这个功法', '#c98a3e', 'normal');
                return;
            }

            // 如果已经是这个功法，不需要切换
            if (gameState.player.currentArt === artKey) {
                showNotification('ℹ️ 已经是这个功法', '#888888', 'normal');
                return;
            }

            gameState.player.currentArt = artKey;
            calculateStats();   // 功法特效可能改变属性
            updateArtDisplay();
            updateCultivationRecipes();
            showNotification(`✓ 已切换到 ${CULTIVATION_ARTS[artKey].name}`, '#7fae9a', 'success');
        }

        function updateArtDisplay() {
            const currentArt = CULTIVATION_ARTS[gameState.player.currentArt];
            if (currentArt) {
                // 更新当前功法显示
                const artDisplayDiv = document.querySelector('#currentArtDisplay');
                if (artDisplayDiv) {
                    artDisplayDiv.innerHTML = `
                        <div style="color: #c2a25f; font-weight: bold;">${currentArt.name}</div>
                        <div style="font-size: 0.8em; color: #aaa; margin-top: 4px;">速度倍率：<span style="color: #7d9bb5;">${currentArt.speedMultiplier.toFixed(1)}x</span></div>
                    `;
                }
                // 更新功法速度显示
                const artSpeedDisplay = document.getElementById('artSpeedDisplay');
                if (artSpeedDisplay) {
                    artSpeedDisplay.textContent = currentArt.speedMultiplier.toFixed(1);
                }
            }
        }

        // 存档含中文，btoa/atob 只支持 Latin1，需先转 UTF-8 字节
        function encodeSave(text) {
            let binary = '';
            new TextEncoder().encode(text).forEach(b => { binary += String.fromCharCode(b); });
            return btoa(binary);
        }

        function decodeSave(base64) {
            const binary = atob(base64.trim());
            return new TextDecoder().decode(Uint8Array.from(binary, c => c.charCodeAt(0)));
        }

        function exportSave() {
            saveGame();
            const code = encodeSave(JSON.stringify(gameState));
            const fallback = () => prompt('自动复制失败，请手动复制存档代码:', code);
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(
                    () => alert('存档已复制到剪贴板！'),
                    fallback
                );
            } else {
                fallback();
            }
        }

        function importSave() {
            const input = prompt('请粘贴存档代码:');
            if (!input) return;

            let loaded;
            try {
                loaded = JSON.parse(decodeSave(input));
            } catch (e) {
                alert('存档代码无效！');
                return;
            }
            if (!loaded || !loaded.player || !loaded.skills || !loaded.player.name) {
                alert('存档代码无效：缺少角色数据！');
                return;
            }

            gameState = loaded;
            migrateGameData();
            handleOfflineTime();
            document.getElementById('startScreen').classList.remove('show');
            document.getElementById('gameScreen').classList.remove('hidden');
            if (!gameRunning) {
                clearInterval(tickInterval);
                startGameTick();
                gameRunning = true;
            }
            switchPanel('cultivation');
            updateUI();
            calculateStats();
            updateStatsDisplay();
            saveGame();
            updateSlotLabel();
            alert('存档导入成功！（已覆盖当前存档）');
        }

        // 删除当前存档并回到存档选择界面
        function resetGame() {
            if (!currentSlot) return;
            if (confirm(`确定要删除当前存档（存档 ${currentSlot}）吗？此存档的所有进度将永久丢失！`)) {
                try { localStorage.removeItem(slotKey(currentSlot)); } catch (e) { /* 忽略 */ }
                gameRunning = false;   // 避免 beforeunload 把存档又写回去
                clearInterval(tickInterval);
                location.reload();
            }
        }

        // ==================== 可访问性：可点击的卡片 / 标签也能用键盘操作 ====================
        // 游戏里大量卡片是 <div onclick>：统一补上 role="button" 和 tabindex，Enter / 空格触发点击
        const CLICKABLE_SELECTOR = '.action-item, .slot-card, .law-card, .item-slot, .shop-item, .mobile-tab-item, .logo, #breakThroughBtn';
        function enhanceClickables(root = document) {
            root.querySelectorAll(CLICKABLE_SELECTOR).forEach(el => {
                if (el.tagName === 'BUTTON' || el.getAttribute('role')) return;
                if (el.onclick || el.hasAttribute('onclick')) {
                    el.setAttribute('role', 'button');
                    el.tabIndex = 0;
                }
            });
        }
        document.addEventListener('keydown', e => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="button"]')) {
                e.preventDefault();
                e.target.click();
            }
        });
        let clickablePending = false;
        new MutationObserver(mutations => {
            if (clickablePending || !mutations.some(m => [...m.addedNodes].some(n => n.nodeType === 1))) return;
            clickablePending = true;
            requestAnimationFrame(() => { clickablePending = false; enhanceClickables(); });
        }).observe(document.body, { childList: true, subtree: true });
        enhanceClickables();

        // ==================== 美术：彩色 emoji 统一染成褪色铜色 ====================
        // 把文字里的 emoji 包进 <span class="emo">，样式里用滤镜做成单色铜色，与整体色板一致
        const EMOJI_TEST = /\p{Extended_Pictographic}/u;
        const EMOJI_SPLIT = /(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*)/gu;
        function tintEmoji(root) {
            if (!root) return;
            const skip = 'script, style, textarea, select, option, title, .emo';
            const nodes = [];
            if (root.nodeType === 3) {
                nodes.push(root);
            } else if (root.nodeType === 1) {
                const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
                let n;
                while ((n = walker.nextNode())) nodes.push(n);
            }
            nodes.forEach(node => {
                const p = node.parentElement;
                if (!p || !EMOJI_TEST.test(node.nodeValue) || p.closest(skip)) return;
                const frag = document.createDocumentFragment();
                node.nodeValue.split(EMOJI_SPLIT).forEach((part, i) => {
                    if (!part) return;
                    if (i % 2 === 1) {
                        const span = document.createElement('span');
                        span.className = 'emo';
                        span.textContent = part;
                        frag.appendChild(span);
                    } else {
                        frag.appendChild(document.createTextNode(part));
                    }
                });
                node.replaceWith(frag);
            });
        }
        new MutationObserver(mutations => {
            mutations.forEach(m => m.addedNodes.forEach(n => tintEmoji(n)));
        }).observe(document.body, { childList: true, subtree: true });
        tintEmoji(document.body);

        // ==================== 页面加载 ====================
        window.addEventListener('load', () => {
            populateRootOptions();
            loadGame();
        });

        window.addEventListener('beforeunload', () => {
            if (gameRunning) saveGame();
        });
        // 手机浏览器关闭/切走时可能不触发 beforeunload
        window.addEventListener('pagehide', () => {
            if (gameRunning) saveGame();
        });

        // 页面被隐藏（切标签页、锁屏、切应用）时浏览器会限制甚至冻结定时器：
        // 隐藏时暂停游戏循环，切回前台按离线规则补算；战斗只暂停不结算、不中断。
        document.addEventListener('visibilitychange', () => {
            if (!gameRunning) return;
            if (document.hidden) {
                saveGame();
                clearInterval(tickInterval);
            } else {
                const action = gameState.currentAction;
                const autoBattling = !!(action && action.isBattle && getAutoBattle().enabled);
                if (autoBattling && (Date.now() - gameState.lastActiveTime) >= 10000) {
                    handleOfflineTime(60);   // 自动战斗托管：后台期间按离线规则模拟战斗
                } else if (action && (action.isBattle || action.isDungeon)) {
                    const awaySecs = (Date.now() - gameState.lastActiveTime) / 1000;
                    settleCloneOffline(awaySecs);   // 主角在战斗时，分身与第二块田仍按离线结算
                    settleFarmPlotOffline(awaySecs);
                    gameState.lastActiveTime = Date.now();
                } else {
                    handleOfflineTime(60);
                }
                clearInterval(tickInterval);
                startGameTick();
                updateUI();
            }
        });
