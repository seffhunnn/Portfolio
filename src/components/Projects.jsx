import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { projects } from '../data'
import { ExternalLink } from 'lucide-react'
import { getTagColor } from '../utils/colors'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

function ProjectCard({ project }) {
  return (
    <div
      className="group glass-card rounded-[1rem] flex flex-col h-full overflow-hidden border border-white/[0.05] hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/[0.05] relative transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 will-change-transform"
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {/* Yellow top-center bar expanding outward */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 bg-yellow-500/20 rounded-full group-hover:w-3/4 group-hover:bg-yellow-500 transition-all duration-500 z-10" />
      {/* Yellow ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

      {/* Thumbnail Area */}
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent flex items-center justify-center p-8 text-center">
            <div className="w-full h-full border border-white/[0.05] rounded-xl flex items-center justify-center backdrop-blur-3xl">
              <span className="text-gray-700 font-mono text-[10px] uppercase tracking-widest px-4">Preview Unavailable</span>
            </div>
          </div>
        )}

        {/* Black Fading Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 scale-[1.02]" />

        {/* Overlay Hover Effect - Subtle Inner Glow */}
        <div className="absolute inset-0 shadow-[0_0_80px_rgba(255,255,255,0.05)_inset] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-[1.02]" />

        {/* Action Buttons Overlay */}
        <div className="absolute top-4 right-4 z-20 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all shadow-lg"
              title="GitHub"
            >
              <GithubIcon />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all shadow-lg"
              title="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-[18px] mb-3 tracking-tight group-hover:text-yellow-500 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-500 text-[15px] leading-relaxed mb-6 flex-grow line-clamp-3 group-hover:text-gray-400 transition-colors">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={`${tag}-${tagIndex}`}
              className={`font-mono text-[13px] px-3 py-1 rounded-full border transition-all duration-300 ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Pre-calculate linear mapping sample arrays for Y-rotation to layout values.
// Covered range: -360 to 360 degrees, sampled every 15 degrees.
const angleSamples = []
const xSamples = []
const zSamples = []
const scaleSamples = []
const opacitySamples = []
const blurSamples = []
const zIndexSamples = []
const pointerEventsSamples = []

for (let a = -360; a <= 360; a += 15) {
  angleSamples.push(a)
  const r = (-a * Math.PI) / 180
  const cos = Math.cos(r)
  const sin = Math.sin(r)

  xSamples.push(sin)
  zSamples.push(cos - 1)
  scaleSamples.push(0.82 + (cos + 1) * 0.09)
  opacitySamples.push(cos < -0.15 ? 0.08 : 0.15 + (cos + 1) * 0.425)
  blurSamples.push((1 - (cos + 1) / 2) * 6)
  zIndexSamples.push(Math.round((cos + 1) * 10))
  pointerEventsSamples.push(cos > 0.75 ? 'auto' : 'none')
}

// Wrapper component to position the card inside the 3D Sphere carousel space
function ProgressText({ projectsProgress }) {
  // Convert scroll progress to a React text node; update only when MotionValue changes.
  const [value, setValue] = useState(0)

  useEffect(() => {
    // `projectsProgress` is a MotionValue number (0..1)
    const unsubscribe = projectsProgress.on('change', (v) => {
      const pct = Math.max(0, Math.min(100, Math.round(v * 100)))
      setValue(pct)
    })
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [projectsProgress])

  return <>{value}%</>
}

function SphereCardWrapper({ project, index, smoothProgress, radius, isMobile }) {

  const ANGLE_STEP = 55 // Degrees of separation between cards

  // rotateY is mapped linearly from smoothProgress
  const rotateY = useTransform(
    smoothProgress,
    [0, 1],
    [-(index * ANGLE_STEP), -(index * ANGLE_STEP - 3 * ANGLE_STEP)]
  )

  // Map to the pre-calculated arrays for native performance (zero JS computation on scroll)
  const x = useTransform(rotateY, angleSamples, xSamples.map(val => val * radius))
  const z = useTransform(rotateY, angleSamples, zSamples.map(val => val * radius))
  const scale = useTransform(rotateY, angleSamples, scaleSamples)
  
  // Responsive opacity configuration to prevent overlapping cards on narrow screens
  const desktopOpacity = useTransform(rotateY, angleSamples, opacitySamples)
  const mobileOpacity = useTransform(rotateY, [-40, -20, 0, 20, 40], [0, 0, 1, 0, 0])
  const opacity = isMobile ? mobileOpacity : desktopOpacity

  const zIndex = useTransform(rotateY, angleSamples, zIndexSamples)
  const pointerEvents = useTransform(rotateY, angleSamples, pointerEventsSamples)

  const blurVal = useTransform(rotateY, angleSamples, blurSamples)
  const filter = useMotionTemplate`blur(${blurVal}px)`

  return (
    <motion.div
      style={{
        x,
        z,
        scale,
        opacity,
        filter,
        rotateY,
        zIndex,
        pointerEvents,
        transformStyle: 'preserve-3d',
      }}
      className="absolute w-[300px] sm:w-[400px] md:w-[450px] flex-shrink-0"
    >
      <ProjectCard project={project} />
    </motion.div>
  )
}

// Exponential ease-out curve for scroll mapping
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export default function Projects() {
  const targetRef = useRef(null)

  // Track scroll progress of the projects (pin) section: 0 -> 1
  const { scrollYProgress: projectsProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // Track scroll progress as the section moves through the viewport for reveal animation
  const { scrollYProgress: revealProgress } = useScroll({
    target: targetRef,
    offset: ['start 90%', 'start 20%'],
  })

  // Reveal transforms mimicking ScrollRevealWrapper
  const clipPath = useTransform(
    revealProgress,
    [0, 1],
    ['inset(16% 24% 16% 24% round 48px)', 'inset(0% 0% 0% 0% round 0px)'],
    { ease: easeOutExpo }
  )
  const scale = useTransform(revealProgress, [0, 1], [0.82, 1], { ease: easeOutExpo })
  const opacity = useTransform(revealProgress, [0, 1], [0.3, 1], { ease: easeOutExpo })

  // Snappy spring configuration matching About & Experience sections
  const smoothProgress = useSpring(projectsProgress, {
    stiffness: 520,
    damping: 45,
    mass: 0.65,
    restDelta: 0.001,
  })

  // Project showcase scroll progress (0..100)
  const projectsProgressPercent = useTransform(projectsProgress, [0, 1], ['0%', '100%'])
  const projectsProgressNumber = useTransform(projectsProgress, [0, 1], [0, 100])

  // Responsive radius calculation
  const [radius, setRadius] = useState(500)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setIsMobile(w < 768)
      if (w < 640) {
        setRadius(w * 0.45)
      } else if (w < 1024) {
        setRadius(w * 0.4)
      } else {
        setRadius(Math.min(600, w * 0.32))
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <AnimatedSection id="projects" className="relative h-[300vh] z-10">
      <div ref={targetRef} className="absolute inset-0 pointer-events-none" />

      <motion.div
        style={{ clipPath, scale, opacity }}
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center will-change-transform"
      >
        {/* Heading */}
        <AnimatedItem className="section-container w-full mb-8 relative">
          <div className="mt-4">
            <span className="inline-block text-xs font-mono text-gray-500">Progress</span>
            <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: projectsProgressPercent }}
              />
            </div>
            <div className="text-[10px] font-mono text-gray-500 mt-2">
              <ProgressText projectsProgress={projectsProgress} />
            </div>
          </div>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">04 / projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Showcase</h2>
          <div className="section-divider" />
        </AnimatedItem>

        {/* 3D Sphere Carousel Container */}
        <div
          className="relative w-full h-[480px] sm:h-[530px] md:h-[550px] flex items-center justify-center overflow-visible"
          style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
          aria-label="Project showcase"
        >
          {projects.map((project, index) => (
            <SphereCardWrapper
              key={project.title}
              project={project}
              index={index}
              smoothProgress={smoothProgress}
              radius={radius}
              isMobile={isMobile}
            />
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
