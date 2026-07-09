import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Premium exponential ease-out curve for scroll mapping
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export default function ScrollRevealWrapper({ children }) {
  const containerRef = useRef(null)

  // Track scroll progress as the section moves through the viewport.
  // We complete the animation when the top of the section is near the top (20%) of the screen.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'start 20%'],
  })

  // Aggressive starting parameters to make the transition highly visible and "felt"
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(16% 24% 16% 24% round 48px)', 'inset(0% 0% 0% 0% round 0px)'],
    { ease: easeOutExpo }
  )
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1], { ease: easeOutExpo })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1], { ease: easeOutExpo })

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible"
    >
      <motion.div
        style={{
          clipPath,
          scale,
          opacity,
        }}
        className="w-full h-full overflow-hidden will-change-transform relative"
      >
        {children}
      </motion.div>
    </div>
  )
}
