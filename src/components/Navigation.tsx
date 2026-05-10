'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHomeIntroProgress } from '@/components/HomeIntroScrollContext'

function navRevealFromProgress(progress: number) {
  return Math.min(1, Math.max(0, (progress - 0.004) / 0.14))
}

const NAV_LINKS = [{ label: 'Contact', href: '/contact' as const }]

const navLinkStyle = {
  fontSize: '9px',
  fontFamily: 'var(--font-dm-mono)',
  fontWeight: 300,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'rgba(13, 12, 10, 0.5)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

export default function Navigation() {
  const pathname = usePathname()
  const introProgress = useHomeIntroProgress()
  const [open, setOpen] = useState(false)

  /** Home landing: nav fully hidden at rest; chrome + title + links fade in with intro scroll. */
  const homeCinematicNav = pathname === '/' && introProgress !== null

  const revealFromScroll = homeCinematicNav ? navRevealFromProgress(introProgress) : 1
  /** Keep chrome usable while drawer is open even if user scrolled little. */
  const barReveal = open ? 1 : revealFromScroll
  const navChromeTranslate = homeCinematicNav ? (1 - barReveal) * -14 : 0

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

  const baseNavChrome = {
    background: 'rgba(245, 242, 236, 0.85)' as const,
    backdropFilter: 'blur(8px)' as const,
    borderBottom: '1px solid rgba(13, 12, 10, 0.08)' as const,
  }

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
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '48px',
        ...(homeCinematicNav
          ? {
              background: 'transparent',
              borderBottom: 'none',
              backdropFilter: 'none',
            }
          : baseNavChrome),
        pointerEvents: 'auto',
      }}
    >
      {homeCinematicNav ? (
        <div
          className="site-nav-chrome"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            background: `rgba(245, 242, 236, ${0.85 * barReveal})`,
            backdropFilter: barReveal > 0.08 ? 'blur(8px)' : 'none',
            borderBottom: `1px solid rgba(13, 12, 10, ${0.08 * barReveal})`,
            opacity: barReveal,
            transform: `translateY(${navChromeTranslate}px)`,
            transition: 'none',
          }}
        />
      ) : null}

      <Link
        href="/"
        tabIndex={homeCinematicNav && barReveal < 0.03 ? -1 : undefined}
        style={{
          ...navLinkStyle,
          position: 'relative',
          zIndex: 1,
          ...(pathname === '/' ? { color: 'rgba(13, 12, 10, 0.42)' } : {}),
          ...(homeCinematicNav
            ? {
                opacity: barReveal,
                transform: `translateY(${navChromeTranslate}px)`,
                transition: 'none',
                pointerEvents: barReveal < 0.03 ? 'none' : 'auto',
              }
            : {}),
        }}
        aria-current={pathname === '/' ? 'page' : undefined}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(13, 12, 10, 1)')}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = pathname === '/' ? 'rgba(13, 12, 10, 0.42)' : 'rgba(13, 12, 10, 0.5)')
        }
      >
        Club Schorle
      </Link>

      <div
        className="site-nav-links"
        style={{
          display: 'flex',
          gap: '48px',
          marginLeft: 'auto',
          position: 'relative',
          zIndex: 1,
          ...(homeCinematicNav
            ? {
                opacity: barReveal,
                transform: `translateY(${navChromeTranslate}px)`,
                transition: 'none',
                pointerEvents: barReveal < 0.03 ? 'none' : 'auto',
              }
            : {}),
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              ...navLinkStyle,
              ...(pathname === link.href ? { color: 'rgba(13, 12, 10, 0.85)' } : {}),
            }}
            aria-current={pathname === link.href ? 'page' : undefined}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(13, 12, 10, 1)')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color =
                pathname === link.href ? 'rgba(13, 12, 10, 0.85)' : 'rgba(13, 12, 10, 0.5)')
            }
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
          position: 'relative',
          zIndex: 1,
          ...(homeCinematicNav
            ? {
                opacity: barReveal,
                transform: `translateY(${navChromeTranslate}px)`,
                transition: 'none',
                pointerEvents: barReveal < 0.03 ? 'none' : 'auto',
              }
            : {}),
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
          <Link
            href="/"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
            style={{
              fontSize: '20px',
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              color: pathname === '/' ? 'rgba(13, 12, 10, 0.35)' : '#0D0C0A',
              textDecoration: 'none',
            }}
          >
            Club Schorle
          </Link>
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
