'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHomeIntroProgress } from '@/components/HomeIntroScrollContext'

function navRevealFromProgress(progress: number) {
  return Math.min(1, Math.max(0, (progress - 0.004) / 0.14))
}

const NAV_LINKS = [{ label: 'Contact', href: '/contact' as const }]

export default function Navigation() {
  const pathname = usePathname()
  const introProgress = useHomeIntroProgress()
  /** Only fade the bar with scroll when multiple links exist; single-link (e.g. Contact-only) stays visible. */
  const homeCinematicNav =
    pathname === '/' && introProgress !== null && NAV_LINKS.length > 1

  const reveal = homeCinematicNav ? navRevealFromProgress(introProgress) : 1
  const navOpacity = reveal
  const navTranslateY = homeCinematicNav ? (1 - reveal) * -14 : 0

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <nav
      className="site-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '48px',
        background: `rgba(245, 242, 236, ${0.85 * navOpacity})`,
        backdropFilter: navOpacity > 0.08 ? 'blur(8px)' : 'none',
        borderBottom: `1px solid rgba(13, 12, 10, ${0.08 * navOpacity})`,
        opacity: navOpacity,
        transform: `translateY(${navTranslateY}px)`,
        pointerEvents: homeCinematicNav && reveal < 0.03 ? 'none' : 'auto',
        transition: homeCinematicNav ? 'none' : 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      <div className="site-nav-links" style={{ display: 'flex', gap: '48px' }}>
        {NAV_LINKS.map((link) => (
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

      <button
        className="site-nav-toggle"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'none',
          border: 'none',
          background: 'transparent',
          padding: '10px 10px',
          cursor: 'pointer',
          color: '#0D0C0A',
        }}
      >
        <div
          style={{
            width: 22,
            height: 10,
            display: 'grid',
            gap: 5,
          }}
        >
          <span style={{ height: 1, background: 'rgba(13, 12, 10, 0.6)' }} />
          <span style={{ height: 1, background: 'rgba(13, 12, 10, 0.6)' }} />
        </div>
      </button>

      {open && (
        <div
          className="site-nav-drawer"
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(245, 242, 236, 0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 200,
            padding: '96px 24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
          onClick={() => setOpen(false)}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: '20px',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                color: '#0D0C0A',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 'auto', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(13, 12, 10, 0.45)' }}>
            Tap anywhere to close
          </div>
        </div>
      )}
    </nav>
  )
}
