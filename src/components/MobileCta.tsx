import { booking, useBookingKind } from '../hooks/useBooking'

// Barra fixa no rodapé da tela, só no celular: o agendamento sempre a um toque.
// Aparece depois que o visitante sai do topo (classe "past-hero" no <body>) e muda
// entre tatuagem e barbearia conforme a parte do site que a pessoa está vendo.
export function MobileCta() {
  const kind = useBookingKind()
  const { label, href } = booking[kind]

  return (
    <a href={href} target="_blank" rel="noreferrer" className={`mobile-cta mobile-cta--${kind}`}>
      {label} →
    </a>
  )
}
