// Nome "MERAKI" desenhado em traço fino, reproduzindo o letreiro dourado da recepção
// (letras altas e geométricas, com o A sem travessão).
// Cada letra é um traço: com `animated`, as letras se desenham uma a uma.

const letters = [
  { x: 0, d: 'M4 100V4L35 62L66 4V100' }, // M
  { x: 88, d: 'M44 4H4V96H44M4 50H40' }, // E
  { x: 150, d: 'M4 100V4H27a23 23 0 0 1 0 46H4M24 50L48 100' }, // R
  { x: 216, d: 'M2 100L29 4L56 100' }, // Λ
  { x: 292, d: 'M4 0V100M46 2L9 56M24 36L50 100' }, // K
  { x: 362, d: 'M4 0V100' }, // I
]

type Props = {
  className?: string
  animated?: boolean
  /** Atraso inicial da animação, em ms. */
  delay?: number
}

export function Wordmark({ className = '', animated = false, delay = 0 }: Props) {
  return (
    <svg
      className={`wordmark ${animated ? 'wordmark--draw' : ''} ${className}`}
      viewBox="-4 -6 378 112"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinejoin="miter"
      role="img"
      aria-label="Meraki"
    >
      {letters.map((l, i) => (
        <path
          key={i}
          d={l.d}
          transform={`translate(${l.x} 0)`}
          pathLength={1}
          style={{ '--delay': `${delay + i * 180}ms` } as React.CSSProperties}
        />
      ))}
    </svg>
  )
}
