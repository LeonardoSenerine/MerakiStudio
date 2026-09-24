import { useEffect, useState } from 'react'
import { studio } from '../data/studio'
import { Wordmark } from './Wordmark'

const leftLinks = [
  { href: '#estudio', label: 'O estúdio' },
  { href: '#estilos', label: 'Estilos' },
  { href: '#tatuagens', label: 'Tatuagens' },
]

const rightLinks = [
  { href: '#tatuador', label: 'Tatuador' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#barbearia', label: 'Barbearia' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

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

        <a href="#inicio" className="logo" aria-label={`${studio.name} ${studio.subtitle} Studio`}>
          <Wordmark />
          <small>{studio.subtitle} studio</small>
        </a>

        <div className="header__right">
          <nav className="nav">
            {rightLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <a href="#agendar" className="btn btn--accent btn--small header__cta">Agendar</a>
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
          <a href="#agendar" onClick={close} className="btn btn--accent mobile-nav__cta">Agendar pelo WhatsApp</a>
        </nav>
      )}
    </header>
  )
}
