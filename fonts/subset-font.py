"""重新生成毛笔字体子集 fonts/zhimangxing-subset.woff（志莽行书，SIL OFL 1.1）。

什么时候要跑：新增的名称（境界 / 怪物 / 物品 / 配方……）要在毛笔字的地方显示（战斗特效、突破特效、配方卡片名、修炼卡片的书法字），
而字体子集里还没有这些字时——缺字会退回楷体，看起来不统一。

用法（在仓库根目录）：
    pip install fonttools
    python fonts/subset-font.py            # 自动从 Google Fonts 官方仓库下载原字体（约 4MB，只放在临时目录，不进仓库）
    python fonts/subset-font.py 原字体.ttf   # 或者指定本地的 ZhiMangXing-Regular.ttf

收字范围：game.js 里所有 name: '…'、line: '…'（突破台词、Boss 登场台词）、glyph: '…'（成就印章），加上 EXTRA 里的特效用字和数字。字表同时写到 fonts/zhimangxing-chars.txt。
"""
import io, os, re, sys, tempfile, urllib.request
from fontTools import subset

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/zhimangxing/ZhiMangXing-Regular.ttf'
EXTRA = ("暴击斩破碎灭杀化形元婴离体法则之击金木水火土风雷冰道祖劫雷霆天罚心魔恶善尸自我衰败胜利击败重生夺舍狂暴领域灵域叠域"
         "证道侵蚀同化收敛突破成功失败境界飞升渡过仙凡入道封印未解锁一二三四五六七八九十百千万亿零〇+-−×%！？·…「」：，。"
         "散修长生录一介问道壹贰叁新建角色存档试玩版点击跳过——VS"
         "0123456789+-.%xX!?")


def collect():
    src = io.open(os.path.join(ROOT, 'game.js'), encoding='utf-8').read()
    chars = set(EXTRA)
    for pat in (r"name: *'([^']+)'", r"line: *'([^']+)'", r"glyph: *'([^']+)'"):
        for m in re.finditer(pat, src):
            chars |= set(m.group(1))
    return ''.join(sorted(c for c in chars if not c.isspace()))


def main():
    ttf = sys.argv[1] if len(sys.argv) > 1 else os.path.join(tempfile.gettempdir(), 'ZhiMangXing-Regular.ttf')
    if not os.path.exists(ttf):
        print('下载原字体…', URL)
        urllib.request.urlretrieve(URL, ttf)
    text = collect()
    io.open(os.path.join(ROOT, 'fonts', 'zhimangxing-chars.txt'), 'w', encoding='utf-8').write(text)
    out = os.path.join(ROOT, 'fonts', 'zhimangxing-subset.woff')
    opts = subset.Options()
    opts.flavor = 'woff'
    opts.layout_features = ['*']
    font = subset.load_font(ttf, opts)
    sub = subset.Subsetter(opts)
    sub.populate(text=text)
    sub.subset(font)
    subset.save_font(font, out, opts)
    print(f'✓ {len(text)} 个字 → {out}（{os.path.getsize(out) // 1024}KB）')


if __name__ == '__main__':
    main()
