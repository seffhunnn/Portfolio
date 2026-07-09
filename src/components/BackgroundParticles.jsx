import { useEffect, useMemo, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

export default function BackgroundParticles() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: null, y: null, tx: null, ty: null, radius: 150 })
  const scrollPositionRef = useRef(0)
  const rafRef = useRef(0)
  const isActiveRef = useRef(true)

  const prefersReducedMotion = usePrefersReducedMotion()
  const config = useMemo(() => {
    const mobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
    const numPoints = mobile ? 90 : 170
    return {
      numPoints,
      fov: 600,
      mouseRadius: mobile ? 110 : 150,
      connectionDistance: mobile ? 80 : 120,
      maxBoundZ: 400,
      wrapScale: 0.75,
      // throttle spatial work: caps how many line attempts we do per frame
      maxConnectionsPerFrame: mobile ? 2200 : 3800,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let points = []
    let projectedPoints = []
    let lastFrameTime = 0

    const initPoints = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w
      canvas.height = h

      points = new Array(config.numPoints).fill(0).map((_, i) => {
        // Distribute particles evenly: left half / right half
        const isLeftSide = i < config.numPoints / 2
        const xVal = (isLeftSide ? Math.random() * 0.5 : Math.random() * 0.5 + 0.5) * w - w * 0.5

        return {
          x: xVal,
          y: Math.random() * h - h * 0.5,
          z: (Math.random() - 0.5) * 800,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          vz: (Math.random() - 0.5) * 0.35,
          baseRadius: Math.random() * 1.2 + 1.1,
        }
      })

      projectedPoints = new Array(points.length)
    }

    initPoints()

    // Pause when off-screen to prevent background RAF from stealing main-thread.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isActiveRef.current = !!entry?.isIntersecting
        if (!isActiveRef.current && rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = 0
        }
        if (isActiveRef.current && rafRef.current === 0) {
          rafRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.01 }
    )
    observer.observe(canvas)

    const handleMouseMove = (e) => {
      mouseRef.current.tx = e.clientX
      mouseRef.current.ty = e.clientY
    }
    const handleMouseLeave = () => {
      mouseRef.current.tx = null
      mouseRef.current.ty = null
      mouseRef.current.x = null
      mouseRef.current.y = null
    }
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY
    }

    let resizeTimeout = 0
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => initPoints(), 120)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = (time) => {
      if (!isActiveRef.current) return

      // If the browser tab was backgrounded, skip heavy frames.
      const dt = time - lastFrameTime
      lastFrameTime = time
      const dtFactor = dt > 40 ? 0.5 : 1

      const w = canvas.width
      const h = canvas.height
      const centerX = w * 0.5
      const centerY = h * 0.5

      // Reduced motion: render less frequently by skipping frames.
      if (prefersReducedMotion && dt > 30) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, w, h)

      const scrollY = scrollPositionRef.current
      const mouse = mouseRef.current

      // Throttle mouse updates via interpolation, not direct per-event.
      if (mouse.tx != null && mouse.ty != null) {
        mouse.x = mouse.x == null ? mouse.tx : lerp(mouse.x, mouse.tx, 0.12)
        mouse.y = mouse.y == null ? mouse.ty : lerp(mouse.y, mouse.ty, 0.12)
      }

      const angleY = scrollY * 0.0006 + time * 0.00004
      const angleX = scrollY * 0.0003 + 0.35

      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      const boundX = w * config.wrapScale
      const boundY = h * config.wrapScale
      const boundZ = config.maxBoundZ

      // Project points without allocating new objects each frame
      for (let i = 0; i < points.length; i++) {
        const p = points[i]

        // 1) integrate
        p.x += p.vx * dtFactor
        p.y += p.vy * dtFactor
        p.z += p.vz * dtFactor

        // 2) wrap
        if (p.x < -boundX) p.x = boundX
        else if (p.x > boundX) p.x = -boundX

        if (p.y < -boundY) p.y = boundY
        else if (p.y > boundY) p.y = -boundY

        if (p.z < -boundZ) p.z = boundZ
        else if (p.z > boundZ) p.z = -boundZ

        // 3) scroll drift
        let ry = p.y - scrollY * 0.6
        const rangeY = boundY * 2
        ry = ((ry + boundY) % rangeY + rangeY) % rangeY - boundY

        // 4) mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const mx = mouse.x - centerX
          const my = mouse.y - centerY
          const dx = mx - p.x
          const dy = my - ry
          const dist = Math.sqrt(dx * dx + dy * dy) || 1

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius
            const nx = dx / dist
            const ny = dy / dist
            p.x -= nx * force * 0.6
            p.y -= ny * force * 0.6
            p.z += (p.z > 0 ? 1 : -1) * force * 0.6
          }
        }

        // 5) rotate Y
        const rx1 = p.x * cosY - p.z * sinY
        const rz1 = p.x * sinY + p.z * cosY

        // 6) rotate X
        const ry1 = ry * cosX - rz1 * sinX
        const rz2 = ry * sinX + rz1 * cosX

        // 7) project
        const denominator = config.fov + rz2
        const rawScale = denominator > 20 ? config.fov / denominator : config.fov / 20
        const scale = Math.min(1.3, Math.max(0.1, rawScale))
        const px = centerX + rx1 * scale
        const py = centerY + ry1 * scale

        const depthOpacity = Math.max(0.02, Math.min(0.45, (1 - rz2 / boundZ) * 0.22))
        const radius = Math.min(1.6, Math.max(0.1, p.baseRadius * scale))

        projectedPoints[i] = {
          px,
          py,
          scale,
          opacity: depthOpacity,
          radius,
        }
      }

      // Connections: still O(N^2), but cap expensive work per frame.
      // This avoids the worst-case jitter without changing overall look drastically.
      const connDist = config.connectionDistance
      let connections = 0

      for (let i = 0; i < points.length; i++) {
        const pi = projectedPoints[i]
        if (pi.opacity < 0.04) continue

        for (let j = i + 1; j < points.length; j++) {
          if (connections >= config.maxConnectionsPerFrame) break

          const pj = projectedPoints[j]
          if (pj.opacity < 0.04) continue

          const dx = pi.px - pj.px
          const dy = pi.py - pj.py
          const dist2D = Math.sqrt(dx * dx + dy * dy)

          if (dist2D < connDist) {
            const distanceFactor = 1 - dist2D / connDist
            const depthFactor = (pi.opacity + pj.opacity) * 0.5
            const alpha = distanceFactor * depthFactor * 1.4

            ctx.beginPath()
            ctx.moveTo(pi.px, pi.py)
            ctx.lineTo(pj.px, pj.py)
            ctx.strokeStyle = `rgba(140, 145, 155, ${alpha})`
            ctx.lineWidth = 0.45 * ((pi.scale + pj.scale) * 0.5)
            ctx.stroke()

            connections++
          }
        }

        if (connections >= config.maxConnectionsPerFrame) break
      }

      // Nodes
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i]
        ctx.beginPath()
        ctx.arc(p.px, p.py, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(140, 145, 155, ${p.opacity * 0.8 + 0.12})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // Initialize mouse radius
    mouseRef.current.radius = config.mouseRadius

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0

      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)

      clearTimeout(resizeTimeout)
    }
  }, [config, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-black select-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

