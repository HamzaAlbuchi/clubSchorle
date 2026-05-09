'use client'

import { useEffect, useState } from 'react'
import { AmbientEdgeDrift } from './AmbientEdgeDrift'
import { AmbientRisingBubbles } from './AmbientRisingBubbles'

interface PageWrapperProps {
  children: React.ReactNode
  decorativeCircles?: boolean
  /** Skip the generic fade-up on mount (used when the page owns scroll-linked entrance motion). */
  disableMountFade?: boolean
  /** Edge drift visible on phones (e.g. typographic “coming soon” shell). */
  ambientEdgesOnNarrow?: boolean
  /** Extra layer: bubbles rising from bottom, biased to edges. */
  risingBubbles?: boolean
  /** Very faint fixed film grain. */
  filmGrain?: boolean
  /** Bubbles / edge drift opacity follows `--home-bubbles-opacity` (scroll-driven on home). */
  bubbleAmbientRevealOnScroll?: boolean
  /** Keep ambient graphics in a band around the horizontal center (between side wordmarks). */
  ambientGraphicCenterColumn?: boolean
}

export function PageWrapper({
  children,
  decorativeCircles = true,
  disableMountFade = false,
  ambientEdgesOnNarrow = false,
  risingBubbles = false,
  filmGrain = false,
  bubbleAmbientRevealOnScroll = false,
  ambientGraphicCenterColumn = false,
}: PageWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#F5F2EC',
        paddingTop: '80px',
      }}
    >
      {decorativeCircles && (
        <AmbientEdgeDrift
          edgesOnNarrow={ambientEdgesOnNarrow}
          centerColumnOnly={ambientGraphicCenterColumn}
          style={{
            opacity: bubbleAmbientRevealOnScroll
              ? 'var(--home-bubbles-opacity, 1)'
              : 'var(--home-intro-decor-opacity, 1)',
          }}
        />
      )}
      {risingBubbles ? (
        <AmbientRisingBubbles
          centerColumnOnly={ambientGraphicCenterColumn}
          style={{
            opacity: bubbleAmbientRevealOnScroll
              ? 'var(--home-bubbles-opacity, 1)'
              : 'var(--home-intro-decor-opacity, 1)',
          }}
        />
      ) : null}
      {filmGrain ? <div className="page-film-grain" aria-hidden /> : null}

      {/* Content with fade-up animation */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          animation:
            disableMountFade || !mounted ? 'none' : 'fadeUp 0.8s ease-out forwards',
        }}
      >
        {children}
      </div>
    </div>
  )
}
