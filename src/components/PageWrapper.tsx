'use client'

import { useEffect, useState } from 'react'
import { AmbientEdgeDrift } from './AmbientEdgeDrift'

interface PageWrapperProps {
  children: React.ReactNode
  decorativeCircles?: boolean
  /** Skip the generic fade-up on mount (used when the page owns scroll-linked entrance motion). */
  disableMountFade?: boolean
}

export function PageWrapper({ children, decorativeCircles = true, disableMountFade = false }: PageWrapperProps) {
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
          style={{
            opacity: 'var(--home-intro-decor-opacity, 1)',
          }}
        />
      )}

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
