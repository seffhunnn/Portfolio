import { motion } from 'framer-motion'
import { techStack } from '../data'
import { getTechBadge } from '../utils/techIcons'

export default function Skills() {
  return (
    <section id="skills" className="pt-6 pb-2 sm:pt-8 sm:pb-3 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[940px] mx-auto px-5 sm:px-8"
      >
        
        {/* Section Heading */}
        <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
          <span className="w-0.5 h-3.5 rounded-full bg-[#ffdd00]" />
          <h2 className="text-[16px] sm:text-[18px] font-bold text-zinc-100 tracking-tight">
            Technologies I work with
          </h2>
        </div>

        {/* Top Divider */}
        <div className="h-px w-full bg-zinc-800/60 mb-5 sm:mb-6" />

        {/* Perfectly Symmetrical Row Layout (Sorted by Quantity: Highest to Lowest) */}
        <div className="flex flex-col space-y-4 sm:space-y-4.5">
          {[...(techStack || [])]
            .sort((a, b) => {
              const lenA = (a.skills || a.items || []).length
              const lenB = (b.skills || b.items || []).length
              return lenB - lenA
            })
            .map((group, groupIdx) => {
              const skillsList = group.skills || group.items || []

              return (
                <motion.div 
                  key={groupIdx} 
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.45, delay: 0.02 + groupIdx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 py-0.5"
                >
                  {/* Category Technical Label (Symmetrical Fixed Width) */}
                  <p className="text-[10px] sm:text-[10.5px] font-mono text-zinc-500 uppercase tracking-widest sm:w-36 shrink-0 select-none">
                    {group.category}
                  </p>

                  {/* Single-Line Interactive Icon Row with Hover Tooltip */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {skillsList.map((tech, idx) => {
                      const badge = getTechBadge(tech)
                      return (
                        <div
                          key={idx}
                          className="relative group flex items-center justify-center select-none"
                        >
                          {/* Floating Tooltip Reveal on Hover */}
                          <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-30 whitespace-nowrap">
                            <div className="relative bg-zinc-900 text-zinc-200 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md border border-zinc-700/80 shadow-2xl">
                              {tech}
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-900 border-r border-b border-zinc-700/80 rotate-45" />
                            </div>
                          </div>

                          {/* Interactive Icon Badge */}
                          <div className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:border-zinc-600/80 group-hover:bg-zinc-900/90 shadow-sm cursor-default">
                            {badge.svg}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
        </div>

        {/* Centered Short Section Differentiating Divider */}
        <div className="h-px w-36 sm:w-48 mx-auto bg-zinc-800 rounded-full mt-8 sm:mt-10 mb-2 sm:mb-3" />

      </motion.div>
    </section>
  )
}
