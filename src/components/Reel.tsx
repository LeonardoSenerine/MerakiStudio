import type { PortfolioItem } from '../data/studio'

type Props = {
  items: PortfolioItem[]
  /** Segundos para a faixa dar uma volta completa. */
  speed: number
  reverse?: boolean
  /** Posição da lista em que a faixa começa. */
  offset?: number
  onOpen: (index: number) => void
}

// Faixa de fotos correndo em loop. Pausa com o mouse; o clique abre a foto em tela cheia.
export function Reel({ items, speed, reverse = false, offset = 0, onOpen }: Props) {
  // Repete a lista até a faixa ficar mais larga que qualquer tela
  const base: { item: PortfolioItem; index: number }[] = []
  while (base.length < 12) {
    items.forEach((_, i) => {
      const index = (i + offset) % items.length
      base.push({ item: items[index], index })
    })
  }

  return (
    <div
      className={`reel ${reverse ? 'reel--reverse' : ''}`}
      style={{ '--speed': `${speed}s` } as React.CSSProperties}
    >
      <div className="reel__track">
        {/* Duas cópias em sequência: quando a primeira sai da tela, a segunda está no lugar dela */}
        {[0, 1].map((copy) =>
          base.map(({ item, index }, i) => {
            const hidden = copy === 1 || i >= items.length
            return (
              <button
                key={`${copy}-${i}`}
                className="reel__item"
                onClick={() => onOpen(index)}
                aria-hidden={hidden}
                tabIndex={hidden ? -1 : 0}
                aria-label={`Ampliar: ${item.title}`}
              >
                <img src={item.image} alt={hidden ? '' : item.title} loading="lazy" />
                <span className="reel__caption">
                  <strong>{item.title}</strong>
                  <span>{item.style}</span>
                </span>
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}
