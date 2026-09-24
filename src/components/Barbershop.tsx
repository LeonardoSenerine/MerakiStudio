import { useState } from 'react'
import { barber, barbershop, studio, type BarberWork } from '../data/studio'
import { Lightbox } from './Lightbox'
import { RotatingPanels } from './RotatingPanels'
import { SpaceSection } from './SpaceSection'

const FILTERS = ['Todos', 'Locs e tranças', 'Corte e barba'] as const

// Bloco da barbearia dentro da página: abre com uma faixa própria para marcar
// que o assunto mudou de tatuagem para barbearia.
export function Barbershop() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Todos')
  const [open, setOpen] = useState<number | null>(null)
  const works: BarberWork[] = filter === 'Todos' ? barbershop.works : barbershop.works.filter((w) => w.category === filter)
  const whatsapp = `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent('Olá, Bruno! Quero agendar um horário na barbearia.')}`

  return (
    <div className="barbershop">
      <section id="barbearia" className="barber-opener">
        <RotatingPanels columns={barbershop.heroColumns} className="barber-opener__media" />
        <div className="barber-opener__overlay" />
        <div className="container barber-opener__content" data-reveal="fade">
          <img className="barber-opener__sign" src={barbershop.sign.src} alt={barbershop.sign.alt} />
          <p className="ribbon">{barbershop.specialties}</p>
          <p className="barber-opener__tagline">{barbershop.tagline}</p>
        </div>
      </section>

      <SpaceSection id="barbearia-salao" title="Salão da barbearia" paragraphs={barbershop.space} photo={barbershop.place} />

      <section className="section barber-profile">
        <div className="container barber-profile__inner">
          <div>
            <p className="artist-feature__role">{barber.role}</p>
            <h2>{barber.name}</h2>
            <blockquote className="barber-profile__quote">{barber.quote}</blockquote>
            <p className="muted">{barber.bio}</p>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn--accent">Agendar com o Bruno</a>
          </div>
          <div className="barber-profile__portrait" data-reveal="wipe">
            <img src={barber.image} alt={`${barber.name} sentado na porta de um carro`} />
          </div>
        </div>
      </section>

      <section id="barbearia-trabalhos" className="section section--alt barber-works">
        <div className="container">
          <div className="barber-works__head">
            <div>
              <h2>Trabalhos do Bruno</h2>
              </div>
            <div className="filters" role="tablist" aria-label="Filtrar trabalhos">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  className={filter === f ? 'is-active' : ''}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="works-grid">
            {works.map((w, i) => (
              <button key={w.id} className="work-tile" onClick={() => setOpen(i)} aria-label={`Ampliar: ${w.title}`}>
                <img src={w.image} alt={w.title} loading="lazy" />
                <span className="work-tile__caption">
                  <strong>{w.title}</strong>
                  <span>{w.category}</span>
                </span>
              </button>
            ))}
          </div>

          <p className="more">
            <a
              href={`https://www.instagram.com/${barbershop.instagram}/`}
              target="_blank"
              rel="noreferrer"
              className="circle-link circle-link--wide"
            >
              Ver mais
              <small>@{barbershop.instagram}</small>
            </a>
          </p>

          <p className="barber-works__cta">
            Agendamento pelo WhatsApp da Meraki, {studio.phone}.{' '}
            <a href={whatsapp} target="_blank" rel="noreferrer" className="text-link">Chamar o Bruno →</a>
          </p>
        </div>

        {open !== null && (
          <Lightbox items={works} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
        )}
      </section>
    </div>
  )
}
