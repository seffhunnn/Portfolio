import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Heart, FileDown, ArrowDown } from 'lucide-react'
import { personal } from '../data'
import profileImage from '../assets/profile.png'
import coverGif from '../assets/7F2HFcT5Ww7C5rRjso.webp'
import { useGithubContributions } from '../hooks/useGithubContributions'
import ContributionStatsChart from './ContributionStatsChart'

const GithubIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedinIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
  </svg>
)

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function Hero() {
  const { grid: liveGrid, days: liveDays, monthLabels: liveMonthLabels, recentDaily: liveRecentDaily, total: liveTotal, loading: contribLoading } = useGithubContributions()
  const [currentTime, setCurrentTime] = useState('')
  const [tooltip, setTooltip] = useState({ visible: false, date: '', count: 0, x: 0, y: 0 })
  // Single shared ready flag — both panels flip to live state at exactly the same time
  const isDataReady = !contribLoading && Boolean(liveGrid && liveRecentDaily)

  // Fallback placeholder grid (26 weeks = 6 months)
  const placeholderGrid = Array.from({ length: 26 }, () => Array(7).fill(0))
  const placeholderDays = Array.from({ length: 26 }, () => Array(7).fill(null))
  const fallbackMonthLabels = [
    { name: 'Mar', colIndex: 0 },
    { name: 'Apr', colIndex: 4 },
    { name: 'May', colIndex: 9 },
    { name: 'Jun', colIndex: 13 },
    { name: 'Jul', colIndex: 17 },
    { name: 'Aug', colIndex: 22 },
  ]
  const grid = liveGrid ?? placeholderGrid
  const days = liveDays ?? placeholderDays
  const monthLabels = liveMonthLabels ?? fallbackMonthLabels
  const totalContributions = liveTotal ?? null

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])
  
  // Amber/yellow portfolio theme — matches the campfire palette
  const squareColors = {
    0: 'bg-[#111111] border border-[#1a1a1a]',
    1: 'bg-[#3d2800] border border-[#3d2800]/30',
    2: 'bg-[#7a5200] border border-[#7a5200]/20',
    3: 'bg-[#c28000] border border-[#c28000]/20',
    4: 'bg-[#ffdd00] border border-[#ffdd00]/20',
  }

  const scrollToProjects = () => {
    const el = document.querySelector('#projects')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top })
  }

  return (
    <section id="hero" className="relative pt-24 pb-4 sm:pb-6 overflow-hidden select-none">
      <div className="max-w-[940px] mx-auto px-6 w-full z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col"
        >
          {/* Cover Banner Container with Absolute Elements (scaled up height: 180px-260px) */}
          <motion.div
            variants={itemVariants}
            className="w-full h-[180px] sm:h-[220px] md:h-[260px] rounded-2xl border border-zinc-900 overflow-hidden relative shadow-md"
          >
            {/* Background Cover Image */}
            <img 
              src={coverGif} 
              alt="Atmospheric cover" 
              className="w-full h-full object-cover select-none pointer-events-none opacity-85 brightness-[0.75] contrast-[1.05]"
            />
            {/* Ambient overlay gradient for typography readability — balanced subtle darkness */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/24 to-transparent" />

            {/* Digital Clock in Top Right */}
            <div className="absolute top-4 right-5 font-mono text-[10px] sm:text-xs text-zinc-450 tracking-widest select-none bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded border border-zinc-800/50">
              {currentTime}
            </div>

            {/* Profile Info Overlay at Bottom Left */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end gap-3 sm:gap-3.5 md:gap-4 overflow-hidden py-1">
              {/* Profile Image (Minimal smooth scale & fade) */}
              <motion.div 
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-20 w-[76px] h-[76px] sm:w-[110px] sm:h-[110px] md:w-[145px] md:h-[145px] rounded-2xl border-2 border-zinc-800/80 bg-zinc-950 overflow-hidden flex-shrink-0 shadow-lg"
              >
                <img 
                  src={profileImage} 
                  alt="Mohd Saif Ansari" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Text metadata — minimal subtle slide-out from behind PFP */}
              <div className="relative z-10 flex flex-col text-left mb-0.5 min-w-0">
                {/* Sleek distinguished blur capsule for the name */}
                <motion.div
                  initial={{ x: -45, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/55 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.6)] w-fit mb-1.5"
                >
                  <h2 
                    className="text-[20px] sm:text-[25px] md:text-[29px] font-bold text-white tracking-tight leading-none flex items-center gap-2"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                  >
                    {personal.fullName || personal.name || 'Mohd Saif Ansari'}
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#ffdd00] text-black text-[9px] sm:text-[10.5px] flex items-center justify-center font-black select-none shadow-sm">✓</span>
                  </h2>
                </motion.div>

                {/* Subtitle lines aligned directly under the letter 'M' */}
                <motion.div 
                  initial={{ x: -45, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  className="pl-3.5 sm:pl-4 flex flex-col"
                >
                  <p 
                    className="text-[11.5px] sm:text-sm md:text-[14px] text-zinc-300 font-medium"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.85)' }}
                  >
                    {personal.title || 'Software Developer · Open Source Contributor'}
                  </p>
                  {/* Status Row */}
                  <div 
                    className="text-[10px] sm:text-[11px] text-zinc-300 font-sans mt-1 select-none"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.95)' }}
                  >
                    {personal.status || "CSE Undergrad '27"} · {totalContributions != null ? (
                      <><span className="font-bold text-white">{totalContributions.toLocaleString()}</span>{' contributions this year'}</>
                    ) : 'loading contributions…'}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Description Section dynamically reading from personal.bio */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col gap-1.5 max-w-[700px] text-left mt-6"
          >
            {Array.isArray(personal.bio) ? (
              personal.bio.map((item, idx) => (
                <p
                  key={idx}
                  className={
                    item.highlight ?? idx === 0
                      ? "font-semibold text-zinc-100 text-[15px] sm:text-[15.5px] leading-snug tracking-[-0.01em]"
                      : "text-zinc-400 font-normal text-[14px] sm:text-[15px] leading-normal tracking-[-0.005em]"
                  }
                >
                  {item.text || item}
                </p>
              ))
            ) : (
              (personal.tagline || '').split('.').filter(Boolean).map((line, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? "font-semibold text-zinc-100 text-[15px] sm:text-[15.5px] leading-snug tracking-[-0.01em]"
                      : "text-zinc-400 font-normal text-[14px] sm:text-[15px] leading-normal tracking-[-0.005em]"
                  }
                >
                  {line.trim()}.
                </p>
              ))
            )}
          </motion.div>

          {/* Action CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-6 select-none"
          >
            {/* Primary 'My work' button */}
            <button 
              onClick={scrollToProjects}
              className="h-[42px] px-[20px] rounded-[10px] bg-[#ffdd00] hover:bg-[#e6c800] text-black font-bold text-[14px] tracking-tight border-0 outline-none inline-flex items-center justify-center leading-none"
              style={{
                transition: 'transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease',
                willChange: 'transform'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,221,0,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <span className="leading-none">My work</span>
            </button>

            {/* Secondary 'Send an email' button */}
            <a 
              href={`mailto:${personal.email}`}
              className="h-[42px] px-[20px] rounded-[10px] bg-transparent text-zinc-400 border border-zinc-800/60 font-bold text-[14px] tracking-tight inline-flex items-center justify-center gap-2 outline-none leading-none"
              style={{
                textDecoration: 'none',
                transition: 'transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease',
                willChange: 'transform'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <Mail size={15} className="flex-shrink-0" />
              <span className="leading-none">Send an email</span>
            </a>
          </motion.div>

          {/* Social Links pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2.5 mt-4"
          >
            {/* GitHub social button */}
            <a 
              href={personal.github} 
              target="_blank" 
              rel="noreferrer"
              className="group h-[42px] px-[18px] rounded-full bg-transparent inline-flex items-center justify-center gap-[7px] text-[14px] font-bold text-zinc-400 border border-white/10 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(255,255,255,0.05)]"
              style={{ textDecoration: 'none' }}
            >
              <span className="text-zinc-400 group-hover:text-[#ffdd00] transition-colors duration-200 flex items-center justify-center">
                <GithubIcon size={16} />
              </span>
              <span className="transition-colors duration-200 group-hover:text-white">GitHub</span>
            </a>

            {/* LinkedIn social button */}
            <a 
              href={personal.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="group h-[42px] px-[18px] rounded-full bg-transparent inline-flex items-center justify-center gap-[7px] text-[14px] font-bold text-zinc-400 border border-white/10 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(255,255,255,0.05)]"
              style={{ textDecoration: 'none' }}
            >
              <span className="text-zinc-400 group-hover:text-[#ffdd00] transition-colors duration-200 flex items-center justify-center">
                <LinkedinIcon size={16} />
              </span>
              <span className="transition-colors duration-200 group-hover:text-white">LinkedIn</span>
            </a>

            {/* Sponsor social button */}
            <a 
              href="https://github.com/sponsors/seffhunnn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group h-[42px] px-[18px] rounded-full bg-transparent inline-flex items-center justify-center gap-[7px] text-[14px] font-bold text-zinc-400 border border-white/10 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(255,255,255,0.05)]"
              style={{ textDecoration: 'none' }}
            >
              <span className="text-zinc-400 group-hover:text-[#ffdd00] group-hover:fill-[#ffdd00] transition-all duration-200 flex items-center justify-center">
                <Heart size={16} className="fill-none group-hover:fill-[#ffdd00]" />
              </span>
              <span className="transition-colors duration-200 group-hover:text-white">Sponsor</span>
            </a>

            {/* Resume social button */}
            <a 
              href={personal.resumeUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="group h-[42px] px-[18px] rounded-full bg-transparent inline-flex items-center justify-center gap-[7px] text-[14px] font-bold text-zinc-400 border border-white/10 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(255,255,255,0.05)]"
              style={{ textDecoration: 'none' }}
            >
              <span className="text-zinc-400 group-hover:text-[#ffdd00] transition-colors duration-200 flex items-center justify-center">
                <FileDown size={16} />
              </span>
              <span className="transition-colors duration-200 group-hover:text-white">Resume</span>
            </a>
          </motion.div>

          {/* Section Divider (mt-12 gap after social pills) */}
          <motion.div 
            variants={itemVariants}
            className="w-full border-t border-zinc-900/60 mt-12"
          />

          {/* Two-Column Telemetry Dashboard: Left = Dynamic Activity Curve, Right = 6-Month Contribution Grid */}
          <motion.div 
            variants={itemVariants}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 mt-7 items-start"
          >
            {/* Left Column: Dynamic Contribution Stats Wave Chart */}
            <div className="flex flex-col gap-3 font-mono w-full">
              <div className="flex items-center justify-between text-[11.5px] text-zinc-450">
                <div className="flex items-center gap-1.5">
                  <span className="w-0.5 h-3 rounded-full bg-[#ffdd00]" />
                  <span className="font-bold text-zinc-200">Daily Activity</span>
                </div>
                <span className="text-[10px] text-zinc-500">Last 28 Days</span>
              </div>

              <div className="w-full h-[175px] p-2.5 sm:p-3 rounded-xl bg-black/40 border border-zinc-900/80 backdrop-blur-sm flex items-center">
                <ContributionStatsChart dailyData={liveRecentDaily} loading={!isDataReady} />
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-0.5 select-none">
                <span>Telemetry Curve</span>
              </div>
            </div>

            {/* Right Column: GitHub 6-Month Contributions Section */}
            <div className="flex flex-col gap-3 font-mono w-full">
              {/* Header info row */}
              <div className="flex items-center justify-between text-[11.5px] text-zinc-450">
                {/* Contributions with Left Accent Bar */}
                <div className="flex items-center gap-1.5">
                  <span className="w-0.5 h-3 rounded-full bg-[#ffdd00]" />
                  <span className="font-bold text-zinc-200">Contributions</span>
                </div>
                <a 
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-0.5 text-zinc-500 hover:text-[#ffdd00] transition-colors duration-200"
                  style={{ textDecoration: 'none' }}
                >
                  <span>@seffhunnn</span>
                  <ArrowDown size={10} className="rotate-[-135deg]" />
                </a>
              </div>

              {/* Contributions Grid wrapper */}
              <div className="w-full h-[175px] p-2.5 sm:p-3 rounded-xl bg-black/40 border border-zinc-900/80 backdrop-blur-sm overflow-hidden">
                <div className="w-full flex flex-col gap-[3px]">
                  {/* Month headers — spans same N-col grid */}
                  <div className="grid text-[9px] text-zinc-600 font-light select-none mb-0.5" style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)`, gap: '3px' }}>
                    {monthLabels.map((m, idx) => (
                      <div
                        key={idx}
                        className="col-span-4 pl-0.5 text-left truncate"
                        style={{ gridColumnStart: m.colIndex + 1 }}
                      >
                        {m.name}
                      </div>
                    ))}
                  </div>

                  {/* Day boxes grid — smooth motion transition from loading to loaded */}
                  <motion.div
                    key={isDataReady ? 'grid-loaded' : 'grid-loading'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full grid"
                    style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)`, gap: '3px', alignItems: 'start' }}
                    onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
                  >
                    {grid.map((col, cIdx) => (
                      <div key={cIdx} className="flex flex-col" style={{ gap: '3px' }}>
                        {col.map((level, rIdx) => {
                          const dayData = days[cIdx]?.[rIdx]
                          const isGridLoading = !isDataReady
                          return (
                            <div
                              key={rIdx}
                              className={`w-full aspect-square rounded-[3.5px] ${isGridLoading ? 'bg-[#3d2800]/70 animate-pulse' : squareColors[level]} ${dayData ? 'cursor-pointer' : ''}`}
                              style={{ 
                                transition: 'transform 130ms ease', 
                                position: 'relative',
                                ...(isGridLoading ? { animationDelay: `${((cIdx % 6) * 0.12 + (rIdx % 4) * 0.08).toFixed(2)}s` } : {})
                              }}
                              onMouseEnter={e => {
                                if (!dayData) return
                                e.currentTarget.style.transform = 'scale(1.3)'
                                e.currentTarget.style.zIndex = '20'
                                const rect = e.currentTarget.getBoundingClientRect()
                                setTooltip({
                                  visible: true,
                                  date: dayData.date,
                                  count: dayData.count,
                                  // store raw viewport coords — tooltip will be fixed
                                  vx: rect.left + rect.width / 2,
                                  vy: rect.top,
                                })
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.zIndex = 'auto'
                                setTooltip(t => ({ ...t, visible: false }))
                              }}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Tooltip — rendered fixed so it's never clipped by any container */}
              {tooltip.visible && (() => {
                const TOOLTIP_W = 148
                const formatted = (() => {
                  try {
                    return new Date(tooltip.date + 'T00:00:00').toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })
                  } catch { return tooltip.date }
                })()
                // Clamp left so tooltip stays within viewport
                const rawLeft = (tooltip.vx ?? 0) - TOOLTIP_W / 2
                const clampedLeft = Math.max(8, Math.min(rawLeft, (typeof window !== 'undefined' ? window.innerWidth : 800) - TOOLTIP_W - 8))
                // Show above block; if too close to top flip below
                const above = (tooltip.vy ?? 60) > 60
                return (
                  <div
                    className="pointer-events-none fixed z-[9999] select-none"
                    style={{
                      left: clampedLeft,
                      top: above ? (tooltip.vy - 8) : (tooltip.vy + 22),
                      transform: above ? 'translateY(-100%)' : 'translateY(0)',
                      width: TOOLTIP_W,
                    }}
                  >
                    <div className="bg-[#0a0a0a] border border-zinc-800/70 rounded-[6px] px-[10px] py-[7px] text-left shadow-lg">
                      <div className="text-[10px] text-zinc-300 font-medium whitespace-nowrap leading-none mb-[5px]">{formatted}</div>
                      <div className="text-[11px] font-bold whitespace-nowrap leading-none">
                        <span className="text-[#ffdd00]">{tooltip.count}</span>
                        <span className="text-zinc-500"> contribution{tooltip.count !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    {/* Arrow caret */}
                    {above && (
                      <div className="flex justify-center">
                        <div className="w-[6px] h-[6px] bg-[#0a0a0a] border-r border-b border-zinc-800/70 rotate-45 -mt-[3px]" />
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Legend & Stats footer */}
              <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-0.5 select-none">
                <div>
                  {contribLoading ? (
                    <span className="text-zinc-600 animate-pulse">Fetching contributions…</span>
                  ) : (
                    <><span className="font-semibold text-zinc-300">{totalContributions != null ? totalContributions.toLocaleString() : '—'}</span> contributions (6 mos)</>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-[#111111] border border-[#1a1a1a]" />
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-[#3d2800]" />
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-[#7a5200]" />
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-[#c28000]" />
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-[#ffdd00]" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Centered Short Section Differentiating Divider */}
        <div className="h-px w-36 sm:w-48 mx-auto bg-zinc-800 rounded-full mt-8 sm:mt-10 mb-2 sm:mb-3" />
      </div>
    </section>
  )
}
