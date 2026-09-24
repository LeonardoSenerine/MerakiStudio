import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Metadados que precisam do endereço completo do site (prévia do link, canonical,
// dados estruturados, sitemap). Ordem de preferência: SITE_URL (domínio próprio,
// definido na Vercel) → endereço de produção que a Vercel informa no build → localhost.
function siteMeta(): Plugin {
  const url = (
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'http://localhost:5173'
  ).replace(/\/$/, '')

  return {
    name: 'site-meta',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url),
    // robots.txt e sitemap.xml gerados no build, já com o endereço certo
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `  <url><loc>${url}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n` +
          '</urlset>\n',
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteMeta()],
})
