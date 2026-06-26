import { motion } from 'framer-motion'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { projects } from '../data'
import { ExternalLink } from 'lucide-react'

import { getTagColor } from '../utils/colors'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

function ProjectCard({ project }) {
  return (
    <div
      className="group glass-card rounded-[1rem] flex flex-col h-full overflow-hidden border border-white/[0.05] hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/[0.05] relative transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 will-change-transform"
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {/* Yellow top-center bar expanding outward */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 bg-yellow-500/20 rounded-full group-hover:w-3/4 group-hover:bg-yellow-500 transition-all duration-500 z-10" />
      {/* Yellow ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

      {/* Thumbnail Area */}
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent flex items-center justify-center p-8 text-center">
             <div className="w-full h-full border border-white/[0.05] rounded-xl flex items-center justify-center backdrop-blur-3xl">
                <span className="text-gray-700 font-mono text-[10px] uppercase tracking-widest px-4">Preview Unavailable</span>
             </div>
          </div>
        )}
        
        {/* Black Fading Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 scale-[1.02]" />
        
        {/* Overlay Hover Effect - Subtle Inner Glow */}
        <div className="absolute inset-0 shadow-[0_0_80px_rgba(255,255,255,0.05)_inset] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-[1.02]" />



        {/* Action Buttons Overlay */}
        <div className="absolute top-4 right-4 z-20 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all shadow-lg"
              title="GitHub"
            >
              <GithubIcon />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all shadow-lg"
              title="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-[18px] mb-3 tracking-tight group-hover:text-yellow-500 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-500 text-[15px] leading-relaxed mb-6 flex-grow line-clamp-3 group-hover:text-gray-400 transition-colors">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={`${tag}-${tagIndex}`} 
              className={`font-mono text-[13px] px-3 py-1 rounded-full border transition-all duration-300 ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <AnimatedSection id="projects" className="py-32 relative z-10">
      <div className="section-container">
        <AnimatedItem>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">04 / projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Showcase</h2>
          <div className="section-divider mb-12" />
        </AnimatedItem>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <AnimatedItem key={project.title}>
                <ProjectCard project={project} index={index} />
              </AnimatedItem>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
