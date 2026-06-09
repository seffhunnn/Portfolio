import { motion } from 'framer-motion'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { techStack } from '../data'
import { getTagColor } from '../utils/colors'
import { GitBranch, Layout, Database, Code2, Terminal } from 'lucide-react'

const tagVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.02,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

const categoryIcons = {
  'Core & Open Source': GitBranch,
  'Frontend': Layout,
  'Backend & Database': Database,
  'Languages': Code2,
  'Tools & Deployment': Terminal,
}

function SkillCard({ title, items, icon: Icon, className = '' }) {
  return (
    <div className={`w-full ${className} flex flex-col`}>
      <div
        className="group relative rounded-[2.25rem] p-8 sm:p-10 overflow-hidden border-l-2 border-yellow-500/10 hover:border-yellow-500/40 transition-all duration-500 hover:bg-white/[0.02] flex-1 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.015)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)',
        }}
      >
        {/* Yellow bottom-center bar expanding outward */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 bg-yellow-500/20 rounded-full group-hover:w-2/5 group-hover:bg-yellow-500 transition-all duration-500 z-10" />

        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(255,221,0,0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            {Icon && (
              <Icon
                className="text-yellow-500/60 group-hover:text-yellow-500 transition-colors duration-300"
                size={18}
              />
            )}
            <h3 className="text-[11px] font-mono text-gray-400 uppercase tracking-[0.25em] group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {items.map((skill, i) => (
              <motion.span
                key={skill}
                custom={i}
                variants={tagVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  y: -2,
                  scale: 1.05,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                viewport={{ once: true }}
                className={`font-mono text-[12px] px-5 py-2.5 rounded-full border cursor-default select-none transition-all duration-300 ${getTagColor(skill)}`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="py-32 relative z-10">
      <div className="section-container">
        {/* Heading */}
        <AnimatedItem>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
            03 / skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Tech Stack</h2>
          <div className="section-divider" />
        </AnimatedItem>

        <AnimatedItem>
          <p className="text-gray-500 text-[15px] mb-12 max-w-lg leading-relaxed">
            The tools and technologies I enjoy working with across development, AI, and deployment workflows.
          </p>
        </AnimatedItem>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Column 1: Frontend */}
          <div className="flex flex-col h-full">
            <AnimatedItem className="w-full h-full flex flex-col flex-1">
              <SkillCard
                title={techStack[1].category}
                items={techStack[1].skills}
                icon={categoryIcons[techStack[1].category]}
                className="h-full flex-1"
              />
            </AnimatedItem>
          </div>

          {/* Column 2: Backend & Database + Languages */}
          <div className="flex flex-col justify-between h-full gap-6 lg:gap-8">
            <AnimatedItem className="w-full">
              <SkillCard
                title={techStack[2].category}
                items={techStack[2].skills}
                icon={categoryIcons[techStack[2].category]}
              />
            </AnimatedItem>
            <AnimatedItem className="w-full">
              <SkillCard
                title={techStack[3].category}
                items={techStack[3].skills}
                icon={categoryIcons[techStack[3].category]}
              />
            </AnimatedItem>
          </div>

          {/* Column 3: Core & Open Source + Tools & Deployment */}
          <div className="flex flex-col md:flex-row lg:flex-col justify-between h-full gap-6 lg:gap-8 md:col-span-2 lg:col-span-1">
            <AnimatedItem className="w-full md:flex-1 lg:flex-initial">
              <SkillCard
                title={techStack[0].category}
                items={techStack[0].skills}
                icon={categoryIcons[techStack[0].category]}
              />
            </AnimatedItem>
            <AnimatedItem className="w-full md:flex-1 lg:flex-initial">
              <SkillCard
                title={techStack[4].category}
                items={techStack[4].skills}
                icon={categoryIcons[techStack[4].category]}
              />
            </AnimatedItem>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
