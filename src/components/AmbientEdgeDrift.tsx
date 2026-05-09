'use client'
/* Small ambient sprites (many parallel instances); native img avoids Next/Image optimizer overhead. */
/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'

const ASSETS = ['/ambient/particle-0.png', '/ambient/particle-1.png', '/ambient/particle-2.png', '/ambient/particle-3.png']

const PARTICLE_COUNT = 16

type ParticleConfig = {
  key: string
  src: string
  side: 'left' | 'right'
  edgeVw: number
  sizePx: number
  durationSec: number
  delaySec: number
  driftXPx: number
  rotA: number
  rotB: number
  opHi: number
  opLo: number
  blurPx: number
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function generateParticles(): ParticleConfig[] {
  const list: ParticleConfig[] = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const slowLarge = Math.random() < 0.27
    const side: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right'

    const sizePx = slowLarge ? rand(64, 132) : rand(22, 62)
    const durationSec = slowLarge ? rand(54, 112) : rand(24, 52)
    const delaySec = -rand(0, durationSec * 0.98)

    const driftXPx = rand(-34, 34)
    const rotA = rand(-32, 32)
    const rotB = rotA + rand(-18, 18)

    const opHi = rand(0.065, 0.19)
    const opLo = opHi * rand(0.52, 0.82)

    const blurPx = Math.random() < 0.3 ? rand(0.7, 2.8) : 0

    list.push({
      key: `${i}-${Math.random().toString(36).slice(2, 10)}`,
      src: ASSETS[(Math.random() * ASSETS.length) | 0],
      side,
      edgeVw: rand(0.4, 14.5),
      sizePx,
      durationSec,
      delaySec,
      driftXPx,
      rotA,
      rotB,
      opHi,
      opLo,
      blurPx,
    })
  }
  return list
}

export function AmbientEdgeDrift({ style }: { style?: CSSProperties }) {
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

  const particles = useMemo(() => {
    if (!mounted || reduceMotion) return []
    return generateParticles()
  }, [mounted, reduceMotion])

  if (reduceMotion || !mounted) return null

  return (
    <div className="ambient-edge-drift" aria-hidden style={style}>
      {particles.map((p) => (
        <div
          key={p.key}
          className="ambient-edge-drift__particle"
          style={{
            ...(p.side === 'left' ? { left: `${p.edgeVw}vw` } : { right: `${p.edgeVw}vw` }),
            animationDuration: `${p.durationSec}s`,
            animationDelay: `${p.delaySec}s`,
            ['--drift-x' as string]: `${p.driftXPx}px`,
            ['--rot-a' as string]: `${p.rotA}deg`,
            ['--rot-b' as string]: `${p.rotB}deg`,
            ['--op-hi' as string]: String(p.opHi),
            ['--op-lo' as string]: String(p.opLo),
          }}
        >
          <img
            className="ambient-edge-drift__img"
            src={p.src}
            alt=""
            width={Math.round(p.sizePx)}
            height={Math.round(p.sizePx)}
            decoding="async"
            loading="lazy"
            draggable={false}
            style={{
              width: p.sizePx,
              height: 'auto',
              filter: p.blurPx > 0 ? `blur(${p.blurPx}px)` : undefined,
            }}
          />
        </div>
      ))}
    </div>
  )
}
