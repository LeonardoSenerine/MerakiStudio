import { studio } from '../data/studio'
import { RotatingPanels } from './RotatingPanels'
import { Wordmark } from './Wordmark'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

export function Hero() {
  const whatsapp = `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent('Olá! Quero fazer um orçamento de tatuagem.')}`

  return (
    <section id="inicio" className="hero">
      {/* As fotos do estúdio são verticais: lado a lado, aparecem quase inteiras */}
      <RotatingPanels columns={studio.heroPanels} />
      <div className="hero__overlay" />

      <div className="container hero__content">
        <h1 className="hero__title">
          <Wordmark animated delay={500} />
          <span className="intro" style={delay(1700)}>{studio.subtitle} studio</span>
        </h1>
        <p className="ribbon intro" style={delay(1900)}>{studio.award}</p>
        <p className="hero__tagline intro" style={delay(2100)}>{studio.tagline}</p>
        <div className="hero__actions intro" style={delay(2300)}>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn--accent">
            Fazer orçamento
          </a>
          <a href="#tatuagens" className="btn">Ver trabalhos</a>
        </div>
      </div>
    </section>
  )
}
