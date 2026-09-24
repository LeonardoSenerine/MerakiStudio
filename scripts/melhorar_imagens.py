"""Reprocessa as fotos do site a partir dos originais em fotos-originais/.

Sem IA: aumenta em duas etapas (com nitidez leve entre elas, o que gera menos
contorno artificial do que aumentar de uma vez), realça detalhes finos e
ajusta um pouco o contraste. Fotos que já são grandes só recebem o acabamento.

Uso (na pasta do projeto):  python scripts/melhorar_imagens.py [nome ...]
"""
import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ORIG = ROOT / 'fotos-originais'
OUT = ROOT / 'public' / 'images'

# nome no site -> arquivo original
SOURCES = {
    'estudio-panorama': 'google/estudio-panorama.jpg',
    'estudio-macas': 'google/estudio-macas.jpg',
    'lettering-perna': 'google/lettering-perna.jpg',
    'estudio-estacoes': 'estudio-estacoes-original.webp',
    'matheus-andrade': 'artista-1.png',
    'bruno-vieira': 'bruno-vieira-carro.png',
}
for f in ORIG.glob('*.png'):
    name = f.stem
    if (OUT / f'{name}.webp').exists() and name not in SOURCES:
        SOURCES[name] = f.name

TARGET_WIDTH = 1100   # largura final aproximada
MAX_SCALE = 2.6       # acima disso a foto só fica maior, não melhor


def enhance(im: Image.Image) -> Image.Image:
    w, h = im.size
    scale = min(MAX_SCALE, TARGET_WIDTH / w)
    if scale > 1.05:
        # Etapa 1: metade do caminho, com nitidez suave
        mid = max(1.0, scale ** 0.5)
        im = im.resize((round(w * mid), round(h * mid)), Image.LANCZOS)
        im = im.filter(ImageFilter.UnsharpMask(radius=1.0, percent=60, threshold=2))
        # Etapa 2: tamanho final
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=85, threshold=3))
    elif w > 1400:
        im.thumbnail((1400, 1400 * h // w), Image.LANCZOS)
        im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=50, threshold=2))
    else:
        im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=50, threshold=2))
    im = ImageEnhance.Contrast(im).enhance(1.04)
    return im


def main(only):
    for name, src in sorted(SOURCES.items()):
        if only and name not in only:
            continue
        im = Image.open(ORIG / src).convert('RGB')
        before = im.size
        im = enhance(im)
        im.save(OUT / f'{name}.webp', 'WEBP', quality=90, method=6)
        print(f'{name}: {before[0]}x{before[1]} -> {im.size[0]}x{im.size[1]}')


if __name__ == '__main__':
    main(set(sys.argv[1:]))
