import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUp } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#social' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const docHeightRef = useRef(0)

  useEffect(() => {
    const updateLayout = () => {
      docHeightRef.current = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    }

    let scheduled = false
    let lastScrolled = false
    let lastShowTop = false

    const handleScroll = () => {
      if (scheduled) return
      scheduled = true

      window.requestAnimationFrame(() => {
        scheduled = false

        const scrollY = window.scrollY
        const nextScrolled = scrollY > 100
        const nextShowTop = scrollY > 500

        if (nextScrolled !== lastScrolled) {
          lastScrolled = nextScrolled
          setScrolled(nextScrolled)
        }
        if (nextShowTop !== lastShowTop) {
          lastShowTop = nextShowTop
          setShowScrollToTop(nextShowTop)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      updateLayout()
      handleScroll()
    }
    window.addEventListener('resize', handleResize, { passive: true })

    updateLayout()
    handleScroll()

    const timer = setTimeout(() => {
      updateLayout()
      handleScroll()
    }, 150)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.6, offset: -64, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.8 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          pointerEvents: scrolled ? 'auto' : 'none',
          background: scrolled ? '#000000' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          transform: `translateY(${scrolled ? '0px' : '-100px'})`,
          opacity: scrolled ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0), opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        }}
      >
        <div className="section-container relative flex items-center justify-between h-16 z-10">
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToTop(e) }}
              className="font-mono font-bold text-xs tracking-widest uppercase transition-opacity duration-200 opacity-90 hover:opacity-100 text-white/90"
            >
              Portfolio
            </a>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 h-full flex items-center pointer-events-none">
            <AnimatePresence>
              {showScrollToTop && (
                <motion.a
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  href="#hero"
                  onClick={scrollToTop}
                  className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-mono tracking-widest text-white/50 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-xl group"
                >
                  <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span className="uppercase">TOP</span>
                </motion.a>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-grow flex items-center justify-end">
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="nav-link text-xs uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="text-2xl font-light text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
