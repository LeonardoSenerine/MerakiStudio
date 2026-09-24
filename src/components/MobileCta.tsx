import { whatsappLink } from '../data/studio'

// Barra fixa no rodapé da tela, só no celular: o WhatsApp sempre a um toque.
// Aparece depois que o visitante sai do topo (classe "past-hero" no <body>).
export function MobileCta() {
  return (
    <a
      href={whatsappLink('Olá! Quero agendar um horário na Meraki.')}
      target="_blank"
      rel="noreferrer"
      className="mobile-cta"
    >
      Agendar horário →
    </a>
  )
}
