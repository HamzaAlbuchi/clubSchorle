'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SplitWordmarkLayout({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    ScrollTrigger.scrollerProxy(el, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          el.scrollTop = value
        }
        return el.scrollTop
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    const onScroll = () => ScrollTrigger.update()
    el.addEventListener('scroll', onScroll)
    ScrollTrigger.addEventListener('refreshInit', ScrollTrigger.update)
    ScrollTrigger.refresh()

    return () => {
      el.removeEventListener('scroll', onScroll)
      ScrollTrigger.scrollerProxy(el, {})
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <div className="split-hero-shell">
      <div className="split-hero-side split-hero-side--left" aria-hidden="true">
        <Image
          className="split-hero-wordmark"
          src="/brand/club.png"
          alt=""
          width={900}
          height={260}
          priority
        />
      </div>
      <div className="split-hero-side split-hero-side--right" aria-hidden="true">
        <Image
          className="split-hero-wordmark"
          src="/brand/schorle.png"
          alt=""
          width={1400}
          height={260}
          priority
        />
      </div>
      <div ref={scrollerRef} className="split-hero-center-scroll">
        {children}
      </div>
    </div>
  )
}
