import { artist } from '../data/studio'
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
          <p className="muted">{artist.bio}</p>

          <div className="artist-feature__actions">
            <a href="#agendar" className="btn btn--accent">Agendar com o Matheus</a>
            <a
              href={`https://instagram.com/${artist.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              @{artist.instagram} no Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
