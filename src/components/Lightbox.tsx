import { useEffect } from 'react'
import type { PortfolioItem } from '../data/studio'

type Props = {
  items: PortfolioItem[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

// Visualização em tela cheia com navegação por setas (tela e teclado).
export function Lightbox({ items, index, onChange, onClose }: Props) {
  const item = items[index]
  const prev = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  })

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Fechar">×</button>
      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label="Anterior"
      >
        ‹
      </button>

      <figure key={item.id} className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={item.image} alt={item.title} />
        <figcaption>
          <strong>{item.title}</strong>
          <span>{item.style}</span>
          <small>{index + 1} / {items.length}</small>
        </figcaption>
      </figure>

      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label="Próxima"
      >
        ›
      </button>
    </div>
  )
}
