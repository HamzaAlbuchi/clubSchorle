'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? 'rgba(12,12,12,0.92)' : 'rgba(12,12,12,0)',
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [scrolled])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
      style={{ borderBottom: scrolled ? '1px solid rgba(197,56,92,0.15)' : '1px solid transparent' }}
    >
      <Link
        href="/"
        className="font-display text-lg tracking-widest text-cream"
      >
        CLUB SCHORLE
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link
          href="#about"
          className="font-body text-[11px] tracking-[0.25em] text-cream/60 hover:text-wine transition-colors duration-300 uppercase"
        >
          Über uns
        </Link>
        <Link
          href="#events"
          className="font-body text-[11px] tracking-[0.25em] text-cream/60 hover:text-wine transition-colors duration-300 uppercase"
        >
          Events
        </Link>
        <Link
          href="#contact"
          className="font-body text-[10px] tracking-[0.2em] border border-wine/60 text-wine px-5 py-2 hover:bg-wine hover:text-cream transition-all duration-300 uppercase"
        >
          Reservieren
        </Link>
      </div>
    </nav>
  )
}
