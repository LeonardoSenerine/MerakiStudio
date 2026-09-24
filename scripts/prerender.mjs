// Pré-renderização (roda no fim do `npm run build`):
// coloca o HTML completo do site dentro de dist/index.html, no lugar de <!--app-html-->.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = resolve(root, 'dist/index.html')
const ssrDir = resolve(root, 'dist-ssr')

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)

const template = readFileSync(indexPath, 'utf-8')
if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html sem o marcador <!--app-html-->')
}

const html = template.replace('<!--app-html-->', render())
writeFileSync(indexPath, html)
rmSync(ssrDir, { recursive: true, force: true })

console.log(`Pré-renderizado: dist/index.html (${Math.round(html.length / 1024)} KB)`)
