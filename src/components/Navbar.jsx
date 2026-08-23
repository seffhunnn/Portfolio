import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUp } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  useEffect(() => {
    let scheduled = false
    let lastShowTop = false

    const handleScroll = () => {
      if (scheduled) return
      scheduled = true

      window.requestAnimationFrame(() => {
        scheduled = false
        const scrollY = window.scrollY
        const nextShowTop = scrollY > 500

        if (nextShowTop !== lastShowTop) {
          lastShowTop = nextShowTop
          setShowScrollToTop(nextShowTop)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top })
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    if (window.__lenis) {
      window.__lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl select-none">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between">
          
          {/* Brand/Logo in cursive font with custom tapered hand-drawn yellow underline stroke */}
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={scrollToTop}
              className="relative text-zinc-100 hover:text-white transition-all duration-200 py-1 flex flex-col items-center cursor-pointer"
              style={{ 
                fontFamily: "'Caveat', cursive",
                fontSize: '40px',
                fontWeight: '700',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                lineHeight: '0.9',
                transform: 'rotate(-6deg)',
                transformOrigin: 'center center',
                transition: 'transform 200ms ease, color 200ms ease',
              }}
            >
              <span 
                style={{ 
                  display: 'inline-block', 
                }}
              >
                saif
              </span>
              <svg 
                className="absolute left-0 right-0 bottom-[-1px] h-[6px] w-full"
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
                style={{
                  filter: 'drop-shadow(0 1px 3px rgba(255, 221, 0, 0.2))'
                }}
              >
                <path 
                  d="M 0 4 Q 50 2, 100 6 L 100 6.8 Q 50 7.8, 0 9 Z" 
                  fill="#ffdd00"
                />
              </svg>
            </a>
          </div>

          {/* Scroll To Top compact pill */}
          <div className="hidden sm:flex items-center pointer-events-none">
            <AnimatePresence>
              {showScrollToTop && (
                <motion.a
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  href="#"
                  onClick={scrollToTop}
                  className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-[10px] font-mono text-zinc-400 hover:text-[#ffdd00] hover:border-zinc-700 transition-all duration-200 backdrop-blur-md"
                  style={{ textDecoration: 'none' }}
                >
                  <ArrowUp size={11} />
                  <span>TOP</span>
                </motion.a>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Links & Action */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="text-[12.5px] font-mono text-zinc-400 hover:text-[#ffdd00] transition-colors duration-200 select-none"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#social"
              onClick={(e) => { e.preventDefault(); handleNavClick('#social') }}
              className="hidden md:inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 text-[11.5px] font-mono text-zinc-300 transition-all duration-200 hover:border-[#ffdd00]/50 hover:text-[#ffdd00] hover:-translate-y-[1px]"
              style={{ textDecoration: 'none' }}
            >
              Get in touch
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="md:hidden text-zinc-400 hover:text-[#ffdd00] transition-colors p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[64px] z-40 bg-black/95 border-b border-zinc-900 backdrop-blur-2xl flex flex-col p-6 gap-4 select-none"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="text-[14px] font-mono text-zinc-300 hover:text-[#ffdd00] transition-colors duration-200 py-1"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#social"
              onClick={(e) => { e.preventDefault(); handleNavClick('#social') }}
              className="inline-flex items-center justify-center py-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-[12.5px] font-mono text-zinc-300 hover:text-[#ffdd00] hover:border-[#ffdd00]/50 transition-all duration-200 mt-2"
              style={{ textDecoration: 'none' }}
            >
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
