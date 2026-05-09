'use client'

import Link from 'next/link'
import { LogoWithCircle } from './HandDrawnCircles'

export default function Navigation() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(245, 242, 236, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(13, 12, 10, 0.08)',
      }}
    >
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <LogoWithCircle />
      </Link>

      <div style={{ display: 'flex', gap: '48px' }}>
        {[
          { label: 'Works', href: '/works' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: '9px',
              fontFamily: 'var(--font-dm-mono)',
              fontWeight: 300,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(13, 12, 10, 0.5)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(13, 12, 10, 1)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(13, 12, 10, 0.5)')}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
