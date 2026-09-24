import { process, studio, whatsappLink } from '../data/studio'

export function Booking() {
  return (
    <section id="agendar" className="booking">
      <div className="container booking__inner">
        <h2>{process.title}</h2>

        <ol className="process">
          {process.steps.map((step, i) => (
            <li key={step} data-reveal="fade" style={{ '--delay': `${i * 200}ms` } as React.CSSProperties}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ol>

        <div className="booking__cta">
          <a
            href={whatsappLink('Olá! Quero fazer um orçamento de tatuagem.')}
            target="_blank"
            rel="noreferrer"
            className="btn btn--accent"
          >
            Quero agendar →
          </a>
          <p className="muted">
            WhatsApp {studio.phone}. {process.note}
          </p>
        </div>
      </div>
    </section>
  )
}
