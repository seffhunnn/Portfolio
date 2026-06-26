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

  const progressRef = useRef(null)
  const textRef = useRef(null)
  const textLayoutRef = useRef({ leftPct: 0, rightPct: 0 })
  const docHeightRef = useRef(0)

  useEffect(() => {
    const updateLayout = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect()
        const w = window.innerWidth
        if (w > 0) {
          textLayoutRef.current = {
            leftPct: rect.left / w,
            rightPct: rect.right / w
          }
        }
      }
      // Cache scrollable document height (scrollHeight - innerHeight) to prevent layout reflow during scroll ticks
      docHeightRef.current = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 40)
      setShowScrollToTop(scrollY > 500)

      const docHeight = docHeightRef.current
      const progress = docHeight > 0 ? scrollY / docHeight : 0

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }

      // Update logo text
      const { leftPct, rightPct } = textLayoutRef.current
      if (rightPct > leftPct) {
        let textProgress = 0
        if (progress > leftPct) {
          if (progress >= rightPct) {
            textProgress = 1
          } else {
            textProgress = (progress - leftPct) / (rightPct - leftPct)
          }
        }
        if (textRef.current) {
          textRef.current.style.setProperty('--text-progress', `${textProgress * 100}%`)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    const handleResize = () => {
      updateLayout()
      handleScroll()
    }
    window.addEventListener('resize', handleResize, { passive: true })
    
    // Initial call to set layout and correct position
    updateLayout()
    handleScroll()

    // Wait a tiny bit for layout/fonts to settle to ensure accurate position caching
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
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          boxShadow: scrolled
             ? '0 1px 0 0 rgba(255,255,255,0.05), 0 4px 20px 0 rgba(0,0,0,0.5)'
             : 'none',
        }}
      >
        <div className="section-container relative flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <a
              ref={textRef}
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToTop(e) }}
              className="font-mono font-bold text-xs tracking-widest uppercase transition-opacity duration-200 opacity-90 hover:opacity-100"
              style={{
                background: 'linear-gradient(to right, #ffdd00 var(--text-progress, 0%), rgba(255, 255, 255, 0.9) var(--text-progress, 0%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Saif | Portfolio
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

          {/* Nav links (justified right) */}
          <div className="flex-grow flex items-center justify-end">
            {/* Desktop nav */}
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

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Real-time Scroll Progress Indicator */}
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-500/50 origin-left will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </motion.nav>

      {/* Mobile drawer code removed for brevity but same as before */}
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
