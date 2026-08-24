import { useState } from 'react'
import { motion } from 'framer-motion'
import { experiences } from '../data'

function formatPeriod(period) {
  if (!period) return null
  return period.replace('–', '—').replace('-', '—').toUpperCase()
}

// Small placeholder icon — renders logo image if available, else initials
function CompanyIcon({ company, type, logo }) {
  const initials = (company || '?')
    .split(/[\s.()&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  const tints = {
    'Open Source': { bg: '#111a13' },
    'Part-time':   { bg: '#111118' },
    Internship:    { bg: '#181308' },
    Hackathon:     { bg: '#140d18' },
    Ambassador:    { bg: '#0a1518' },
    'Full-time':   { bg: '#0c1710' },
  }
  const bg = (tints[type] ?? { bg: '#111' }).bg

  if (logo) {
    return (
      <div
        className="flex-shrink-0 w-8 h-8 rounded-[7px] overflow-hidden border border-white/[0.06] flex items-center justify-center"
        style={{ background: '#111' }}
      >
        <img
          src={logo}
          alt={company}
          className="w-full h-full object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
    )
  }

  return (
    <div
      className="flex-shrink-0 w-8 h-8 rounded-[7px] flex items-center justify-center select-none text-[10px] font-mono font-bold border border-white/[0.05]"
      style={{ background: bg, color: '#71717a' }}
    >
      {initials}
    </div>
  )
}

function ExperienceEntry({ exp, index, isLast }) {
  const [hovered, setHovered] = useState(false)
  const period = formatPeriod(exp.period)
  const desc = exp.description

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
        delay: index * 0.05,
      }}
      className="will-change-transform transform-gpu"
    >
      <div
        className="py-5 sm:py-6 cursor-default group flex gap-3.5 sm:gap-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Small placeholder icon */}
        <div className="flex-shrink-0 pt-[14px]">
          <CompanyIcon company={exp.company} type={exp.type} logo={exp.logo} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Date */}
          {period && (
            <p className="text-[10px] font-mono text-zinc-600 tracking-[0.08em] mb-2 select-none">
              {period}
            </p>
          )}

          {/* Company — highlighted, turns yellow on hover */}
          <div className="flex items-start justify-between gap-4 mb-1">
            <p
              className="text-[15px] sm:text-[15.5px] font-semibold leading-snug tracking-tight transition-colors duration-200"
              style={{ color: hovered ? '#ffdd00' : '#e4e4e7' }}
            >
              {exp.company}
            </p>
          </div>

          {/* Role — muted, static */}
          <p className="text-[12px] text-zinc-500 mb-3 leading-snug">
            {exp.role}
          </p>

          {/* Description */}
          <p className="text-[12.5px] sm:text-[13px] text-zinc-400 leading-[1.68] mb-3.5 max-w-[800px]">
            {desc}
          </p>

          {/* Tags — dot separated */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {exp.tags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-2">
                <span className="text-[10.5px] font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors duration-200">
                  {tag}
                </span>
                {i < exp.tags.length - 1 && (
                  <span className="text-zinc-800 text-[8px] select-none">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!isLast && <div className="h-px w-full bg-zinc-800/60 ml-[46px] sm:ml-[50px]" />}
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="pt-6 pb-2 sm:pt-8 sm:pb-3 relative z-10">
      <div className="max-w-[940px] mx-auto px-5 sm:px-8">

        {/* Section heading */}
        <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
          <span className="w-0.5 h-3.5 rounded-full bg-[#ffdd00]" />
          <h2 className="text-[16px] sm:text-[18px] font-bold text-zinc-100 tracking-tight">
            Experience so far
          </h2>
        </div>

        <div className="h-px w-full bg-zinc-800/60 mb-0" />

        <div>
          {experiences.map((exp, i) => (
            <ExperienceEntry
              key={i}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>

        {/* Centered Short Section Differentiating Divider */}
        <div className="h-px w-36 sm:w-48 mx-auto bg-zinc-800 rounded-full mt-8 sm:mt-10 mb-2 sm:mb-3" />

      </div>
    </section>
  )
}
