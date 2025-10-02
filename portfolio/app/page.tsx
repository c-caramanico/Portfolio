import React from 'react'
import Link from 'next/link'
import ProjectsList from '../components/ProjectsList'

export const metadata = {
  title: 'Home',
}

const projects = [
  { id: 'project-1', title: 'Project 1', description: 'Short description for project 1.' },
  { id: 'project-2', title: 'Project 2', description: 'Short description for project 2.' },
  { id: 'project-3', title: 'Project 3', description: 'Short description for project 3.' },
  { id: 'project-4', title: 'Project 4', description: 'Short description for project 4.' },
  { id: 'project-5', title: 'Project 5', description: 'Short description for project 5.' },
]

export default function HomePage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", color: 'var(--foreground)' }}>
      {/* Home section */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>Christian Caramanico</h1>
          <p style={{ marginTop: '0.6rem', fontSize: '1.125rem', fontWeight: 300, opacity: 0.9 }}>Engineer</p>
          <p style={{ marginTop: 20 }}>
            <a href="#projects" style={{ color: 'var(--foreground)', textDecoration: 'underline' }}>View projects</a>
          </p>
        </div>
      </section>

      {/* Projects section */}
      <section id="projects" aria-label="Projects" style={{ minHeight: '100vh', padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 900 }}>
          <header style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>Projects</h2>
            <p style={{ marginTop: 8, opacity: 0.9 }}>Browse my work below — scroll to see more.</p>
          </header>

          {/* use client ProjectsList component to render interactive cards */}
          <ProjectsList projects={projects} />
        </div>
      </section>

      {/* Personal section */}
      <section id="personal" aria-label="Personal" style={{ minHeight: '100vh', padding: '4rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 880 }}>
          <h2 style={{ fontSize: '2rem', marginTop: 0 }}>Personal</h2>
          <p style={{ opacity: 0.95 }}>Short bio or personal details go here. Share interests, background, or anything you'd like visitors to know.</p>
        </div>
      </section>

      {/* Contact / Resume section */}
      <section id="contact" aria-label="Contact" style={{ minHeight: '60vh', padding: '4rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem' }}>Resume & Contact</h2>
          <p style={{ opacity: 0.95 }}>You can include a link to your resume and contact details here.</p>
          <p style={{ marginTop: 12 }}>
            <a href="mailto:hello@example.com" style={{ color: 'var(--foreground)', textDecoration: 'underline' }}>hello@example.com</a>
          </p>
        </div>
      </section>
    </div>
  )
}