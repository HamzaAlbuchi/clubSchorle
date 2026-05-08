'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

export default function HeroSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
        .fromTo(titleRef.current, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }, '-=0.4')
        .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7')
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.4')
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Gradient vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p
          ref={eyebrowRef}
          className="font-body text-[10px] tracking-[0.5em] text-wine uppercase mb-6"
          style={{ opacity: 0 }}
        >
          München · Est. 2024
        </p>

        <h1
          ref={titleRef}
          className="font-display text-[clamp(4rem,12vw,9rem)] text-cream leading-[0.88] tracking-tight"
          style={{ opacity: 0 }}
        >
          Club
          <br />
          <em className="text-wine not-italic">Schorle</em>
        </h1>

        <p
          ref={subRef}
          className="font-body text-[11px] md:text-sm tracking-[0.35em] text-cream/55 mt-8 max-w-sm uppercase"
          style={{ opacity: 0 }}
        >
          Ein Ort für Kunst, Kulinarik und Kollektiv
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap gap-3 mt-10 justify-center"
          style={{ opacity: 0 }}
        >
          <a
            href="#events"
            className="font-body text-[10px] tracking-[0.25em] bg-wine text-cream px-8 py-3 hover:bg-wine-dark transition-colors duration-300 uppercase"
          >
            Nächstes Event
          </a>
          <a
            href="#about"
            className="font-body text-[10px] tracking-[0.25em] border border-cream/25 text-cream/65 px-8 py-3 hover:border-wine hover:text-cream transition-colors duration-300 uppercase"
          >
            Über uns
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="font-body text-[9px] tracking-[0.4em] text-cream/35 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-wine/70 to-transparent" />
      </div>
    </section>
  )
}
