import { useState } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../data'
import { Mail, ArrowUpRight, Copy, Check, Heart } from 'lucide-react'

const GithubIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#E4E4E7">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedinIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#0A66C2">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const LeetCodeIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#FFA116">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
)

const DiscordIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#5865F2">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const SteamIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#66C0F4">
    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zM8.366 18.232c-.375.156-.789.242-1.223.242-1.229 0-2.28-.707-2.736-1.748L6.2 17.47c.604.428 1.348.684 2.166.684.373 0 .73-.064 1.063-.177l-1.063.255zm7.573-7.25c-1.344 0-2.433-1.09-2.433-2.435 0-1.346 1.09-2.437 2.433-2.437 1.347 0 2.438 1.091 2.438 2.437 0 1.345-1.091 2.435-2.438 2.435z" />
  </svg>
)

const socialLinks = [
  { label: 'GitHub', href: personal.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: personal.linkedin, Icon: LinkedinIcon },
  { label: 'Email', href: `mailto:${personal.email}`, Icon: () => <Mail size={24} className="text-red-400" /> },
  { label: 'LeetCode', href: personal.leetcode, Icon: LeetCodeIcon },
  { label: 'Discord', href: personal.discord || 'https://discord.com', Icon: DiscordIcon },
  { label: 'Steam', href: personal.steam || 'https://steamcommunity.com', Icon: SteamIcon },
]

export default function Social() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e) => {
    e.preventDefault()
    if (personal.email) {
      navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="social" className="pt-8 pb-4 sm:pt-12 sm:pb-6 relative z-10">
      <div className="max-w-[940px] mx-auto px-5 sm:px-8">
        
        {/* Section Heading */}
        <div className="flex items-center gap-2.5 mb-3 sm:mb-3.5">
          <span className="w-0.5 h-3.5 rounded-full bg-[#ffdd00]" />
          <h2 className="text-[16px] sm:text-[18px] font-bold text-zinc-100 tracking-tight">
            Connect
          </h2>
        </div>

        {/* Top Divider */}
        <div className="h-px w-full bg-zinc-800/60 mb-5 sm:mb-6" />

        {/* 1. Centered 3-Column × 2-Row Social Grid */}
        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-10 gap-y-3.5 sm:gap-y-4.5 max-w-[580px] mx-auto mb-12 sm:mb-14 select-none"
        >
          {socialLinks.map((item) => {
            const IconComponent = item.Icon
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="inline-flex items-center justify-start sm:justify-center gap-2.5 text-[13.5px] sm:text-[14.5px] text-zinc-400 hover:text-zinc-100 transition-colors duration-150 group py-1 whitespace-nowrap"
              >
                <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
                  <IconComponent size={24} />
                </span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</span>
                <ArrowUpRight
                  size={13}
                  className="text-zinc-600 group-hover:text-zinc-300 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )
          })}
        </motion.div>

        {/* 2. Main Contact Area — Quiet, Centered Editorial Layout */}
        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 sm:space-y-3.5 max-w-[680px] mx-auto mb-12 sm:mb-14"
        >
          <p className="text-[10.5px] font-mono text-zinc-500 uppercase tracking-widest select-none">
            GET IN TOUCH
          </p>

          <p className="text-[14.5px] sm:text-[15.5px] text-zinc-400 font-sans leading-relaxed">
            I'd love to hear from you.
          </p>

          {/* Clickable Email with Copy Feature */}
          <div className="pt-0.5 flex items-center justify-center gap-3 group">
            <a
              href={`mailto:${personal.email}`}
              className="text-[22px] sm:text-[28px] md:text-[32px] font-medium tracking-tight text-zinc-100 hover:text-[#ffdd00] transition-colors break-all"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {personal.email}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer select-none shrink-0"
              title="Copy Email to Clipboard"
            >
              {copied ? (
                <span className="flex items-center gap-1.5 text-[11.5px] font-mono text-emerald-400 px-1">
                  <Check size={14} />
                  Copied
                </span>
              ) : (
                <Copy size={15} />
              )}
            </button>
          </div>
        </motion.div>

        {/* 3. Subtle Sponsor Secondary Action */}
        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <a
            href="https://github.com/sponsors/seffhunnn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 text-[12px] font-medium text-zinc-300 hover:text-white transition-all duration-200 shadow-sm"
          >
            <Heart size={13} className="text-rose-400/90 fill-rose-400/20" />
            <span>Sponsor</span>
          </a>
          <p className="text-[11.5px] text-zinc-500 font-sans mt-2 select-none">
            Support the things I build.
          </p>
        </motion.div>

        {/* Centered Short Section Differentiating Divider */}
        <div className="h-px w-36 sm:w-48 mx-auto bg-zinc-800 rounded-full mt-12 sm:mt-14 mb-2 sm:mb-3" />

      </div>
    </section>
  )
}
