import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Sssup' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'social', label: 'Contact' }
]

export default function ScrollSpy() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })



  useEffect(() => {
    // Cache section elements once to avoid DOM reads on every scroll.
    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)

    let rafId = 0
    let scheduled = false
    let lastActiveSection = 'hero'
    let lastScrolled = false

    const compute = () => {
      const nextScrolled = window.scrollY > 100
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled
        setScrolled(nextScrolled)
      }

      // Single-pass viewport threshold check (no per-section allocations)
      let currentActive = sections[0].id
      const threshold = window.innerHeight / 2.5

      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i]
        const rectTop = el.getBoundingClientRect().top
        if (rectTop <= threshold) currentActive = el.id
      }

      if (currentActive !== lastActiveSection) {
        lastActiveSection = currentActive
        setActiveSection(currentActive)
      }

      scheduled = false
    }

    const handleScroll = () => {
      if (scheduled) return
      scheduled = true
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        compute()
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    compute() // Trigger immediately to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.6, offset: -64, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const activeIndex = sections.findIndex(s => s.id === activeSection)
  const progressHeight = sections.length > 1 ? (activeIndex / (sections.length - 1)) * 100 : 0

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-50 hidden lg:block w-10 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.25,1)]
        ${scrolled ? 'h-[200px] scale-[0.85] right-4' : 'h-[220px] scale-[0.90] right-6'}
      `}
    >
      {/* Background Track Line */}
      <div className="absolute top-0 bottom-0 w-px bg-white/10 -z-10 left-1/2 -translate-x-1/2" />

      {/* Active Continuous Yellow Progress Line */}
      <motion.div
        className="absolute top-0 w-px bg-yellow-500 shadow-[0_0_12px_rgba(255,221,0,0.8)] -z-10 left-1/2 -translate-x-1/2 origin-top"
        style={{ height: '100%', scaleY }}
      />

      {sections.map((section, idx) => {
        const isActive = activeSection === section.id
        const isPast = idx <= activeIndex
        const topPos = (idx / (sections.length - 1)) * 100

        return (
          <div
            key={section.id}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 group cursor-pointer"
            style={{ top: `${topPos}%` }}
            onClick={() => scrollTo(section.id)}
          >
            {/* Hover/Active Label Tooltip */}
            <div
              className={`absolute right-10 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 pointer-events-none whitespace-nowrap
                ${isActive ? 'opacity-100 text-yellow-500 translate-x-0' : 'opacity-0 text-gray-500 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
              `}
            >
              {section.label}
            </div>

            {/* Milestone Dot */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border-2 
                ${isActive ? 'bg-yellow-500 border-yellow-500 shadow-[0_0_16px_rgba(255,221,0,0.8)] scale-[1.4]' :
                  isPast ? 'bg-[#1a1a1a] border-yellow-500 scale-100' : 'bg-[#0a0a0a] border-white/20 group-hover:border-white/60 scale-100'}
              `}
            />
          </div>
        )
      })}
    </div>
  )
}
