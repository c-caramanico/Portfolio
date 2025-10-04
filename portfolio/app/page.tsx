"use client"
import React from 'react'
import Link from 'next/link'
import ProjectsList from '../components/ProjectsList'
import { motion } from "framer-motion"

const projects = [
  { id: 'project-1', title: 'Project 1', description: 'Short description for project 1.' },
  { id: 'project-2', title: 'Project 2', description: 'Short description for project 2.' },
  { id: 'project-3', title: 'Project 3', description: 'Short description for project 3.' },
  { id: 'project-4', title: 'Project 4', description: 'Short description for project 4.' },
  { id: 'project-5', title: 'Project 5', description: 'Short description for project 5.' },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10" style={{ fontFamily: "var(--font-sans)", color: 'var(--foreground)' }}>
        {/* Home section */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Christian Caramanico
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              style={{ marginTop: '0.6rem', fontSize: '1.125rem', fontWeight: 300, opacity: 0.9 }}
            >
              Engineer
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
              style={{ marginTop: 20 }}
            >
              <a href="#projects" style={{ color: 'var(--foreground)', textDecoration: 'underline' }}>View projects</a>
            </motion.p>
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" aria-label="Projects" style={{ minHeight: '100vh', padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 900 }}>
            <header style={{ textAlign: 'center', marginBottom: 24 }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ margin: 0, fontSize: '2rem' }}
              >
                Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
                style={{ marginTop: 8, opacity: 0.9 }}
              >
                Browse my work below — scroll to see more.
              </motion.p>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
            >
              {/* use client ProjectsList component to render interactive cards */}
              <ProjectsList projects={projects} />
            </motion.div>
          </div>
        </section>

        {/* Personal section */}
        <section id="personal" aria-label="Personal" style={{ minHeight: '100vh', padding: '4rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 880 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ fontSize: '2rem', marginTop: 0 }}
            >
              Personal
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              style={{ opacity: 0.95 }}
            >
              Short bio or personal details go here. Share interests, background, or anything you'd like visitors to know.
            </motion.p>
          </div>
        </section>

        {/* Contact / Resume section */}
        <section id="contact" aria-label="Contact" style={{ minHeight: '60vh', padding: '4rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 720, textAlign: 'center' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ fontSize: '2rem' }}
            >
              Resume & Contact
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              style={{ opacity: 0.95 }}
            >
              You can include a link to your resume and contact details here.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
              style={{ marginTop: 12 }}
            >
              <a href="mailto:hello@example.com" style={{ color: 'var(--foreground)', textDecoration: 'underline' }}>hello@example.com</a>
            </motion.p>
          </div>
        </section>
      </div>
    </div>
  )
}