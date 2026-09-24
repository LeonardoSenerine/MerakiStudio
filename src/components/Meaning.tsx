import { meaning } from '../data/studio'
import { Ornament } from './Ornament'

export function Meaning() {
  return (
    <section className="meaning" aria-labelledby="meaning-word">
      <div className="container meaning__inner" data-reveal="fade">
        <p className="meaning__greek" lang="el">{meaning.greek}</p>
        <h2 id="meaning-word" className="meaning__word">{meaning.word}</h2>
        <p className="meaning__origin">{meaning.origin}</p>
        <Ornament />
        <p className="meaning__text">{meaning.essence}</p>
      </div>
    </section>
  )
}
