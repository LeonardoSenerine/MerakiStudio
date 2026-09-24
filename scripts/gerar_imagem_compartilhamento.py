"""Gera public/og-image.jpg (1200x630): a prévia que aparece quando o link do site
é compartilhado no WhatsApp, Instagram, Facebook etc.

O nome MERAKI é desenhado com as mesmas coordenadas de src/components/Wordmark.tsx.

Uso (na pasta do projeto):  python scripts/gerar_imagem_compartilhamento.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PHOTO = ROOT / 'public' / 'images' / 'estudio-aquario.webp'
OUT = ROOT / 'public' / 'og-image.jpg'
FONTS = Path('C:/Windows/Fonts')

S = 2                      # desenha em 2x e reduz no fim (bordas suaves)
W, H = 1200 * S, 630 * S
TEXT = (242, 239, 233)
GOLD = (200, 169, 106)
GOLD_LIGHT = (220, 195, 142)


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size * S)


def cover(im, w, h):
    scale = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    left, top = (im.width - w) // 2, int((im.height - h) * 0.55)
    return im.crop((left, top, left + w, top + h))


def spaced(draw, center_x, y, text, fnt, fill, spacing):
    """Texto centralizado com espaçamento entre letras."""
    widths = [draw.textlength(c, font=fnt) for c in text]
    total = sum(widths) + spacing * (len(text) - 1)
    x = center_x - total / 2
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=fnt, fill=fill)
        x += w + spacing


def wordmark(draw, center_x, top, width):
    k = width / 378                      # viewBox do SVG: 378 de largura
    ox = center_x - width / 2 + 4 * k
    stroke = round(7 * k)

    def P(x, y, dx):
        return (ox + (dx + x) * k, top + (y + 6) * k)

    def line(dx, *pts):
        draw.line([P(x, y, dx) for x, y in pts], fill=TEXT, width=stroke, joint='curve')

    line(0, (4, 100), (4, 4), (35, 62), (66, 4), (66, 100))           # M
    line(88, (44, 4), (4, 4), (4, 96), (44, 96))                      # E
    line(88, (4, 50), (40, 50))
    line(150, (4, 100), (4, 4), (27, 4))                              # R
    line(150, (27, 50), (4, 50))
    line(150, (24, 50), (48, 100))
    cx, cy, r = P(27, 27, 150)[0], P(27, 27, 150)[1], 23 * k
    draw.arc((cx - r, cy - r, cx + r, cy + r), start=-90, end=90, fill=TEXT, width=stroke)
    line(216, (2, 100), (29, 4), (56, 100))                           # Λ
    line(292, (4, 0), (4, 100))                                       # K
    line(292, (46, 2), (9, 56))
    line(292, (24, 36), (50, 100))
    line(362, (4, 0), (4, 100))                                       # I


def main():
    photo = Image.open(PHOTO).convert('RGB')
    bg = cover(photo, W, H)
    bg = ImageEnhance.Brightness(bg).enhance(0.38)

    # Escurece mais o centro, onde fica o texto
    shade = Image.new('L', (W, H), 0)
    ImageDraw.Draw(shade).ellipse((W * 0.12, H * 0.05, W * 0.88, H * 0.95), fill=110)
    from PIL import ImageFilter
    shade = shade.filter(ImageFilter.GaussianBlur(160 * S))
    bg = Image.composite(Image.new('RGB', (W, H), (10, 10, 10)), bg, shade)

    draw = ImageDraw.Draw(bg)
    cx = W / 2

    wordmark(draw, cx, 150 * S, 620 * S)
    spaced(draw, cx, 352 * S, 'TATTOO STUDIO', font('segoeuib.ttf', 26), GOLD_LIGHT, 16 * S)

    # Linha fina dourada
    draw.line((cx - 60 * S, 418 * S, cx + 60 * S, 418 * S), fill=GOLD, width=2 * S)

    tagline = font('georgiai.ttf', 34)
    t = '3x eleito o melhor estúdio de Itatiba'
    draw.text((cx - draw.textlength(t, font=tagline) / 2, 442 * S), t, font=tagline, fill=TEXT)

    spaced(draw, cx, 510 * S, 'ESPECIALISTA EM PRETO E BRANCO  ·  ITATIBA/SP',
           font('segoeui.ttf', 17), (170, 164, 155), 4 * S)

    bg.resize((1200, 630), Image.LANCZOS).save(OUT, 'JPEG', quality=88, optimize=True, progressive=True)
    print(f'Gerado: {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    main()
