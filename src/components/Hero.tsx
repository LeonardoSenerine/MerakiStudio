import { useEffect, useRef, useState } from 'react'
import { studio } from '../data/studio'
import { booking } from '../hooks/useBooking'
import { RotatingPanels } from './RotatingPanels'
import { Wordmark } from './Wordmark'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

// O topo cria desejo e posicionamento: o que é, onde fica e como agendar. A explicação vem depois.
export function Hero() {
  const [choosing, setChoosing] = useState(false)
  const chooserRef = useRef<HTMLDivElement>(null)

  // Fecha a escolha de agendamento ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!choosing) return
    const onClick = (e: MouseEvent) => {
      if (!chooserRef.current?.contains(e.target as Node)) setChoosing(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setChoosing(false)
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [choosing])

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
        <p className="hero__statement intro" style={delay(1800)}>{studio.statement}</p>
        <p className="hero__offer intro" style={delay(2000)}>{studio.offer}</p>

        <div className="hero__actions intro" style={delay(2200)}>
          <a href="#estudio" className="btn">Conheça o estúdio</a>

          <div className="chooser" ref={chooserRef}>
            <button
              className="btn btn--accent"
              aria-expanded={choosing}
              aria-controls="hero-booking"
              onClick={() => setChoosing(!choosing)}
            >
              Agendar
            </button>
            {choosing && (
              <div id="hero-booking" className="chooser__menu">
                <a href={booking.tatuagem.href} target="_blank" rel="noreferrer">
                  Tatuagem <span>WhatsApp →</span>
                </a>
                <a href={booking.barbearia.href} target="_blank" rel="noreferrer">
                  Barbearia <span>Agenda online →</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
