import { closing, process, studio, whatsappLink } from '../data/studio'

// Chamada final da tatuagem + informações objetivas (onde, como agendar, como é o atendimento)
export function Closing() {
  return (
    <section id="agendar" className="closing">
      <div className="container closing__inner" data-reveal="fade">
        <h2>{closing.title}</h2>
        <p className="closing__text">{closing.text}</p>
        <a
          href={whatsappLink('Olá! Quero fazer um orçamento de tatuagem.')}
          target="_blank"
          rel="noreferrer"
          className="btn btn--accent closing__button"
        >
          Agendar pelo WhatsApp →
        </a>
        <p className="closing__note">
          {studio.phone}. {process.note}
        </p>

        <dl className="closing__facts">
          {closing.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
