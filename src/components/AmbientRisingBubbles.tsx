'use client'
/* Many small sprites; native img avoids Next/Image optimizer overhead. */
/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'

const ASSETS = ['/ambient/particle-0.png', '/ambient/particle-1.png', '/ambient/particle-2.png', '/ambient/particle-3.png']

const BUBBLE_COUNT = 28

type BubbleConfig = {
  key: string
  src: string
  side: 'left' | 'right'
  /** 0 = hug edge, higher = slightly inward */
  edgeVw: number
  sizePx: number
  durationSec: number
  delaySec: number
  driftXPx: number
  opHi: number
  blurPx: number
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function generateBubbles(centerColumnOnly: boolean): BubbleConfig[] {
  const list: BubbleConfig[] = []
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const side: 'left' | 'right' = centerColumnOnly ? 'left' : Math.random() < 0.52 ? 'left' : 'right'
    const sizePx = rand(18, 72)
    const durationSec = rand(38, 96)
    const delaySec = -rand(0, durationSec * 0.99)
    const driftXPx = centerColumnOnly ? rand(-18, 18) : rand(-22, 22)
    const opHi = rand(0.05, 0.16)
    const blurPx = Math.random() < 0.35 ? rand(0.4, 2.2) : 0
    list.push({
      key: `${i}-${Math.random().toString(36).slice(2, 10)}`,
      src: ASSETS[(Math.random() * ASSETS.length) | 0],
      side,
      edgeVw: centerColumnOnly ? rand(38, 62) : rand(0.2, 8),
      sizePx,
      durationSec,
      delaySec,
      driftXPx,
      opHi,
      blurPx,
    })
  }
  return list
}

/** Soft circles rising from below; optional center-column band for typographic voids. */
export function AmbientRisingBubbles({
  style,
  centerColumnOnly = false,
}: {
  style?: CSSProperties
  centerColumnOnly?: boolean
}) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    setMounted(true)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const bubbles = useMemo(() => {
    if (!mounted || reduceMotion) return []
    return generateBubbles(centerColumnOnly)
  }, [mounted, reduceMotion, centerColumnOnly])

  if (reduceMotion || !mounted) return null

  return (
    <div className="ambient-rise" aria-hidden style={style}>
      {bubbles.map((b) => (
        <div
          key={b.key}
          className="ambient-rise__bubble"
          style={{
            ...(centerColumnOnly
              ? { left: `${b.edgeVw}vw`, right: 'auto' }
              : b.side === 'left'
                ? { left: `${b.edgeVw}vw` }
                : { right: `${b.edgeVw}vw` }),
            animationDuration: `${b.durationSec}s`,
            animationDelay: `${b.delaySec}s`,
            ['--rise-drift-x' as string]: `${b.driftXPx}px`,
            ['--rise-op-hi' as string]: String(b.opHi),
          }}
        >
          <img
            className="ambient-rise__img"
            src={b.src}
            alt=""
            width={Math.round(b.sizePx)}
            height={Math.round(b.sizePx)}
            decoding="async"
            loading="lazy"
            draggable={false}
            style={{
              width: b.sizePx,
              height: 'auto',
              filter: b.blurPx > 0 ? `blur(${b.blurPx}px)` : undefined,
            }}
          />
        </div>
      ))}
    </div>
  )
}
