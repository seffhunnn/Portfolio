import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { certifications } from '../data'

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [stepWidth, setStepWidth] = useState(0)
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const touchStartX = useRef(0)

  useEffect(() => {
    const updateDimensions = () => {
      const desktop = window.innerWidth >= 640
      setIsDesktop(desktop)
      if (trackRef.current && trackRef.current.firstElementChild) {
        const firstCard = trackRef.current.firstElementChild
        const gap = desktop ? 20 : 18
        setStepWidth(firstCard.offsetWidth + gap)
      }
    }
    updateDimensions()

    let ro
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      ro = new ResizeObserver(updateDimensions)
      ro.observe(trackRef.current)
    }

    window.addEventListener('resize', updateDimensions, { passive: true })
    return () => {
      window.removeEventListener('resize', updateDimensions)
      if (ro) ro.disconnect()
    }
  }, [])

  // If 2 certificates, allow sliding between index 0 and 1.
  // When 3 or more certificates are added, maxIndex ensures 2 cards fill the view without empty space.
  const maxIndex = isDesktop
    ? Math.max(0, certifications.length > 2 ? certifications.length - 2 : certifications.length - 1)
    : Math.max(0, certifications.length - 1)

  const totalSteps = maxIndex + 1

  const goToCard = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 40) {
      nextSlide()
    } else if (diff < -40) {
      prevSlide()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return

      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [maxIndex, currentIndex])

  return (
    <section ref={containerRef} id="certifications" className="pt-6 pb-2 sm:pt-8 sm:pb-3 relative z-10">
      <div className="max-w-[940px] mx-auto px-5 sm:px-8">
        
        {/* Section Heading */}
        <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
          <span className="w-0.5 h-3.5 rounded-full bg-[#ffdd00]" />
          <h2 className="text-[16px] sm:text-[18px] font-bold text-zinc-100 tracking-tight">
            Wall of recognition
          </h2>
        </div>

        {/* Top Divider */}
        <div className="h-px w-full bg-zinc-800/60 mb-5 sm:mb-6" />

        {/* Responsive Carousel with Left-to-Right Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-[860px] mx-auto will-change-transform transform-gpu"
        >
          {/* Carousel Viewport / Sliding Track */}
          <div
            className="overflow-hidden w-full py-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              ref={trackRef}
              animate={{ x: -currentIndex * stepWidth }}
              transition={{
                duration: 0.35,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="flex gap-4.5 sm:gap-5 will-change-transform transform-gpu"
              style={{ transform: 'translateZ(0)' }}
            >
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="w-full sm:w-[calc(50%-10px)] shrink-0 transform-gpu"
                >
                  <div className="group rounded-xl bg-zinc-950/90 border border-zinc-800/80 overflow-hidden flex flex-col h-full shadow-sm">
                    
                    {/* PDF Document Preview / Thumbnail with Hover Action */}
                    <div className="relative w-full aspect-[1.414/1] bg-zinc-950 border-b border-zinc-800/80 overflow-hidden cursor-pointer">
                      {/* High-res rendered preview for instant load & mobile */}
                      <img
                        src={cert.previewImage}
                        alt={cert.title}
                        decoding="async"
                        className="w-full h-full object-cover pointer-events-none transform-gpu"
                      />

                      {/* Top "View ↗" Button on Hover (No background blur, matching design) */}
                      <div className="absolute top-2.5 right-2.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#18181b]/95 border border-zinc-700/80 text-zinc-100 text-[12px] font-medium shadow-md">
                          <span>View</span>
                          <ArrowUpRight size={13} className="text-zinc-200" />
                        </div>
                      </div>

                      {/* Full clickable link across entire thumbnail */}
                      <a
                        href={cert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-20"
                        aria-label={`Open ${cert.title}`}
                      />
                    </div>

                    {/* Natural, Clean Typography Matching Portfolio */}
                    <div className="p-3.5 sm:p-4 bg-zinc-950 flex flex-col gap-1 justify-center flex-grow">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-zinc-100 font-medium text-[14px] sm:text-[14.5px] tracking-tight leading-snug">
                          {cert.title}
                        </h3>
                        <span className="text-zinc-300 text-[12px] sm:text-[12.5px] font-normal shrink-0 whitespace-nowrap pt-0.5">
                          {cert.period}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-zinc-400 leading-snug">
                        {cert.issuer}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Navigation Controls & Dots */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:mt-7 select-none">
            <button
              type="button"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label="Previous certificate"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-700/80 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-500 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-20 disabled:border-zinc-800/60 disabled:bg-zinc-950/60 disabled:hover:translate-y-0 disabled:hover:bg-zinc-950/60 disabled:pointer-events-none shadow-sm cursor-pointer"
            >
              <ChevronLeft size={18} className="text-[#ffdd00]" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2 px-1">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToCard(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-5 h-1.5 bg-[#ffdd00]'
                      : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-[#ffdd00]/60'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              aria-label="Next certificate"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-700/80 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-500 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-20 disabled:border-zinc-800/60 disabled:bg-zinc-950/60 disabled:hover:translate-y-0 disabled:hover:bg-zinc-950/60 disabled:pointer-events-none shadow-sm cursor-pointer"
            >
              <ChevronRight size={18} className="text-[#ffdd00]" />
            </button>
          </div>
        </motion.div>

        {/* Centered Short Section Differentiating Divider */}
        <div className="h-px w-36 sm:w-48 mx-auto bg-zinc-800 rounded-full mt-8 sm:mt-10 mb-2 sm:mb-3" />

      </div>
    </section>
  )
}
