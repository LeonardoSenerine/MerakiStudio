import { styles } from '../data/studio'
import { SectionHeading } from './SectionHeading'

export function Styles() {
  return (
    <section id="estilos" className="section section--alt styles-section">
      <div className="container">
        <SectionHeading
          title="Estilos"
          intro="O foco do estúdio é preto e cinza. Estes são os estilos que o Matheus mais tatua."
        />
        <div className="styles">
          {styles.map((s) => (
            <article key={s.title} className="style-card" style={{ backgroundImage: `url(${s.image})` }}>
              <div className="style-card__body">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
