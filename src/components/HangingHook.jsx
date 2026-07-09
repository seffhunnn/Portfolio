import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function HangingHook() {
  const [hovered, setHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const y = useMotionValue(-150)

  // Calculate dynamic heights for the cord based on ring position
  const cordHeight = useTransform(y, (latestY) => latestY + 40)

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

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    // If absolute pulled cable length is past 130px, trigger redirection
    if (y.get() > 130) {
      // 1. Release snap animation (bounces high like a rubber band back to rest position 40)
      animate(y, 170, { duration: 0.06 }).then(() => {
        animate(y, 40, {
          type: 'spring',
          stiffness: 700,
          damping: 12,
          mass: 0.5,
        })
      })

      // 2. Open the guns.lol profile in a new tab
      window.open('https://guns.lol/seffhunnn', '_blank')
    } else {
      // If let go early, snap back to rest position 40
      animate(y, 40, {
        type: 'spring',
        stiffness: 400,
        damping: 20,
      })
    }
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={isDragging ? { rotate: 0 } : { rotate: [-3.2, 3.2, -3.2] }}
      transition={isDragging ? { duration: 0.1 } : { repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      style={{ transformOrigin: 'top center' }}
      className={`fixed top-0 right-28 sm:right-40 z-[9999] w-8 h-8 pointer-events-none transition-transform duration-300 ease-out ${
        hovered ? 'translate-y-1.5' : 'translate-y-0'
      }`}
    >
      {/* Dynamic Dotted Pulley Cord - Steel Cable */}
      <svg className="absolute top-0 left-0 w-8 h-[250px] overflow-visible">
        {/* Core steel cable */}
        <motion.line
          x1={16}
          y1={0}
          x2={16}
          y2={y}
          stroke="#e4e4e7"
          strokeWidth={2.5}
          className="opacity-50"
        />
        {/* Helical wire pattern simulation */}
        <motion.line
          x1={16}
          y1={0}
          x2={16}
          y2={y}
          stroke="#71717a"
          strokeWidth={1.5}
          strokeDasharray="3 3"
          className="opacity-70"
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
        <svg viewBox="0 0 32 64" className="w-8 h-16 overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
          {/* Blue swaged sleeve / ferrule */}
          <rect x="12" y="0" width="8" height="12" rx="1.5" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
          
          {/* Loop wire outline */}
          <path
            d="M 16,12 C 8,12 5,26 5,36 C 5,46 16,50 16,50 C 16,50 27,46 27,36 C 27,26 24,12 16,12 Z"
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Helical wire rope texture overlay */}
          <path
            d="M 16,12 C 8,12 5,26 5,36 C 5,46 16,50 16,50 C 16,50 27,46 27,36 C 27,26 24,12 16,12 Z"
            fill="none"
            stroke="#71717a"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeLinecap="round"
            className="opacity-80"
          />
        </svg>

        {/* Pulse Ring Indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-white/20 animate-ping pointer-events-none opacity-20" />

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.8,
            y: hovered ? 0 : -10,
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-white text-black font-mono text-[9px] font-black tracking-widest uppercase pointer-events-none whitespace-nowrap shadow-lg border border-white/10"
        >
          PULL ME
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
