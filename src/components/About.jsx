import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { about } from '../data'
import { GraduationCap, Sparkles } from 'lucide-react'

export default function About() {
  return (
    <AnimatedSection id="about" className="py-32 relative z-10">
      <div className="section-container">
        {/* Section label */}
        <AnimatedItem>
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">01 / about</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">About Me</h2>
          <div className="section-divider" />
        </AnimatedItem>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Intro */}
          <div>
            <AnimatedItem>
              <p className="text-gray-400 text-base leading-8 mb-8">
                {about.intro}
              </p>
            </AnimatedItem>

            {/* Interests */}
            <AnimatedItem>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-gray-500" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Interests</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <span key={interest} className="skill-tag">{interest}</span>
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
                  <div className="glass-card rounded-2xl p-5">
                    <p className="text-white font-semibold text-sm mb-1">{edu.degree}</p>
                    <p className="text-gray-400 text-sm mb-2">{edu.institution}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-600">{edu.period}</span>
                      <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded-full">{edu.grade}</span>
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
