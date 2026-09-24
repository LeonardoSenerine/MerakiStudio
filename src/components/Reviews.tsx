import { mapsUrl, reviews } from '../data/studio'

export function Reviews() {
  return (
    <section id="avaliacoes" className="section reviews">
      <div className="container">
        <div className="reviews__head">
          <h2>Avaliações</h2>
          <p className="reviews__score">
            <strong>{reviews.rating}</strong>
            <span className="reviews__stars" aria-hidden="true">★★★★★</span>
            <span>{reviews.total} avaliações no Google</span>
          </p>
        </div>

        <blockquote className="reviews__featured" data-reveal="fade">
          <p>“{reviews.featured.text}”</p>
          <footer>{reviews.featured.name}</footer>
        </blockquote>

        <div className="reviews__list">
          {reviews.list.map((r) => (
            <blockquote key={r.name} className="review">
              <p>“{r.text}”</p>
              {r.detail && <p className="review__detail">{r.detail}</p>}
              <footer>{r.name}</footer>
            </blockquote>
          ))}
        </div>

        <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-link">
          Ver todas as avaliações no Google →
        </a>
      </div>
    </section>
  )
}
