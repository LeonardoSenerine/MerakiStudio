import { useEffect, useState } from 'react'
import { barbershop, whatsappLink } from '../data/studio'

export type BookingKind = 'tatuagem' | 'barbearia'

// Os dois agendamentos da Meraki: a tatuagem pelo WhatsApp e a barbearia pela agenda online.
export const booking = {
  tatuagem: {
    label: 'Agendar tatuagem',
    href: whatsappLink('Olá! Quero fazer um orçamento de tatuagem.'),
  },
  barbearia: {
    label: 'Agendar barbearia',
    href: barbershop.bookingUrl,
  },
} as const

// Qual agendamento faz sentido para o que a pessoa está vendo:
// a partir do bloco da barbearia (elemento .barbershop), é o da barbearia.
export function useBookingKind(): BookingKind {
  const [kind, setKind] = useState<BookingKind>('tatuagem')

  useEffect(() => {
    const update = () => {
      const block = document.querySelector('.barbershop')
      if (!block) return
      const inBarbershop = block.getBoundingClientRect().top < window.innerHeight * 0.5
      setKind(inBarbershop ? 'barbearia' : 'tatuagem')
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return kind
}
