import { useEffect, useState } from 'react'
import { studio } from '../data/studio'
import { booking, useBookingKind } from '../hooks/useBooking'
import { Wordmark } from './Wordmark'

const leftLinks = [
  { href: '#estudio', label: 'O estúdio' },
  { href: '#tatuador', label: 'Tatuador' },
  { href: '#tatuagens', label: 'Trabalhos' },
]

const rightLinks = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#barbearia', label: 'Barbearia' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const kind = useBookingKind()

  // Com o menu aberto no celular, a página de trás não rola
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`header ${open ? 'header--open' : ''}`}>
      <div className="container header__inner">
        <nav className="nav nav--left">
          {leftLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>

        <a href="#inicio" className="logo" aria-label={studio.brand}>
          <Wordmark />
          <small>{studio.subtitle}</small>
        </a>

        <div className="header__right">
          <nav className="nav">
            {rightLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <a href={booking[kind].href} target="_blank" rel="noreferrer" className="btn btn--accent btn--small header__cta">
            {booking[kind].label}
          </a>
        </div>

        <button
          className={`burger ${open ? 'burger--open' : ''}`}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="mobile-nav">
          {[...leftLinks, ...rightLinks].map((l) => (
            <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
          ))}
          <a href={booking.tatuagem.href} target="_blank" rel="noreferrer" onClick={close} className="btn btn--accent mobile-nav__cta">
            {booking.tatuagem.label} →
          </a>
          <a href={booking.barbearia.href} target="_blank" rel="noreferrer" onClick={close} className="btn mobile-nav__cta mobile-nav__cta--secondary">
            {booking.barbearia.label} →
          </a>
        </nav>
      )}
    </header>
  )
}
