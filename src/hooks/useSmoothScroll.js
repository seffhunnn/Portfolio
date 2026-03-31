import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothTouch: false,
      touchMultiplier: 1.5,
      normalizeWheel: true,
      wheelMultiplier: 0.9,
    })

    window.__lenis = lenis

    let running = true
    function raf(time) {
      if (!running) return
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // All anchor clicks routed through Lenis
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) lenis.scrollTo(target, { duration: 1.6, offset: -64 })
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      running = false
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}

