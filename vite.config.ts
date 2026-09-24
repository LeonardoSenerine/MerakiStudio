import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// As redes sociais exigem o endereço completo da imagem de prévia (og:image).
// Ordem de preferência: SITE_URL (domínio próprio, definido na Vercel) →
// endereço de produção que a Vercel informa no build → localhost.
function siteUrl(): Plugin {
  const url = (
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'http://localhost:5173'
  ).replace(/\/$/, '')

  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrl()],
})
