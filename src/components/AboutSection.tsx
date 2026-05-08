'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '48', suffix: '+', label: 'Events seit Gründung' },
  { number: '1.200', suffix: '+', label: 'Gäste in München' },
  { number: '32', suffix: '', label: 'Kochende Künstler:innen' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
        }
      )

      const bodyEls = bodyRef.current?.querySelectorAll('p, h3')
      if (bodyEls) {
        gsap.fromTo(
          bodyEls,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: bodyRef.current, start: 'top 78%' },
          }
        )
      }

      const statEls = statsRef.current?.querySelectorAll('.stat')
      if (statEls) {
        gsap.fromTo(
          statEls,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative bg-background py-32 px-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wine/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-wine" />
            <span className="font-body text-[10px] tracking-[0.4em] text-wine uppercase">Über uns</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-cream leading-[1.05] text-balance">
            Wo Genuss auf<br />
            <em className="text-wine">Gestaltung</em> trifft.
          </h2>
        </div>

        {/* Body copy */}
        <div ref={bodyRef} className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-24">
          <div className="space-y-5">
            <p className="font-body text-cream/70 text-lg leading-relaxed">
              Club Schorle ist ein kuratierter Abendclub für Menschen, die das gute Leben verstehen — und es teilen wollen. Wir bringen Kunstschaffende, Köche und Neugierige zusammen.
            </p>
            <p className="font-body text-cream/45 text-base leading-relaxed">
              Gegründet in den Hinterhöfen Münchens, verbinden wir lokale Küche mit zeitgenössischem Ausdruck. Jedes Event ist einmalig — ein Dinner, eine Performance, eine Begegnung.
            </p>
          </div>
          <div className="space-y-5">
            <h3 className="font-display text-2xl text-cream italic leading-snug">
              Ein Club ohne Mitgliedschaft. Eine Gemeinschaft ohne Regeln.
            </h3>
            <p className="font-body text-cream/45 text-base leading-relaxed">
              Offen für alle, die sich für außergewöhnliche Kulinarik, zeitgenössische Kunst und ehrliche Gespräche begeistern. Kein Dresscode. Kein VIP-Bereich. Nur gute Menschen und gutes Essen.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-6 border-t border-muted pt-12">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="font-display text-[clamp(2rem,4vw,3.5rem)] text-wine leading-none mb-2">
                {s.number}
                <span className="text-wine/50">{s.suffix}</span>
              </div>
              <div className="font-body text-[10px] tracking-[0.25em] text-cream/35 uppercase leading-relaxed">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
