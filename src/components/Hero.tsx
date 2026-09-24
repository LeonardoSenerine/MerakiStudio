import { studio, whatsappLink } from '../data/studio'
import { RotatingPanels } from './RotatingPanels'
import { Wordmark } from './Wordmark'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

// Em 3 segundos o visitante precisa saber: o nome, o que é, onde fica, o que oferece e como agendar.
export function Hero() {
  return (
    <section id="inicio" className="hero">
      {/* As fotos do estúdio são verticais: lado a lado, aparecem quase inteiras */}
      <RotatingPanels columns={studio.heroPanels} />
      <div className="hero__overlay" />

      <div className="container hero__content">
        <p className="hero__kicker intro" style={delay(200)}>{studio.location}</p>
        <h1 className="hero__title">
          <Wordmark animated delay={400} />
          <span className="intro" style={delay(1500)}>Tatuagem &amp; Barbearia</span>
        </h1>
        <p className="hero__statement intro" style={delay(1800)}>
          {studio.statement[0]}
          <br />
          {studio.statement[1]}
        </p>
        <p className="hero__offer intro" style={delay(2000)}>{studio.offer}</p>
        <div className="hero__actions intro" style={delay(2200)}>
          <a href={whatsappLink('Olá! Quero agendar um horário na Meraki.')} target="_blank" rel="noreferrer" className="btn btn--accent">
            Agendar horário →
          </a>
          <a href="#tatuagens" className="text-link">Ver trabalhos</a>
        </div>
      </div>
    </section>
  )
}
