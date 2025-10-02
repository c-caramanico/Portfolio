"use client"

import React, { useState } from 'react'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  function resetIntro() {
    try {
      localStorage.removeItem('seenIntro')
    } catch (e) {}
    // notify listeners (IntroController) to show the intro
    try {
      // use a plain Event instead of CustomEvent for broader compatibility
      const evt = new Event('intro-reset')
      window.dispatchEvent(evt)
    } catch (e) {}
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a className="brand" href="/">Christian Caramanico</a>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? '✕' : '☰'}
        </button>

        <ul className="nav-list" role="navigation">
          <li className="nav-item"><a className="nav-link" href="/#home">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/#projects">Projects</a></li>
          <li className="nav-item"><a className="nav-link" href="/#personal">Personal</a></li>
          <li className="nav-item"><a className="nav-link" href="/#contact">Resume / Contact</a></li>
        </ul>

        <div style={{ marginTop: 'auto', width: '100%' }}>
          <button onClick={resetIntro} className="nav-link" style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '8px 10px', cursor: 'pointer' }}>
            Reset Intro
          </button>
        </div>
      </div>
    </nav>
  )
}
