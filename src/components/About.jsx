import { motion } from 'framer-motion'
import { User, Sparkles, Rocket, GraduationCap } from 'lucide-react'
import { about } from '../data'

export default function About() {
  const introParagraphs = (about.intro || '').split('\n\n').filter(Boolean)

  return (
    <section id="about" className="pt-6 pb-2 sm:pt-8 sm:pb-3 relative z-10">
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
            Who Am I ?
          </h2>
        </div>

        {/* Top Divider */}
        <div className="h-px w-full bg-zinc-800/60 mb-0" />

        <div className="flex flex-col">
          
          {/* Block 1 — Description */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, delay: 0.02, ease: [0.22, 1, 0.36, 1] }}
            className="py-4 sm:py-5 flex gap-3 sm:gap-3.5"
          >
            {/* Left Icon: Solid Filled Indigo User Icon */}
            <div className="shrink-0 w-6 h-6 flex items-center justify-center pt-0.5 select-none">
              <User size={19} className="text-indigo-400 fill-indigo-400/90" />
            </div>

            {/* Right Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 sm:mb-2 select-none">
                Description
              </p>
              <div 
                className="space-y-3 text-[14px] sm:text-[14.5px] text-zinc-400 leading-[1.75] max-w-[780px]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                }}
              >
                {introParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Block 2 — WHAT I CARE ABOUT */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="py-4 sm:py-5 flex gap-3 sm:gap-3.5"
          >
            {/* Left Icon: Solid Filled Warm Amber Sparkles Icon */}
            <div className="shrink-0 w-6 h-6 flex items-center justify-center pt-0.5 select-none">
              <Sparkles size={19} className="text-amber-400 fill-amber-400/90" />
            </div>

            {/* Right Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 sm:mb-2 select-none">
                WHAT I CARE ABOUT
              </p>
              <p 
                className="text-[14px] sm:text-[14.5px] text-zinc-400 leading-[1.75] max-w-[780px]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                }}
              >
                Simplicity, good design, and natural usability are what I am passionate about. Performance, accessibility, and attention to detail are the principles I follow to achieve them.
              </p>
            </div>
          </motion.div>

          {/* Block 3 — BEYOND THE CODE */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="py-4 sm:py-5 flex gap-3 sm:gap-3.5"
          >
            {/* Left Icon: Solid Filled Soft Cyan Rocket Icon */}
            <div className="shrink-0 w-6 h-6 flex items-center justify-center pt-0.5 select-none">
              <Rocket size={19} className="text-cyan-400 fill-cyan-400/90" />
            </div>

            {/* Right Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 sm:mb-2 select-none">
                BEYOND THE CODE
              </p>
              <p 
                className="text-[14px] sm:text-[14.5px] text-zinc-400 leading-[1.75] max-w-[780px]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                }}
              >
                Outside of software, I enjoy maintaining a balance between creating, learning, and stepping away. I appreciate moments that offer a new perspective and keep me from settling into my comfort zone.
              </p>
            </div>
          </motion.div>

          {/* Block 4 — EDUCATION */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="py-4 sm:py-5 flex gap-3 sm:gap-3.5"
          >
            {/* Left Icon: Solid Filled Emerald GraduationCap Icon */}
            <div className="shrink-0 w-6 h-6 flex items-center justify-center pt-0.5 select-none">
              <GraduationCap size={19} className="text-emerald-400 fill-emerald-400/90" />
            </div>

            {/* Right Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 select-none">
                EDUCATION
              </p>
              
              {/* Plain Text Minimalist Editorial Flow */}
              <div 
                className="space-y-3.5 text-[14px] sm:text-[14.5px] text-zinc-400 leading-relaxed max-w-[780px]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                }}
              >
                {about.education?.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4"
                  >
                    <div>
                      <span className="text-zinc-200 font-medium">{item.degree}</span>
                      <span className="text-zinc-500 mx-1.5 hidden sm:inline">·</span>
                      <span className="text-zinc-400 text-[13.5px] block sm:inline">{item.institution}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[12.5px] font-mono text-zinc-500 shrink-0">
                      {item.grade && (
                        <span className="text-zinc-400 bg-zinc-900/80 px-1.5 py-0.5 rounded border border-zinc-800/80 text-[11px]">
                          {item.grade}
                        </span>
                      )}
                      <span>{item.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Centered Short Section Differentiating Divider */}
        <div className="h-px w-36 sm:w-48 mx-auto bg-zinc-800 rounded-full mt-8 sm:mt-10 mb-2 sm:mb-3" />

      </motion.div>
    </section>
  )
}
