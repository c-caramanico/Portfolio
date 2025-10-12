"use client"

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValue, useTransform } from 'framer-motion'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [0, 1])
  const opacity1 = useMotionValue(0)
  const opacity2 = useMotionValue(0)
  const opacity3 = useMotionValue(0)
  const opacity4 = useMotionValue(0)

  useEffect(() => {
    let max1 = 0
    const unsubscribe1 = scrollY.onChange((latest) => {
      if (latest >= 300) {
        max1 = 1
      } else if (latest >= 200) {
        max1 = Math.max(max1, (latest - 200) / 100)
      }
      opacity1.set(max1)
    })
    return unsubscribe1
  }, [scrollY, opacity1])

  useEffect(() => {
    let max2 = 0
    const unsubscribe2 = scrollY.onChange((latest) => {
      if (latest >= 400) {
        max2 = 1
      } else if (latest >= 300) {
        max2 = Math.max(max2, (latest - 300) / 100)
      }
      opacity2.set(max2)
    })
    return unsubscribe2
  }, [scrollY, opacity2])

  useEffect(() => {
    let max3 = 0
    const unsubscribe3 = scrollY.onChange((latest) => {
      if (latest >= 500) {
        max3 = 1
      } else if (latest >= 400) {
        max3 = Math.max(max3, (latest - 400) / 100)
      }
      opacity3.set(max3)
    })
    return unsubscribe3
  }, [scrollY, opacity3])

  useEffect(() => {
    let max4 = 0
    const unsubscribe4 = scrollY.onChange((latest) => {
      if (latest >= 600) {
        max4 = 1
      } else if (latest >= 500) {
        max4 = Math.max(max4, (latest - 500) / 100)
      }
      opacity4.set(max4)
    })
    return unsubscribe4
  }, [scrollY, opacity4])

  function resetIntro() {
    try {
      sessionStorage.removeItem('hasSeenRocketIntro')
    } catch (e) {}
    // Reload the page to show the intro again
    window.location.reload()
  }

  return (
    <>
      {/* Overlay for sidebar */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
          aria-label="Close menu overlay"
        />
      )}
      <motion.nav
        className={`navbar${open ? ' open' : ''}`}
        style={{ opacity }}
      >
        <div className="nav-container">
          {/* brand removed per user request - sidebar now icon-only */}

          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? '✕' : '☰'}
          </button>

          <ul className="nav-list" role="navigation">
            <motion.li className="nav-item" style={{ opacity: opacity1 }}>
              <a className="nav-link" href="/#home" aria-label="Home">
                <img src="/House.png" alt="Home" />
                <span className="sr-only">Home</span>
              </a>
            </motion.li>
            <motion.li className="nav-item" style={{ opacity: opacity2 }}>
              <a className="nav-link" href="/#projects" aria-label="Projects">
                <img src="/Projects.png" alt="Projects" />
                <span className="sr-only">Projects</span>
              </a>
            </motion.li>
            <motion.li className="nav-item" style={{ opacity: opacity3 }}>
              <a className="nav-link" href="/#personal" aria-label="Personal">
                <img src="/Personal.png" alt="Personal" />
                <span className="sr-only">Personal</span>
              </a>
            </motion.li>
            <motion.li className="nav-item" style={{ opacity: opacity4 }}>
              <a className="nav-link" href="/#contact" aria-label="Resume and Contact">
                <img src="/Resume.png" alt="Resume" />
                <span className="sr-only">Resume and Contact</span>
              </a>
            </motion.li>
          </ul>

          <div className="nav-footer">
            <button onClick={resetIntro} className="nav-link" style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '8px 10px', cursor: 'pointer' }}>
              Reset Intro
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
