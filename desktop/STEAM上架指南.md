# 散修长生录 · Steam 上架指南

按顺序做。标 **【你】** 的需要你本人操作（涉及付款、身份、账号密码，我不能代办）；标 **【我】** 的我来做。
Steamworks 后台的菜单名称偶尔会改版，下面写的是大致位置；找不到时在后台右上角搜索框搜关键词即可。

---

## 上架方案

- **完整版**：收费，凡人一路到最终境界道祖，共 51 个境界、45 个成就。具体定价还没定（放置类常见 18–38 元人民币档）。
- **免费试玩版**：挂在完整版下面，内容到元婴大圆满为止，突破化神时会提示购买完整版。试玩版和完整版的存档通用，买了直接接着玩。
- **语言**：只做简体中文。
- **网页版**：先保留。Steam 版收费后，网页版要不要也只开放到试玩范围，到时再定。

## 费用与分成

| 项目 | 金额 | 说明 |
|---|---|---|
| Steam Direct 上架费 | **100 美元**（每款游戏一次） | 没有年费。这款游戏总收入（扣退款，不扣 Valve 分成，**本体和 DLC 合计**）满 **1000 美元**后，Valve 会返还这 100 美元 |
| 试玩版 | 免费 | 在完整版后台「请求试玩版」即可，不用再交上架费 |
| 成就、云存档、beta 分支、上传更新、Steamworks SDK | 免费 | 更新多少次都不收费，也不用重新审核 |
| Valve 分成 | 收入的 30% | 单款收入超过 1000 万美元后降到 25%，超过 5000 万美元降到 20% |
| 美国预扣税 | 按税务向导结果，通常约 10% | 填好 W-8BEN、按中美税收协定申报后的常见税率；以后台税务向导显示的为准 |

按 25 元一份算，大约卖出 280 份就能收回上架费。如果以后想让本体免费，也可以改为「本体免费 + 付费支持者包 DLC」，DLC 收入同样算进那 1000 美元。

---

## 第一步【你】注册 Steamworks 开发者账号

**提前准备：**
- 一个 Steam 账号，开启手机令牌（Steam Guard）。用现在的账号就行。
- 身份证或护照（用于身份验证）。
- 一个能**收美元汇款**的银行账户：国内银行卡一般可以，需要开户行的英文名称、**SWIFT 代码**（打银行客服或网银里能查到）和英文地址。
- 一张能付外币的 Visa / Mastercard 信用卡，用来付 **100 美元** 的上架费（返还条件见上面「费用与分成」）。

**操作：**
1. 打开 <https://partner.steamgames.com/>，用 Steam 账号登录，选择加入 Steamworks（Steam Direct）。
2. 签署《Steam 分销协议》，填写名称和地址。没有公司就按**个人**填，名字和地址用英文或拼音，和银行账户上的一致。
3. 填写**银行信息**（收款用）。
4. 填写**税务信息**：选「个人」→ 非美国人 → 系统会生成 **W-8BEN** 表。国籍填中国，外国税号填身份证号，按中美税收协定申请优惠税率。照着向导逐步填就行，填完系统会显示你适用的预扣税率。
5. 完成**身份验证**：按提示上传证件。
6. 支付 **100 美元** Steam Direct 费用。付完之后会得到一个**应用 ID（App ID）**，这就是「散修长生录」完整版的编号。

**两个时间限制要记住：**
- 付款之后至少要等 **30 天**，才能发布第一款游戏。
- 商店页面必须先以「即将推出」状态公开至少 **2 周**，才能正式发布。

所以付款越早，越早能上线。

**完成后把下面两个数字告诉我：**
- 完整版的 App ID。
- 试玩版的 App ID：在应用后台的「所有关联的程序包、DLC、试玩版和工具」页面，点「请求试玩版」（Request Demo），会得到一个新的 App ID。

我会把它们填进 `desktop/steam.json`，游戏就会连接到你的应用。

---

## 第二步【你】在后台配置成就（45 个）

位置：应用后台 →「统计与成就」→「成就」。每个成就点「新建成就」，填写下表的四项并上传两张图标，**API 名称必须一字不差**（游戏靠它解锁成就）。全部填完点「**发布**」，改动才会生效。

图标都在 `desktop/assets/achievements/` 里：已达成图标传 `<API 名称>.jpg`，未达成图标传 `<API 名称>_locked.jpg`。`_preview.png` 是全部图标的预览图，不用上传。

试玩版的应用**不需要**配置成就：试玩期间达成的成就会记在存档里，玩家买了完整版、用同一个存档打开游戏时，会自动同步到 Steam。

| # | API 名称 | 显示名称 | 描述 | 图标（已达成 / 未达成） |
|---|---|---|---|---|
| 1 | `ACH_QI` | 引气入体 | 突破到练气一层 | `ACH_QI.jpg` / `ACH_QI_locked.jpg` |
| 2 | `ACH_NEWBIE` | 初入仙途 | 完成全部新手任务（不跳过） | `ACH_NEWBIE.jpg` / `ACH_NEWBIE_locked.jpg` |
| 3 | `ACH_ZHUJI` | 筑基 | 突破到筑基初期 | `ACH_ZHUJI.jpg` / `ACH_ZHUJI_locked.jpg` |
| 4 | `ACH_WEI_ZHUJI` | 逆命筑基 | 以伪灵根突破到筑基初期 | `ACH_WEI_ZHUJI.jpg` / `ACH_WEI_ZHUJI_locked.jpg` |
| 5 | `ACH_JIEDAN` | 结丹 | 突破到结丹初期 | `ACH_JIEDAN.jpg` / `ACH_JIEDAN_locked.jpg` |
| 6 | `ACH_PERFECT_CORE` | 极品金丹 | 金丹品质达到极品（90） | `ACH_PERFECT_CORE.jpg` / `ACH_PERFECT_CORE_locked.jpg` |
| 7 | `ACH_LIFE_SWORD` | 本命法宝 | 炼成本命法宝青冥剑 | `ACH_LIFE_SWORD.jpg` / `ACH_LIFE_SWORD_locked.jpg` |
| 8 | `ACH_FIRST_DUNGEON` | 初探秘境 | 首次通关任意秘境 | `ACH_FIRST_DUNGEON.jpg` / `ACH_FIRST_DUNGEON_locked.jpg` |
| 9 | `ACH_HEART_DEMON` | 斩灭心魔 | 冲击元婴前斩灭心魔 | `ACH_HEART_DEMON.jpg` / `ACH_HEART_DEMON_locked.jpg` |
| 10 | `ACH_YUANYING` | 元婴 | 突破到元婴初期 | `ACH_YUANYING.jpg` / `ACH_YUANYING_locked.jpg` |
| 11 | `ACH_SMALL_TRIB` | 初渡天劫 | 渡过第一次小天劫 | `ACH_SMALL_TRIB.jpg` / `ACH_SMALL_TRIB_locked.jpg` |
| 12 | `ACH_SKILL_50` | 一技之长 | 任一生活技能（炼丹 / 炼器 / 灵田 / 采矿）达到 50 级 | `ACH_SKILL_50.jpg` / `ACH_SKILL_50_locked.jpg` |
| 13 | `ACH_MASTERY_MAX` | 炉火纯青 | 任一配方精通达到 20 级 | `ACH_MASTERY_MAX.jpg` / `ACH_MASTERY_MAX_locked.jpg` |
| 14 | `ACH_COINS_1M` | 小有积蓄 | 同时持有 100 万灵石 | `ACH_COINS_1M.jpg` / `ACH_COINS_1M_locked.jpg` |
| 15 | `ACH_HUASHEN` | 化神 | 突破到化神初期 | `ACH_HUASHEN.jpg` / `ACH_HUASHEN_locked.jpg` |
| 16 | `ACH_ASCEND` | 飞升上界 | 穿过界壁裂隙，突破到炼虚初期 | `ACH_ASCEND.jpg` / `ACH_ASCEND_locked.jpg` |
| 17 | `ACH_BIG_TRIB` | 大劫不灭 | 渡过第一次大天劫 | `ACH_BIG_TRIB.jpg` / `ACH_BIG_TRIB_locked.jpg` |
| 18 | `ACH_HETI` | 合体 | 突破到合体初期 | `ACH_HETI.jpg` / `ACH_HETI_locked.jpg` |
| 19 | `ACH_FUSION` | 合道 | 元婴分身、身外化身归于本体 | `ACH_FUSION.jpg` / `ACH_FUSION_locked.jpg` |
| 20 | `ACH_LIFE_SWORD_5` | 两仪剑阵 | 青冥剑养到 36 口，结成两仪剑阵 | `ACH_LIFE_SWORD_5.jpg` / `ACH_LIFE_SWORD_5_locked.jpg` |
| 21 | `ACH_DACHENG` | 大乘 | 突破到大乘初期 | `ACH_DACHENG.jpg` / `ACH_DACHENG_locked.jpg` |
| 22 | `ACH_LAW_MASTER` | 法则入门 | 任一法则练到 30 级 | `ACH_LAW_MASTER.jpg` / `ACH_LAW_MASTER_locked.jpg` |
| 23 | `ACH_ALL_DUNGEONS` | 踏遍秘境 | 通关全部 13 个秘境 | `ACH_ALL_DUNGEONS.jpg` / `ACH_ALL_DUNGEONS_locked.jpg` |
| 24 | `ACH_SKILL_80` | 一代宗师 | 任一生活技能达到 80 级 | `ACH_SKILL_80.jpg` / `ACH_SKILL_80_locked.jpg` |
| 25 | `ACH_COINS_100M` | 富甲一方 | 同时持有 1 亿灵石 | `ACH_COINS_100M.jpg` / `ACH_COINS_100M_locked.jpg` |
| 26 | `ACH_FLY_TRIB` | 飞升天劫 | 渡过飞升天劫 | `ACH_FLY_TRIB.jpg` / `ACH_FLY_TRIB_locked.jpg` |
| 27 | `ACH_ZHENXIAN` | 真仙 | 灵气尽化仙元，突破到真仙初期 | `ACH_ZHENXIAN.jpg` / `ACH_ZHENXIAN_locked.jpg` |
| 28 | `ACH_SHUAI` | 衰相尽渡 | 渡过元衰、穴衰、体衰三重衰相 | `ACH_SHUAI.jpg` / `ACH_SHUAI_locked.jpg` |
| 29 | `ACH_ZHENXIAN_LATE` | 道体圆满 | 二十四穴尽开，突破到真仙后期 | `ACH_ZHENXIAN_LATE.jpg` / `ACH_ZHENXIAN_LATE_locked.jpg` |
| 30 | `ACH_TEMPER` | 元婴九炼 | 淬炼元婴九次功成 | `ACH_TEMPER.jpg` / `ACH_TEMPER_locked.jpg` |
| 31 | `ACH_JINXIAN` | 金仙 | 突破到金仙初期 | `ACH_JINXIAN.jpg` / `ACH_JINXIAN_locked.jpg` |
| 32 | `ACH_DAOSI` | 法则成丝 | 凝聚 20 缕道丝 | `ACH_DAOSI.jpg` / `ACH_DAOSI_locked.jpg` |
| 33 | `ACH_LAST_SHUAI` | 五衰尽渡 | 渡过最凶险的神衰与戾衰 | `ACH_LAST_SHUAI.jpg` / `ACH_LAST_SHUAI_locked.jpg` |
| 34 | `ACH_JINXIAN_LATE` | 六十穴尽开 | 仙穴开满 60 穴，突破到金仙后期 | `ACH_JINXIAN_LATE.jpg` / `ACH_JINXIAN_LATE_locked.jpg` |
| 35 | `ACH_TAIYI` | 太乙 | 肉身化为玉身，突破到太乙初期 | `ACH_TAIYI.jpg` / `ACH_TAIYI_locked.jpg` |
| 36 | `ACH_TAIYI_LATE` | 小世界初成 | 推演小世界到 Lv.10，突破到太乙后期 | `ACH_TAIYI_LATE.jpg` / `ACH_TAIYI_LATE_locked.jpg` |
| 37 | `ACH_SOUL` | 神魂大成 | 淬炼神魂九重 | `ACH_SOUL.jpg` / `ACH_SOUL_locked.jpg` |
| 38 | `ACH_DALUO` | 大罗 | 突破到大罗初期 | `ACH_DALUO.jpg` / `ACH_DALUO_locked.jpg` |
| 39 | `ACH_ORIGIN` | 本源三十 | 凝结 30 道法则本源 | `ACH_ORIGIN.jpg` / `ACH_ORIGIN_locked.jpg` |
| 40 | `ACH_CORPSE` | 斩尽三尸 | 斩出善尸、恶尸、自我尸 | `ACH_CORPSE.jpg` / `ACH_CORPSE_locked.jpg` |
| 41 | `ACH_DAOZU` | 道祖 | 证道，成就道祖 | `ACH_DAOZU.jpg` / `ACH_DAOZU_locked.jpg` |
| 42 | `ACH_DAO_HEART` | 道心自守 | 身为道祖而自降修为，不被天道吞噬 | `ACH_DAO_HEART.jpg` / `ACH_DAO_HEART_locked.jpg` |
| 43 | `ACH_LIFE_SWORD_72` | 周天剑阵 | 七十二口青冥剑齐聚，结成周天剑阵 | `ACH_LIFE_SWORD_72.jpg` / `ACH_LIFE_SWORD_72_locked.jpg` |
| 44 | `ACH_SKILL_99` | 登峰造极 | 任一生活技能达到 99 级（满级） | `ACH_SKILL_99.jpg` / `ACH_SKILL_99_locked.jpg` |
| 45 | `ACH_RELIC_ALL` | 奇物满匣 | 集齐全部 20 件奇物 | `ACH_RELIC_ALL.jpg` / `ACH_RELIC_ALL_locked.jpg` |

> 45 个逐个填比较费时。如果你愿意，可以在我这边的内置浏览器里自己登录 Steamworks（密码由你输入），我来逐个填表；每次点「保存 / 发布」前会先问你。

以后加新成就时，我会同步更新游戏、这张表和图标，你只需要在后台补上新增的那几个。

---

## 第三步【你】配置云存档

位置：应用后台 →「Steam Cloud」。完整版和试玩版两个应用都按下面配置一遍。

1. 打开 Steam Cloud，配额填：每位用户字节配额 **10000000**（10MB），每位用户文件数 **20**。
2. 在「**Auto-Cloud**」的「根路径」里添加一条：

| 项 | 填写 |
|---|---|
| 根目录（Root） | `WinAppDataRoaming` |
| 子目录（Subdirectory） | `SanxiuChangsheng/saves` |
| 匹配模式（Pattern） | `*.json` |
| 操作系统 | Windows |
| 递归 | 不勾 |

3. 点「保存」，再到「发布」页发布改动。

游戏的存档就是这个目录下的 `xiuxianIdleGame_slot1~3.json`，代码不需要改。同一台电脑上，试玩版和完整版本来就共用这个目录，所以买了完整版可以直接接着玩。

---

## 第四步 上传游戏版本

**【我】** 拿到 App ID 后，我会准备两样东西：
- SteamPipe 的上传配置文件（`app_build_*.vdf`、`depot_build_*.vdf`）。
- 一条一键命令：打包完整版和试玩版，再上传到你应用的 **beta 分支**。

**【你】** 需要做的：
1. 在应用后台 →「安装」→「常规」里添加启动选项：可执行文件填 `SanxiuChangsheng.exe`，操作系统选 Windows。
2. 下载 **Steamworks SDK**（后台首页就有下载链接，需要登录），解压到一个英文路径下，比如 `D:\steamworks_sdk`。上传工具 `steamcmd` 就在 SDK 里。
3. 运行我给的上传命令。它会让你登录 Steam 账号，并输入手机令牌的验证码，这一步必须你本人操作。
4. 上传完成后，在后台 →「SteamPipe」→「版本」里，先把新版本设到 beta 分支，自己在 Steam 里切换到 beta 分支试玩；确认没问题，再设为默认分支（正式）。

**以后每次更新也是同一套流程：**改代码 → 本地测试 → 运行上传命令 → 先在 beta 分支确认 → 设为正式。上传后玩家的 Steam 会自动下载更新，不需要重新审核。

---

## 第五步 商店页面（即将推出）

**【我】** 准备简介、特色列表、标签建议、商店截图，并按 Steam 要求的尺寸做胶囊图草稿：

| 素材 | 尺寸 |
|---|---|
| 页眉胶囊图 | 920×430 |
| 小胶囊图 | 462×174 |
| 主胶囊图 | 1232×706 |
| 竖版胶囊图 | 748×896 |
| 库资源 | 600×900、3840×1240，以及标志 |

商店截图至少要 5 张。宣传视频可选，但强烈建议做一段。

商店页要突出的内容（简介和截图围绕这些来写）：
- **51 个境界**：从凡人一路修到道祖，每个大境界都有自己的核心玩法，不是换个名字加数值。比如结丹淬炼金丹品质、元婴斩心魔、化神悟道、炼虚化虚为实、合体合道、大乘元婴离体、真仙开辟仙穴渡衰相、金仙淬炼元婴、太乙推演小世界、大罗斩三尸，最后以一条法则证道。
- **道祖的抉择**：成了道祖，法则之力越用、天道侵蚀越深。收敛法则，还是自降修为守住自己，由玩家决定。
- **放置玩法**：离线也会继续修炼和战斗，回来领取收益。
- **生活技能**：炼丹、炼器、灵田、采矿，每个配方都有精通等级，还有分身可以并行做事。
- **战斗**：灵根相克，有秘境、天劫、心魔。灵域要选择怎么展开：金仙只对敌，太乙能两域叠加。
- **45 个 Steam 成就**和云存档。

**【你】**
- 在后台填写、上传这些素材，提交审核（几个工作日）。
- 完成「内容调查 / 年龄分级」（IARC）问卷。这个游戏没有暴力血腥或色情内容，如实勾选即可。

商店页审核通过后，设为「即将推出」公开，开始积累愿望单。试玩版可以同时放出来，愿望单会涨得快很多。

---

## 第六步 发布

- 商店页「即将推出」满 2 周、付款满 30 天之后，就可以发布。
- 发布前要通过 Valve 对版本本身的审核（几个工作日）。
- **正式版还是抢先体验？** 境界已经做到最终的道祖，主线内容是完整的，可以直接以**正式版**上线。如果你还想上线后边听玩家反馈边大改平衡，或者计划再加大块玩法，用「抢先体验」更稳妥。这个身份本来就表示「还在持续开发」，玩家对改动更宽容，以后也能转成正式版。两种身份都能随时更新。

---

## 已经做好的（v7.24）

- 游戏内容：凡人到道祖共 51 个境界（v7.23 金仙 / 太乙、v7.24 大罗 / 道祖），45 个成就（v7.37 加了「周天剑阵」，v7.39 加了「登峰造极」），网页版已同步发布。
- 桌面版外壳：存档写成文件，自动备份、损坏时自动恢复。
- Steam 连接：成就同步；试玩版的「前往商店页」按钮会打开 Steam 浮层商店；玩家直接双击 exe 时，会自动改为通过 Steam 启动。
- 已用你电脑上的 Steam 实测：用 Valve 官方测试应用连接成功，并读到了账号信息。
- 试玩版：只开放到元婴大圆满，在化神突破处提示购买完整版，存档与完整版通用。要改上限，只需改 `game.js` 里的 `DEMO_REALM_CAP`。
- 打包好的两个版本（v7.24.0，都实测能启动）：
  - 完整版：`desktop/dist/full/win-unpacked/`
  - 试玩版：`desktop/dist/demo/win-unpacked/`
- 成就图标已按 45 个成就重新生成（`desktop/assets/achievements/`）。
- 每次打包都会自动检查：代码注释已全部去掉、没有原著专有名词。
