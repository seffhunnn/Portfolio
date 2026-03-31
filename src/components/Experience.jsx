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
  'Open Source': 'text-green-400 border-green-400/20 bg-green-400/5',
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
                  <div className="sm:pl-10 relative">
                    {/* Dot on timeline */}
                    <div className="absolute -left-1.5 top-5 w-3 h-3 rounded-full border border-white/20 bg-black hidden sm:block" />

                    <div className="glass-card rounded-2xl p-7">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${colorClass}`}>
                            <Icon size={12} />
                            {exp.type}
                          </span>
                          <h3 className="text-white font-bold text-lg tracking-tight">{exp.role}</h3>
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
