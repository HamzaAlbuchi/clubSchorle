'use client'

import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHomeIntroProgressSetter } from '@/components/HomeIntroScrollContext'

gsap.registerPlugin(ScrollTrigger)

function refreshScrollTriggersSoon() {
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

function introEndDistancePx(mobile: boolean) {
  return mobile
    ? Math.min(window.innerHeight * 1.14, 1080)
    : Math.min(window.innerHeight * 1.08, 1050)
}

export function SplitWordmarkLayout({
  children,
  cinematicIntro = false,
}: {
  children: React.ReactNode
  cinematicIntro?: boolean
}) {
  const shellRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const leftShiftRef = useRef<HTMLDivElement>(null)
  const rightShiftRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const setIntroProgress = useHomeIntroProgressSetter()

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

  useLayoutEffect(() => {
    if (!cinematicIntro) return

    const shell = shellRef.current
    const el = scrollerRef.current
    const leftShift = leftShiftRef.current
    const rightShift = rightShiftRef.current
    const veil = veilRef.current
    const reveal = revealRef.current

    if (!shell || !el || !leftShift || !rightShift || !veil || !reveal) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set(veil, { opacity: 0 })
      gsap.set(reveal, { opacity: 1, filter: 'none' })
      gsap.set([leftShift, rightShift], { clearProps: 'transform' })
      document.documentElement.style.setProperty('--home-intro-decor-opacity', '1')
      setIntroProgress?.(1)
      return () => {
        document.documentElement.style.removeProperty('--home-intro-decor-opacity')
        shell.style.removeProperty('--sch-baseline-nudge')
      }
    }

    const imgLeft = () => leftShift.querySelector('img')
    const imgRight = () => rightShift.querySelector('img')

    const syncDesktopBaselineVar = () => {
      const mqDesktop = window.matchMedia('(min-width: 641px)')
      const lImg = imgLeft()
      const rImg = imgRight()
      if (!mqDesktop.matches || !lImg || !rImg) {
        shell.style.setProperty('--sch-baseline-nudge', '0px')
        return
      }
      const lr = lImg.getBoundingClientRect()
      const rr = rImg.getBoundingClientRect()
      shell.style.setProperty('--sch-baseline-nudge', `${lr.top - rr.top}px`)
    }

    const measureOffsets = () => {
      gsap.set([leftShift, rightShift], { clearProps: 'transform' })
      syncDesktopBaselineVar()
      void shell.offsetHeight

      const lImg = imgLeft()
      const rImg = imgRight()
      if (!lImg || !rImg) {
        return { ax: 0, ay: 0, bx: 0, by: 0, mobile: false }
      }

      const lr = lImg.getBoundingClientRect()
      const rr = rImg.getBoundingClientRect()
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const mobile = window.matchMedia('(max-width: 640px)').matches

      const clubMidX = lr.left + lr.width / 2
      const schMidX = rr.left + rr.width / 2
      const clubMidY = lr.top + lr.height / 2
      const schMidY = rr.top + rr.height / 2

      if (!mobile) {
        // Horizontal lockup — gap scales with rendered CLUB width (editorial reference ~ one word width).
        const LOCKUP_GAP_X = lr.width * 1.05
        const dyAlign = cy - (clubMidY + schMidY) / 2
        const ax = cx - LOCKUP_GAP_X / 2 - lr.right
        const bx = cx + LOCKUP_GAP_X / 2 - rr.left
        return {
          mobile: false,
          ax,
          ay: dyAlign,
          bx,
          by: dyAlign,
        }
      }

      // Phone: vertical choreography — intro as one centered stack; scrub separates CLUB ↑ / SCHORLE ↓.
      const LOCKUP_GAP_Y = Math.min(Math.max(lr.height * 0.72, 20), 52)
      const stackH = lr.height + LOCKUP_GAP_Y + rr.height
      const stackTop = cy - stackH / 2

      const targetClubMidY = stackTop + lr.height / 2
      const targetSchMidY = stackTop + lr.height + LOCKUP_GAP_Y + rr.height / 2

      const ax = cx - clubMidX
      const bx = cx - schMidX
      const ay = targetClubMidY - clubMidY
      const by = targetSchMidY - schMidY

      return {
        mobile: true,
        ax,
        ay,
        bx,
        by,
      }
    }

    let resizeRaf = 0
    let introCtx: gsap.Context | null = null
    let imageLoadAttempts = 0

    const build = () => {
      introCtx?.revert()

      const { ax, ay, bx, by, mobile } = measureOffsets()
      const lImg = imgLeft()
      const rImg = imgRight()
      const imgsReady =
        lImg &&
        rImg &&
        lImg.getBoundingClientRect().width > 2 &&
        rImg.getBoundingClientRect().width > 2

      if (!imgsReady) {
        if (imageLoadAttempts < 90) {
          imageLoadAttempts += 1
          requestAnimationFrame(build)
          return
        }
        imageLoadAttempts = 0
      } else {
        imageLoadAttempts = 0
      }

      introCtx = gsap.context(() => {
        if (!imgsReady) {
          gsap.set(veil, { opacity: 0 })
          gsap.set(reveal, { opacity: 1, filter: 'none' })
          gsap.set([leftShift, rightShift], { clearProps: 'transform' })
          document.documentElement.style.setProperty('--home-intro-decor-opacity', '1')
          setIntroProgress?.(1)
          return
        }

        const skipBlur = window.matchMedia('(max-width: 768px)').matches

        gsap.set(veil, { opacity: 1 })
        gsap.set(reveal, {
          opacity: 0,
          filter: skipBlur ? 'none' : 'blur(11px)',
        })
        document.documentElement.style.setProperty('--home-intro-decor-opacity', '0')
        setIntroProgress?.(0)

        const introScale = mobile ? 1.1 : 1.22
        gsap.set(leftShift, { x: ax, y: ay, scale: introScale })
        gsap.set(rightShift, { x: bx, y: by, scale: introScale })

        gsap.timeline({
          defaults: { ease: 'none', duration: 1 },
          scrollTrigger: {
            scroller: el,
            start: 'top top',
            end: () => `+=${introEndDistancePx(mobile)}`,
            scrub: 1.25,
            invalidateOnRefresh: true,
            onUpdate(self) {
              setIntroProgress?.(self.progress)
              const decor = gsap.utils.mapRange(0.22, 0.92, 0, 1, self.progress)
              document.documentElement.style.setProperty(
                '--home-intro-decor-opacity',
                String(gsap.utils.clamp(0, 1, decor)),
              )
            },
          },
        })
          .to(
            veil,
            {
              opacity: 0,
              duration: 1,
              ease: 'power1.inOut',
            },
            0,
          )
          .to(
            reveal,
            {
              opacity: 1,
              filter: skipBlur ? 'none' : 'blur(0px)',
              duration: 1,
              ease: 'power2.out',
            },
            0,
          )
          .to(
            leftShift,
            {
              x: 0,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.inOut',
            },
            0,
          )
          .to(
            rightShift,
            {
              x: 0,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.inOut',
            },
            0,
          )
      }, shell)
    }


    build()

    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        build()
        ScrollTrigger.refresh()
      })
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(resizeRaf)
      introCtx?.revert()
      introCtx = null
      document.documentElement.style.removeProperty('--home-intro-decor-opacity')
      shell.style.removeProperty('--sch-baseline-nudge')
    }
  }, [cinematicIntro, setIntroProgress])

  return (
    <div
      ref={shellRef}
      className={cinematicIntro ? 'split-hero-shell split-hero-shell--cinematic' : 'split-hero-shell'}
    >
      {cinematicIntro ? (
        <div ref={veilRef} className="split-hero-intro-veil" aria-hidden="true" />
      ) : null}

      <div className="split-hero-side split-hero-side--left" aria-hidden="true">
        <div ref={leftShiftRef} className="split-hero-wordmark-shift">
          <Image
            className="split-hero-wordmark"
            src="/brand/club.png"
            alt=""
            width={900}
            height={260}
            priority
            onLoadingComplete={refreshScrollTriggersSoon}
          />
        </div>
      </div>
      <div className="split-hero-side split-hero-side--right" aria-hidden="true">
        <div className="split-hero-baseline-anchor split-hero-baseline-anchor--sch">
          <div ref={rightShiftRef} className="split-hero-wordmark-shift">
            <Image
              className="split-hero-wordmark"
              src="/brand/schorle.png"
              alt=""
              width={1400}
              height={260}
              priority
              onLoadingComplete={refreshScrollTriggersSoon}
            />
          </div>
        </div>
      </div>

      <div ref={scrollerRef} className="split-hero-center-scroll">
        {cinematicIntro ? (
          <div ref={revealRef} className="split-hero-intro-reveal">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
