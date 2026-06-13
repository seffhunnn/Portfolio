import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import { personal } from '../data'
import { Mail, ArrowUpRight, Heart } from 'lucide-react'

const GithubIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedinIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const LeetCodeIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
)

const socialLinks = [
  {
    label: 'GitHub',
    href: personal.github,
    Icon: GithubIcon,
    sub: null,
  },
  {
    label: 'LinkedIn',
    href: personal.linkedin,
    Icon: LinkedinIcon,
    sub: null,
  },
  {
    label: 'Email',
    href: `mailto:${personal.email}`,
    Icon: (props) => <Mail {...props} />,
    sub: null,
  },
  {
    label: 'LeetCode',
    href: personal.leetcode,
    Icon: LeetCodeIcon,
    sub: null,
  },
]

export default function Social() {
  return (
    <AnimatedSection id="social" className="py-32 relative z-10">
      <div className="section-container">
        <AnimatedItem>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">05 / contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Connect</h2>
          <div className="section-divider mb-12" />
        </AnimatedItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socialLinks.map(({ label, href, Icon, sub }) => (
            <AnimatedItem key={label}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-[2rem] border border-transparent bg-white/[0.04] backdrop-blur-sm p-8 transition-all duration-500 hover:border-yellow-500/40 hover:bg-white/[0.07]"
              >
                {/* Yellow bottom-center bar expanding upward */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 bg-yellow-500/20 rounded-full group-hover:w-3/4 group-hover:bg-yellow-500 transition-all duration-500 z-10" />
                {/* Yellow ambient glow */}
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-yellow-500/[0.06] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-gray-400 border border-white/5 transition-all group-hover:bg-yellow-500/10 group-hover:text-yellow-500 group-hover:border-yellow-500/20 group-hover:scale-110">
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-yellow-500 group-hover:translate-x-1 transition-all duration-300">
                        {label}
                      </h3>
                      <p className="text-sm font-mono text-gray-500 mt-1 uppercase tracking-wider">
                        {sub}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-gray-700 transition-all group-hover:text-yellow-500 group-hover:translate-x-1 group-hover:-translate-y-1" size={24} />
                </div>
              </a>
            </AnimatedItem>
          ))}
        </div>

        {/* Huge Email Signature */}
        <AnimatedItem>
          <div className="mt-24 text-center">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">ready to build something?</p>
            <a
              href={`mailto:${personal.email}`}
              className="group relative inline-block text-2xl sm:text-4xl font-black text-white transition-all hover:tracking-tight mb-8"
            >
              <span className="relative z-10">{personal.email}</span>
              <div className="absolute -bottom-2 left-0 h-1 w-0 bg-gradient-to-r from-white/20 to-transparent transition-all group-hover:w-full" />
            </a>

            {/* Sponsor CTA with Arrow */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
              <a
                href="https://github.com/sponsors/seffhunnn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sponsor group scale-105 sm:scale-110 origin-center transition-all duration-300"
                style={{ textDecoration: 'none', padding: '0.85rem 2.25rem', fontSize: '1rem' }}
              >
                <Heart size={18} className="text-pink-500 fill-none group-hover:fill-pink-500 transition-all duration-200" />
                Sponsor
              </a>
              
              <div className="flex items-center gap-3">
                {/* Curved Arrow pointing to the left */}
                <svg className="w-12 h-10 text-yellow-500/70 select-none shrink-0" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M40 24 C30 10 22 6 8 10" />
                  <path d="M14 4 L6 10 L13 18" />
                </svg>
                <div className="text-left text-gray-400 font-mono text-xs sm:text-sm italic leading-relaxed select-none">
                  <div>Support my work &</div>
                  <div>fuel my energy 💛</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  )
}
