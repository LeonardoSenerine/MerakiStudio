type Props = {
  id?: string
  title: string
  paragraphs: string[]
  photo: { src: string; alt: string }
}

// Formato comum aos dois salões (tatuagem e barbearia): texto à esquerda, foto à direita.
// O primeiro parágrafo aparece em destaque.
export function SpaceSection({ id, title, paragraphs, photo }: Props) {
  const [intro, ...rest] = paragraphs

  return (
    <section id={id} className="section about-section">
      <div className="container about">
        <div className="about__text">
          <h2>{title}</h2>
          <p className="about__intro">{intro}</p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="about__body">{paragraph}</p>
          ))}
        </div>

        <figure className="about__photo" data-reveal="wipe">
          <img src={photo.src} alt={photo.alt} />
        </figure>
      </div>
    </section>
  )
}
