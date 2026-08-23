import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 pt-4 pb-12 sm:pt-6 sm:pb-14 select-none"
    >
      <div className="max-w-[940px] mx-auto px-5 sm:px-8 flex flex-col items-center text-center space-y-3 sm:space-y-4">
        
        {/* Lewis Hamilton Quote */}
        <div className="space-y-1 max-w-[620px]">
          <p 
            className="text-[13px] sm:text-[14px] italic text-zinc-300 tracking-tight leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            “That’s for all the kids out there, you can do it too, man.”
          </p>
          <p className="text-[10.5px] font-mono text-zinc-500 tracking-widest uppercase">
            — Lewis Hamilton
          </p>
        </div>

        {/* Small Subtle Copyright Text */}
        <p className="text-[9.5px] sm:text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] pt-0.5">
          © {year} SAIF · ALL RIGHTS RESERVED
        </p>

      </div>
    </motion.footer>
  )
}
