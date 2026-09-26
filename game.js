        // ==================== 游戏数据结构 ====================
        const GAME_CONFIG = {
            realms: [
                // 索引0：凡人（初始境界）
                { name: '凡人', nextReq: 50, baseStats: { hp: 50, atk: 5, def: 2, spd: 5 }, bonusPerLevel: { atk: 0.2, def: 0.05, spd: 0.05 }, isMortal: true },
                // 练气期（索引1-13，v6.89 按《凡人修仙传》原著改为13层，原«练气初期/中期/后期/巅峰»4段拆开）：
                // 前期1-4层：感知吸收灵气建立丹田基础；中期5-9层：灵气运转熟练、体质改善；后期10-13层：为突破筑基做准备。
                // 沿用原有 100×索引^2.5 公式往下细分，13层圆满突破筑基需筑基丹（原「练气巅峰→筑基初期」的丹药要求，
                // 现挪到「练气十三层→筑基一层」，见 MAJOR_BREAKTHROUGH_PILLS[13]）。此前索引5起的所有境界因为这次
                // 插入9层而整体后移9位（原索引5→14、原34→43），下方每条境界都在注释里标了原索引方便核对没漏改。
                { name: '练气一层', nextReq: 100 },      // 100 × 1^2.5 = 100
                { name: '练气二层', nextReq: 566 },      // 100 × 2^2.5 ≈ 566
                { name: '练气三层', nextReq: 1559 },     // 100 × 3^2.5 ≈ 1559
                { name: '练气四层', nextReq: 3200 },     // 100 × 4^2.5 ≈ 3200
                { name: '练气五层', nextReq: 5590 },     // 100 × 5^2.5 ≈ 5590
                { name: '练气六层', nextReq: 8818 },     // 100 × 6^2.5 ≈ 8818
                { name: '练气七层', nextReq: 12964 },    // 100 × 7^2.5 ≈ 12964
                { name: '练气八层', nextReq: 18102 },    // 100 × 8^2.5 ≈ 18102
                { name: '练气九层', nextReq: 24300 },    // 100 × 9^2.5 ≈ 24300
                { name: '练气十层', nextReq: 31623 },    // 100 × 10^2.5 ≈ 31623
                { name: '练气十一层', nextReq: 40130 },  // 100 × 11^2.5 ≈ 40130
                { name: '练气十二层', nextReq: 49890 },  // 100 × 12^2.5 ≈ 49890
                { name: '练气十三层', nextReq: 60930 },  // 100 × 13^2.5 ≈ 60930
                // 原索引5起整体 +9：以下每条境界名/nextReq 与迁移前完全一致，只是数组位置后移
                { name: '筑基初期', nextReq: 5590 },     // 原索引5：100 × 5^2.5 ≈ 5590
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
                { name: '化神圆满', nextReq: 182000 },
                // 炼虚期（索引21-24，沿曲线 100 × n^2.5，v6.67 起按《凡人修仙传》原著顺序排在合体期之前）：
                // 核心是「化虚」——悟道法则的等级可以兑成实体「道则」镶嵌进道基槽，是「加成」变成「可操作物品」的一层
                { name: '炼虚初期', nextReq: 202000 },
                { name: '炼虚中期', nextReq: 227000 },
                { name: '炼虚后期', nextReq: 254000 },
                { name: '炼虚圆满', nextReq: 282000 },
                // 合体期（索引25-28，沿曲线 100 × n^2.5）：合体初期起可「合道」（收回分身，换取主行动大幅加速）；
                // 合体圆满（28）预留下一境界（大乘期）入口，必须已合道（FUSION_REQUIRED_REALM = 28）
                { name: '合体初期', nextReq: 312000 },
                { name: '合体中期', nextReq: 345000 },
                { name: '合体后期', nextReq: 379000 },
                { name: '合体圆满', nextReq: 415000 },
                // 大乘期（索引29-32，沿曲线 100 × n^2.5，v6.69）：灵界至高战力。核心是「元婴蜕变」——不断把灵力注入元婴，
                // 从婴儿形态练到青年形态，元婴离体助战；以及道则「本源品」——法则之力更进一步，初步可以压制群敌
                { name: '大乘初期', nextReq: 453000 },
                { name: '大乘中期', nextReq: 493000 },
                { name: '大乘后期', nextReq: 535000 },
                { name: '大乘圆满', nextReq: 579000 },
                // 真仙境（索引33-34，v6.88）：飞升后的全新阶段，不再靠修为突破——大乘圆满起「修炼」页新增
                // 「开辟仙窍」配方，一次打通一窍，累计 12 窍触发大乘圆满→真仙初期的突破，累计 24 窍触发
                // 真仙初期→真仙后期；nextReq 沿用曲线只作显示参考，真正的突破判定见 attemptBreakthrough()。
                // 肉身脱离人的范畴、以窍代修的同时也要扛「五衰」的前三衰（仙衰/窍衰/身衰）：刚飞升时
                // hp/atk/def 有一份衰退惩罚，仙窍越打通越少，24窍打满时完全消退（getXianShuaiMod）
                { name: '真仙初期', nextReq: 626000, xianqiaoReq: 12 },
                { name: '真仙后期', nextReq: 674000, xianqiaoReq: 24 }
            ],
            // P2功能：秘境系统
            dungeons: {
                mysteryTower: {
                    id: 'mysteryTower',
                    name: '神秘之塔',
                    desc: '五行试炼·通关掉落灵草种子',
                    icon: '🔮',
                    minRealmIndex: 5,                    // v6.89：原索引2（练气中期）→13层制下的练气五层
                    baseRealmIndex: 5,
                    recommendedLevel: '练气五层~练气九层',
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
                        coins: [80, 160],
                        skillExp: 30
                    }
                },
                mysteriousForest: {
                    id: 'mysteriousForest',
                    name: '诡异森林',
                    desc: '灵植妖物·通关掉落灵芝种子',
                    icon: '🌲',
                    minRealmIndex: 13,                   // v6.89：原索引4（练气巅峰）→13层制下的练气十三层
                    baseRealmIndex: 13,
                    recommendedLevel: '练气十三层~筑基初期',
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
                        coins: [140, 250],
                        skillExp: 50
                    }
                },
                ancientRuin: {
                    id: 'ancientRuin',
                    name: '古老遗迹',
                    desc: '法则残片·通关掉落九叶莲种子',
                    icon: '⚱️',
                    minRealmIndex: 15,                   // v6.89：原索引6（筑基中期）→ +9
                    baseRealmIndex: 15,
                    recommendedLevel: '筑基中期~筑基圆满',
                    monsters: [
                        { name: '残魂守卫', type: '雷', hp: 460, atk: 14, spd: 45, def: 7, attackSpeed: 2.3, drop: 'coins', dropQty: 60 },
                        { name: '空间裂隙', type: '风', hp: 415, atk: 11, spd: 65, def: 4, attackSpeed: 1.9, drop: 'coins', dropQty: 65 },
                        { name: '冰晶傀儡', type: '冰', hp: 505, atk: 12, spd: 40, def: 8, attackSpeed: 2.4, drop: 'coins', dropQty: 70 },
                        { name: '法则残片', type: '无', hp: 645, atk: 13, spd: 50, def: 6, attackSpeed: 2.2, drop: 'coins', dropQty: 75 },
                        { name: '遗迹意志', type: '无', hp: 920, atk: 20, spd: 48, def: 10, attackSpeed: 3.1, isBoss: true, drop: 'coins', dropQty: 300 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'seed_lotus', qty: 1 }
                        ],
                        random: [
                            { id: 'seed_tea', qty: 1, probability: 0.5 },
                            { id: 'crystal', qty: [2, 3], probability: 1 }
                        ],
                        coins: [200, 370],
                        skillExp: 80
                    }
                },
                // P6 金丹期秘境：天劫之地
                tribulationGround: {
                    id: 'tribulationGround',
                    name: '天劫之地',
                    desc: '雷劫淬体·通关掉落金丹秘药材料',
                    icon: '⚡',
                    minRealmIndex: 17,                      // v6.89：原索引8 → +9，最低筑基圆满
                    baseRealmIndex: 18,                     // 原索引9 → +9，怪物境界为金丹初期
                    recommendedLevel: '筑基圆满~金丹中期',
                    monsters: [
                        { name: '雷劫残魂', type: '雷', hp: 1190, atk: 35, spd: 55, def: 15, attackSpeed: 2.2, drop: 'coins', dropQty: 150 },
                        { name: '天雷傀儡', type: '雷', hp: 1485, atk: 40, spd: 50, def: 18, attackSpeed: 2.3, drop: 'coins', dropQty: 180 },
                        { name: '劫云化身', type: '风', hp: 1335, atk: 45, spd: 65, def: 12, attackSpeed: 1.8, drop: 'coins', dropQty: 200 },
                        { name: '雷劫核心', type: '雷', hp: 1780, atk: 50, spd: 45, def: 22, attackSpeed: 2.4, drop: 'coins', dropQty: 250 },
                        { name: '天劫意志', type: '无', hp: 2970, atk: 60, spd: 55, def: 25, attackSpeed: 3.2, isBoss: true, drop: 'coins', dropQty: 800 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'danhuo_seed', qty: [2, 4] }
                        ],
                        random: [
                            { id: 'crystal', qty: [3, 5], probability: 1 },
                            { id: 'spiritore', qty: [5, 8], probability: 1 }
                        ],
                        coins: [550, 1030],
                        danhuo: [40, 80],
                        skillExp: 150
                    }
                },
                // P7 元婴期秘境：化神秘境
                huashenRealm: {
                    id: 'huashenRealm',
                    name: '元婴秘境',
                    desc: '元神试炼·通关掉落元婴丹材料',
                    icon: '🌌',
                    minRealmIndex: 21,                      // v6.89：原索引12 → +9，最低金丹圆满
                    baseRealmIndex: 22,                     // 原索引13 → +9，怪物境界为元婴初期
                    recommendedLevel: '金丹圆满~元婴中期',
                    monsters: [
                        { name: '元神残影', type: '无', hp: 4990, atk: 80, spd: 60, def: 30, attackSpeed: 2.1, drop: 'coins', dropQty: 400 },
                        { name: '虚空吞噬者', type: '风', hp: 5990, atk: 90, spd: 70, def: 25, attackSpeed: 1.8, drop: 'coins', dropQty: 450 },
                        { name: '神识傀儡', type: '雷', hp: 5490, atk: 85, spd: 55, def: 35, attackSpeed: 2.2, drop: 'coins', dropQty: 500 },
                        { name: '幻梦妖灵', type: '水', hp: 6490, atk: 95, spd: 65, def: 28, attackSpeed: 2.0, drop: 'coins', dropQty: 550 },
                        { name: '化神意志', type: '无', hp: 11980, atk: 120, spd: 60, def: 40, attackSpeed: 3.3, isBoss: true, drop: 'coins', dropQty: 2000 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'shenshi_seed', qty: [3, 6] }
                        ],
                        random: [
                            { id: 'lotus', qty: [2, 4], probability: 1 },
                            { id: 'crystal', qty: [5, 10], probability: 1 }
                        ],
                        coins: [1400, 2500],
                        danhuo: [60, 120],
                        shenshi: [30, 60],
                        skillExp: 250
                    }
                },
                // P9 化神期秘境：太虚幻境（入口元婴圆满；这里掉落突破化神所需的化神丹，必须在突破前就能进入）
                taixuDream: {
                    id: 'taixuDream',
                    name: '太虚幻境',
                    desc: '虚实交织的幻境·通关掉落化神丹材料',
                    icon: '🌠',
                    minRealmIndex: 25,                      // v6.89：原索引16 → +9，最低元婴圆满
                    baseRealmIndex: 26,                     // 原索引17 → +9，怪物境界为化神初期
                    recommendedLevel: '元婴圆满~化神中期',
                    monsters: [
                        { name: '幻境行者', type: '风', hp: 21630, atk: 150, spd: 70, def: 50, attackSpeed: 2.0, drop: 'coins', dropQty: 800 },
                        { name: '虚实道人', type: '水', hp: 25955, atk: 165, spd: 65, def: 55, attackSpeed: 2.1, drop: 'coins', dropQty: 900 },
                        { name: '万象傀儡', type: '雷', hp: 23795, atk: 170, spd: 60, def: 65, attackSpeed: 2.2, drop: 'coins', dropQty: 1000 },
                        { name: '心魔化身', type: '无', hp: 28120, atk: 180, spd: 75, def: 60, attackSpeed: 1.9, drop: 'coins', dropQty: 1100 },
                        { name: '太虚道主', type: '无', hp: 54075, atk: 220, spd: 70, def: 70, attackSpeed: 3.2, isBoss: true, drop: 'coins', dropQty: 4000 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'seed_daofruit', qty: [2, 4] }
                        ],
                        random: [
                            { id: 'lotus', qty: [3, 5], probability: 1 },
                            { id: 'immortalore', qty: [3, 6], probability: 1 }
                        ],
                        coins: [2700, 5100],
                        danhuo: [100, 200],
                        shenshi: [80, 160],
                        skillExp: 400
                    }
                },
                // 炼虚期秘境：虚界（入口化神圆满，怪物为炼虚初期）
                voidRealm: {
                    id: 'voidRealm',
                    name: '虚界',
                    desc: '虚实交界·通关掉落虚晶与道则残料',
                    icon: '🌫️',
                    minRealmIndex: 29,                      // v6.89：原索引20 → +9，最低化神圆满
                    baseRealmIndex: 30,                     // 原索引21 → +9，怪物境界为炼虚初期
                    recommendedLevel: '化神圆满~炼虚中期',
                    monsters: [
                        { name: '虚灵游魂', type: '无', hp: 36000, atk: 250, spd: 78, def: 70, attackSpeed: 2.1, drop: 'coins', dropQty: 1400 },
                        { name: '化虚傀儡', type: '土', hp: 43000, atk: 270, spd: 70, def: 80, attackSpeed: 2.3, drop: 'coins', dropQty: 1600 },
                        { name: '虚境行者', type: '风', hp: 40000, atk: 285, spd: 90, def: 65, attackSpeed: 2.0, drop: 'coins', dropQty: 1800 },
                        { name: '太虚意志', type: '无', hp: 47000, atk: 300, spd: 82, def: 90, attackSpeed: 2.4, drop: 'coins', dropQty: 2000 },
                        { name: '虚无道尊', type: '无', hp: 90000, atk: 360, spd: 78, def: 105, attackSpeed: 3.3, isBoss: true, drop: 'coins', dropQty: 7000 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'voidcrystal_seed', qty: [3, 6] }
                        ],
                        random: [
                            { id: 'voidcrystal', qty: [2, 4], probability: 1 },
                            { id: 'daostone', qty: [3, 5], probability: 1 }
                        ],
                        coins: [6000, 11000],
                        danhuo: [150, 300],
                        shenshi: [120, 240],
                        daoguo: [20, 40],
                        skillExp: 600
                    }
                },
                // 合体期秘境：天道秘境（入口炼虚圆满，怪物为合体初期）
                tiandaoRealm: {
                    id: 'tiandaoRealm',
                    name: '天道秘境',
                    desc: '天道试炼·通关掉落天道石与道果种子',
                    icon: '🌌',
                    minRealmIndex: 33,                      // v6.89：原索引24 → +9，最低炼虚圆满
                    baseRealmIndex: 34,                     // 原索引25 → +9，怪物境界为合体初期
                    recommendedLevel: '炼虚圆满~合体后期',
                    monsters: [
                        { name: '天道残影', type: '无', hp: 58000, atk: 400, spd: 70, def: 115, attackSpeed: 2.2, drop: 'coins', dropQty: 2400 },
                        { name: '法则傀儡', type: '雷', hp: 68000, atk: 430, spd: 65, def: 135, attackSpeed: 2.3, drop: 'coins', dropQty: 2700 },
                        { name: '道影行者', type: '风', hp: 64000, atk: 460, spd: 80, def: 110, attackSpeed: 2.0, drop: 'coins', dropQty: 3000 },
                        { name: '天道意志', type: '无', hp: 75000, atk: 480, spd: 75, def: 150, attackSpeed: 2.4, drop: 'coins', dropQty: 3300 },
                        { name: '天道化身', type: '无', hp: 148000, atk: 580, spd: 70, def: 175, attackSpeed: 3.3, isBoss: true, drop: 'coins', dropQty: 11000 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'daoguo_seed', qty: [3, 6] }
                        ],
                        random: [
                            { id: 'daostone', qty: [2, 4], probability: 1 },
                            { id: 'immortalore', qty: [3, 5], probability: 1 }
                        ],
                        coins: [11000, 19000],
                        danhuo: [250, 450],
                        shenshi: [220, 400],
                        daoguo: [35, 60],
                        skillExp: 1000
                    }
                },
                // 大乘期秘境：太乙圣域（入口合体圆满，怪物大乘初期）
                taiyiRealm: {
                    id: 'taiyiRealm',
                    name: '太乙圣域',
                    desc: '灵界至高战力的试炼场·通关掉落太乙精华与元婴精魄',
                    icon: '🌟',
                    minRealmIndex: 37,                      // v6.89：原索引28 → +9，最低合体圆满
                    baseRealmIndex: 38,                     // 原索引29 → +9，怪物境界为大乘初期
                    recommendedLevel: '合体圆满~大乘后期',
                    monsters: [
                        { name: '太乙游神', type: '无', hp: 240000, atk: 620, spd: 92, def: 190, attackSpeed: 2.2, drop: 'coins', dropQty: 6000 },
                        { name: '元婴化影', type: '无', hp: 280000, atk: 660, spd: 88, def: 210, attackSpeed: 2.3, drop: 'coins', dropQty: 6800 },
                        { name: '法则执者', type: '雷', hp: 260000, atk: 700, spd: 100, def: 180, attackSpeed: 2.1, drop: 'coins', dropQty: 7500 },
                        { name: '灵界残将', type: '无', hp: 310000, atk: 730, spd: 90, def: 230, attackSpeed: 2.4, drop: 'coins', dropQty: 8200 },
                        { name: '灵界至尊', type: '无', hp: 600000, atk: 880, spd: 92, def: 260, attackSpeed: 3.4, isBoss: true, drop: 'coins', dropQty: 26000 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'nascentsoul_essence', qty: [3, 6] }
                        ],
                        random: [
                            { id: 'taiyiessence', qty: [3, 5], probability: 1 },
                            { id: 'voidcrystal', qty: [4, 7], probability: 1 }
                        ],
                        coins: [26000, 42000],
                        danhuo: [550, 950],
                        shenshi: [480, 820],
                        daoguo: [80, 130],
                        skillExp: 2200
                    }
                },
                // 真仙境秘境（v6.88）：太乙圣域的怪物原始数值会被下面 P4_MONSTER_SCALE.taiyiRealm=0.33 折算，
                // 实际生效血量/攻击是配置里写的数字 ×0.33（约 hp 79200~102300、atk 205~241，boss hp198000/atk290）。
                // 这个新秘境没有配 P4_MONSTER_SCALE 项，下面直接写「已经是折算后」的最终数值（≈太乙圣域实际生效值
                // 的 1.6 倍），不需要再乘系数；没有跑真实引擎模拟标定通关率，后续实测明显偏离再回来调
                taiqingRealm: {
                    id: 'taiqingRealm',
                    name: '太清仙域',
                    desc: '真仙修士的试炼场·通关掉落更多太乙精华，是打通仙窍的主要材料来源',
                    icon: '🌌',
                    minRealmIndex: 42,                      // v6.89：原索引33 → +9，最低真仙初期
                    baseRealmIndex: 42,                     // 怪物境界为真仙初期
                    recommendedLevel: '真仙初期~真仙后期',
                    monsters: [
                        { name: '九霄游仙', type: '无', hp: 127000, atk: 328, spd: 100, def: 100, attackSpeed: 2.2, drop: 'coins', dropQty: 9600 },
                        { name: '仙窍化魔', type: '无', hp: 148000, atk: 351, spd: 95, def: 110, attackSpeed: 2.3, drop: 'coins', dropQty: 10900 },
                        { name: '道体执法', type: '雷', hp: 137000, atk: 371, spd: 108, def: 95, attackSpeed: 2.1, drop: 'coins', dropQty: 12000 },
                        { name: '飞升残魂', type: '无', hp: 164000, atk: 386, spd: 97, def: 122, attackSpeed: 2.4, drop: 'coins', dropQty: 13100 },
                        { name: '太清道尊', type: '无', hp: 317000, atk: 465, spd: 100, def: 138, attackSpeed: 3.4, isBoss: true, drop: 'coins', dropQty: 41600 }
                    ],
                    rewards: {
                        fixed: [
                            { id: 'nascentsoul_essence', qty: [4, 8] }
                        ],
                        random: [
                            { id: 'taiyiessence', qty: [5, 9], probability: 1 },
                            { id: 'voidcrystal', qty: [6, 11], probability: 1 }
                        ],
                        coins: [42000, 67000],
                        danhuo: [880, 1520],
                        shenshi: [770, 1310],
                        daoguo: [130, 210],
                        skillExp: 3500
                    }
                },
                // 炼虚期天劫（v6.68）：每个炼虚小境界各一场，不在秘境列表里显示，只能通过突破弹窗的「渡劫」进入；
                // 通关后 gameState.dungeons[id].completed 标记为已渡劫，不会像普通秘境那样循环挑战（见 completeDungeon 的 isTribulation 分支）
                // v6.89：原索引21-24（炼虚期4个小境界）整体 +9 → 30-33，key 名跟着 tribulationIdFor() 的拼接规则改
                tribulation30: {
                    id: 'tribulation30', name: '初劫', desc: '融入天地元气的第一道劫——道心不稳，招来的第一场考验', icon: '⚡',
                    isTribulation: true, tribulationRealm: 30, minRealmIndex: 30, baseRealmIndex: 30,
                    monsters: [{ name: '劫云傀儡', type: '雷', hp: 5000, atk: 575, spd: 68, def: 90, attackSpeed: 2.2, isBoss: true, drop: 'coins', dropQty: 1800 }],
                    rewards: { coins: [4000, 6000], danhuo: [80, 140], shenshi: [70, 120], skillExp: 500 }
                },
                tribulation31: {
                    id: 'tribulation31', name: '心魔劫', desc: '劫中生出心魔幻象，照见修行路上的执念', icon: '👁️',
                    isTribulation: true, tribulationRealm: 31, minRealmIndex: 31, baseRealmIndex: 31,
                    monsters: [{ name: '本心魔影', type: '无', hp: 5250, atk: 600, spd: 74, def: 105, attackSpeed: 2.3, isBoss: true, drop: 'coins', dropQty: 2400 }],
                    rewards: { coins: [5500, 8000], danhuo: [110, 180], shenshi: [95, 160], skillExp: 700 }
                },
                tribulation32: {
                    id: 'tribulation32', name: '雷劫', desc: '九天玄雷劈落，涤荡道基中的驳杂之气', icon: '🌩️',
                    isTribulation: true, tribulationRealm: 32, minRealmIndex: 32, baseRealmIndex: 32,
                    monsters: [{ name: '雷劫化身', type: '雷', hp: 5500, atk: 625, spd: 82, def: 120, attackSpeed: 2.1, isBoss: true, drop: 'coins', dropQty: 3200 }],
                    rewards: { coins: [7500, 11000], danhuo: [150, 240], shenshi: [130, 210], skillExp: 950 }
                },
                tribulation33: {
                    id: 'tribulation33', name: '大天劫', desc: '炼虚圆满前的终极考验：身与天地相融的最后一步，威力远胜前三劫', icon: '☄️',
                    isTribulation: true, tribulationRealm: 33, minRealmIndex: 33, baseRealmIndex: 33,
                    monsters: [{ name: '大天劫化身', type: '无', hp: 5800, atk: 660, spd: 88, def: 140, attackSpeed: 2.6, isBoss: true, drop: 'coins', dropQty: 4500 }],
                    rewards: { coins: [10000, 15000], danhuo: [200, 320], shenshi: [180, 280], skillExp: 1300 }
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
                        big: { name: '大周天', desc: '中期主力', duration: 12, output: { cultivation: 30, skill: 'cultivation', exp: 25 }, requiredRealmIndex: 9, unlocked: false },   // 原索引3（练气后期）→13层制下等比换算为第9层
                        breath: { name: '龟息术', desc: '高产出', duration: 20, output: { cultivation: 100, skill: 'cultivation', exp: 40 }, requiredRealmIndex: 13, unlocked: false },   // 原索引4（练气巅峰，练气期最后一段）→新第13层（练气期最后一层）
                        // 洗髓易经（v6.90）：原著设定，突破筑基除了筑基丹还要"洗髓易经改善凡人体质"——一次性操作，
                        // 不产出修为，完成后置 marrowCleansed 标记；练气十三层→筑基初期的突破除了丹药还会检查这个标记
                        marrow_cleansing: { name: '洗髓易经', desc: '洗涤经脉、改善凡人体质，为突破筑基做准备（一次性，清灵草×10）', duration: 200, output: { marrowCleanse: 1, skill: 'cultivation', exp: 300 }, requires: { cleangrass: 10 }, requiredRealmIndex: 13, unlocked: false },
                        epiphany: { name: '顿悟', desc: '后期爆发', duration: 60, output: { cultivation: 500, skill: 'cultivation', exp: 80 }, requiredRealmIndex: 15, unlocked: false },   // 原索引6（筑基中期）→+9
                        // P6 金丹期配方（v6.89：原索引9/10/11 → 因练气改13层整体 +9 → 18/19/20）
                        golden_temper: { name: '金丹淬炼', desc: '金丹初期主力', duration: 30, output: { cultivation: 300, skill: 'cultivation', exp: 120 }, requiredRealmIndex: 18, unlocked: false },
                        fire_body: { name: '丹火炼体', desc: '金丹中期高产', duration: 45, output: { cultivation: 600, skill: 'cultivation', exp: 180 }, requiredRealmIndex: 19, unlocked: false },
                        golden_perfect: { name: '金丹圆满', desc: '金丹期最终法', duration: 90, output: { cultivation: 1500, skill: 'cultivation', exp: 300 }, requiredRealmIndex: 20, unlocked: false },
                        // P7 元婴期配方（原索引13/14/15 → 22/23/24）
                        yuanying_nurture: { name: '元婴温养', desc: '元婴初期主力', duration: 45, output: { cultivation: 800, skill: 'cultivation', exp: 200 }, requiredRealmIndex: 22, unlocked: false },
                        soul_travel: { name: '元神出窍', desc: '元婴中期高产', duration: 60, output: { cultivation: 1400, skill: 'cultivation', exp: 280 }, requiredRealmIndex: 23, unlocked: false },
                        yuanying_dao: { name: '元婴合道', desc: '元婴期最终法', duration: 120, output: { cultivation: 3500, skill: 'cultivation', exp: 450 }, requiredRealmIndex: 24, unlocked: false },
                        // P9 化神期配方（原索引17/18/19 → 26/27/28）
                        huashen_ning: { name: '化神凝元', desc: '化神初期主力', duration: 60, output: { cultivation: 2400, skill: 'cultivation', exp: 500 }, requiredRealmIndex: 26, unlocked: false },
                        yuanshen_huaxu: { name: '元神化虚', desc: '化神中期高产', duration: 80, output: { cultivation: 4200, skill: 'cultivation', exp: 650 }, requiredRealmIndex: 27, unlocked: false },
                        tiandi_gongming: { name: '天地共鸣', desc: '化神期最终法', duration: 150, output: { cultivation: 9000, skill: 'cultivation', exp: 900 }, requiredRealmIndex: 28, unlocked: false },
                        // 合体期配方（原索引25/26/27 → 34/35/36）
                        heti_unity: { name: '合体归一', desc: '合体初期主力', duration: 220, output: { cultivation: 28000, skill: 'cultivation', exp: 2600 }, requiredRealmIndex: 34, unlocked: false },
                        dao_body: { name: '道果炼体', desc: '合体中期高产', duration: 320, output: { cultivation: 52000, skill: 'cultivation', exp: 3200 }, requiredRealmIndex: 35, unlocked: false },
                        dao_perfect: { name: '合道圆满', desc: '合体期最终修炼法', duration: 420, output: { cultivation: 90000, skill: 'cultivation', exp: 4000 }, requiredRealmIndex: 36, unlocked: false },
                        // 炼虚期配方（原索引21/22/23 → 30/31/32）
                        lianxu_main: { name: '炼虚归元', desc: '炼虚初期主力', duration: 200, output: { cultivation: 15000, skill: 'cultivation', exp: 1000 }, requiredRealmIndex: 30, unlocked: false },
                        huaxu_unity: { name: '化虚合真', desc: '炼虚中期高产', duration: 300, output: { cultivation: 27000, skill: 'cultivation', exp: 1500 }, requiredRealmIndex: 31, unlocked: false },
                        taixu_manifest: { name: '太虚显化', desc: '炼虚期最终修炼法', duration: 450, output: { cultivation: 50000, skill: 'cultivation', exp: 2200 }, requiredRealmIndex: 32, unlocked: false },
                        // 大乘期配方（原索引29/30/31 → 38/39/40）
                        dacheng_convergence: { name: '大乘归一', desc: '大乘初期主力', duration: 260, output: { cultivation: 170000, skill: 'cultivation', exp: 4800 }, requiredRealmIndex: 38, unlocked: false },
                        yuanying_growth: { name: '元婴蜕变', desc: '大乘中期高产', duration: 380, output: { cultivation: 320000, skill: 'cultivation', exp: 6000 }, requiredRealmIndex: 39, unlocked: false },
                        fadao_suppress: { name: '法则镇伏', desc: '大乘期最终修炼法', duration: 540, output: { cultivation: 560000, skill: 'cultivation', exp: 7500 }, requiredRealmIndex: 40, unlocked: false },
                        // 真仙境配方（原索引32 → 41）：不产出修为，直接打通一窍（xianqiao+1），
                        // 是大乘圆满→真仙初期、真仙初期→真仙后期这两次突破的唯一判定依据，见 attemptBreakthrough()
                        open_orifice: { name: '开辟仙窍', desc: '肉身化道体，以窍代修：太乙精华×5 换一窍，12窍飞升真仙初期，24窍圆满真仙后期', duration: 300, output: { xianqiao: 1, skill: 'cultivation', exp: 8000 }, requires: { taiyiessence: 5 }, requiredRealmIndex: 41, unlocked: false }
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
                        herb_soup: { name: '灵草汤', desc: '清灵草 ×2 + 灵米 ×1（战斗食物：恢复250生命）', duration: 12, output: { items: [{ id: 'herb_soup', qty: 2 }], skill: 'alchemy', exp: 30 }, requiredLevel: 8, requires: { cleangrass: 2, millet: 1 }, unlocked: false },
                        breakthrough: { name: '筑基丹', desc: '清灵草 ×3（练气十三层突破必需）', duration: 12, output: { items: [{ id: 'pill', qty: 1 }], skill: 'alchemy', exp: 45 }, requiredLevel: 10, requires: { cleangrass: 3 }, unlocked: false },
                        golden_pill_alchemy: { name: '金丹秘药', desc: '灵芝 ×3 + 玄晶 ×1 + 灵矿石 ×2（筑基圆满突破必需）', duration: 60, output: { items: [{ id: 'goldenpill', qty: 1 }], skill: 'alchemy', exp: 200 }, requiredLevel: 20, requires: { mushroom: 3, crystal: 1, spiritore: 2 }, unlocked: false },
                        mushroom_stew: { name: '灵芝羹', desc: '灵芝 ×2 + 灵米 ×2（战斗食物：恢复500生命）', duration: 30, output: { items: [{ id: 'mushroom_stew', qty: 2 }], skill: 'alchemy', exp: 240 }, requiredLevel: 22, requires: { mushroom: 2, millet: 2 }, unlocked: false },
                        yuanying_pill_alchemy: { name: '元婴丹', desc: '九叶莲 ×3 + 悟道茶 ×5 + 灵晶 ×2（金丹圆满突破必需）', duration: 90, output: { items: [{ id: 'yuanyingpill', qty: 1 }], skill: 'alchemy', exp: 400 }, requiredLevel: 30, requires: { lotus: 3, tea: 5, spiritcrystal: 2 }, unlocked: false },
                        huashen_pill_alchemy: { name: '化神丹', desc: '九叶莲 ×5 + 悟道茶 ×8 + 仙矿 ×2（元婴圆满突破必需）', duration: 120, output: { items: [{ id: 'huashenpill', qty: 1 }], skill: 'alchemy', exp: 700 }, requiredLevel: 40, requires: { lotus: 5, tea: 8, immortalore: 2 }, unlocked: false },
                        immortal_peach: { name: '蟠桃', desc: '悟道茶 ×3 + 灵芝 ×2（战斗食物：恢复1000生命）', duration: 60, output: { items: [{ id: 'immortal_peach', qty: 2 }], skill: 'alchemy', exp: 500 }, requiredLevel: 34, requires: { tea: 3, mushroom: 2 }, unlocked: false },
                        jade_nectar: { name: '琼浆玉液', desc: '悟道果 ×2 + 悟道茶 ×3（战斗食物：恢复2000生命，冷却更短）', duration: 80, output: { items: [{ id: 'jade_nectar', qty: 2 }], skill: 'alchemy', exp: 900 }, requiredLevel: 45, requires: { daofruit: 2, tea: 3 }, unlocked: false },
                        heti_pill_alchemy: { name: '合体丹', desc: '九叶莲 ×8 + 悟道茶 ×10 + 天道石 ×2（炼虚圆满突破必需）', duration: 180, output: { items: [{ id: 'hetipill', qty: 1 }], skill: 'alchemy', exp: 1800 }, requiredLevel: 60, requires: { lotus: 8, tea: 10, daostone: 2 }, unlocked: false },
                        jade_marrow: { name: '玉髓琼浆', desc: '悟道果 ×3 + 悟道茶 ×4 + 天道石 ×1（战斗食物：恢复5000生命）', duration: 130, output: { items: [{ id: 'jade_marrow', qty: 2 }], skill: 'alchemy', exp: 2200 }, requiredLevel: 63, requires: { daofruit: 3, tea: 4, daostone: 1 }, unlocked: false },
                        // 炼虚期炼丹（索引60/63解锁）
                        huaxu_pill_alchemy: { name: '化虚丹', desc: '九叶莲 ×10 + 悟道茶 ×12 + 天道石 ×3（化神圆满突破必需）', duration: 150, output: { items: [{ id: 'huaxupill', qty: 1 }], skill: 'alchemy', exp: 1100 }, requiredLevel: 50, requires: { lotus: 10, tea: 12, daostone: 3 }, unlocked: false },
                        void_nectar: { name: '虚无仙酿', desc: '悟道果 ×4 + 悟道茶 ×5 + 虚晶 ×1（战斗食物：恢复3500生命）', duration: 100, output: { items: [{ id: 'void_nectar', qty: 2 }], skill: 'alchemy', exp: 1300 }, requiredLevel: 54, requires: { daofruit: 4, tea: 5, voidcrystal: 1 }, unlocked: false },
                        // 大乘期炼丹（索引70/74解锁）
                        dacheng_pill_alchemy: { name: '大乘丹', desc: '九叶莲 ×12 + 悟道茶 ×14 + 太乙精华 ×3（合体圆满突破必需）', duration: 210, output: { items: [{ id: 'dachengpill', qty: 1 }], skill: 'alchemy', exp: 2600 }, requiredLevel: 70, requires: { lotus: 12, tea: 14, taiyiessence: 3 }, unlocked: false },
                        taiyi_nectar: { name: '太乙琼浆', desc: '悟道果 ×5 + 悟道茶 ×6 + 太乙精华 ×1（战斗食物：恢复6500生命）', duration: 150, output: { items: [{ id: 'taiyi_nectar', qty: 2 }], skill: 'alchemy', exp: 3000 }, requiredLevel: 74, requires: { daofruit: 5, tea: 6, taiyiessence: 1 }, unlocked: false }
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
                        ironsword: { name: '铸造铁剑', desc: '铁矿石 ×3', duration: 20, output: { items: [{ id: 'sword', qty: 1 }], skill: 'forging', exp: 40 }, requiredLevel: 8, requires: { ironore: 3 }, unlocked: false },
                        iron_armor: { name: '铁甲', desc: '铁矿石 ×5', duration: 30, output: { items: [{ id: 'ironarmor', qty: 1 }], skill: 'forging', exp: 60 }, requiredLevel: 10, requires: { ironore: 5 }, unlocked: false },
                        iron_blade: { name: '精铁剑', desc: '铁矿石 ×6 + 碎石 ×5', duration: 35, output: { items: [{ id: 'ironblade', qty: 1 }], skill: 'forging', exp: 90 }, requiredLevel: 13, requires: { ironore: 6, stone: 5 }, unlocked: false },
                        spirit_sword: { name: '灵剑', desc: '灵矿石 ×3 + 玄晶 ×1', duration: 45, output: { items: [{ id: 'spiritsword', qty: 1 }], skill: 'forging', exp: 130 }, requiredLevel: 18, requires: { spiritore: 3, crystal: 1 }, unlocked: false },
                        spirit_armor: { name: '灵甲', desc: '灵矿石 ×4 + 玄晶 ×1', duration: 45, output: { items: [{ id: 'spiritarmor', qty: 1 }], skill: 'forging', exp: 150 }, requiredLevel: 20, requires: { spiritore: 4, crystal: 1 }, unlocked: false },
                        golden_sword: { name: '金丹剑', desc: '灵矿石 ×5 + 玄晶 ×2', duration: 60, output: { items: [{ id: 'goldensword', qty: 1 }], skill: 'forging', exp: 220 }, requiredLevel: 25, requires: { spiritore: 5, crystal: 2 }, unlocked: false },
                        golden_armor: { name: '金丹法袍', desc: '灵矿石 ×5 + 玄晶 ×2', duration: 60, output: { items: [{ id: 'goldenarmor', qty: 1 }], skill: 'forging', exp: 260 }, requiredLevel: 27, requires: { spiritore: 5, crystal: 2 }, unlocked: false },
                        golden_pendant: { name: '金丹佩', desc: '灵晶 ×1 + 玄晶 ×3', duration: 50, output: { items: [{ id: 'goldenpendant', qty: 1 }], skill: 'forging', exp: 300 }, requiredLevel: 30, requires: { spiritcrystal: 1, crystal: 3 }, unlocked: false },
                        yuanying_sword: { name: '元婴灵剑', desc: '灵晶 ×3 + 玄晶 ×5', duration: 90, output: { items: [{ id: 'yuanyingsword', qty: 1 }], skill: 'forging', exp: 500 }, requiredLevel: 36, requires: { spiritcrystal: 3, crystal: 5 }, unlocked: false },
                        yuanying_armor: { name: '元婴法衣', desc: '灵晶 ×4 + 玄晶 ×4', duration: 90, output: { items: [{ id: 'yuanyingarmor', qty: 1 }], skill: 'forging', exp: 560 }, requiredLevel: 39, requires: { spiritcrystal: 4, crystal: 4 }, unlocked: false },
                        yuanying_pendant: { name: '元婴佩', desc: '灵晶 ×2 + 仙矿 ×1', duration: 80, output: { items: [{ id: 'yuanyingpendant', qty: 1 }], skill: 'forging', exp: 620 }, requiredLevel: 40, requires: { spiritcrystal: 2, immortalore: 1 }, unlocked: false },
                        huashen_sword: { name: '化神剑', desc: '混沌石 ×3 + 仙矿 ×2', duration: 110, output: { items: [{ id: 'huashensword', qty: 1 }], skill: 'forging', exp: 800 }, requiredLevel: 45, requires: { chaosstone: 3, immortalore: 2 }, unlocked: false },
                        huashen_armor: { name: '化神法衣', desc: '混沌石 ×4 + 仙矿 ×2', duration: 110, output: { items: [{ id: 'huashenarmor', qty: 1 }], skill: 'forging', exp: 880 }, requiredLevel: 48, requires: { chaosstone: 4, immortalore: 2 }, unlocked: false },
                        huashen_pendant: { name: '化神佩', desc: '混沌石 ×2 + 灵晶 ×3', duration: 100, output: { items: [{ id: 'huashenpendant', qty: 1 }], skill: 'forging', exp: 950 }, requiredLevel: 50, requires: { chaosstone: 2, spiritcrystal: 3 }, unlocked: false },
                        heti_sword: { name: '合体剑', desc: '天道石 ×3 + 混沌石 ×2', duration: 150, output: { items: [{ id: 'hetisword', qty: 1 }], skill: 'forging', exp: 2400 }, requiredLevel: 64, requires: { daostone: 3, chaosstone: 2 }, unlocked: false },
                        heti_armor: { name: '合体法衣', desc: '天道石 ×4 + 混沌石 ×2', duration: 150, output: { items: [{ id: 'hetiarmor', qty: 1 }], skill: 'forging', exp: 2600 }, requiredLevel: 65, requires: { daostone: 4, chaosstone: 2 }, unlocked: false },
                        heti_pendant: { name: '合体佩', desc: '天道石 ×2 + 灵晶 ×3', duration: 140, output: { items: [{ id: 'hetipendant', qty: 1 }], skill: 'forging', exp: 2800 }, requiredLevel: 66, requires: { daostone: 2, spiritcrystal: 3 }, unlocked: false },
                        // 炼虚期炼器（索引64-66解锁）
                        lianxu_sword: { name: '炼虚剑', desc: '虚晶 ×3 + 混沌石 ×3', duration: 130, output: { items: [{ id: 'lianxusword', qty: 1 }], skill: 'forging', exp: 1100 }, requiredLevel: 56, requires: { voidcrystal: 3, chaosstone: 3 }, unlocked: false },
                        lianxu_armor: { name: '炼虚法衣', desc: '虚晶 ×4 + 混沌石 ×3', duration: 130, output: { items: [{ id: 'lianxuarmor', qty: 1 }], skill: 'forging', exp: 1200 }, requiredLevel: 59, requires: { voidcrystal: 4, chaosstone: 3 }, unlocked: false },
                        lianxu_pendant: { name: '炼虚佩', desc: '虚晶 ×2 + 灵晶 ×4', duration: 120, output: { items: [{ id: 'lianxupendant', qty: 1 }], skill: 'forging', exp: 1300 }, requiredLevel: 60, requires: { voidcrystal: 2, spiritcrystal: 4 }, unlocked: false },
                        // 大乘期炼器（索引76-80解锁）
                        dacheng_sword: { name: '大乘剑', desc: '太乙精华 ×4 + 混沌石 ×4', duration: 180, output: { items: [{ id: 'dachengsword', qty: 1 }], skill: 'forging', exp: 3400 }, requiredLevel: 76, requires: { taiyiessence: 4, chaosstone: 4 }, unlocked: false },
                        dacheng_armor: { name: '大乘法衣', desc: '太乙精华 ×5 + 混沌石 ×4', duration: 180, output: { items: [{ id: 'dachengarmor', qty: 1 }], skill: 'forging', exp: 3600 }, requiredLevel: 78, requires: { taiyiessence: 5, chaosstone: 4 }, unlocked: false },
                        dacheng_pendant: { name: '大乘佩', desc: '太乙精华 ×3 + 灵晶 ×5', duration: 170, output: { items: [{ id: 'dachengpendant', qty: 1 }], skill: 'forging', exp: 3800 }, requiredLevel: 80, requires: { taiyiessence: 3, spiritcrystal: 5 }, unlocked: false }
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
                        grass: { name: '种植清灵草', desc: '炼丹材料 需灵草种子', duration: 10, output: { items: [{ id: 'cleangrass', qty: 1 }], skill: 'farming', exp: 20 }, requiredLevel: 5, requires: { seed_cleangrass: 1 }, unlocked: false },
                        decompose_grass: { name: '分解清灵草', desc: '清灵草 ×1 换回 清灵草种子 ×2', duration: 15, output: { items: [{ id: 'seed_cleangrass', qty: 2 }], skill: 'farming', exp: 15 }, requiredLevel: 5, requires: { cleangrass: 1 }, unlocked: false },
                        mushroom: { name: '种植灵芝', desc: '高级材料 需灵芝种子', duration: 30, output: { items: [{ id: 'mushroom', qty: 1 }], skill: 'farming', exp: 70 }, requiredLevel: 13, requires: { seed_mushroom: 1 }, unlocked: false },
                        decompose_mushroom: { name: '分解灵芝', desc: '灵芝 ×1 换回 灵芝种子 ×2', duration: 40, output: { items: [{ id: 'seed_mushroom', qty: 2 }], skill: 'farming', exp: 40 }, requiredLevel: 13, requires: { mushroom: 1 }, unlocked: false },
                        tea: { name: '种植悟道茶', desc: '特殊材料 需悟道茶种子', duration: 60, output: { items: [{ id: 'tea', qty: 1 }], skill: 'farming', exp: 190 }, requiredLevel: 22, requires: { seed_tea: 1 }, unlocked: false },
                        decompose_tea: { name: '分解悟道茶', desc: '悟道茶 ×1 换回 悟道茶种子 ×2', duration: 80, output: { items: [{ id: 'seed_tea', qty: 2 }], skill: 'farming', exp: 100 }, requiredLevel: 22, requires: { tea: 1 }, unlocked: false },
                        lotus: { name: '种植九叶莲', desc: '渡劫材料 需九叶莲种子', duration: 300, output: { items: [{ id: 'lotus', qty: 1 }], skill: 'farming', exp: 320 }, requiredLevel: 30, requires: { seed_lotus: 1 }, unlocked: false },
                        decompose_lotus: { name: '分解九叶莲', desc: '九叶莲 ×1 换回 九叶莲种子 ×2', duration: 360, output: { items: [{ id: 'seed_lotus', qty: 2 }], skill: 'farming', exp: 180 }, requiredLevel: 30, requires: { lotus: 1 }, unlocked: false },
                        daofruit: { name: '种植悟道果', desc: '化神材料 需悟道果种子（太虚幻境掉落）', duration: 480, output: { items: [{ id: 'daofruit', qty: 1 }], skill: 'farming', exp: 600 }, requiredLevel: 39, requires: { seed_daofruit: 1 }, unlocked: false },
                        decompose_daofruit: { name: '分解悟道果', desc: '悟道果 ×1 换回 悟道果种子 ×2', duration: 560, output: { items: [{ id: 'seed_daofruit', qty: 2 }], skill: 'farming', exp: 320 }, requiredLevel: 39, requires: { daofruit: 1 }, unlocked: false }
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
                        ironore: { name: '采铁矿', desc: '产出铁矿石', duration: 8, output: { items: [{ id: 'ironore', qty: 1 }], skill: 'mining', exp: 25 }, requiredLevel: 8, unlocked: false },
                        spiritore: { name: '采灵矿', desc: '产出灵矿石', duration: 12, output: { items: [{ id: 'spiritore', qty: 1 }], skill: 'mining', exp: 60 }, requiredLevel: 15, unlocked: false },
                        crystal: { name: '采玄晶', desc: '产出玄晶', duration: 20, output: { items: [{ id: 'crystal', qty: 1 }], skill: 'mining', exp: 110 }, requiredLevel: 18, unlocked: false },
                        spiritcrystal: { name: '采灵晶', desc: '产出灵晶', duration: 25, output: { items: [{ id: 'spiritcrystal', qty: 1 }], skill: 'mining', exp: 220 }, requiredLevel: 30, unlocked: false },
                        immortalore: { name: '采仙矿', desc: '产出仙矿', duration: 35, output: { items: [{ id: 'immortalore', qty: 1 }], skill: 'mining', exp: 330 }, requiredLevel: 36, unlocked: false },
                        chaosstone: { name: '采混沌石', desc: '产出混沌石', duration: 50, output: { items: [{ id: 'chaosstone', qty: 1 }], skill: 'mining', exp: 600 }, requiredLevel: 43, unlocked: false },
                        daostone: { name: '采天道石', desc: '产出天道石（化虚丹与合体级装备的共用材料）', duration: 60, output: { items: [{ id: 'daostone', qty: 1 }], skill: 'mining', exp: 800 }, requiredLevel: 50, unlocked: false },
                        voidcrystal: { name: '采虚晶', desc: '产出虚晶（炼虚期材料，化虚 / 炼虚装备）', duration: 60, output: { items: [{ id: 'voidcrystal', qty: 1 }], skill: 'mining', exp: 800 }, requiredLevel: 50, unlocked: false },
                        taiyiessence: { name: '采太乙精华', desc: '产出太乙精华（大乘丹与大乘装备的共用材料）', duration: 75, output: { items: [{ id: 'taiyiessence', qty: 1 }], skill: 'mining', exp: 1300 }, requiredLevel: 70, unlocked: false }
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
                        gather: { name: '凝聚丹火', desc: '从金丹中提取丹火（货币：淬炼装备、强化灵根）', duration: 15, output: { danhuo: 5, skill: 'danhuo', exp: 30 }, requiredLevel: 1, unlocked: true },
                        seed: { name: '培育丹火', desc: '以丹火种子培育，一次得到 25 丹火（种子来自天劫之地）', duration: 20, output: { danhuo: 25, skill: 'danhuo', exp: 60 }, requiredLevel: 2, requires: { danhuo_seed: 1 }, unlocked: false },
                        refine: { name: '提炼丹火', desc: '更高效的提炼：耗时翻倍，产出更多', duration: 30, output: { danhuo: 13, skill: 'danhuo', exp: 110 }, requiredLevel: 6, unlocked: false },
                        condense: { name: '凝练丹火', desc: '炼火成髓：丹火技能的顶级提取法', duration: 60, output: { danhuo: 30, skill: 'danhuo', exp: 260 }, requiredLevel: 12, unlocked: false }
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
                        gather: { name: '凝练神识', desc: '从元婴中提取神识（货币：分身强化、专注、神识感应）', duration: 20, output: { shenshi: 4, skill: 'shenshi', exp: 40 }, requiredLevel: 1, unlocked: true },
                        seed: { name: '培育神识', desc: '以神识种子培育，一次得到 20 神识（种子来自元婴秘境）', duration: 25, output: { shenshi: 20, skill: 'shenshi', exp: 80 }, requiredLevel: 2, requires: { shenshi_seed: 1 }, unlocked: false },
                        refine: { name: '提炼神识', desc: '更高效的提炼：耗时翻倍，产出更多', duration: 40, output: { shenshi: 10, skill: 'shenshi', exp: 150 }, requiredLevel: 5, unlocked: false },
                        meditate: { name: '神识入定', desc: '悟道果 ×1 → 神识 ×15', duration: 60, output: { shenshi: 15, skill: 'shenshi', exp: 260 }, requiredLevel: 10, requires: { daofruit: 1 }, unlocked: false },
                        deep: { name: '深度入定', desc: '神识技能的顶级提取法', duration: 90, output: { shenshi: 28, skill: 'shenshi', exp: 420 }, requiredLevel: 15, unlocked: false }
                    },
                    actions: {}
                },
                // 合体期技能：道果（货币，与丹火 / 神识同一套机制）。用悟道果等材料凝练，用于道果淬体、道果悟法，并在道果商城消费
                daoguo: {
                    name: '道果',
                    icon: '🍎',
                    level: 1,
                    exp: 0,
                    recipes: {
                        condense: { name: '凝练道果', desc: '悟道果 ×1 → 道果 ×6（货币：道果淬体、道果悟法）', duration: 90, output: { daoguo: 6, skill: 'daoguo', exp: 200 }, requiredLevel: 1, requires: { daofruit: 1 }, unlocked: true },
                        seed: { name: '培育道果', desc: '以道果种子培育，一次得到 30 道果（种子来自天道秘境）', duration: 120, output: { daoguo: 30, skill: 'daoguo', exp: 300 }, requiredLevel: 3, requires: { daoguo_seed: 1 }, unlocked: false },
                        refine: { name: '提炼道果', desc: '悟道果 ×2 + 混沌石 ×1 → 道果 ×20', duration: 150, output: { daoguo: 20, skill: 'daoguo', exp: 400 }, requiredLevel: 8, requires: { daofruit: 2, chaosstone: 1 }, unlocked: false },
                        deep: { name: '归元凝道', desc: '悟道果 ×3 + 天道石 ×1 → 道果 ×45', duration: 240, output: { daoguo: 45, skill: 'daoguo', exp: 700 }, requiredLevel: 15, requires: { daofruit: 3, daostone: 1 }, unlocked: false }
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
                goldenpill: { name: '金丹秘药', icon: '🟤', type: 'breakthrough_material', sellPrice: 400 },  // P6 突破材料

                // 特殊材料
                spiritstone: { name: '灵石', icon: '💎', type: 'currency' },
                jade: { name: '灵玉', icon: '📿', type: 'jewelry', sellPrice: 80, effect: { workSpeed: 0.95 } },
                // 礼包码专属（测试用）：所有工作耗时 ×0.01（速度 ×100），修炼速度 ×100；只能通过礼包码获得
                test_ring: { name: '天机灵环', icon: '💍', type: 'jewelry', sellPrice: 10000, effect: { workSpeed: 0.01, cultSpeed: 99 } },

                // P6 丹火相关物品
                danhuo_seed: { name: '丹火种子', icon: '🔥', type: 'seed', sellPrice: 50 },

                // P7 神识相关物品
                shenshi_seed: { name: '神识种子', icon: '👁️', type: 'seed', sellPrice: 100 },
                yuanyingpill: { name: '元婴丹', icon: '⭕', type: 'breakthrough_material', sellPrice: 1200 },
                huashenpill: { name: '化神丹', icon: '🔮', type: 'breakthrough_material', sellPrice: 2700 },  // P9 突破材料

                // 装备
                sword: { name: '桃木剑', icon: '⚔️', type: 'weapon', sellPrice: 60, stats: { atk: 15 } },
                ironblade: { name: '精铁剑', icon: '🗡️', type: 'weapon', sellPrice: 200, stats: { atk: 26 } },
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
                // 合体期新物品
                daostone: { name: '天道石', icon: '🔶', type: 'ore', sellPrice: 2000 },
                daoguo_seed: { name: '道果种子', icon: '🌰', type: 'seed', sellPrice: 500 },
                hetipill: { name: '合体丹', icon: '🔮', type: 'breakthrough_material', sellPrice: 8000 },
                hetisword: { name: '合体剑', icon: '🗡️', type: 'weapon', sellPrice: 9000, stats: { atk: 220 } },
                hetiarmor: { name: '合体法衣', icon: '🥼', type: 'armor', sellPrice: 10000, stats: { def: 120, hp: 340 } },
                hetipendant: { name: '合体佩', icon: '📿', type: 'jewelry', sellPrice: 6500, stats: { spd: 26, hp: 220 } },
                jade_marrow: { name: '玉髓琼浆', icon: '🍶', type: 'food', sellPrice: 4000 },
                // 炼虚期新物品
                voidcrystal: { name: '虚晶', icon: '💠', type: 'ore', sellPrice: 2500 },
                voidcrystal_seed: { name: '虚晶种子', icon: '🌰', type: 'seed', sellPrice: 700 },
                huaxupill: { name: '化虚丹', icon: '🔮', type: 'breakthrough_material', sellPrice: 6000 },
                lianxusword: { name: '炼虚剑', icon: '🗡️', type: 'weapon', sellPrice: 7000, stats: { atk: 150 } },
                lianxuarmor: { name: '炼虚法衣', icon: '🥼', type: 'armor', sellPrice: 8000, stats: { def: 85, hp: 230 } },
                lianxupendant: { name: '炼虚佩', icon: '📿', type: 'jewelry', sellPrice: 5000, stats: { spd: 19, hp: 150 } },
                void_nectar: { name: '虚无仙酿', icon: '🍶', type: 'food', sellPrice: 3000 },
                // 大乘期新物品
                taiyiessence: { name: '太乙精华', icon: '💠', type: 'ore', sellPrice: 3500 },
                dachengpill: { name: '大乘丹', icon: '🔮', type: 'breakthrough_material', sellPrice: 12000 },
                dachengsword: { name: '大乘剑', icon: '🗡️', type: 'weapon', sellPrice: 14000, stats: { atk: 320 } },
                dachengarmor: { name: '大乘法衣', icon: '🥼', type: 'armor', sellPrice: 15500, stats: { def: 175, hp: 480 } },
                dachengpendant: { name: '大乘佩', icon: '📿', type: 'jewelry', sellPrice: 10000, stats: { spd: 36, hp: 310 } },
                taiyi_nectar: { name: '太乙琼浆', icon: '🍶', type: 'food', sellPrice: 6000 },
                nascentsoul_essence: { name: '元婴精魄', icon: '👁️', type: 'material', sellPrice: 2000 },

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
                    { id: 'jewelry_slot2', name: '第二饰品栏位', icon: '💍', price: 8000, desc: '解锁第二个饰品栏位（可同时佩戴两件不同的饰品）', minRealmIndex: 18, type: 'upgrade', bought: false },
                    { id: 'daoze_slot2', name: '第二道基槽位', icon: '☯️', price: 15000, desc: '解锁第二个道基槽位（可同时镶嵌两枚不同法则的道则）', minRealmIndex: 30, type: 'upgrade', bought: false },
                    { id: 'daoze_slot3', name: '第三道基槽位', icon: '☯️', price: 35000, desc: '解锁第三个道基槽位', minRealmIndex: 32, type: 'upgrade', bought: false }
                ],
                food: [
                    { id: 'millet', name: '灵米', icon: '🌾', price: 10, desc: '普通食物' },
                    { id: 'cleangrass', name: '清灵草', icon: '🍃', price: 25, desc: '炼丹材料' },
                    { id: 'mushroom', name: '灵芝', icon: '🍄', price: 50, desc: '高级材料' }
                ],
                materials: [
                    { id: 'spiritore', name: '灵矿石', icon: '✨', price: 150, desc: '炼器材料', minRealmIndex: 14 },
                    { id: 'crystal', name: '玄晶', icon: '💎', price: 300, desc: '高级材料', minRealmIndex: 17 },
                    { id: 'spiritcrystal', name: '灵晶', icon: '🔹', price: 500, desc: '元婴级材料', minRealmIndex: 18 },
                    { id: 'immortalore', name: '仙矿', icon: '✨', price: 2000, desc: '顶级材料', minRealmIndex: 22 }
                ],
                // 丹火商城（金丹初期起）：用丹火买炼丹 / 战斗食物材料；食物是秘境的刚需
                danhuo_shop: [
                    { id: 'mushroom_stew', name: '灵芝羹 ×4', icon: '🥣', price: 40, currency: 'danhuo', bundle: 4, desc: '战斗食物（恢复 500 生命）', minRealmIndex: 18 },
                    { id: 'spiritore', name: '灵矿石 ×5', icon: '✨', price: 25, currency: 'danhuo', bundle: 5, desc: '炼器材料', minRealmIndex: 18 },
                    { id: 'crystal', name: '玄晶 ×1', icon: '💎', price: 30, currency: 'danhuo', bundle: 1, desc: '高级材料', minRealmIndex: 18 },
                    { id: 'mushroom', name: '灵芝 ×5', icon: '🍄', price: 25, currency: 'danhuo', bundle: 5, desc: '炼丹材料', minRealmIndex: 18 },
                    { id: 'tea', name: '悟道茶叶 ×3', icon: '🍵', price: 30, currency: 'danhuo', bundle: 3, desc: '炼丹材料', minRealmIndex: 18 },
                    { id: 'spiritcrystal', name: '灵晶 ×1', icon: '🔹', price: 60, currency: 'danhuo', bundle: 1, desc: '元婴级材料', minRealmIndex: 18 },
                    { id: 'lotus', name: '九叶莲 ×1', icon: '🌸', price: 45, currency: 'danhuo', bundle: 1, desc: '炼丹材料（元婴丹、化神丹）', minRealmIndex: 18 }
                ],
                // 神识商城（元婴初期起）：用神识买高阶食物与稀有材料
                shenshi_shop: [
                    { id: 'immortal_peach', name: '蟠桃 ×3', icon: '🍑', price: 45, currency: 'shenshi', bundle: 3, desc: '战斗食物（恢复 1000 生命）', minRealmIndex: 22 },
                    { id: 'jade_nectar', name: '琼浆玉液 ×2', icon: '🍶', price: 80, currency: 'shenshi', bundle: 2, desc: '战斗食物（化神初期起）', minRealmIndex: 26 },
                    { id: 'immortalore', name: '仙矿 ×1', icon: '✨', price: 60, currency: 'shenshi', bundle: 1, desc: '顶级材料', minRealmIndex: 22 },
                    { id: 'chaosstone', name: '混沌石 ×1', icon: '🌑', price: 90, currency: 'shenshi', bundle: 1, desc: '化神装备材料', minRealmIndex: 26 },
                    { id: 'daofruit', name: '悟道果 ×1', icon: '🍇', price: 50, currency: 'shenshi', bundle: 1, desc: '炼丹 / 神识入定材料', minRealmIndex: 22 },
                    { id: 'lotus', name: '九叶莲 ×2', icon: '🌸', price: 40, currency: 'shenshi', bundle: 2, desc: '炼丹材料', minRealmIndex: 22 }
                ],
                daoguo_shop: [
                    { id: 'jade_marrow', name: '玉髓琼浆 ×2', icon: '🍶', price: 30, currency: 'daoguo', bundle: 2, desc: '战斗食物（合体初期起，恢复 5000 生命）', minRealmIndex: 34 },
                    { id: 'daostone', name: '天道石 ×2', icon: '🪨', price: 40, currency: 'daoguo', bundle: 2, desc: '合体级矿石（合体丹 / 合体装备材料）', minRealmIndex: 34 },
                    { id: 'chaosstone', name: '混沌石 ×2', icon: '🌑', price: 30, currency: 'daoguo', bundle: 2, desc: '合体装备材料', minRealmIndex: 34 },
                    { id: 'immortalore', name: '仙矿 ×3', icon: '✨', price: 30, currency: 'daoguo', bundle: 3, desc: '顶级材料', minRealmIndex: 34 },
                    { id: 'daofruit', name: '悟道果 ×2', icon: '🍇', price: 35, currency: 'daoguo', bundle: 2, desc: '炼丹 / 玉髓琼浆 / 道果技能材料', minRealmIndex: 34 },
                    { id: 'lotus', name: '九叶莲 ×3', icon: '🌸', price: 35, currency: 'daoguo', bundle: 3, desc: '炼丹材料', minRealmIndex: 34 },
                    { id: 'voidcrystal', name: '虚晶 ×2', icon: '💠', price: 45, currency: 'daoguo', bundle: 2, desc: '炼虚级矿石（化虚 / 炼虚装备材料）', minRealmIndex: 34 }
                ],
                arts: [
                    { id: 'qingmu_art', name: '青木诀', icon: '🌿', price: 200, desc: '修炼速度 ×1.1', minRealmIndex: 1, type: 'art' },
                    { id: 'liuyun_art', name: '流云诀', icon: '☁️', price: 1200, desc: '修炼速度 ×1.25', minRealmIndex: 9, type: 'art' },
                    { id: 'xuanshui_art', name: '玄水经', icon: '💧', price: 4000, desc: '修炼速度 ×1.35', minRealmIndex: 14, type: 'art' },
                    { id: 'lieyang_art', name: '烈阳功', icon: '☀️', price: 8000, desc: '修炼速度 ×1.45', minRealmIndex: 16, type: 'art' },
                    { id: 'golden_art', name: '金丹大道', icon: '📜', price: 10000, desc: '修炼速度 ×1.5', minRealmIndex: 17, type: 'art' },
                    { id: 'fire_art', name: '焚天诀', icon: '🔥', price: 20000, desc: '修炼速度 ×1.8', minRealmIndex: 18, type: 'art' },
                    { id: 'yuanying_art', name: '元婴真解', icon: '👁️', price: 30000, desc: '修炼速度 ×2.2', minRealmIndex: 20, type: 'art' },
                    { id: 'soul_art', name: '太虚元神诀', icon: '🌌', price: 50000, desc: '修炼速度 ×2.8', minRealmIndex: 22, type: 'art' },
                { id: 'huashen_art', name: '化神真经', icon: '📖', price: 120000, desc: '修炼速度 ×3.4', minRealmIndex: 26, type: 'art' },
                { id: 'primordial_art', name: '太初混元诀', icon: '☯️', price: 300000, desc: '修炼速度 ×4.2', minRealmIndex: 28, type: 'art' },
                    { id: 'lianxu_art', name: '炼虚真经', icon: '📖', price: 800000, desc: '修炼速度 ×5', minRealmIndex: 30, type: 'art' },
                    { id: 'taixuhuashi_art', name: '太虚化实经', icon: '🕮', price: 2000000, desc: '修炼速度 ×6.2', minRealmIndex: 32, type: 'art' },
                    { id: 'heti_art', name: '合体真经', icon: '📖', price: 2000000, desc: '修炼速度 ×8', minRealmIndex: 34, type: 'art' },
                    { id: 'dao_art', name: '太上合道经', icon: '🕮', price: 5000000, desc: '修炼速度 ×9.5', minRealmIndex: 36, type: 'art' },
                    { id: 'dacheng_art', name: '大乘真经', icon: '📖', price: 12000000, desc: '修炼速度 ×12', minRealmIndex: 38, type: 'art' },
                    { id: 'taiyi_art', name: '太乙化元经', icon: '🕮', price: 30000000, desc: '修炼速度 ×15', minRealmIndex: 40, type: 'art' }
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
                    minRealm: 13,             // v6.89：原索引4（练气巅峰）→13层制的练气十三层
                    description: '由清灵草熬制的汤，恢复250点生命值'
                },
                // 高级食物
                mushroom_stew: {
                    id: 'mushroom_stew',
                    name: '灵芝羹',
                    icon: '🥣',
                    hpRestore: 500,           // 恢复HP
                    cooldown: 3.0,
                    minRealm: 18,             // v6.89：原索引9 → +9，金丹初期
                    description: '灵芝熬制的浓羹，恢复500点生命值'
                },
                // 极品食物
                immortal_peach: {
                    id: 'immortal_peach',
                    name: '蟠桃',
                    icon: '🍑',
                    hpRestore: 1000,          // 恢复HP
                    cooldown: 5.0,
                    minRealm: 22,             // v6.89：原索引13 → +9，元婴初期
                    description: '传说中的仙果，完全恢复生命值'
                },
                // 化神期食物：恢复量更大、冷却更短
                jade_nectar: {
                    id: 'jade_nectar',
                    name: '琼浆玉液',
                    icon: '🍶',
                    hpRestore: 2000,          // 恢复HP
                    cooldown: 3.0,
                    minRealm: 26,             // v6.89：原索引17 → +9，化神初期
                    description: '化神修士的琼浆，饮下瞬间生机勃发，冷却比蟠桃更短'
                },
                jade_marrow: {
                    id: 'jade_marrow',
                    name: '玉髓琼浆',
                    icon: '🍶',
                    hpRestore: 5000,          // 恢复HP
                    cooldown: 3.0,
                    minRealm: 34,             // v6.89：原索引25 → +9，合体初期
                    description: '合体修士的玉髓，肉身与元神共鸣，恢复量远超玉髓琼浆之前的一切战斗食物'
                },
                void_nectar: {
                    id: 'void_nectar',
                    name: '虚无仙酿',
                    icon: '🍶',
                    hpRestore: 3500,          // 恢复HP
                    cooldown: 3.0,
                    minRealm: 30,             // v6.89：原索引21 → +9，炼虚初期
                    description: '炼虚修士以虚晶入酿，化虚为实，恢复量远超此前的战斗食物'
                },
                taiyi_nectar: {
                    id: 'taiyi_nectar',
                    name: '太乙琼浆',
                    icon: '🍶',
                    hpRestore: 6500,          // 恢复HP
                    cooldown: 3.0,
                    minRealm: 38,             // v6.89：原索引29 → +9，大乘初期
                    description: '大乘修士以太乙精华炼制，灵界至高一脉的战斗补给，恢复量远超此前一切战斗食物'
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

        // ==================== 美术：物品图标（手绘矢量，水墨线 + 铜金 + 朱印色） ====================
        // 每种物品单独一枚 SVG（32×32），不依赖外部图片。加载时写回 GAME_CONFIG.items / 商店 / 食物配置的 icon 字段；
        // 没有对应图标的物品保持原来的 emoji。图标是 HTML 字符串，所以显示图标的地方一律用 innerHTML。
        // 图标共用的小工具：外壳（墨色描边）、四角星光、叶片
        const icoSvg = inner => `<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><g stroke="#2b2016" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round" fill="none">${inner}</g></svg>`;
        const icoSparkle = (x, y, s = 2.4, c = '#fff4c4') => `<path d="M${x} ${y - s}L${x + s * 0.35} ${y - s * 0.35}L${x + s} ${y}L${x + s * 0.35} ${y + s * 0.35}L${x} ${y + s}L${x - s * 0.35} ${y + s * 0.35}L${x - s} ${y}L${x - s * 0.35} ${y - s * 0.35}Z" fill="${c}" stroke="none"/>`;
        const icoLeaf = (x, y, rot, len, c) => `<path d="M0 0Q${len / 2} ${-len * 0.42} ${len} 0Q${len / 2} ${len * 0.42} 0 0Z" transform="translate(${x} ${y}) rotate(${rot})" fill="${c}"/>`;

        const ITEM_ICONS = (() => {
            const svg = icoSvg, sparkle = icoSparkle, leaf = icoLeaf;
            const bowl = (fill, rim = '#b08d5a') => `<path d="M5 15H27Q27 25 16 26Q5 25 5 15Z" fill="${rim}"/><ellipse cx="16" cy="15" rx="11" ry="3" fill="${fill}"/><path d="M12 27H20" stroke-width="1.6"/>`;
            const steam = c => `<path d="M12 11Q10 8 12 5M17 11Q15 8 17 4M22 11Q20 8 22 5" stroke="${c}" stroke-width="1.1" opacity=".75"/>`;
            const sack = (c, emblem) => `<path d="M12 6Q16 8 20 6L22 9Q27 16 25 24Q23 28 16 28Q9 28 7 24Q5 16 10 9Z" fill="${c}"/><path d="M11 8Q16 11 21 8" stroke="#e2c27a" stroke-width="1.4"/><path d="M12 6L11 3M20 6L21 3" stroke="#a58a55"/>${emblem}`;
            const pill = (base, hi, deco = '', glow = '') => `${glow}<circle cx="16" cy="16" r="9" fill="${base}"/><path d="M10 13Q12 9 16 9" stroke="${hi}" stroke-width="1.8" opacity=".8"/>${deco}`;
            const rock = (fill, facet, extra = '') => `<path d="M5 22L8 12L14 7L22 8L27 15L26 23L18 27L9 26Z" fill="${fill}"/><path d="M8 12L14 16L22 8M14 16L18 27M14 16L5 22M22 8L27 15L14 16L26 23" stroke="${facet}" stroke-width=".9"/>${extra}`;
            const sword = (bl, hi, gd, extra = '') => `${extra}<g transform="rotate(40 16 16)"><path d="M16 1L19.5 6V21H12.5V6Z" fill="${bl}"/><path d="M16 4V19" stroke="${hi}" stroke-width="1.1"/><rect x="8.5" y="21" width="15" height="3" rx="1" fill="${gd}"/><rect x="14.3" y="24" width="3.4" height="5" fill="#7a5638"/><circle cx="16" cy="30" r="1.7" fill="${gd}"/></g>`;
            const armor = (m, t) => `<path d="M9 6L13 4Q16 8 19 4L23 6L27 11L23 14V26H9V14L5 11Z" fill="${m}"/><path d="M13 4Q16 9 19 4M9 14H23M16 9V26" stroke="${t}" stroke-width="1"/><circle cx="12" cy="19" r="1" fill="${t}"/><circle cx="20" cy="19" r="1" fill="${t}"/>`;
            const robe = (m, t, extra = '') => `<path d="M12 3L16 7L20 3L28 12L25 16L22 14V28H10V14L7 16L4 12Z" fill="${m}"/><path d="M12 3L16 15L20 3" stroke="${t}" stroke-width="1.3"/><rect x="10" y="17" width="12" height="2.6" fill="${t}"/>${extra}`;
            const pendant = (gem, frame, extra = '') => `<path d="M8 3Q16 17 24 3" stroke="#c9b07a" stroke-width="1.3"/><circle cx="16" cy="20" r="7" fill="${frame}"/><circle cx="16" cy="20" r="3.6" fill="${gem}"/><path d="M16 27V31" stroke-width="1.4"/>${extra}`;
            const seedSack = (c, emblem) => svg(sack(c, emblem));

            return {
                // —— 灵植与食材 ——
                millet: svg(`<path d="M9 29Q10 18 8 6M16 29Q16 16 16 4M23 29Q22 18 24 6" stroke="#8a7a3c" stroke-width="1.4"/><g fill="#e2c27a"><ellipse cx="8" cy="9" rx="2" ry="3.2"/><ellipse cx="6.6" cy="15" rx="2" ry="3.2"/><ellipse cx="16" cy="7" rx="2" ry="3.2"/><ellipse cx="14.6" cy="13" rx="2" ry="3.2"/><ellipse cx="17.4" cy="13" rx="2" ry="3.2"/><ellipse cx="24" cy="9" rx="2" ry="3.2"/><ellipse cx="25.4" cy="15" rx="2" ry="3.2"/></g>`),
                cleangrass: svg(`<path d="M16 29Q15 20 8 8Q16 12 16 29ZM16 29Q17 18 16 3Q22 12 16 29ZM16 29Q18 21 25 9Q23 20 16 29Z" fill="#7fae6a"/><path d="M16 27Q16 14 16 5" stroke="#dcefc8" stroke-width=".8"/>${sparkle(24, 21, 2.2, '#dcffd0')}`),
                mushroom: svg(`<path d="M12 18Q11 26 13 28H19Q21 26 20 18Z" fill="#e8d9b0"/><path d="M3 18Q3 6 16 6Q29 6 29 18Q29 21 16 21Q3 21 3 18Z" fill="#a8483a"/><path d="M8 16Q16 11 24 16M11 12Q16 9 21 12" stroke="#e2a27a" stroke-width=".9"/>${sparkle(25, 6, 2.2, '#ffe6a8')}`),
                tea: svg(`${steam('#cfe8c8')}${bowl('#7fae6a', '#a58a55')}<path d="M15 15Q18 12 21 15Q18 17 15 15Z" fill="#4f8a4a"/>`),
                lotus: svg(`<path d="M3 24Q10 30 16 27Q22 30 29 24Q22 25 16 23Q10 25 3 24Z" fill="#5f9a6a"/><path d="M16 5Q11 12 16 22Q21 12 16 5Z" fill="#f1b8c8"/><path d="M8 9Q6 17 16 22Q10 15 8 9ZM24 9Q26 17 16 22Q22 15 24 9Z" fill="#e58fa8"/><path d="M4 15Q6 21 16 22Q8 20 4 15ZM28 15Q26 21 16 22Q24 20 28 15Z" fill="#d97695"/><circle cx="16" cy="21" r="1.6" fill="#f3d36a"/>`),
                daofruit: svg(`<path d="M16 9Q15 5 19 3" stroke="#6a5a3a"/>${leaf(16, 7, -30, 9, '#6aa060')}<g fill="#8b6bb0"><circle cx="11" cy="14" r="4"/><circle cx="21" cy="14" r="4"/><circle cx="16" cy="14" r="4"/><circle cx="13.5" cy="20" r="4"/><circle cx="19.5" cy="20" r="4"/><circle cx="16.5" cy="26" r="3.6"/></g><g fill="#fff" stroke="none" opacity=".7"><circle cx="10" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><circle cx="20" cy="13" r="1"/></g>`),
                // —— 种子（布袋 + 徽记） ——
                seed_millet: seedSack('#c9a45a', `<g fill="#f3e0a0" stroke="none"><ellipse cx="13" cy="19" rx="1.4" ry="2.2"/><ellipse cx="16.5" cy="17" rx="1.4" ry="2.2"/><ellipse cx="19.5" cy="20" rx="1.4" ry="2.2"/></g>`),
                seed_cleangrass: seedSack('#7d9a62', leaf(16, 23, -60, 9, '#d6f0c0')),
                seed_mushroom: seedSack('#9a6a5a', `<path d="M11 21Q11 15 16 15Q21 15 21 21Z" fill="#e8b8a0"/><path d="M14 21V24H18V21" fill="#f3e8cc"/>`),
                seed_tea: seedSack('#6f9a7e', `${leaf(13, 22, -45, 7, '#d6f0c0')}${leaf(19, 22, -135, 7, '#d6f0c0')}`),
                seed_lotus: seedSack('#c98a9a', `<path d="M16 15Q12 19 16 24Q20 19 16 15Z" fill="#fbe0e8"/>`),
                seed_daofruit: seedSack('#7a6a9a', `<g fill="#d8c8f0" stroke="none"><circle cx="14" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><circle cx="16" cy="22" r="2"/></g>`),
                danhuo_seed: seedSack('#a5563a', `<path d="M16 14Q21 19 18 24Q16 26 14 24Q11 19 16 14Z" fill="#ffb84a"/>`),
                shenshi_seed: seedSack('#5b5a8a', `<path d="M10 20Q16 13 22 20Q16 27 10 20Z" fill="#dcd6f5"/><circle cx="16" cy="20" r="2.2" fill="#5b3f9a"/>`),
                // —— 矿石 ——
                stone: svg(`<path d="M3 25L6 17L12 15L15 22L13 27Z" fill="#8f8a7c"/><path d="M13 27L15 17L22 12L28 18L26 26Z" fill="#a39e8f"/><path d="M20 26L21 20L27 20" stroke="#6e6a5e" stroke-width=".9"/><path d="M15 17L22 12" stroke="#c9c4b4" stroke-width=".9"/>`),
                ironore: svg(rock('#6b7078', '#4a4e56', `<g fill="#b5673e" stroke="none"><circle cx="10" cy="20" r="1.6"/><circle cx="20" cy="21" r="1.3"/><circle cx="17" cy="11" r="1.2"/></g><path d="M22 8L27 15L21 13Z" fill="#a9b0ba" stroke="none"/>`)),
                spiritore: svg(rock('#6a7a7a', '#3f4f52', `<path d="M9 21L14 16L19 19L24 14" stroke="#7fe8d8" stroke-width="1.8"/>${sparkle(23, 9, 2.6, '#c8fff4')}`)),
                crystal: svg(`<path d="M8 27L6 14L10 6L14 14L13 27Z" fill="#5c5a9a"/><path d="M14 27L13 10L18 2L23 10L22 27Z" fill="#7a72c8"/><path d="M22 27L22 17L26 11L28 18L27 27Z" fill="#4b4886"/><path d="M18 2V27M10 6V27" stroke="#b7b0ee" stroke-width=".8" opacity=".8"/>${sparkle(24, 5, 2.4)}`),
                spiritcrystal: svg(`<path d="M16 2L24 12L16 30L8 12Z" fill="#8fd8f0"/><path d="M8 12H24M16 2L13 12L16 30L19 12Z" stroke="#e2f8ff" stroke-width=".9"/><path d="M13 12L16 30M19 12L16 30" stroke="#5fa8c8" stroke-width=".7"/>${sparkle(6, 7, 2.2)}${sparkle(26, 23, 2)}`),
                immortalore: svg(rock('#c9b479', '#8a743a', `<path d="M9 22L14 15L18 20L24 12" stroke="#fff2b0" stroke-width="1.8"/>${sparkle(8, 9, 2.6)}${sparkle(25, 24, 2.2)}${sparkle(23, 7, 2)}`)),
                chaosstone: svg(`<circle cx="16" cy="16" r="12" fill="#2a2440"/><path d="M16 4A12 12 0 0 1 16 28A6 6 0 0 1 16 16A6 6 0 0 0 16 4Z" fill="#6a4fa8" stroke="none"/><circle cx="16" cy="10" r="1.8" fill="#2a2440" stroke="none"/><circle cx="16" cy="22" r="1.8" fill="#c9b8f0" stroke="none"/><circle cx="16" cy="16" r="12" stroke="#8a72c8" stroke-width=".8"/>`),
                spiritstone: svg(`<path d="M8 10L16 4L24 10L26 21L16 28L6 21Z" fill="#59c9b0"/><path d="M8 10L16 15L24 10M16 15V28M6 21L16 15L26 21" stroke="#c6fff0" stroke-width=".9"/><path d="M8 10L6 21L16 15Z" fill="#3ea08e" stroke="none" opacity=".7"/>${sparkle(24, 5, 2.2)}`),
                test_ring: svg(`<circle cx="16" cy="19" r="8" stroke="#e2c27a" stroke-width="3.4"/><circle cx="16" cy="19" r="8" stroke="#8a6a2a" stroke-width=".8"/><path d="M11.5 9L16 3.5L20.5 9L16 14Z" fill="#7fe0e8"/><path d="M16 3.5V14M11.5 9H20.5" stroke="#dffcff" stroke-width=".8"/>${sparkle(26, 6, 2.4)}${sparkle(6, 25, 2)}`),
                jade: svg(`<path d="M12 4Q16 8 20 4" stroke="#c9b07a" stroke-width="1.3"/><circle cx="16" cy="18" r="10" fill="#7fc49a"/><circle cx="16" cy="18" r="3.6" fill="#1c1812" stroke-width="1"/><path d="M9 14Q11 10 15 9" stroke="#d6ffe6" stroke-width="1.4" opacity=".8"/><path d="M16 12V14M16 22V24M10 18H12M20 18H22" stroke="#4f9a72" stroke-width=".8"/>`),
                // —— 丹药 ——
                restpill: svg(pill('#e6e2d0', '#fff', leaf(15, 18, -30, 8, '#7fae6a'))),
                pill: svg(pill('#d8ac52', '#fff0b8', '<path d="M11 18Q16 12 21 18Q16 22 11 18Z" stroke="#8a6220" stroke-width="1"/>', '<circle cx="16" cy="16" r="12" stroke="#f3d36a" stroke-width=".8" opacity=".6"/>')),
                gatherpill: svg(pill('#5b8fd0', '#cfe6ff', '<circle cx="16" cy="16" r="4" stroke="#e0f0ff" stroke-width="1"/>', '<circle cx="16" cy="16" r="12" stroke="#8fc0ff" stroke-width=".8" opacity=".6"/>')),
                realmpill: svg(pill('#8b5fb8', '#e2ccff', sparkle(16, 17, 4.5, '#f5e6ff'), '<circle cx="16" cy="16" r="12" stroke="#c9a0f0" stroke-width=".8" opacity=".6"/>')),
                marrpill: svg(pill('#e0c04a', '#fff6b8', '<path d="M12 18Q16 22 20 18" stroke="#8a6c14" stroke-width="1.2"/>', sparkle(25, 7, 2.4))),
                goldenpill: svg(pill('#a8763a', '#f0cf8a', '<path d="M10 20L14 15L17 19L22 12" stroke="#ffe08a" stroke-width="1.3"/>', '<circle cx="16" cy="16" r="12.5" stroke="#f3c04a" stroke-width="1.4" opacity=".7"/>')),
                yuanyingpill: svg(pill('#d05a4a', '#ffc8b8', '<circle cx="16" cy="14" r="2.6" fill="#ffe8d0"/><path d="M11 22Q16 15 21 22Z" fill="#ffe8d0" stroke="none"/>', '<circle cx="16" cy="16" r="12.5" stroke="#f08a6a" stroke-width="1.2" opacity=".7"/>')),
                huashenpill: svg(pill('#e6f4f2', '#fff', '<g fill="#5bb0c0" stroke="none"><circle cx="16" cy="11" r="1.3"/><circle cx="16" cy="21" r="1.3"/><circle cx="11" cy="16" r="1.3"/><circle cx="21" cy="16" r="1.3"/><circle cx="16" cy="16" r="1.6"/></g>', '<circle cx="16" cy="16" r="13" stroke="#8fe0e8" stroke-width="1.4" opacity=".8"/>')),
                spiritpill: svg(pill('#3f74c0', '#bfdcff', '<circle cx="16" cy="16" r="5" stroke="#dbeaff" stroke-width="1"/><circle cx="16" cy="16" r="2" fill="#dbeaff" stroke="none"/>', `<circle cx="16" cy="16" r="12.5" stroke="#7fb0ff" stroke-width="1.2" opacity=".7"/>${sparkle(26, 6, 2.2)}`)),
                // —— 丹火 / 神识 / 精华 ——
                danhuo: svg(`<path d="M16 2Q22 10 24 16Q27 24 20 29Q16 31 12 29Q5 24 8 16Q9 12 12 9Q12 13 14 14Q13 8 16 2Z" fill="#e8642a"/><path d="M16 14Q20 19 19 23Q18 27 16 27Q13 27 13 23Q13 19 16 14Z" fill="#ffc94a"/><path d="M16 21Q17.5 23 16 26Q14.5 23 16 21Z" fill="#fff4c4" stroke="none"/>`),
                daoguo: svg(`<path d="M16 8Q9 6 6 13Q4 22 11 28Q16 30 21 28Q28 22 26 13Q23 6 16 8Z" fill="#d9a441"/><path d="M16 8Q16 4 19 2" stroke="#6f4a1e" stroke-width="1.6"/><path d="M19 5Q23 3 26 6Q22 9 19 5Z" fill="#6fae7a" stroke="none"/><path d="M11 13Q9 17 11 22" stroke="#fff0b8" stroke-width="1.6" opacity=".8"/>${sparkle(25, 22, 2)}`),
                shenshi: svg(`<path d="M2 16Q16 3 30 16Q16 29 2 16Z" fill="#e6e0f8"/><circle cx="16" cy="16" r="6" fill="#6a48b0"/><circle cx="16" cy="16" r="2.6" fill="#1c1430"/><circle cx="14" cy="14" r="1.2" fill="#fff" stroke="none"/><path d="M16 1V5M6 5L8 8M26 5L24 8" stroke="#b7a0f0" stroke-width="1.3"/>`),
                // —— 食物 ——
                millet_porridge: svg(`${steam('#f0e8d0')}${bowl('#f0e0a8')}<g fill="#c9a45a" stroke="none"><circle cx="12" cy="15" r=".9"/><circle cx="16" cy="14.5" r=".9"/><circle cx="20" cy="15.2" r=".9"/></g>`),
                herb_soup: svg(`${steam('#d6f0c8')}${bowl('#8ab86a')}${leaf(11, 15, -20, 5, '#3f7a3f')}${leaf(19, 15.5, -160, 5, '#3f7a3f')}`),
                mushroom_stew: svg(`${steam('#f0e0d0')}${bowl('#a8703f', '#8a6a4a')}<path d="M12 15Q12 11 16 11Q20 11 20 15Z" fill="#e8b8a0"/>`),
                immortal_peach: svg(`<path d="M16 8Q7 6 5 16Q4 27 16 29Q28 27 27 16Q25 6 16 8Z" fill="#f4a8a0"/><path d="M16 8Q18 18 16 29" stroke="#d97a7a" stroke-width="1"/><path d="M22 12Q26 15 25 21" stroke="#fff" stroke-width="1.3" opacity=".6"/>${leaf(16, 8, -40, 10, '#5fa060')}${leaf(16, 8, -140, 7, '#7fb870')}`),
                jade_nectar: svg(`<rect x="13.5" y="2" width="5" height="4" rx="1" fill="#b08d5a"/><path d="M14 6Q14 9 10 12Q6 16 7 22Q8 29 16 29Q24 29 25 22Q26 16 22 12Q18 9 18 6Z" fill="#7fc4a0"/><path d="M10 18Q16 21 22 18" stroke="#d6ffe6" stroke-width="1" opacity=".7"/><path d="M11 14Q9 17 10 21" stroke="#fff" stroke-width="1.3" opacity=".6"/>${sparkle(25, 7, 2)}`),
                // —— 武器 ——
                sword: svg(sword('#b98a5a', '#dcb586', '#8a6a3a')),
                ironblade: svg(sword('#9aa3ad', '#e4e9ee', '#5a4a36')),
                spiritsword: svg(sword('#bfe0ee', '#fff', '#6fa0b8', '<path d="M8 6L4 13H8L5 20" stroke="#f3d36a" stroke-width="1.4"/>')),
                goldensword: svg(sword('#e2c27a', '#fff4c4', '#a86a2a')),
                yuanyingsword: svg(sword('#f0b8a8', '#fff', '#d8a24a', '<path d="M6 26Q3 18 8 14Q7 19 10 21ZM26 26Q29 18 24 14Q25 19 22 21Z" fill="#e8642a" stroke="none" opacity=".8"/>')),
                huashensword: svg(sword('#e6f8f6', '#fff', '#5bb0c0', '<circle cx="16" cy="16" r="14" stroke="#8fe0e8" stroke-width="1" opacity=".7"/>')),
                // —— 护甲 / 法衣 ——
                ironarmor: svg(armor('#8a929c', '#4a5058')),
                spiritarmor: svg(armor('#5fb0b8', '#2f6a72')),
                goldenarmor: svg(robe('#d8b45a', '#8a5a1a')),
                yuanyingarmor: svg(robe('#a8483a', '#e2c27a', sparkle(16, 23, 2.8, '#ffe8b0'))),
                huashenarmor: svg(robe('#e6f4f2', '#5bb0c0', '<path d="M12 24Q14 22 16 24Q18 22 20 24" stroke="#8fc8d0" stroke-width="1"/>')),
                // —— 佩饰 ——
                goldenpendant: svg(pendant('#e8642a', '#d8b45a')),
                yuanyingpendant: svg(pendant('#d0384a', '#c99a4a', sparkle(25, 22, 2.2))),
                huashenpendant: svg(pendant('#7fe0e8', '#e6f4f2', `${sparkle(25, 22, 2.4)}<circle cx="16" cy="20" r="8" stroke="#8fe0e8" stroke-width=".8" opacity=".7"/>`)),
                hetipill: svg(pill('#f6ecd0', '#fff', '<g fill="#c9a04a" stroke="none"><circle cx="16" cy="16" r="3"/></g><path d="M16 9V13M16 19V23M9 16H13M19 16H23" stroke="#c9a04a" stroke-width="1.4"/>', '<circle cx="16" cy="16" r="13" stroke="#f3d36a" stroke-width="1.4" opacity=".85"/>')),
                hetisword: svg(sword('#f6ecd0', '#fff', '#c9a04a', '<circle cx="16" cy="16" r="14" stroke="#f3d36a" stroke-width="1" opacity=".7"/>')),
                hetiarmor: svg(robe('#f6ecd0', '#c9a04a', '<path d="M12 24Q14 22 16 24Q18 22 20 24" stroke="#d8b868" stroke-width="1"/>')),
                hetipendant: svg(pendant('#f3d36a', '#f6ecd0', `${sparkle(25, 22, 2.4)}<circle cx="16" cy="20" r="8" stroke="#f3d36a" stroke-width=".8" opacity=".7"/>`)),
                jade_marrow: svg(`<rect x="13.5" y="2" width="5" height="4" rx="1" fill="#b08d5a"/><path d="M14 6Q14 9 10 12Q6 16 7 22Q8 29 16 29Q24 29 25 22Q26 16 22 12Q18 9 18 6Z" fill="#e8c46a"/><path d="M10 18Q16 21 22 18" stroke="#fff3c4" stroke-width="1" opacity=".8"/><path d="M11 14Q9 17 10 21" stroke="#fff" stroke-width="1.3" opacity=".6"/>${sparkle(25, 7, 2)}`),
                daostone: svg(rock('#d9a441', '#8a5a1a', `<path d="M9 22L14 15L18 20L24 12" stroke="#fff0b8" stroke-width="1.8"/>${sparkle(8, 9, 2.6)}${sparkle(25, 24, 2.2)}`)),
                daoguo_seed: seedSack('#a07a2a', `<path d="M10 20Q16 13 22 20Q16 27 10 20Z" fill="#ffe8a0"/><circle cx="16" cy="20" r="2.2" fill="#8a5a1a"/>`),
                // —— 炼虚期新物品 ——
                voidcrystal: svg(rock('#b8a0e8', '#5a3a8a', `<path d="M16 5V27M9 12L23 20M23 12L9 20" stroke="#f0e6ff" stroke-width="1" opacity=".7"/>${sparkle(8, 9, 2.4)}${sparkle(25, 24, 2)}`)),
                voidcrystal_seed: seedSack('#5a3a8a', `<path d="M10 20Q16 13 22 20Q16 27 10 20Z" fill="#e0d0ff"/><circle cx="16" cy="20" r="2.2" fill="#3a1a6a"/>`),
                huaxupill: svg(pill('#e6ddf6', '#fff', '<g fill="#8a6ad8" stroke="none"><circle cx="16" cy="16" r="3"/></g><path d="M16 9V13M16 19V23M9 16H13M19 16H23" stroke="#8a6ad8" stroke-width="1.4"/>', '<circle cx="16" cy="16" r="13" stroke="#c8b8f0" stroke-width="1.4" opacity=".85"/>')),
                lianxusword: svg(sword('#e6ddf6', '#fff', '#8a6ad8', '<circle cx="16" cy="16" r="14" stroke="#c8b8f0" stroke-width="1" opacity=".7"/>')),
                lianxuarmor: svg(robe('#e6ddf6', '#8a6ad8', '<path d="M12 24Q14 22 16 24Q18 22 20 24" stroke="#b8a8e0" stroke-width="1"/>')),
                lianxupendant: svg(pendant('#c8b8f0', '#e6ddf6', `${sparkle(25, 22, 2.4)}<circle cx="16" cy="20" r="8" stroke="#c8b8f0" stroke-width=".8" opacity=".7"/>`)),
                void_nectar: svg(`<rect x="13.5" y="2" width="5" height="4" rx="1" fill="#6a5a8a"/><path d="M14 6Q14 9 10 12Q6 16 7 22Q8 29 16 29Q24 29 25 22Q26 16 22 12Q18 9 18 6Z" fill="#b8a0e0"/><path d="M10 18Q16 21 22 18" stroke="#f0e6ff" stroke-width="1" opacity=".8"/><path d="M11 14Q9 17 10 21" stroke="#fff" stroke-width="1.3" opacity=".6"/>${sparkle(25, 7, 2)}`),
                // —— 大乘期新物品 ——
                taiyiessence: svg(rock('#f3d36a', '#8a6a1a', `<path d="M16 5V27M9 12L23 20M23 12L9 20" stroke="#fff8dc" stroke-width="1" opacity=".8"/>${sparkle(8, 9, 2.6)}${sparkle(25, 24, 2.2)}${sparkle(16, 16, 2)}`)),
                dachengpill: svg(pill('#fff4d8', '#fff', '<g fill="#e8b84a" stroke="none"><circle cx="16" cy="16" r="3.4"/></g><path d="M16 8V13M16 19V24M8 16H13M19 16H24" stroke="#e8b84a" stroke-width="1.5"/>', '<circle cx="16" cy="16" r="14" stroke="#f3d36a" stroke-width="1.6" opacity=".9"/>')),
                dachengsword: svg(sword('#fff4d8', '#fff', '#e8b84a', '<circle cx="16" cy="16" r="15" stroke="#f3d36a" stroke-width="1.2" opacity=".8"/>')),
                dachengarmor: svg(robe('#fff4d8', '#e8b84a', '<path d="M12 24Q14 22 16 24Q18 22 20 24" stroke="#f0d888" stroke-width="1"/>')),
                dachengpendant: svg(pendant('#f3d36a', '#fff4d8', `${sparkle(25, 22, 2.6)}<circle cx="16" cy="20" r="8" stroke="#f3d36a" stroke-width=".9" opacity=".8"/>`)),
                taiyi_nectar: svg(`<rect x="13.5" y="2" width="5" height="4" rx="1" fill="#8a6a1a"/><path d="M14 6Q14 9 10 12Q6 16 7 22Q8 29 16 29Q24 29 25 22Q26 16 22 12Q18 9 18 6Z" fill="#f3d36a"/><path d="M10 18Q16 21 22 18" stroke="#fff8dc" stroke-width="1" opacity=".8"/><path d="M11 14Q9 17 10 21" stroke="#fff" stroke-width="1.3" opacity=".6"/>${sparkle(25, 7, 2.2)}${sparkle(9, 9, 1.8)}`),
                nascentsoul_essence: svg(`<circle cx="16" cy="16" r="11" fill="#e6e0f8" opacity=".85"/><circle cx="16" cy="16" r="7" fill="#b39ddb"/><circle cx="16" cy="16" r="3" fill="#3a1a6a" stroke="none"/><circle cx="14" cy="14" r="1.2" fill="#fff" stroke="none"/>${sparkle(25, 8, 2.2)}${sparkle(7, 24, 2)}`)
            };
        })();

        // 核心资源图标：修为（金色灵气漩涡）、灵石（与物品「灵石」同一枚青绿晶石）
        const QI_ICON = icoSvg(`<circle cx="16" cy="16" r="13" fill="#3a2e14"/><path d="M16 4A12 12 0 0 1 28 16A8.5 8.5 0 0 1 16 24.5A5 5 0 0 1 11 16A2.8 2.8 0 0 1 16 13.5" stroke="#f3d36a" stroke-width="2.4"/><circle cx="16" cy="16" r="1.7" fill="#fff4c4" stroke="none"/>${icoSparkle(6, 7, 2.2)}${icoSparkle(27, 27, 2)}`);
        const COIN_ICON = ITEM_ICONS.spiritstone;

        // ==================== 丹火 / 神识：独立货币与用途（v6.51 重构） ====================
        // 丹火（金丹起）与神识（元婴起）不再是背包物品，而是像灵石一样的数值（player.danhuo / player.shenshi），不能出售。
        // 产出：各自技能的配方、战斗区域胜利、秘境通关；消耗：
        //   丹火 —— 淬炼装备（武器 / 护甲 / 饰品各自 0–10 级，每级 +4% 该部位属性）、强化灵根（0–10 级，灵根特效 ×(1+5%×级)）、炼丹助炼（提高翻倍产出概率）
        //   神识 —— 分身强化（更快、更容易翻倍）、专注（生活技能耗时 -1.5%/级）、神识感应（暴击 / 闪避 +1%/级）、神识探查（下次秘境掉落 ×1.5）
        // 突破丹药只能在炼丹里制作（丹火 / 神识只可选择性「助炼」，不是炼制路径）。
        const DANHUO_ICON = ITEM_ICONS.danhuo;
        const SHENSHI_ICON = ITEM_ICONS.shenshi;
        const TEMPER_MAX = 10, TEMPER_PER_LEVEL = 0.04;
        const TEMPER_SLOTS = [{ key: 'weapon', name: '武器', icon: '⚔️' }, { key: 'armor', name: '护甲', icon: '🛡️' }, { key: 'jewelry', name: '饰品', icon: '📿' }];
        const ROOT_MAX = 10, ROOT_PER_LEVEL = 0.05;
        const DANHUO_BOOST_DOUBLE = 0.25;        // 炼丹助炼：额外翻倍概率
        const SCOUT_COST = 60, SCOUT_MULT = 1.5;  // 神识探查：花费与下次秘境掉落倍率
        const SHEN_UPGRADES = {
            clone: { name: '分身强化', icon: '🌀', max: 10, base: 20, desc: '分身耗时 -3%/级（最快与主角持平），分身产出翻倍概率 +2%/级' },
            focus: { name: '专注', icon: '⏱', max: 10, base: 24, desc: '生活技能与悟道耗时 -1.5%/级（最多 -15%）' },
            sense: { name: '神识感应', icon: '👁️', max: 10, base: 24, desc: '战斗暴击率 +1%/级、闪避 +1%/级' }
        };

        function temperCost(level) { return Math.round(25 * Math.pow(level + 1, 1.5)); }
        function rootCost(level) { return Math.round(30 * Math.pow(level + 1, 1.5)); }
        function shenCost(kind, level) { return Math.round(SHEN_UPGRADES[kind].base * Math.pow(level + 1, 1.5)); }
        // 炼丹助炼每次消耗的丹火：按配方基础耗时折算（8 秒的灵米粥 1 个，2 分钟的化神丹 8 个）
        function boostCost(action) { return Math.max(1, Math.ceil((action.duration || 0) / 15)); }

        // 玩家身上的丹火 / 神识 / 各项强化等级；旧存档与新角色都从这里补全默认值
        function ensureCurrencyState() {
            const P = gameState.player;
            if (typeof P.danhuo !== 'number') P.danhuo = 0;
            if (typeof P.shenshi !== 'number') P.shenshi = 0;
            if (typeof P.daoguo !== 'number') P.daoguo = 0;
            if (typeof P.daoBody !== 'number') P.daoBody = 0;
            if (typeof P.daoLaw !== 'number') P.daoLaw = 0;
            if (typeof P.nascentSoul !== 'number') P.nascentSoul = 0;
            if (typeof P.coinRefine !== 'number') P.coinRefine = 0;
            if (typeof P.xianqiao !== 'number') P.xianqiao = 0;
            if (typeof P.marrowCleansed !== 'boolean') P.marrowCleansed = false;
            if (P.activeDomain === undefined) P.activeDomain = null;
            if (typeof P.avatarLevel !== 'number') P.avatarLevel = 0;
            if (!P.temper) P.temper = { weapon: 0, armor: 0, jewelry: 0 };
            if (typeof P.rootLevel !== 'number') P.rootLevel = 0;
            if (!P.shen) P.shen = { clone: 0, focus: 0, sense: 0 };
            if (P.alchemyBoost === undefined) P.alchemyBoost = false;
            if (!Array.isArray(P.skillUpgrades)) P.skillUpgrades = [];
            invalidateSkillUpgrades();
            return P;
        }
        function getTemper(slot) { return ((gameState.player.temper || {})[slot]) || 0; }
        function getRootLevel() { return gameState.player.rootLevel || 0; }
        function getShenLevel(kind) { return ((gameState.player.shen || {})[kind]) || 0; }
        function isDanhuoUnlocked() { return gameState.player.realmIndex >= 18; }   // v6.89：原索引9 → +9
        function isShenshiUnlocked() { return gameState.player.realmIndex >= 22; }   // 原索引13 → +9
        // v6.89：练气13层后，「大境界圆满→下一大境界初期」的突破点不再是均匀的 %4===0，
        // 改成显式列表（原索引 4,8,12,16,20,24,28,32 → 13,17,21,25,29,33,37,41）
        const MAJOR_BREAKTHROUGH_INDICES = new Set([13, 17, 21, 25, 29, 33, 37, 41]);

        // 灵根特效经强化后的实际数值（getMod 和界面都用它）
        function getRootEffectsScaled() {
            const root = SPIRIT_ROOT_EFFECTS[gameState.player.spiritRoot];
            if (!root) return {};
            const scale = 1 + ROOT_PER_LEVEL * getRootLevel();
            const out = {};
            Object.entries(root.effects).forEach(([k, v]) => { out[k] = v * scale; });
            return out;
        }

        function spendNotify(kind, need) {
            const have = gameState.player[kind];
            showNotification(`${{ danhuo: '丹火', shenshi: '神识', daoguo: '道果' }[kind]}不足：需要 ${need}，现有 ${have}`, '#c4483a', 'error');
        }

        function afterCurrencySpend() {
            calculateStats();
            updateUI();
            renderSkillUses();
            saveGame();
        }

        // 淬炼装备：按部位（武器 / 护甲 / 饰品）独立，装备换了淬炼等级保留
        function upgradeTemper(slot) {
            const P = ensureCurrencyState();
            const lv = getTemper(slot);
            if (lv >= TEMPER_MAX) { showNotification('这个部位已淬炼至最高级', '#c98a3e'); return; }
            const cost = temperCost(lv);
            if (P.danhuo < cost) { spendNotify('danhuo', cost); return; }
            P.danhuo -= cost;
            P.temper[slot] = lv + 1;
            showNotification(`🔥 淬炼成功！${TEMPER_SLOTS.find(s => s.key === slot).name}属性 +${Math.round((lv + 1) * TEMPER_PER_LEVEL * 100)}%`, '#6f9c8a');
            afterCurrencySpend();
        }

        // 强化灵根：灵根自带的全部特效整体放大
        function upgradeRoot() {
            const P = ensureCurrencyState();
            const lv = getRootLevel();
            if (lv >= ROOT_MAX) { showNotification('灵根已强化至最高级', '#c98a3e'); return; }
            const cost = rootCost(lv);
            if (P.danhuo < cost) { spendNotify('danhuo', cost); return; }
            P.danhuo -= cost;
            P.rootLevel = lv + 1;
            showNotification(`🌱 灵根强化成功！灵根特效 +${Math.round((lv + 1) * ROOT_PER_LEVEL * 100)}%`, '#6f9c8a');
            afterCurrencySpend();
        }

        function toggleAlchemyBoost() {
            const P = ensureCurrencyState();
            P.alchemyBoost = !P.alchemyBoost;
            showNotification(P.alchemyBoost ? '🔥 已开启丹火助炼：炼丹时消耗丹火，产出翻倍概率 +25%' : '已关闭丹火助炼', '#b89a5b');
            renderAlchemyBoostBar();
            renderSkillUses();
            saveGame();
        }

        // 神识强化（分身强化 / 专注 / 神识感应）
        function upgradeShen(kind) {
            const P = ensureCurrencyState();
            const u = SHEN_UPGRADES[kind];
            if (!u) return;
            const lv = getShenLevel(kind);
            if (lv >= u.max) { showNotification(`${u.name}已至最高级`, '#c98a3e'); return; }
            const cost = shenCost(kind, lv);
            if (P.shenshi < cost) { spendNotify('shenshi', cost); return; }
            P.shenshi -= cost;
            P.shen[kind] = lv + 1;
            showNotification(`👁️ ${u.name} Lv.${lv + 1}`, '#6f9c8a');
            afterCurrencySpend();
        }

        // 神识探查：花神识，让下一次通关秘境的随机掉落率 ×1.5
        function castScout() {
            const P = ensureCurrencyState();
            if (P.scoutBonus) { showNotification('神识探查已生效，通关下一个秘境后消耗', '#c98a3e'); return; }
            if (P.shenshi < SCOUT_COST) { spendNotify('shenshi', SCOUT_COST); return; }
            P.shenshi -= SCOUT_COST;
            P.scoutBonus = true;
            showNotification('🔍 神识探查：下次通关秘境，随机掉落率 +50%', '#6fa980');
            updateUI();
            renderSkillUses();
            saveGame();
        }

        // 炼丹助炼（联机结算：批量 n 次，用于离线 / 分身离线）：返回额外的翻倍概率并扣除丹火
        function applyAlchemyBoostBatch(skill, action, n) {
            const P = gameState.player;
            if (skill !== 'alchemy' || !P.alchemyBoost || !(n > 0)) return 0;
            const cost = boostCost(action);
            const boosted = Math.min(n, Math.floor((P.danhuo || 0) / cost));
            if (boosted <= 0) return 0;
            P.danhuo -= boosted * cost;
            return DANHUO_BOOST_DOUBLE * boosted / n;
        }

        // 分身产出翻倍概率加成（分身强化）
        function getCloneDoubleBonus() { return 0.02 * getShenLevel('clone'); }

        // 丹火 / 神识产出
        function addCurrency(output) {
            const P = ensureCurrencyState();
            if (output.danhuo) P.danhuo += output.danhuo;
            if (output.shenshi) P.shenshi += output.shenshi;
            if (output.daoguo) P.daoguo += output.daoguo;
        }

        const CURRENCY_NAMES = { danhuo: '丹火', shenshi: '神识', daoguo: '道果' };
        const CURRENCY_ICONS = { coins: () => COIN_ICON, danhuo: () => DANHUO_ICON, shenshi: () => SHENSHI_ICON, daoguo: () => DAOGUO_ICON };
        // 战斗区域胜利掉落的丹火 / 神识（金丹级战斗区域起掉丹火，元婴级起掉神识；乘该区域精通的奖励加成）
        const BATTLE_CURRENCY = {
            goldenPlains:      { danhuo: [1, 2] },
            tribulationGround: { danhuo: [2, 3] },
            voidSea:           { danhuo: [2, 4], shenshi: [1, 2] },
            abyssRuins:        { danhuo: [3, 5], shenshi: [2, 3] },
            chaosWastes:       { danhuo: [4, 6], shenshi: [3, 4] },
            nineNether:        { danhuo: [5, 8], shenshi: [4, 6] },
            daoWastes:         { danhuo: [10, 14], shenshi: [8, 11], daoguo: [3, 5] },
            fusionVoid:        { danhuo: [13, 18], shenshi: [10, 14], daoguo: [4, 6] },
            voidAbyss:         { danhuo: [6, 9], shenshi: [5, 7], daoguo: [1, 2] },
            huashiRealm:       { danhuo: [8, 12], shenshi: [6, 9], daoguo: [2, 4] },
            taiyiField:        { danhuo: [18, 26], shenshi: [15, 22], daoguo: [5, 8] },
            lingjieAbyss:      { danhuo: [24, 34], shenshi: [20, 30], daoguo: [7, 11] },
            xianbattle:        { danhuo: [30, 42], shenshi: [26, 38], daoguo: [10, 15] }
        };
        function rollAreaCurrency(areaKey, bonus) {
            const cfg = BATTLE_CURRENCY[areaKey] || {};
            const got = { danhuo: 0, shenshi: 0, daoguo: 0 };
            Object.entries(cfg).forEach(([kind, [lo, hi]]) => {
                got[kind] = Math.max(1, Math.round((lo + Math.floor(Math.random() * (hi - lo + 1))) * bonus));
            });
            addCurrency(got);
            return got;
        }
        function areaCurrencyText(areaKey, bonus) {
            const cfg = BATTLE_CURRENCY[areaKey];
            if (!cfg) return '';
            return Object.entries(cfg).map(([kind, [lo, hi]]) => {
                const a = Math.max(1, Math.round(lo * bonus)), b = Math.max(1, Math.round(hi * bonus));
                return `${CURRENCY_ICONS[kind]()} ${a === b ? a : a + '–' + b} ${CURRENCY_NAMES[kind]}`;
            }).join(' · ');
        }


        // ---- 丹火 / 神识：界面 ----
        // 顶部货币条：丹火（金丹起）、神识（元婴起）；桌面在侧栏灵石下面，手机在头部灵石条旁
        function updateCurrencyChips() {
            const P = gameState.player;
            const show = { danhuo: isDanhuoUnlocked(), shenshi: isShenshiUnlocked(), daoguo: isDaoguoUnlocked() };
            ['danhuo', 'shenshi', 'daoguo'].forEach(kind => {
                const val = Math.floor(P[kind] || 0);
                document.querySelectorAll(`[data-cur="${kind}"]`).forEach(el => {
                    el.style.display = show[kind] ? '' : 'none';
                    const amount = el.querySelector('.cur-amount');
                    if (amount) amount.textContent = val;
                });
            });
        }

        // 炼丹面板顶部的「丹火助炼」开关
        function renderAlchemyBoostBar() {
            const el = document.getElementById('alchemyBoostBar');
            if (!el) return;
            if (!isDanhuoUnlocked()) { el.style.display = 'none'; return; }
            const P = ensureCurrencyState();
            el.style.display = '';
            el.innerHTML = `<label class="boost-toggle"><input type="checkbox" ${P.alchemyBoost ? 'checked' : ''} onchange="toggleAlchemyBoost()"><span>🔥 丹火助炼</span></label>
                <span class="boost-desc">开启后每次炼丹消耗丹火（按配方耗时折算：8 秒的 1 个，2 分钟的 8 个），产出翻倍概率 +25%；丹火不够时自动不助炼</span>
                <span class="boost-bal">${DANHUO_ICON} ${Math.floor(P.danhuo)} 丹火</span>`;
        }

        function useRow(name, lvText, effectText, cost, currency, onclick, maxed) {
            const P = gameState.player;
            const affordable = P[currency] >= cost;
            const icon = CURRENCY_ICONS[currency]();
            return `<div class="use-row">
                <div class="use-main"><b>${name}</b> <span class="use-lv">${lvText}</span><div class="use-effect">${effectText}</div></div>
                ${maxed ? '<span class="use-max">已满级</span>'
                    : `<button type="button" class="btn ${affordable ? '' : 'btn-secondary'} use-btn" onclick="${onclick}">${affordable ? '升级' : '不足'} ${icon}${cost}</button>`}
            </div>`;
        }

        function renderDanhuoUses() {
            const el = document.getElementById('danhuoUses');
            if (el) el.innerHTML = danhuoUsesHtml();
        }

        function danhuoUsesHtml() {
            const P = ensureCurrencyState();
            const forgeLv = (gameState.skills.forging || {}).level || 1;
            const temperRows = TEMPER_SLOTS.map(s => {
                const lv = getTemper(s.key);
                const maxed = lv >= TEMPER_MAX;
                const cur = Math.round(lv * TEMPER_PER_LEVEL * 100);
                return useRow(`${s.icon} ${s.name}`, `淬炼 Lv.${lv}/${TEMPER_MAX}`, `该部位装备属性 +${cur}%${maxed ? '' : ` → +${cur + Math.round(TEMPER_PER_LEVEL * 100)}%`}`, temperCost(lv), 'danhuo', `upgradeTemper('${s.key}')`, maxed);
            }).join('');
            const rlv = getRootLevel();
            const root = SPIRIT_ROOT_EFFECTS[P.spiritRoot];
            const rootEff = describeEffects(getRootEffectsScaled()).join(' · ');
            const rootRow = root ? useRow(`${ROOT_ICONS[P.spiritRoot]} ${root.name}`, `强化 Lv.${rlv}/${ROOT_MAX}`, `灵根特效整体 +${Math.round(rlv * ROOT_PER_LEVEL * 100)}%${rlv >= ROOT_MAX ? '' : ` → +${Math.round((rlv + 1) * ROOT_PER_LEVEL * 100)}%`}<br/>${rootEff}`, rootCost(rlv), 'danhuo', 'upgradeRoot()', rlv >= ROOT_MAX) : '';
            return `
                <div class="use-balance">${DANHUO_ICON} 丹火 <b>${Math.floor(P.danhuo)}</b><small>产出：丹火技能的配方（凝聚 / 培育 / 提炼 / 凝练）· 金丹级战斗区域胜利 · 秘境通关。丹火不能出售，只用来变强和购买商品。</small></div>
                <div class="use-card"><div class="use-title">🔨 淬炼台 <small>联动炼器：武器 / 护甲 / 饰品各自淬炼，每级 +${Math.round(TEMPER_PER_LEVEL * 100)}% 该部位装备属性；换装备后等级保留，与炼器等级加成（当前 Lv.${forgeLv}）相乘</small></div>${temperRows}</div>
                <div class="use-card"><div class="use-title">🌱 强化灵根 <small>联动战斗：灵根自带的全部特效（攻击、暴击、耗时、翻倍……）整体放大，每级 +${Math.round(ROOT_PER_LEVEL * 100)}%</small></div>${rootRow}</div>
                <div class="use-card"><div class="use-title">⚗️ 炼丹助炼 <small>联动炼丹：在炼丹页开启，每次炼丹消耗丹火，产出翻倍概率 +25%（当前${P.alchemyBoost ? '已开启' : '未开启'}）</small></div>
                    <div class="use-row"><div class="use-main"><div class="use-effect">突破丹药只能在炼丹里制作（炼丹等级 + 普通材料），丹火只是助炼的选择，不是炼制路径。</div></div>
                    <button type="button" class="btn btn-secondary use-btn" onclick="toggleAlchemyBoost()">${P.alchemyBoost ? '关闭助炼' : '开启助炼'}</button></div></div>`;
        }

        function renderShenshiUses() {
            const el = document.getElementById('shenshiUses');
            if (el) el.innerHTML = shenshiUsesHtml();
        }

        // ---- 化神期：身外化身（v6.77，被动加成） ----
        // 原著：化神期修士可炼制身外化身，调动部分天地之力——游戏化为化神初期起解锁的被动养成轨道，
        // 花神识把化身等级从 0 升到 10 级，永久小幅提升攻击 / 防御（并入 getMod，跟元婴蜕变、道果淬体一个模式）
        const AVATAR_MAX = 10;
        const AVATAR_ATK_PER_LEVEL = 0.015;
        const AVATAR_DEF_PER_LEVEL = 0.015;
        function getAvatarLevel() { return gameState.player.avatarLevel || 0; }
        function avatarCost(level) { return Math.round(30 * Math.pow(level + 1, 1.5)); }
        function getAvatarMod(key) {
            if (key !== 'atkPct' && key !== 'defPct') return 0;
            const lv = getAvatarLevel();
            return key === 'atkPct' ? lv * AVATAR_ATK_PER_LEVEL : lv * AVATAR_DEF_PER_LEVEL;
        }
        function upgradeAvatar() {
            const P = ensureCurrencyState();
            const lv = getAvatarLevel();
            if (lv >= AVATAR_MAX) { showNotification('身外化身已炼至大成', '#c98a3e'); return; }
            const cost = avatarCost(lv);
            if (P.shenshi < cost) { spendNotify('shenshi', cost); return; }
            P.shenshi -= cost;
            P.avatarLevel = lv + 1;
            showNotification(`👤 身外化身更进一步！攻击 / 防御 +${Math.round((lv + 1) * AVATAR_ATK_PER_LEVEL * 100)}%`, '#7d9bb5');
            calculateStats();
            updateUI();
            saveGame();
        }
        function avatarUsesHtml() {
            if (!isDomainUnlocked()) return '';
            const lv = getAvatarLevel();
            const maxed = lv >= AVATAR_MAX;
            return `<div class="use-card"><div class="use-title">👤 身外化身 <small>调动部分天地之力，永久 +攻击 / 防御，每级各 +${(AVATAR_ATK_PER_LEVEL * 100).toFixed(1)}%</small></div>${useRow('👤 化身', `Lv.${lv}/${AVATAR_MAX}`, `当前 +${(lv * AVATAR_ATK_PER_LEVEL * 100).toFixed(1)}%${maxed ? '' : ` → +${((lv + 1) * AVATAR_ATK_PER_LEVEL * 100).toFixed(1)}%`}`, avatarCost(lv), 'shenshi', 'upgradeAvatar()', maxed)}</div>`;
        }

        function shenshiUsesHtml() {
            const P = ensureCurrencyState();
            const rows = Object.entries(SHEN_UPGRADES).map(([kind, u]) => {
                const lv = getShenLevel(kind);
                const maxed = lv >= u.max;
                return useRow(`${u.icon} ${u.name}`, `Lv.${lv}/${u.max}`, u.desc, shenCost(kind, lv), 'shenshi', `upgradeShen('${kind}')`, maxed);
            }).join('');
            const scoutOn = !!P.scoutBonus;
            return `
                <div class="use-balance">${SHENSHI_ICON} 神识 <b>${Math.floor(P.shenshi)}</b><small>产出：神识技能的配方（凝练 / 培育 / 提炼 / 入定）· 元婴级战斗区域胜利 · 秘境通关。神识不能出售，只用来变强和购买商品。</small></div>
                <div class="use-card"><div class="use-title">🌀 神识强化 <small>联动分身、工作速度与战斗</small></div>${rows}</div>
                ${avatarUsesHtml()}
                <div class="use-card"><div class="use-title">🔍 神识探查 <small>联动秘境：花 ${SCOUT_COST} 神识，下一次通关秘境的随机掉落率 ×${SCOUT_MULT}（通关后消耗）</small></div>
                    <div class="use-row"><div class="use-main"><div class="use-effect">${scoutOn ? '✅ 已生效，通关下一个秘境后消耗' : '尚未使用'}</div></div>
                    <button type="button" class="btn ${scoutOn || P.shenshi < SCOUT_COST ? 'btn-secondary' : ''} use-btn" onclick="castScout()">${scoutOn ? '已生效' : `探查 ${SHENSHI_ICON}${SCOUT_COST}`}</button></div></div>`;
        }

        // ---- 道果（合体期货币）、道果强化与合道（v6.60） ----
        // 合体初期（索引 21）起解锁道果技能与货币。道果不能出售，用于：道果淬体（基础属性）、道果悟法（法则效果）、道果商城；
        // 并可用丹火 + 神识融合凝练。合道：收回分身（不可逆），换取主行动大幅加速与属性 / 产出加成；晋升炼虚期必须已合道。
        const DAOGUO_ICON = ITEM_ICONS.daoguo;
        const DAO_BODY_MAX = 10, DAO_BODY_PER_LEVEL = 0.03;      // 道果淬体：生命 / 攻击 / 防御 +3%/级
        const DAO_LAW_MAX = 5, DAO_LAW_PER_LEVEL = 0.10;         // 道果悟法：全部法则效果 +10%/级
        const FUSE_COST = { danhuo: 10, shenshi: 10 };           // 丹火 10 + 神识 10 → 道果 1
        const FUSION_BONUS = {
            workSpeed: 0.5,      // 生活技能 / 悟道耗时 ×0.5（速度 +100%）
            cultSpeed: 1.0,      // 修炼速度 +100%
            stats: 0.15,         // 生命 / 攻击 / 防御 / 速度 +15%
            outShenshi: 0.5,     // 神识产出 +50%
            outDaoguo: 0.3       // 道果产出 +30%
        };
        const FUSION_REQUIRED_REALM = 37;   // v6.89：原索引28 → +9，合体圆满：晋升下一境界必须已合道
        // 聚灵培元（v6.76）：灵石的软性无底洞。技能设施买完之后灵石在大乘期完全没处花，
        // 加这个无等级上限、每级涨价的永久小额加成——价格指数增长（×1.15/级），买得越多越贵，
        // 早期几万灵石就能买、后期要吞掉大量灵石，让「灵石多到花不完」始终有地方去，
        // 单级幅度刻意压低（0.5%），避免它变成最优刷分策略、抢了装备/技能路线的地位
        const COIN_REFINE_PER_LEVEL = 0.005;
        const COIN_REFINE_BASE = 50000;
        const COIN_REFINE_GROWTH = 1.15;
        function coinRefineCost(level) { return Math.round(COIN_REFINE_BASE * Math.pow(COIN_REFINE_GROWTH, level)); }
        function getCoinRefine() { return gameState.player.coinRefine || 0; }
        function getCoinRefineMod(key) {
            if (key !== 'hpPct' && key !== 'atkPct' && key !== 'defPct') return 0;
            return getCoinRefine() * COIN_REFINE_PER_LEVEL;
        }
        function upgradeCoinRefine(times = 1) {
            const P = gameState.player;
            let bought = 0;
            const n = times === 'max' ? Infinity : times;
            while (bought < n) {
                const cost = coinRefineCost(getCoinRefine());
                if (P.coins < cost) break;
                P.coins -= cost;
                P.coinRefine = getCoinRefine() + 1;
                bought++;
            }
            if (bought === 0) { showNotification(`灵石不足：聚灵培元下一级需要 ${coinRefineCost(getCoinRefine())}`, '#c4483a', 'error'); return; }
            showNotification(`💎 聚灵培元 ${bought > 1 ? `×${bought}，` : ''}当前 Lv.${getCoinRefine()}：生命 / 攻击 / 防御 +${Math.round(getCoinRefine() * COIN_REFINE_PER_LEVEL * 100)}%`, '#6f9c8a');
            calculateStats();
            updateUI();
            saveGame();
        }

        function daoBodyCost(level) { return Math.round(10 * Math.pow(level + 1, 1.5)); }
        function daoLawCost(level) { return Math.round(25 * Math.pow(level + 1, 1.5)); }
        function isDaoguoUnlocked() { return gameState.player.realmIndex >= 34; }   // v6.89：原索引25 → +9
        function isFused() { return !!(gameState.player.fusion && gameState.player.fusion.active); }
        function getDaoBody() { return gameState.player.daoBody || 0; }
        function getDaoLaw() { return gameState.player.daoLaw || 0; }

        function upgradeDaoBody() {
            const P = ensureCurrencyState();
            const lv = getDaoBody();
            if (lv >= DAO_BODY_MAX) { showNotification('道果淬体已至最高级', '#c98a3e'); return; }
            const cost = daoBodyCost(lv);
            if (P.daoguo < cost) { spendNotify('daoguo', cost); return; }
            P.daoguo -= cost;
            P.daoBody = lv + 1;
            showNotification(`🍎 道果淬体成功！生命 / 攻击 / 防御 +${Math.round((lv + 1) * DAO_BODY_PER_LEVEL * 100)}%`, '#6f9c8a');
            afterCurrencySpend();
        }

        function upgradeDaoLaw() {
            const P = ensureCurrencyState();
            const lv = getDaoLaw();
            if (lv >= DAO_LAW_MAX) { showNotification('道果悟法已至最高级', '#c98a3e'); return; }
            const cost = daoLawCost(lv);
            if (P.daoguo < cost) { spendNotify('daoguo', cost); return; }
            P.daoguo -= cost;
            P.daoLaw = lv + 1;
            invalidateLawTotals();
            showNotification(`🍎 道果悟法成功！法则效果 +${Math.round((lv + 1) * DAO_LAW_PER_LEVEL * 100)}%`, '#6f9c8a');
            afterCurrencySpend();
        }

        // 丹火 + 神识融合凝练道果
        function fuseCurrencies(times = 1) {
            const P = ensureCurrencyState();
            const maxTimes = Math.floor(Math.min(P.danhuo / FUSE_COST.danhuo, P.shenshi / FUSE_COST.shenshi));
            const n = times === 'max' ? maxTimes : Math.min(times, maxTimes);
            if (n <= 0) { showNotification(`需要 丹火 ${FUSE_COST.danhuo} + 神识 ${FUSE_COST.shenshi} 才能凝练 1 个道果`, '#c4483a', 'error'); return; }
            P.danhuo -= n * FUSE_COST.danhuo;
            P.shenshi -= n * FUSE_COST.shenshi;
            P.daoguo += n;
            showNotification(`🍎 融合凝练：获得道果 ×${n}`, '#6f9c8a');
            afterCurrencySpend();
        }

        // 合道：收回分身（不可逆）。二次确认后生效
        function startFusion() {
            const P = ensureCurrencyState();
            if (!isDaoguoUnlocked()) { showNotification('合体初期才能合道', '#c98a3e'); return; }
            if (isFused()) { showNotification('你已经合道了', '#c98a3e'); return; }
            const ok = confirm('确定要合道吗？\n\n合道后你的分身将永久消失，且不可逆（无法解除、无法再召回分身，神识里的「分身强化」也会失效）。\n\n换来的是：\n・所有主行动速度 +100%（修炼、生活技能、悟道）\n・生命 / 攻击 / 防御 / 速度 +15%\n・神识产出 +50%、道果产出 +30%\n\n注意：晋升大乘期必须已合道。');
            if (!ok) return;
            P.fusion = { active: true, at: Date.now() };
            getClones().forEach(c => { c.action = null; c.progress = 0; });
            calculateStats();
            showNotification('🌟 合道成功！分身已收回体内，万法归一', '#b89a5b');
            renderCloneBar();
            updateUI();
            renderSkillUses();
            saveGame();
        }

        function daoguoUsesHtml() {
            const P = ensureCurrencyState();
            const bl = getDaoBody(), ll = getDaoLaw();
            const fusedCard = isFused()
                ? `<div class="use-row"><div class="use-main"><b>🌟 已合道</b><div class="use-effect">所有主行动速度 +100% · 生命 / 攻击 / 防御 / 速度 +15% · 神识产出 +50% · 道果产出 +30%<br/>分身已收回体内，不可逆。</div></div><span class="use-max">已合道</span></div>`
                : `<div class="use-row"><div class="use-main"><b>🌟 合道（不可逆）</b><div class="use-effect">收回你的分身：所有主行动速度 +100%、生命 / 攻击 / 防御 / 速度 +15%、神识产出 +50%、道果产出 +30%。<br/>代价：分身永久消失，无法解除。<b>晋升大乘期必须先合道。</b></div></div><button type="button" class="btn use-btn" onclick="startFusion()">合道</button></div>`;
            const maxTimes = Math.floor(Math.min(P.danhuo / FUSE_COST.danhuo, P.shenshi / FUSE_COST.shenshi));
            return `
                <div class="use-balance">${DAOGUO_ICON} 道果 <b>${Math.floor(P.daoguo)}</b><small>产出：道果技能的配方（凝练 / 培育 / 提炼 / 归元）· 合体级战斗区域胜利 · 天道秘境通关 · 丹火与神识融合。道果不能出售，只用来变强和购买商品。</small></div>
                <div class="use-card"><div class="use-title">🌟 合道 <small>合体期的核心选择：收回分身，换取主行动的质变</small></div>${fusedCard}</div>
                ${nascentUsesHtml()}
                <div class="use-card"><div class="use-title">🍎 道果淬体 <small>永久提升生命 / 攻击 / 防御，每级 +${Math.round(DAO_BODY_PER_LEVEL * 100)}%</small></div>${useRow('🍎 淬体', `Lv.${bl}/${DAO_BODY_MAX}`, `当前 +${Math.round(bl * DAO_BODY_PER_LEVEL * 100)}%${bl >= DAO_BODY_MAX ? '' : ` → +${Math.round((bl + 1) * DAO_BODY_PER_LEVEL * 100)}%`}`, daoBodyCost(bl), 'daoguo', 'upgradeDaoBody()', bl >= DAO_BODY_MAX)}</div>
                <div class="use-card"><div class="use-title">☯️ 道果悟法 <small>永久放大全部悟道法则的效果，每级 +${Math.round(DAO_LAW_PER_LEVEL * 100)}%</small></div>${useRow('☯️ 悟法', `Lv.${ll}/${DAO_LAW_MAX}`, `当前 +${Math.round(ll * DAO_LAW_PER_LEVEL * 100)}%${ll >= DAO_LAW_MAX ? '' : ` → +${Math.round((ll + 1) * DAO_LAW_PER_LEVEL * 100)}%`}`, daoLawCost(ll), 'daoguo', 'upgradeDaoLaw()', ll >= DAO_LAW_MAX)}</div>
                <div class="use-card"><div class="use-title">🔥👁️ 融合凝练 <small>丹火 ${FUSE_COST.danhuo} + 神识 ${FUSE_COST.shenshi} → 道果 1（把用不完的丹火和神识变成道果）</small></div>
                    <div class="use-row"><div class="use-main"><div class="use-effect">当前最多可凝练 ${maxTimes} 次</div></div>
                    <button type="button" class="btn ${maxTimes > 0 ? '' : 'btn-secondary'} use-btn" onclick="fuseCurrencies(1)">凝练 ×1</button>
                    <button type="button" class="btn ${maxTimes > 0 ? '' : 'btn-secondary'} use-btn" onclick="fuseCurrencies('max')">全部凝练</button></div></div>`;
        }

        function renderDaoguoUses() {
            const el = document.getElementById('daoguoUses');
            if (el) el.innerHTML = daoguoUsesHtml();
        }

        // 灵石商城顶部的「聚灵培元」卡片：跟丹火/神识/道果商城顶部的强化区一个风格
        function coinRefineUsesHtml() {
            const lv = getCoinRefine();
            const cost = coinRefineCost(lv);
            const curPct = (lv * COIN_REFINE_PER_LEVEL * 100).toFixed(1);
            const nextPct = ((lv + 1) * COIN_REFINE_PER_LEVEL * 100).toFixed(1);
            return `<div class="use-card"><div class="use-title">💎 聚灵培元 <small>永久提升生命 / 攻击 / 防御，每级 +${(COIN_REFINE_PER_LEVEL * 100).toFixed(1)}%，无等级上限，越买越贵</small></div>${useRow('💎 培元', `Lv.${lv}`, `当前 +${curPct}% → +${nextPct}%`, cost, 'coins', 'upgradeCoinRefine(1)', false)}</div>`;
        }


        // 道果 / 合道对各类加成的贡献（getMod 调用）：道果淬体（生命 / 攻击 / 防御）、合道（修炼速度、四维、神识 / 道果产出）
        function getDaoMod(key) {
            const P = gameState.player;
            let t = 0;
            if (key === 'hpPct' || key === 'atkPct' || key === 'defPct') t += (P.daoBody || 0) * DAO_BODY_PER_LEVEL;
            if (isFused()) {
                if (key === 'hpPct' || key === 'atkPct' || key === 'defPct' || key === 'spdPct') t += FUSION_BONUS.stats;
                else if (key === 'cultSpeed') t += FUSION_BONUS.cultSpeed;
                else if (key === 'out:shenshi') t += FUSION_BONUS.outShenshi;
                else if (key === 'out:daoguo') t += FUSION_BONUS.outDaoguo;
            }
            return t;
        }

        // ---- 炼虚期：化虚（法则实体化）与道则（v6.66） ----
        // 炼虚初期（索引21）起解锁。核心取舍：消耗悟道法则的等级（可逆，参悟可以再练回来）+ 道果/虚晶，
        // 兑换成一枚「道则」（实体物品），镶嵌进新增的「道基」槽后提供比留着法则等级更集中的定向加成。
        function isVoidUnlocked() { return gameState.player.realmIndex >= 30; }   // v6.89：原索引21 → +9

        // 第 5 品「本源品」大乘初期（索引29）起才能化虚，需要 isDachengUnlocked()
        const DAOZE_TIER_NAMES = ['下品', '中品', '上品', '极品', '本源品'];
        const DAOZE_TIER_LEVEL_COST = [5, 10, 15, 20, 28];
        const DAOZE_TIER_DAOGUO_COST = [20, 70, 145, 243, 420];
        const DAOZE_TIER_VOID_COST = [8, 28, 58, 97, 170];
        // 每种法则对应一枚道则：主效果贴合法则本身的方向，副效果联动一个生活技能或战斗维度；数值按品阶（下/中/上/极品）递增
        const DAOZE_DEF = {
            metal:   { name: '金之道则', color: '#d8c078', primary: { key: 'atkPct',         values: [0.03, 0.06, 0.10, 0.15, 0.22] }, secondary: { key: 'critDmg',        values: [0.02, 0.04, 0.07, 0.11, 0.16] } },
            wood:    { name: '木之道则', color: '#7fae9a', primary: { key: 'hpPct',          values: [0.03, 0.06, 0.10, 0.15, 0.22] }, secondary: { key: 'regen',          values: [0.0008, 0.0015, 0.0025, 0.004, 0.006] } },
            water:   { name: '水之道则', color: '#7d9bb5', primary: { key: 'foodPct',        values: [0.03, 0.06, 0.10, 0.15, 0.22] }, secondary: { key: 'double:alchemy', values: [0.02, 0.04, 0.07, 0.11, 0.16] } },
            fire:    { name: '火之道则', color: '#d9614f', primary: { key: 'crit',           values: [0.02, 0.04, 0.06, 0.09, 0.13] }, secondary: { key: 'out:danhuo',     values: [0.02, 0.04, 0.07, 0.11, 0.16] } },
            earth:   { name: '土之道则', color: '#b08d5a', primary: { key: 'defPct',         values: [0.03, 0.06, 0.10, 0.15, 0.22] }, secondary: { key: 'double:mining',  values: [0.02, 0.04, 0.07, 0.11, 0.16] } },
            wind:    { name: '风之道则', color: '#b7c9c2', primary: { key: 'spdPct',         values: [0.03, 0.06, 0.10, 0.15, 0.22] }, secondary: { key: 'time:life',      values: [-0.02, -0.04, -0.07, -0.11, -0.16] } },
            thunder: { name: '雷之道则', color: '#b39ddb', primary: { key: 'hit',            values: [0.02, 0.04, 0.06, 0.09, 0.13] }, secondary: { key: 'dropPct',        values: [0.02, 0.04, 0.07, 0.11, 0.16] } },
            ice:     { name: '冰之道则', color: '#a8d8e8', primary: { key: 'dodge',          values: [0.02, 0.04, 0.06, 0.09, 0.13] }, secondary: { key: 'cultSpeed',      values: [0.02, 0.04, 0.07, 0.11, 0.16] } }
        };
        function daozeItemId(lawId, tier) { return `daoze_${lawId}_${tier}`; }

        // 生成 32 件道则物品（8 法则 × 4 品阶），效果走标准特效词汇（getMod 会自动通过 getEquippedEffectSum 读取已镶嵌的道则）
        (function buildDaozeItems() {
            const sellPrices = [800, 2200, 5000, 10000, 22000];
            // 道则图标：一枚按法则染色的晶石，四个品阶共用同一个形状（品阶体现在名字与光晕）
            const gemIcon = (c, glow) => icoSvg(`<path d="M16 3L27 12L23 29H9L5 12Z" fill="${c}" opacity="${glow}"/><path d="M16 3L27 12L16 16Z" fill="${c}" opacity="1"/><path d="M16 3L5 12L16 16Z" fill="${c}" opacity=".85"/><path d="M9 29L16 16L23 29Z" fill="${c}" opacity=".7"/>${icoSparkle(16, 7, 1.8)}`);
            Object.entries(DAOZE_DEF).forEach(([lawId, def]) => {
                DAOZE_TIER_NAMES.forEach((tierName, i) => {
                    const id = daozeItemId(lawId, i + 1);
                    GAME_CONFIG.items[id] = {
                        name: `${tierName}${def.name}`,
                        icon: gemIcon(def.color, 0.55 + i * 0.12),
                        type: 'daoze',
                        sellPrice: sellPrices[i],
                        daozeLaw: lawId,
                        daozeTier: i + 1,
                        effect: { [def.primary.key]: def.primary.values[i], [def.secondary.key]: def.secondary.values[i] }
                    };
                });
            });
        })();

        // 消耗一个法则的 n 级（从当前等级往下扣，保留扣完后那一级里的剩余经验，不会整体清零）
        function consumeLawLevels(lawId, n) {
            const store = getLawStore();
            const info = getLawInfo(lawId);
            const totalExp = store[lawId] || 0;
            const removeSpan = lawCumulative(info.level) - lawCumulative(Math.max(0, info.level - n));
            store[lawId] = Math.max(0, totalExp - removeSpan);
            invalidateLawTotals();
        }

        function isDachengUnlocked() { return gameState.player.realmIndex >= 38; }   // v6.89：原索引29 → +9

        // 化虚：把某个法则的 n 级（对应 tier 0-4，第 5 品「本源品」需大乘初期）兑成一枚道则，扣道果 + 虚晶
        function huaxuLaw(lawId, tier) {
            if (!isVoidUnlocked()) { showNotification('炼虚初期才能化虚', '#c98a3e'); return; }
            if (tier >= 4 && !isDachengUnlocked()) { showNotification('本源品要到大乘初期才能化虚', '#c98a3e'); return; }
            const def = LAW_EFFECTS[lawId];
            const daoze = DAOZE_DEF[lawId];
            if (!def || !daoze) return;
            const levelCost = DAOZE_TIER_LEVEL_COST[tier], daoguoCost = DAOZE_TIER_DAOGUO_COST[tier], voidCost = DAOZE_TIER_VOID_COST[tier];
            const info = getLawInfo(lawId);
            if (info.level < levelCost) { showNotification(`${def.name}等级不足：需要 Lv.${levelCost}，当前 Lv.${info.level}`, '#c98a3e'); return; }
            const P = ensureCurrencyState();
            const voidHave = (gameState.player.inventory.find(i => i.id === 'voidcrystal') || { qty: 0 }).qty;
            if (P.daoguo < daoguoCost) { spendNotify('daoguo', daoguoCost); return; }
            if (voidHave < voidCost) { showNotification(`虚晶不足：需要 ${voidCost}，现有 ${voidHave}`, '#c4483a', 'error'); return; }
            const tierName = DAOZE_TIER_NAMES[tier];
            const ok = confirm(`确定要化虚吗？\n\n消耗 ${def.name} ${levelCost} 级（Lv.${info.level} → Lv.${info.level - levelCost}）+ 道果 ${daoguoCost} + 虚晶 ${voidCost}\n\n获得：${tierName}${daoze.name} ×1（可在「装备」界面的道基槽镶嵌）\n\n法则等级可以再参悟回来，不是不可逆。`);
            if (!ok) return;
            consumeLawLevels(lawId, levelCost);
            P.daoguo -= daoguoCost;
            consumeItem('voidcrystal', voidCost);
            addToInventory(daozeItemId(lawId, tier + 1), 1, true);
            showNotification(`☯️ 化虚成功：获得${tierName}${daoze.name} ×1`, '#6f9c8a');
            calculateStats();
            updateUI();
            generateLawList();
            saveGame();
        }

        // 悟道法则卡片上的「化虚」按钮组：四个品阶各一个按钮，等级或资源不够就置灰。
        // 用户反馈两次：先是不知道化虚是什么玩法，讲清楚之后又说"化虚按钮我就没看见"——
        // 真实原因是四个品阶大概率全部置灰（虚晶要采矿Lv50才能挖，道果攒得很慢），0.72em 的小字+0.4
        // 透明度的按钮行，混在卡片一堆文字里非常容易被完全忽略。这次加：①固定显示的小标题，不管能不能
        // 化虚这一整块都先露出来，不会被当成"没有这个功能"；②每个按钮的提示从"写死的完整消耗"
        // 改成"还差什么"，缺哪样写哪样，不缺就不提，一眼看出卡在哪一步
        function daozeButtonsHtml(lawId) {
            if (!isVoidUnlocked()) return '';
            const info = getLawInfo(lawId);
            const P = gameState.player;
            const voidHave = (P.inventory.find(i => i.id === 'voidcrystal') || { qty: 0 }).qty;
            const tierNames = isDachengUnlocked() ? DAOZE_TIER_NAMES : DAOZE_TIER_NAMES.slice(0, 4);   // 本源品要大乘初期才显示
            const btns = tierNames.map((name, i) => {
                const lackLevel = Math.max(0, DAOZE_TIER_LEVEL_COST[i] - info.level);
                const lackDaoguo = Math.max(0, DAOZE_TIER_DAOGUO_COST[i] - (P.daoguo || 0));
                const lackVoid = Math.max(0, DAOZE_TIER_VOID_COST[i] - voidHave);
                const can = !lackLevel && !lackDaoguo && !lackVoid;
                const lacks = [];
                if (lackLevel) lacks.push(`法则还差 ${lackLevel} 级`);
                if (lackDaoguo) lacks.push(`道果还差 ${lackDaoguo}`);
                if (lackVoid) lacks.push(`虚晶还差 ${lackVoid}（采矿Lv50解锁「采虚晶」）`);
                const title = can
                    ? `消耗 ${DAOZE_TIER_LEVEL_COST[i]} 级 + 道果 ${DAOZE_TIER_DAOGUO_COST[i]} + 虚晶 ${DAOZE_TIER_VOID_COST[i]}`
                    : lacks.join('，');
                return `<button type="button" class="btn btn-secondary law-huaxu-btn" ${can ? '' : 'disabled'} title="${title}" onclick="event.stopPropagation(); huaxuLaw('${lawId}', ${i})">☯️ ${name}</button>`;
            }).join('');
            return `<div class="law-huaxu-block"><div class="law-huaxu-title">☯️ 化虚兑道则（消耗法则等级+道果+虚晶，换实体道则去装备页镶嵌）</div><div class="law-huaxu">${btns}</div></div>`;
        }

        // ---- 炼虚期：天劫（v6.68） ----
        // 原著设定：炼虚修士与天地元气相融，理论寿元无穷，但每 3000 年要渡一次大天劫，威力逐次递增，纵有无限寿元也可能陨落于劫数。
        // 游戏化：炼虚 21-24 每个小境界各一场天劫（tribulation21-24，GAME_CONFIG.dungeons 里 isTribulation:true 的特殊单体 Boss 战），
        // 不在秘境列表里出现，只能从突破弹窗的「⚡ 渡劫」进入；渡过一次永久生效（不会像普通秘境那样清空重来）。
        // 失败沿用秘境战败的既有惩罚（损失 10% 修为、50% 食物、气血回到 50%），可以重新挑战，不会卡死进度。
        const TRIBULATION_REALMS = [30, 31, 32, 33];   // v6.89：原索引21-24 → +9
        const TRIBULATION_HP_PCT = 0.03;   // 渡劫：每渡一劫永久生命 / 防御 +3%（身与天地相融，越来越难杀；4 劫渡满 +12%）
        function tribulationIdFor(realmIndex) { return `tribulation${realmIndex}`; }
        function hasSurvivedTribulation(realmIndex) {
            const rec = gameState.dungeons && gameState.dungeons[tribulationIdFor(realmIndex)];
            return !!(rec && rec.completed);
        }
        function getTribulationClearCount() {
            return TRIBULATION_REALMS.filter(r => hasSurvivedTribulation(r)).length;
        }
        function getTribulationMod(key) {
            if (key !== 'hpPct' && key !== 'defPct') return 0;
            return getTribulationClearCount() * TRIBULATION_HP_PCT;
        }

        // 突破弹窗里的「渡劫」入口：当前境界在 21-24 且这一劫还没渡过时显示
        function renderTribulationGate() {
            const box = document.getElementById('btTribulation');
            if (!box) return;
            const realmIndex = gameState.player.realmIndex;
            if (!TRIBULATION_REALMS.includes(realmIndex) || hasSurvivedTribulation(realmIndex)) { box.style.display = 'none'; return; }
            const dungeon = GAME_CONFIG.dungeons[tribulationIdFor(realmIndex)];
            box.style.display = 'block';
            box.innerHTML = `<div class="bt-guide-title">⚡ 需先渡过本境界的天劫</div>
                <div class="bt-guide-line">${dungeon.icon} ${dungeon.name}：${dungeon.desc}</div>
                <button type="button" class="btn" style="width:100%;margin-top:8px;" onclick="closeBreakthroughModal(); maybeSelectDomainThenEnter(() => enterDungeon('${tribulationIdFor(realmIndex)}'));">⚡ 渡劫</button>`;
        }

        // 天劫通关：不像普通秘境那样循环挑战，标记渡过即可，额外弹一条永久加成提示
        function completeTribulation(dungeonId) {
            const battleContainer = document.getElementById('battleContainer');
            if (battleContainer) battleContainer.classList.add('hidden');
            syncBattleMode();
            clearActiveDomain();
            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            gameState.dungeons[dungeonId].completed = true;
            gameState.dungeons.currentDungeon = null;
            gameState.currentAction = null;
            gameState.currentActionProgress = 0;

            const rewards = dungeon.rewards;
            let rewardMsg = `⚡ 渡过${dungeon.name}！身与天地相融更进一步（生命 / 防御 永久 +${Math.round(TRIBULATION_HP_PCT * 100)}%）\n`;
            if (rewards.coins) {
                const coins = rewards.coins[0] + Math.floor(Math.random() * (rewards.coins[1] - rewards.coins[0] + 1));
                gameState.player.coins += coins;
                rewardMsg += `+ ${coins} 灵石\n`;
            }
            [['danhuo', '丹火'], ['shenshi', '神识']].forEach(([kind, label]) => {
                const range = rewards[kind];
                if (!range) return;
                const amount = range[0] + Math.floor(Math.random() * (range[1] - range[0] + 1));
                addCurrency({ [kind]: amount });
                rewardMsg += `+ ${amount} ${label}\n`;
            });
            if (rewards.skillExp) {
                addSkillExp('battle', rewards.skillExp);
                rewardMsg += `+ 战斗经验 x${rewards.skillExp}`;
            }
            trackQuest('dungeon:' + dungeonId);
            calculateStats();
            showNotification(rewardMsg.trim(), '#b39ddb');
            updateUI();
            saveGame();
        }

        // ---- 大乘期：元婴蜕变与离体助战（v6.69） ----
        // 原著设定：大乘修士需将灵力不断注入元婴，使其从婴儿形态蜕变为青年形态，蜕变越深，元婴离体助战的威力越强。
        // 游戏化：大乘初期（索引29）起解锁，花道果 + 元婴精魄（大乘级秘境 / 战斗区域掉落）把元婴蜕变等级从 0 升到 10 级，
        // 每级增加元婴离体助战的攻击 / 暴击伤害加成（并入 getMod，战斗、修炼、生活技能全自动生效，和道则、渡劫一样不用逐处改代码）。
        const NASCENT_MAX = 10;
        const NASCENT_ATK_PER_LEVEL = 0.02;      // 元婴离体助战：攻击 +2%/级
        const NASCENT_CRITDMG_PER_LEVEL = 0.02;   // 元婴离体助战：暴击伤害 +2%/级
        function getNascentSoul() { return gameState.player.nascentSoul || 0; }
        function nascentCost(level) { return { daoguo: Math.round(60 * Math.pow(level + 1, 1.5)), essence: level + 1 }; }
        function nascentStageName(level) {
            if (level >= 8) return '青年形态';
            if (level >= 4) return '少年形态';
            return '婴儿形态';
        }
        function getNascentMod(key) {
            if (key !== 'atkPct' && key !== 'critDmg') return 0;
            const lv = getNascentSoul();
            return key === 'atkPct' ? lv * NASCENT_ATK_PER_LEVEL : lv * NASCENT_CRITDMG_PER_LEVEL;
        }

        function upgradeNascentSoul() {
            const P = ensureCurrencyState();
            const lv = getNascentSoul();
            if (lv >= NASCENT_MAX) { showNotification('元婴已蜕变至青年形态巅峰', '#c98a3e'); return; }
            const cost = nascentCost(lv);
            if (P.daoguo < cost.daoguo) { spendNotify('daoguo', cost.daoguo); return; }
            const have = (P.inventory.find(i => i.id === 'nascentsoul_essence') || { qty: 0 }).qty;
            if (have < cost.essence) { showNotification(`元婴精魄不足：需要 ${cost.essence}，现有 ${have}`, '#c4483a', 'error'); return; }
            P.daoguo -= cost.daoguo;
            consumeItem('nascentsoul_essence', cost.essence);
            P.nascentSoul = lv + 1;
            showNotification(`👁️ 元婴蜕变成功！${nascentStageName(lv + 1)}，离体助战攻击 +${Math.round((lv + 1) * NASCENT_ATK_PER_LEVEL * 100)}%、暴击伤害 +${Math.round((lv + 1) * NASCENT_CRITDMG_PER_LEVEL * 100)}%`, '#b39ddb');
            calculateStats();
            updateUI();
            renderSkillUses();
            saveGame();
        }

        // 道果页面「元婴」卡片：大乘初期起显示在合道卡片下方
        function nascentUsesHtml() {
            if (!isDachengUnlocked()) return '';
            const P = gameState.player;
            const lv = getNascentSoul();
            const maxed = lv >= NASCENT_MAX;
            const cost = nascentCost(lv);
            const have = (P.inventory.find(i => i.id === 'nascentsoul_essence') || { qty: 0 }).qty;
            const affordable = !maxed && P.daoguo >= cost.daoguo && have >= cost.essence;
            return `<div class="use-card"><div class="use-title">👁️ 元婴蜕变 <small>元婴离体助战：${nascentStageName(lv)}（Lv.${lv}/${NASCENT_MAX}），攻击 +${Math.round(lv * NASCENT_ATK_PER_LEVEL * 100)}%、暴击伤害 +${Math.round(lv * NASCENT_CRITDMG_PER_LEVEL * 100)}%</small></div>
                <div class="use-row"><div class="use-main"><b>👁️ 蜕变</b> <span class="use-lv">Lv.${lv}/${NASCENT_MAX}</span>
                    <div class="use-effect">${maxed ? '已至青年形态巅峰' : `下一级 → 攻击 +${Math.round((lv + 1) * NASCENT_ATK_PER_LEVEL * 100)}%、暴击伤害 +${Math.round((lv + 1) * NASCENT_CRITDMG_PER_LEVEL * 100)}%`}</div></div>
                    ${maxed ? '<span class="use-max">已满级</span>'
                        : `<button type="button" class="btn ${affordable ? '' : 'btn-secondary'} use-btn" onclick="upgradeNascentSoul()">${affordable ? '蜕变' : '不足'} ${DAOGUO_ICON}${cost.daoguo} + 👁️${cost.essence}</button>`}
                </div></div>`;
        }

        // ---- 真仙境：飞升后打通仙窍（v6.88） ----
        // 大乘圆满（32）起，「修炼」页新增「开辟仙窍」配方，一次打通一窍（不产出修为，直接给 xianqiao +1）。
        // 12 窍触发大乘圆满→真仙初期的突破，24 窍触发真仙初期→真仙后期；两次突破都不再看 cultivationXP，
        // 见 attemptBreakthrough() 里的特判。五衰的前三衰（仙衰/窍衰/身衰）合并成一份随仙窍数递减的负加成，
        // 不拆成三个数值上分不清的小 debuff：刚飞升（真仙初期，12窍）时 hp/atk/def 各 -7.5%，24 窍打满时归零。
        function isAscendUnlocked() { return gameState.player.realmIndex >= 41; }   // v6.89：原索引32 → +9
        const XIAN_ORIFICE_MAX = 24;
        const XIAN_SHUAI_MAX_PENALTY = 0.15;
        function getXianqiao() { return Math.min(XIAN_ORIFICE_MAX, gameState.player.xianqiao || 0); }
        function getXianShuaiMod(key) {
            if (key !== 'hpPct' && key !== 'atkPct' && key !== 'defPct') return 0;
            if (gameState.player.realmIndex < 42) return 0;   // v6.89：原索引33（真仙初期）→ +9
            return -XIAN_SHUAI_MAX_PENALTY * (1 - getXianqiao() / XIAN_ORIFICE_MAX);
        }

        // 当前打开的是丹火 / 神识 / 炼丹面板时刷新对应的「用途」区
        function renderSkillUses() {
            const panel = document.body.dataset.panel;
            if (panel === 'danhuo') renderDanhuoUses();
            else if (panel === 'shenshi') renderShenshiUses();
            else if (panel === 'daoguo') renderDaoguoUses();
            else if (panel === 'alchemy') renderAlchemyBoostBar();
            else if (panel === 'shop' && shopTab !== 'coins') updateShop();
        }


        // 静态页面里的图标占位：<span data-ico="qi|coin">emoji</span>，加载时换成手绘图标
        function fillIconSlots(root = document) {
            root.querySelectorAll('[data-ico]').forEach(el => {
                const icon = { qi: QI_ICON, coin: COIN_ICON, danhuo: DANHUO_ICON, shenshi: SHENSHI_ICON, daoguo: DAOGUO_ICON }[el.dataset.ico];
                if (icon) el.innerHTML = icon;
            });
        }

        // 把手绘图标写回各处配置（商店、食物按同名 id 对应到物品图标）
        (function applyItemIcons() {
            Object.keys(GAME_CONFIG.items).forEach(id => { if (ITEM_ICONS[id]) GAME_CONFIG.items[id].icon = ITEM_ICONS[id]; });
            Object.values(GAME_CONFIG.shop).forEach(list => list.forEach(s => { if (ITEM_ICONS[s.id]) s.icon = ITEM_ICONS[s.id]; }));
            Object.keys(FOOD_CONFIG.foods).forEach(id => { if (ITEM_ICONS[id]) FOOD_CONFIG.foods[id].icon = ITEM_ICONS[id]; });
        })();

        // Priority 4: 战斗系统完整公式
        // P4 平衡层：秘境怪物的原始数值按旧属性体系设计，P4 改为「境界×线性倍数」后玩家属性
        // 明显偏低，这里按系数缩放怪物血量与攻击。系数由战斗模拟标定：以「8 个灵根的平均通关率」为准
        // （保留真实的怪物属性和克制关系），最低境界平均通关率约 60%~90%。原始数值保留在 GAME_CONFIG.dungeons，
        // 调平衡只需改此表。修改装备/属性/灵根特效后需要重新标定，临界点很陡。
        const P4_MONSTER_SCALE = {
            mysteryTower: 2.52,
            mysteriousForest: 1.95,
            ancientRuin: 1.735,
            tribulationGround: 1.39,
            huashenRealm: 0.935,
            taixuDream: 0.496,
            tiandaoRealm: 0.525,
            voidRealm: 0.538,
            taiyiRealm: 0.33
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
            forest: { hp: 1.12, atk: 1.12 }, mountain: { hp: 1.1, atk: 1.17 }, deepMountain: { hp: 1.218, atk: 1.844 },
            swamp: { hp: 1.393, atk: 2.115 }, abyss: { hp: 1.087, atk: 1.782 }, goldenPlains: { hp: 1.357, atk: 2.602 },
            tribulationGround: { hp: 0.96, atk: 2.067 }, voidSea: { hp: 0.482, atk: 2.405 }, abyssRuins: { hp: 0.1558, atk: 1.756 },
            chaosWastes: { hp: 0.1718, atk: 1.337 }, nineNether: { hp: 0.0837, atk: 1.047 },
            daoWastes: { hp: 0.04, atk: 1.6 }, fusionVoid: { hp: 0.028, atk: 1.56 },
            voidAbyss: { hp: 0.0811, atk: 1.262 }, huashiRealm: { hp: 0.0639, atk: 1.145 },
            taiyiField: { hp: 0.0425, atk: 0.4675 }, lingjieAbyss: { hp: 0.0328, atk: 0.3321 },
            // 真仙境新增（v6.88）：延续 taiyiField→lingjieAbyss 的衰减比例外推（hp×0.77、atk×0.71），
            // 没有跑真实引擎模拟标定胜率，后续如果实测通关率明显偏离 65% 目标，回来调这两个数
            xianbattle: { hp: 0.025, atk: 0.235 }
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
                // 折算等级后每 5 级产量 +1（v6.63 起用 workEquivLevel，Lv60 ≈ 旧 Lv26）
                formula: (level) => Math.floor(1 + Math.floor((workEquivLevel(level) - 1) / 5))
            },
            forging: {
                name: '炼器',
                effectPer: 0.5,
                effectType: 'quality',
                // 折算等级后每级装备属性 +0.5%（v6.63 起用 workEquivLevel，Lv60 ≈ +13%）
                formula: (level) => 1 + (workEquivLevel(level) - 1) * 0.005
            },
            farming: {
                name: '灵田',
                effectPer: 1,
                effectType: 'speed',
                // 折算等级后每级耗时 -1%（v6.63 起用 workEquivLevel，Lv60 ≈ 耗时 ×0.74）
                formula: (level) => 1 - (workEquivLevel(level) - 1) * 0.01
            },
            mining: {
                name: '采矿',
                effectPer: 2,
                effectType: 'output',
                // 折算等级后每级产出 +2%（v6.63 起用 workEquivLevel，Lv60 ≈ +51%）
                formula: (level) => 1 + (workEquivLevel(level) - 1) * 0.02
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
            workCurve: 2,  // 工作技能经验曲线版本（v6.63）；旧存档没有此字段，读档时按累计经验折算
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
                equipment: { weapon: null, armor: null, jewelry: [], daoze: [] },
                lastBreakthroughTime: 0,
                // 永久升级跟踪（P1功能）
                inventoryCapacity: 50,
                farmingSlots: 1,
                boughtUpgrades: [],  // 已购买的永久升级ID列表
                temperLevel: 0,      // （旧）全局淬炼次数，v6.51 起改为 temper（按部位），读档时迁移
                danhuo: 0,           // 丹火（货币，金丹起）
                shenshi: 0,          // 神识（货币，元婴起）
                daoguo: 0,           // 道果（货币，合体起）
                daoBody: 0,          // 道果淬体等级（0–10）
                daoLaw: 0,           // 道果悟法等级（0–5）
                xianqiao: 0,         // 真仙境仙窍数（0–24），大乘圆满起靠「开辟仙窍」配方打通，12窍=真仙初期，24窍=真仙后期
                marrowCleansed: false,   // 洗髓易经是否已完成（一次性），练气十三层→筑基初期的突破前提之一
                fusion: null,        // 合道状态 { active, at }（不可逆）
                temper: { weapon: 0, armor: 0, jewelry: 0 },   // 淬炼等级（按部位，0–10）
                rootLevel: 0,        // 灵根强化等级（0–10）
                shen: { clone: 0, focus: 0, sense: 0 },        // 神识强化等级（各 0–10）
                alchemyBoost: false, // 炼丹助炼开关
                skillUpgrades: [],   // 技能商店里已购置的设施 id
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
                这是一款<b>放置游戏</b>：点一个行动，它就会自动重复进行；<b>离开游戏也会继续</b>（默认最多结算 24 小时），回来时领取收益。<br/><br/>
                📜 别担心不知道做什么：关掉这个介绍后，屏幕上方有一串<b>新手任务</b>，跟着做一遍就熟悉了，每个任务还有灵石奖励。` },
            { title: '🧘 修炼与突破', body: `<b>修炼</b>获得修为，修为满了就可以<b>突破</b>到更高境界，属性会大幅提升，也会解锁新的配方、战斗区域和秘境。<br/><br/>
                部分大境界的突破需要材料（筑基丹、金丹秘药、元婴丹），可以靠<b>炼丹</b>或<b>秘境掉落</b>获得——留意突破界面里的提示。` },
            { title: '🔨 生活技能', body: `<b>采矿、灵田</b>产出材料，<b>炼丹、炼器</b>用材料制作丹药、食物和装备，后期还有<b>丹火、神识</b>（它们产出的是货币，用来淬炼装备、强化灵根和分身）。配方按技能等级解锁。<br/><br/>
                每个配方做得越多，<b>🎓 精通</b>等级越高，会带来翻倍、省材料、缩短耗时等加成；把鼠标悬停（手机上点一下）可以看到详情。` },
            { title: '⚔️ 战斗', body: `进入<b>战斗区域</b>打怪，获得灵石和经验，区域随境界解锁。战斗时生命低会自动吃你装备的<b>食物</b>（在炼丹里制作，背包里设为战斗食物）。<br/><br/>
                <b>🔁 循环战斗</b>：进入战斗区域后会一直打下去，点「撤退」才退出，离线也会继续。<b>秘境</b>同样会一直循环挑战，掉落种子和突破材料，但被击败会损失修为和食物，量力而行。灵根之间有克制关系，克制敌人伤害更高。` },
            { title: '🏪 商城与小提示', body: `用灵石在<b>商城</b>买材料、食物和功法（装备只能在炼器里打造）；功法和灵根都有各自的特效，可以在修炼面板切换功法。<br/><br/>
                💾 存档保存在浏览器本地，建议偶尔在设置里<b>导出存档</b>备份（会下载一个存档文件，需要时用「导入存档」选择它）。这个介绍和新手任务都可以在<b>设置 → 玩法介绍</b>里随时重看。现在就去完成第一个任务吧！祝你道途顺遂！` }
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

        // 结丹突破（筑基圆满→金丹初期）成功率（v6.90）：原著设定这次突破不是"丹药够了就成"，
        // 韩立式的普通修士要试很多次（近50颗丹药）、天才一两次就过。只对这一次突破生效，
        // 其它大境界突破仍然是"丹药够了必成"，避免全局引入失败机制影响其它境界的节奏。
        // 定义放在 REALM_UNLOCKS 前面：后者是立即求值的对象字面量，要在里面引用这个常量就不能晚于这里声明
        const JIEDAN_SUCCESS_RATE = 0.4;

        // ==================== 境界解锁提示（v6.79） ====================
        // 每次突破后，如果这个境界解锁了新秘境 / 战斗区域 / 系统，播放完突破特效再弹一个小提示——
        // 不是每个境界索引都有条目：中间过渡的小境界（比如练气中期→后期）如果没有新内容就不出现在这里，
        // 也就不会弹提示。同一份数据也用在「设置 → 玩法介绍 → 境界解锁一览」里，完整列出全部境界当预告。
        // 每条尽量说清楚「是什么 / 在哪操作 / 关键机制或代价」，不只是一个名词——早期版本只写名词，
        // 玩家到了新境界经常不知道这个新东西具体怎么玩（用户反馈：到了炼虚期不知道道则怎么用）
        // v6.89：练气改13层，key=1不变，原2/3/4按等比映射到新5/9/13，原索引5起整体+9
        const REALM_UNLOCKS = {
            1:  ['⚔️ 可以参与战斗了，战斗页「战斗区域」标签下森林开放。战斗区域是循环挑战（打完一场自动开下一场，直到点「撤退」），跟秘境「打到底」不一样；记得先在炼丹页做点战斗食物带上，生命不会自动恢复只能靠食物'],
            5:  ['🔮 神秘之塔秘境开放（战斗页「秘境」标签）。秘境是连续几只怪一次性打到底，通关拿固定+随机奖励'],
            9:  ['⚔️ 十万大山外围战斗区域开放'],
            13: ['🌲 诡异森林秘境开放', '💊 炼丹页解锁筑基丹配方（材料清灵草×3），趁早炼够——练气十三层突破筑基必须要这个丹', '🩸 修炼页解锁「洗髓易经」：一次性操作（清灵草×10），完成后才能突破筑基，跟筑基丹是两个独立条件都要满足'],
            14: ['⚔️ 十万大山核心 / 妖兽沼泽战斗区域开放'],
            15: ['⚱️ 古老遗迹秘境开放'],
            16: ['⚔️ 魔窟深渊战斗区域开放'],
            17: ['⚡ 天劫之地秘境开放', '💊 金丹秘药配方解锁，突破筑基圆满前记得炼够', `⚡ 这次突破（结丹）不是丹药够了就必成——成功率约${Math.round(JIEDAN_SUCCESS_RATE * 100)}%，失败会损失丹药但不掉境界，可以再炼丹药重试`],
            18: ['🔥 丹火系统解锁：新增「丹火」技能页，这个技能页的配方产出的不是物品、是货币「丹火」；丹火花在同页顶部的「丹火商城」——淬炼装备（武器/护甲/饰品分别加属性，最多10级）、强化灵根（把灵根自带的全部特效按百分比放大）', '⚔️ 金丹平原战斗区域开放'],
            19: ['⚔️ 天劫之地战斗区域开放'],
            21: ['🌌 元婴秘境开放', '💊 元婴丹配方解锁，突破金丹圆满前记得炼够'],
            22: ['👁️ 神识系统解锁：新增「神识」技能页，玩法跟丹火一样——配方产出货币「神识」，花在本页顶部的神识商城', '🌀 第一个分身解锁：去任意生活技能（炼丹/炼器/灵田/采矿）的配方卡片，点「交给分身」，分身会独立并行做这个配方，不占用你自己当前在做的事', '⚔️ 虚空之海战斗区域开放'],
            24: ['⚔️ 深渊遗迹战斗区域开放'],
            25: ['🌠 太虚幻境秘境开放', '💊 化神丹配方解锁，突破元婴圆满前记得炼够'],
            26: ['☯️ 悟道系统解锁：新增「悟道」技能页，八种法则对应八种灵根属性，花时间"参悟"涨等级，每级给对应的被动加成，没有等级上限（只受当前境界的领悟上限约束，突破后上限会提高）', '🌀 第二个分身解锁（用法同第一个，配方卡片点「交给分身」）', '🌀 灵域解锁：进入秘境/战斗区域/渡劫前会先弹窗选一个灵域（8 种，选完整场战斗持续生效、中途不能换），激活要花 15 点神识，效果对你和敌人双方同时生效', '👤 身外化身解锁：神识商城里花神识升级（最多10级），被动加攻击和防御，不用战斗前手动选，一直生效，跟灵域是两个独立系统', '⚔️ 混沌荒原战斗区域开放'],
            28: ['⚔️ 九幽冥渊战斗区域开放'],
            29: ['🌫️ 虚界秘境开放', '💊 化虚丹配方解锁，突破化神圆满前记得炼够'],
            30: ['🌀 化虚 / 道则系统解锁：悟道页每个法则卡片上多一个「化虚」按钮——花掉这个法则的一部分等级（不是白扣，等级可以再参悟练回来）+ 道果 + 虚晶，换一枚实体「道则」道具，镶嵌进装备页新增的「道基」槽，比单纯留着法则等级更集中地生效；道则分下品/中品/上品/极品/本源品五个品阶，品阶越高效果越强、消耗也越多，可以后续再花代价升级品阶', '⚔️ 虚渊战斗区域开放', '⚡ 天劫开始：从这个境界起，每次突破小境界前，突破弹窗会先要求「渡劫」——去对应的天劫秘境打赢，回来才能真正突破'],
            32: ['⚔️ 化实之界战斗区域开放'],
            33: ['🌌 天道秘境开放', '💊 合体丹配方解锁，突破炼虚圆满前记得炼够'],
            34: ['🍎 道果系统解锁：新增「道果」技能页，玩法跟丹火/神识一样是货币技能', '🌟 道果页可以「合道」：收回全部分身（不可逆，之后不能再用分身），换所有主行动速度 +100%、生命/攻击/防御/速度 +15%、神识与道果产出提升——这个操作不急着现在做，但合体圆满突破到大乘期之前必须做', '⚔️ 道痕荒原战斗区域开放'],
            36: ['⚔️ 合一虚境战斗区域开放'],
            37: ['🌟 太乙圣域秘境开放', '💊 大乘丹配方解锁（前提是已经合道），本境界圆满后必须先合道才能突破到大乘期'],
            38: ['👁️ 元婴蜕变解锁：道果页花道果 + 元婴精魄升级（最多10级），从婴儿形态练到青年形态，被动加攻击和暴击伤害，不用手动操作', '☯️ 道则新增「本源品」第五品阶，比极品更强一档，需要更多法则等级 + 道果 + 虚晶', '⚔️ 太虚战场战斗区域开放'],
            40: ['⚔️ 灵界绝境战斗区域开放'],
            41: ['🌌 灵界至高战力已至，但大道并未到头——「修炼」页新增「开辟仙窍」配方：不产出修为，每次花太乙精华×5，直接打通一窍（xianqiao +1），累计 12 窍即可突破飞升为真仙初期，之前攒的修为不影响这次突破'],
            42: ['🌟 飞升成功，正式脱离"人"的范畴，寿元与天地同寿；但要承受"五衰"的前三衰（仙衰/窍衰/身衰）——刚飞升时生命/攻击/防御各 -7.5%，「修炼」页继续做「开辟仙窍」，每多打通一窍这份衰退就减少一点，攒满 24 窍时完全消退', '⚔️ 九霄战场战斗区域开放', '🌌 太清仙域秘境开放'],
            43: ['🏁 真仙后期，24 窍全部打通，五衰前三衰的负面完全消退——当前实现的至高战力，暂无下一境界']
        };

        function showRealmUnlockModal(realmIndex) {
            const unlocks = REALM_UNLOCKS[realmIndex];
            if (!unlocks || !unlocks.length) return;
            document.getElementById('realmUnlockContent').innerHTML = `
                <div class="tutorial-title">✨ ${getRealmName(realmIndex)} ✨</div>
                <div class="tutorial-body">新解锁：<br/><br/>${unlocks.map(u => `• ${u}`).join('<br/>')}</div>
                <div class="tutorial-actions">
                    <button class="btn" onclick="closeRealmUnlockModal()">知道了</button>
                </div>`;
            document.getElementById('realmUnlockModal').classList.add('show');
        }
        function closeRealmUnlockModal() {
            document.getElementById('realmUnlockModal').classList.remove('show');
        }
        // 设置 → 玩法介绍：完整列出全部有解锁内容的境界，已到达的正常显示，还没到的灰显当预告
        function showRealmUnlockList() {
            const cur = gameState.player.realmIndex;
            const rows = Object.keys(REALM_UNLOCKS).map(Number).sort((a, b) => a - b).map(idx => {
                const reached = cur >= idx;
                return `<div class="use-row"${reached ? '' : ' style="opacity:0.55;"'}>
                    <div class="use-main"><b>${reached ? '✓' : '🔒'} ${getRealmName(idx)}</b>
                    <div class="use-effect">${REALM_UNLOCKS[idx].join('<br/>')}</div></div>
                </div>`;
            }).join('');
            document.getElementById('realmUnlockContent').innerHTML = `
                <div class="tutorial-title">📜 境界解锁一览</div>
                <div style="max-height:55vh;overflow-y:auto;margin:12px 0;">${rows}</div>
                <div class="tutorial-actions">
                    <button class="btn" onclick="closeRealmUnlockModal()">关闭</button>
                </div>`;
            document.getElementById('realmUnlockModal').classList.add('show');
        }

        // ==================== 新手任务 ====================
        // 一串连续的小任务，带新玩家把每个基础玩法（六个基础技能、出售 / 购买、装备、战斗、秘境）都用一遍；每个任务完成后
        // 点「领取奖励」得灵石（个别送物品），全部做完再告诉玩家游戏目标。进度靠 gameState.tally（累计事件计数）和当前状态判断，
        // 存档字段：gameState.quests = { index: 当前第几个任务, done: 是否结束, goalShown: 是否看过游戏目标, skipped: 是否被玩家跳过（跳过没有任何奖励） }。
        // 老存档（境界已超过练气初期）迁移时直接标记为已完成，不再显示任务条。
        const NEWBIE_QUESTS = [
            { title: '吐纳灵气', panel: 'cultivation', target: ['cultivation', 'basic'],
              desc: '你现在只是个凡人。在「修炼」页点下面高亮的「吐纳灵气」开始修炼——行动会<b>自动重复</b>，不用一直点。左侧（手机在顶部）是各个技能页的入口。',
              need: { act: 'cultivation.basic', n: 1 }, reward: { coins: 20 } },
            { title: '踏入练气', panel: 'cultivation', target: ['cultivation', 'basic'],
              desc: '继续修炼，等上方「修为进度」满了，会出现「尝试突破」按钮，点它突破到<b>练气一层</b>。突破会让属性大涨，并解锁新配方和战斗区域。',
              need: { realm: 1 }, reward: { coins: 50 } },
            { title: '种植灵米', panel: 'farming', target: ['farming', 'millet'],
              desc: '去「灵田」种植灵米 3 次。<b>生活技能</b>做得越多等级越高，解锁更多配方。同一时间只能做一件事，切换行动会打断当前的。',
              need: { act: 'farming.millet', n: 3 }, reward: { coins: 30 } },
            { title: '熬灵米粥', panel: 'alchemy', target: ['alchemy', 'millet_porridge'],
              desc: '去「炼丹」制作 1 次灵米粥（需要 2 份灵米，刚种的就够）。灵米粥是<b>战斗食物</b>——战斗中生命低会自动吃，之后你会用到。',
              need: { act: 'alchemy.millet_porridge', n: 1 }, reward: { coins: 40 } },
            { title: '采石', panel: 'mining', target: ['mining', 'stone'],
              desc: '去「采矿」采石 3 次。矿石是炼器的材料，采矿等级高了还能挖到更好的矿。',
              need: { act: 'mining.stone', n: 3 }, reward: { coins: 30 } },
            { title: '打铁', panel: 'forging', target: ['forging', 'practice'],
              desc: '去「炼器」做 2 次「打铁练习」。炼器等级够了就能打造武器、护甲和饰品——装备只能靠炼器打造。完成后师父会送你一把桃木剑。',
              need: { act: 'forging.practice', n: 2 }, reward: { coins: 30, items: [{ id: 'sword', qty: 1 }] } },
            { title: '出售杂物', panel: 'inventory',
              desc: '去「背包」点开一件物品（比如刚采的碎石），点「出售」换成灵石。用不上的材料都可以卖掉。',
              need: { count: 'sell', n: 1 }, reward: { coins: 30 } },
            { title: '装备武器', panel: 'equipment',
              desc: '去「装备」页（手机在技能栏最前面）或背包里点开桃木剑，把它装备上。装备提供攻击、防御等属性。',
              need: { weapon: true }, reward: { coins: 30 } },
            { title: '初战森林', panel: 'battle', tab: 'areas',
              desc: '去「战斗」页进入「森林」，打赢 3 场。战斗会<b>一直循环</b>，想结束点「撤退」。注意：生命<b>不会自己恢复</b>，只能靠食物——生命低会自动吃灵米粥，战斗页顶部也能手动「吃一份」。',
              need: { count: 'battleWin', n: 3 }, reward: { coins: 80 } },
            { title: '逛逛商城', panel: 'shop',
              desc: '去「商城」买点东西（灵米、材料，或者功法——功法会加快修炼速度）。商城里还有永久升级，比如扩充背包。',
              need: { count: 'buy', n: 1 }, reward: { coins: 40 } },
            { title: '练气五层', panel: 'cultivation', target: ['cultivation', 'small'],
              desc: '练气一层解锁了更快的「小周天」。用它修炼到修为满，一层层突破到<b>练气五层</b>——这样就能进入第一个秘境了。',
              need: { realm: 5 }, reward: { coins: 100 } },   // v6.89：原索引2 → 13层制下的练气五层
            { title: '备足食物', panel: 'alchemy', target: ['alchemy', 'millet_porridge'],
              desc: '秘境要连续打过 5 只怪，血量不会中途恢复，<b>每次通关大约要吃 10 份食物</b>（新手大概要 20 份灵米粥）。累计熬灵米粥 10 次（一次出 2 份；灵米不够就回灵田多种），备足了再去。',
              need: { act: 'alchemy.millet_porridge', n: 10 }, reward: { coins: 60 } },
            { title: '挑战秘境', panel: 'battle', tab: 'dungeons',
              desc: '去「战斗」页的「秘境」标签，通关<b>神秘之塔</b>。装备好桃木剑，带上灵米粥（生命低于一半会自动吃）；食物吃光了还没打完就危险了，打不过就撤退，回去多备食物、多修炼。通关有灵石、种子等奖励。',
              need: { count: 'dungeon:mysteryTower', n: 1 }, reward: { coins: 200 } }
        ];
        const NEWBIE_FINAL_REWARD = 300;   // 全部任务做完的额外奖励（灵石）

        function freshQuestState() {
            return { index: 0, done: false, goalShown: false };
        }

        function getQuestState() {
            if (!gameState.quests) gameState.quests = freshQuestState();
            return gameState.quests;
        }

        // 累计事件计数（做过几次配方、赢过几场战斗等）；只在新手任务还没结束时才记，省得老玩家的存档白白变大
        function trackQuest(key, n = 1) {
            const q = gameState.quests;
            if (!q || q.done) return;
            if (!gameState.tally) gameState.tally = {};
            gameState.tally[key] = (gameState.tally[key] || 0) + n;
        }

        // 某个任务的进度：{ cur, max, text }
        function questProgress(quest) {
            const need = quest.need;
            const tally = gameState.tally || {};
            if (need.realm !== undefined) {
                const idx = gameState.player.realmIndex;
                const cur = Math.min(idx, need.realm);
                const req = GAME_CONFIG.realms[idx] && GAME_CONFIG.realms[idx].nextReq;
                const xp = gameState.player.cultivationXP || 0;
                return { cur, max: need.realm, text: idx < need.realm && req ? `修为 ${xp} / ${req}` : `${cur} / ${need.realm}` };
            }
            if (need.weapon) {
                const cur = gameState.player.equipment && gameState.player.equipment.weapon ? 1 : 0;
                return { cur, max: 1, text: cur ? '已装备武器' : '还没有装备武器' };
            }
            const key = need.act ? 'act:' + need.act : need.count;
            const cur = Math.min(tally[key] || 0, need.n);
            return { cur, max: need.n, text: `${cur} / ${need.n}` };
        }

        function getActiveQuest() {
            const q = gameState.quests;
            if (!q || q.done) return null;
            return NEWBIE_QUESTS[q.index] || null;
        }

        function isQuestComplete(quest) {
            const p = questProgress(quest);
            return p.cur >= p.max;
        }

        // 配方卡片是否是当前任务要点的那一个（用来高亮）
        function isQuestTarget(skill, key) {
            const quest = getActiveQuest();
            return !!(quest && quest.target && quest.target[0] === skill && quest.target[1] === key && !isQuestComplete(quest));
        }

        function questRewardText(reward) {
            const parts = [];
            if (reward.coins) parts.push(`${COIN_ICON} ${reward.coins} 灵石`);
            (reward.items || []).forEach(i => { const cfg = GAME_CONFIG.items[i.id]; parts.push(`${cfg.icon} ${cfg.name}×${i.qty}`); });
            return parts.join(' + ');
        }

        // 任务条：显示在顶部信息栏下面，当前任务的说明、进度、前往 / 领取按钮
        function renderQuestBanner() {
            const el = document.getElementById('questBanner');
            if (!el) return;
            const quest = getActiveQuest();
            if (!quest) { el.style.display = 'none'; el.innerHTML = ''; return; }
            const state = getQuestState();
            const p = questProgress(quest);
            const complete = p.cur >= p.max;
            el.style.display = '';
            el.className = 'quest-banner' + (complete ? ' complete' : '');
            el.innerHTML = `
                <div class="quest-head">
                    <span class="quest-tag">📜 新手任务 ${state.index + 1}/${NEWBIE_QUESTS.length}</span>
                    <b class="quest-title">${quest.title}</b>
                    <button type="button" class="quest-list-link" onclick="showQuestList()">全部任务</button>
                    <button type="button" class="quest-list-link quest-skip-link" onclick="skipQuests()">我是老玩家，跳过</button>
                </div>
                <div class="quest-desc">${quest.desc}</div>
                <div class="quest-foot">
                    <span class="quest-progress">${complete ? '✅ 已完成' : '进度 ' + p.text}</span>
                    <span class="quest-reward">奖励：${questRewardText(quest.reward)}</span>
                    ${complete
                        ? '<button type="button" class="btn quest-btn" onclick="claimQuest()">领取奖励</button>'
                        : '<button type="button" class="btn btn-secondary quest-btn" onclick="goToQuest()">前往</button>'}
                </div>`;
        }

        function goToQuest() {
            const quest = getActiveQuest();
            if (!quest) return;
            switchPanel(quest.panel);
            if (quest.tab) switchBattleTab(quest.tab);
            scrollMainToTop();
        }

        function claimQuest() {
            const quest = getActiveQuest();
            if (!quest || !isQuestComplete(quest)) return;
            const state = getQuestState();
            const reward = quest.reward;
            if (reward.coins) gameState.player.coins += reward.coins;
            (reward.items || []).forEach(i => addToInventory(i.id, i.qty));
            showNotification(`📜 任务完成：${quest.title}\n奖励 ${questRewardText(reward)}`, '#b89a5b');
            state.index++;
            if (state.index >= NEWBIE_QUESTS.length) {
                state.done = true;
                gameState.player.coins += NEWBIE_FINAL_REWARD;
                updateUI();
                saveGame();
                showQuestGoal(true);
                return;
            }
            updateUI();
            refreshVisiblePanelLists();
            saveGame();
        }

        // 老玩家跳过新手任务：之后不再有任务条，也拿不到任何任务奖励（包括已完成但没领取的、桃木剑和最终奖励）
        function skipQuests() {
            const state = getQuestState();
            if (state.done) return;
            const ok = confirm('确定跳过新手任务吗？\n\n跳过后不会再有任务提示，也拿不到任何任务奖励（灵石、桃木剑等），包括已经完成但还没领取的。\n之后仍可以在「设置 → 玩法介绍」里查看任务列表和游戏目标。');
            if (!ok) return;
            state.done = true;
            state.skipped = true;
            state.index = NEWBIE_QUESTS.length;
            closeTutorial();
            updateUI();
            refreshVisiblePanelLists();
            saveGame();
            showNotification('已跳过新手任务（没有奖励）。游戏目标可在「设置 → 玩法介绍 → 新手任务」里查看。', '#b89a5b');
        }

        // 全部任务列表（已完成 / 当前 / 未开始）
        function showQuestList() {
            const state = getQuestState();
            const rows = NEWBIE_QUESTS.map((q, i) => {
                const mark = state.skipped ? '⏭' : (i < state.index || state.done ? '✅' : (i === state.index ? '👉' : '⚪'));
                return `<div class="quest-row${i === state.index && !state.done ? ' current' : ''}"><span>${mark} ${i + 1}. ${q.title}</span><small>${questRewardText(q.reward)}</small></div>`;
            }).join('');
            document.getElementById('tutorialContent').innerHTML = `
                <div class="tutorial-title">📜 新手任务</div>
                <div class="tutorial-body quest-list">${rows}
                    <div class="quest-row final"><span>🎁 全部完成</span><small>${state.skipped ? '已跳过，没有奖励' : `${COIN_ICON} ${NEWBIE_FINAL_REWARD} 灵石 + 游戏目标介绍`}</small></div></div>
                <div class="tutorial-actions"><button class="btn" onclick="closeTutorial()">关闭</button>${state.done ? '<button class="btn btn-secondary" onclick="showQuestGoal(false)">查看游戏目标</button>' : '<button class="btn btn-secondary quest-skip-btn" onclick="skipQuests()">我是老玩家，跳过任务</button>'}</div>`;
            document.getElementById('tutorialModal').classList.add('show');
        }

        // 新手任务全部完成后：告诉玩家游戏的目标是什么
        function showQuestGoal(justFinished = false) {
            const state = getQuestState();
            state.goalShown = true;
            const maxName = GAME_CONFIG.realms[GAME_CONFIG.realms.length - 1].name;
            document.getElementById('tutorialContent').innerHTML = `
                <div class="tutorial-title">🎉 新手任务全部完成！</div>
                <div class="tutorial-body">
                    ${justFinished ? `额外奖励 ${COIN_ICON} ${NEWBIE_FINAL_REWARD} 灵石已到账。<br/><br/>` : ''}
                    你已经把基础玩法都试过一遍了。接下来，这个游戏的目标是——<br/>
                    <b>🎯 一步步修炼、突破，走到当前的最高境界「${maxName}」，成为一方大能。</b><br/><br/>
                    路上你会：<br/>
                    ・每个大境界（练气→筑基→金丹→元婴→化神）的突破需要<b>突破丹药</b>，只能靠炼丹制作<br/>
                    ・用<b>炼器</b>打造更好的装备，带足<b>食物</b>挑战更深的秘境，拿材料和种子<br/>
                    ・金丹后解锁<b>丹火</b>（货币：淬炼装备、强化灵根、助炼丹药），元婴后解锁<b>神识</b>（货币：强化分身、加快生活技能、增强战斗感知）和<b>分身</b>，化神后解锁<b>悟道</b><br/>
                    ・学更强的功法、提高精通，让一切越来越快——离线也在成长<br/><br/>
                    不用着急，放置游戏，慢慢来。这份任务和玩法介绍都可以在<b>设置</b>里重新查看。
                </div>
                <div class="tutorial-actions"><button class="btn" onclick="closeTutorial()">继续修仙</button></div>`;
            document.getElementById('tutorialModal').classList.add('show');
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
            gameState.quests = freshQuestState();   // 新角色从第一个新手任务开始
            gameState.tally = {};
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
        const CLONE_UNLOCK_REALMS = [22, 26];   // v6.89：原索引13/17 → +9，第 1、2 个分身的解锁境界：元婴初期、化神初期

        function getCloneSlotCount() {
            if (isFused()) return 0;   // 合道后分身永久消失
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
            const base = SKILL_LEVEL_EFFECTS.shenshi.formula((gameState.skills.shenshi || {}).level || 1) / (1 + getMod('cloneSpeed'));
            return Math.max(1.0, base * (1 - 0.03 * getShenLevel('clone')));   // 神识「分身强化」：-3%/级，最快与主角持平
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
            if (!isCloneUnlocked()) { showNotification(isFused() ? '你已合道，分身已收回体内' : '🔒 分身要到元婴初期才会出现', '#c98a3e'); return; }
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
                    const fast = duration < FAST_ACTION_SECONDS;
                    if (fast) notifyMuted = true;
                    try { completeAction(c.action, { double: getCloneDoubleBonus(), batch: fast }); } finally { notifyMuted = false; }
                    if (fast) flushFastUI();
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
                applySkillLevelBonus(skill, per, 'raw');
                const isClone = durationFn === getCloneDuration;
                const doubleRate = getSkillMod('double', skill) + getMasteryBonus(skill, key).double + (isClone ? getCloneDoubleBonus() : 0) + applyAlchemyBoostBatch(skill, action, n);
                gameState.player.coins += (per.coins || 0) * n;
                addCurrency({ danhuo: (per.danhuo || 0) * n, shenshi: (per.shenshi || 0) * n, daoguo: (per.daoguo || 0) * n });
                const lost = [];
                (per.items || []).forEach(item => {
                    const qty = Math.floor(item.qty * n * (1 + doubleRate) + 1e-9);
                    if (qty > 0 && !addToInventory(item.id, qty, true)) lost.push(`${GAME_CONFIG.items[item.id].name}×${qty}`);
                });
                if (per.skill && per.exp) addSkillExp(per.skill, per.exp * n, key);
                addMasteryExp(skill, key, action.duration * n);
                showNotification(`🌀 ${label}离线完成 ${n} 次：${action.name}${ranOut ? '（材料用完，已停止）' : ''}${lost.length ? `\n❌ 背包已满，${lost.join('、')} 未能获得` : ''}`, lost.length ? '#c98a3e' : '#6fa980');
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
                const fast = duration < FAST_ACTION_SECONDS;
                if (fast) notifyMuted = true;
                try { completeAction(f.action, { batch: fast }); } finally { notifyMuted = false; }
                if (fast) flushFastUI();
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

        let lastTickWall = 0;
        function startGameTick() {
            lastTickWall = Date.now();
            tickInterval = setInterval(() => {
                // 页面可见但循环断了很久（电脑休眠、浏览器冻结）：没有 visibilitychange，这里按离线结算
                const wall = Date.now();
                if (lastTickWall && wall - lastTickWall > 10000 && !document.hidden && gameRunning) {
                    gameState.lastActiveTime = lastTickWall;
                    lastTickWall = wall;
                    resumeAfterAway();
                    return;
                }
                lastTickWall = wall;
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

                // 耗时短于一个 tick（0.1 秒，如礼包饰品的 ×100 速度）时，一个 tick 里连续完成多次
                const fast = adjustedDuration < FAST_ACTION_SECONDS;
                let guard = 0, did = 0;
                if (fast) notifyMuted = true;
                try {
                    while (gameState.currentAction && adjustedDuration > 0 && gameState.currentActionProgress >= adjustedDuration && guard++ < 60) {
                        completeAction(gameState.currentAction, { batch: fast });
                        did++;
                        if (!gameState.currentAction) { gameState.currentActionProgress = 0; break; }
                        gameState.currentActionProgress = adjustedDuration < 0.1 ? gameState.currentActionProgress - adjustedDuration : 0;
                    }
                } finally {
                    notifyMuted = false;
                }
                if (fast && did) {
                    flushFastUI();
                    if (!gameState.currentAction) { showNotification('⏹ 行动已自动停止（修为已满、材料用完或已至上限）', '#c98a3e'); updateUI(); saveGame(); }   // 停止时立刻刷新并提示
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
            const eff = getMonsterEffectiveStats(monster);
            const monsterSPD = eff.spd || 40;
            const playerSPD = gameState.player.stats.spd || 50;
            let hitChance = BATTLE_FORMULAS.calculateHitChance(monsterSPD, playerSPD);
            const monsterRealmIndex = GAME_CONFIG.dungeons[gameState.dungeons.currentDungeon].baseRealmIndex || 0;
            const realmSuppression = REALM_SUPPRESSION.calculate(monsterRealmIndex, gameState.player.realmIndex);
            hitChance *= realmSuppression.hitMod;
            const monsterTypeId = SPIRIT_ROOT_MAPPING[monster.type] || monster.type;
            const counterModifier = COUNTER_SYSTEM.getCounterModifier(monsterTypeId, gameState.player.spiritRoot);
            hitChance *= counterModifier.hit;
            hitChance += getDomainMod('hit');   // 灵域：双方命中率同时提升，怪物这一侧单独加算
            if (!isDomainDodgeVoid()) hitChance *= 1 - Math.min(0.6, getMod('dodge'));   // 灵根 / 功法 / 灵域闪避特效：降低被命中率；雷域下闪避失效
            hitChance = Math.max(0.05, Math.min(0.95, hitChance));
            return { hitChance, realmSuppression, counterModifier };
        }

        function performPlayerAttack(monster) {
            const { hitChance, realmSuppression, counterModifier } = getDungeonPlayerHit(monster);
            const eff = getMonsterEffectiveStats(monster);

            if (Math.random() < hitChance) {
                const baseDmg = gameState.player.stats.atk || 20;
                let playerDmg = BATTLE_FORMULAS.calculateDamage({ atk: baseDmg }, { def: eff.def || 0 });
                playerDmg = Math.floor(playerDmg * realmSuppression.dmgMod);
                playerDmg = Math.floor(playerDmg * counterModifier.damage);
                playerDmg = Math.floor(playerDmg * getBattleSkillDmgMult());   // 战斗技能等级加成
                // 暴击（基础5%、×1.5，灵根/功法/灵域可提高）
                const isCrit = Math.random() < BASE_CRIT.rate + getMod('crit');
                if (isCrit) playerDmg = Math.floor(playerDmg * (BASE_CRIT.dmg + getMod('critDmg')));
                playerDmg = Math.max(1, playerDmg);

                gameState.dungeons.currentMonsterHP -= playerDmg;

                // P1-1 显示伤害飘字和日志
                showDamageFloat(-playerDmg, false, isCrit);
                addBattleLog(`${isCrit ? '暴击！' : ''}造成${playerDmg}点伤害`, 'player-hit');
            } else {
                // P1-1 显示未命中日志
                addBattleLog('攻击落空', 'miss');
            }
        }

        // 计算怪物对玩家的伤害
        function performMonsterAttack(monster) {
            const { hitChance, realmSuppression, counterModifier } = getDungeonMonsterHit(monster);
            const eff = getMonsterEffectiveStats(monster);

            if (Math.random() < hitChance) {
                const baseDmg = eff.atk || 10;
                let monsterDmg = baseDmg + Math.random() * baseDmg * 0.3 - baseDmg * 0.15;

                // 玩家防御减伤
                const playerDef = gameState.player.stats.def || 5;
                const damageReduction = (playerDef / (monsterDmg + playerDef + 1)) * 0.75;
                monsterDmg *= (1 - damageReduction);

                // 怪物攻击也受境界压制
                monsterDmg = Math.floor(monsterDmg * realmSuppression.dmgMod);

                // 克制修正
                monsterDmg = Math.floor(monsterDmg * counterModifier.damage);

                // 灵域暴击：平时怪物不会暴击，只有灵域给了 crit 加成（目前只有金域）才可能触发
                const domainCrit = getDomainMod('crit');
                const isMonsterCrit = domainCrit > 0 && Math.random() < domainCrit;
                if (isMonsterCrit) monsterDmg *= (BASE_CRIT.dmg + getDomainMod('critDmg'));
                monsterDmg = Math.max(1, Math.floor(monsterDmg));

                gameState.player.stats.hp.current -= monsterDmg;

                // P1-1 显示伤害飘字和日志
                showDamageFloat(-monsterDmg, true, isMonsterCrit);
                addBattleLog(`${isMonsterCrit ? '暴击！' : ''}受到${monsterDmg}点伤害`, 'monster-hit');
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
            icon.innerHTML = cfg ? cfg.icon : '🍽️';
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
            syncBattleMode();
            document.getElementById('battleTitle').textContent = '⚔️ 秘境战斗中';

            // 初始化HP条
            updateBattleHP();
            updateFoodBar();

            // 手动进入时清空日志；循环续战（通关后再进）保留最近 30 条
            if (!keepLog) resetBattleLog(); else renderBattleLog(true);

            // 沿用玩家已选的战斗速度（通关后循环续战、被击败后再进都不重置）；从未选过则为 1x
            const keepSpeed = gameState.battleSpeed || 1;
            const speedBtn = document.querySelector(`.speed-btn[data-speed="${keepSpeed}"]`);
            gameState.battleSpeed = speedBtn ? keepSpeed : 1;
            document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active'));
            (speedBtn || document.querySelector('.speed-btn[data-speed="1"]')).classList.add('active');

            // 初始化玩家和怪物信息
            const dungeonId = gameState.dungeons.currentDungeon;
            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            const monster = dungeon.monsters[gameState.dungeons.currentMonsterIndex];

            document.getElementById('playerNameBattle').textContent = gameState.player.name || '玩家';
            document.getElementById('monsterNameBattle').textContent = monster.name || '敌人';
            document.getElementById('monsterSprite').innerHTML = monster.icon || '👾';

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

            // 攻击蓄力进度条：双方各自独立的攻速节奏，谁的条先蓄满谁先出手
            const playerInterval = getPlayerAttackInterval();
            const monsterInterval = monster.attackSpeed || 2.5;
            updateAtkBar('playerAtkBar', gameState.player.attackTimer || 0, playerInterval);
            updateAtkBar('monsterAtkBar', gameState.dungeons.monsterAttackTimer || 0, monsterInterval);

            updateDungeonProgress();
        }

        // 玩家攻击间隔（秒）：速度越高，间隔越短，出手越快
        function getPlayerAttackInterval() {
            const base = 2.0 / (1 + gameState.player.stats.spd / 100);
            return Math.max(MIN_ATTACK_INTERVAL, base + getDomainIntervalAdd());
        }

        // 更新攻击蓄力进度条（0~100%，蓄满时高亮，下一 tick 出手后清零重新蓄力）
        function updateAtkBar(elId, timer, interval) {
            const bar = document.getElementById(elId);
            if (!bar) return;
            const pct = Math.max(0, Math.min(100, (timer / interval) * 100));
            bar.style.width = pct + '%';
            bar.classList.toggle('ready', pct >= 99);
        }

        // 战斗独立界面（v6.73）：body.in-battle 时 CSS 隐藏侧边栏 / 顶部栏 / 右侧属性栏，战斗容器占满可视空间。
        // 状态源是 battleContainer 是否 hidden——只要调用这个函数就能把 body class 同步过去，
        // 不用在每一个进入 / 退出战斗的分支里都记得手动加减 class，也不怕漏掉某个分支。
        function syncBattleMode() {
            const bc = document.getElementById('battleContainer');
            document.body.classList.toggle('in-battle', !!(bc && !bc.classList.contains('hidden')));
        }

        // 秘境战斗顶部的「第 N/M 只」进度指示：一排小圆点，已击败/当前/未遇到三种状态
        function updateDungeonProgress() {
            const el = document.getElementById('dungeonProgress');
            if (!el) return;
            const dungeonId = gameState.dungeons.currentDungeon;
            const dungeon = dungeonId && GAME_CONFIG.dungeons[dungeonId];
            if (!dungeon) { el.style.display = 'none'; return; }
            const idx = gameState.dungeons.currentMonsterIndex;
            const total = dungeon.monsters.length;
            const pips = dungeon.monsters.map((m, i) => {
                const cls = i < idx ? 'done' : (i === idx ? 'current' : '');
                return `<span class="pip ${cls}" title="${m.name}"></span>`;
            }).join('');
            el.innerHTML = `第 ${idx + 1}/${total} 只 ${pips}`;
            el.style.display = '';
        }

        // P1-1 显示伤害飘字
        // isCrit：暴击伤害单独加大字号+变色+弹跳动画（.damage-float.crit，样式见 style.css），
        // 不然暴击和普通攻击视觉上完全一样，只有战斗日志里一句「暴击！」文字能看出区别，容易被忽略
        function showDamageFloat(damage, isPlayer, isCrit = false) {
            const floatLayer = document.getElementById('damageFloatLayer');
            if (!floatLayer) return;
            const floatDiv = document.createElement('div');
            floatDiv.className = 'damage-float' + (isCrit ? ' crit' : '');

            if (damage < 0) {
                floatDiv.textContent = (isCrit ? '暴击 ' : '') + damage;
                floatDiv.style.color = isCrit ? '' : '#c4483a';
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

        // 生命过低（<50%）时进入战斗的提醒
        function warnLowHp() {
            const hp = gameState.player.stats.hp;
            if (hp && hp.max && hp.current / hp.max < FOOD_CONFIG.autoEatConfig.hpThreshold) {
                showNotification(`⚠️ 生命只有 ${Math.round(hp.current / hp.max * 100)}%，建议先进食恢复（战斗页顶部「吃一份」）`, '#c98a3e', 'warning');
            }
        }

        // 战斗外的当前可用食物：当前选择的食物不可用时，换成背包里恢复量最高的可用食物
        function getRestFood() {
            pickBestFood();
            const id = gameState.player.foodSlot;
            const cfg = id && FOOD_CONFIG.foods[id];
            if (!cfg || gameState.player.realmIndex < cfg.minRealm || getFoodCount() <= 0) return null;
            return id;
        }

        // 战斗外手动进食（生命不会自动恢复，只能靠食物）。战斗中由「自动食用」负责，这里不可用
        // all = true：一直吃到满血或没有食物
        function eatFoodManually(all = false) {
            if (gameState.currentAction && (gameState.currentAction.isBattle || gameState.currentAction.isDungeon)) {
                showNotification('战斗中请使用「自动食用」', '#c98a3e', 'warning');
                return;
            }
            const hp = gameState.player.stats.hp;
            if (hp.current >= hp.max) { showNotification('生命已满', '#c98a3e', 'normal'); return; }
            let eaten = 0, healed = 0, foodName = '';
            do {
                const id = getRestFood();
                if (!id) break;
                const cfg = FOOD_CONFIG.foods[id];
                const restore = Math.min(Math.floor(cfg.hpRestore * (1 + getMod('foodPct'))), hp.max - hp.current);
                if (restore <= 0) break;
                hp.current += restore;
                consumeItem(id, 1);
                eaten++; healed += restore; foodName = cfg.name;
            } while (all && hp.current < hp.max);
            if (!eaten) { showNotification('没有可用的食物（在炼丹里制作）', '#c4483a', 'error'); return; }
            showNotification(`食用${foodName}×${eaten}，恢复 ${healed} 生命（${hp.current}/${hp.max}）`, '#6fa980');
            updateUI();
            renderHpRestoreBar();
            saveGame();
        }

        // 战斗面板顶部：生命值 + 战斗外进食按钮
        function renderHpRestoreBar() {
            const el = document.getElementById('hpRestoreBar');
            if (!el) return;
            const hp = gameState.player.stats.hp;
            if (!hp || !hp.max) { el.innerHTML = ''; return; }
            const inCombat = !!(gameState.currentAction && (gameState.currentAction.isBattle || gameState.currentAction.isDungeon));
            const foodId = getRestFood();
            const cfg = foodId && FOOD_CONFIG.foods[foodId];
            const pct = Math.round(hp.current / hp.max * 100);
            const disabled = inCombat || !cfg || hp.current >= hp.max;
            el.innerHTML = `<span class="hp-rest-text">❤ 生命 <b>${hp.current}/${hp.max}</b>（${pct}%）</span>` +
                `<span class="hp-rest-food">${cfg ? `${cfg.icon} ${cfg.name} ×${getFoodCount()}（+${cfg.hpRestore}）` : '无可用食物（在炼丹里制作）'}</span>` +
                `<button class="btn btn-secondary" ${disabled ? 'disabled' : ''} onclick="eatFoodManually(false)">吃一份</button>` +
                `<button class="btn btn-secondary" ${disabled ? 'disabled' : ''} onclick="eatFoodManually(true)">吃到满</button>` +
                `<span class="hp-rest-hint">${inCombat ? '战斗中由「自动食用」负责' : '生命不会自动恢复，只能靠食物'}</span>`;
        }

        // 重置战斗状态（撤退和死亡时使用）
        // domainOutcome：不传时按 newState 推断（player_dead→died，其余→survived）；
        // 离线中断这种「结局不明确」的场景需要显式传 'skip'，不然会被当成"活着撤退"误计入灵域存活率
        function resetBattleState(newState = 'idle', domainOutcome) {
            gameState.dungeons.currentDungeon = null;
            gameState.currentAction = null;
            gameState.currentActionProgress = 0;
            gameState.dungeons.battleState = newState;
            const battleContainer = document.getElementById('battleContainer');
            if (battleContainer) {
                battleContainer.classList.add('hidden');
            }
            syncBattleMode();
            clearActiveDomain(domainOutcome || (newState === 'player_dead' ? 'died' : 'survived'));
        }

        // P1-4 从秘径撤退（模态对话框版本）
        function retreatFromDungeon() {
            const isNormalBattle = !!(gameState.currentAction && gameState.currentAction.isBattle);
            // 秘境里随时可以撤退：只要还在秘境中即可（击败第一只怪后 battleState 会变成 monster_dead，不能再要求 'fighting'）
            if (!isNormalBattle && !gameState.dungeons.currentDungeon) return;

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
                    scrollMainToTop();
                } else {
                    resetBattleState('idle');
                    showNotification('已撤退秘境', '#c2a25f');
                    updateUI();
                    switchPanel('battle');
                    switchBattleTab('dungeons');
                    scrollMainToTop();
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

            // 灵域对双方同时生效：木域回血也要作用在怪物身上，不然「双方」就只剩玩家单方面受益
            const domainRegen = getDomainMod('regen');
            if (domainRegen > 0 && gameState.dungeons.currentMonsterHP > 0 && gameState.dungeons.currentMonsterHP < monster.hp) {
                gameState.dungeons.currentMonsterHP = Math.min(monster.hp, gameState.dungeons.currentMonsterHP + monster.hp * domainRegen * timeDelta);
            }

            // 定义攻击间隔（秒）
            const playerAttackInterval = getPlayerAttackInterval();
            const monsterAttackInterval = Math.max(MIN_ATTACK_INTERVAL, (monster.attackSpeed || 2.5) + getDomainIntervalAdd());

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

        // 普通战斗超时保护（v6.72）：双方独立攻速后单场时长不再固定，正常情况下几秒到二十几秒内分胜负；
        // 这个值只是异常兜底（极端低攻速差距时避免战斗无限拖长），不是常规平衡手段
        const NORMAL_BATTLE_TIMEOUT_SECONDS = 60;

        // 普通战斗处理（v6.72：双方独立攻速，不再是固定2秒同步回合——与秘境战斗的节奏统一，speed 属性对双方都真实生效）
        // 普通战斗推进一步（0.1 秒 × 战斗速度）：计时、双方各自独立结算、自动进食；不含任何界面更新
        // 在线战斗与离线自动战斗共用，保证两者规则一致
        function stepNormalBattle(battle) {
            const timeDelta = 0.1 * (gameState.battleSpeed || 1);

            // 本次 tick 命中的伤害飘字信息：只写不读 DOM，离线批量模拟也会调这个函数，飘字展示放到
            // performNormalBattleTick（只在有画面时跑）里读这两个字段再显示，避免离线模拟白白操作 DOM
            battle._lastPlayerAttack = null;
            battle._lastEnemyAttack = null;

            // battle.turnCount 继续沿用：现在只表示「已经过去的秒数」，用于超时保护和离线模拟的时间换算
            battle.turnCount = (battle.turnCount || 0) + timeDelta;
            applyRegen(battle.playerHP, timeDelta);   // 灵根/功法的战斗回复特效

            const enemy = battle.currentEnemy;
            const areaRealm = getAction('battle', battle.currentArea).areaData.minLevel;
            const playerStats = gameState.player.stats;
            const enemyEff = getMonsterEffectiveStats(enemy);   // 灵域对双方同时生效：敌方也要打上同一份补丁

            // 双方各自独立的攻击间隔：公式与秘境战斗一致，速度越高出手越快
            const playerInterval = getPlayerAttackInterval();
            const enemyInterval = Math.max(MIN_ATTACK_INTERVAL, 2.0 / (1 + enemyEff.spd / 100) + getDomainIntervalAdd());

            // 灵域木域回血：敌方也要回，不然「双方」就只剩玩家单方面受益
            const domainRegen = getDomainMod('regen');
            if (domainRegen > 0 && enemy.currentHP > 0 && enemy.currentHP < enemy.hp) {
                enemy.currentHP = Math.min(enemy.hp, enemy.currentHP + enemy.hp * domainRegen * timeDelta);
            }

            battle.playerAttackTimer = (battle.playerAttackTimer || 0) + timeDelta;
            if (battle.playerAttackTimer >= playerInterval) {
                battle.playerAttackTimer -= playerInterval;
                const toEnemy = rollNormalAttack(playerStats, { ...enemy, def: enemyEff.def, spd: enemyEff.spd }, REALM_SUPPRESSION.calculate(gameState.player.realmIndex, areaRealm),
                    { hit: getMod('hit'), crit: BASE_CRIT.rate + getMod('crit'), critMult: BASE_CRIT.dmg + getMod('critDmg'),
                      dmgMult: (1 + getMasteryBonus('battle', battle.currentArea).dmg) * getBattleSkillDmgMult(),
                      dodge: isDomainDodgeVoid() ? 0 : getDomainMod('dodge') });   // 水域：敌方也获得闪避
                if (toEnemy.hit) {
                    enemy.currentHP -= toEnemy.dmg;
                    battle.log.push(`玩家${toEnemy.crit ? '暴击！' : ''}造成${toEnemy.dmg}点伤害`);
                    battle._lastPlayerAttack = { dmg: toEnemy.dmg, crit: toEnemy.crit };
                } else {
                    battle.log.push('玩家攻击落空');
                }
                trimBattleLog(battle.log);
            }

            if (enemy.currentHP > 0) {
                battle.enemyAttackTimer = (battle.enemyAttackTimer || 0) + timeDelta;
                if (battle.enemyAttackTimer >= enemyInterval) {
                    battle.enemyAttackTimer -= enemyInterval;
                    const toPlayer = rollNormalAttack({ ...enemy, atk: enemyEff.atk, spd: enemyEff.spd }, playerStats, REALM_SUPPRESSION.calculate(areaRealm, gameState.player.realmIndex),
                        { dodge: isDomainDodgeVoid() ? 0 : getMod('dodge'),
                          hit: getDomainMod('hit'), crit: getDomainMod('crit'), critMult: BASE_CRIT.dmg + getDomainMod('critDmg') });   // 金域：敌方也可能暴击，平时 crit=0 不会触发
                    if (toPlayer.hit) {
                        battle.playerHP.current -= toPlayer.dmg;
                        battle.log.push(`${enemy.name}${toPlayer.crit ? '暴击！' : ''}造成${toPlayer.dmg}点伤害`);
                        battle._lastEnemyAttack = { dmg: toPlayer.dmg, crit: toPlayer.crit };
                    } else {
                        battle.log.push(`${enemy.name}攻击落空`);
                    }
                    trimBattleLog(battle.log);
                }
            }

            // 战斗食物：生命低于阈值时自动进食（恢复战斗内的生命值）
            checkAndAutoEat(battle.playerHP, msg => battle.log.push(msg));
        }

        function performNormalBattleTick() {
            if (!gameState.battles) return;

            const battle = gameState.battles;

            stepNormalBattle(battle);

            // 普通战斗区域此前只有文字日志、没有飘字，跟秘境战斗的反馈强度不一致——这里补上，
            // 只在有画面的实时 tick 里读 stepNormalBattle 写的战果字段，离线批量模拟不会走到这里
            if (battle._lastPlayerAttack) showDamageFloat(-battle._lastPlayerAttack.dmg, false, battle._lastPlayerAttack.crit);
            if (battle._lastEnemyAttack) showDamageFloat(-battle._lastEnemyAttack.dmg, true, battle._lastEnemyAttack.crit);

            // 更新UI
            updateNormalBattleUI();

            // 战斗完成：敌人HP <= 0、玩家倒下 或 超时兜底
            if (battle.currentEnemy.currentHP <= 0 || battle.playerHP.current <= 0 || battle.turnCount >= NORMAL_BATTLE_TIMEOUT_SECONDS) {
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
            if (monsterName) monsterName.innerHTML = `${battle.currentEnemy.icon || '👹'} ${battle.currentEnemy.name}`;

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

                // 攻击蓄力进度条：双方各自独立的攻速节奏
                const playerInterval = getPlayerAttackInterval();
                const enemyInterval = 2.0 / (1 + (e.spd || 40) / 100);
                updateAtkBar('playerAtkBar', battle.playerAttackTimer || 0, playerInterval);
                updateAtkBar('monsterAtkBar', battle.enemyAttackTimer || 0, enemyInterval);
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
            document.getElementById('monsterSprite').innerHTML = battle.currentEnemy.icon || '👾';

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
                const { coins, exp, items, lost, danhuo, shenshi, daoguo } = grantNormalBattleWin(areaKey);
                auto.wins++; auto.coins += coins; auto.exp += exp;
                battleLogEntries.push(`获得 ${coins} 灵石、${exp} 经验${danhuo ? `、${danhuo} 丹火` : ''}${shenshi ? `、${shenshi} 神识` : ''}${daoguo ? `、${daoguo} 道果` : ''}`);
                if (items.length) battleLogEntries.push(`🎁 掉落：${formatDropList(items)}`);
                if (lost.length) {
                    battleLogEntries.push(`❌ 背包已满，${formatDropList(lost)} 未能获得`);
                    showNotification('❌ 背包已满，战斗掉落无法拾取！请出售物品或扩展背包', '#c4483a', 'error');
                }
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
                syncBattleMode();
                clearActiveDomain('died');
                switchPanel('battle');
                switchBattleTab('areas');
                renderAutoBattleBar();
                return;
            }
            enterBattleArea(areaKey, true);
        }

        // 战斗区域掉落：每胜一场，每一项各自独立按概率判定（概率再乘该区域精通的奖励加成）。qty 是数字或 [最少, 最多]
        // 越深的区域越偏向高阶矿石与稀有材料；种子、丹火 / 神识种子等只在深处极小概率出现
        const BATTLE_DROPS = {
            forest:            [{ id: 'stone', p: 0.30, qty: [1, 2] }, { id: 'millet', p: 0.15, qty: 1 }, { id: 'cleangrass', p: 0.08, qty: 1 }, { id: 'seed_cleangrass', p: 0.04, qty: 1 }],
            mountain:          [{ id: 'stone', p: 0.30, qty: [1, 2] }, { id: 'ironore', p: 0.20, qty: 1 }, { id: 'mushroom', p: 0.06, qty: 1 }, { id: 'seed_cleangrass', p: 0.04, qty: 1 }],
            deepMountain:      [{ id: 'ironore', p: 0.25, qty: [1, 2] }, { id: 'spiritore', p: 0.08, qty: 1 }, { id: 'mushroom', p: 0.08, qty: 1 }, { id: 'seed_mushroom', p: 0.03, qty: 1 }],
            swamp:             [{ id: 'cleangrass', p: 0.20, qty: [1, 2] }, { id: 'mushroom', p: 0.12, qty: 1 }, { id: 'spiritore', p: 0.08, qty: 1 }, { id: 'seed_tea', p: 0.03, qty: 1 }],
            abyss:             [{ id: 'spiritore', p: 0.20, qty: [1, 2] }, { id: 'crystal', p: 0.06, qty: 1 }, { id: 'seed_mushroom', p: 0.03, qty: 1 }],
            goldenPlains:      [{ id: 'spiritore', p: 0.25, qty: [1, 2] }, { id: 'crystal', p: 0.12, qty: 1 }, { id: 'tea', p: 0.08, qty: 1 }, { id: 'spiritcrystal', p: 0.04, qty: 1 }],
            tribulationGround: [{ id: 'crystal', p: 0.15, qty: 1 }, { id: 'spiritcrystal', p: 0.08, qty: 1 }, { id: 'danhuo_seed', p: 0.015, qty: 1 }],
            voidSea:           [{ id: 'crystal', p: 0.12, qty: 1 }, { id: 'spiritcrystal', p: 0.12, qty: 1 }, { id: 'immortalore', p: 0.02, qty: 1 }, { id: 'shenshi_seed', p: 0.015, qty: 1 }],
            abyssRuins:        [{ id: 'spiritcrystal', p: 0.15, qty: [1, 2] }, { id: 'immortalore', p: 0.05, qty: 1 }, { id: 'daofruit', p: 0.02, qty: 1 }],
            chaosWastes:       [{ id: 'immortalore', p: 0.10, qty: 1 }, { id: 'chaosstone', p: 0.04, qty: 1 }, { id: 'seed_daofruit', p: 0.02, qty: 1 }],
            nineNether:        [{ id: 'immortalore', p: 0.15, qty: [1, 2] }, { id: 'chaosstone', p: 0.08, qty: 1 }, { id: 'daofruit', p: 0.05, qty: 1 }, { id: 'seed_daofruit', p: 0.03, qty: 1 }],
            daoWastes:         [{ id: 'voidcrystal', p: 0.12, qty: 1 }, { id: 'chaosstone', p: 0.10, qty: 1 }, { id: 'voidcrystal_seed', p: 0.02, qty: 1 }],
            fusionVoid:        [{ id: 'voidcrystal', p: 0.20, qty: [1, 2] }, { id: 'daofruit', p: 0.10, qty: 1 }, { id: 'voidcrystal_seed', p: 0.03, qty: 1 }],
            voidAbyss:         [{ id: 'daostone', p: 0.10, qty: 1 }, { id: 'chaosstone', p: 0.12, qty: 1 }, { id: 'daofruit', p: 0.06, qty: 1 }, { id: 'seed_daofruit', p: 0.03, qty: 1 }],
            huashiRealm:       [{ id: 'daostone', p: 0.18, qty: [1, 2] }, { id: 'daofruit', p: 0.10, qty: 1 }, { id: 'daoguo_seed', p: 0.015, qty: 1 }],
            taiyiField:        [{ id: 'taiyiessence', p: 0.12, qty: 1 }, { id: 'chaosstone', p: 0.10, qty: 1 }, { id: 'nascentsoul_essence', p: 0.02, qty: 1 }],
            lingjieAbyss:      [{ id: 'taiyiessence', p: 0.20, qty: [1, 2] }, { id: 'daofruit', p: 0.10, qty: 1 }, { id: 'nascentsoul_essence', p: 0.03, qty: 1 }],
            // 太乙精华概率比上一档更高：这是「开辟仙窍」的唯一材料，真仙境的战斗本身就是仙窍材料的主要来源
            xianbattle:        [{ id: 'taiyiessence', p: 0.30, qty: [1, 3] }, { id: 'daofruit', p: 0.12, qty: 1 }, { id: 'nascentsoul_essence', p: 0.04, qty: 1 }]
        };

        // 掉落数量文字（如 1–2 / 1）
        function dropQtyText(q) {
            return Array.isArray(q) ? (q[0] === q[1] ? q[0] : `${q[0]}–${q[1]}`) : q;
        }

        // 掉落列表 → 「图标 名称×数量、…」
        function formatDropList(items) {
            return items.map(d => {
                const cfg = GAME_CONFIG.items[d.id] || {};
                return `${cfg.icon || ''}${cfg.name || d.id}×${d.qty}`;
            }).join('、');
        }

        // 判定一场胜利的掉落并放进背包（静默入包，背包放不下的记入 lost，由调用方汇总提示）
        function rollAreaDrops(areaKey, bonus) {
            const got = [], lost = [];
            (BATTLE_DROPS[areaKey] || []).forEach(d => {
                if (Math.random() >= Math.min(1, d.p * bonus)) return;
                const qty = Array.isArray(d.qty) ? d.qty[0] + Math.floor(Math.random() * (d.qty[1] - d.qty[0] + 1)) : d.qty;
                (addToInventory(d.id, qty, true) ? got : lost).push({ id: d.id, qty });
            });
            return { got, lost };
        }

        // 一场普通战斗取胜的奖励：精通加成后的灵石 / 经验 / 物品掉落，并获得该区域精通经验（每胜一场 10）
        function grantNormalBattleWin(areaKey) {
            const areaData = getAction('battle', areaKey).areaData;
            const reward = 1 + getMasteryBonus('battle', areaKey).reward;
            const coins = Math.round(areaData.coins * reward);
            const exp = Math.round(areaData.exp * reward);
            gameState.player.coins += coins;
            addSkillExp('battle', exp);
            addMasteryExp('battle', areaKey, 10);
            const { got, lost } = rollAreaDrops(areaKey, reward);
            const currency = rollAreaCurrency(areaKey, reward);
            trackQuest('battleWin');
            return { coins, exp, items: got, lost, danhuo: currency.danhuo, shenshi: currency.shenshi, daoguo: currency.daoguo };
        }

        // 把若干次掉落合并成 { id: 数量 }
        function mergeDrops(total, items) {
            items.forEach(d => { total[d.id] = (total[d.id] || 0) + d.qty; });
            return total;
        }
        function dropMapToList(map) {
            return Object.entries(map).map(([id, qty]) => ({ id, qty }));
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
            renderHpRestoreBar();
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
            const r = { fights: 0, wins: 0, losses: 0, coins: 0, exp: 0, stopped: false, drops: {}, lostDrops: {}, danhuo: 0, shenshi: 0, daoguo: 0 };
            let elapsed = 0, streak = 0;
            try {
                while (elapsed < budgetSeconds && r.fights < 20000) {
                    const battle = { currentArea: areaKey, playerHP: { current: hp.current, max: hp.max },
                        currentEnemy: createAreaEnemy(areaKey), log: [], turnCount: 0 };
                    gameState.player.foodUseTimer = FOOD_CONFIG.autoEatConfig.cooldown;
                    pickBestFood();
                    do {
                        stepNormalBattle(battle);
                    } while (battle.currentEnemy.currentHP > 0 && battle.playerHP.current > 0 && battle.turnCount < NORMAL_BATTLE_TIMEOUT_SECONDS);
                    elapsed += battle.turnCount / Math.min(1, AUTO_BATTLE_OFFLINE_EFFICIENCY + getMod('autoOffline'));   // 每场按 1/效率 倍时间计（基础 0.8，悟道·冰之法则可提高）
                    r.fights++;
                    const won = battle.currentEnemy.currentHP <= 0;
                    hp.current = battle.playerHP.current <= 0 ? Math.floor(hp.max * 0.5) : Math.min(hp.max, battle.playerHP.current);
                    if (won) {
                        const g = grantNormalBattleWin(areaKey);
                        r.wins++; r.coins += g.coins; r.exp += g.exp; streak = 0;
                        mergeDrops(r.drops, g.items); mergeDrops(r.lostDrops, g.lost);
                        r.danhuo += g.danhuo; r.shenshi += g.shenshi; r.daoguo += g.daoguo;
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
            const dungeon = GAME_CONFIG.dungeons[dungeonId];
            if (dungeon.isTribulation) { completeTribulation(dungeonId); return; }   // 天劫：渡过一次即可，不循环挑战

            // 隐藏战斗UI
            const battleContainer = document.getElementById('battleContainer');
            if (battleContainer) {
                battleContainer.classList.add('hidden');
            }

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
                    const got = addToInventory(drop.id, qty);
                    const item = GAME_CONFIG.items[drop.id];
                    rewardMsg += `+ ${item.name} x${qty}${got ? '' : '（背包已满，未获得）'}\n`;
                });
            }

            // 随机掉落（神识地图：本次秘境掉落率×1.3，用后消耗）
            const scoutMult = (gameState.player.scoutBonus ? SCOUT_MULT : 1) * (1 + getMod('dropPct'));
            if (gameState.player.scoutBonus) {
                gameState.player.scoutBonus = false;
                rewardMsg += '🔍 神识探查生效：掉落率+50%\n';
            }
            if (rewards.random) {
                rewards.random.forEach(drop => {
                    if (Math.random() < drop.probability * scoutMult) {
                        const qty = Array.isArray(drop.qty) ? Math.floor(Math.random() * (drop.qty[1] - drop.qty[0] + 1)) + drop.qty[0] : drop.qty;
                        const got = addToInventory(drop.id, qty);
                        const item = GAME_CONFIG.items[drop.id];
                        rewardMsg += `+ ${item.name} x${qty}${got ? '' : '（背包已满，未获得）'}\n`;
                    }
                });
            }

            // 通关灵石（此前配置了 rewards.coins 却从未发放）
            if (rewards.coins) {
                const coins = Array.isArray(rewards.coins)
                    ? rewards.coins[0] + Math.floor(Math.random() * (rewards.coins[1] - rewards.coins[0] + 1))
                    : rewards.coins;
                gameState.player.coins += coins;
                rewardMsg += `+ ${coins} 灵石\n`;
            }

            // 通关丹火 / 神识（金丹级以上秘境）
            [['danhuo', '丹火'], ['shenshi', '神识'], ['daoguo', '道果']].forEach(([kind, label]) => {
                const range = rewards[kind];
                if (!range) return;
                const amount = Array.isArray(range) ? range[0] + Math.floor(Math.random() * (range[1] - range[0] + 1)) : range;
                addCurrency({ [kind]: amount });
                rewardMsg += `+ ${amount} ${label}\n`;
            });

            // 战斗技能经验：走统一的 addSkillExp（此前手写升级循环，绕过了经验加成与升级提示）
            if (rewards.skillExp) {
                addSkillExp('battle', rewards.skillExp);
                rewardMsg += `+ 战斗经验 x${rewards.skillExp}`;
            }

            trackQuest('dungeon:' + dungeonId);
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
        // v6.89：练气改13层，原索引5起整体+9；原索引4（练气巅峰→筑基）单独映射为新索引13（练气十三层→筑基）
        const MAJOR_BREAKTHROUGH_PILLS = {
            13: { pillId: 'pill', pillName: '筑基丹', qty: 1 },   // 练气十三层(索引13)→筑基初期(索引14)
            17: { pillId: 'goldenpill', pillName: '金丹秘药', qty: 1 },  // 筑基圆满(索引17)→金丹初期(索引18)
            21: { pillId: 'yuanyingpill', pillName: '元婴丹', qty: 1 },  // 金丹圆满(索引21)→元婴初期(索引22)
            25: { pillId: 'huashenpill', pillName: '化神丹', qty: 1 },   // 元婴圆满(索引25)→化神初期(索引26)
            29: { pillId: 'huaxupill', pillName: '化虚丹', qty: 1 },   // 化神圆满(索引29)→炼虚初期(索引30)
            33: { pillId: 'hetipill', pillName: '合体丹', qty: 1 },       // 炼虚圆满(索引33)→合体初期(索引34)，且必须已「合道」（见 attemptBreakthrough）
            37: { pillId: 'dachengpill', pillName: '大乘丹', qty: 1 }    // 合体圆满(索引37)→大乘初期(索引38)
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
                description: '灵气如流云般周转不息，练气期后段的常见选择。',
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
            },
            // 合体期功法（商城购买）
            heti_art: {
                id: 'heti_art',
                name: '合体真经',
                tier: 11,
                speedMultiplier: 8.0,               // 修炼速度快700%
                effects: { atkPct: 0.14, defPct: 0.12, 'out:daoguo': 0.12 },
                description: '合体修士的根本大典，肉身与元神合一，出手沉稳，凝道更快。',
                origin: null
            },
            // 合体期高阶功法（稀有）
            dao_art: {
                id: 'dao_art',
                name: '太上合道经',
                tier: 12,
                speedMultiplier: 9.5,               // 修炼速度快750%
                effects: { hpPct: 0.18, defPct: 0.14, 'time:life': -0.10 },
                description: '太上宗门不传之秘，直接吞吐天地大道，修行一日千里。',
                origin: null
            },
            lianxu_art: {
                id: 'lianxu_art',
                name: '炼虚真经',
                tier: 9,
                speedMultiplier: 5.0,               // 修炼速度快400%
                effects: { atkPct: 0.12, defPct: 0.10, 'out:daoguo': 0.10 },
                description: '化虚为实的根本法门，法则不再只是加成，而是可以握在手中的力量。',
                origin: null
            },
            taixuhuashi_art: {
                id: 'taixuhuashi_art',
                name: '太虚化实经',
                tier: 10,
                speedMultiplier: 6.2,               // 修炼速度快520%
                effects: { hpPct: 0.15, 'exp:life': 0.15, 'out:daoguo': 0.15 },
                description: '炼虚期最终法门，虚实之间再无分别，一念可化万法为实体。',
                origin: null
            },
            dacheng_art: {
                id: 'dacheng_art',
                name: '大乘真经',
                tier: 13,
                speedMultiplier: 12.0,               // 修炼速度快1100%
                effects: { atkPct: 0.16, defPct: 0.14, 'out:daoguo': 0.14 },
                description: '灵界至高一脉的根本大典，元婴与法则之力同修并进。',
                origin: null
            },
            taiyi_art: {
                id: 'taiyi_art',
                name: '太乙化元经',
                tier: 14,
                speedMultiplier: 15.0,               // 修炼速度快1400%
                effects: { hpPct: 0.20, defPct: 0.16, 'time:life': -0.12 },
                description: '大乘期最终法门，元婴离体，法则随心，灵界罕有人能修至此境。',
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
        const LIFE_SKILLS = ['alchemy', 'forging', 'farming', 'mining', 'danhuo', 'shenshi', 'daoguo'];
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

        const EFFECT_SKILL_NAMES = { cultivation: '修炼', alchemy: '炼丹', forging: '炼器', farming: '灵田', mining: '采矿', danhuo: '丹火', shenshi: '神识', daoguo: '道果', battle: '战斗', wudao: '悟道', life: '所有生活技能' };

        // ==================== 化神期：灵域（v6.77） ====================
        // 原著：化神修士与五行之力相融，可施展「灵域」——领域之内的战斗规则被改写。
        // 游戏化：化神初期起，每次进入战斗（秘境 / 普通战斗区域）前可选一个灵域，消耗神识激活，
        // 整场战斗（循环挑战期间）持续生效，中途不可更换；灵域对战斗双方同时生效，不是单方面增益，
        // 所以除了玩家侧数值（走 getMod，calculateStats 时自动应用），怪物侧的攻防/速度/命中/闪避/暴击
        // 也要在两套战斗代码里分别接入——见 getMonsterEffectiveStats() 和 rollNormalAttack 的调用处。
        const SPIRIT_DOMAINS = {
            metal:   { name: '金域', icon: '⚔️', desc: '双方暴击率 +20%、暴击伤害 +50%', effects: { crit: 0.20, critDmg: 0.50 } },
            wood:    { name: '木域', icon: '🌿', desc: '双方每秒恢复 1.5% 最大生命', effects: { regen: 0.015 } },
            water:   { name: '水域', icon: '💧', desc: '双方闪避率 +15%', effects: { dodge: 0.15 } },
            fire:    { name: '火域', icon: '🔥', desc: '双方攻击力 +25%、防御力 -30%', effects: { atkPct: 0.25, defPct: -0.30 } },
            earth:   { name: '土域', icon: '⛰️', desc: '双方防御力 +40%、速度 -20%', effects: { defPct: 0.40, spdPct: -0.20 } },
            thunder: { name: '雷域', icon: '⚡', desc: '双方命中率 +20%，闪避失效', effects: { hit: 0.20 }, dodgeVoid: true },
            ice:     { name: '冰域', icon: '❄️', desc: '双方速度 -30%，攻击间隔 +0.5 秒', effects: { spdPct: -0.30 }, intervalAdd: 0.5 },
            wind:    { name: '风域', icon: '🌪️', desc: '双方攻击间隔 -0.5 秒', effects: {}, intervalAdd: -0.5 }
        };
        const DOMAIN_SHENSHI_COST = 15;   // 每次进入战斗激活一次：化神期神识产出约 0.3/秒，15 点约合半分钟产出，有真实成本但不至于用不起
        const MIN_ATTACK_INTERVAL = 0.3;   // 攻击间隔下限，防止冰域 / 装备叠加把间隔压到 0 或负数

        function isDomainUnlocked() { return gameState.player.realmIndex >= 26; }   // v6.89：原索引17 → +9
        function getActiveDomain() { return SPIRIT_DOMAINS[gameState.player.activeDomain] || null; }

        // 玩家侧灵域效果：走 getMod 统一体系，calculateStats 时自动应用到 atk/def/hp/spd，
        // 战斗代码不用再额外处理玩家自己这一侧
        function getDomainMod(key) {
            const domain = getActiveDomain();
            if (!domain || !domain.effects) return 0;
            return domain.effects[key] || 0;
        }
        // 攻击间隔的灵域修正：绝对秒数加算，不是百分比，所以不走 getMod，单独在两套战斗代码的间隔计算处调用
        function getDomainIntervalAdd() {
            const domain = getActiveDomain();
            return domain ? (domain.intervalAdd || 0) : 0;
        }
        function isDomainDodgeVoid() {
            const domain = getActiveDomain();
            return !!(domain && domain.dodgeVoid);
        }

        // 怪物侧的有效攻防速度：灵域对双方同时生效，但怪物没有 getMod 体系，
        // 所以在战斗计算时用这个函数现算一份「打了灵域补丁」的怪物属性，不修改原始配置对象
        function getMonsterEffectiveStats(monster) {
            const domain = getActiveDomain();
            if (!domain) return { atk: monster.atk, def: monster.def, spd: monster.spd };
            const atkMod = 1 + (domain.effects.atkPct || 0);
            const defMod = 1 + (domain.effects.defPct || 0);
            const spdMod = 1 + (domain.effects.spdPct || 0);
            return {
                atk: Math.max(1, Math.round(monster.atk * atkMod)),
                def: Math.max(0, Math.round(monster.def * defMod)),
                spd: Math.max(1, Math.round(monster.spd * spdMod))
            };
        }

        // 灵域个人数据：只统计「激活次数」和「存活次数」（存活 = 没有以被击败告终，撤退 / 通关 / 渡劫成功都算），
        // 在灵域选择弹窗里给玩家一点"经营感"反馈（正反馈诊断 C-3），不是严格的"通关率"——
        // 普通战斗是循环挑战到撤退/死亡为止，秘境是打到底，渡劫是一锤子买卖，三种内容没有统一的"关"，
        // 用"存活"这个所有内容都适用的口径更诚实
        function getDomainStats(domainKey) {
            const stats = (gameState.player.domainStats || {})[domainKey];
            return stats || { used: 0, survived: 0 };
        }

        // 激活灵域：进入战斗前调用，扣神识、写入 gameState、重算玩家属性（把灵域的玩家侧加成算进去）
        function activateDomain(domainKey) {
            const P = ensureCurrencyState();
            if (!domainKey) { gameState.player.activeDomain = null; calculateStats(); return true; }
            if (!SPIRIT_DOMAINS[domainKey]) return false;
            if (P.shenshi < DOMAIN_SHENSHI_COST) { spendNotify('shenshi', DOMAIN_SHENSHI_COST); return false; }
            P.shenshi -= DOMAIN_SHENSHI_COST;
            P.activeDomain = domainKey;
            if (!P.domainStats) P.domainStats = {};
            if (!P.domainStats[domainKey]) P.domainStats[domainKey] = { used: 0, survived: 0 };
            P.domainStats[domainKey].used++;
            calculateStats();
            showNotification(`${SPIRIT_DOMAINS[domainKey].icon} ${SPIRIT_DOMAINS[domainKey].name}已激活：${SPIRIT_DOMAINS[domainKey].desc}`, '#b39ddb');
            return true;
        }
        // 战斗结束（撤退 / 被击败 / 通关不循环）时清空，恢复玩家属性；domainDecided 一并复位，
        // 这样下一场战斗（哪怕选择了「不用灵域」）也会重新弹一次选择框，而不是被上一场的决定卡住
        // outcome：'survived'（默认，撤退/通关/渡劫成功）/ 'died'（被击败）/ 'skip'（结局不明确，比如离线期间战斗被中断，不计入统计）
        function clearActiveDomain(outcome = 'survived') {
            gameState.player.domainDecided = false;
            const domainKey = gameState.player.activeDomain;
            if (!domainKey) return;
            if (outcome !== 'skip') {
                if (!gameState.player.domainStats) gameState.player.domainStats = {};
                if (!gameState.player.domainStats[domainKey]) gameState.player.domainStats[domainKey] = { used: 0, survived: 0 };
                if (outcome === 'survived') gameState.player.domainStats[domainKey].survived++;
            }
            gameState.player.activeDomain = null;
            calculateStats();
        }

        // 进入战斗前的灵域选择：化神期起、本场还没决定过灵域时，先弹窗让玩家选，选完（或跳过）再真正进入战斗；
        // 没到化神期、或本场已经决定过（循环续战/同一场重进），直接放行，不打断已有的进入流程
        let __pendingDomainEnter = null;
        function maybeSelectDomainThenEnter(enterFn) {
            if (!isDomainUnlocked() || gameState.player.domainDecided) { enterFn(); return; }
            __pendingDomainEnter = enterFn;
            renderDomainSelectModal();
            const modal = document.getElementById('domainSelectModal');
            if (modal) modal.classList.add('show'); else enterFn();   // 万一 HTML 还没这个弹窗（老缓存），直接放行不卡住玩家
        }
        function confirmDomainChoice(key) {
            if (key && !activateDomain(key)) return;   // 神识不够时 activateDomain 已经弹过提示，弹窗留着让玩家换一个或点跳过
            if (!key) activateDomain(null);
            const modal = document.getElementById('domainSelectModal');
            if (modal) modal.classList.remove('show');
            const fn = __pendingDomainEnter;
            __pendingDomainEnter = null;
            if (fn) fn();
        }
        function renderDomainSelectModal() {
            const el = document.getElementById('domainSelectList');
            if (!el) return;
            const P = gameState.player;
            el.innerHTML = Object.entries(SPIRIT_DOMAINS).map(([key, d]) => {
                const affordable = P.shenshi >= DOMAIN_SHENSHI_COST;
                const s = getDomainStats(key);
                const statsHtml = s.used > 0
                    ? `<div class="domain-stats">你选过 ${s.used} 次，存活 ${Math.round(s.survived / s.used * 100)}%</div>`
                    : `<div class="domain-stats domain-stats-new">还没选过</div>`;
                return `<div class="domain-card${affordable ? '' : ' unaffordable'}" onclick="confirmDomainChoice('${key}')">
                    <div class="domain-icon">${d.icon}</div>
                    <div class="domain-name">${d.name}</div>
                    ${statsHtml}
                    <div class="domain-desc">${d.desc}</div>
                </div>`;
            }).join('');
            const balEl = document.getElementById('domainShenshiBalance');
            if (balEl) balEl.textContent = Math.floor(P.shenshi || 0);
            const costEl = document.getElementById('domainShenshiCost');
            if (costEl) costEl.textContent = DOMAIN_SHENSHI_COST;
        }

        // ==================== 悟道：八种法则 ====================
        // 化神初期起可用。每种法则有独立的领悟等级（累计经验推算，不单独存等级），效果 = 每级效果 × 等级 + 各里程碑加成，
        // 通过 getMod() 统一接入战斗 / 生活技能 / 全局加成。等级上限随境界提高（化神初期 10，每高一个境界 +5，最高 30）。
        // 与自身灵根同名的法则，参悟速度 +50%。
        const LAW_IDS = ['metal', 'wood', 'water', 'fire', 'earth', 'wind', 'thunder', 'ice'];
        const LAW_MAX_LEVEL = 30;
        const LAW_UNLOCK_REALM = 26;            // v6.89：原索引17 → +9，化神初期
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
                const lawScale = 1 + DAO_LAW_PER_LEVEL * getDaoLaw();   // 道果悟法：全部法则效果放大
                if (lawScale !== 1) Object.keys(lawTotalsCache).forEach(k => { lawTotalsCache[k] *= lawScale; });
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
                if (isMs) showQuickCelebration(`${def.icon} ${def.name} 里程碑 Lv.${after}`);
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
                    ${daozeButtonsHtml(id)}
                    <div class="action-progress-bar ${active ? 'active' : ''}"><div class="action-progress-fill" style="width: 0%"></div></div>`;
                card.onclick = () => selectAction('wudao', id);
                list.appendChild(card);
            });
        }

        // 当前灵根 + 当前功法 + 悟道法则提供的某项特效总和
        // ==================== 技能商店：技能设施（永久升级，v6.57） ====================
        // 商城「技能商店」标签：每个技能有若干件设施 / 器具，需要该技能等级达到要求才能购买，每件只能买一次，永久提供加成。
        // 加成用与灵根 / 功法相同的特效词汇（getMod / getSkillMod 会把已购设施的特效加进去）：time:技能（耗时）、exp:技能（经验）、
        // double:技能（翻倍产出）、save:技能（节省材料）、out:技能（丹火 / 神识产出）、gearPct（装备属性）、cultSpeed、atkPct、hpPct、defPct、crit、cloneSpeed。
        const SKILL_UPGRADES = [
            // 炼丹
            { id: 'alch_room',   skill: 'alchemy', level: 10,  price: 3000,   icon: '🏠', name: '炼丹室',   effects: { 'time:alchemy': -0.05, 'exp:alchemy': 0.05 } },
            { id: 'alch_yellow', skill: 'alchemy', level: 20, price: 12000,  icon: '🟡', name: '黄品丹炉', effects: { 'save:alchemy': 0.06 } },
            { id: 'alch_xuan',   skill: 'alchemy', level: 30, price: 40000,  icon: '🟣', name: '玄品丹炉', effects: { 'time:alchemy': -0.06, 'double:alchemy': 0.05 } },
            { id: 'alch_earth',  skill: 'alchemy', level: 40, price: 120000, icon: '🟤', name: '地品丹炉', effects: { 'save:alchemy': 0.08, 'exp:alchemy': 0.08 } },
            { id: 'alch_heaven', skill: 'alchemy', level: 50, price: 300000, icon: '🔥', name: '天品丹炉', effects: { 'double:alchemy': 0.08, 'time:alchemy': -0.06 } },
            // 炼器
            { id: 'forge_anvil',   skill: 'forging', level: 10,  price: 3000,   icon: '⚒️', name: '精铁砧',   effects: { 'time:forging': -0.05 } },
            { id: 'forge_pool',    skill: 'forging', level: 20, price: 12000,  icon: '💧', name: '淬火池',   effects: { 'save:forging': 0.06 } },
            { id: 'forge_furnace', skill: 'forging', level: 30, price: 40000,  icon: '🏭', name: '灵纹炉',   effects: { gearPct: 0.03 } },
            { id: 'forge_god',     skill: 'forging', level: 40, price: 120000, icon: '🌋', name: '神火炉',   effects: { 'time:forging': -0.06, gearPct: 0.04 } },
            { id: 'forge_heaven',  skill: 'forging', level: 50, price: 300000, icon: '🏛️', name: '天工台',   effects: { 'save:forging': 0.08, gearPct: 0.05 } },
            // 灵田
            { id: 'farm_spring', skill: 'farming', level: 10,  price: 3000,   icon: '⛲', name: '灵泉',     effects: { 'time:farming': -0.05 } },
            { id: 'farm_array',  skill: 'farming', level: 20, price: 12000,  icon: '🌀', name: '聚灵阵',   effects: { 'double:farming': 0.06 } },
            { id: 'farm_house',  skill: 'farming', level: 30, price: 40000,  icon: '🏡', name: '温室',     effects: { 'exp:farming': 0.08, 'time:farming': -0.05 } },
            { id: 'farm_cave',   skill: 'farming', level: 40, price: 120000, icon: '⛰️', name: '洞天福地', effects: { 'double:farming': 0.08 } },
            // 采矿
            { id: 'mine_pick',  skill: 'mining', level: 10,  price: 3000,   icon: '⛏️', name: '精钢镐',   effects: { 'time:mining': -0.05 } },
            { id: 'mine_cart',  skill: 'mining', level: 20, price: 12000,  icon: '🛒', name: '矿车',     effects: { 'double:mining': 0.06 } },
            { id: 'mine_drill', skill: 'mining', level: 30, price: 40000,  icon: '🔩', name: '灵矿钻',   effects: { 'time:mining': -0.06, 'exp:mining': 0.08 } },
            { id: 'mine_core',  skill: 'mining', level: 40, price: 120000, icon: '💠', name: '地脉核心', effects: { 'double:mining': 0.08 } },
            // 修炼
            { id: 'cult_mat',   skill: 'cultivation', level: 5,  price: 3000,   icon: '🧘', name: '聚灵蒲团', effects: { cultSpeed: 0.03 } },
            { id: 'cult_room',  skill: 'cultivation', level: 10, price: 12000,  icon: '🏯', name: '静修室',   effects: { cultSpeed: 0.03 } },
            { id: 'cult_array', skill: 'cultivation', level: 15, price: 40000,  icon: '🔯', name: '聚灵大阵', effects: { cultSpeed: 0.04 } },
            { id: 'cult_cave',  skill: 'cultivation', level: 20, price: 120000, icon: '🗻', name: '洞府',     effects: { cultSpeed: 0.05 } },
            // 战斗
            { id: 'battle_yard',   skill: 'battle', level: 5,  price: 3000,   icon: '🥋', name: '演武场',   effects: { atkPct: 0.02 } },
            { id: 'battle_armory', skill: 'battle', level: 10, price: 12000,  icon: '🗡️', name: '兵器架',   effects: { hpPct: 0.03, crit: 0.01 } },
            { id: 'battle_tower',  skill: 'battle', level: 15, price: 40000,  icon: '🗼', name: '锻体塔',   effects: { defPct: 0.04, hpPct: 0.03 } },
            { id: 'battle_altar',  skill: 'battle', level: 20, price: 120000, icon: '⚔️', name: '战神坛',   effects: { atkPct: 0.03, crit: 0.01 } },
            // 丹火
            { id: 'fire_box',     skill: 'danhuo', level: 5,  price: 3000,   icon: '📦', name: '火种匣',   effects: { 'out:danhuo': 0.10 } },
            { id: 'fire_room',    skill: 'danhuo', level: 10, price: 12000,  icon: '🔥', name: '地火室',   effects: { 'time:danhuo': -0.05, 'exp:danhuo': 0.08 } },
            { id: 'fire_pot',     skill: 'danhuo', level: 15, price: 40000,  icon: '🏺', name: '聚火鼎',   effects: { 'out:danhuo': 0.15 } },
            { id: 'fire_pit',     skill: 'danhuo', level: 20, price: 120000, icon: '☀️', name: '九阳火池', effects: { 'out:danhuo': 0.20 } },
            // 神识
            { id: 'sense_mat',   skill: 'shenshi', level: 5,  price: 3000,   icon: '🪷', name: '静心蒲团', effects: { 'out:shenshi': 0.10 } },
            { id: 'sense_pool',  skill: 'shenshi', level: 10, price: 12000,  icon: '🌊', name: '洗神池',   effects: { 'time:shenshi': -0.05, 'exp:shenshi': 0.08 } },
            { id: 'sense_lamp',  skill: 'shenshi', level: 15, price: 40000,  icon: '🏮', name: '观照灯',   effects: { 'out:shenshi': 0.15 } },
            { id: 'sense_tower', skill: 'shenshi', level: 20, price: 120000, icon: '🔭', name: '通明台',   effects: { 'out:shenshi': 0.20, cloneSpeed: 0.05 } },
            // 悟道
            // 道果
            { id: 'dao_altar',    skill: 'daoguo', level: 5,  price: 60000,   icon: '🛕', name: '凝道坛',   effects: { 'out:daoguo': 0.10 } },
            { id: 'dao_cave',     skill: 'daoguo', level: 10, price: 200000,  icon: '🕳️', name: '归元洞',   effects: { 'time:daoguo': -0.05, 'exp:daoguo': 0.08 } },
            { id: 'dao_pagoda',   skill: 'daoguo', level: 15, price: 500000,  icon: '🗼', name: '悟真塔',   effects: { 'out:daoguo': 0.15 } },
            { id: 'dao_heaven',   skill: 'daoguo', level: 20, price: 1200000, icon: '🌌', name: '洞天福地', effects: { 'out:daoguo': 0.20 } },
            { id: 'law_stone',    skill: 'wudao', level: 5,  price: 20000,  icon: '🪨', name: '悟道石',   effects: { 'time:wudao': -0.05 } },
            { id: 'law_platform', skill: 'wudao', level: 10, price: 60000,  icon: '⛩️', name: '悟道台',   effects: { 'time:wudao': -0.06 } },
            { id: 'law_tree',     skill: 'wudao', level: 15, price: 150000, icon: '🌳', name: '悟道茶树', effects: { 'exp:wudao': 0.10 } }
        ];
        const SKILL_SHOP_ORDER = ['cultivation', 'alchemy', 'forging', 'farming', 'mining', 'battle', 'danhuo', 'shenshi', 'daoguo', 'wudao'];

        let skillUpgradeCache = null;
        function invalidateSkillUpgrades() { skillUpgradeCache = null; }
        function ownedSkillUpgrades() {
            const owned = gameState && gameState.player && gameState.player.skillUpgrades;
            return Array.isArray(owned) ? SKILL_UPGRADES.filter(u => owned.includes(u.id)) : [];
        }
        // 已购设施的特效合计（带缓存）
        function getSkillUpgradeTotals() {
            if (!skillUpgradeCache) {
                skillUpgradeCache = {};
                ownedSkillUpgrades().forEach(u => Object.entries(u.effects).forEach(([k, v]) => { skillUpgradeCache[k] = (skillUpgradeCache[k] || 0) + v; }));
            }
            return skillUpgradeCache;
        }

        function buySkillUpgrade(id) {
            const u = SKILL_UPGRADES.find(x => x.id === id);
            if (!u) return;
            const P = gameState.player;
            if (!Array.isArray(P.skillUpgrades)) P.skillUpgrades = [];
            if (P.skillUpgrades.includes(id)) { showNotification('已经拥有这件设施了', '#c98a3e'); return; }
            const lv = (gameState.skills[u.skill] || {}).level || 1;
            if (lv < u.level) { showNotification(`🔒 需要${gameState.skills[u.skill].name} Lv.${u.level}（当前 Lv.${lv}）`, '#c98a3e'); return; }
            if (P.coins < u.price) { showNotification(`灵石不足！需要${u.price}，拥有${P.coins}`, '#c4483a', 'error'); return; }
            P.coins -= u.price;
            P.skillUpgrades.push(id);
            invalidateSkillUpgrades();
            calculateStats();
            showNotification(`🏛 已购置：${u.name}\n${describeEffects(u.effects).join('、')}`, '#6f9c8a');
            trackQuest('buy');
            updateUI();
            saveGame();
        }

        // 技能商店标签：按技能分组，列出设施、要求、加成与价格
        function renderSkillShop(container) {
            const P = gameState.player;
            const owned = P.skillUpgrades || [];
            const intro = document.createElement('div');
            intro.style.cssText = 'grid-column: 1/-1; color: #888; font-size: 0.85em; line-height: 1.7;';
            intro.textContent = '技能设施是永久升级：对应技能的等级达到要求后才能购买，每件只能买一次，效果永久生效。';
            container.appendChild(intro);
            SKILL_SHOP_ORDER.forEach(skillName => {
                const skill = gameState.skills[skillName];
                const list = SKILL_UPGRADES.filter(u => u.skill === skillName);
                if (!skill || !list.length) return;
                if ((skillName === 'danhuo' && !isDanhuoUnlocked()) || (skillName === 'shenshi' && !isShenshiUnlocked()) || (skillName === 'daoguo' && !isDaoguoUnlocked()) || (skillName === 'wudao' && P.realmIndex < LAW_UNLOCK_REALM)) return;
                const title = document.createElement('div');
                title.style.cssText = 'grid-column: 1/-1; font-weight: bold; color: #6f9c8a; margin-top: 10px; margin-bottom: 5px;';
                title.textContent = `${skill.icon} ${skill.name}设施（${skill.name} Lv.${skill.level || 1}）`;
                container.appendChild(title);
                list.forEach(u => {
                    const has = owned.includes(u.id);
                    const locked = !has && (skill.level || 1) < u.level;
                    const card = document.createElement('div');
                    card.className = 'shop-item';
                    let style = 'padding: 15px; background: rgba(0,0,0,0.3); border: 1px solid #555; border-radius: 4px; text-align: center;';
                    style += has ? 'opacity: 0.55; cursor: default;' : locked ? 'opacity: 0.55; border-style: dashed; cursor: not-allowed;' : 'cursor: pointer;';
                    card.style.cssText = style;
                    const status = has ? '✓ 已拥有' : locked ? `🔒 需要${skill.name} Lv.${u.level}` : `${COIN_ICON} ${u.price} 灵石`;
                    const color = has ? '#6f9c8a' : locked ? '#c98a3e' : '#c2a25f';
                    card.innerHTML = `
                        <div style="font-size: 24px; margin-bottom: 5px;">${u.icon}</div>
                        <div style="font-weight: bold; color: #6f9c8a; margin-bottom: 3px;">${u.name}</div>
                        <div style="font-size: 0.8em; color: #888; margin-bottom: 8px;">${describeEffects(u.effects).join('<br/>')}</div>
                        <div style="color: ${color}; font-weight: bold;">${status}</div>
                        ${locked ? `<div style="font-size: 0.75em; color: #888; margin-top: 4px;">${u.price} 灵石</div>` : ''}`;
                    card.onclick = () => (has ? null : locked ? showNotification(`🔒 需要${skill.name} Lv.${u.level}（当前 Lv.${skill.level || 1}）`, '#c98a3e') : buySkillUpgrade(u.id));
                    container.appendChild(card);
                });
            });
        }

        // 已装备物品的 effect 数值合计（如礼包饰品的 cultSpeed）
        function getEquippedEffectSum(key) {
            const eq = (gameState && gameState.player && gameState.player.equipment) || {};
            let sum = 0;
            [eq.weapon, eq.armor, ...(eq.jewelry || []), ...(eq.daoze || [])].filter(Boolean).forEach(id => {
                const e = GAME_CONFIG.items[id] && GAME_CONFIG.items[id].effect;
                if (e && e[key]) sum += e[key];
            });
            return sum;
        }

        function getMod(key) {
            const player = gameState && gameState.player;
            if (!player) return 0;
            let total = 0;
            const rootEffects = SPIRIT_ROOT_EFFECTS[player.spiritRoot]?.effects;
            if (rootEffects && rootEffects[key]) total += rootEffects[key] * (1 + ROOT_PER_LEVEL * (player.rootLevel || 0));   // 丹火强化灵根
            if (key === 'crit' || key === 'dodge') total += 0.01 * ((player.shen && player.shen.sense) || 0);   // 神识感应
            const artEffects = CULTIVATION_ARTS[player.currentArt]?.effects;
            if (artEffects && artEffects[key]) total += artEffects[key];
            total += getLawTotals()[key] || 0;
            total += getSkillUpgradeTotals()[key] || 0;   // 技能商店里已购置的设施
            total += getEquippedEffectSum(key);   // 装备物品自带的特效（含武器/护甲的修炼速度、道基镶嵌的道则）
            total += getDaoMod(key);   // 道果淬体 / 合道
            total += getTribulationMod(key);   // 渡劫：身与天地相融，每渡过一劫永久 +2.5% 生命 / 防御
            total += getNascentMod(key);   // 元婴蜕变：元婴离体助战，攻击 / 暴击伤害随蜕变等级增长
            total += getCoinRefineMod(key);   // 聚灵培元：灵石的软性无底洞，永久小幅 +生命/攻击/防御
            total += getDomainMod(key);   // 化神期灵域：战斗中对双方同时生效的领域规则（玩家侧这一半）
            total += getAvatarMod(key);   // 化神期身外化身：永久小幅 +攻击/防御
            total += getXianShuaiMod(key);   // 真仙境五衰（前三衰合并）：飞升代价，随仙窍数打通递减至归零
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
                foodPct: v => `食物恢复 ${sign(v)}`, gearPct: v => `装备属性 ${sign(v)}`, dropPct: v => `秘境掉落 ${sign(v)}`,
                cultSpeed: v => `修炼速度 ${sign(v)}`, cloneSpeed: v => `分身速度 ${sign(v)}`, autoOffline: v => `离线自动战斗效率 ${sign(v)}`, regen: v => `战斗回复 ${parseFloat((v * 100).toFixed(2))}%生命/秒`
            };
            return Object.entries(effects).map(([key, v]) => {
                if (fixed[key]) return fixed[key](v);
                const [kind, skill] = key.split(':');
                const name = EFFECT_SKILL_NAMES[skill] || skill;
                if (kind === 'time') return `${name}耗时 ${sign(v)}`;
                if (kind === 'exp') return `${name}经验 ${sign(v)}`;
                if (kind === 'out') return `${name}产出 ${sign(v)}`;
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
                html += `<div><b style="color:#b89a5b">${ROOT_ICONS[player.spiritRoot]} ${root.name}${getRootLevel() ? ' · 强化 Lv.' + getRootLevel() : ''}</b>：${describeEffects(getRootEffectsScaled()).join(' · ')}</div>`;
            }
            if (art) {
                const eff = describeEffects(art.effects);
                html += `<div><b style="color:#7d9bb5">📜 ${art.name}</b>（修炼×${art.speedMultiplier}）：${eff.length ? eff.join(' · ') : '无特殊效果'}</div>`;
            }
            // 悟道：已领悟的法则合计
            const lawParts = LAW_IDS.filter(id => getLawInfo(id).level > 0).map(id => `${LAW_EFFECTS[id].icon}${LAW_EFFECTS[id].name.replace('之法则', '')}Lv.${getLawInfo(id).level}`);
            const ups = ownedSkillUpgrades();
            if (ups.length) {
                html += `<div><b style="color:#7fae9a">🏛 设施</b>：已购置 ${ups.length}/${SKILL_UPGRADES.length} 件（${ups.slice(-3).map(u => u.name).join('、')}${ups.length > 3 ? '…' : ''}）</div>`;
            }
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

        // 灵根一句话倾向标签（v6.76）：开局选灵根是新手唯一的一次性重大决策，
        // 但完整数值列表信息密度太高，第一次打开游戏的人很难在没有任何游戏体验的情况下读懂
        // 一串百分比再做选择——加个人话总结放在最前面，完整数值仍然保留在后面给老玩家核对
        const ROOT_QUICK_TAG = {
            metal:   '⚔️ 偏战斗·稳定输出',
            wood:    '🌾 偏种田',
            water:   '🧪 偏炼丹·耐久',
            fire:    '⚔️ 偏战斗·爆发输出',
            earth:   '🛡️ 偏坦克',
            thunder: '📈 偏养成',
            ice:     '🧪 偏炼丹·省料',
            wind:    '⚖️ 均衡全能'
        };

        // 创建角色时的灵根选项：写明克制关系与特效
        function populateRootOptions() {
            const select = document.getElementById('playerSpiritRoot');
            if (!select) return;
            select.querySelectorAll('option').forEach(option => {
                const root = SPIRIT_ROOT_EFFECTS[option.value];
                if (!root) return;
                const counter = COUNTER_RELATIONS[option.value];
                const counterText = counter ? `克制${SPIRIT_ROOT_EFFECTS[counter].name}` : '无克制';
                const tag = ROOT_QUICK_TAG[option.value];
                option.textContent = `${root.name}【${tag}】- ${counterText}｜${describeEffects(root.effects).join('、')}`;
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
            return mult * (1 - 0.015 * getShenLevel('focus')) * (isFused() ? FUSION_BONUS.workSpeed : 1);   // 神识「专注」：耗时 -1.5%/级；合道：耗时 ×0.5
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

        // 四个工作技能的里程碑（Lv60 封顶，效果与旧曲线上 Lv10 / 20 / 30 相当）
        const WORK_SKILL_MILESTONES = [
            { level: 25, exp: 0.05, desc: '技能经验 +5%' },
            { level: 45, time: -0.03, desc: '全部配方耗时 -3%' },
            { level: 60, main: 0.03, desc: '全部配方产出翻倍/节省材料 +3%' },
            { level: 70, time: -0.03, main: 0.03, desc: '耗时 -3%、翻倍/节省 +3%（炼虚期）' },
            { level: 80, exp: 0.05, time: -0.03, main: 0.03, desc: '经验 +5%、耗时 -3%、翻倍/节省 +3%（大乘期）' }
        ];
        function milestonesOf(skillName) { return WORK_SKILLS.includes(skillName) ? WORK_SKILL_MILESTONES : SKILL_MILESTONES; }
        function getSkillMilestones(skillName) {
            const level = (gameState.skills[skillName] || {}).level || 1;
            const list = milestonesOf(skillName);
            return { reached: list.filter(m => level >= m.level), next: list.find(m => level < m.level) };
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
                showQuickCelebration(`🎓 ${name} 精通 Lv.${after}`);
            }
        }

        // 升到下一级所需经验：四个工作技能（炼丹 / 炼器 / 灵田 / 采矿）每 10 级对应一个大境界（Lv1–10 练气、11–20 筑基……51–60 合体），
        // 需 round(3.5 × level^2.05)，上限 Lv60；其余技能沿用 100 × level^1.8
        const WORK_SKILLS = ['alchemy', 'forging', 'farming', 'mining'];
        const WORK_SKILL_MAX_LEVEL = 80;   // v6.69 起：大乘期把 71-80 也纳入（采太乙精华 / 大乘丹 / 大乘装备）
        function skillExpNeeded(level, skillName = null) {
            if (WORK_SKILLS.includes(skillName)) return Math.round(3.5 * Math.pow(level, 2.05));
            return Math.round(100 * Math.pow(level, 1.8));
        }
        // 「同样的经验投入 = 同样的效果」：新等级折算成旧曲线上累计经验相同的等级（可带小数），等级效果公式沿用旧公式
        const WORK_EQUIV_LEVEL = (() => {
            const oldCum = [0, 0];   // oldCum[L] = 升到 Lv.L 累计所需经验（旧曲线）
            for (let l = 1; l < 80; l++) oldCum[l + 1] = oldCum[l] + Math.round(100 * Math.pow(l, 1.8));
            const table = [1, 1];
            let cum = 0;
            for (let L = 1; L <= WORK_SKILL_MAX_LEVEL; L++) {
                let o = 1;
                while (o < 79 && oldCum[o + 1] <= cum) o++;
                table[L] = o + (cum - oldCum[o]) / (oldCum[o + 1] - oldCum[o]);
                cum += Math.round(3.5 * Math.pow(L, 2.05));
            }
            return table;
        })();
        function workEquivLevel(level) { return WORK_EQUIV_LEVEL[Math.max(1, Math.min(WORK_SKILL_MAX_LEVEL, Math.floor(level)))]; }

        // 技能经验进度：当前经验、升级所需、还差多少、百分比
        function getSkillExpInfo(skillName) {
            const skill = gameState.skills[skillName];
            if (!skill) return null;
            const level = skill.level || 1;
            const exp = Math.floor(skill.exp || 0);
            const need = skillExpNeeded(level, skillName);
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
                        const tipM = milestonesOf(skillName).map(m => `${info.level >= m.level ? '✓' : '○'} Lv.${m.level}：${m.desc}`).join('&#10;');
                        return `<div class="skill-pool" title="${tipM}">🏅 技能里程碑 ${sm.reached.length}/${milestonesOf(skillName).length}${sm.next ? ` · 下一个 Lv.${sm.next.level}：${sm.next.desc}` : ' · 已全部达成'}</div>`;
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
            while (skill.exp >= skillExpNeeded(skill.level, skillName)) {
                if (WORK_SKILLS.includes(skillName) && skill.level >= WORK_SKILL_MAX_LEVEL) { skill.exp = 0; break; }   // 满级
                skill.exp -= skillExpNeeded(skill.level, skillName);
                skill.level++;
                const effect = calculateSkillLevelEffect(skillName, skill.level);
                showNotification(`${skill.name}升到${skill.level}级 ${effect}`, '#6f9c8a', 'normal');
                const ms = LIFE_SKILLS.includes(skillName) && milestonesOf(skillName).find(m => m.level === skill.level);
                if (ms) showNotification(`🏅 ${skill.name}达到 Lv.${ms.level} 里程碑：${ms.desc}`, '#b89a5b');
            }
        }

        // 本次打开游戏后每个配方完成的次数（纯前端展示用，不存档、刷新页面就清零）：
        // 给重复点击的核心循环加一层看得见的进度感，哪怕产出数值不变也有"我已经做了这么多"的反馈（正反馈诊断 C-4）
        const recipeSessionCounts = {};

        // 修炼修为产出改区间（v6.91）：原来一次修炼固定产出一个数，改成 ±20% 的随机区间，
        // 每次修炼实际拿到多少不再是可以精确预判的死数字。只影响「修炼」技能自己的配方（output.cultivation），
        // 不影响战斗掉落等其它产出——那些走各自独立的随机逻辑，不复用这个区间。
        const CULTIVATION_VARIANCE = 0.2;
        function cultivationRange(base) {
            if (!base) return { lo: 0, hi: 0 };
            const lo = Math.max(1, Math.round(base * (1 - CULTIVATION_VARIANCE)));
            const hi = Math.max(lo, Math.round(base * (1 + CULTIVATION_VARIANCE)));
            return { lo, hi };
        }
        function rollCultivation(base) {
            const { lo, hi } = cultivationRange(base);
            return lo + Math.floor(Math.random() * (hi - lo + 1));
        }

        // 极速行动（如礼包饰品 ×100 速度）：连续完成时静音通知，界面每 0.4 秒刷新一次、存档每 5 秒一次
        const FAST_ACTION_SECONDS = 0.5;
        let notifyMuted = false, fastUiTs = 0, fastSaveTs = 0;
        function flushFastUI() {
            const now = Date.now();
            if (now - fastUiTs > 400) { fastUiTs = now; updateUI(); }
            if (now - fastSaveTs > 5000) { fastSaveTs = now; saveGame(); }
        }

        function completeAction(act = gameState.currentAction, bonus = {}) {
            const action = getAction(act.skill, act.action);
            if (!action.output) return;

            // 仙窍已经打满（24）时「开辟仙窍」直接停止，不再消耗太乙精华——真仙后期已经是当前实现的上限
            if (action.output.xianqiao && getXianqiao() >= XIAN_ORIFICE_MAX) {
                showNotification('☯️ 仙窍已全部打通', '#c98a3e');
                gameState.currentAction = null;
                gameState.currentActionProgress = 0;
                return;
            }
            // 洗髓易经是一次性的，已经做过就不再重复消耗清灵草
            if (action.output.marrowCleanse && gameState.player.marrowCleansed) {
                showNotification('🩸 已完成洗髓易经', '#c98a3e');
                gameState.currentAction = null;
                gameState.currentActionProgress = 0;
                return;
            }

            // 丹火助炼：炼丹时消耗丹火，提高翻倍产出概率（丹火不够时自动不助炼）
            let boostDouble = 0;
            if (act.skill === 'alchemy' && gameState.player.alchemyBoost) {
                const cost = boostCost(action);
                if ((gameState.player.danhuo || 0) >= cost) {
                    gameState.player.danhuo -= cost;
                    boostDouble = DANHUO_BOOST_DOUBLE;
                }
            }

            // 消耗所需的材料（P2功能 - 材料消耗）；灵根/功法的「节省材料」特效有概率整次不消耗
            const actionKey = act.action;
            const mastery = getMasteryBonus(act.skill, actionKey);
            const saveMaterials = action.requires && Math.random() < getSkillMod('save', act.skill) + mastery.save;
            if (saveMaterials) showNotification('✨ 材料节省：本次未消耗材料', '#6fa980', 'rare');
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

            // 修炼修为产出改区间：等级加成算完之后再在这个数上下浮动 ±20%，不影响其它技能的产出
            if (act.skill === 'cultivation' && finalOutput.cultivation) {
                finalOutput.cultivation = rollCultivation(finalOutput.cultivation);
            }

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
            if (finalOutput.items && finalOutput.items.length && Math.random() < getSkillMod('double', act.skill) + mastery.double + boostDouble + (bonus.double || 0)) {
                finalOutput.items.forEach(item => { item.qty *= 2; });
                showNotification('✨ 产出翻倍！', '#6fa980', 'rare');
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
            if (finalOutput.danhuo || finalOutput.shenshi || finalOutput.daoguo) addCurrency(finalOutput);
            if (finalOutput.xianqiao) {
                gameState.player.xianqiao = Math.min(XIAN_ORIFICE_MAX, (gameState.player.xianqiao || 0) + finalOutput.xianqiao);
                showNotification(`☯️ 打通一窍：仙窍 ${gameState.player.xianqiao}/${XIAN_ORIFICE_MAX}`, '#b39ddb');
                calculateStats();   // 仙窍数变了，五衰惩罚要立刻重算
            }
            if (finalOutput.marrowCleanse) {
                gameState.player.marrowCleansed = true;
                showNotification('🩸 洗髓易经完成，凡人体质脱胎换骨——突破筑基还需筑基丹', '#b39ddb');
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

            trackQuest('act:' + act.skill + '.' + actionKey);
            const __countKey = act.skill + ':' + actionKey;
            recipeSessionCounts[__countKey] = (recipeSessionCounts[__countKey] || 0) + 1;
            if (bonus.batch) return;   // 极速行动（耗时 < 0.5 秒）：由调用方节流刷新界面 / 存档，否则每秒几十次全界面重绘会卡死页面
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
        // mode='commit'（默认，真正产出时用）：采矿等 qty=1 基础产出的加成会持久化到 gameState.player.qtyCarry
        //   里累积小数进度，攒够 1 才多产 1 个，不然 Math.floor(1×multiplier) 在等级上限内 multiplier 长期 <2
        //   会永远向下取整回原值，等级加成形同虚设（这是 v6.80 发现的真实 bug：采矿说明写「Lv60≈+51%」，实测完全不生效）
        // mode='peek'（配方卡片展示用）：读当前余量算「这次会拿到几个」但不消耗余量，不然打开面板刷新卡片就把余量吃掉
        // mode='raw'（离线 / 分身批量结算用）：不取整，倍率原样乘成小数，交给外层按 completions 批量取整——
        //   大量完成次数汇总后一次性取整，精度足够，且不会跟 commit 模式的持久余量打架
        function applySkillLevelBonus(skillName, output, mode = 'commit') {
            // 丹火 / 神识产出：技能每级 +2%
            if ((skillName === 'danhuo' || skillName === 'shenshi' || skillName === 'daoguo') && (output.danhuo || output.shenshi || output.daoguo)) {
                const m = 1 + ((gameState.skills[skillName] || {}).level - 1 || 0) * 0.02;
                const outMod = 1 + getSkillMod('out', skillName);   // 技能商店设施：丹火 / 神识产出 +x%
                if (output.danhuo) output.danhuo = Math.floor(output.danhuo * m * outMod);
                if (output.shenshi) output.shenshi = Math.floor(output.shenshi * m * outMod);
                if (output.daoguo) output.daoguo = Math.floor(output.daoguo * m * outMod);
                return;
            }
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
                // 产量加成：折算等级（workEquivLevel）每 5 级 +1，直接复用上面已经算好的 multiplier，
                // 不要在这里重新用未折算的 skill.level 算一遍——v6.63 工作技能等级重排后两套等级尺度不一样，
                // 重新算会把「不该加成的等级」也算出好几个额外产出（这个 bug 曾经把 Lv11 炼丹算出 bonusQty=2）
                const bonusQty = multiplier - 1;
                if (bonusQty > 0) {
                    output.items.forEach(item => {
                        item.qty += bonusQty;
                    });
                }
            } else if (effect.effectType === 'output' && output.items) {
                // 采矿等输出加成：见函数顶部注释，qty=1 的基础产出必须走累积余量才能真正生效
                if (mode === 'raw') {
                    output.items.forEach(item => { item.qty = item.qty * multiplier; });
                } else {
                    const P = gameState.player;
                    const carryMap = P.qtyCarry || {};
                    output.items.forEach(item => {
                        const key = skillName + ':' + item.id;
                        const bonusExact = item.qty * (multiplier - 1) + (carryMap[key] || 0);
                        const bonusWhole = Math.floor(bonusExact + 1e-9);
                        if (mode === 'commit') {
                            if (!P.qtyCarry) P.qtyCarry = {};
                            P.qtyCarry[key] = bonusExact - bonusWhole;
                        }
                        item.qty += bonusWhole;
                    });
                }
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
            if (['cultivation', 'alchemy', 'forging', 'farming', 'mining', 'battle', 'danhuo', 'shenshi', 'daoguo', 'wudao'].includes(panelName)) {
                updateSkillTree(panelName);
            }

            // 生成配方/技能列表
            if (['cultivation', 'alchemy', 'forging', 'farming', 'mining', 'danhuo', 'shenshi', 'daoguo'].includes(panelName)) {
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
            renderFxReplay();
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
            if (realmIdx >= 25) skills.push('daoguo');
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

        // 左侧技能树：分三组（核心 / 生活技能 / 进阶），每项一行：图标 + 名称 + 等级，下面一条细经验条
        const SKILL_GROUPS = [['cultivation', 'battle'], ['alchemy', 'forging', 'farming', 'mining'], ['danhuo', 'shenshi', 'daoguo', 'wudao']];
        function buildSkillTree() {
            renderMobileSkillBar();
            const tree = document.getElementById('skillTree');
            if (!tree) return;
            tree.innerHTML = '';
            const visible = new Set(getVisibleSkills());
            const activePanel = document.body.dataset.panel;
            let placed = 0;

            SKILL_GROUPS.forEach(group => {
                const names = group.filter(n => visible.has(n) && gameState.skills[n]);
                if (!names.length) return;
                if (placed > 0) {
                    const sep = document.createElement('div');
                    sep.className = 'skill-sep';
                    tree.appendChild(sep);
                }
                names.forEach(skillName => {
                    const skill = gameState.skills[skillName];
                    const item = document.createElement('div');
                    item.className = 'skill-item' + (skillName === activePanel ? ' active' : '');
                    item.id = 'skill-' + skillName;
                    item.setAttribute('role', 'button');
                    item.tabIndex = 0;
                    item.onclick = () => switchPanel(skillName);

                    const info = getSkillExpInfo(skillName);
                    item.title = `${skill.name} Lv.${info.level}：经验 ${info.exp} / ${info.need}，还差 ${info.remain} 升级`;
                    item.innerHTML = `
                        <div class="skill-name">${skill.icon} ${skill.name}</div>
                        <div class="skill-level">Lv.${info.level}</div>
                        <div class="skill-bar"><i style="width:${Math.min(100, Math.max(0, info.percent))}%"></i></div>`;
                    tree.appendChild(item);
                    placed++;
                });
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
         * skillName 传入时按技能等级加成（+ 丹火/神识/道果的设施「产出+x%」）折算成玩家实际会拿到的数量，
         * 不然配方卡片永远显示 GAME_CONFIG 里的原始基础值——等级越高，卡片写的和实际炼出来的差得越多
         * （翻倍/节省材料这类每次随机的效果仍不算进卡片的固定数字里，跟游戏内其它随机效果的展示方式一致，
         * 只在触发时弹 toast）
         */
        function formatRecipeOutput(output, skillName) {
            if (skillName) {
                output = JSON.parse(JSON.stringify(output));
                applySkillLevelBonus(skillName, output, 'peek');
            }
            const parts = [];

            if (output.cultivation) {
                if (skillName === 'cultivation') {
                    const { lo, hi } = cultivationRange(output.cultivation);
                    parts.push(lo === hi ? `${QI_ICON} +${lo}修为` : `${QI_ICON} +${lo}~${hi}修为`);
                } else {
                    parts.push(`${QI_ICON} +${output.cultivation}修为`);
                }
            }
            if (output.coins) {
                parts.push(`${COIN_ICON} +${output.coins}`);
            }
            if (output.danhuo) {
                parts.push(`${DANHUO_ICON} +${output.danhuo}丹火`);
            }
            if (output.shenshi) {
                parts.push(`${SHENSHI_ICON} +${output.shenshi}神识`);
            }
            if (output.daoguo) {
                parts.push(`${DAOGUO_ICON} +${output.daoguo}道果`);
            }
            if (output.xianqiao) {
                parts.push(`☯️ +${output.xianqiao}窍（当前 ${getXianqiao()}/${XIAN_ORIFICE_MAX}）`);
            }
            if (output.marrowCleanse) {
                parts.push(gameState.player.marrowCleansed ? '🩸 已完成（一次性）' : '🩸 洗髓易经（一次性）');
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
        // 配方卡片正中的大图：产出物品的图标；产出灵石 / 修为时用通用符号
        function recipeArtIcon(recipe) {
            const out = recipe.output || {};
            const first = (out.items || []).map(i => GAME_CONFIG.items[i.id]).find(Boolean);
            if (first) return first.icon;
            if (out.cultivation) return QI_ICON;
            if (out.coins) return COIN_ICON;
            if (out.danhuo) return DANHUO_ICON;
            if (out.shenshi) return SHENSHI_ICON;
            if (out.daoguo) return DAOGUO_ICON;
            return '✨';
        }

        function renderRecipeCard(skillName, recipeKey, recipe) {
            const card = document.createElement('div');
            const isActive = gameState.currentAction &&
                            gameState.currentAction.skill === skillName &&
                            gameState.currentAction.action === recipeKey;

            // 1. 判断解锁状态
            const unlockState = getRecipeUnlockState(skillName, recipe);

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
            if (isQuestTarget(skillName, recipeKey)) className += ' quest-target';
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
            // 要求全文放在卡片悬停提示里（未解锁时锁定提示已说明，不再单独占一行）
            const reqText = unlockState.reason === 'realm' || skillName === 'cultivation'
                ? `境界要求：${getRealmName(unlockState.requiredValue)}`
                : `等级要求：Lv.${unlockState.requiredValue}`;

            const outputStr = formatRecipeOutput(recipe.output || {}, skillName);
            // 产出是装备时直接显示属性，方便对比
            const outEquip = ((recipe.output && recipe.output.items) || []).find(i => isEquipmentItem(i.id));
            const equipStatsHtml = outEquip
                ? `<div class="recipe-equip-stats" title="${GAME_CONFIG.items[outEquip.id].name}">${GAME_CONFIG.items[outEquip.id].icon} ${formatItemStats(outEquip.id)}</div>` : '';

            // 配方精通（生活技能）：等级、进度条，悬停显示具体加成
            let masteryHtml = '';
            if (LIFE_SKILLS.includes(skillName) && unlockState.unlocked) {
                const m = getMasteryInfo(skillName, recipeKey);
                masteryHtml = `<div class="recipe-mastery rc-mastery" title="${describeMastery(skillName, recipeKey)}">
                    <span class="rc-mlv" title="精通等级">🎓<b>${m.level}</b></span>
                    <div class="mastery-track"><div class="mastery-fill" style="width: ${m.maxed ? 100 : m.percent}%"></div></div>
                    <span class="rc-mtxt">${m.maxed ? '✦满级' : `${m.exp}/${m.need}`}</span>
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

            // 本次打开游戏后这个配方完成过几次：纯展示、不存档，给重复点击加一层看得见的进度感（正反馈诊断 C-4）
            const sessionCount = recipeSessionCounts[skillName + ':' + recipeKey] || 0;
            const sessionCountHtml = sessionCount > 0 ? `<div class="recipe-session-count" title="本次打开游戏后完成次数，刷新页面清零">本次×${sessionCount}</div>` : '';

            // 布局（自上而下）：名称 → 耗时 / 效率 → 产出大图 → 产出与消耗 → 进度条 → 精通条 → 分身按钮
            // 不再单独显示「✓ 要求」一行：未解锁时由锁定提示说明，要求全文放在卡片悬停提示里
            card.innerHTML = `
                ${sessionCountHtml}
                <div class="recipe-name rc-name">${recipe.name}</div>
                <div class="recipe-time rc-meta">⏱ ${timeText}</div>
                <div class="rc-art${unlockState.unlocked ? '' : ' locked'}">${unlockState.unlocked ? recipeArtIcon(recipe) : '🔒'}</div>
                <div class="recipe-output">${outputStr}</div>
                ${equipStatsHtml}
                ${materialsHtml}
                ${lockHintHtml}
                <div class="action-progress-bar ${isActive ? 'active' : ''}">
                    <div class="action-progress-fill" style="width: 0%"></div>
                </div>
                ${masteryHtml}
                ${cloneHtml}
            `;
            card.title = reqText;

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

            // 按解锁等级/境界从低到高排序，不再是 GAME_CONFIG 里写的原始顺序——配方是分多个版本陆续加的，
            // 新配方大多直接追加在对象末尾，写入顺序跟需要的等级早就对不上了（用户反馈：很多配方顺序不是按等级来的）
            const sortedEntries = Object.entries(skill.recipes).sort(([, a], [, b]) =>
                getRecipeUnlockState(skillName, a).requiredValue - getRecipeUnlockState(skillName, b).requiredValue);

            sortedEntries.forEach(([key, recipe]) => {
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

        // 战斗区域掉落的卡片文字：名称×数量（概率，含精通加成）
        function areaDropText(areaKey, bonus) {
            const list = BATTLE_DROPS[areaKey] || [];
            if (!list.length) return '无';
            return list.map(d => {
                const cfg = GAME_CONFIG.items[d.id] || {};
                return `${cfg.icon || ''}${cfg.name || d.id}×${dropQtyText(d.qty)}（${Math.round(Math.min(1, d.p * bonus) * 1000) / 10}%）`;
            }).join('、');
        }

        // 战斗区域奖励说明：每场灵石 / 经验（含该区域精通加成）与可能掉落的物品
        function areaRewardHtml(areaKey, action) {
            const a = action.areaData;
            const bonus = 1 + getMasteryBonus('battle', areaKey).reward;
            const enemies = (BATTLE_ENEMY_CONFIGS[areaKey] || []).map(e => `${e.icon || ''}${e.name}`).join('、');
            return `<div class="area-reward">
                    <div>敌人：${enemies || '—'}</div>
                    <div>每场奖励：${COIN_ICON} ${Math.round(a.coins * bonus)} 灵石 · ${Math.round(a.exp * bonus)} 战斗经验${areaCurrencyText(areaKey, bonus) ? ' · ' + areaCurrencyText(areaKey, bonus) : ''}${bonus > 1 ? '（含精通加成）' : ''}</div>
                    <div class="area-drops">可能掉落：${areaDropText(areaKey, bonus)}</div>
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
            const cur = [['danhuo', DANHUO_ICON, '丹火'], ['shenshi', SHENSHI_ICON, '神识'], ['daoguo', DAOGUO_ICON, '道果']].filter(([k]) => r[k]).map(([k, icon, label]) => ` · ${icon} ${qty(r[k])} ${label}`).join('');
            return `<div class="area-reward">
                    <div class="area-drops">通关掉落：${list.length ? list.join('、') : '无物品'}</div>
                    <div>另有：${coins}${cur}${r.skillExp ? ' · ' + r.skillExp + ' 战斗经验' : ''}（每只怪物还会掉灵石）</div>
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
            // 点击「当前正在做的这个配方」＝停止，不是重新开始——之前点哪个配方卡片都会先 stopAction()
            // 再立刻开始同一个配方，等于白点；现在再点一次正在进行的配方直接停下来
            if (gameState.currentAction && gameState.currentAction.skill === skill && gameState.currentAction.action === action) {
                stopAction();
                return;
            }

            // 凡人无法参与战斗
            if (gameState.player.realmIndex === 0 && skill === 'battle') {
                showNotification('凡人无法参与战斗，请先突破到练气一层', '#c98a3e', 'warning');
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
                maybeSelectDomainThenEnter(() => enterBattleArea(action));
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
                syncBattleMode();
                clearActiveDomain();
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

        function addToInventory(itemId, qty = 1, silent = false) {
            // 检查背包容量
            const inventoryCount = gameState.player.inventory.length;
            const maxCapacity = gameState.player.inventoryCapacity || 50;
            const itemName = GAME_CONFIG.items[itemId]?.name || itemId;

            const existing = gameState.player.inventory.find(i => i.id === itemId);
            if (existing) {
                existing.qty += qty;
                // 检查是否接近满载
                if (!silent && inventoryCount >= maxCapacity * 0.9) {
                    showNotification(`⚠️ 背包即将满满！(${inventoryCount}/${maxCapacity}) 建议购买背包扩展`, '#c98a3e', 'warning');
                }
            } else {
                // 检查是否有空间添加新物品
                if (inventoryCount >= maxCapacity) {
                    if (!silent) showNotification(`❌ 背包已满无法获取 ${itemName}！请扩展背包容量`, '#c4483a', 'error');
                    return false; // 返回false表示失败
                }
                gameState.player.inventory.push({ id: itemId, qty });
                // 检查是否接近满载
                if (!silent && inventoryCount + 1 >= maxCapacity * 0.8) {
                    showNotification(`⚠️ 背包容量即将满满！(${inventoryCount + 1}/${maxCapacity})`, '#c98a3e', 'warning');
                }
            }
            return true; // 返回true表示成功
        }

        // 背包快满提示角标（v6.76）：容量占用≥90%时常驻显示在导航「背包」按钮上，
        // 跟 addToInventory 里那次性的 toast 通知不同——挂机/托管时很容易错过 toast，
        // 常驻角标能让玩家下次瞄一眼界面就发现，而不是等东西已经悄悄丢了才后知后觉
        function updateInventoryBadge() {
            const P = gameState.player;
            const cap = P.inventoryCapacity || 50;
            const full = P.inventory.length / cap >= 0.9;
            const desktop = document.getElementById('invBadgeDesktop');
            const mobile = document.getElementById('invBadgeMobile');
            if (desktop) desktop.hidden = !full;
            if (mobile) mobile.hidden = !full;
        }

        // ==================== 物品交互系统（P1功能）====================
        function showItemDetail(itemId, qty) {
            const itemConfig = GAME_CONFIG.items[itemId];
            if (!itemConfig) return;

            // 填充物品信息
            document.getElementById('itemIcon').innerHTML = itemConfig.icon;
            document.getElementById('itemName').textContent = itemConfig.name;
            document.getElementById('itemType').textContent = ITEM_TYPE_NAMES[itemConfig.type] || itemConfig.type;
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
                danhuo_seed: '丹火种子：在丹火技能「培育丹火」里使用，一次得到 25 丹火',
                shenshi_seed: '神识种子：在神识技能「培育神识」里使用，一次得到 20 神识'
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
                usages.push('此物品不可出售');
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
            trackQuest('sell');
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
        const EQUIP_TYPES = ['weapon', 'armor', 'jewelry', 'daoze'];
        const EQUIP_TYPE_NAMES = { weapon: '武器', armor: '护甲', jewelry: '饰品', daoze: '道则' };
        const ARRAY_EQUIP_TYPES = ['jewelry', 'daoze'];   // 这两类是「多槽位数组」，不是单槽位替换

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
            if (cfg.type === 'daoze' && cfg.effect) parts.push(...describeEffects(cfg.effect));   // 道则：直接用标准特效词汇描述
            else if (cfg.effect && cfg.effect.cultSpeed) parts.push(`修炼速度 +${Math.round(cfg.effect.cultSpeed * 100)}%`);
            return parts.join(' · ');
        }

        function getJewelrySlots() {
            return 1 + ((gameState.player.boughtUpgrades || []).includes('jewelry_slot2') ? 1 : 0);
        }
        // 道基槽位：炼虚初期起 1 个，商城可买到第 2、3 个
        function getDaozeSlots() {
            if (!isVoidUnlocked()) return 0;
            const owned = gameState.player.boughtUpgrades || [];
            return 1 + (owned.includes('daoze_slot2') ? 1 : 0) + (owned.includes('daoze_slot3') ? 1 : 0);
        }
        function daozeLawOf(itemId) { return (GAME_CONFIG.items[itemId] || {}).daozeLaw || null; }

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
            if (ARRAY_EQUIP_TYPES.includes(cfg.type)) {
                const arr = eq[cfg.type] || (eq[cfg.type] = []);
                const slots = cfg.type === 'jewelry' ? getJewelrySlots() : getDaozeSlots();
                if (arr.includes(itemId)) { showNotification(`已经佩戴同名${EQUIP_TYPE_NAMES[cfg.type]}，不能重复`, '#c98a3e'); return false; }
                if (cfg.type === 'daoze' && arr.some(id => daozeLawOf(id) === cfg.daozeLaw)) {
                    showNotification('已经镶嵌同一法则的道则，请先取下', '#c98a3e');
                    return false;
                }
                if (arr.length >= slots) {
                    showNotification(`${EQUIP_TYPE_NAMES[cfg.type]}栏位已满，请先卸下一件`, '#c98a3e');
                    return false;
                }
                consumeItem(itemId, 1);
                arr.push(itemId);
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
            if (ARRAY_EQUIP_TYPES.includes(kind) ? !(eq[kind] || []).includes(itemId) : eq[kind] !== itemId) return false;
            if (!addToInventory(itemId, 1)) return false;
            if (ARRAY_EQUIP_TYPES.includes(kind)) eq[kind] = eq[kind].filter(id => id !== itemId);
            else eq[kind] = null;
            showNotification(`已卸下${cfg.name}`, '#6f9c8a');
            equipAfterChange();
            return true;
        }

        // 换上 candidate 相对当前同槽装备的属性变化（武器 / 护甲），返回带颜色的 HTML；饰品直接显示属性
        function describeEquipDiff(itemId) {
            const cfg = GAME_CONFIG.items[itemId];
            const eq = gameState.player.equipment;
            if (ARRAY_EQUIP_TYPES.includes(cfg.type)) return '';
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
                    <div class="equip-slot-stats">${formatItemStats(itemId) || '无属性'}${getTemper(kind) ? `<br/>淬炼 Lv.${getTemper(kind)}（+${Math.round(getTemper(kind) * TEMPER_PER_LEVEL * 100)}%）` : ''}</div>
                    <button class="btn btn-secondary equip-btn" onclick="unequipItem('${kind}', '${itemId}')">卸下</button></div>`;
            };
            let slots = slotCard('weapon', eq.weapon, '⚔️ 武器') + slotCard('armor', eq.armor, '🛡️ 护甲');
            const jSlots = getJewelrySlots();
            for (let i = 0; i < jSlots; i++) slots += slotCard('jewelry', (eq.jewelry || [])[i], `📿 饰品${jSlots > 1 ? i + 1 : ''}`);
            if (jSlots < 2) {
                const canBuy = gameState.player.realmIndex >= 18;   // v6.89：原索引9 → +9
                slots += `<div class="equip-slot locked"><div class="equip-slot-label">📿 饰品2</div>
                    <div class="equip-slot-empty">🔒 第二饰品栏位</div>
                    <div class="equip-slot-stats">${canBuy ? '可在商城购买（8000灵石）' : '金丹初期后可在商城购买'}</div>
                    ${canBuy ? `<button class="btn btn-secondary equip-btn" onclick="switchPanel('shop')">去商城</button>` : ''}</div>`;
            }
            // 道基槽（炼虚初期起）：只能镶嵌道则，同一法则的道则不能重复镶嵌
            if (isVoidUnlocked()) {
                const dSlots = getDaozeSlots();
                for (let i = 0; i < dSlots; i++) slots += slotCard('daoze', (eq.daoze || [])[i], `☯️ 道基${dSlots > 1 ? i + 1 : ''}`);
                if (dSlots < 3) {
                    const nextId = dSlots < 1 ? null : (dSlots === 1 ? 'daoze_slot2' : 'daoze_slot3');
                    slots += `<div class="equip-slot locked"><div class="equip-slot-label">☯️ 道基${dSlots + 1}</div>
                        <div class="equip-slot-empty">🔒 第${dSlots + 1}个道基槽位</div>
                        <div class="equip-slot-stats">${nextId ? '可在商城购买' : '炼虚初期后自动解锁第一个'}</div>
                        ${nextId ? `<button class="btn btn-secondary equip-btn" onclick="switchPanel('shop')">去商城</button>` : ''}</div>`;
                }
            }
            const temperText = TEMPER_SLOTS.map(t => `${t.name}+${Math.round(getTemper(t.key) * TEMPER_PER_LEVEL * 100)}%`).join(' ');
            const forgeBonus = parseFloat(((SKILL_LEVEL_EFFECTS.forging.formula((gameState.skills.forging || {}).level || 1) - 1) * 100).toFixed(1));
            const summary = `<div class="equip-summary">
                <span>❤️ 生命 ${stats.hp.max}</span><span>⚔️ 攻击 ${stats.atk}</span><span>🛡️ 防御 ${stats.def}</span><span>💨 速度 ${stats.spd}</span>
                <div class="equip-summary-sub">装备加成：淬炼 ${temperText}${isDanhuoUnlocked() ? '（在丹火页淬炼台升级）' : '（金丹后解锁丹火淬炼）'}${forgeBonus > 0 ? ` · 炼器等级（装备属性 +${forgeBonus}%）` : ''}</div></div>`;
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
            box.innerHTML = `<div class="equip-slots">${slots}</div>${summary}${bag || '<div class="equip-empty-hint">背包里没有可更换的装备（可以在炼器里打造）</div>'}`;
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
            if (cfg.type === 'daoze') return (eq.daoze || []).includes(itemId);
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

            // 装备与背包分开：从背包装备（旧的自动回背包）；卸下在「装备」界面进行
            equipFromBag(itemId);
            closeItemDetail();
        }

        // v6.89：练气改13层，minLevel/maxLevel（含义其实是 realmIndex）除 forest 的 1 不变外整体按迁移表调整
        function initializeBattleActions() {
            const battleAreas = {
                forest: { name: '森林', desc: '野兽出没', minLevel: 1, maxLevel: 5, enemies: ['wolf', 'boar'], coins: 50, exp: 20 },
                mountain: { name: '十万大山外围', desc: '危险地带', minLevel: 9, maxLevel: 13, enemies: ['tiger', 'bear'], coins: 100, exp: 50 },
                deepMountain: { name: '十万大山核心', desc: '极度危险', minLevel: 14, maxLevel: 15, enemies: ['demon', 'spirit'], coins: 200, exp: 100 },
                swamp: { name: '妖兽沼泽', desc: '诡异危险', minLevel: 14, maxLevel: 15, enemies: ['poisonBeast', 'serpent'], coins: 180, exp: 90 },
                abyss: { name: '魔窟深渊', desc: '极端危险', minLevel: 16, maxLevel: 17, enemies: ['demon-lord', 'abyssal'], coins: 300, exp: 150 },
                // P6 金丹期新增
                goldenPlains: { name: '金丹平原', desc: '金丹修士的猎场', minLevel: 18, maxLevel: 19, enemies: ['golden-beast', 'spirit-wolf'], coins: 500, exp: 200 },
                tribulationGround: { name: '天劫之地', desc: '雷劫试炼', minLevel: 19, maxLevel: 20, enemies: ['thunder-demon', 'tribulation-spirit'], coins: 800, exp: 350 },
                // P7 元婴期新增
                voidSea: { name: '虚空之海', desc: '元婴修士的试炼场', minLevel: 22, maxLevel: 23, enemies: ['void-creature', 'soul-devourer'], coins: 1000, exp: 400 },
                abyssRuins: { name: '深渊遗迹', desc: '极端危险的废墟', minLevel: 24, maxLevel: 25, enemies: ['abyss-lord', 'ancient-god'], coins: 2000, exp: 800 },
                // P9 化神期新增
                chaosWastes: { name: '混沌荒原', desc: '化神修士的试炼场', minLevel: 26, maxLevel: 27, enemies: ['chaos-beast', 'void-walker'], coins: 4000, exp: 1600 },
                nineNether: { name: '九幽冥渊', desc: '幽冥深处的绝地', minLevel: 28, maxLevel: 29, enemies: ['nether-lord', 'ghost-emperor'], coins: 8000, exp: 3200 },
                // P10 合体期新增
                daoWastes: { name: '道痕荒原', desc: '大道崩落之地', minLevel: 34, maxLevel: 35, enemies: ['dao-shade', 'law-puppet'], coins: 64000, exp: 25600 },
                fusionVoid: { name: '合一虚境', desc: '万法归一的尽头', minLevel: 36, maxLevel: 37, enemies: ['void-beast', 'fusion-lord'], coins: 128000, exp: 51200 },
                voidAbyss: { name: '虚渊', desc: '虚实交界的深渊', minLevel: 30, maxLevel: 31, enemies: ['void-beast', 'huaxu-demon'], coins: 16000, exp: 6400 },
                huashiRealm: { name: '化实之界', desc: '道则具现之地', minLevel: 32, maxLevel: 33, enemies: ['shidao-walker', 'taixu-lord'], coins: 32000, exp: 12800 },
                taiyiField: { name: '太虚战场', desc: '灵界各族交锋之地', minLevel: 38, maxLevel: 39, enemies: ['taiyi-warrior', 'lingjie-guard'], coins: 260000, exp: 102400 },
                lingjieAbyss: { name: '灵界绝境', desc: '大乘期最险恶的死地', minLevel: 40, maxLevel: 41, enemies: ['lingjie-fiend', 'daozu-shadow'], coins: 520000, exp: 204800 },
                // 真仙境新增（v6.88）：延续大乘期每级约 2x 的奖励增速，未做真实引擎胜率标定，先按曲线外推，后续可再调
                xianbattle: { name: '九霄战场', desc: '真仙修士交锋的九霄之上', minLevel: 42, maxLevel: 43, enemies: ['xian-beast', 'void-immortal'], coins: 1040000, exp: 409600 }
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

            const dungeonIds = Object.keys(GAME_CONFIG.dungeons).filter(id => !GAME_CONFIG.dungeons[id].isTribulation);   // 天劫不进普通秘境列表，只能从突破弹窗的「渡劫」进入

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
                    <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="maybeSelectDomainThenEnter(() => enterDungeon('${dungeonId}'))">
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
                ],
                daoWastes: [
                    { name: '道影行者', hp: 13500, atk: 660, def: 195, spd: 60, icon: '👤' },
                    { name: '法则傀儡', hp: 15800, atk: 710, def: 210, spd: 70, icon: '🤖' }
                ],
                fusionVoid: [
                    { name: '归墟古兽', hp: 19500, atk: 860, def: 235, spd: 65, icon: '🐉' },
                    { name: '合一魔尊', hp: 21500, atk: 920, def: 255, spd: 75, icon: '😈' }
                ],
                voidAbyss: [
                    { name: '虚渊兽', hp: 7000, atk: 420, def: 130, spd: 60, icon: '🐉' },
                    { name: '化虚魔', hp: 8200, atk: 450, def: 150, spd: 50, icon: '😈' }
                ],
                huashiRealm: [
                    { name: '实道行者', hp: 10500, atk: 520, def: 170, spd: 55, icon: '👤' },
                    { name: '太虚尊者', hp: 9800, atk: 560, def: 160, spd: 65, icon: '😈' }
                ],
                taiyiField: [
                    { name: '太乙战修', hp: 34000, atk: 1350, def: 420, spd: 100, icon: '👤' },
                    { name: '灵界守卫', hp: 39500, atk: 1450, def: 470, spd: 90, icon: '🤖' }
                ],
                lingjieAbyss: [
                    { name: '灵界凶兽', hp: 50000, atk: 1750, def: 540, spd: 105, icon: '🐉' },
                    { name: '道祖之影', hp: 46000, atk: 1900, def: 500, spd: 115, icon: '😈' }
                ],
                // 注意：普通战斗区域的原始数值会被 P4_AREA_SCALE.xianbattle（hp×0.025、atk×0.235）折算成实际生效值，
                // 下面这两个是「折算前」的原始数值，实际生效约 hp 2450~2650、atk 940~1010（比灵界绝境的
                // 实际生效值 hp≈1509~1640、atk≈581~631 高约 1.6 倍，延续奖励曲线的增速），没有跑模拟标定
                xianbattle: [
                    { name: '九霄仙兽', hp: 100000, atk: 4000, def: 620, spd: 120, icon: '🐲' },
                    { name: '虚境仙魔', hp: 106000, atk: 4260, def: 580, spd: 130, icon: '👹' }
                ]
            };

        // ==================== 美术：怪物与功法图标（手绘矢量，同物品图标的画法） ====================
        // 怪物按名字对应（战斗区域敌人与秘境怪物都用这张表）；功法按功法 id 对应。没有图标的仍用 emoji。
        const MONSTER_ICONS = (() => {
            const svg = icoSvg, sparkle = icoSparkle, leaf = icoLeaf;
            const eye = (x, y, c, rx = 1.9, ry = 1.3) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" stroke="none"/>`;
            const glowEyes = (y, c, dx = 4.5) => eye(16 - dx, y, c) + eye(16 + dx, y, c);
            const fangs = (y, w = 3) => `<path d="M${16 - w} ${y}L${16 - w + 0.7} ${y + 2.6}L${16 - w + 1.5} ${y}M${16 + w - 1.5} ${y}L${16 + w - 0.7} ${y + 2.6}L${16 + w} ${y}" fill="#fff" stroke-width=".7"/>`;

            // —— 兽类 ——
            const wolf = (c, d, e) => `<path d="M5 3L11 10H21L27 3L28 16Q28 26 16 29Q4 26 4 16Z" fill="${c}"/><path d="M7 7L10 10L8 12ZM25 7L22 10L24 12Z" fill="${d}" stroke="none"/><path d="M11 19Q16 17 21 19L19 25Q16 27 13 25Z" fill="${d}"/><circle cx="16" cy="20.5" r="1.5" fill="#2b2016" stroke="none"/><path d="M8.5 14L14 16L9.5 17.5ZM23.5 14L18 16L22.5 17.5Z" fill="${e}" stroke="none"/>${fangs(24.5, 2.4)}`;
            const boar = c => `<path d="M4 9L10 6L11 11M28 9L22 6L21 11" fill="${c}"/><ellipse cx="16" cy="17" rx="12" ry="11" fill="${c}"/><ellipse cx="16" cy="21.5" rx="6.5" ry="4.6" fill="#d9a88a"/><circle cx="14" cy="21.5" r="1" fill="#4a2a20" stroke="none"/><circle cx="18" cy="21.5" r="1" fill="#4a2a20" stroke="none"/><path d="M9 23Q5 22 5.5 17Q9 19 11.5 23ZM23 23Q27 22 26.5 17Q23 19 20.5 23Z" fill="#f6f0dc"/>${eye(11, 14, '#ff5a3a', 1.5, 1.1)}${eye(21, 14, '#ff5a3a', 1.5, 1.1)}`;
            const tiger = () => `<circle cx="7" cy="8" r="3.6" fill="#e8963a"/><circle cx="25" cy="8" r="3.6" fill="#e8963a"/><path d="M3 17Q3 6 16 6Q29 6 29 17Q29 27 16 29Q3 27 3 17Z" fill="#e8963a"/><path d="M13.5 6L16 12L18.5 6M4 15L9 16M4 20L9 19M28 15L23 16M28 20L23 19" stroke="#3a2418" stroke-width="1.6"/><ellipse cx="16" cy="22" rx="6.5" ry="5" fill="#f7ead0"/><path d="M14 20H18L16 22Z" fill="#c8503a"/><path d="M16 22V25M13 25Q16 27 19 25" stroke-width=".9"/>${eye(10.5, 15, '#ffe04a', 1.7, 1.2)}${eye(21.5, 15, '#ffe04a', 1.7, 1.2)}`;
            const bear = () => `<circle cx="7" cy="8" r="4" fill="#7a5a3e"/><circle cx="25" cy="8" r="4" fill="#7a5a3e"/><ellipse cx="16" cy="17" rx="13" ry="12" fill="#7a5a3e"/><ellipse cx="16" cy="21.5" rx="6" ry="4.6" fill="#c9a880"/><ellipse cx="16" cy="19.5" rx="2.2" ry="1.6" fill="#2b2016" stroke="none"/>${eye(10.5, 14.5, '#ffcf4a', 1.4, 1.4)}${eye(21.5, 14.5, '#ffcf4a', 1.4, 1.4)}<path d="M8.5 12L13 13.5M23.5 12L19 13.5" stroke-width="1.5"/>${fangs(24.6, 2.2)}`;
            const lion = () => `<path d="M16 1L20 5L25 3L26 8L31 10L28 15L31 20L26 22L25 27L20 27L16 31L12 27L7 27L6 22L1 20L4 15L1 10L6 8L7 3L12 5Z" fill="#c9922e"/><circle cx="16" cy="17" r="9" fill="#e8c46a"/><path d="M11 9L13 12M21 9L19 12M16 8V11" stroke="#8a5a1a" stroke-width="1"/>${eye(12.5, 15, '#7a2a1a', 1.4, 1.4)}${eye(19.5, 15, '#7a2a1a', 1.4, 1.4)}<path d="M14 18H18L16 20.5Z" fill="#8a3a2a"/><path d="M16 20.5V23M12.5 23Q16 25.5 19.5 23" stroke-width=".9"/><path d="M12 12L14 14M20 12L18 14" stroke="#fff4c4" stroke-width=".8"/>`;
            const dragon = (c, h, e) => `<path d="M4 3Q9 6 10 12Q16 10 22 12Q23 6 28 3Q28 11 26 16Q28 23 22 27Q16 30 10 27Q4 23 6 16Q4 11 4 3Z" fill="${c}"/><path d="M11 19Q16 17 21 19Q21 25 16 26Q11 25 11 19Z" fill="${h}"/><circle cx="14" cy="21" r=".9" fill="#2b2016" stroke="none"/><circle cx="18" cy="21" r=".9" fill="#2b2016" stroke="none"/><path d="M8 14L13 15.5L9 17ZM24 14L19 15.5L23 17Z" fill="${e}" stroke="none"/><path d="M5 20Q2 20 1 23M27 20Q30 20 31 23" stroke="${h}"/>${fangs(25.5, 2.6)}`;
            const turtle = () => `<path d="M3 23Q3 8 16 8Q29 8 29 23Z" fill="#6a4a8a"/><path d="M16 8V23M9 10L11 23M23 10L21 23M4 17H28" stroke="#3a2a4a" stroke-width=".9"/><path d="M3 23H29L27 27H5Z" fill="#a8946a"/><g fill="#8ff05a" stroke="none"><circle cx="8" cy="13" r="1.5"/><circle cx="24" cy="12" r="1.2"/><circle cx="22" cy="19" r="1.5"/></g><path d="M16 4Q10 4 10 9L22 9Q22 4 16 4Z" fill="#8ab06a"/>${eye(13.5, 6.5, '#d6ff5a', 1, 1)}${eye(18.5, 6.5, '#d6ff5a', 1, 1)}`;
            const snake = () => `<path d="M7 27Q3 19 12 19Q21 19 22 13Q23 8 17 8" stroke="#2b2016" stroke-width="7.4"/><path d="M7 27Q3 19 12 19Q21 19 22 13Q23 8 17 8" stroke="#5fa06a" stroke-width="5.4"/><path d="M8 24Q7 21 11 21M18 17Q21 16 21 13" stroke="#c8e88a" stroke-width="1.2"/><ellipse cx="14" cy="6.5" rx="6" ry="4.6" fill="#5fa06a"/>${eye(12, 5.4, '#ffd84a', 1.3, 1.6)}${eye(16.5, 5.4, '#ffd84a', 1.3, 1.6)}<path d="M13 11L11 14M13 11L15 14" stroke="#c8443a" stroke-width="1"/>`;
            const fox = () => `<path d="M3 3L11 10H21L29 3L28 17Q25 27 16 29Q7 27 4 17Z" fill="#f4ecdc"/><path d="M6 6L10 10L7 12ZM26 6L22 10L25 12Z" fill="#e88a9a" stroke="none"/><path d="M4 17L10 20M28 17L22 20" stroke="#c8503a" stroke-width="1.6"/><path d="M14.5 18H17.5L16 20Z" fill="#2b2016"/><path d="M8 14Q11 12.5 13.5 15M24 14Q21 12.5 18.5 15" stroke="#2b2016" stroke-width="1.4"/><path d="M16 5L18 8L16 11L14 8Z" fill="#7fe8f0" stroke="#3aa8b8" stroke-width=".8"/>${sparkle(26, 22, 2.4, '#bff8ff')}`;
            const lizard = () => `<path d="M16 2L26 11L25 23Q16 30 7 23L6 11Z" fill="#c8503a"/><path d="M16 2V10M9 12L14 15M23 12L18 15" stroke="#ff9a3a" stroke-width="1.4"/><path d="M11 24L13 21M21 24L19 21" stroke="#8a2a1a"/>${eye(11, 15, '#ffe04a', 1.1, 2)}${eye(21, 15, '#ffe04a', 1.1, 2)}<path d="M16 26L14 30M16 26L18 30" stroke="#ff4a3a" stroke-width="1"/><path d="M13 20Q16 22 19 20" stroke-width=".9"/>`;
            const butterfly = () => `<path d="M16 15Q6 2 3 8Q1 16 12 18Z" fill="#8a6ad8"/><path d="M16 15Q26 2 29 8Q31 16 20 18Z" fill="#8a6ad8"/><path d="M15 19Q5 20 6 27Q10 30 15 22ZM17 19Q27 20 26 27Q22 30 17 22Z" fill="#5a8ae0"/><circle cx="8" cy="10" r="2" fill="#f8e0ff" stroke="none"/><circle cx="24" cy="10" r="2" fill="#f8e0ff" stroke="none"/><rect x="14.6" y="9" width="2.8" height="16" rx="1.4" fill="#3a2a4a"/><path d="M15 9Q12 4 9 3M17 9Q20 4 23 3"/>${eye(16, 11, '#ff9ad8', 1, 1)}`;

            // —— 幽魂 / 魔类 ——
            const ghost = (c, e, mouth = 'o') => `<path d="M5 29V14Q5 3 16 3Q27 3 27 14V29L22.5 25L19.5 29L16 25L12.5 29L9.5 25Z" fill="${c}"/>${eye(11.5, 14, e, 2.2, 3)}${eye(20.5, 14, e, 2.2, 3)}${mouth === 'o' ? '<ellipse cx="16" cy="21" rx="2.2" ry="2.8" fill="#2b2016" stroke="none"/>' : '<path d="M9 20Q16 28 23 20Q16 22 9 20Z" fill="#2b2016"/><path d="M12 21.5V23M16 22.5V24.5M20 21.5V23" stroke="#fff" stroke-width=".9"/>'}`;
            const demon = (c, horn, e, crown = false) => `<path d="M6 12Q1 6 6 1Q6 8 11 9ZM26 12Q31 6 26 1Q26 8 21 9Z" fill="${horn}"/>${crown ? `<path d="M10 9L12 4L14 8L16 3L18 8L20 4L22 9Z" fill="${horn}"/>` : ''}<path d="M5 17Q5 8 16 8Q27 8 27 17Q27 28 16 30Q5 28 5 17Z" fill="${c}"/><path d="M7 13L14 16M25 13L18 16" stroke="#2b2016" stroke-width="1.8"/>${eye(11, 17, e, 2.1, 1.3)}${eye(21, 17, e, 2.1, 1.3)}<path d="M9 24Q16 28 23 24" stroke="#2b2016" stroke-width="1.4"/>${fangs(24.5, 4)}`;
            const skull = c => `<path d="M9 8L11 3L14 7L16 2L18 7L21 3L23 8Z" fill="#e2c27a"/><path d="M5 17Q5 7 16 7Q27 7 27 17Q27 22 23 24V29H9V24Q5 22 5 17Z" fill="${c}"/><ellipse cx="11" cy="17" rx="3.4" ry="3.8" fill="#1a1a2a"/><ellipse cx="21" cy="17" rx="3.4" ry="3.8" fill="#1a1a2a"/><circle cx="11" cy="17.5" r="1.3" fill="#5affc8" stroke="none"/><circle cx="21" cy="17.5" r="1.3" fill="#5affc8" stroke="none"/><path d="M14.5 22L16 20L17.5 22ZM12 26V29M16 26V29M20 26V29" stroke-width=".9"/>`;
            const golem = (c, g, extra = '') => `<path d="M8 6H24L27 11V22L24 28H8L5 22V11Z" fill="${c}"/><path d="M8 6L12 12M24 6L20 12M5 22L10 20M27 22L22 20" stroke="#2b2016" stroke-width=".9" opacity=".8"/><rect x="8" y="12" width="16" height="5" rx="1.5" fill="#1a1612"/><rect x="10" y="13.4" width="4.4" height="2.2" fill="${g}" stroke="none"/><rect x="17.6" y="13.4" width="4.4" height="2.2" fill="${g}" stroke="none"/><path d="M11 22H21" stroke="${g}" stroke-width="1.6"/>${extra}`;
            const vortex = (c, e) => `<circle cx="16" cy="16" r="13" fill="#1c1430"/><path d="M16 4A12 12 0 0 1 28 16A9 9 0 0 1 16 25A6 6 0 0 1 10 16A3.5 3.5 0 0 1 16 14" stroke="${c}" stroke-width="2.6"/><circle cx="16" cy="16" r="2.2" fill="${e}" stroke="none"/>${sparkle(5, 6, 2)}${sparkle(27, 27, 1.8)}`;
            const hood = (c, e, face = '#1a1420') => `<path d="M16 2Q4 5 4 17L7 29H25L28 17Q28 5 16 2Z" fill="${c}"/><path d="M16 7Q8 9 9 18Q10 24 16 25Q22 24 23 18Q24 9 16 7Z" fill="${face}"/>${eye(12.5, 16, e, 1.8, 1.2)}${eye(19.5, 16, e, 1.8, 1.2)}<path d="M16 3V7M7 24L9 28M25 24L23 28" stroke-width=".8" opacity=".7"/>`;
            const eyeTent = (c, e) => `<path d="M6 16Q1 22 5 29M11 21Q7 27 10 30M21 21Q25 27 22 30M26 16Q31 22 27 29" stroke="${c}" stroke-width="3"/><circle cx="16" cy="14" r="11" fill="${c}"/><path d="M6 14Q16 5 26 14Q16 23 6 14Z" fill="#e8f0ff"/><circle cx="16" cy="14" r="4.6" fill="${e}"/><ellipse cx="16" cy="14" rx="1.4" ry="3.8" fill="#0a1020" stroke="none"/>`;
            const ancient = () => `<path d="M3 30Q2 22 8 20L6 10Q10 8 12 12Q16 8 20 12Q22 8 26 10L24 20Q30 22 29 30Z" fill="#3a1a2a"/><path d="M8 20Q16 25 24 20" stroke="#ff4a5a" stroke-width="1.4"/><path d="M8 15Q16 6 24 15Q16 24 8 15Z" fill="#f0d8c0"/><circle cx="16" cy="15" r="4.2" fill="#c8203a"/><ellipse cx="16" cy="15" rx="1.2" ry="3.4" fill="#1a0a10" stroke="none"/>${sparkle(5, 7, 2, '#ff9aa8')}${sparkle(27, 6, 2, '#ff9aa8')}`;

            // —— 塔 / 林 / 遗迹 / 劫 / 梦 ——
            const sage = (robe, trim, hair = '#e8e0d0', face = '#e8c8a0') => `<path d="M3 30Q4 21 16 20Q28 21 29 30Z" fill="${robe}"/><path d="M16 20L12 30M16 20L20 30" stroke="${trim}" stroke-width="1.2"/><path d="M8 11Q8 4 16 3Q24 4 24 11Z" fill="${trim}"/><path d="M12 3L16 0L20 3" fill="${trim}"/><ellipse cx="16" cy="13" rx="6.6" ry="7.4" fill="${face}"/><path d="M10 17Q16 30 22 17Q16 22 10 17Z" fill="${hair}"/><path d="M11 12H14M18 12H21" stroke-width="1.3"/>`;
            const flower = () => `<g fill="#c8443a"><ellipse cx="16" cy="6" rx="4" ry="5.5"/><ellipse cx="6" cy="12" rx="4" ry="5.5" transform="rotate(-60 6 12)"/><ellipse cx="26" cy="12" rx="4" ry="5.5" transform="rotate(60 26 12)"/><ellipse cx="9" cy="22" rx="4" ry="5.5" transform="rotate(-125 9 22)"/><ellipse cx="23" cy="22" rx="4" ry="5.5" transform="rotate(125 23 22)"/></g><circle cx="16" cy="16" r="8" fill="#7a2a4a"/><path d="M9 15Q16 21 23 15Q16 27 9 15Z" fill="#1a0a14"/><path d="M11 15.5L12.6 19L14 16M18 16L19.4 19L21 15.5" fill="#fff" stroke-width=".7"/>${eye(12.5, 12, '#ffd84a', 1.3, 1)}${eye(19.5, 12, '#ffd84a', 1.3, 1)}`;
            const miasma = () => `<path d="M6 24Q1 22 3 17Q2 12 8 12Q9 6 16 7Q23 6 24 12Q30 12 29 18Q31 24 25 25Q20 28 16 26Q10 28 6 24Z" fill="#7a8a4a"/>${eye(11.5, 17, '#3a1a10', 2.2, 2.6)}${eye(20.5, 17, '#3a1a10', 2.2, 2.6)}${eye(11.5, 17, '#c8ff5a', 0.9, 1.3)}${eye(20.5, 17, '#c8ff5a', 0.9, 1.3)}<path d="M11 23Q16 26 21 23" stroke-width="1.2"/><g fill="#c8e86a" stroke="none" opacity=".8"><circle cx="6" cy="8" r="1.3"/><circle cx="26" cy="6" r="1"/><circle cx="4" cy="26" r="1"/></g>`;
            const treant = () => `<path d="M5 6Q0 4 2 10Q4 12 8 12M27 6Q32 4 30 10Q28 12 24 12" stroke="#5a3a20" stroke-width="2.4"/><circle cx="6" cy="6" r="4" fill="#5fa060"/><circle cx="26" cy="6" r="4" fill="#5fa060"/><circle cx="16" cy="6" r="6" fill="#4f9050"/><path d="M8 10H24L26 30H6Z" fill="#7a5230"/><path d="M11 12V28M20 12V26M8 22Q11 20 12 24" stroke="#4a2e18" stroke-width=".8"/>${eye(12, 16, '#ffe04a', 2.2, 1.6)}${eye(20, 16, '#ffe04a', 2.2, 1.6)}<path d="M11 23Q16 27 21 23Q16 25 11 23Z" fill="#1a0e08"/>`;
            const grassSpirit = () => `<path d="M16 2Q28 12 25 24Q22 30 16 30Q10 30 7 24Q4 12 16 2Z" fill="#7fc070"/><path d="M16 4V28M16 14L10 10M16 19L22 15" stroke="#3f7a3f" stroke-width=".9"/>${eye(12, 17, '#1a3a1a', 1.6, 2.2)}${eye(20, 17, '#1a3a1a', 1.6, 2.2)}<path d="M13 23Q16 25 19 23" stroke-width="1.1"/>${sparkle(26, 6, 2, '#eaffd0')}${sparkle(5, 23, 1.8, '#eaffd0')}`;
            const heartForest = () => `<path d="M16 29Q1 19 3 10Q5 4 11 5Q15 6 16 10Q17 6 21 5Q27 4 29 10Q31 19 16 29Z" fill="#4f9a55"/><path d="M8 9Q12 8 14 12M24 10Q20 9 18 13M16 12V27M10 16L16 20L22 16" stroke="#c8f8a0" stroke-width=".9"/><path d="M16 29V31M12 27L9 31M20 27L23 31" stroke="#6a4a2a" stroke-width="1.6"/>${leaf(21, 6, -70, 8, '#8adc7a')}${leaf(11, 6, -110, 8, '#8adc7a')}<circle cx="16" cy="15" r="2.4" fill="#f8ffc8" stroke="none"/>${sparkle(6, 22, 2, '#f8ffc8')}${sparkle(27, 21, 2, '#f8ffc8')}`;
            const helm = (c, e) => `<path d="M16 1L21 5V8L26 10V22L22 29H10L6 22V10L11 8V5Z" fill="${c}"/><path d="M11 12H21V19H11Z" fill="#141018"/><path d="M11 15.5H21M16 12V19" stroke="${c}" stroke-width=".8"/>${eye(13.5, 15.5, e, 1.3, 1)}${eye(18.5, 15.5, e, 1.3, 1)}<path d="M16 1V8M9 24H23" stroke="#141018" stroke-width=".8" opacity=".6"/>`;
            const rift = () => `<path d="M17 1L12 10L18 13L11 21L16 24L10 31L22 19L17 16L23 11L18 8Z" fill="#160e2a"/><path d="M14 10L18 13L12 21L16 24L15 26L20 18L16 16L21 12Z" fill="#a86af0" stroke="none"/><path d="M5 8L9 12M27 22L23 20M4 22L8 20M27 8L22 12" stroke="#6a4ab8" stroke-width="1.2"/>${sparkle(16, 17, 2.6, '#f4e6ff')}`;
            const shard = () => `<path d="M16 2L26 14L20 30L8 22L6 10Z" fill="#f0d68a"/><path d="M16 2L15 16L20 30M6 10L15 16L26 14M8 22L15 16" stroke="#fff6d0" stroke-width=".9"/><path d="M16 2L6 10L15 16Z" fill="#c9a04a" stroke="none" opacity=".8"/><path d="M11 12L13 14M19 18L21 16M14 22H17" stroke="#7a5a1a" stroke-width="1"/>${sparkle(26, 4, 2.4)}${sparkle(4, 26, 2)}`;
            const stoneFace = (c, g) => `<path d="M4 30V13L9 5H23L28 13V30Z" fill="${c}"/><path d="M9 5L11 12M23 5L21 12M4 13H28" stroke="#2b2016" stroke-width=".8" opacity=".7"/><path d="M8 14H14L13 19H9ZM24 14H18L19 19H23Z" fill="#141018"/>${eye(11, 16.5, g, 1.5, 1.3)}${eye(21, 16.5, g, 1.5, 1.3)}<path d="M13 25H19M14.5 21L16 24L17.5 21" stroke="${g}" stroke-width="1.3"/><path d="M12 3L16 0L20 3" fill="${g}" stroke="none"/>`;
            const stormCloud = () => `<path d="M6 20Q1 19 3 13Q4 9 9 10Q10 4 17 5Q24 4 24 10Q30 10 29 16Q30 21 25 21Z" fill="#4a5470"/>${eye(12, 13, '#ffe04a', 2, 1.4)}${eye(21, 13, '#ffe04a', 2, 1.4)}<path d="M13 17Q16 19 19 17" stroke-width="1.2"/><path d="M15 21L11 27H15L12 32M22 21L19 26H22" stroke="#ffe04a" stroke-width="1.6"/>`;
            const core = () => `<circle cx="16" cy="16" r="12" fill="#3a4a8a"/><circle cx="16" cy="16" r="8.5" fill="#6a8ae8"/><path d="M18 5L11 17H16L13 27L22 14H17Z" fill="#fff06a" stroke="#a88a1a" stroke-width=".8"/><path d="M3 10L6 12M29 10L26 12M3 22L6 20M29 22L26 20" stroke="#ffe04a" stroke-width="1.3"/>`;
            const willEye = (c, ring) => `<circle cx="16" cy="15" r="13.5" stroke="${ring}" stroke-width="1.2" opacity=".85"/><path d="M4 15Q16 3 28 15Q16 27 4 15Z" fill="#f4f0e8"/><circle cx="16" cy="15" r="6" fill="${c}"/><ellipse cx="16" cy="15" rx="1.8" ry="5" fill="#0a1020" stroke="none"/><circle cx="14" cy="13" r="1.3" fill="#fff" stroke="none"/><path d="M7 29L9 25M16 30V26M25 29L23 25" stroke="${ring}" stroke-width="1.4"/>`;
            const soulFig = c => `<path d="M16 3Q9 3 9 10Q9 15 13 17Q4 19 3 30H29Q28 19 19 17Q23 15 23 10Q23 3 16 3Z" fill="${c}" opacity=".92"/>${eye(13, 10, '#1a2a5a', 1.5, 2)}${eye(19, 10, '#1a2a5a', 1.5, 2)}<path d="M14 14Q16 15.5 18 14" stroke-width="1"/><path d="M4 26L28 24M6 29L26 28" stroke="#fff" stroke-width=".7" opacity=".7"/>${sparkle(26, 6, 2, '#eaf8ff')}`;
            const maw = () => `<circle cx="16" cy="16" r="14" fill="#1a1024"/><circle cx="16" cy="16" r="9" fill="#5a1a3a"/><circle cx="16" cy="16" r="4.5" fill="#0a0410"/><g fill="#f4ecd8" stroke-width=".7"><path d="M16 2L14 8H18Z"/><path d="M28 10L22 12L24 16Z"/><path d="M28 22L23 19L22 24Z"/><path d="M16 30L18 24H14Z"/><path d="M4 22L9 19L10 24Z"/><path d="M4 10L10 12L8 16Z"/></g>`;
            const dreamSprite = () => `<path d="M22 3Q8 4 8 18Q8 29 21 29Q12 26 13 17Q14 8 22 3Z" fill="#c8a8f0"/><path d="M16 12Q22 8 26 14Q28 22 22 27Q24 20 16 12Z" fill="#f0c8e8"/>${eye(14.5, 19, '#3a2a5a', 1.6, .7)}<path d="M13 22Q15 23.5 17 22" stroke-width="1"/><path d="M24 6L27 6L24 9L27 9M27 13L29.5 13L27 16" stroke="#fff" stroke-width="1"/>${sparkle(6, 6, 2)}${sparkle(28, 26, 2)}`;
            const shadowFace = () => `<path d="M3 30Q3 8 16 4Q29 8 29 30Z" fill="#241a2e"/><path d="M6 8L9 3L11 8M15 6L16 1L18 6M21 8L24 3L26 8" fill="#3a2a4a"/><path d="M7 16Q12 12 14 17ZM25 16Q20 12 18 17Z" fill="#ff3a4a" stroke="none"/><path d="M8 22Q16 32 24 22Q16 25 8 22Z" fill="#ff3a4a"/><path d="M11 23.5L12 25.5L13.5 24.5M18.5 24.5L20 25.5L21 23.5" fill="#fff" stroke-width=".6"/>`;
            const multiGolem = () => golem('#8a6a9a', '#7fe8ff', `<circle cx="9" cy="8" r="1.6" fill="#ff6a6a" stroke="none"/><circle cx="16" cy="7" r="1.6" fill="#ffe04a" stroke="none"/><circle cx="23" cy="8" r="1.6" fill="#6ae88a" stroke="none"/><circle cx="7" cy="25" r="1.5" fill="#6a9aff" stroke="none"/><circle cx="25" cy="25" r="1.5" fill="#e86aff" stroke="none"/>`);
            const yinSage = () => `<path d="M3 30Q4 21 16 20Q28 21 29 30Z" fill="#3a3a48"/><path d="M8 11Q8 4 16 3Q24 4 24 11Z" fill="#2a2a34"/><path d="M16 5A8 8 0 0 1 16 21A4 4 0 0 1 16 13A4 4 0 0 0 16 5Z" fill="#f4f0e8" stroke="none"/><path d="M16 5A8 8 0 0 0 16 21A4 4 0 0 0 16 13A4 4 0 0 1 16 5Z" fill="#1c1c26" stroke="none"/><circle cx="16" cy="9" r="1.1" fill="#1c1c26" stroke="none"/><circle cx="16" cy="17" r="1.1" fill="#f4f0e8" stroke="none"/><circle cx="16" cy="13" r="8" stroke-width="1"/>`;
            const supremeSage = () => `<circle cx="16" cy="11" r="10.5" stroke="#f3d36a" stroke-width="1.4" opacity=".9"/>${sage('#e8e4f4', '#8a6ad8', '#f4f0f8')}${sparkle(4, 5, 2.2)}${sparkle(28, 5, 2.2)}<path d="M10 25H22" stroke="#8a6ad8" stroke-width="1.2"/>`;

            return {
                野狼: svg(wolf('#8a8a92', '#c9c9d0', '#f3d36a')),
                灵狼: svg(wolf('#7fb0d8', '#dceeff', '#6affff') + sparkle(27, 6, 2.2, '#dffcff')),
                野猪: svg(boar('#8a6a4a')),
                虎妖: svg(tiger()),
                熊妖: svg(bear()),
                恶魔: svg(demon('#b8443a', '#3a2a20', '#ffd84a')),
                灵兽: svg(fox()),
                毒兽: svg(turtle()),
                蛇妖: svg(snake()),
                魔王: svg(demon('#6a3a8a', '#e2b84a', '#ff4a4a', true)),
                深渊生物: svg(eyeTent('#2a3a6a', '#6ac8ff')),
                金甲兽: svg(lion()),
                雷劫残魂: svg(ghost('#c8d0f0', '#ffe04a') + '<path d="M25 2L21 8H25L22 13" stroke="#ffe04a" stroke-width="1.6"/>'),
                天雷傀儡: svg(golem('#8a94b8', '#ffe04a', '<path d="M16 22L14 26H17L15 30" stroke="#ffe04a" stroke-width="1.4"/>')),
                虚空生物: svg(vortex('#8a5ad8', '#e6d0ff')),
                噬魂者: svg(ghost('#6ab88a', '#f0fff0', 'maw')),
                深渊领主: svg(demon('#1e2440', '#5a78c8', '#6ac8ff', true)),
                古神残影: svg(ancient()),
                混沌兽: svg(dragon('#5a4a7a', '#8a7ab8', '#ff6adf')),
                虚空行者: svg(hood('#3a2a6a', '#c8a0ff')),
                九幽魔君: svg(demon('#3a2a5a', '#8a5ad8', '#ff6adf', true) + '<path d="M16 8Q19 4 16 0Q13 4 16 8Z" fill="#a86aff" stroke="none"/>'),
                幽冥鬼帝: svg(skull('#d8e0d0')),
                // 秘境怪物
                塔灵傀儡: svg(golem('#b08d5a', '#7fe8d8')),
                灵雾幽魂: svg(ghost('#a8d8ea', '#5a9ad8')),
                火纹蜥蜴: svg(lizard()),
                土甲石像: svg(golem('#8a7a5a', '#e0a040', '<path d="M5 11L2 6L8 8M27 11L30 6L24 8" fill="#8a7a5a"/>')),
                玄机子: svg(sage('#4a7a8a', '#2a5a6a')),
                食人花妖: svg(flower()),
                腐沼瘴气: svg(miasma()),
                幻影蝶: svg(butterfly()),
                古树守卫: svg(treant()),
                灵草魅影: svg(grassSpirit()),
                森林之心: svg(heartForest()),
                残魂守卫: svg(helm('#5a6a9a', '#7fe8ff')),
                空间裂隙: svg(rift()),
                冰晶傀儡: svg(golem('#a8d8ec', '#e8ffff', '<path d="M8 6L6 1L11 5M24 6L26 1L21 5" fill="#d8f4ff"/>')),
                法则残片: svg(shard()),
                遗迹意志: svg(stoneFace('#7a7a6a', '#ffd84a')),
                劫云化身: svg(stormCloud()),
                雷劫核心: svg(core()),
                天劫意志: svg(willEye('#5a78d8', '#ffe04a')),
                元神残影: svg(soulFig('#bcd8f0')),
                虚空吞噬者: svg(maw()),
                神识傀儡: svg(golem('#7a5aa8', '#e8d0ff', '<circle cx="16" cy="8.5" r="2" fill="#e8d0ff"/><circle cx="16" cy="8.5" r=".8" fill="#3a1a6a" stroke="none"/>')),
                幻梦妖灵: svg(dreamSprite()),
                化神意志: svg(willEye('#5ab8c8', '#8fe8f0')),
                幻境行者: svg(hood('#6a8ab8', '#e0f0ff', '#2a3a5a')),
                虚实道人: svg(yinSage()),
                万象傀儡: svg(multiGolem()),
                心魔化身: svg(shadowFace()),
                太虚道主: svg(supremeSage()),
                天道残影: svg(soulFig('#e8d8a8')),
                法则傀儡: svg(golem('#a8843a', '#fff0c0', '<circle cx="16" cy="8.5" r="2" fill="#fff0c0"/><circle cx="16" cy="8.5" r=".8" fill="#6a4a1a" stroke="none"/>')),
                道影行者: svg(hood('#3a3a56', '#ffe08a', '#12121a')),
                天道意志: svg(willEye('#c9a04a', '#fff4c4')),
                天道化身: svg(supremeSage()),
                归墟古兽: svg(ancient()),
                合一魔尊: svg(demon('#3a2a4a', '#c9a04a', '#ffe08a', true)),
                虚灵游魂: svg(soulFig('#c8c0e8')),
                化虚傀儡: svg(golem('#6a8a9a', '#c8f0ff', '<circle cx="16" cy="8.5" r="2" fill="#c8f0ff"/><circle cx="16" cy="8.5" r=".8" fill="#1a3a4a" stroke="none"/>')),
                虚境行者: svg(hood('#4a5a7a', '#d8e8ff', '#12141a')),
                太虚意志: svg(willEye('#8a78c8', '#e0d8ff')),
                虚无道尊: svg(supremeSage()),
                虚渊兽: svg(hood('#2a3a56', '#9adfe8', '#0a1018')),
                化虚魔: svg(demon('#241a30', '#8a6ad8', '#d8c8ff', false)),
                实道行者: svg(yinSage()),
                太虚尊者: svg(demon('#3a2a4a', '#f3d36a', '#fff4c4', true)),
                劫云傀儡: svg(golem('#5a5a7a', '#b39ddb', '<circle cx="16" cy="8.5" r="2" fill="#b39ddb"/><circle cx="16" cy="8.5" r=".8" fill="#2a2a3a" stroke="none"/>')),
                本心魔影: svg(shadowFace()),
                雷劫化身: svg(willEye('#8a78c8', '#e8e0ff')),
                大天劫化身: svg(demon('#241a30', '#b39ddb', '#e0d0ff', true)),
                太乙游神: svg(soulFig('#f3d36a')),
                元婴化影: svg(willEye('#b39ddb', '#f0e8ff')),
                法则执者: svg(golem('#8a6a1a', '#fff4d8', '<circle cx="16" cy="8.5" r="2" fill="#fff4d8"/><circle cx="16" cy="8.5" r=".8" fill="#4a3a0a" stroke="none"/>')),
                灵界残将: svg(hood('#4a3a1a', '#f3d36a', '#12100a')),
                灵界至尊: svg(supremeSage()),
                太乙战修: svg(hood('#5a4a1a', '#fff4d8', '#1a1408')),
                灵界守卫: svg(golem('#7a6a2a', '#fff4d8', '<circle cx="16" cy="8.5" r="2" fill="#fff4d8"/><circle cx="16" cy="8.5" r=".8" fill="#3a2a0a" stroke="none"/>')),
                灵界凶兽: svg(ancient()),
                道祖之影: svg(demon('#241a30', '#f3d36a', '#fff4d8', true))
            };
        })();

        const ART_ICONS = (() => {
            const svg = icoSvg, sparkle = icoSparkle, leaf = icoLeaf;
            // 功法册：封皮颜色 + 封面徽记
            const book = (cover, spine, mark) => `<path d="M6 4H24Q26 4 26 6V27Q26 29 24 29H6Z" fill="${cover}"/><path d="M6 4V29" stroke="${spine}" stroke-width="3.4"/><path d="M8 27H24" stroke="#f0e6c8" stroke-width="1.2" opacity=".8"/><rect x="11" y="8" width="11" height="14" rx="1.2" fill="#efe2bc" opacity=".92"/>${mark}<path d="M8 2V7" stroke="#b08d5a" stroke-width="1.6"/>`;
            const m = s => `<g transform="translate(16.5 15)">${s}</g>`;
            return {
                basic_art: svg(book('#8a7a5a', '#5a4a30', m('<path d="M0 -4Q4 -4 4 0Q4 4 0 4Q-2.6 4 -2.6 1.6Q-2.6 -.6 -.6 -.6" stroke="#6a4a2a" stroke-width="1.2"/>'))),
                advanced_art: svg(book('#3a5a8a', '#22385a', m('<circle r="4" stroke="#2a3a6a" stroke-width="1.2"/><circle r="1.6" fill="#2a3a6a" stroke="none"/>'))),
                qingmu_art: svg(book('#4f8a55', '#2f5a35', m('<path d="M0 5V-4M0 1L-3.4 -2M0 -1L3.4 -4" stroke="#2f5a35" stroke-width="1.2"/>'))),
                liuyun_art: svg(book('#7a9ab8', '#4a6a88', m('<path d="M-4.5 3Q-5.5 -1 -2 -1Q-1.5 -4.6 2 -3.4Q5.4 -3.4 4.5 0Q6 3 3 3Z" fill="#fff" stroke="#4a6a88" stroke-width="1"/>'))),
                xuanshui_art: svg(book('#3a6a9a', '#224466', m('<path d="M0 -5Q4.4 1 3.2 3.4Q2 5.4 0 5.4Q-2 5.4 -3.2 3.4Q-4.4 1 0 -5Z" fill="#7fc8ff" stroke="#224466" stroke-width="1"/>'))),
                lieyang_art: svg(book('#c8843a', '#8a5a1a', m('<circle r="2.6" fill="#ffd84a" stroke="#8a5a1a" stroke-width="1"/><path d="M0 -6V-4M0 6V4M-6 0H-4M6 0H4M-4.2 -4.2L-3 -3M4.2 4.2L3 3M-4.2 4.2L-3 3M4.2 -4.2L3 -3" stroke="#c8683a" stroke-width="1"/>'))),
                golden_art: svg(book('#c9a04a', '#8a6a22', m('<circle r="3.8" fill="#f3d36a" stroke="#8a6a22" stroke-width="1"/><path d="M-2 .6Q0 -2.4 2 .6Q0 2 -2 .6Z" stroke="#8a6a22" stroke-width=".9"/>')) + sparkle(25, 5, 2.4)),
                fire_art: svg(book('#b8443a', '#7a2a22', m('<path d="M0 -5.6Q3.6 -1 3.4 2Q3 5.4 0 5.4Q-3 5.4 -3.4 2Q-3.6 -1 0 -5.6Z" fill="#ff8a3a" stroke="#7a2a22" stroke-width=".9"/><path d="M0 0Q1.8 2 1.4 3.6Q1 4.6 0 4.6Q-1 4.6 -1.4 3.6Q-1.8 2 0 0Z" fill="#ffe04a" stroke="none"/>'))),
                yuanying_art: svg(book('#a83a5a', '#6a2238', m('<circle cy="-2.4" r="2.2" fill="#ffe8d0" stroke="#6a2238" stroke-width=".9"/><path d="M-3.4 5Q0 -1 3.4 5Z" fill="#ffe8d0" stroke="#6a2238" stroke-width=".9"/>')) + sparkle(25, 6, 2.2)),
                soul_art: svg(book('#3a2f6a', '#1f1840', m('<path d="M0 -5A5 5 0 0 1 5 0A3.2 3.2 0 0 1 0 2A1.6 1.6 0 0 1 -1.4 0" stroke="#3a2f6a" stroke-width="1.2"/><circle r=".8" fill="#3a2f6a" stroke="none"/>')) + sparkle(24, 5, 2.4) + sparkle(9, 26, 1.6)),
                huashen_art: svg(book('#5ab0b8', '#2f7a82', m('<circle r="5" stroke="#2f7a82" stroke-width=".9"/><g fill="#2f7a82" stroke="none"><circle cy="-3" r=".9"/><circle cy="3" r=".9"/><circle cx="-3" r=".9"/><circle cx="3" r=".9"/><circle r="1.1"/></g>')) + sparkle(25, 5, 2.4, '#dffcff')),
                heti_art: svg(book('#c9a04a', '#7a5a1a', m('<circle r="5" stroke="#7a5a1a" stroke-width=".9"/><path d="M0 -5A2.5 2.5 0 0 1 0 0A2.5 2.5 0 0 0 0 5" stroke="#7a5a1a" stroke-width="1"/><circle cy="-2.5" r=".8" fill="#7a5a1a" stroke="none"/>')) + sparkle(25, 5, 2.4)),
                dao_art: svg(book('#e8dcc0', '#8a7a5a', m('<path d="M0 -5.4L4.6 2.6H-4.6Z" stroke="#8a6a2a" stroke-width="1" fill="#f3d36a"/><circle r="1.2" fill="#8a6a2a" stroke="none"/>')) + sparkle(25, 5, 2.4) + sparkle(8, 26, 2)),
                lianxu_art: svg(book('#8a6ad8', '#4a2f8a', m('<path d="M0 -5.4Q4.6 -3 4.6 1Q4.6 5.4 0 5.4Q-4.6 5.4 -4.6 1Q-4.6 -3 0 -5.4Z" fill="#c8b8f0" stroke="#4a2f8a" stroke-width=".9"/><circle r="1.4" fill="#4a2f8a" stroke="none"/>')) + sparkle(25, 5, 2.4)),
                taixuhuashi_art: svg(book('#d8d0e8', '#6a5a8a', m('<path d="M0 -5A5 5 0 0 1 0 5A2.5 2.5 0 0 1 0 0A2.5 2.5 0 0 0 0 -5Z" fill="#3a2f56" stroke="none"/><path d="M0 -5A5 5 0 0 0 0 5A2.5 2.5 0 0 0 0 0A2.5 2.5 0 0 1 0 -5Z" fill="#f0ecf8" stroke="none"/><circle r="5" stroke="#6a5a8a" stroke-width=".9"/>')) + sparkle(25, 5, 2.2) + sparkle(9, 25, 1.8)),
                dacheng_art: svg(book('#e8b84a', '#8a6a1a', m('<circle r="5" fill="#fff4d8" stroke="#8a6a1a" stroke-width="1"/><circle r="2.2" fill="#e8b84a" stroke="none"/>')) + sparkle(25, 5, 2.6) + sparkle(9, 26, 2)),
                taiyi_art: svg(book('#3a2f0a', '#151005', m('<path d="M0 -5.4L4.6 2.6H-4.6Z" fill="#f3d36a" stroke="#151005" stroke-width="1"/><circle r="5" stroke="#f3d36a" stroke-width=".8" opacity=".8"/>')) + sparkle(25, 5, 2.6) + sparkle(9, 26, 2.2) + sparkle(16, 3, 2)),
                primordial_art: svg(book('#2a2a3a', '#111118', m('<path d="M0 -5A5 5 0 0 1 0 5A2.5 2.5 0 0 1 0 0A2.5 2.5 0 0 0 0 -5Z" fill="#1c1c26" stroke="none"/><path d="M0 -5A5 5 0 0 0 0 5A2.5 2.5 0 0 0 0 0A2.5 2.5 0 0 1 0 -5Z" fill="#fff" stroke="none"/><circle r="5" stroke="#1c1c26" stroke-width=".9"/>')) + sparkle(25, 5, 2.4))
            };
        })();

        // 把手绘图标写回：敌人 / 秘境怪物按名字，功法按 id（商店与功法表）
        (function applyMonsterAndArtIcons() {
            Object.values(BATTLE_ENEMY_CONFIGS).forEach(list => list.forEach(e => { if (MONSTER_ICONS[e.name]) e.icon = MONSTER_ICONS[e.name]; }));
            Object.values(GAME_CONFIG.dungeons).forEach(d => (d.monsters || []).forEach(mo => { if (MONSTER_ICONS[mo.name]) mo.icon = MONSTER_ICONS[mo.name]; }));
            Object.keys(ART_ICONS).forEach(id => { if (CULTIVATION_ARTS[id]) CULTIVATION_ARTS[id].icon = ART_ICONS[id]; });
            (GAME_CONFIG.shop.arts || []).forEach(a => { if (ART_ICONS[a.id]) a.icon = ART_ICONS[a.id]; });
        })();

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
            if (!auto) warnLowHp();

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
            syncBattleMode();
            const dungeonProgressEl = document.getElementById('dungeonProgress');
            if (dungeonProgressEl) dungeonProgressEl.style.display = 'none';   // 普通战斗区域没有「第N/M只」这个概念

            // 手动进入时重置本次托管统计；自动续战不弹进入提示，避免每场刷屏
            if (!auto) {
                Object.assign(getAutoBattle(), { wins: 0, losses: 0, streak: 0, coins: 0, exp: 0 });
                showNotification(`进入${areaData.name}！遇到${gameState.battles.currentEnemy.name}！`, '#b89a5b');
            }
            updateNormalBattleUI();
            renderAutoBattleBar();
            updateUI();
            if (!auto) scrollBattleIntoView();
        }

        // 进入秘境
        function enterDungeon(dungeonId, auto = false) {
            const dungeon = GAME_CONFIG.dungeons[dungeonId];

            // 凡人无法进入秘境
            if (gameState.player.realmIndex === 0) {
                showNotification('凡人无法进入秘径，请先突破到练气一层', '#c98a3e', 'warning');
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
                // 手动进入不再回血（此前会回满，导致「进秘境再立刻撤退」等于免费回满血）；生命只靠食物恢复
                warnLowHp();
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
        const RECIPE_PANELS = ['cultivation', 'alchemy', 'forging', 'farming', 'mining', 'danhuo', 'shenshi', 'daoguo'];
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
            syncBattleMode();   // 保险：万一某个战斗退出分支漏调用了，这里兜底纠正
            updateInventoryBadge();
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
            renderHpRestoreBar();
            renderQuestBanner();
            renderSkillUses();
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

        // 精通升级 / 法则里程碑这类数值跃迁太频繁，不适合用需要点确认的重弹窗（境界解锁提示那种），
        // 但完全静默（只有一条会被刷掉的 toast）又感知不到——加一个屏幕中央短暂浮现、自动消失、不挡手的小庆祝，
        // 复用同一个 DOM 节点：连续触发时只重置文字和计时器，不会叠好几个气泡（正反馈诊断 C-5）
        let quickCelebrationTimer = null;
        function showQuickCelebration(text) {
            if (gameState.settings && gameState.settings.enableNotifications === false) return;
            let el = document.getElementById('quickCelebration');
            if (!el) {
                el = document.createElement('div');
                el.id = 'quickCelebration';
                el.className = 'quick-celebration';
                document.body.appendChild(el);
            }
            el.textContent = text;
            el.classList.remove('show');
            void el.offsetWidth;   // 强制重排，确保连续触发时动画能重新播放一次
            el.classList.add('show');
            clearTimeout(quickCelebrationTimer);
            quickCelebrationTimer = setTimeout(() => el.classList.remove('show'), 800);
        }

        // 通知类型系统（P1功能）
        // 通知关闭时仍要显示的「重要提示」：类型为 error / danger / warning，或使用了警示 / 错误色的通知
        const IMPORTANT_NOTIFICATION_COLORS = ['#c4483a', '#c98a3e', '#ef4444', '#f59e0b', '#ff6b6b', '#f39c12'];
        function showNotification(message, color = '#6f9c8a', type = 'normal') {
            if (notifyMuted && !['error', 'danger'].includes(type)) return;   // 极速行动连续完成时不刷屏
            const st = (gameState && gameState.settings) || {};
            if (st.enableNotifications === false && !['error', 'danger', 'warning'].includes(type) &&
                !IMPORTANT_NOTIFICATION_COLORS.includes(String(color).toLowerCase())) {
                return;
            }
            const notification = document.createElement('div');
            // type: 'rare' 用于翻倍/节省这类概率触发的稀有事件，边框加粗+轻微脉冲发光，
            // 跟"材料不足"这种日常提示拉开视觉层级（正反馈诊断 C-1），不影响静音/常驻等既有逻辑
            notification.className = 'notification' + (type === 'rare' ? ' notification-rare' : '');
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
            const isMajor = MAJOR_BREAKTHROUGH_INDICES.has(gameState.player.realmIndex) && !!GAME_CONFIG.realms[gameState.player.realmIndex + 1];
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

        // 物品类型的中文名与背包里的显示顺序（背包分类标题、物品详情都用它，不再露出英文的类型名）
        const ITEM_TYPE_NAMES = {
            food: '食物', material: '材料', ore: '矿石', seed: '种子', breakthrough_material: '突破丹药',
            weapon: '武器', armor: '护甲', jewelry: '饰品', daoze: '道则', consumable: '丹药', special: '特殊', currency: '货币'
        };
        const ITEM_TYPE_ORDER = ['food', 'material', 'ore', 'seed', 'breakthrough_material', 'weapon', 'armor', 'jewelry', 'daoze', 'consumable', 'special', 'currency'];

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

            // 按类型显示（固定顺序；没见过的类型排在最后）
            const typeNames = ITEM_TYPE_NAMES;
            const orderedTypes = Object.keys(byType).sort((a, b) => {
                const ia = ITEM_TYPE_ORDER.indexOf(a), ib = ITEM_TYPE_ORDER.indexOf(b);
                return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
            });
            orderedTypes.map(type => [type, byType[type]]).forEach(([type, items]) => {
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

        // 商城货币：灵石 / 丹火 / 神识
        const SHOP_CURRENCIES = {
            coins:   { name: '灵石', icon: () => COIN_ICON },
            danhuo:  { name: '丹火', icon: () => DANHUO_ICON },
            shenshi: { name: '神识', icon: () => SHENSHI_ICON },
            daoguo:  { name: '道果', icon: () => DAOGUO_ICON }
        };
        let shopTab = 'coins';   // 当前商城标签：coins / danhuo / shenshi

        function setShopTab(tab) {
            if ((tab === 'danhuo' && !isDanhuoUnlocked()) || (tab === 'shenshi' && !isShenshiUnlocked()) || (tab === 'daoguo' && !isDaoguoUnlocked())) return;
            shopTab = tab;
            updateShop();
        }

        // 同一个物品可能出现在多个商店（如九叶莲），按货币区分
        function findShopItem(itemId, currency) {
            let found = null;
            const want = currency || shopTab;
            Object.values(GAME_CONFIG.shop).forEach(category => {
                const f = category.find(i => i.id === itemId && (i.currency || 'coins') === want);
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
            document.getElementById('buyIcon').innerHTML = item.icon;
            document.getElementById('buyName').textContent = item.name;
            document.getElementById('buyDesc').textContent = item.desc || '';
            const cur = item.currency || 'coins';
            document.getElementById('buyUnitPrice').textContent = `${item.price} ${SHOP_CURRENCIES[cur].name}`;
            document.getElementById('buyOwned').textContent = (gameState.player.inventory.find(i => i.id === itemId) || { qty: 0 }).qty;
            document.getElementById('buyCoins').textContent = Math.floor(gameState.player[cur] || 0);
            document.getElementById('buyCurLabel').textContent = SHOP_CURRENCIES[cur].name + ':';
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
            return Math.max(1, Math.min(999, Math.floor((gameState.player[item.currency || 'coins'] || 0) / item.price)));
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
            const cur = item.currency || 'coins';
            const name = SHOP_CURRENCIES[cur].name;
            const have = gameState.player[cur] || 0;
            const btn = document.getElementById('buyConfirmBtn');
            btn.textContent = `购买 ${q} 份（${total} ${name}）`;
            btn.disabled = total > have;
            document.getElementById('buyTotalHint').textContent = total > have ? `${name}不足` : '';
        }

        function confirmBuy() {
            const modal = document.getElementById('buyModal');
            const q = Math.max(1, Math.min(999, parseInt(document.getElementById('buyQty').value, 10) || 1));
            if (buyItem(modal.dataset.shopId, modal.dataset.itemId, q)) {
                // 买完更新对话框里的持有数量与灵石，方便继续买；不够钱时自动收起
                const cur = (findShopItem(modal.dataset.itemId) || {}).currency || 'coins';
                document.getElementById('buyOwned').textContent = (gameState.player.inventory.find(i => i.id === modal.dataset.itemId) || { qty: 0 }).qty;
                document.getElementById('buyCoins').textContent = Math.floor(gameState.player[cur] || 0);
                changeBuyQty(0);
            }
        }

        function buyItem(shopId, itemId, qty = 1) {
            let item = null;
            let price = 0;

            // 查找商品（同一物品可能在多个商店，按当前商城标签的货币区分）
            Object.values(GAME_CONFIG.shop).forEach(category => {
                const found = category.find(i => i.id === itemId && (i.currency || 'coins') === shopTab);
                if (found) {
                    item = found;
                    price = found.price;
                }
            });

            if (!item) return;
            const cur = item.currency || 'coins';
            const curName = SHOP_CURRENCIES[cur].name;

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

            // 检查货币
            if ((gameState.player[cur] || 0) < price) {
                showNotification(`${curName}不足！需要${price}，拥有${Math.floor(gameState.player[cur] || 0)}`, '#c4483a', 'error');
                return;
            }

            // 只有普通商品可以一次买多个；独一无二的固定按 1 个
            if (!isBulkBuyable(item)) qty = 1;
            qty = Math.max(1, Math.floor(qty));
            const totalPrice = price * qty;
            if ((gameState.player[cur] || 0) < totalPrice) {
                showNotification(`${curName}不足！需要${totalPrice}，拥有${Math.floor(gameState.player[cur] || 0)}`, '#c4483a', 'error');
                return false;
            }
            price = totalPrice;

            // 扣款
            gameState.player[cur] -= price;

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
                } else if (itemId === 'daoze_slot2' || itemId === 'daoze_slot3') {
                    showNotification('✨ 已解锁新的道基槽位！去「装备」界面镶嵌道则', '#6f9c8a');
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
                const units = qty * (item.bundle || 1);   // bundle：一份含多个（如「灵芝羹 ×4」）
                if (!addToInventory(itemId, units)) {
                    gameState.player[cur] += price;   // 背包放不下：退款
                    return false;
                }
                showNotification(`购买成功：${GAME_CONFIG.items[itemId].name} ×${units}`, '#6f9c8a');
            }

            trackQuest('buy');
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
                materials: '🪨 材料',
                arts: '📜 功法',
                special: '✨ 特殊',
                danhuo_shop: '🔥 丹火商品',
                shenshi_shop: '👁️ 神识商品',
                daoguo_shop: '🍎 道果商品'
            };

            // 商城标签：灵石商城 / 丹火商城（金丹起）/ 神识商城（元婴起）
            if ((shopTab === 'danhuo' && !isDanhuoUnlocked()) || (shopTab === 'shenshi' && !isShenshiUnlocked()) || (shopTab === 'daoguo' && !isDaoguoUnlocked())) shopTab = 'coins';
            const tabsEl = document.getElementById('shopTabs');
            if (tabsEl) {
                const tabs = [['coins', true], ['skills', true], ['danhuo', isDanhuoUnlocked()], ['shenshi', isShenshiUnlocked()], ['daoguo', isDaoguoUnlocked()]].filter(t => t[1]);
                tabsEl.style.display = '';
                tabsEl.innerHTML = tabs.map(([k]) => `<button type="button" class="shop-tab${k === shopTab ? ' active' : ''}" onclick="setShopTab('${k}')">${k === 'skills' ? '🏛 技能商店' : `${SHOP_CURRENCIES[k].icon()} ${SHOP_CURRENCIES[k].name}商城`}</button>`).join('');
            }
            const balEl = document.getElementById('shopBalance');
            const balKey = shopTab === 'skills' ? 'coins' : shopTab;   // 技能商店用灵石
            if (balEl) balEl.innerHTML = `${SHOP_CURRENCIES[balKey].icon()} ${SHOP_CURRENCIES[balKey].name}: <span ${balKey === 'coins' ? 'id="shopCoin"' : ''}>${Math.floor(gameState.player[balKey] || 0)}</span>`;
            if (shopTab === 'skills') { renderSkillShop(shopContainer); return; }

            // 之前这里有一份独立写死的 realmNames 数组（只到元婴圆满就没往下写了，且没跟着 v6.89 练气拆13层更新），
            // 算出来的 currentRealmName 在这个函数里其实没被用到——是死代码，一并清掉，都统一用 getRealmName()
            const currentRealmIdx = gameState.player.realmIndex;

            // 灵石 / 丹火 / 神识 / 道果商城顶部：该货币的全部强化（与丹火 / 神识技能页里的相同）
            if (shopTab === 'coins' || shopTab === 'danhuo' || shopTab === 'shenshi' || shopTab === 'daoguo') {
                const box = document.createElement('div');
                box.style.cssText = 'grid-column: 1/-1;';
                const usesTitle = { coins: '💎 灵石强化', danhuo: '🔥 丹火强化', shenshi: '👁️ 神识强化', daoguo: '🍎 道果强化' }[shopTab];
                const usesHtml = { coins: coinRefineUsesHtml, danhuo: danhuoUsesHtml, shenshi: shenshiUsesHtml, daoguo: daoguoUsesHtml }[shopTab]();
                box.innerHTML = `<div class="shop-section-title">${usesTitle}</div>${usesHtml}`;
                shopContainer.appendChild(box);
            }

            Object.entries(GAME_CONFIG.shop).forEach(([category, allItems]) => {
                const items = allItems.filter(i => (i.currency || 'coins') === shopTab);   // 只显示当前标签货币的商品
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
                        : `${SHOP_CURRENCIES[item.currency || 'coins'].icon()} ${item.price} ${SHOP_CURRENCIES[item.currency || 'coins'].name}`;
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

        const REALM_STAT_COMPOUND = 1.03;   // 生命 / 攻击 / 防御每境界额外复利系数（速度不变）

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
            // - 以上三项再乘 REALM_STAT_COMPOUND^境界（v6.40）
            // - 速度 +30%/级（战斗体验）
            // v6.40：在线性增长上再乘一个每境界 +3% 的复利系数，使高境界的每次突破提升更明显（线性增长的相对提升越往后越小）
            const realmGrowth = Math.pow(REALM_STAT_COMPOUND, realmIndex);
            const hpMultiplier = (1 + realmIndex * 0.40) * realmGrowth;
            const atkMultiplier = (1 + realmIndex * 0.30) * realmGrowth;
            const defMultiplier = (1 + realmIndex * 0.25) * realmGrowth;
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
            // 淬炼：武器 / 护甲 / 饰品各自 +4%/级（丹火淬炼台），炼器等级 +0.5%/级（SKILL_LEVEL_EFFECTS.forging）
            const forgeMult = SKILL_LEVEL_EFFECTS.forging.formula((gameState.skills.forging || {}).level || 1) * (1 + getMod('gearPct'));   // 炼器设施：装备属性
            const weaponMult = (1 + TEMPER_PER_LEVEL * getTemper('weapon')) * forgeMult;
            const armorMult = (1 + TEMPER_PER_LEVEL * getTemper('armor')) * forgeMult;
            const jewelryMult = (1 + TEMPER_PER_LEVEL * getTemper('jewelry')) * forgeMult;

            if (weapon && GAME_CONFIG.items[weapon]?.stats) {
                Object.entries(GAME_CONFIG.items[weapon].stats).forEach(([stat, value]) => {
                    if (totalStats.hasOwnProperty(stat)) {
                        totalStats[stat] += Math.floor(value * weaponMult);
                    }
                });
            }

            if (armor && GAME_CONFIG.items[armor]?.stats) {
                Object.entries(GAME_CONFIG.items[armor].stats).forEach(([stat, value]) => {
                    if (totalStats.hasOwnProperty(stat)) {
                        totalStats[stat] += Math.floor(value * armorMult);
                    }
                });
            }

            jewelry.forEach(jewelryId => {
                if (GAME_CONFIG.items[jewelryId]?.stats) {
                    Object.entries(GAME_CONFIG.items[jewelryId].stats).forEach(([stat, value]) => {
                        if (totalStats.hasOwnProperty(stat)) {
                            totalStats[stat] += Math.floor(value * jewelryMult);
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
            const mobileCoin = document.getElementById('mobileCoinAmount');
            if (mobileCoin) mobileCoin.textContent = gameState.player.coins;
            updateCurrencyChips();
        }

        // 手动进入战斗后把战斗界面滚到可见处（手机上战斗区域列表很长，战斗界面在最底下，点进去看不到任何变化）；
        // 撤退 / 被击败回到列表时滚回顶部
        function scrollBattleIntoView() {
            const el = document.getElementById('battleContainer');
            if (el && !el.classList.contains('hidden')) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        function scrollMainToTop() {
            const main = document.getElementById('main');
            if (main && main.scrollTo) main.scrollTo({ top: 0, behavior: 'smooth' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

            // 判断是否为大境界突破：v6.89 练气改13层后不再是均匀的 %4===0，改用显式列表
            const isMajorBreakthrough = MAJOR_BREAKTHROUGH_INDICES.has(realmIndex);

            document.getElementById('btCurrentRealm').textContent = currentRealm.name;
            document.getElementById('btNextRealm').textContent = nextRealm ? nextRealm.name : '大道尽头';

            // 隐藏丹药需求区域
            document.getElementById('btPillRequirement').style.display = 'none';

            if (nextRealm && nextRealm.xianqiaoReq) {
                // 真仙境两次突破：不看修为/丹药，看仙窍数量（12窍飞升真仙初期，24窍圆满真仙后期）
                document.getElementById('btModalTitle').textContent = `✨ 突破${nextRealm.name} ✨`;
                const have = getXianqiao(), need = nextRealm.xianqiaoReq;
                document.getElementById('btBreakthroughType').textContent = `以窍代修：仙窍 ${have}/${need}`;
                const button = document.getElementById('btButton');
                button.textContent = have >= need ? '🌟 飞升突破 🌟' : `仙窍不足（${have}/${need}）`;
            } else if (isMajorBreakthrough && nextRealm) {
                // 大境界突破
                document.getElementById('btModalTitle').textContent = `✨ 突破${nextRealm ? nextRealm.name : '大道尽头'} ✨`;
                if (realmIndex === 13) {
                    // 练气十三层→筑基初期：丹药之外还要洗髓易经
                    document.getElementById('btBreakthroughType').textContent = gameState.player.marrowCleansed
                        ? '需丹药辅助（洗髓易经已完成 ✅）'
                        : '需丹药辅助 + 先完成「洗髓易经」（修炼页，尚未完成 ❌）';
                } else if (realmIndex === 17) {
                    // 结丹突破：原著设定成功率较低，会失败、要重试、消耗可变数量丹药
                    document.getElementById('btBreakthroughType').textContent = `需丹药辅助，结丹成功率 ${Math.round(JIEDAN_SUCCESS_RATE * 100)}%（失败会损失丹药，可重试）`;
                } else {
                    document.getElementById('btBreakthroughType').textContent = '需丹药辅助';
                }

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
                const pillReady = pillReq && (gameState.player.inventory.find(item => item.id === pillReq.pillId)?.qty || 0) >= pillReq.qty;
                if (realmIndex === 13 && pillReady && !gameState.player.marrowCleansed) {
                    button.textContent = '未完成洗髓易经';
                } else if (pillReady) {
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

            renderTribulationGate();
            document.getElementById('breakthroughModal').classList.add('show');
        }

        function closeBreakthroughModal() {
            document.getElementById('breakthroughModal').classList.remove('show');
        }

        function attemptBreakthrough() {
            const realmIndex = gameState.player.realmIndex;
            const currentRealm = GAME_CONFIG.realms[realmIndex];
            const nextRealm = GAME_CONFIG.realms[realmIndex + 1];

            // 真仙境两次突破（大乘圆满→真仙初期需12窍，真仙初期→真仙后期需24窍）改用仙窍数量判定，
            // 不再看修为——nextRealm.xianqiaoReq 有值就说明这次突破走仙窍这条线
            if (nextRealm && nextRealm.xianqiaoReq) {
                if (getXianqiao() < nextRealm.xianqiaoReq) {
                    showNotification(`仙窍不足：已打通 ${getXianqiao()}/${nextRealm.xianqiaoReq}，去「修炼」页做「开辟仙窍」`, '#c98a3e', 'warning');
                    return;
                }
            } else if (gameState.player.cultivationXP < currentRealm.nextReq) {
                // 检查修为是否足够
                showNotification('修为不足，无法突破', '#c98a3e', 'warning');
                return;
            }

            // 已是最高境界，没有下一境界可突破
            if (!GAME_CONFIG.realms[realmIndex + 1]) {
                showNotification('已至当前大道尽头，后续境界敬请期待', '#c98a3e', 'warning');
                closeBreakthroughModal();
                return;
            }

            // 合体圆满（FUSION_REQUIRED_REALM）起必须已合道才能晋升下一境界（大乘期，预留）
            if (realmIndex >= FUSION_REQUIRED_REALM && !isFused()) {
                showNotification('晋升下一境界必须先合道（在「道果」页面选择合道，不可逆）', '#c98a3e', 'warning');
                return;
            }

            // 炼虚 21-24：每个小境界先渡过对应的天劫才能突破（见「渡劫」入口）
            if (TRIBULATION_REALMS.includes(realmIndex) && !hasSurvivedTribulation(realmIndex)) {
                showNotification('修为已满，但还未渡过本境界的天劫，请先「渡劫」', '#c98a3e', 'warning');
                showBreakthroughModal();
                return;
            }

            // 练气十三层→筑基初期：原著设定除了筑基丹还要「洗髓易经」改善凡人体质，两个条件都要满足
            if (realmIndex === 13 && !gameState.player.marrowCleansed) {
                showNotification('必须先完成「洗髓易经」才能突破筑基（去「修炼」页）', '#c98a3e', 'warning');
                return;
            }

            // 判断是否为大境界突破：v6.89 练气改13层后不再是均匀的 %4===0，改用显式列表
            const isMajorBreakthrough = MAJOR_BREAKTHROUGH_INDICES.has(realmIndex);

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
        //   筑基 = 筑基台（地上画出八卦阵纹，三层圆台依次升起，一道金光贯天而起）
        //   金丹 = 金丹凝结（金色光点旋转汇聚成丹，光环扩散）
        //   元婴 = 元神出窍（青白色婴儿元神从丹田升起，拖出光带）
        //   化神 = 天地法则（雷霆劈落、八种法则符文环绕旋转、屏幕震动）
        // 用 canvas 绘制，不依赖外部资源；尊重「减少动态效果」；设置里可关闭。
        // v6.89：key=1（凡人→练气一层）不变，其余原索引5/9/13/17/21/25/29/33 整体 +9 → 14/18/22/26/30/34/38/42
        const BREAKTHROUGH_FX = {
            1:  { name: '练气', line: '引气入体，踏上仙途', kind: 'qi', dur: 3.8 },   // 凡人 → 练气一层：踏入修仙之门
            14: { name: '筑基', line: '根基已成，百脉皆通', kind: 'foundation', dur: 4.2 },
            18: { name: '金丹', line: '丹成九转，金光内蕴', kind: 'core', dur: 4.2 },
            22: { name: '元婴', line: '元神出窍，神游太虚', kind: 'nascent', dur: 4.4 },
            26: { name: '化神', line: '天地法则，尽在掌中', kind: 'law', dur: 4.6 },
            30: { name: '炼虚', line: '化虚为实，道则显形', kind: 'voidfx', dur: 5.0 },
            34: { name: '合体', line: '天人合一，万法归宗', kind: 'unity', dur: 4.8 },
            38: { name: '大乘', line: '元婴离体，法则随心', kind: 'dacheng', dur: 5.4 },
            42: { name: '飞升', line: '仙窍打通，肉身化道', kind: 'dacheng', dur: 5.6 }
        };
        // 灵根对应的颜色（灵气入体特效用你自己的灵根色）
        const ROOT_FX_COLORS = { metal: '#d8c078', wood: '#7fae9a', water: '#7d9bb5', fire: '#d9614f', earth: '#b08d5a', wind: '#b7c9c2', thunder: '#b39ddb', ice: '#a8d8e8' };
        const LAW_RUNES = [['金', '#d8c078'], ['木', '#7fae9a'], ['水', '#7d9bb5'], ['火', '#d9614f'], ['土', '#b08d5a'], ['风', '#b7c9c2'], ['雷', '#b39ddb'], ['冰', '#a8d8e8']];
        let fxState = null;

        function stopBreakthroughFx() {
            if (!fxState) return;
            cancelAnimationFrame(fxState.raf);
            clearTimeout(fxState.timer);
            fxState.el.remove();
            document.body.classList.remove('fx-shake');
            const onDone = fxState.onDone;   // 特效自然播完、被点击跳过、或者干脆没播放，都从这里统一退出
            fxState = null;
            if (onDone) onDone();
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

        // 凡人 → 练气：天地灵气化作细丝，沿螺旋线涌入体内，点亮丹田，随后以你自己灵根的颜色绽放
        function fxDrawQi(ctx, W, H, t, s) {
            const cx = W / 2, cy = H * 0.32;
            const fade = t > 3.2 ? Math.max(0, (3.8 - t) / 0.6) : 1;
            const hex = ROOT_FX_COLORS[gameState.player.spiritRoot] || '#7fae9a';
            const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(', ');
            ctx.fillStyle = `rgba(8, 13, 11, ${0.6 * Math.min(1, t / 0.4) * fade})`;
            ctx.fillRect(0, 0, W, H);
            if (!s.p) s.p = Array.from({ length: 120 }, () => ({ a: fxRand(0, 6.28), d: fxRand(0.25, 1) * Math.max(W, H) * 0.6, w: fxRand(1.2, 3.2), delay: fxRand(0, 1.3), len: fxRand(0.05, 0.11) }));
            s.p.forEach(q => {
                const k = fxEase((t - q.delay) / 1.9);
                if (k <= 0 || k >= 1) return;
                const pt = kk => [cx + Math.cos(q.a + kk * q.w * 2.2) * q.d * (1 - kk), cy + Math.sin(q.a + kk * q.w * 2.2) * q.d * (1 - kk)];
                // 沿螺旋线画一小段弯曲的拖尾（多段折线近似曲线），越靠近中心越亮
                ctx.strokeStyle = `rgba(${rgb}, ${0.8 * (0.35 + k * 0.65) * fade})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                for (let j = 0; j <= 8; j++) {
                    const [x, y] = pt(Math.max(0, k - q.len * (1 - j / 8)));
                    if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.stroke();
            });
            const glow = fxEase((t - 1.2) / 1.2);
            if (glow > 0) {
                const rr = 20 + glow * 46 + Math.sin(t * 8) * 2;
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr * 2.4);
                g.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`);
                g.addColorStop(0.3, `rgba(${rgb}, ${0.75 * fade})`);
                g.addColorStop(1, `rgba(${rgb}, 0)`);
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rr * 2.4, 0, Math.PI * 2); ctx.fill();
            }
            [2.1, 2.5].forEach((t0, i) => {
                const k = (t - t0) / 1.1;
                if (k <= 0 || k >= 1) return;
                ctx.strokeStyle = `rgba(${rgb}, ${0.8 * (1 - k) * fade})`;
                ctx.lineWidth = 4 - i * 1.5;
                ctx.beginPath(); ctx.arc(cx, cy, 50 + fxEase(k) * Math.max(W, H) * 0.4, 0, Math.PI * 2); ctx.stroke();
            });
            if (t > 2.1) {
                if (!s.b) s.b = Array.from({ length: 36 }, () => ({ a: fxRand(0, 6.28), v: fxRand(0.15, 0.7), r: fxRand(1.5, 3.2) }));
                const k = Math.min(1, (t - 2.1) / 1.5);
                s.b.forEach(b => {
                    ctx.fillStyle = `rgba(${rgb}, ${0.9 * (1 - k) * fade})`;
                    ctx.beginPath(); ctx.arc(cx + Math.cos(b.a) * fxEase(k) * Math.max(W, H) * 0.5 * b.v, cy + Math.sin(b.a) * fxEase(k) * Math.max(W, H) * 0.5 * b.v, b.r, 0, Math.PI * 2); ctx.fill();
                });
            }
        }

        // 筑基：筑基台 —— 地上先画出八卦阵纹（天圆地方），三层圆台依次升起，最后一道金光贯天而起
        function fxDrawFoundation(ctx, W, H, t, s) {
            const cx = W / 2, cy = H * 0.8;
            const Rx = Math.min(W * 0.42, 430), Ry = Rx * 0.3;
            const fade = t > 3.7 ? Math.max(0, (4.4 - t) / 0.7) : 1;
            ctx.fillStyle = `rgba(14, 12, 8, ${0.62 * Math.min(1, t / 0.5) * fade})`;
            ctx.fillRect(0, 0, W, H);
            // 地面微光
            const gl = ctx.createRadialGradient(cx, cy, 0, cx, cy, Rx * 1.3);
            gl.addColorStop(0, `rgba(150, 118, 64, ${0.28 * fade})`);
            gl.addColorStop(1, 'rgba(150, 118, 64, 0)');
            ctx.save(); ctx.translate(0, 0); ctx.fillStyle = gl;
            ctx.beginPath(); ctx.ellipse(cx, cy, Rx * 1.3, Ry * 1.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();

            // 阵纹：外圈弧线逐渐画满，刻度随之出现
            const ring = fxEase((t - 0.1) / 1.1);
            ctx.strokeStyle = `rgba(200, 168, 100, ${0.9 * fade})`;
            ctx.lineWidth = 3;
            ctx.beginPath(); ctx.ellipse(cx, cy, Rx, Ry, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring); ctx.stroke();
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 48; i++) {
                if (i / 48 > ring) break;
                const a = -Math.PI / 2 + (i / 48) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(a) * Rx, cy + Math.sin(a) * Ry);
                ctx.lineTo(cx + Math.cos(a) * Rx * 0.94, cy + Math.sin(a) * Ry * 0.94);
                ctx.stroke();
            }
            // 内圈与「地方」：一个内接的菱形（透视下的方），线条依次画出
            const inner = fxEase((t - 0.8) / 1.0);
            if (inner > 0) {
                ctx.strokeStyle = `rgba(176, 141, 90, ${0.85 * fade})`;
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.ellipse(cx, cy, Rx * 0.68, Ry * 0.68, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * inner); ctx.stroke();
                const r = 0.68;
                const pts = [[0, -Ry * r], [Rx * r, 0], [0, Ry * r], [-Rx * r, 0], [0, -Ry * r]];
                ctx.beginPath(); ctx.moveTo(cx + pts[0][0], cy + pts[0][1]);
                const total = 4 * inner;
                for (let i = 1; i <= 4; i++) {
                    const seg = Math.min(1, Math.max(0, total - (i - 1)));
                    if (seg <= 0) break;
                    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
                    ctx.lineTo(cx + x0 + (x1 - x0) * seg, cy + y0 + (y1 - y0) * seg);
                }
                ctx.stroke();
            }
            // 八卦：环绕阵盘依次亮起
            ctx.font = `bold ${Math.round(Math.min(W, H) * 0.045)}px KaiTi, STKaiti, serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'].forEach((ch, i) => {
                const k = fxEase((t - 0.45 - i * 0.11) / 0.5);
                if (k <= 0) return;
                const a = -Math.PI / 2 + (i / 8) * Math.PI * 2;
                ctx.save();
                ctx.globalAlpha = k * fade;
                ctx.shadowColor = 'rgba(220, 180, 100, 0.9)'; ctx.shadowBlur = 12;
                ctx.fillStyle = '#e2c27a';
                ctx.fillText(ch, cx + Math.cos(a) * Rx * 1.13, cy + Math.sin(a) * Ry * 1.28);
                ctx.restore();
            });
            // 三层圆台（圜丘）：由下而上依次从地面升起
            const tiers = [[0.56, 26], [0.4, 26], [0.24, 26]];
            let base = cy;
            tiers.forEach(([rf, h], i) => {
                const k = fxEase((t - 1.5 - i * 0.4) / 0.6);
                const rx = Rx * rf, ry = Ry * rf;
                const lift = (1 - k) * 46;
                const yb = base + lift, yt = yb - h;
                base -= h;
                if (k <= 0) return;
                ctx.globalAlpha = k * fade;
                const g = ctx.createLinearGradient(0, yt, 0, yb);
                g.addColorStop(0, 'rgba(170, 136, 84, 1)');
                g.addColorStop(1, 'rgba(70, 56, 36, 1)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.moveTo(cx - rx, yt);
                ctx.lineTo(cx - rx, yb); ctx.ellipse(cx, yb, rx, ry, 0, Math.PI, 0, true);
                ctx.lineTo(cx + rx, yt); ctx.ellipse(cx, yt, rx, ry, 0, 0, Math.PI, false);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = 'rgba(214, 184, 118, 1)';
                ctx.beginPath(); ctx.ellipse(cx, yt, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = 'rgba(70, 52, 28, 0.9)'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.ellipse(cx, yt, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.globalAlpha = 1;
            });
            // 落尘
            if (!s.dust) s.dust = Array.from({ length: 70 }, () => ({ a: fxRand(0, 6.28), r: fxRand(0.2, 1.05), v: fxRand(24, 80), size: fxRand(1, 2.8), d: fxRand(0.6, 3) }));
            s.dust.forEach(d => {
                if (t < d.d) return;
                const life = (t - d.d) / 1.8;
                if (life > 1) return;
                ctx.fillStyle = `rgba(214, 184, 118, ${0.6 * (1 - life) * fade})`;
                ctx.beginPath(); ctx.arc(cx + Math.cos(d.a) * Rx * d.r, cy + Math.sin(d.a) * Ry * d.r - life * d.v, d.size, 0, Math.PI * 2); ctx.fill();
            });
            // 台成之后，一道金光自台顶贯天而起，并有一圈光环扩散
            const beam = fxEase((t - 2.7) / 0.5);
            if (beam > 0) {
                const topY = base;
                for (let i = 0; i < 4; i++) {
                    const w = (54 - i * 12) * (0.6 + 0.4 * beam);
                    const g = ctx.createLinearGradient(0, topY, 0, 0);
                    g.addColorStop(0, `rgba(255, 232, 160, ${(0.32 + i * 0.12) * beam * fade})`);
                    g.addColorStop(1, 'rgba(255, 232, 160, 0)');
                    ctx.fillStyle = g;
                    ctx.fillRect(cx - w / 2, 0, w, topY);
                }
                const wk = (t - 2.7) / 1.1;
                if (wk < 1) {
                    ctx.strokeStyle = `rgba(255, 232, 160, ${0.9 * (1 - wk) * fade})`;
                    ctx.lineWidth = 4 * (1 - wk) + 1;
                    ctx.beginPath(); ctx.ellipse(cx, cy, Rx * (0.3 + fxEase(wk) * 1.4), Ry * (0.3 + fxEase(wk) * 1.4), 0, 0, Math.PI * 2); ctx.stroke();
                }
            }
            document.body.classList.toggle('fx-shake', t > 1.5 && t < 2.3);
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

        // 合体：一金一青两股气流从两侧盘旋汇入中心，合成一枚缓缓转动的阴阳圆盘，最后向外震开一圈光环
        function fxDrawUnity(ctx, W, H, t, s) {
            const cx = W / 2, cy = H * 0.32, R = Math.min(W, H) * 0.16;
            const fade = t > 4.1 ? Math.max(0, (4.8 - t) / 0.7) : 1;
            ctx.fillStyle = `rgba(8, 10, 14, ${0.7 * Math.min(1, t / 0.4) * fade})`;
            ctx.fillRect(0, 0, W, H);
            const conv = fxEase(t / 2.2);
            [[0, '232, 200, 110'], [Math.PI, '120, 210, 220']].forEach(([off, col]) => {
                for (let i = 0; i < 46; i++) {
                    const k = i / 46, ang = off + (1 - conv) * 5 + k * 4.2 - t * 1.6;
                    const dist = (1 - conv * 0.92) * Math.max(W, H) * 0.42 * (0.25 + k * 0.75) + R * 0.1;
                    const x = cx + Math.cos(ang) * dist, y = cy + Math.sin(ang) * dist;
                    ctx.fillStyle = `rgba(${col}, ${(0.15 + 0.7 * (1 - k)) * fade})`;
                    ctx.beginPath(); ctx.arc(x, y, 2.6 - k * 1.6, 0, Math.PI * 2); ctx.fill();
                }
            });
            const disc = fxEase((t - 1.8) / 1.0);
            if (disc > 0) {
                const rr = R * disc, rot = t * 1.1;
                ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.globalAlpha = fade;
                const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rr * 1.9);
                g.addColorStop(0, 'rgba(255, 244, 210, 0.55)'); g.addColorStop(1, 'rgba(200, 160, 80, 0)');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rr * 1.9, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#e8c86e'; ctx.beginPath(); ctx.arc(0, 0, rr, -Math.PI / 2, Math.PI / 2); ctx.fill();
                ctx.fillStyle = '#78d2dc'; ctx.beginPath(); ctx.arc(0, 0, rr, Math.PI / 2, Math.PI * 1.5); ctx.fill();
                ctx.fillStyle = '#e8c86e'; ctx.beginPath(); ctx.arc(0, -rr / 2, rr / 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#78d2dc'; ctx.beginPath(); ctx.arc(0, rr / 2, rr / 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#78d2dc'; ctx.beginPath(); ctx.arc(0, -rr / 2, rr / 7, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#e8c86e'; ctx.beginPath(); ctx.arc(0, rr / 2, rr / 7, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = 'rgba(255, 244, 210, 0.85)'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI * 2); ctx.stroke();
                ctx.restore();
            }
            [3.0, 3.4].forEach((t0, i) => {
                const k = (t - t0) / 1.2;
                if (k <= 0 || k >= 1) return;
                ctx.strokeStyle = `rgba(${i ? '120, 210, 220' : '240, 210, 120'}, ${0.85 * (1 - k)})`;
                ctx.lineWidth = 5 * (1 - k) + 1;
                ctx.beginPath(); ctx.arc(cx, cy, R + fxEase(k) * Math.max(W, H) * 0.55, 0, Math.PI * 2); ctx.stroke();
            });
        }

        // 炼虚：虚空裂开一道口子，碎片向中心汇聚成一枚道则宝石，最后宝石炸裂成光尘
        function fxDrawVoid(ctx, W, H, t, s) {
            const cx = W / 2, cy = H * 0.32, R = Math.min(W, H) * 0.15;
            const fade = t > 4.3 ? Math.max(0, (5.0 - t) / 0.7) : 1;
            ctx.fillStyle = `rgba(6, 6, 12, ${0.75 * Math.min(1, t / 0.4) * fade})`;
            ctx.fillRect(0, 0, W, H);
            // 裂缝：从中心向四周延伸的几道紫色闪光
            if (!s.cracks) s.cracks = Array.from({ length: 6 }, (_, i) => {
                const a0 = (i / 6) * Math.PI * 2 + fxRand(-0.3, 0.3);
                let x = cx, y = cy; const pts = [[x, y]];
                for (let k = 0; k < 5; k++) { x += Math.cos(a0) * fxRand(30, 55); y += Math.sin(a0) * fxRand(30, 55); pts.push([x, y]); }
                return pts;
            });
            const crackK = Math.min(1, t / 0.6);
            if (crackK > 0) {
                s.cracks.forEach(pts => {
                    ctx.strokeStyle = `rgba(200, 170, 255, ${0.8 * fade * (1 - Math.max(0, (t - 0.8) / 0.5))})`;
                    ctx.lineWidth = 2; ctx.shadowColor = 'rgba(160, 120, 255, 0.9)'; ctx.shadowBlur = 14;
                    ctx.beginPath();
                    const n = Math.max(1, Math.round(pts.length * crackK));
                    pts.slice(0, n).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
                    ctx.stroke(); ctx.shadowBlur = 0;
                });
            }
            // 虚晶碎片向中心汇聚
            if (!s.shards) s.shards = Array.from({ length: 42 }, () => ({ a: fxRand(0, 6.28), d: fxRand(0.4, 1) * Math.max(W, H) * 0.5, w: fxRand(1.4, 3), r: fxRand(1.5, 3.2) }));
            const conv = fxEase((t - 0.5) / 1.7);
            s.shards.forEach(p => {
                const dist = p.d * (1 - conv), ang = p.a + conv * p.w * 2;
                const x = cx + Math.cos(ang) * dist, y = cy + Math.sin(ang) * dist;
                ctx.fillStyle = `rgba(200, 190, 255, ${0.85 * fade * (t < 2.3 ? 1 : Math.max(0, 1 - (t - 2.3) / 0.4))})`;
                ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
            });
            // 中心凝成道则宝石
            const gem = fxEase((t - 1.6) / 1.0);
            if (gem > 0) {
                const rr = R * gem, rot = t * 0.7;
                ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.globalAlpha = fade;
                const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rr * 2);
                g.addColorStop(0, 'rgba(220, 200, 255, 0.6)'); g.addColorStop(1, 'rgba(140, 100, 220, 0)');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rr * 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#c8b8f0';
                ctx.beginPath(); ctx.moveTo(0, -rr); ctx.lineTo(rr, -rr * 0.3); ctx.lineTo(rr * 0.6, rr); ctx.lineTo(-rr * 0.6, rr); ctx.lineTo(-rr, -rr * 0.3); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = 'rgba(255, 250, 255, 0.9)'; ctx.lineWidth = 1.6; ctx.stroke();
                ctx.restore();
            }
            // 宝石炸裂成光尘
            const burstK = (t - 3.0) / 1.3;
            if (burstK > 0 && burstK < 1) {
                if (!s.burst) s.burst = Array.from({ length: 36 }, () => ({ a: fxRand(0, 6.28), v: fxRand(0.3, 1) }));
                s.burst.forEach(p => {
                    ctx.fillStyle = `rgba(230, 216, 255, ${0.9 * (1 - burstK) * fade})`;
                    ctx.beginPath(); ctx.arc(cx + Math.cos(p.a) * fxEase(burstK) * Math.max(W, H) * 0.45 * p.v, cy + Math.sin(p.a) * fxEase(burstK) * Math.max(W, H) * 0.45 * p.v, 2.4, 0, Math.PI * 2); ctx.fill();
                });
                ctx.strokeStyle = `rgba(200, 170, 255, ${0.7 * (1 - burstK)})`;
                ctx.lineWidth = 4 * (1 - burstK) + 1;
                ctx.beginPath(); ctx.arc(cx, cy, R + fxEase(burstK) * Math.max(W, H) * 0.5, 0, Math.PI * 2); ctx.stroke();
            }
        }

        // 大乘：元婴离体升起，八种法则符文绕元婴旋转，最后金紫两色光芒汇聚炸裂——元婴离体、法则随心
        function fxDrawDacheng(ctx, W, H, t, s) {
            const cx = W / 2, cy = H * 0.34, R = Math.min(W, H) * 0.13;
            const fade = t > 4.7 ? Math.max(0, (5.4 - t) / 0.7) : 1;
            ctx.fillStyle = `rgba(10, 8, 14, ${0.72 * Math.min(1, t / 0.4) * fade})`;
            ctx.fillRect(0, 0, W, H);
            // 元婴离体：一道人形光影从下方升起，定格在中心
            const rise = fxEase(Math.min(1, t / 1.6));
            const by = H * 0.62 - rise * H * 0.28;
            if (rise > 0) {
                ctx.save(); ctx.globalAlpha = fade * (0.5 + rise * 0.5);
                const g = ctx.createRadialGradient(cx, by, 0, cx, by, R * 2.4);
                g.addColorStop(0, 'rgba(255, 244, 214, 0.55)'); g.addColorStop(1, 'rgba(200, 160, 240, 0)');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, by, R * 2.4, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#f3e6c8';
                ctx.beginPath(); ctx.arc(cx, by - R * 0.9, R * 0.4, 0, Math.PI * 2); ctx.fill();   // 头
                ctx.beginPath(); ctx.moveTo(cx - R * 0.5, by + R * 0.7); ctx.quadraticCurveTo(cx, by - R * 0.6, cx + R * 0.5, by + R * 0.7); ctx.closePath(); ctx.fill();   // 身
                ctx.restore();
            }
            // 八种法则符文绕元婴旋转
            const runeK = fxEase((t - 1.2) / 1.2);
            if (runeK > 0) {
                const rr = R * 3.2;
                ctx.font = `bold ${Math.round(Math.min(W, H) * 0.055)}px KaiTi, STKaiti, serif`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                LAW_RUNES.forEach(([ch, col], i) => {
                    const a = (i / 8) * Math.PI * 2 + t * 1.1;
                    ctx.save();
                    ctx.globalAlpha = runeK * fade;
                    ctx.shadowColor = col; ctx.shadowBlur = 16;
                    ctx.fillStyle = col;
                    ctx.fillText(ch, cx + Math.cos(a) * rr, by + Math.sin(a) * rr * 0.7);
                    ctx.restore();
                });
            }
            // 金紫两色光芒汇聚炸裂
            const burstK = (t - 3.3) / 1.6;
            if (burstK > 0 && burstK < 1) {
                if (!s.rays) s.rays = Array.from({ length: 40 }, () => ({ a: fxRand(0, 6.28), v: fxRand(0.4, 1), gold: Math.random() < 0.5 }));
                s.rays.forEach(p => {
                    ctx.fillStyle = p.gold ? `rgba(243, 211, 106, ${0.9 * (1 - burstK) * fade})` : `rgba(179, 157, 219, ${0.9 * (1 - burstK) * fade})`;
                    ctx.beginPath(); ctx.arc(cx + Math.cos(p.a) * fxEase(burstK) * Math.max(W, H) * 0.5 * p.v, by + Math.sin(p.a) * fxEase(burstK) * Math.max(W, H) * 0.5 * p.v, 2.8, 0, Math.PI * 2); ctx.fill();
                });
                ctx.strokeStyle = `rgba(243, 211, 106, ${0.75 * (1 - burstK)})`;
                ctx.lineWidth = 5 * (1 - burstK) + 1;
                ctx.beginPath(); ctx.arc(cx, by, R + fxEase(burstK) * Math.max(W, H) * 0.55, 0, Math.PI * 2); ctx.stroke();
            }
        }

        // 设置里的「突破特效回放」：只列出已经突破过的大境界（含凡人入练气）
        function renderFxReplay() {
            const box = document.getElementById('fxReplayList');
            if (!box) return;
            const reached = Object.keys(BREAKTHROUGH_FX).map(Number).filter(i => i <= gameState.player.realmIndex).sort((a, b) => a - b);
            box.innerHTML = reached.length
                ? reached.map(i => `<button class="btn btn-secondary fx-replay-btn" onclick="replayBreakthroughFx(${i})">▶ ${BREAKTHROUGH_FX[i].name}<small>${getRealmName(i)}</small></button>`).join('')
                : '<div class="settings-hint">还没有突破过大境界。突破后可以在这里回放对应的特效。</div>';
        }

        function replayBreakthroughFx(idx) {
            if (idx > gameState.player.realmIndex || !BREAKTHROUGH_FX[idx]) return;   // 只能回放已经突破过的
            playBreakthroughEffect(idx, true, true);
        }

        const FX_DRAWERS = { minor: fxDrawMinor, qi: fxDrawQi, foundation: fxDrawFoundation, core: fxDrawCore, nascent: fxDrawNascent, law: fxDrawLaw, unity: fxDrawUnity, voidfx: fxDrawVoid, dacheng: fxDrawDacheng };

        // 播放突破特效：newRealmIndex = 突破后的境界索引；major = 是否大境界突破
        // force = true：设置里「回放」时使用，即使关闭了突破特效也播放（不传 onDone，回放不触发境界解锁提示）
        // onDone：特效结束（播完 / 被跳过 / 特效被关闭直接跳过）后调用，performBreakthrough 用它来弹境界解锁提示，
        // 不用 setTimeout 猜时长——玩家随时可能点击跳过特效，猜的时长会不准
        function playBreakthroughEffect(newRealmIndex, major, force = false, onDone = null) {
            if (!force && gameState.settings && gameState.settings.breakthroughFx === false) { if (onDone) onDone(); return; }
            stopBreakthroughFx();
            const realmName = getRealmName(newRealmIndex);
            let cfg = major ? (BREAKTHROUGH_FX[newRealmIndex] || { name: realmName.slice(0, 2), line: '大道更进一步', kind: 'core', dur: 4.2 }) : null;
            if (cfg && cfg.kind === 'qi') cfg = { ...cfg, line: `${(SPIRIT_ROOT_EFFECTS[gameState.player.spiritRoot] || {}).name || '灵根'}觉醒，引气入体` };
            const dur = major ? cfg.dur : 1.6;
            const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const el = document.createElement('div');
            el.className = 'fx-overlay ' + (major ? 'fx-major fx-' + cfg.kind : 'fx-minor') + (reduce ? ' fx-reduced' : '');
            el.setAttribute('aria-hidden', 'true');
            el.innerHTML = (reduce ? '' : '<canvas class="fx-canvas"></canvas>') + (major
                ? `<div class="fx-text"><div class="fx-title">${cfg.name.split('').join(' ')}</div><div class="fx-sub">${realmName} · ${cfg.line}</div><div class="fx-skip">点击任意处跳过</div></div>`
                : `<div class="fx-text"><div class="fx-title">突 破</div><div class="fx-sub">${realmName}</div><div class="fx-seal">破</div></div>`);
            document.body.appendChild(el);
            fxState = { el, raf: 0, timer: 0, draw: null, dur, onDone };
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
            const wasMajor = MAJOR_BREAKTHROUGH_INDICES.has(gameState.player.realmIndex);   // 从大境界圆满突破；v6.89 改显式列表
            gameState.player.realmIndex = nextRealmIndex;
            gameState.player.cultivationXP = 0;
            calculateStats();
            if (gameState.player.stats.hp && gameState.player.stats.hp.max) gameState.player.stats.hp.current = gameState.player.stats.hp.max;   // 突破后气血充盈

            const newRealm = GAME_CONFIG.realms[nextRealmIndex];
            showNotification(`突破成功！当前境界：${newRealm.name}`, '#6f9c8a', 'success');

            closeBreakthroughModal();
            updateUI();
            saveGame();
            // 凡人 → 练气也是「入道」大事件；特效结束后再弹境界解锁提示，两个视觉效果不抢注意力
            playBreakthroughEffect(nextRealmIndex, wasMajor || nextRealmIndex === 1, false, () => showRealmUnlockModal(nextRealmIndex));
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

            // 结丹突破（筑基圆满→金丹初期）：原著设定成功率不高，韩立式的普通修士要试很多次、天才一两次就过。
            // 只对这一次突破生效——丹药已经扣了，失败不退境界、不退修为，只是要再炼丹药重试
            if (realmIndex === 17 && Math.random() >= JIEDAN_SUCCESS_RATE) {
                showNotification(`⚡ 结丹失败！${requirement.pillName} 已耗尽但未能凝丹，境界未跌，再炼丹药即可重新尝试`, '#c4483a', 'error');
                updateUI();
                saveGame();
                return;
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
            // 页面在后台时，后台的自动存档不能刷新「最后活跃时间」，否则回来时只按最后一次自动存档算离线，离线收益几乎为 0
            // （切到后台那一刻的时间由 visibilitychange 显式记录）
            if (!document.hidden) gameState.lastActiveTime = gameState.lastSaveTime;
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

        // v6.63：炼丹 / 炼器 / 灵田 / 采矿改用新经验曲线，旧存档按累计经验折算（不丢进度，超过 Lv60 的部分作废）
        function migrateWorkSkillCurve() {
            if (!gameState.skills || gameState.workCurve === 2) return;
            WORK_SKILLS.forEach(name => {
                const sk = gameState.skills[name];
                if (!sk) return;
                let total = sk.exp || 0;
                for (let l = 1; l < (sk.level || 1); l++) total += Math.round(100 * Math.pow(l, 1.8));
                let level = 1;
                while (level < WORK_SKILL_MAX_LEVEL && total >= skillExpNeeded(level, name)) { total -= skillExpNeeded(level, name); level++; }
                sk.level = level;
                sk.exp = level >= WORK_SKILL_MAX_LEVEL ? 0 : Math.floor(total);
            });
            gameState.workCurve = 2;
        }

        // v6.89：练气期从4段改13层，原索引5起的全部境界整体后移9位。老存档的 realmIndex 是按旧编号存的，
        // 必须映射到新编号，不然同一个数字现在指向完全不同（更早）的境界，老玩家读档会直接"境界倒退"好几个大境界。
        // cultivationXP 迁移后清零重新攒——旧的进度是按旧 nextReq 攒的，新境界（尤其被拆细的练气期）nextReq
        // 完全不是一回事，硬凑一个"差不多"的百分比比直接清零更容易出边界问题（比如凑出来的值超过新 nextReq）
        function migrateRealmLayout() {
            if (gameState.realmLayoutVersion === 2) return;
            const P = gameState.player;
            if (P && typeof P.realmIndex === 'number') {
                const oldToNew = { 0: 0, 1: 1, 2: 5, 3: 9, 4: 13 };
                P.realmIndex = (P.realmIndex in oldToNew) ? oldToNew[P.realmIndex] : (P.realmIndex >= 5 ? P.realmIndex + 9 : P.realmIndex);
                P.cultivationXP = 0;
            }
            gameState.realmLayoutVersion = 2;
        }

        function migrateGameData() {
            // 版本迁移函数：自动更新旧数据以支持新配方
            if (!gameState.version) gameState.version = 0;
            invalidateLawTotals();   // 读档 / 导入后重新计算悟道法则加成
            migrateRealmLayout();
            migrateWorkSkillCurve();
            gameState.workSpeedMultiplier = 1;   // 旧版把孤儿的 5% 存在这里且与灵玉脱钩；现在只由装备的灵玉提供（getWorkSpeedMultiplier）
            migrateEquipmentSlots();
            if (gameState.tutorialSeen === undefined) gameState.tutorialSeen = true;   // 已有存档的玩家不再自动弹出引导
            // 新手任务：境界不超过练气初期的老存档从头开始；已经玩了一阵的直接视为完成，不再显示任务条
            if (!gameState.quests && gameState.player) {
                gameState.quests = gameState.player.realmIndex <= 1 ? freshQuestState() : { index: NEWBIE_QUESTS.length, done: true, goalShown: true };
            }

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
            // v6.51：丹火 / 神识改为货币——背包里旧的丹火、神识按 1:1 转入；淬炼精华（当时 3 丹火一个）折成丹火、神识地图（2 神识一张）折成神识；
            // 全局淬炼次数（每次 +10%）折算成每个部位 2.5 级（每级 +4%），保证老玩家不吃亏
            if (gameState.player) {
                const P = ensureCurrencyState();
                if (Array.isArray(P.inventory)) {
                    const conv = { danhuo: ['danhuo', 1], shenshi: ['shenshi', 1], tempered_essence: ['danhuo', 3], shenshi_map: ['shenshi', 2] };
                    P.inventory = P.inventory.filter(i => {
                        if (i && conv[i.id]) { P[conv[i.id][0]] += i.qty * conv[i.id][1]; return false; }
                        return true;
                    });
                }
                if (P.temperLevel) {
                    const lv = Math.min(TEMPER_MAX, Math.round(P.temperLevel * 2.5));
                    P.temper = { weapon: lv, armor: lv, jewelry: lv };
                    P.temperLevel = 0;
                }
            }
            // 清理配置里已不存在的物品（旧版本删除过物品时，存档里残留的条目会让背包渲染报错）
            if (Array.isArray(gameState.player.inventory)) {
                gameState.player.inventory = gameState.player.inventory.filter(i => i && GAME_CONFIG.items[i.id] && i.qty > 0);
            }
            if (gameState.player.equipment) {
                const eq = gameState.player.equipment;
                if (eq.weapon && !GAME_CONFIG.items[eq.weapon]) eq.weapon = null;
                if (eq.armor && !GAME_CONFIG.items[eq.armor]) eq.armor = null;
                if (Array.isArray(eq.jewelry)) eq.jewelry = eq.jewelry.filter(id => GAME_CONFIG.items[id]);
            }
            if (gameState.player.foodSlot && !FOOD_CONFIG.foods[gameState.player.foodSlot]) gameState.player.foodSlot = null;
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
                    const dropText = Object.keys(res.drops).length ? `\n🎁 掉落：${formatDropList(dropMapToList(res.drops))}` : '';
                    const lostText = Object.keys(res.lostDrops).length ? `\n❌ 背包已满，${formatDropList(dropMapToList(res.lostDrops))} 未能获得` : '';
                    const msg = `🤖 自动战斗 ${mins} 分钟：共 ${res.fights} 场，胜 ${res.wins} 负 ${res.losses}\n+${res.coins}灵石 +${res.exp}战斗经验${res.danhuo ? ` +${res.danhuo}丹火` : ''}${res.shenshi ? ` +${res.shenshi}神识` : ''}${res.daoguo ? ` +${res.daoguo}道果` : ''}${dropText}${lostText}` +
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
                    resetBattleState('idle', 'skip');
                } else {
                    gameState.battles = null;
                    gameState.currentAction = null;
                    gameState.currentActionProgress = 0;
                    clearActiveDomain('skip');
                    const battleContainer = document.getElementById('battleContainer');
                    if (battleContainer) battleContainer.classList.add('hidden');
                    syncBattleMode();
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

            // 「开辟仙窍」离线时也要卡 24 窍上限，不然会把仙窍打过头之外，还会白白多扣不该扣的太乙精华
            if (action.output && action.output.xianqiao) {
                completions = Math.min(completions, XIAN_ORIFICE_MAX - getXianqiao());
                if (completions <= 0) { gameState.currentAction = null; gameState.lastActiveTime = now; return; }
            }

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
            // 'raw'：采矿等 qty=1 基础产出的加成不在这里取整（离线是批量结算，取整放到下面乘完 completions 之后一次性做，
            // 不跟在线单次结算共用同一份持久余量 qtyCarry，避免互相冲掉进度）
            const perAction = JSON.parse(JSON.stringify(action.output));
            applySkillLevelBonus(savedAction.skill, perAction, 'raw');
            offlineRewards.coins = (perAction.coins || 0) * completions;
            offlineRewards.danhuo = (perAction.danhuo || 0) * completions;
            offlineRewards.shenshi = (perAction.shenshi || 0) * completions;
            offlineRewards.daoguo = (perAction.daoguo || 0) * completions;
            offlineRewards.cultivation = (perAction.cultivation || 0) * completions;
            offlineRewards.xianqiao = (perAction.xianqiao || 0) * completions;
            // 「产出翻倍」特效：按概率折算（期望值）；丹火助炼按能负担的次数折算
            const doubleRate = getSkillMod('double', savedAction.skill) + getMasteryBonus(savedAction.skill, savedAction.action).double + applyAlchemyBoostBatch(savedAction.skill, action, completions);
            (perAction.items || []).forEach(item => {
                offlineRewards.items.push({ id: item.id, qty: Math.floor(item.qty * completions * (1 + doubleRate) + 1e-9) });
            });
            if (perAction.skill && perAction.exp && completions > 0) {
                offlineRewards.skillExp[perAction.skill] = perAction.exp * completions;
            }
            offlineRewards.items = offlineRewards.items.filter(item => item.qty > 0);

            // 应用离线奖励
            gameState.player.coins += offlineRewards.coins;
            addCurrency(offlineRewards);
            if (offlineRewards.xianqiao) {
                gameState.player.xianqiao = Math.min(XIAN_ORIFICE_MAX, (gameState.player.xianqiao || 0) + offlineRewards.xianqiao);
            }

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

            // 背包放不下的物品单独记录并在结算窗里提示，不再静默丢失
            const keptItems = [];
            offlineRewards.lostItems = [];
            offlineRewards.items.forEach(item => (addToInventory(item.id, item.qty, true) ? keptItems : offlineRewards.lostItems).push(item));
            offlineRewards.items = keptItems;
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
            const earnedAnything = offlineRewards.coins > 0 || offlineRewards.danhuo > 0 || offlineRewards.shenshi > 0 || offlineRewards.daoguo > 0 || offlineRewards.cultivation > 0 ||
                offlineRewards.items.length > 0 || offlineRewards.lostItems.length > 0 || Object.keys(offlineRewards.skillExp).length > 0 ||
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

            if (rewards.danhuo > 0) {
                content += `<div class="stat-row"><span class="stat-label">${DANHUO_ICON} 获得丹火:</span><span class="stat-value">+${rewards.danhuo}</span></div>`;
            }
            if (rewards.shenshi > 0) {
                content += `<div class="stat-row"><span class="stat-label">${SHENSHI_ICON} 获得神识:</span><span class="stat-value">+${rewards.shenshi}</span></div>`;
            }
            if (rewards.daoguo > 0) {
                content += `<div class="stat-row"><span class="stat-label">${DAOGUO_ICON} 获得道果:</span><span class="stat-value">+${rewards.daoguo}</span></div>`;
            }
            if (rewards.xianqiao > 0) {
                content += `<div class="stat-row"><span class="stat-label">☯️ 打通仙窍:</span><span class="stat-value">+${rewards.xianqiao}（当前 ${getXianqiao()}/${XIAN_ORIFICE_MAX}）</span></div>`;
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

            if (rewards.lostItems && rewards.lostItems.length > 0) {
                content += `<div class="stat-row" style="flex-direction: column; align-items: flex-start; color: #c4483a;">
                    <span class="stat-label">❌ 背包已满，以下物品未能获得:</span>` +
                    rewards.lostItems.map(item => `<span>  ${GAME_CONFIG.items[item.id].icon} ${GAME_CONFIG.items[item.id].name} x${item.qty}</span>`).join('') +
                    `</div>`;
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
                            <div style="font-weight: bold; color: #c2a25f; font-size: 1em;">${art.icon || ''} ${art.name}</div>
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

        // 导出：直接下载一个存档文件（内容仍是原来的存档代码格式，所以旧的存档代码也能导入）
        function exportSave() {
            saveGame();
            const code = encodeSave(JSON.stringify(gameState));
            const d = new Date();
            const pad = n => String(n).padStart(2, '0');
            const name = `凡人修仙存档_${currentSlot ? '槽' + currentSlot + '_' : ''}${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}.txt`;
            const url = URL.createObjectURL(new Blob([code], { type: 'text/plain;charset=utf-8' }));
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        // 导入：选择之前导出的存档文件（也兼容旧版复制出来的存档代码保存成的文本文件）
        function importSave() {
            const input = document.getElementById('importSaveFile');
            input.value = '';
            input.click();
        }

        function onImportFileChosen(input) {
            const file = input.files && input.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => importSaveText(String(reader.result || ''));
            reader.onerror = () => alert('读取存档文件失败！');
            reader.readAsText(file);
        }

        function importSaveText(text) {
            if (!text.trim()) return;

            let loaded;
            try {
                loaded = JSON.parse(decodeSave(text));
            } catch (e) {
                alert('存档文件无效！');
                return;
            }
            if (!loaded || !loaded.player || !loaded.skills || !loaded.player.name) {
                alert('存档文件无效：缺少角色数据！');
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
            alert('存档导入成功！（已覆盖当前存档）');   // 导入的存档文件会覆盖当前槽位
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
            fillIconSlots();
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
        // 离开一段时间回来后的结算：切后台 / 电脑休眠 / 页面卡住都走这里；调用前 gameState.lastActiveTime 应是离开的那一刻
        function resumeAfterAway() {
            const action = gameState.currentAction;
            const autoBattling = !!(action && action.isBattle && getAutoBattle().enabled);
            if (autoBattling && (Date.now() - gameState.lastActiveTime) >= 10000) {
                handleOfflineTime(60);   // 循环战斗：后台期间按离线规则模拟战斗
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

        document.addEventListener('visibilitychange', () => {
            if (!gameRunning) return;
            if (document.hidden) {
                gameState.lastActiveTime = Date.now();   // 记下离开的时刻（后台自动存档不会再改它）
                saveGame();
                clearInterval(tickInterval);
            } else {
                resumeAfterAway();
            }
        });
