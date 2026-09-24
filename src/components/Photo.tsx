type Props = {
  src?: string
  alt: string
  className?: string
}

// Foto em preto e branco; sem `src`, mostra um fundo escuro de espera.
export function Photo({ src, alt, className = '' }: Props) {
  return src ? (
    <img src={src} alt={alt} className={`photo ${className}`} loading="lazy" />
  ) : (
    <div className={`photo photo--empty ${className}`} role="img" aria-label={alt} />
  )
}
