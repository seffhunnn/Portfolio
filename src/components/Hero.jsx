import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion'
import { ArrowDown, Mail, FileDown, Heart } from 'lucide-react'
import { personal } from '../data'
import profileImage from '../assets/profile.png'

const GithubIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedinIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const heroRef = useRef(null)

  // Track the scroll progress of the hero section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Apply spring physics for buttery smooth interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Exiting transforms: fade out, scale down, and drift upwards
  const opacity = useTransform(smoothProgress, [0, 0.75], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.75], [1, 0.92])
  const y = useTransform(smoothProgress, [0, 0.75], [0, -100])
  
  // Image transformations
  const grayscaleValue = useTransform(smoothProgress, [0, 0.35], [0, 100])
  const imageFilter = useMotionTemplate`grayscale(${grayscaleValue}%)`
  
  // Shadow parallax transformations
  const shadowRotate1 = useTransform(smoothProgress, [0, 0.5], [-12, -25])
  const shadowRotate2 = useTransform(smoothProgress, [0, 0.5], [8, 20])
  const shadowX1 = useTransform(smoothProgress, [0, 0.5], [-15, -50])
  const shadowX2 = useTransform(smoothProgress, [0, 0.5], [10, 40])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (!el) return
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.6, offset: -64, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToProjects = () => scrollTo('#projects')
  const scrollToContact = () => scrollTo('#social')

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section-container relative z-10 pt-24 pb-20">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 w-full"
          style={{ opacity, scale, y }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left side - Content */}
          <div className="w-full max-w-2xl lg:flex-1">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-gray-400 tracking-widest uppercase border border-white/10 px-4 py-2.5 rounded-full bg-white/[0.03]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                High on caffeine & code
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-[4.5rem] md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[1.08] mb-4 relative"
            >
              {/* Soft Ambient Glow behind name */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-500/5 blur-[120px] pointer-events-none" />

              Hi, I'm{' '}
              <span className="gradient-text" style={{ paddingBottom: '0.1em', display: 'inline-block' }}>{personal.name}</span>
              <span className="text-yellow-500">.</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-[15px] text-gray-400 font-mono font-medium mb-6 tracking-wider sm:tracking-widest uppercase opacity-80 whitespace-nowrap"
            >
              {personal.title}
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-[1.05rem] sm:text-lg text-gray-400 leading-relaxed max-w-[90%] sm:max-w-xl mb-10"
              style={{ textWrap: 'balance' }}
            >
              {personal.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8 mt-2"
            >
              <motion.div style={{ filter: imageFilter }}>
                <button onClick={scrollToProjects} className="btn-primary">
                  View Projects
                  <ArrowDown size={16} className="rotate-[-45deg]" />
                </button>
              </motion.div>
              <motion.div style={{ filter: imageFilter }}>
                <a
                  href={personal.resumeUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <FileDown size={16} />
                  Resume
                </a>
              </motion.div>
            </motion.div>

            {/* Quick social icons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10 hover:scale-110 hover:-rotate-3"
                  title="GitHub"
                >
                  <GithubIcon size={20} />
                  <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10 hover:scale-110 hover:rotate-3"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                  <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10 hover:scale-110"
                  title="Email"
                >
                  <Mail size={20} strokeWidth={2} />
                  <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                </a>
                <a
                  href="https://github.com/sponsors/seffhunnn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10 hover:scale-110 hover:-rotate-3"
                  title="Sponsor"
                >
                  <Heart size={20} className="text-pink-500 fill-none group-hover:fill-pink-500 transition-all duration-200" />
                  <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right side - Image */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:flex justify-center items-center flex-shrink-0"
          >
            <div className="relative group">
              {/* Premium layered glassmorphic frames with scroll parallax */}
              <motion.div 
                style={{ rotate: shadowRotate1, x: shadowX1 }}
                className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[2rem] scale-[1.08] border border-white/10 shadow-2xl" 
              />
              <motion.div 
                style={{ rotate: shadowRotate2, x: shadowX2 }}
                className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[2rem] scale-[1.08] border border-white/10 shadow-[0_0_40px_rgba(255,221,0,0.05)]" 
              />
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a0a0a] transition-all duration-700 group-hover:border-white/30 z-10 shadow-[0_20px_60px_rgba(255,255,255,0.08)]">
                <motion.img 
                  style={{ filter: imageFilter }}
                  src={profileImage} 
                  alt={personal.name}
                  className="w-full h-auto max-w-xs object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle overlay glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2 mt-16 mx-auto w-fit"
        >
          <span className="text-[10px] text-gray-700 font-mono tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-gray-700" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
