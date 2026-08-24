import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, ChevronDown } from 'lucide-react'
import { projects, personal } from '../data'
import { getTechBadge } from '../utils/techIcons'

const GithubIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

function ProjectCard({ project }) {
  const techBadges = (project.tags || [])
    .map(tag => getTechBadge(tag))
    .filter(badge => badge && badge.svg && !badge.isFallback)
    // Filter duplicates by name
    .filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)
    .slice(0, 5)

  return (
    <div className="relative rounded-xl bg-zinc-950/90 border border-zinc-800/80 overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 flex flex-col h-full will-change-transform transform-gpu shadow-sm">
      
      {/* 1. Image Area */}
      <div className="relative w-full aspect-[16/9.5] overflow-hidden bg-zinc-950">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover brightness-[0.92] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:brightness-[0.25]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono text-[10px]">
            Preview Unavailable
          </div>
        )}

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* 2. Default Visible Bottom Card Area */}
      <div className="px-3.5 py-2.5 sm:py-3 flex flex-col justify-between flex-grow bg-zinc-950/50">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-zinc-100 font-medium text-[13.5px] sm:text-[14px] tracking-tight truncate">
            {project.title}
          </h3>
          <span className="text-[10.5px] font-mono text-zinc-500 shrink-0">
            {project.tags?.[0] || 'Project'}
          </span>
        </div>

        {/* Mobile-only visible details (for touch devices) */}
        <div className="md:hidden mt-2 pt-2 border-t border-zinc-900/80">
          <p className="text-[12px] text-zinc-400 leading-snug line-clamp-2 mb-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between gap-2">
            {/* Tech Badges on Mobile */}
            <div className="flex items-center gap-1">
              {techBadges.slice(0, 4).map((badge, idx) => (
                <div
                  key={idx}
                  title={badge.name}
                  className="w-5.5 h-5.5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center"
                >
                  {badge.svg}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
                >
                  <GithubIcon size={13} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#ffdd00]"
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Full-Card Desktop Hover Overlay (covers entire card seamlessly) */}
      <div className="hidden md:flex absolute inset-0 bg-zinc-950/95 p-4 flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-20">
        
        {/* Top: Title & Category Pills */}
        <div className="space-y-1.5">
          <h3 className="text-zinc-100 font-bold text-[15px] sm:text-[15.5px] tracking-tight leading-snug truncate">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {project.tags?.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Middle: Short Description */}
        <p className="text-[12px] text-zinc-300 leading-snug line-clamp-2 my-0.5">
          {project.description}
        </p>

        {/* Bottom: Genuine Colorful Tech Icons Row + View Button */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Tech Icons Squircle Badges */}
          <div className="flex items-center gap-1.5">
            {techBadges.map((badge, idx) => (
              <div
                key={idx}
                title={badge.name}
                className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-110 hover:border-zinc-500"
              >
                {badge.svg}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-500 transition-all shadow-sm"
                title="View GitHub Repository"
              >
                <GithubIcon size={14} />
              </a>
            )}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white text-[11px] font-medium flex items-center gap-1 transition-all shadow-sm hover:border-zinc-500"
                title="View Live Demo"
              >
                View <ArrowUpRight size={12} />
              </a>
            ) : project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white text-[11px] font-medium flex items-center gap-1 transition-all shadow-sm hover:border-zinc-500"
                title="View Source Code"
              >
                View <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const initialProjects = (projects || []).slice(0, 2)
  const extraProjects = (projects || []).slice(2)

  return (
    <section id="projects" className="pt-6 pb-2 sm:pt-8 sm:pb-3 relative z-10">
      <div className="max-w-[940px] mx-auto px-5 sm:px-8">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-0.5 h-3.5 rounded-full bg-[#ffdd00]" />
            <h2 className="text-[16px] sm:text-[18px] font-bold text-zinc-100 tracking-tight">
              Selected work
            </h2>
          </div>
          {personal.github && (
            <a
              href={`${personal.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11.5px] font-mono text-zinc-400 hover:text-[#ffdd00] flex items-center gap-1 transition-colors select-none"
            >
              All repositories <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        {/* Top Divider */}
        <div className="h-px w-full bg-zinc-800/60 mb-5 sm:mb-6" />

        {/* Centered Responsive Grid with Smooth Hardware-Accelerated Landing */}
        <motion.div 
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-[860px] mx-auto will-change-transform transform-gpu"
        >
          {/* Initial 2 Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 sm:gap-5">
            {initialProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          {/* Additional Projects with Smooth Slide Down & Up Animation */}
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 sm:gap-5 pt-4.5 sm:pt-5">
                  {extraProjects.map((project, index) => (
                    <ProjectCard key={index + 2} project={project} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More / Show Less Toggle Button */}
          {projects && projects.length > 2 && (
            <div className="flex justify-center mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setShowAll(prev => !prev)}
                className="px-4 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-100 font-mono text-[11.5px] flex items-center gap-1.5 transition-all duration-200 shadow-sm cursor-pointer select-none"
              >
                <span>{showAll ? 'Show less' : `Show more (+${extraProjects.length})`}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${showAll ? 'rotate-180 text-[#ffdd00]' : 'text-zinc-400'}`}
                />
              </button>
            </div>
          )}
        </motion.div>

        {/* Centered Short Section Differentiating Divider */}
        <div className="h-px w-36 sm:w-48 mx-auto bg-zinc-800 rounded-full mt-8 sm:mt-10 mb-2 sm:mb-3" />

      </div>
    </section>
  )
}
