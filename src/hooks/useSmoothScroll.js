import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useSmoothScroll() {
  useEffect(() => {
    // Light lerp-based smooth scroll — relaxed feel, stops quickly, no overshoot
    const lenis = new Lenis({
      lerp: 0.1,          // 0 = instant, 1 = never moves. 0.1 = relaxed but responsive
      smoothTouch: false, // keep touch native
      syncTouch: false,
    })

    window.__lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}
