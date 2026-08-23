import { useEffect, useRef } from 'react'
import onekoGif from '../assets/oneko.gif'

const spriteSets = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
}

export default function CursorCat() {
  const nekoRef = useRef(null)

  useEffect(() => {
    // 1. Reduced motion check
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    // 2. Touch / mobile device check
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const nekoEl = nekoRef.current
    if (!nekoEl) return

    let nekoPosX = window.innerWidth / 2
    let nekoPosY = window.innerHeight / 2
    let mousePosX = nekoPosX
    let mousePosY = nekoPosY

    let frameCount = 0
    let idleTime = 0
    let idleAnimation = null
    let idleAnimationFrame = 0
    const nekoSpeed = 10

    let animationFrameId = null
    let lastFrameTimestamp = 0

    function setSprite(name, frame) {
      if (!spriteSets[name]) return
      const sprite = spriteSets[name][frame % spriteSets[name].length]
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`
    }

    function resetIdleAnimation() {
      idleAnimation = null
      idleAnimationFrame = 0
    }

    function idle() {
      idleTime += 1

      // Random idle animations every ~20s
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
        const available = ['sleeping', 'scratchSelf']
        if (nekoPosX < 32) available.push('scratchWallW')
        if (nekoPosY < 32) available.push('scratchWallN')
        if (nekoPosX > window.innerWidth - 32) available.push('scratchWallE')
        if (nekoPosY > window.innerHeight - 32) available.push('scratchWallS')
        idleAnimation = available[Math.floor(Math.random() * available.length)]
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) {
            setSprite('tired', 0)
            break
          }
          setSprite('sleeping', Math.floor(idleAnimationFrame / 4))
          if (idleAnimationFrame > 192) {
            resetIdleAnimation()
          }
          break
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation, idleAnimationFrame)
          if (idleAnimationFrame > 9) {
            resetIdleAnimation()
          }
          break
        default:
          setSprite('idle', 0)
          return
      }
      idleAnimationFrame += 1
    }

    function frame() {
      frameCount += 1
      const diffX = nekoPosX - mousePosX
      const diffY = nekoPosY - mousePosY
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

      if (distance < nekoSpeed || distance < 48) {
        idle()
        return
      }

      idleAnimation = null
      idleAnimationFrame = 0

      if (idleTime > 1) {
        setSprite('alert', 0)
        idleTime = Math.min(idleTime, 7)
        idleTime -= 1
        return
      }

      let direction = ''
      direction += diffY / distance > 0.5 ? 'N' : ''
      direction += diffY / distance < -0.5 ? 'S' : ''
      direction += diffX / distance > 0.5 ? 'W' : ''
      direction += diffX / distance < -0.5 ? 'E' : ''
      setSprite(direction || 'idle', frameCount)

      nekoPosX -= (diffX / distance) * nekoSpeed
      nekoPosY -= (diffY / distance) * nekoSpeed

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16)
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16)

      nekoEl.style.left = `${nekoPosX - 16}px`
      nekoEl.style.top = `${nekoPosY - 16}px`
    }

    function onAnimationFrame(timestamp) {
      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp
      }
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp
        frame()
      }
      animationFrameId = window.requestAnimationFrame(onAnimationFrame)
    }

    function handleMouseMove(e) {
      mousePosX = e.clientX
      mousePosY = e.clientY
    }

    // Initial positioning
    nekoEl.style.left = `${nekoPosX - 16}px`
    nekoEl.style.top = `${nekoPosY - 16}px`
    setSprite('idle', 0)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animationFrameId = window.requestAnimationFrame(onAnimationFrame)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div
      ref={nekoRef}
      aria-hidden="true"
      className="hidden md:block fixed pointer-events-none select-none z-30"
      style={{
        width: '32px',
        height: '32px',
        backgroundImage: `url(${onekoGif})`,
        imageRendering: 'pixelated',
        backgroundRepeat: 'no-repeat',
        filter: 'none',
        boxShadow: 'none',
        textShadow: 'none',
        outline: 'none',
      }}
    />
  )
}
