import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

import { personal } from '../data'
import { Mail } from 'lucide-react'

const GithubIcon = ({ size = 13 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedinIcon = ({ size = 13 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function RunningLabel() {
  const containerRef = useRef(null)

  // Track the scroll progress of the running label as it exits the top of the viewport.
  // "start 350px" - starts when the top of the label is 350px from the top of the screen (in plain view).
  // "end start" - ends when the bottom of the label exits the top of the screen.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 350px', 'end start'],
  })

  // Smooth exit animations: fade out, shrink scale, and slide up
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.9], [1.015, 0.93])
  const y = useTransform(scrollYProgress, [0, 0.9], [0, -40])

  // Match hero-like “gray scale as it scrolls up” feel
  const grayscale = useTransform(scrollYProgress, [0, 0.9], [0, 1])



  const socialItems = [
    { icon: <GithubIcon size={13} />, value: '@seffhunnn' },
    { icon: <LinkedinIcon size={13} />, value: 'Mohd Saif' },
    { icon: <Mail size={13} strokeWidth={2.5} />, value: personal.email },
  ]

  // Repeat the sequence block multiple times for seamless scrolling
  const blocks = Array.from({ length: 4 })

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity,
        scale,
        y,
        rotate: -1.2, // Maintain the slanted rotation inside Framer Motion
        filter: useMotionTemplate`grayscale(${grayscale * 100}%)`,



      }}
      className="w-[102vw] -ml-[1vw] relative z-20 my-16 py-4 bg-[#ffdd00] overflow-hidden select-none pointer-events-none shadow-[0_12px_36px_rgba(0,0,0,0.45)]"

    >
      {/* Top Hazard Stripes */}
      <div className="absolute top-0 left-0 w-full h-[6px] bg-hazard-stripes" />

      {/* Scrolling Container */}
      <div className="flex w-max animate-marquee py-1.5 items-center">
        {blocks.map((_, blockIdx) => (
          <div key={blockIdx} className="flex items-center flex-shrink-0">
            {/* Single "Connect With Me" Action Badge */}
            <span className="inline-block bg-black text-[#ffdd00] px-4 py-1 rounded-full font-mono font-black text-[10px] sm:text-[11px] mx-3 tracking-widest border border-black shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)]">
              CONNECT WITH ME
            </span>

            {/* Divider Dot */}
            <span className="text-black/35 font-bold text-xs select-none">•</span>

            {/* Socials with Icons */}
            {socialItems.map((item, itemIdx) => (
              <div key={itemIdx} className="flex items-center">
                <span className="inline-flex items-center text-black font-mono text-[11px] sm:text-[13px] mx-3 bg-black/[0.06] px-2.5 py-0.5 rounded border border-black/15 shadow-[1px_1px_0px_rgba(0,0,0,0.15)]">
                  {/* Icon Wrapper */}
                  <span className="mr-2 flex items-center text-black">
                    {item.icon}
                  </span>
                  {/* Value */}
                  <span className="font-black tracking-[0.12em]">{item.value}</span>
                </span>

                {/* Divider Dot */}
                <span className="text-black/35 font-bold text-xs select-none">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Hazard Stripes */}
      <div className="absolute bottom-0 left-0 w-full h-[6px] bg-hazard-stripes" />

      <style>{`
        .bg-hazard-stripes {
          background: repeating-linear-gradient(
            -45deg,
            #000,
            #000 8px,
            #ffdd00 8px,
            #ffdd00 16px
          );
        }
        .animate-marquee {
          display: flex;
          animation: marquee 35s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-25%, 0, 0);
          }
        }
      `}</style>
    </motion.div>
  )
}
