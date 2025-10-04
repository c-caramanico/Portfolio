"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollRevealIntro({ onReveal }: { onReveal?: () => void }) {
  const { scrollYProgress } = useScroll()
  const [revealed, setRevealed] = useState(false)
  const signaled = useRef(false)

  // Fade the overlay out as the user scrolls from 0 -> 25% of the page
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v > 0.25) {
        setRevealed(true)
        if (!signaled.current) {
          signaled.current = true
          if (onReveal) onReveal()
          try {
            window.dispatchEvent(new Event('intro-revealed'))
          } catch (e) {}
        }
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, onReveal])

  if (revealed) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none' }}>
      {/* dark overlay that fades with scroll - pointerEvents none so scrolling works through it */}
      <motion.div style={{ position: 'absolute', inset: 0, background: '#000', opacity }} />

      {/* Centered intro content (doesn't block scroll) */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center', color: 'white', pointerEvents: 'auto', padding: '2rem' }}>
          <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 700 }}>Christian Caramanico</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>Engineer</p>
        </div>
      </div>
    </div>
  )
}
