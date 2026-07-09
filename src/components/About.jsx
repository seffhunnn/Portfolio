import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { about } from '../data'
import { GraduationCap, Sparkles, User } from 'lucide-react'
import { getTagColor, tagColors } from '../utils/colors'

// Individual tag component with scroll-based animations
const InterestTag = ({ interest, index, smoothProgress, className }) => {
  const startIn = 0.15 + index * 0.02
  const endIn = 0.30 + index * 0.02
  const startOut = 0.70 + index * 0.015
  const endOut = 0.88 + index * 0.015

  const opacity = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [0, 1, 1, 0])
  const scale = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [0.98, 1, 1, 0.98])
  const y = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [10, 0, 0, -10])

  const blurVal = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [4, 0, 0, 4])
  const filter = useMotionTemplate`blur(${blurVal}px)`

  return (
    <motion.span
      style={{ opacity, scale, y, filter }}
      className={className}
    >
      {interest}
    </motion.span>
  )
}

export default function About() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Apply spring physics for buttery smooth interpolation (60fps feel)
  // NOTE: smoother scrolling can feel jittery if blur filters are heavy; keep spring snappy.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 520,
    damping: 45,
    mass: 0.65,
    restDelta: 0.001
  })

  // Helper function for scroll-based transforms with entrance and exit
  const getScrollTransforms = (index) => {
    // We group by column to keep timings tight: left column (0-3), right column (4-6)
    const staggerIndex = index >= 4 ? index - 4 : index
    const offset = staggerIndex * 0.05

    const startIn = 0.08 + offset
    const endIn = 0.25 + offset
    const startOut = 0.70 + offset
    const endOut = 0.88 + offset

    const opacity = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [0, 1, 1, 0])

    // Completely relaxed: No horizontal sliding, just a tiny vertical drift
    const x = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [0, 0, 0, 0])

    // Very subtle vertical drift for a calm entrance/exit
    const y = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [15, 0, 0, -10])

    const scale = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [0.98, 1, 1, 0.98])

    // Gentle blur
    const blurVal = useTransform(smoothProgress, [startIn, endIn, startOut, endOut], [4, 0, 0, 4])
    const filter = useMotionTemplate`blur(${blurVal}px)`

    return { opacity, x, y, scale, filter }
  }

  // Generate transforms for each element
  const descHeaderTrans = getScrollTransforms(0)
  const descCardTrans = getScrollTransforms(1)
  const interestsHeaderTrans = getScrollTransforms(2)
  const interestsCardTrans = getScrollTransforms(3)
  const eduHeaderTrans = getScrollTransforms(4)
  const eduCard0Trans = getScrollTransforms(5)
  const eduCard1Trans = getScrollTransforms(6)

  return (
    <AnimatedSection id="about" className="pt-16 pb-32 relative z-10">
      <div ref={containerRef} className="section-container relative">
        {/* Section label */}
        <AnimatedItem>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">01 / about</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">About Me</h2>
          <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
        </AnimatedItem>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Intro Column */}
          <div>
            {/* Description Header */}
            <motion.div style={descHeaderTrans}>
              <div className="flex items-center gap-2 mb-6">
                <User size={14} className="text-gray-500" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Description</span>
              </div>
            </motion.div>

            {/* Description Card */}
            <motion.div style={descCardTrans}>
              <div
                className="group relative glass-card rounded-[1.25rem] p-6 border-l-2 border-yellow-500/10 hover:border-yellow-500/40 hover:bg-white/[0.03] mb-6 transition-[border-color,background-color] duration-500"
              >
                {/* Minimal Yellow Milestone Glow */}
                <div className="absolute top-6 -left-[3px] w-1 h-3 bg-yellow-500/30 rounded-full group-hover:h-6 group-hover:bg-yellow-500 transition-all duration-500" />

                {/* Corner accent glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <p className="relative z-10 text-gray-400 text-[15px] leading-relaxed whitespace-pre-line">
                  {about.intro}
                </p>
              </div>
            </motion.div>

            {/* Interests Header */}
            <motion.div style={interestsHeaderTrans}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-gray-500" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Interests</span>
              </div>
            </motion.div>

            {/* Interests Tags */}
            <motion.div style={interestsCardTrans}>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((interest, index) => (
                  <InterestTag
                    key={interest}
                    interest={interest}
                    index={index}
                    smoothProgress={smoothProgress}
                    className={`font-mono text-[11px] px-3 py-1 rounded-full border transition-all duration-300 cursor-default ${tagColors[index % tagColors.length]}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Education Column */}
          <div>
            {/* Education Header */}
            <motion.div style={eduHeaderTrans}>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap size={14} className="text-gray-500" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Education</span>
              </div>
            </motion.div>

            <div className="space-y-4">
              {about.education.map((edu, i) => {
                const trans = i === 0 ? eduCard0Trans : eduCard1Trans
                return (
                  <motion.div key={i} style={trans}>
                    <div className="group relative glass-card rounded-[1.25rem] p-6 border-l-2 border-yellow-500/10 hover:border-yellow-500/40 hover:bg-white/[0.03] transition-[border-color,background-color] duration-500">
                      {/* Minimal Yellow Milestone Glow */}
                      <div className="absolute top-6 -left-[3px] w-1 h-3 bg-yellow-500/30 rounded-full group-hover:h-6 group-hover:bg-yellow-500 transition-all duration-500" />

                      {/* Corner accent glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className="relative z-10">
                        <p className="text-white font-bold text-[15px] mb-1 group-hover:text-yellow-500/90 transition-colors tracking-tight">
                          {edu.degree}
                        </p>
                        <p className="text-gray-500 text-sm mb-5 font-medium leading-relaxed">
                          {edu.institution}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <span className="text-[10px] uppercase font-mono tracking-widest">{edu.period}</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-yellow-500/40 bg-yellow-500/5 border border-yellow-500/10 px-2.5 py-1 rounded-lg uppercase tracking-wider backdrop-blur-sm group-hover:text-yellow-500 group-hover:bg-yellow-500/10 transition-all">
                            {edu.grade}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
