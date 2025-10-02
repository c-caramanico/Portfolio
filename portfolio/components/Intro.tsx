"use client"

import React, { useEffect, useRef, useState } from 'react'

type Props = {
  onFinish: () => void
}

export default function Intro({ onFinish }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const knobRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const areaRef = useRef<HTMLDivElement | null>(null)
  const startX = useRef(0)
  const startY = useRef(0)
  const dragging = useRef(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const posRef = useRef(pos)
  const [released, setReleased] = useState(false)
  const [visible, setVisible] = useState(true)

  // used to briefly disable pointer interactions while launch animation runs
  const launching = useRef(false)

  // remember the starting position so we can return to it if release without launch
  const initialPos = useRef({ x: 0, y: 0 })

  // place rocket initially in the lower half of the interactive area
  useEffect(() => {
    const area = areaRef.current
    if (!area) return
    const rect = area.getBoundingClientRect()
    // move rocket down from center so it sits in the lower half
    // translate Y is relative to the centered starting position, so push it by ~1/4 of area height
    // start the rocket noticeably to the left so a parabola is required to reach the moon on the right
    // start further left to increase horizontal distance
    const start = { x: -Math.round(rect.width * 0.35), y: Math.round(rect.height * 0.25) }
    initialPos.current = start
    setPos(start)
  }, [])

  // keep a ref of the latest pos so animations read current values
  useEffect(() => {
    posRef.current = pos
  }, [pos])

  useEffect(() => {
    // lock body scroll while intro is visible
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev || ''
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      // If user prefers reduced motion, skip the interactive intro after a short delay
      const t = setTimeout(() => {
        fadeOut()
      }, 600)
      return () => clearTimeout(t)
    }
  }, [])

  function fadeOut() {
    setReleased(true)
    // give time for fade animation
    setTimeout(() => {
      setVisible(false)
      onFinish()
    }, 420)
  }

  function launchToTarget() {
    if (launching.current) return
    launching.current = true
    const knob = knobRef.current
    const target = targetRef.current
    if (!knob || !target) {
      // fallback to normal fade
      fadeOut()
      return
    }

    // compute vector from rocket center to target center
    const k = knob.getBoundingClientRect()
    const t = target.getBoundingClientRect()
    const startCenter = { x: k.left + k.width / 2, y: k.top + k.height / 2 }
    const targetCenter = { x: t.left + t.width / 2, y: t.top + t.height / 2 }
    const dx = targetCenter.x - startCenter.x
    const dy = targetCenter.y - startCenter.y

    // animate along a parabola using requestAnimationFrame
    const duration = 900 // ms
    const startTime = performance.now()
    // choose an apex offset: higher for longer horizontal distances
    const horiz = Math.abs(dx)
    const apex = Math.max(140, horiz * 0.25)

    const startPos = { ...posRef.current }

    function step(now: number) {
      const tNorm = Math.min(1, Math.max(0, (now - startTime) / duration))

      // simple linear interpolation + vertical arc offset (negative to go up)
      const linearX = startPos.x + dx * tNorm
      const linearY = startPos.y + dy * tNorm

      // y-arc using a parabola peak at t=0.5: 4*t*(1-t) ranges 0->1->0
      const arc = -apex * 4 * tNorm * (1 - tNorm)

      setPos({ x: linearX, y: linearY + arc })

      if (tNorm < 1) {
        requestAnimationFrame(step)
      } else {
        // land and finish
        setReleased(true)
        setTimeout(() => {
          setVisible(false)
          onFinish()
        }, 360)
      }
    }

    requestAnimationFrame(step)
  }

  function onPointerDown(e: React.PointerEvent) {
    const el = knobRef.current
    if (!el) return
    (e.target as Element).setPointerCapture(e.pointerId)
    dragging.current = true
    // account for any current translate so dragging does not jump
    startX.current = e.clientX - pos.x
    startY.current = e.clientY - pos.y
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || launching.current) return
    const dx = e.clientX - startX.current
    const dy = e.clientY - startY.current
    setPos({ x: dx, y: dy })

    // if the pointer overlaps the target element, launch
    if (targetRef.current) {
      const r = targetRef.current.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        // user dragged the rocket into the portal
        launchToTarget()
        dragging.current = false
      }
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    dragging.current = false
    // if not past threshold, animate back
    if (!launching.current) {
      // return to the initial lower-half start position
      setPos(initialPos.current)
    }
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      aria-hidden={false}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // match the moon asset's navy background exactly so the portal blends seamlessly
        background: '#021227',
        zIndex: 999999,
        transition: 'opacity 360ms ease',
        opacity: released ? 0 : 1,
        pointerEvents: released ? 'none' : 'auto'
      }}
    >
      <div style={{ textAlign: 'center', color: 'var(--foreground)', width: '100%', maxWidth: 960, padding: '2rem' }}>
        {/* intro visuals only; text removed for a cleaner look */}

        <div
          ref={areaRef}
          style={{
            marginTop: 28,
            height: '60vh',
            minHeight: 320,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Target (portal) on the right side */}
          <div
            ref={targetRef}
            aria-hidden
            style={{
              position: 'absolute',
              top: '12%',
              left: '82%',
              transform: 'translateX(-50%)',
              width: 140,
              height: 140,
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              overflow: 'hidden' // ensure the navy backing shows cleanly
            }}
          >
            {/* refined moon portal: solid navy backing + inner ring + bluish halo for consistent night look */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 420ms ease, opacity 420ms ease',
                // solid navy backing that matches the overlay base so edges blend cleanly
                background: '#021227',
                boxShadow: '0 0 40px rgba(20,70,140,0.28), inset 0 0 18px rgba(255,255,255,0.01)',
                padding: 6
              }}
            >
              {/* use the new moon_navy image and keep the portal backing identical to the overlay */}
              <img
                src="/moon_navy.png"
                alt="Moon"
                style={{
                  width: '86%',
                  height: '86%',
                  borderRadius: 999,
                  objectFit: 'cover',
                  backgroundColor: '#021227',
                  // remove blend mode for predictable color since the asset already has the right backing
                  filter: 'drop-shadow(0 12px 36px rgba(30,100,200,0.45))',
                  boxShadow: '0 6px 18px rgba(6,18,40,0.35)',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* Draggable rocket (increased size) */}
          <div
            ref={knobRef}
            role="button"
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              width: 110,
              height: 110,
              borderRadius: 22,
              // make the container transparent so the rocket image blends with the page
              background: 'transparent',
              boxShadow: '0 18px 40px rgba(0,0,0,0.65)',
              // use GPU-accelerated transform and hint the browser
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              transition: dragging.current || launching.current ? 'none' : 'transform 520ms cubic-bezier(.22,1,.36,1)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              touchAction: 'none',
              cursor: launching.current ? 'default' : 'grab',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0a0a0a',
              fontSize: 36,
              userSelect: 'none'
            }}
          >
            {/* Use an image placed in public/Rocket.png (or /file.svg). */}
            <img
              src="/Rocket.png"
              alt="Rocket"
              aria-hidden
              onError={(e) => {
                // fallback to a known asset if the Rocket.png fails to load
                const img = e.currentTarget as HTMLImageElement
                if (!img.src.endsWith('/file.svg')) {
                  img.src = '/file.svg'
                }
              }}
              style={{
                width: 84,
                height: 84,
                display: 'block',
                transform: 'translateY(-4px)',
                pointerEvents: 'none',
                willChange: 'transform',
                // blend white pixels into the background and add a subtle shadow for contrast
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0 14px 36px rgba(2,12,36,0.7))'
              }}
            />
          </div>
        </div>

        {/* Skip removed per user request */}
      </div>
    </div>
  )
}
