# Meraki Galleria Shop

Site da **Meraki Galleria Shop**, no centro de Itatiba/SP: estúdio de tatuagem privado, especializado em preto e branco, e a **Meraki Barbearia**, do Bruno Vieira, no mesmo endereço.

Feito com **React 19 + TypeScript + Vite**. É um site estático de uma página: não precisa de servidor nem de banco de dados.

## Seções

| Seção | Arquivo |
|---|---|
| Topo: nome, localização, proposta e agendamento | `src/components/Hero.tsx` |
| Significado de *meraki* | `src/components/Meaning.tsx` |
| O estúdio (atmosfera) | `src/components/About.tsx` |
| O tatuador (Matheus Andrade) | `src/components/Artists.tsx` |
| Trabalhos (carrosséis + tela cheia) | `src/components/Portfolio.tsx` |
| Tatuagem com intenção (estilos) | `src/components/Styles.tsx` |
| Faixa "3x eleito" | `src/components/Highlight.tsx` |
| Avaliações do Google | `src/components/Reviews.tsx` |
| Da ideia ao traço (processo e agendamento) | `src/components/Booking.tsx` |
| Barbearia: abertura, salão, Bruno Vieira e trabalhos | `src/components/Barbershop.tsx` |
| Rodapé com mapa | `src/components/Footer.tsx` |
| Barra de agendamento fixa no celular | `src/components/MobileCta.tsx` |

## Decisões do projeto

**Voz da marca.** Poucas palavras, frases fortes, muito espaço. Nada de "experiência diferenciada" ou "soluções completas": o texto fala do que existe de verdade (hora marcada, preto e cinza, locs e tranças) e deixa as fotos venderem. O script `scripts/auditoria_ia.py` procura clichês e padrões de site genérico para manter essa voz.

**Ordem da página.** Marca → atmosfera → profissional → trabalho → serviços → prova → agendamento. Primeiro o visitante entende onde está e com quem vai falar; o serviço vem depois, para a Meraki não virar um cardápio.

**Primeiros 3 segundos.** Sem rolar, o celular mostra: o nome ("Meraki Galleria Shop"), o que é ("Tatuagem, locs, tranças, corte e barba"), onde fica ("Centro de Itatiba · SP"), e os botões de agendar tatuagem e barbearia.

**Um CTA por vez, no contexto certo.** A tatuagem agenda pelo WhatsApp e a barbearia pela agenda online. O botão do menu e a barra fixa do celular mudam sozinhos conforme a parte do site que a pessoa está vendo (`src/hooks/useBooking.ts`); só o topo, que apresenta a marca inteira, mostra os dois.

**Animação com controle.** Transições lentas e discretas: fotos que se alternam devagar, revelação suave das imagens, o nome desenhado uma vez. Sem parallax, sem zoom em cards, sem elementos girando. Quem ativa "reduzir movimento" no sistema vê tudo parado.

**Fotografia real.** Só fotos do estúdio, da barbearia e de trabalhos reais. As que vieram pequenas passaram por super-resolução com IA, misturada com a versão original para não criar pele de plástico, e nenhuma aparece maior do que aguenta.

**Técnico.** React 19 + TypeScript + Vite, componentes pequenos e todo o conteúdo em um arquivo de dados. SEO com dados estruturados (estúdio de tatuagem e barbearia), sitemap, robots e imagem de compartilhamento gerados no build com o endereço correto.

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
- Tatuagem: WhatsApp (11) 95664-7982 · [@meraki.tattoobr](https://instagram.com/meraki.tattoobr)
- Barbearia: [agenda online](https://agendeonline.salonsoft.com.br/barbeariameraki) · [@barbeariameraki_](https://www.instagram.com/barbeariameraki_/)
