import { useState } from 'react'
import { portfolio, portfolioHighlights, studio } from '../data/studio'
import { Lightbox } from './Lightbox'
import { Reel } from './Reel'
import { SectionHeading } from './SectionHeading'

const ROWS = [
  { speed: 70, reverse: false },
  { speed: 55, reverse: true },
  { speed: 80, reverse: false },
]

const highlights = portfolioHighlights
  .map((id) => portfolio.find((p) => p.id === id))
  .filter((p): p is (typeof portfolio)[number] => Boolean(p))

export function Portfolio() {
  // A tela cheia percorre primeiro os destaques e depois o portfólio completo
  const [open, setOpen] = useState<{ list: typeof portfolio; index: number } | null>(null)

  return (
    <section id="tatuagens" className="section section--reels">
      <div className="container">
        <SectionHeading title="Trabalhos" />

        {/* Galeria editorial: a fotografia fala, sem legenda. O clique mostra a descrição. */}
        <div className="editorial">
          {highlights.map((item, i) => (
            <button
              key={item.id}
              className="editorial__item"
              onClick={() => setOpen({ list: highlights, index: i })}
              aria-label={`Ampliar: ${item.title}`}
              data-reveal="wipe"
            >
              <img src={item.image} alt={item.title} loading="lazy" />
            </button>
          ))}
        </div>

        <p className="reels__label">Mais trabalhos</p>
      </div>

      <div className="reels">
        {ROWS.map((row, r) => (
          <Reel
            key={r}
            items={portfolio}
            speed={row.speed}
            reverse={row.reverse}
            offset={Math.round((portfolio.length / ROWS.length) * r)}
            onOpen={(index) => setOpen({ list: portfolio, index })}
          />
        ))}
      </div>

      <p className="more">
        <a href={`https://instagram.com/${studio.instagram}`} target="_blank" rel="noreferrer" className="circle-link">
          Mais
          <small>no Instagram</small>
        </a>
      </p>

      {open && (
        <Lightbox
          items={open.list}
          index={open.index}
          onChange={(index) => setOpen({ ...open, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  )
}
