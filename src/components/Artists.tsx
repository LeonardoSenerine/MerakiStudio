import { artist, whatsappLink } from '../data/studio'
import { Photo } from './Photo'

export function Artists() {
  return (
    <section id="tatuador" className="section artist-section">
      <div className="container artist-feature">
        <div className="artist-feature__photo" data-reveal="wipe">
          <Photo src={artist.image} alt={`Foto de ${artist.name}`} />
        </div>

        <div>
          <p className="artist-feature__role">{artist.role}</p>
          <h2>{artist.name}</h2>
          <p className="profile-statement">{artist.statement}</p>
          <p className="muted">{artist.focus}</p>

          <div className="artist-feature__actions">
            <a
              href={whatsappLink('Olá, Matheus! Quero fazer um orçamento de tatuagem.')}
              target="_blank"
              rel="noreferrer"
              className="btn btn--accent"
            >
              Agendar com o Matheus →
            </a>
            <a href={`https://instagram.com/${artist.instagram}`} target="_blank" rel="noreferrer" className="text-link">
              @{artist.instagram}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
