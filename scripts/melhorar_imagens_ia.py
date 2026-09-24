"""Aumenta as fotos pequenas com o Real-ESRGAN (super-resolução por IA).

O resultado da IA é misturado (70/30) com a versão feita por scripts/melhorar_imagens.py:
a IA deixa as linhas nítidas, e a mistura devolve a textura natural da pele,
evitando o aspecto de "pele de plástico".

Pré-requisitos:
  1. Rodar antes: python scripts/melhorar_imagens.py
  2. Real-ESRGAN (realesrgan-ncnn-vulkan) em C:/Users/sener/esrgan
     (ou outro caminho na variável de ambiente ESRGAN_DIR)

Uso: python scripts/melhorar_imagens_ia.py [nome ...]   (sem nomes, processa todas)
"""
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
from melhorar_imagens import ORIG, OUT, SOURCES  # noqa: E402

ESRGAN_DIR = Path(os.environ.get('ESRGAN_DIR', 'C:/Users/sener/esrgan'))
ONLY = set(sys.argv[1:])
EXE = ESRGAN_DIR / 'realesrgan-ncnn-vulkan.exe'
AI_WEIGHT = 0.7
MIN_WIDTH_FOR_SKIP = 900  # fotos já grandes não passam pela IA

# O executável não lida bem com acentos no caminho: trabalha numa pasta temporária simples
work = Path(tempfile.mkdtemp(prefix='esrgan_'))
(work / 'in').mkdir()
(work / 'out').mkdir()

todo = {}
for name, src in SOURCES.items():
    if ONLY and name not in ONLY:
        continue
    path = ORIG / src
    if Image.open(path).size[0] >= MIN_WIDTH_FOR_SKIP:
        continue
    tmp = work / 'in' / f'{name}.png'
    Image.open(path).convert('RGB').save(tmp)
    todo[name] = tmp

print(f'Processando {len(todo)} fotos com IA...')
subprocess.run(
    [str(EXE), '-i', str(work / 'in'), '-o', str(work / 'out'), '-n', 'realesrgan-x4plus', '-f', 'png'],
    check=True,
    cwd=ESRGAN_DIR,
    capture_output=True,
)

for name in sorted(todo):
    base = Image.open(OUT / f'{name}.webp').convert('RGB')
    ai = Image.open(work / 'out' / f'{name}.png').convert('RGB').resize(base.size, Image.LANCZOS)
    Image.blend(base, ai, AI_WEIGHT).save(OUT / f'{name}.webp', 'WEBP', quality=90, method=6)
    print(f'{name}: {base.size[0]}x{base.size[1]}')

shutil.rmtree(work)
print('Pronto.')
