'use client'

import { useEffect, useState } from 'react'
import { HandDrawnCircle } from './HandDrawnCircles'

interface PageWrapperProps {
  children: React.ReactNode
  decorativeCircles?: boolean
}

export function PageWrapper({ children, decorativeCircles = true }: PageWrapperProps) {
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
      {/* Decorative circles: left / right margins only (outside center column, near wordmarks) */}
      {decorativeCircles && (
        <>
          <div
            className="page-wrapper-bubble page-wrapper-bubble--left page-wrapper-bubble--top"
            style={{ pointerEvents: 'none', zIndex: 0 }}
          >
            <HandDrawnCircle size={130} pathIndex={0} opacity={0.22} animate />
          </div>
          <div
            className="page-wrapper-bubble page-wrapper-bubble--left page-wrapper-bubble--bottom"
            style={{
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'floatingBubble 8s ease-in-out infinite',
              animationDelay: '1s',
            }}
          >
            <HandDrawnCircle size={150} pathIndex={1} opacity={0.24} />
          </div>
          <div
            className="page-wrapper-bubble page-wrapper-bubble--right page-wrapper-bubble--top"
            style={{
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'floatingBubble 7s ease-in-out infinite',
              animationDelay: '0.4s',
            }}
          >
            <HandDrawnCircle size={115} pathIndex={2} opacity={0.2} />
          </div>
          <div
            className="page-wrapper-bubble page-wrapper-bubble--right page-wrapper-bubble--bottom"
            style={{
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'floatingBubble 9s ease-in-out infinite',
              animationDelay: '1.2s',
            }}
          >
            <HandDrawnCircle size={95} pathIndex={3} opacity={0.23} />
          </div>
        </>
      )}

      {/* Content with fade-up animation */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          animation: mounted ? 'fadeUp 0.8s ease-out forwards' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
