'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type EditorialVariant = 'hero' | 'transition' | 'poster' | 'fragment'

export interface EditorialSectionProps {
  variant: EditorialVariant
  src: string
  alt: string
  label?: string
  caption?: string
  priority?: boolean
  className?: string
  overlay?: ReactNode
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function EditorialSection({
  variant,
  src,
  alt,
  label,
  caption,
  priority = false,
  className = '',
  overlay,
}: EditorialSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const inner = innerRef.current
    if (!root || !inner) return

    const reduced = prefersReducedMotion()
    const imgEl = inner.querySelector('.editorial-parallax-img') as HTMLElement | null
    const reveals = root.querySelectorAll('[data-editorial-reveal]')
    const scrollerEl = root.closest('.split-hero-center-scroll') ?? undefined

    if (reduced) {
      gsap.set(reveals, { opacity: 1, y: 0 })
      if (imgEl) gsap.set(imgEl, { scale: 1, yPercent: 0 })
      return
    }

    const scrubAmount = variant === 'hero' ? 1.15 : variant === 'transition' ? 1.08 : variant === 'poster' ? 1.06 : 1.04
    const yParallax = variant === 'hero' ? -10 : variant === 'transition' ? -7 : variant === 'poster' ? -5 : -4

    const ctx = gsap.context(() => {
      if (imgEl) {
        gsap.fromTo(
          imgEl,
          { scale: scrubAmount, yPercent: Math.abs(yParallax) * 0.35 },
          {
            scale: 1,
            yPercent: yParallax,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              scroller: scrollerEl ?? window,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }

      gsap.from(reveals, {
        opacity: 0,
        y: 22,
        duration: 0.95,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root,
          scroller: scrollerEl ?? window,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [variant, label, caption])

  const variantClass = `editorial editorial--${variant}`

  return (
    <section ref={rootRef} className={`${variantClass} ${className}`.trim()} aria-label={alt}>
      <div ref={innerRef} className="editorial-inner">
        <div className="editorial-frame">
          <Image
            className="editorial-parallax-img editorial-photo"
            src={src}
            alt={alt}
            fill
            sizes={
              variant === 'fragment'
                ? '(max-width: 640px) 72vw, 320px'
                : '(max-width: 640px) 140vw, (max-width: 1024px) 110vw, min(96vw, 1400px)'
            }
            priority={priority}
            draggable={false}
          />
          <div className="editorial-grain" aria-hidden />
        </div>

        {overlay && <div className="editorial-overlay">{overlay}</div>}

        {(label || caption) && (
          <div className="editorial-type">
            {label && (
              <p data-editorial-reveal className="editorial-label">
                {label}
              </p>
            )}
            {caption && (
              <p data-editorial-reveal className="editorial-caption">
                {caption}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
