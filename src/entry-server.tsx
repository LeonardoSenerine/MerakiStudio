// Usado só no build: gera o HTML completo da página (pré-renderização),
// para buscadores e prévias de link lerem o conteúdo sem precisar rodar JavaScript.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
