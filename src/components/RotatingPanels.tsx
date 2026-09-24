import { useEffect, useState } from 'react'

type Props = {
  /** Uma lista de fotos por coluna. */
  columns: string[][]
  /** Intervalo entre trocas, em ms. */
  stepMs?: number
  className?: string
}

const MOBILE = '(max-width: 640px)'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE)
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

// Fundo de fotos que se alternam devagar.
// No computador: colunas lado a lado, trocando uma coluna por vez, em rodízio.
// No celular: uma coluna só, passando por todas as fotos.
export function RotatingPanels({ columns, stepMs = 3000, className = '' }: Props) {
  const mobile = useIsMobile()
  const cells = mobile ? [columns.flat()] : columns
  const [shown, setShown] = useState<number[]>(() => cells.map(() => 0))

  useEffect(() => {
    setShown(cells.map(() => 0))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let step = 0
    const timer = setInterval(() => {
      const column = step % cells.length
      setShown((current) =>
        current.map((photo, i) => (i === column ? (photo + 1) % cells[i].length : photo)),
      )
      step++
    }, mobile ? stepMs + 1000 : stepMs)
    return () => clearInterval(timer)
  }, [mobile, columns, stepMs])

  return (
    <div className={`hero__media ${className}`}>
      {cells.map((photos, i) => (
        <div key={i} className="hero__cell" style={{ '--delay': `${i * 250}ms` } as React.CSSProperties}>
          {photos.map((src, j) => (
            <div
              key={src}
              className={`hero__panel ${j === (shown[i] ?? 0) ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
