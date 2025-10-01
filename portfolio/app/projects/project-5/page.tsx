import Link from 'next/link'

export default function Project5Page() {
  const ids = ['project-1', 'project-2', 'project-3', 'project-4', 'project-5']
  const idx = ids.indexOf('project-5')
  const prev = ids[(idx - 1 + ids.length) % ids.length]
  const next = ids[(idx + 1) % ids.length]

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 32 }}>
      <p><Link href="/">← Back</Link></p>
      <h1>Project 5</h1>
      <p style={{ maxWidth: 680 }}>
        This is a placeholder page for Project 5. Replace this with project details, images, or embeds.
      </p>

      <nav style={{ marginTop: 28, display: 'flex', gap: 12 }}>
        <Link href={`/projects/${prev}`} style={{ padding: '8px 12px', background: '#eee', borderRadius: 6 }}>← Prev</Link>
        <Link href={`/projects/${next}`} style={{ padding: '8px 12px', background: '#eee', borderRadius: 6 }}>Next →</Link>
      </nav>
    </div>
  )
}
