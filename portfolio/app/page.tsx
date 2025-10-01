"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

// CircleScroll component: rotates cards as the page scrolls
function CircleScroll() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const items = [
    { id: 'project-1', title: 'Project 1', content: (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <h3 style={{ marginBottom: 12 }}>Welcome to My Portfolio</h3>
        <p>
          Hello! I'm [Your Name], a [Your Profession/Role]. Feel free to
          customize this section with your own information.
        </p>
      </div>
    )},
    { id: 'project-2', title: 'Project 2', content: 'Project 2' },
    { id: 'project-3', title: 'Project 3', content: 'Project 3' },
    { id: 'project-4', title: 'Project 4', content: 'Project 4' },
    { id: 'project-5', title: 'Project 5', content: 'Project 5' },
  ]

  return (
    <div ref={ref} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
        <motion.div style={{ transformStyle: 'preserve-3d', rotateX: rotate }}>
          {items.map((item, i) => (
            <Link key={item.id} href={`/projects/${item.id}`}>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 420,
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#2563eb',
                  color: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
                  transform: `translate(-50%, -50%) rotateX(${(i * 360) / items.length}deg) translateZ(600px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                {item.content}
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>Welcome to My Portfolio</h1>
        <p>This is a simple page you can easily edit.</p>
      </header>
      <main>
        <section>
          <h2>Projects</h2>
          <CircleScroll />
        </section>
      </main>
      <footer style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage