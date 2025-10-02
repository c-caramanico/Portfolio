"use client"

import React, { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  size: number
  baseAlpha: number
  speed: number
  phase: number
}

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const starsRef = useRef<Star[] | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return // don't animate

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateStars(w, h)
    }

    function generateStars(w: number, h: number) {
      // density roughly proportional to area; cap for performance
      const area = w * h
      const count = Math.min(600, Math.max(80, Math.round(area / 7000)))
      const stars: Star[] = []
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.8 + (Math.random() > 0.92 ? 1.6 : 0) // some larger
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseAlpha: 0.35 + Math.random() * 0.65,
          speed: 0.6 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2
        })
      }
      starsRef.current = stars
    }

    let lastTime = performance.now()
    function render(now: number) {
      const stars = starsRef.current
      if (!stars) return
      const t = now / 1000
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      // subtle gradient background overlay (keeps stars visible on night background)
      // not filling the whole canvas to avoid covering existing background; keep transparent

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase))
        ctx.save()
        ctx.globalAlpha = alpha
        // small glow for larger stars
        const glow = Math.max(0, s.size * 2)
        ctx.fillStyle = 'rgba(255,255,255,1)'
        ctx.shadowColor = 'rgba(255,255,240,0.9)'
        ctx.shadowBlur = glow * 2
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(render)
      lastTime = now
    }

    // initial setup
    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(render)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}
