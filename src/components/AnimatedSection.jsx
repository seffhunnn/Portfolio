import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

import { useRef, createContext, useContext } from 'react'


const SectionScrollContext = createContext(null)

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
}

// Wrap individual animated items
export function AnimatedItem({ children, className = '' }) {
  const idRef = useRef(Math.random().toString())
  const context = useContext(SectionScrollContext)

  // Fallback if not rendered inside AnimatedSection
  if (!context) {
    return (
      <motion.div
        variants={itemVariants}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const { scrollYProgress, registerItem } = context
  const index = registerItem(idRef.current)

  // First item (index === 0) is the Title: reveals early
  // Subsequent items (index > 0) are Section Content: reveals later
  const isTitle = index === 0
  const startRange = isTitle ? 0.2 : 0.45
  const endRange = isTitle ? 0.48 : 0.85

  // Map progress to smooth hardware-accelerated transforms
  const opacity = useTransform(scrollYProgress, [startRange, endRange], [0, 1])
  const y = useTransform(scrollYProgress, [startRange, endRange], [50, 0])
  const scale = useTransform(scrollYProgress, [startRange, endRange], [isTitle ? 0.96 : 0.9, 1])

  // Premium “gray scale + subtle scale” as you scroll upward (hero-like feel)
  // We clamp so the filter always stays in a safe range.
  const grayscale = useTransform(scrollYProgress, [startRange, endRange], [0, 1])

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        filter: useMotionTemplate`grayscale(${grayscale * 100}%)`,


      }}
      className={className}
    >


      {children}
    </motion.div>
  )
}

// Section wrapper — coordinates children stagger on scroll
export default function AnimatedSection({ children, className = '', id = '' }) {
  const ref = useRef(null)

  // Track the scroll progress of the section relative to the viewport
  // 0 is when the top of the section enters the bottom of the screen
  // 1 is when the top of the section reaches the top of the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  // Synchronous item registration on every render
  const registeredItems = useRef([])
  registeredItems.current = []

  const registerItem = (itemId) => {
    if (!registeredItems.current.includes(itemId)) {
      registeredItems.current.push(itemId)
    }
    return registeredItems.current.indexOf(itemId)
  }

  return (
    <SectionScrollContext.Provider value={{ scrollYProgress, registerItem }}>
      <motion.section
        id={id}
        ref={ref}
        className={`relative ${className}`}
      >
        {children}
      </motion.section>
    </SectionScrollContext.Provider>
  )
}
