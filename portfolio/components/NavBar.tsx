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
          <li className="nav-item">
            <a className="nav-link" href="/#home" aria-label="Home">
              <img src="/House.png" alt="Home" />
              <span className="sr-only">Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#projects" aria-label="Projects">
              <img src="/Projects.png" alt="Projects" />
              <span className="sr-only">Projects</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#personal" aria-label="Personal">
              <img src="/Personal.png" alt="Personal" />
              <span className="sr-only">Personal</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#contact" aria-label="Resume and Contact">
              <img src="/Resume.png" alt="Resume" />
              <span className="sr-only">Resume and Contact</span>
            </a>
          </li>
        </ul>

        <div className="nav-footer">
          <button onClick={resetIntro} className="nav-link" style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '8px 10px', cursor: 'pointer' }}>
            Reset Intro
          </button>
        </div>
      </div>
    </nav>
  )
}
