import { mapsUrl, studio } from '../data/studio'
import { Wordmark } from './Wordmark'

export function Footer() {
  const mapQuery = encodeURIComponent(studio.address)

  return (
    <footer id="contato" className="footer">
      <div className="footer__grid">
        <div className="footer__info">
          <div className="logo logo--footer">
            <Wordmark />
            <small>{studio.subtitle} studio</small>
          </div>

          <dl className="footer__contact">
            <div>
              <dt>Endereço</dt>
              <dd><a href={mapsUrl} target="_blank" rel="noreferrer">{studio.address}</a></dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd><a href={`https://wa.me/${studio.whatsapp}`} target="_blank" rel="noreferrer">{studio.phone}</a></dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd><a href={`https://instagram.com/${studio.instagram}`} target="_blank" rel="noreferrer">@{studio.instagram}</a></dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{studio.hours}</dd>
            </div>
          </dl>
        </div>

        <iframe
          className="map"
          title="Mapa do estúdio"
          src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
          loading="lazy"
        />
      </div>

      <p className="footer__copy">© {new Date().getFullYear()} {studio.name} {studio.subtitle} Studio, Itatiba/SP</p>
    </footer>
  )
}
