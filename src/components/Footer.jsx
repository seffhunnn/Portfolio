import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative z-10 border-t border-white/[0.05] py-10"
    >
      <div className="section-container flex items-center justify-center">
        <p className="text-gray-800 text-xs font-mono uppercase tracking-[0.2em]">
          © {year} SAIF · ALL RIGHTS RESERVED
        </p>
      </div>
    </motion.footer>
  )
}
