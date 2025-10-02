"use client"

import React from 'react'
import Link from 'next/link'

type Project = {
  id: string
  title: string
  description: string
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {projects.map((p) => (
        <Link key={p.id} href={`/projects/${p.id}`} style={{ textDecoration: 'none' }}>
          <article
            tabIndex={0}
            role="button"
            aria-labelledby={`${p.id}-title`}
            style={{
              padding: '20px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              transition: 'transform 160ms ease, box-shadow 160ms ease',
              color: 'var(--foreground)'
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')}
          >
            <h3 id={`${p.id}-title`} style={{ margin: 0, fontSize: '1.125rem' }}>{p.title}</h3>
            <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.85 }}>{p.description}</p>
          </article>
        </Link>
      ))}
    </div>
  )
}
