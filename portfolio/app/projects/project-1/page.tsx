import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Project 1',
};

export default function Page() {
  return (
    <main style={{ padding: '2rem', maxWidth: 880, margin: '0 auto', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Project Removed</h1>
      <p style={{ color: '#444', lineHeight: 1.6 }}>
        This project page has been removed. Return to the home page to continue.
      </p>
      <p style={{ marginTop: '1.25rem' }}>
        <Link href="/" style={{ color: '#0366d6', textDecoration: 'none' }}>Return home</Link>
      </p>
    </main>
  );
}
