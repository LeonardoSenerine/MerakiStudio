"""Procura no site os padrões que costumam denunciar um site gerado por IA.

Uso (na pasta do projeto):  python scripts/auditoria_ia.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src'

sys.stdout.reconfigure(encoding='utf-8')

files = [p for p in SRC.rglob('*') if p.suffix in {'.ts', '.tsx', '.css'}]
files.append(ROOT / 'index.html')


def text_of(p):
    return p.read_text(encoding='utf-8')


def strings_in(src):
    """Textos visíveis: strings entre aspas simples e texto solto no JSX."""
    out = re.findall(r"'([^'\n]{12,})'", src)
    out += [t.strip() for t in re.findall(r'>\s*([^<>{}\n][^<>{}]{12,}?)\s*<', src)]
    return [s for s in out if not s.startswith(('/', 'http', '#', '.', 'M', 'rgba'))]


CHECKS = [
    # (categoria, descrição, regex, onde procurar: 'text' = só textos visíveis, 'code' = tudo)
    ('Texto', 'Travessão (—)', r'—', 'text'),
    ('Texto', 'Clichê de marketing', r'\b(eleve|elevar|transform[ae]r?|revolucion|desbloque|próximo nível|solução completa|em poucos cliques|experiência única|de forma inteligente)\w*', 'text'),
    ('Texto', 'Estrutura "não é apenas X, é Y"', r'n[ãa]o (é|e) (apenas|só|somente)', 'text'),
    ('Texto', 'Expressões genéricas de IA', r'\b(cuidadosamente|especialmente para você|atenção aos detalhes|cada etapa|pensad[oa] para|faz parte da identidade|proposta)\b', 'text'),
    ('Texto', 'Regra de três em frases curtas ("A. B. C.")', r'\b\w+\. \w+\. \w+\.(\s|$)', 'text'),
    ('Texto', 'Emoji', r'[\U0001F300-\U0001FAFF☀-➿]', 'text'),
    ('Texto', 'Placeholder esquecido', r'(lorem ipsum|your company|exemplo\.com|99999-9999)', 'code'),
    ('Visual', 'Gradiente roxo/azul/rosa', r'#(6366f1|8b5cf6|a855f7|ec4899|3b82f6|7c3aed)|indigo|violet', 'code'),
    ('Visual', 'Desfoque de vidro (backdrop blur)', r'backdrop-filter:\s*blur', 'code'),
    ('Visual', 'Brilho/glow animado', r'shimmer|glow', 'code'),
    ('Visual', 'Cantos muito arredondados em card', r'border-radius:\s*(1[2-9]|2\d)px', 'code'),
    ('Interação', 'Zoom no hover', r':hover[^{]*\{[^}]*scale\(1\.0[3-9]', 'code'),
    ('Interação', 'Contador numérico animado', r'CountUp|countUp|count-up', 'code'),
    ('Técnico', 'Link vazio (href="#")', r'href="#"', 'code'),
    ('Técnico', 'Comentário rotulando bloco ({/* X Section */})', r'\{/\*\s*\w+ Section\s*\*/\}', 'code'),
]

findings = []
for p in files:
    src = text_of(p)
    visible = '\n'.join(strings_in(src)) if p.suffix in {'.ts', '.tsx'} else ''
    for cat, desc, pattern, where in CHECKS:
        target = visible if where == 'text' else src
        for m in re.finditer(pattern, target, flags=re.IGNORECASE):
            line = target[: m.start()].count('\n') + 1
            snippet = target.splitlines()[line - 1].strip()[:110]
            findings.append((cat, desc, p.relative_to(ROOT).as_posix(), snippet))

# Brilho: sombra centralizada (0 0) com desfoque grande. Contornos sem desfoque não contam.
for p in files:
    if p.suffix != '.css':
        continue
    for decl in re.findall(r'box-shadow:\s*([^;]+);', text_of(p)):
        for shadow in decl.split(','):
            values = [float(v) for v in re.findall(r'(-?\d*\.?\d+)(?:px)?(?=\s|$)', shadow.strip())]
            if len(values) >= 3 and values[0] == 0 and values[1] == 0 and values[2] >= 8:
                findings.append(('Visual', 'Brilho/glow (sombra centralizada com desfoque)',
                                 p.relative_to(ROOT).as_posix(), shadow.strip()))

# Verificações de estrutura
all_src = '\n'.join(text_of(p) for p in files)
reveals = len(re.findall(r'data-reveal=', all_src))
fav = (ROOT / 'public' / 'favicon.svg').read_text(encoding='utf-8')
if '#863bff' in fav or 'vite' in fav.lower():
    findings.append(('Técnico', 'Favicon padrão do Vite', 'public/favicon.svg', ''))
title = re.search(r'<title>(.*?)</title>', text_of(ROOT / 'index.html')).group(1)
if title.lower() in {'vite + react + ts', 'studio-tatuagem', 'react app'}:
    findings.append(('Técnico', 'Título da aba genérico', 'index.html', title))
paddings = re.findall(r'padding:\s*(\d+)px 0', all_src)

print('=' * 70)
print('AUDITORIA DE VÍCIOS DE IA')
print('=' * 70)
if not findings:
    print('Nenhum padrão encontrado.')
by_cat = {}
for f in findings:
    by_cat.setdefault(f[0], []).append(f)
for cat, items in by_cat.items():
    print(f'\n[{cat}] {len(items)} ocorrência(s)')
    for _, desc, where, snippet in items:
        print(f'  - {desc}  ({where})')
        if snippet:
            print(f'      "{snippet}"')

print('\n[Estrutura]')
print(f'  - Elementos com animação de entrada (data-reveal): {reveals}')
print(f'  - Paddings verticais de seção usados: {sorted(set(paddings), key=int)}')
print(f'  - Título da aba: "{title}"')
print(f'\nTotal de ocorrências: {len(findings)}')
