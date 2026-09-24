import { process, whatsappLink } from '../data/studio'

// Como funciona para tatuar, com o convite para conversar logo depois
export function Booking() {
  return (
    <section id="como-funciona" className="booking">
      <div className="container booking__inner">
        <h2>{process.title}</h2>

        <ol className="process">
          {process.steps.map((step, i) => (
            <li key={step.name} data-reveal="fade" style={{ '--delay': `${i * 150}ms` } as React.CSSProperties}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="booking__cta">
          <p className="booking__invite">
            Gostou do trabalho?
            <br />
            Vamos conversar sobre sua ideia.
          </p>
          <a
            href={whatsappLink('Olá! Quero conversar sobre uma ideia de tatuagem.')}
            target="_blank"
            rel="noreferrer"
            className="btn btn--accent"
          >
            Falar com a Meraki →
          </a>
        </div>
      </div>
    </section>
  )
}
