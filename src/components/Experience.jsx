import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { experiences } from '../data'
import { Briefcase, Code2, Trophy, Users, Clock } from 'lucide-react'
import { getTagColor } from '../utils/colors'

const typeIcon = {
  Internship: Briefcase,
  'Open Source': Code2,
  Hackathon: Trophy,
  Ambassador: Users,
  'Part-time': Clock,
}

const typeColor = {
  Internship: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
  'Open Source': 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5',
  Hackathon: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5',
  Ambassador: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
  'Part-time': 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
}

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="py-32 relative z-10">
      <div className="section-container">
        <AnimatedItem>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">02 / experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Experience</h2>
          <div className="section-divider" />
        </AnimatedItem>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const Icon = typeIcon[exp.type] || Briefcase
              const colorClass = exp.colorClass || typeColor[exp.type] || 'text-gray-400 border-gray-400/20 bg-gray-400/5'

              return (
                <AnimatedItem key={i}>
                  <div className="sm:pl-10 relative group">
                    {/* Yellow Timeline Milestone Dot */}
                    <div className="absolute -left-1.5 top-6 w-3 h-3 rounded-full border-2 border-yellow-500/40 bg-black group-hover:bg-yellow-500 group-hover:scale-125 transition-all duration-500 hidden sm:block z-20" />
                    <div className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-yellow-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block z-10" />

                    <div className="glass-card rounded-[1.25rem] p-7 border-l-2 border-yellow-500/10 hover:border-yellow-500/40 hover:bg-white/[0.03] relative overflow-hidden transition-[transform,border-color,background-color] duration-500 hover:translate-x-1 will-change-transform">
                      {/* Yellow left milestone bar — same as education cards */}
                      <div className="absolute top-6 -left-[3px] w-2 h-3 bg-yellow-500/30 rounded-full group-hover:h-10 group-hover:bg-yellow-500 transition-all duration-500" />
                      {/* Ambient corner glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4 relative z-10">
                        <div className="flex items-center gap-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${colorClass}`}>
                            <Icon size={12} />
                            {exp.type}
                          </span>
                          <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-yellow-500/90 transition-colors">{exp.role}</h3>
                        </div>
                        <span className="text-sm font-mono text-gray-500 shrink-0">{exp.period}</span>
                      </div>

                      <p className="text-gray-400 text-base mb-2 font-semibold">{exp.company}</p>
                      <p className="text-gray-400 text-[15px] leading-relaxed mb-6">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className={`font-mono text-[12px] px-3 py-1 rounded-full border transition-all duration-300 ${getTagColor(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              )
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
