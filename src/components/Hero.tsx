import { studio } from '../data/studio'
import { booking } from '../hooks/useBooking'
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
          <span className="intro" style={delay(1500)}>{studio.subtitle}</span>
        </h1>
        <p className="hero__statement intro" style={delay(1800)}>
          {studio.statement[0]}
          <br />
          {studio.statement[1]}
        </p>
        <p className="hero__offer intro" style={delay(2000)}>{studio.offer}</p>
        <div className="hero__actions intro" style={delay(2200)}>
          <a href={booking.tatuagem.href} target="_blank" rel="noreferrer" className="btn btn--accent">
            {booking.tatuagem.label} →
          </a>
          <a href={booking.barbearia.href} target="_blank" rel="noreferrer" className="btn">
            {booking.barbearia.label} →
          </a>
        </div>
      </div>
    </section>
  )
}
