'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    id: 1,
    date: '24. Mai 2026',
    title: 'Fermentierte Nächte',
    subtitle: 'Ein Abend über Vergärung, Verwandlung & Gemeinschaft',
    location: 'Maxvorstadt',
    category: 'Dinner & Installation',
    spots: 24,
  },
  {
    id: 2,
    date: '07. Juni 2026',
    title: 'Brot & Figment',
    subtitle: 'Backkunst trifft auf Textilinstallation',
    location: 'Glockenbach',
    category: 'Workshop & Dinner',
    spots: 16,
  },
  {
    id: 3,
    date: '21. Juni 2026',
    title: 'Sommersonnenwind',
    subtitle: 'Outdoor-Tafeln mit Live-Musik und Naturwein',
    location: 'Englischer Garten',
    category: 'Open Air Dinner',
    spots: 60,
  },
  {
    id: 4,
    date: '05. Juli 2026',
    title: 'Schwarz & Umami',
    subtitle: 'Ein Tasting-Menu der Farbe Schwarz',
    location: 'Schwabing',
    category: 'Tasting Menu',
    spots: 12,
  },
]

function EventCard({ event, index }: { event: (typeof EVENTS)[0]; index: number }) {
  return (
    <div className="event-card group border border-muted hover:border-wine/40 transition-colors duration-500 p-7 cursor-pointer h-full">
      <div className="flex items-start justify-between mb-8">
        <span className="font-body text-[9px] tracking-[0.35em] text-wine uppercase">{event.category}</span>
        <span className="font-display text-sm text-cream/25 italic">{event.spots} Plätze</span>
      </div>

      <div className="mb-8">
        <div className="font-display text-5xl text-cream/12 group-hover:text-cream/30 transition-colors duration-500 leading-none mb-3 select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="font-display text-[clamp(1.4rem,2.5vw,2rem)] text-cream group-hover:text-wine transition-colors duration-300 leading-tight">
          {event.title}
        </h3>
        <p className="font-body text-cream/45 text-sm mt-2 leading-relaxed">{event.subtitle}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-muted/60">
        <div className="flex items-center gap-3">
          <span className="font-body text-[11px] text-cream/35">{event.date}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-muted" />
          <span className="font-body text-[11px] text-cream/35">{event.location}</span>
        </div>
        <span className="font-body text-[9px] tracking-widest text-wine opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
          Mehr →
        </span>
      </div>
    </div>
  )
}

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
        }
      )

      const cards = gridRef.current?.querySelectorAll('.event-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="events" ref={sectionRef} className="relative bg-charcoal py-32 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-gold" />
              <span className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Upcoming</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-cream leading-[1.05]">
              Nächste<br />
              <em className="text-gold">Events</em>
            </h2>
          </div>
          <p className="font-body text-cream/35 text-sm max-w-xs leading-relaxed">
            Alle Events finden statt im Herzen Münchens. Anmeldung über unseren Newsletter.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-muted">
          {EVENTS.map((event, i) => (
            <div key={event.id} className="bg-charcoal">
              <EventCard event={event} index={i} />
            </div>
          ))}
        </div>

        {/* All events CTA */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="font-body text-[10px] tracking-[0.35em] text-cream/35 hover:text-cream transition-colors duration-300 uppercase inline-flex items-center gap-4"
          >
            <span className="h-px w-8 bg-current" />
            Alle Events ansehen
            <span className="h-px w-8 bg-current" />
          </a>
        </div>
      </div>
    </section>
  )
}
