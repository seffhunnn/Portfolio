import { motion } from 'framer-motion'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { techStack, toolsAndPlatforms } from '../data'
import { getTagColor } from '../utils/colors'

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

function SkillCard({ title, items }) {
  return (
    <div className="mb-10 last:mb-0">
      <h3 className="text-[11px] font-mono text-gray-400 uppercase tracking-[0.25em] mb-6 ml-2">
        {title}
      </h3>
      <div
        className="group relative rounded-[2.25rem] p-10 sm:p-12 overflow-hidden border-l-2 border-yellow-500/10 hover:border-yellow-500/40 transition-all duration-500 hover:bg-white/[0.02]"
        style={{
          background: 'rgba(255,255,255,0.015)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)',
        }}
      >
        {/* Yellow bottom-center bar expanding outward */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 bg-yellow-500/20 rounded-full group-hover:w-3/4 group-hover:bg-yellow-500 transition-all duration-500 z-10" />

        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(255,221,0,0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative z-10 flex flex-wrap gap-2.5">
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

        <AnimatedItem>
          <SkillCard title="Technologies" items={techStack} />
          <SkillCard title="Tools & Platforms" items={toolsAndPlatforms} />
        </AnimatedItem>
      </div>
    </AnimatedSection>
  )
}
