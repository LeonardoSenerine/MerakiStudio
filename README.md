# Meraki Tattoo Studio

Site da **Meraki Tattoo Studio**, estúdio de tatuagem privado no centro de Itatiba/SP, especializado em preto e branco. No mesmo endereço funciona a **Meraki Barbearia**, do Bruno Vieira.

Feito com **React 19 + TypeScript + Vite**. É um site estático de uma página: não precisa de servidor nem de banco de dados.

## Seções

| Seção | Arquivo |
|---|---|
| Topo com fotos que se alternam | `src/components/Hero.tsx` |
| Significado de *meraki* | `src/components/Meaning.tsx` |
| O estúdio | `src/components/About.tsx` |
| Estilos | `src/components/Styles.tsx` |
| Trabalhos (carrosséis + tela cheia) | `src/components/Portfolio.tsx` |
| Faixa "3x eleito" | `src/components/Highlight.tsx` |
| O tatuador (Matheus Andrade) | `src/components/Artists.tsx` |
| Avaliações do Google | `src/components/Reviews.tsx` |
| Agendamento pelo WhatsApp | `src/components/Booking.tsx` |
| Barbearia (Bruno Vieira) | `src/components/Barbershop.tsx` |
| Rodapé com mapa | `src/components/Footer.tsx` |

## Rodar no computador

Pré-requisito: [Node.js](https://nodejs.org) 20 ou mais novo.

```bash
npm install
npm run dev
```

O site abre em http://localhost:5173.

Para gerar a versão final (a mesma que a Vercel publica):

```bash
npm run build
npm run preview
```

## Editar textos, contatos e fotos

**Quase tudo fica em um arquivo só: [`src/data/studio.ts`](src/data/studio.ts).** Lá estão:

- nome, frases, endereço, telefone, WhatsApp e Instagram;
- o texto da seção "O estúdio";
- os estilos, a lista de tatuagens do portfólio e os trabalhos da barbearia;
- os dados do Matheus e do Bruno;
- as avaliações do Google.

As fotos ficam em `public/images/` e são referenciadas pelo nome, sem a extensão. Exemplo: `img('zeus-antebraco')` usa `public/images/zeus-antebraco.webp`.

Estilos visuais: `src/index.css` (layout e cores) e `src/animations.css` (animações).

## Tratamento das fotos

As fotos originais ficam em `fotos-originais/`. Para gerar as versões do site (maiores, mais nítidas e em WebP):

```bash
python scripts/melhorar_imagens.py
```

Para as fotos pequenas, dá para usar super-resolução por IA com o [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) (baixe a versão `realesrgan-ncnn-vulkan` para Windows e extraia em `C:/Users/<você>/esrgan`, ou informe o caminho na variável `ESRGAN_DIR`):

```bash
python scripts/melhorar_imagens_ia.py
```

Para processar só algumas fotos, passe os nomes: `python scripts/melhorar_imagens_ia.py barbearia-locs-1 zeus-antebraco`.

Os scripts precisam de Python 3 com o Pillow (`pip install pillow`).

### Imagem de compartilhamento

`public/og-image.jpg` (1200×630) é a prévia que aparece quando o link do site é enviado no WhatsApp, Instagram ou Facebook. Para gerar de novo (por exemplo, depois de trocar a foto de fundo):

```bash
python scripts/gerar_imagem_compartilhamento.py
```

O endereço completo da imagem é preenchido no build: na Vercel ele usa o endereço de produção do projeto. Com domínio próprio, crie na Vercel a variável de ambiente `SITE_URL` (ex.: `https://merakitattoo.com.br`) e publique de novo.

Também há um verificador de "vícios de site gerado por IA" (clichês, travessões, emojis, efeitos batidos):

```bash
python scripts/auditoria_ia.py
```

## Publicar na Vercel

1. Crie uma conta em [vercel.com](https://vercel.com) entrando com o GitHub.
2. Clique em **Add New… → Project** e escolha este repositório.
3. A Vercel reconhece o Vite sozinha. Confira se ficou assim:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Clique em **Deploy**. Em cerca de 1 minuto o site fica no ar em um endereço `*.vercel.app`.

Cada novo `git push` na branch `main` publica uma nova versão automaticamente.

Para usar um domínio próprio (ex.: `merakitattoo.com.br`): no projeto da Vercel, vá em **Settings → Domains**, adicione o domínio e siga as instruções de DNS.

## Contato do estúdio

- Endereço: R. Rangel Pestana, 39, Centro, Itatiba/SP
- WhatsApp: (11) 94391-6772
- Instagram: [@meraki.tattoobr](https://instagram.com/meraki.tattoobr) · Barbearia: [@barbeariameraki_](https://www.instagram.com/barbeariameraki_/)
