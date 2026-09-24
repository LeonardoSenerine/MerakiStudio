import { studio } from '../data/studio'

export function Highlight() {
  return (
    <section className="highlight" style={{ backgroundImage: `url(${studio.bookingImage})` }}>
      <div className="highlight__overlay" />
      <div className="container highlight__inner">
        <h2>
          <span className="accent">3x</span> eleito o melhor estúdio de Itatiba
        </h2>
        <p className="highlight__sub">Especialista em tatuagem preto e branco</p>
      </div>
    </section>
  )
}
