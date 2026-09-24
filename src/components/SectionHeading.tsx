import { Ornament } from './Ornament'

type Props = {
  title: string
  intro?: string
  align?: 'center' | 'left'
}

export function SectionHeading({ title, intro, align = 'center' }: Props) {
  return (
    <header className={`heading heading--${align}`}>
      <h2>{title}</h2>
      <Ornament />
      {intro && <p className="heading__intro">{intro}</p>}
    </header>
  )
}
