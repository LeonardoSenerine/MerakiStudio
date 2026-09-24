import { inside } from '../data/studio'

// Deixa claro, logo no começo, o que existe dentro da Meraki
export function Inside() {
  return (
    <section className="inside" aria-labelledby="inside-title">
      <div className="container">
        <h2 id="inside-title" className="inside__title">Dentro da Meraki</h2>
        <div className="inside__list">
          {inside.map((item) => (
            <a key={item.name} href={item.href} className="inside__item">
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
