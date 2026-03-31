import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after 400px of scrolling
      if (window.scrollY > 400) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { 
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, x: '-50%', opacity: 0 }}
          animate={{ y: 24, x: '-50%', opacity: 1 }}
          exit={{ y: -80, x: '-50%', opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ position: 'fixed', left: '50%', top: 0, zIndex: 70 }}
        >
          <motion.button
            animate={{ y: [0, 5, 0] }}
            transition={{ 
               duration: 4, 
               repeat: Infinity, 
               ease: "easeInOut" 
            }}
            onClick={scrollToTop}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-6 py-3 text-[10px] font-mono tracking-[0.25em] text-white/80 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_15px_rgba(255,255,255,0.02)] hover:bg-black/60 hover:border-white/20 hover:text-white transition-all group pointer-events-auto"
          >
            <div className="relative flex items-center justify-center">
              <ArrowUp size={13} className="group-hover:-translate-y-1 transition-transform duration-500" />
            </div>
            
            <span className="uppercase font-bold">Back to Top</span>

            {/* Liquid highlight line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
