import { studio } from '../data/studio'
import { SpaceSection } from './SpaceSection'

export function About() {
  return <SpaceSection id="estudio" title="Salão de tatuagem" paragraphs={studio.about} photo={studio.aboutPhoto} />
}
