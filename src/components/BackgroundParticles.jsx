import { useEffect, useState } from 'react'

export default function BackgroundParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate 25 subtle floating particles
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage left
      y: Math.random() * 100, // percentage top
      size: Math.random() * 2 + 1.5, // 1.5px to 3.5px
      duration: Math.random() * 25 + 25, // slow oscillation (25s to 50s)
      delay: Math.random() * -25, // negative delay for instant phase distribution
      opacity: Math.random() * 0.12 + 0.05, // very subtle (5% to 17% opacity)
    }))
    setParticles(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            backgroundColor: '#ffdd00',
            boxShadow: '0 0 4px rgba(255, 221, 0, 0.4)',
            animation: `float-particle ${p.duration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-80px) translateX(40px) scale(1.2);
          }
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
