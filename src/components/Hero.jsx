import { motion } from 'framer-motion'
import { ArrowDown, Mail, FileDown } from 'lucide-react'
import { personal } from '../data'

const GithubIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedinIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] },
  },
}

export default function Hero() {
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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section-container relative z-10 pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 tracking-widest uppercase border border-white/10 px-4 py-2 rounded-full bg-white/[0.03]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              High on caffeine & code
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[1.08] mb-4 relative"
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
            className="text-lg sm:text-lg text-gray-400 font-mono font-medium mb-6 tracking-widest uppercase opacity-80"
          >
            {personal.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mb-10"
          >
            {personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-10"
          >
            <button onClick={scrollToProjects} className="btn-primary">
              View Projects
              <ArrowDown size={16} className="rotate-[-45deg]" />
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              Contact Me
              <Mail size={16} />
            </button>
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

          {/* Quick social icons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] text-gray-700 font-mono uppercase tracking-[0.3em] font-bold">Connections</span>
            <div className="flex items-center gap-4">
              <a 
                href={personal.github} 
                target="_blank" 
                rel="noreferrer" 
                className="group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] text-gray-500 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10 hover:scale-110 hover:-rotate-3"
                title="GitHub"
              >
                <GithubIcon size={20} />
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              </a>
              <a 
                href={personal.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] text-gray-500 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10 hover:scale-110 hover:rotate-3"
                title="LinkedIn"
              >
                <LinkedinIcon size={20} />
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              </a>
              <a 
                href={`mailto:${personal.email}`} 
                className="group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] text-gray-500 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10 hover:scale-110"
                title="Email"
              >
                <Mail size={20} strokeWidth={2} />
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
