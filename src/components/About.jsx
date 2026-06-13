import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { about } from '../data'
import { GraduationCap, Sparkles, User } from 'lucide-react'
import { getTagColor, tagColors } from '../utils/colors'

export default function About() {
  return (
    <AnimatedSection id="about" className="pt-16 pb-32 relative z-10">
      <div className="section-container">
        {/* Section label */}
        <AnimatedItem>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">01 / about</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">About Me</h2>
          <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
        </AnimatedItem>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Intro */}
          <div>
            <AnimatedItem>
              <div className="flex items-center gap-2 mb-6">
                <User size={14} className="text-gray-500" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Description</span>
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <div
                className="group relative glass-card rounded-[1.25rem] p-6 border-l-2 border-yellow-500/10 hover:border-yellow-500/40 transition-all duration-500 hover:translate-x-1 hover:bg-white/[0.03] mb-6"
              >
                {/* Minimal Yellow Milestone Glow */}
                <div className="absolute top-6 -left-[3px] w-1 h-3 bg-yellow-500/30 rounded-full group-hover:h-6 group-hover:bg-yellow-500 transition-all duration-500" />
                
                {/* Corner accent glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <p className="relative z-10 text-gray-400 text-[15px] leading-relaxed whitespace-pre-line">
                  {about.intro}
                </p>
              </div>
            </AnimatedItem>

            {/* Interests */}
            <AnimatedItem>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-gray-500" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Interests</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((interest, index) => (
                  <span 
                    key={interest} 
                    className={`font-mono text-[11px] px-3 py-1 rounded-full border transition-all duration-300 cursor-default ${tagColors[index % tagColors.length]}`}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </AnimatedItem>
          </div>

          {/* Education */}
          <div>
            <AnimatedItem>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap size={14} className="text-gray-500" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Education</span>
              </div>
            </AnimatedItem>

            <div className="space-y-4">
              {about.education.map((edu, i) => (
                <AnimatedItem key={i}>
                  <div className="group relative glass-card rounded-[1.25rem] p-6 border-l-2 border-yellow-500/10 hover:border-yellow-500/40 transition-all duration-500 hover:translate-x-1 hover:bg-white/[0.03]">
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
                </AnimatedItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
