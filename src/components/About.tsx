import { studio } from '../data/studio'
import { SpaceSection } from './SpaceSection'

export function About() {
  return <SpaceSection id="estudio" title="O estúdio" paragraphs={studio.about} photo={studio.aboutPhoto} />
}
