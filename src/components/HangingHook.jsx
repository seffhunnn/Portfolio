import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useScroll } from 'framer-motion'

export default function HangingHook() {
  const [hovered, setHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const y = useMotionValue(-150)
  
  // Track scroll position to collapse hook on scroll down
  const { scrollY } = useScroll()
  const scrollYOffset = useTransform(scrollY, [0, 250], [0, -180], { clamp: true })

  // Tracks if the user has triggered the redirection by pulling the rope fully down
  const isPulledOutRef = useRef(false)

  // Landing animation on mount: slide down into view
  useEffect(() => {
    animate(y, 40, {
      type: 'spring',
      stiffness: 140,
      damping: 16,
      mass: 0.9,
      delay: 0.8, // delay to let initial page entrance finish
    })
  }, [])

  // Handle focus return state machine
  useEffect(() => {
    const handleFocus = () => {
      // If the user is returning to the tab after triggering the guns.lol portal:
      if (isPulledOutRef.current) {
        isPulledOutRef.current = false
        // Play a smooth, relaxed spring return animation back to the resting position (40px)
        animate(y, 40, {
          type: 'spring',
          stiffness: 110,
          damping: 20,
          mass: 1.0,
        })
      } else {
        // Otherwise, simply make sure the coordinates are cleanly reset
        y.set(40)
      }
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    // If absolute pulled cable length is past 130px, trigger redirection
    if (y.get() > 130) {
      // Mark as fully pulled down and lock it at the bottom position (150px)
      isPulledOutRef.current = true
      y.set(150)

      // Open the guns.lol profile in a new tab immediately
      window.open('https://guns.lol/seffhunnn', '_blank')
    } else {
      // If let go early, snap back to rest position 40 smoothly
      animate(y, 40, {
        type: 'spring',
        stiffness: 140,
        damping: 18,
      })
    }
  }

  return (
    <motion.div
      style={{ y: scrollYOffset }}
      className="fixed top-0 right-28 sm:right-40 z-[9999] w-8 h-8 pointer-events-none"
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={isDragging ? { rotate: 0, y: 0 } : { rotate: [-3.2, 3.2, -3.2], y: hovered ? 1.5 : 0 }}
        transition={{
          rotate: isDragging ? { duration: 0.1 } : { repeat: Infinity, duration: 8, ease: 'easeInOut' },
          y: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        style={{ transformOrigin: 'top center' }}
        className="relative w-8 h-8 pointer-events-none"
      >
        {/* Dynamic Dotted Pulley Cord - Steel Cable */}
        <svg className="absolute top-0 left-0 w-8 h-[250px] overflow-visible">
          {/* Core steel cable */}
          <motion.line
            x1={16}
            y1={0}
            x2={16}
            y2={y}
            stroke="#71717a"
            strokeWidth={3.5}
            className="opacity-50"
          />
          {/* Helical wire pattern simulation */}
          <motion.line
            x1={16}
            y1={0}
            x2={16}
            y2={y}
            stroke="#3f3f46"
            strokeWidth={2.5}
            strokeDasharray="4 4"
            className="opacity-75"
          />
        </svg>

        {/* Pull Loop Handle - Steel Wire Loop (No Tag) */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 40, bottom: 180 }}
          dragElastic={0.08}
          dragMomentum={false}
          style={{ y }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="absolute top-0 left-0 w-8 h-16 flex items-start justify-center cursor-grab active:cursor-grabbing pointer-events-auto overflow-visible"
        >
          <svg viewBox="0 0 32 64" className="w-8 h-16 overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#d4d4d8" />
                <stop offset="70%" stopColor="#88888b" />
                <stop offset="100%" stopColor="#3f3f46" />
              </linearGradient>
            </defs>

            {/* Top Eyelet Ring - Thinner */}
            <circle cx="16" cy="6" r="4.2" fill="none" stroke="url(#silver-grad)" strokeWidth="2" />
            
            {/* Curved Silver J-Hook body (thin, sleek, and wide-sweeping curve) */}
            <path
              d="M 18,10 C 18,20 24,26 24,34 C 24,48 4,48 4,34 L 4,18 L 7,23 L 6,25 C 6.5,28 6.5,34 6.5,34 C 6.5,45.5 21.5,45.5 21.5,34 C 21.5,26 15.5,20 15.5,10 Z"
              fill="url(#silver-grad)"
              stroke="#3f3f46"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Inner 3D specular highlight */}
            <path
              d="M 16.75,11 C 16.75,20.5 22.75,27 22.75,34 C 22.75,46.75 5.25,46.75 5.25,34 L 5.25,20"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.6"
              className="opacity-75"
              strokeLinecap="round"
            />
          </svg>

          {/* Pulse Ring Indicator */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-white/20 animate-ping pointer-events-none opacity-30" />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.8,
              y: hovered ? 0 : -10,
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#0a0a0a]/95 text-white font-mono text-[9px] font-black tracking-widest uppercase pointer-events-none whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.8)] border border-white/20"
          >
            PULL ME
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
