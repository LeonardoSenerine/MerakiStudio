import { studio } from '../data/studio'

const checklist = [
  'A ideia ou o desenho que você quer',
  'O local do corpo',
  'O tamanho aproximado, em centímetros',
  'Fotos de referência, se tiver',
]

export function Booking() {
  const whatsapp = `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent('Olá! Quero fazer um orçamento de tatuagem.')}`

  return (
    <section id="agendar" className="booking">
      <div className="container booking__inner">
        <div className="booking__title">
          <h2>Agendamento só pelo WhatsApp</h2>
          <p className="muted">
            Não tem agenda online. Cada tatuagem começa numa conversa: o Matheus entende a sua ideia, tira as
            dúvidas e passa o orçamento antes de marcar a data.
          </p>
        </div>

        <div className="booking__card">
          <p className="booking__card-title">Na primeira mensagem, mande</p>
          <ol className="checklist">
            {checklist.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn--accent booking__button">
            Chamar no WhatsApp
          </a>
          <p className="booking__phone">{studio.phone}</p>
        </div>
      </div>
    </section>
  )
}
