import { useEffect } from 'react'

// Revela as fotos com [data-reveal] quando entram na tela e marca o <body>
// quando a página foi rolada (o header ganha fundo).
export function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    const watch = (root: ParentNode) =>
      root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el))
    watch(document)

    // Elementos que entram na página depois (ou são recriados) também precisam ser vigiados;
    // sem isso ficariam escondidos para sempre.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches('[data-reveal]:not(.is-visible)')) observer.observe(node)
          watch(node)
        })
      }
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    // Marca o header como rolado e expõe a posição para o parallax do topo (--scroll-y).
    // Também revela pelo scroll, caso o IntersectionObserver não dispare (acontece em
    // algumas abas em segundo plano); assim nenhuma foto fica presa escondida.
    const revealInView = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect()
        if (top < window.innerHeight * 0.9 && bottom > 0) el.classList.add('is-visible')
      })
    }

    const onScroll = () => {
      revealInView()
      document.body.classList.toggle('is-scrolled', window.scrollY > 40)
      document.documentElement.style.setProperty('--scroll-y', String(Math.min(window.scrollY, 1200)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
