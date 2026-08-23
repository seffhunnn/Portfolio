import { useState, useEffect, useRef } from 'react'

export default function DynamicBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const targetOffset = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    // 1. Accessibility: Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // 2. Device capability: Check touch / coarse pointer
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    function handleMouseMove(e) {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2

      targetOffset.current = {
        x: nx * 14,
        y: ny * 10,
      }
    }

    let currentX = 0
    let currentY = 0

    function loop() {
      currentX += (targetOffset.current.x - currentX) * 0.04
      currentY += (targetOffset.current.y - currentY) * 0.04

      setOffset({ x: currentX, y: currentY })
      rafId.current = window.requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId.current = window.requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#000000]">
      <style>{`
        @keyframes floatMessyLeft {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(6px, -14px, 0) rotate(1.5deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }

        @keyframes floatMessyRight {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-8px, 12px, 0) rotate(-2deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }

        @keyframes driftCenterElement1 {
          0% {
            transform: translate3d(-15px, 20px, 0) scale(0.95);
            opacity: 0.25;
          }
          50% {
            transform: translate3d(20px, -25px, 0) scale(1.05);
            opacity: 0.50;
          }
          100% {
            transform: translate3d(-15px, 20px, 0) scale(0.95);
            opacity: 0.25;
          }
        }

        @keyframes driftCenterElement2 {
          0% {
            transform: translate3d(25px, -15px, 0) scale(1.04);
            opacity: 0.30;
          }
          50% {
            transform: translate3d(-20px, 20px, 0) scale(0.96);
            opacity: 0.55;
          }
          100% {
            transform: translate3d(25px, -15px, 0) scale(1.04);
            opacity: 0.30;
          }
        }

        .anim-flank-left {
          animation: floatMessyLeft 20s ease-in-out infinite alternate;
        }

        .anim-flank-right {
          animation: floatMessyRight 24s ease-in-out infinite alternate;
        }

        .anim-center-elem-1 {
          animation: driftCenterElement1 22s ease-in-out infinite alternate;
        }

        .anim-center-elem-2 {
          animation: driftCenterElement2 26s ease-in-out infinite alternate;
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-flank-left,
          .anim-flank-right,
          .anim-center-elem-1,
          .anim-center-elem-2 {
            animation: none !important;
          }
        }
      `}</style>

      {/* Layer 1: Flanked Organic Abstract Curves (Sides Only) */}
      <div
        className="absolute -inset-8"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: 'transform 0.1s ease-out',
          maskImage:
            'linear-gradient(to right, black 0%, black 15%, rgba(0,0,0,0.5) 25%, transparent 35%, transparent 65%, rgba(0,0,0,0.5) 75%, black 85%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, black 0%, black 15%, rgba(0,0,0,0.5) 25%, transparent 35%, transparent 65%, rgba(0,0,0,0.5) 75%, black 85%, black 100%)',
        }}
      >
        <svg
          className="w-full h-full opacity-80"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* ================= LEFT FLANK ================= */}
          <g className="anim-flank-left">
            <path
              d="M -40 80 C 120 160, 40 380, 200 290 C 260 250, 140 440, 220 560 C 280 640, 100 740, 180 860"
              stroke="white"
              strokeWidth="1.2"
              strokeOpacity="0.26"
            />
            <path
              d="M 60 -20 C 140 120, -20 260, 150 340 C 220 390, 60 540, 180 620 C 260 680, 120 810, 20 890"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.20"
              strokeDasharray="6 5"
            />
            <path
              d="M 90 220 C 40 160, -10 240, 60 300 C 110 350, 180 270, 130 200 C 80 130, 170 80, 220 180"
              stroke="white"
              strokeWidth="1.1"
              strokeOpacity="0.24"
            />
            <path
              d="M 140 520 C 90 460, 20 540, 80 610 C 140 670, 220 590, 170 510 C 110 430, 200 370, 240 460"
              stroke="white"
              strokeWidth="0.9"
              strokeOpacity="0.18"
              strokeDasharray="4 4"
            />
            <path
              d="M -30 420 Q 70 320 160 440 T 110 680"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.16"
            />

            <g opacity="0.28">
              <line x1="60" y1="120" x2="72" y2="132" stroke="white" strokeWidth="1.1" />
              <line x1="72" y1="120" x2="60" y2="132" stroke="white" strokeWidth="1.1" />
              <line x1="180" y1="420" x2="192" y2="432" stroke="white" strokeWidth="1.1" />
              <line x1="192" y1="420" x2="180" y2="432" stroke="white" strokeWidth="1.1" />
              <line x1="100" y1="740" x2="112" y2="752" stroke="white" strokeWidth="1.1" />
              <line x1="112" y1="740" x2="100" y2="752" stroke="white" strokeWidth="1.1" />
              <circle cx="120" cy="180" r="1.8" fill="white" />
              <circle cx="210" cy="320" r="2" fill="white" />
              <circle cx="70" cy="620" r="2.2" fill="white" />
              <circle cx="170" cy="800" r="1.8" fill="white" />
            </g>
          </g>

          {/* ================= RIGHT FLANK ================= */}
          <g className="anim-flank-right">
            <path
              d="M 1480 60 C 1340 180, 1420 360, 1260 280 C 1200 240, 1320 430, 1220 550 C 1170 630, 1350 730, 1280 870"
              stroke="white"
              strokeWidth="1.2"
              strokeOpacity="0.26"
            />
            <path
              d="M 1400 -30 C 1310 110, 1470 250, 1300 330 C 1230 380, 1390 530, 1280 610 C 1200 670, 1330 800, 1430 880"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.20"
              strokeDasharray="7 5"
            />
            <path
              d="M 1360 210 C 1410 150, 1460 230, 1390 290 C 1340 340, 1270 260, 1320 190 C 1370 120, 1280 70, 1230 170"
              stroke="white"
              strokeWidth="1.1"
              strokeOpacity="0.24"
            />
            <path
              d="M 1310 510 C 1360 450, 1430 530, 1370 600 C 1310 660, 1230 580, 1280 500 C 1340 420, 1250 360, 1200 450"
              stroke="white"
              strokeWidth="0.9"
              strokeOpacity="0.18"
              strokeDasharray="4 4"
            />
            <path
              d="M 1480 410 Q 1380 310 1290 430 T 1340 670"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.16"
            />

            <g opacity="0.28">
              <line x1="1380" y1="130" x2="1392" y2="142" stroke="white" strokeWidth="1.1" />
              <line x1="1392" y1="130" x2="1380" y2="142" stroke="white" strokeWidth="1.1" />
              <line x1="1260" y1="410" x2="1272" y2="422" stroke="white" strokeWidth="1.1" />
              <line x1="1272" y1="410" x2="1260" y2="422" stroke="white" strokeWidth="1.1" />
              <line x1="1340" y1="730" x2="1352" y2="742" stroke="white" strokeWidth="1.1" />
              <line x1="1352" y1="730" x2="1340" y2="742" stroke="white" strokeWidth="1.1" />
              <circle cx="1320" cy="170" r="1.8" fill="white" />
              <circle cx="1240" cy="310" r="2" fill="white" />
              <circle cx="1370" cy="610" r="2.2" fill="white" />
              <circle cx="1270" cy="790" r="1.8" fill="white" />
            </g>
          </g>
        </svg>
      </div>

      {/* Layer 2: Subtle Motion Elements Located in Center Column Only */}
      <div className="absolute inset-0 flex justify-center pointer-events-none overflow-hidden">
        <div
          className="w-full max-w-[1020px] h-full relative"
          style={{
            transform: `translate3d(${offset.x * 0.6}px, ${offset.y * 0.6}px, 0)`,
          }}
        >
          {/* Subtle center floating curves */}
          <svg
            className="w-full h-full absolute inset-0"
            viewBox="0 0 1020 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <g className="anim-center-elem-1">
              <path
                d="M 120 180 C 340 100, 480 340, 720 220 C 880 140, 680 420, 920 360"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.14"
                strokeDasharray="8 6"
              />
              <path
                d="M 280 620 C 460 520, 380 740, 640 680 C 820 620, 760 840, 960 760"
                stroke="white"
                strokeWidth="0.9"
                strokeOpacity="0.12"
              />
            </g>

            <g className="anim-center-elem-2">
              <path
                d="M 180 380 C 380 480, 560 320, 760 460 C 880 540, 620 680, 840 780"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.13"
                strokeDasharray="5 5"
              />
              {/* Soft wandering micro-dots in center */}
              <circle cx="340" cy="280" r="2" fill="white" fillOpacity="0.18" />
              <circle cx="680" cy="520" r="2.5" fill="white" fillOpacity="0.20" />
              <circle cx="520" cy="740" r="2" fill="white" fillOpacity="0.16" />
            </g>
          </svg>
        </div>
      </div>

      {/* Layer 3: Translucent Diffused Center Backdrop (Gives the "noticed, not properly seen" ghostly diffusion) */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-full max-w-[1020px] h-full bg-[#0a0a0d]/10 backdrop-blur-[14px] relative" />
      </div>
    </div>
  )
}
