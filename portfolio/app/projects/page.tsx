import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Projects',
}

const projects = [
  { id: 'project-1', title: 'Project 1', description: 'Short description for project 1.' },
  { id: 'project-2', title: 'Project 2', description: 'Short description for project 2.' },
  { id: 'project-3', title: 'Project 3', description: 'Short description for project 3.' },
  { id: 'project-4', title: 'Project 4', description: 'Short description for project 4.' },
  { id: 'project-5', title: 'Project 5', description: 'Short description for project 5.' },
]

export default function ProjectsPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1.5rem', display: 'flex', justifyContent: 'center', background: 'transparent' }}>
      <div style={{ width: '100%', maxWidth: 900 }}>
        <header style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Projects</h1>
          <p style={{ marginTop: 8, color: 'var(--foreground)', opacity: 0.9 }}>Browse my work below — scroll to see more.</p>
        </header>

        <section aria-label="Projects list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} style={{ textDecoration: 'none' }}>
              <article
                tabIndex={0}
                role="button"
                aria-labelledby={`${p.id}-title`}
                style={{
                  padding: '20px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)',
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
        </section>

        <footer style={{ marginTop: 28, textAlign: 'center', color: 'var(--foreground)', opacity: 0.8 }}>
          <p style={{ margin: 0 }}>Tip: Use your mousewheel or trackpad to scroll through projects.</p>
        </footer>
      </div>
    </main>
  )
}
