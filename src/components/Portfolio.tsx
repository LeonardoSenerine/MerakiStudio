import { useState } from 'react'
import { portfolio, studio } from '../data/studio'
import { Lightbox } from './Lightbox'
import { Reel } from './Reel'
import { SectionHeading } from './SectionHeading'

const ROWS = [
  { speed: 70, reverse: false },
  { speed: 55, reverse: true },
  { speed: 80, reverse: false },
]

export function Portfolio() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="tatuagens" className="section section--reels">
      <div className="container">
        <SectionHeading
          title="Trabalhos"
          intro="Toque em uma foto para ampliar."
        />
      </div>

      <div className="reels">
        {ROWS.map((row, r) => (
          <Reel
            key={r}
            items={portfolio}
            speed={row.speed}
            reverse={row.reverse}
            offset={Math.round((portfolio.length / ROWS.length) * r)}
            onOpen={setOpen}
          />
        ))}
      </div>

      <p className="more">
        <a href={`https://instagram.com/${studio.instagram}`} target="_blank" rel="noreferrer" className="circle-link">
          Mais
          <small>no Instagram</small>
        </a>
      </p>

      {open !== null && (
        <Lightbox items={portfolio} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
