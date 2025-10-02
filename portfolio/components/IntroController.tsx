"use client"

import React, { useEffect, useState } from 'react'
import Intro from './Intro'

export default function IntroController({ children }: { children: React.ReactNode }) {
  // Start with false so server-rendered HTML matches client before hydration.
  const [showIntro, setShowIntro] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mq.matches) {
        // user prefers reduced motion -> skip intro
        localStorage.setItem('seenIntro', '1')
        setShowIntro(false)
        return
      }

      const seen = !!localStorage.getItem('seenIntro')
      if (!seen) {
        // show intro after mount
        setShowIntro(true)
      }
    } catch (e) {
      // if accessing localStorage fails, don't show intro
      setShowIntro(false)
    }

    // listen for manual resets triggered from the NavBar Reset Intro button
    function handleResetEvent() {
      try {
        // ensure the intro will display
        setMounted(true)
        setShowIntro(true)
      } catch (e) {}
    }

    window.addEventListener('intro-reset', handleResetEvent)
    return () => {
      window.removeEventListener('intro-reset', handleResetEvent)
    }
  }, [])

  function handleFinish() {
    try {
      localStorage.setItem('seenIntro', '1')
    } catch (e) {}
    setShowIntro(false)
  }

  return (
    <>
      {/* only render the intro overlay after mount to avoid hydration mismatch */}
      {mounted && showIntro && <Intro onFinish={handleFinish} />}
      {children}
    </>
  )
}
