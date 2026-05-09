'use client'

import Image from 'next/image'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHomeIntroProgressSetter } from '@/components/HomeIntroScrollContext'

gsap.registerPlugin(ScrollTrigger)

/** First row (from top) containing ink — aligns cap height across PNGs despite different matte padding. */
function getFirstInkRowFromImage(img: HTMLImageElement): number {
  const w = img.naturalWidth
  const h = img.naturalHeight
  if (w < 2 || h < 2) return 0

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return 0

  try {
    ctx.drawImage(img, 0, 0)
    const { data } = ctx.getImageData(0, 0, w, h)
    const xStride = Math.max(1, Math.floor(w / 500))
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x += xStride) {
        const i = (y * w + x) * 4
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const a = data[i + 3]
        const dark = r + g + b < 520
        if (a > 42 && dark) return y
        if (a > 220 && dark) return y
      }
    }
  } catch {
    return 0
  }
  return 0
}

/** First column (from left) containing ink — pairs C/S vertical stems on stacked mobile lockup. */
function getFirstInkColumnFromImage(img: HTMLImageElement): number {
  const w = img.naturalWidth
  const h = img.naturalHeight
  if (w < 2 || h < 2) return 0

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return 0

  try {
    ctx.drawImage(img, 0, 0)
    const { data } = ctx.getImageData(0, 0, w, h)
    const yStride = Math.max(1, Math.floor(h / 500))
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y += yStride) {
        const i = (y * w + x) * 4
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const a = data[i + 3]
        const dark = r + g + b < 520
        if (a > 42 && dark) return x
        if (a > 220 && dark) return x
      }
    }
  } catch {
    return 0
  }
  return 0
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
  const introRebuildRef = useRef<(() => void) | null>(null)

  const bumpIntroLayout = useCallback(() => {
    requestAnimationFrame(() => {
      introRebuildRef.current?.()
      ScrollTrigger.refresh()
    })
  }, [])

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
        return el.getBoundingClientRect()
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
        shell.style.removeProperty('--sch-left-nudge')
      }
    }

    const imgLeft = () => leftShift.querySelector('img')
    const imgRight = () => rightShift.querySelector('img')

    /** Cap line Y everywhere; mobile also aligns first ink column (C/S left stem stack). */
    const syncInkAlignmentVars = (forMobileLayout: boolean) => {
      const lImg = imgLeft()
      const rImg = imgRight()
      if (!(lImg instanceof HTMLImageElement) || !(rImg instanceof HTMLImageElement)) {
        shell.style.setProperty('--sch-baseline-nudge', '0px')
        shell.style.setProperty('--sch-left-nudge', '0px')
        return
      }
      if (lImg.naturalWidth < 2 || rImg.naturalWidth < 2) {
        shell.style.setProperty('--sch-baseline-nudge', '0px')
        shell.style.setProperty('--sch-left-nudge', '0px')
        return
      }

      const lr = lImg.getBoundingClientRect()
      const rr = rImg.getBoundingClientRect()
      const rowL = getFirstInkRowFromImage(lImg)
      const rowR = getFirstInkRowFromImage(rImg)
      const capScreenYClub = lr.top + (rowL / lImg.naturalHeight) * lr.height
      const capScreenYSchorle = rr.top + (rowR / rImg.naturalHeight) * rr.height
      shell.style.setProperty('--sch-baseline-nudge', `${capScreenYClub - capScreenYSchorle}px`)

      if (forMobileLayout) {
        const colL = getFirstInkColumnFromImage(lImg)
        const colR = getFirstInkColumnFromImage(rImg)
        const inkXL = lr.left + (colL / lImg.naturalWidth) * lr.width
        const inkXR = rr.left + (colR / rImg.naturalWidth) * rr.width
        shell.style.setProperty('--sch-left-nudge', `${inkXL - inkXR}px`)
      } else {
        shell.style.setProperty('--sch-left-nudge', '0px')
      }
    }

    const measureOffsets = () => {
      gsap.set([leftShift, rightShift], { clearProps: 'transform' })
      shell.style.setProperty('--sch-baseline-nudge', '0px')
      shell.style.setProperty('--sch-left-nudge', '0px')
      void shell.offsetHeight

      const mobile = window.matchMedia('(max-width: 640px)').matches
      syncInkAlignmentVars(mobile)
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

      // Left-aligned stack (same gutter as CSS); horizontal motion handled by --sch-left-nudge + GSAP is vertical-only.
      const ax = 0
      const bx = 0
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

    const imgDecoded = (node: Element | null | undefined): node is HTMLImageElement =>
      !!node && node instanceof HTMLImageElement && node.naturalWidth > 0

    const build = () => {
      introCtx?.revert()

      const { ax, ay, bx, by, mobile } = measureOffsets()
      const lImg = imgLeft()
      const rImg = imgRight()
      const lr = lImg?.getBoundingClientRect()
      const rr = rImg?.getBoundingClientRect()
      const imgsReady =
        imgDecoded(lImg) &&
        imgDecoded(rImg) &&
        !!lr &&
        !!rr &&
        lr.width > 2 &&
        lr.height > 2 &&
        rr.width > 2 &&
        rr.height > 2

      if (!imgsReady) {
        if (imageLoadAttempts < 240) {
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

    introRebuildRef.current = build

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
      introRebuildRef.current = null
      introCtx?.revert()
      introCtx = null
      document.documentElement.style.removeProperty('--home-intro-decor-opacity')
      shell.style.removeProperty('--sch-baseline-nudge')
      shell.style.removeProperty('--sch-left-nudge')
    }
  }, [cinematicIntro, setIntroProgress])

  useEffect(() => {
    if (!cinematicIntro) return
    const onLoad = () => bumpIntroLayout()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [cinematicIntro, bumpIntroLayout])

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
            onLoadingComplete={bumpIntroLayout}
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
              onLoadingComplete={bumpIntroLayout}
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
