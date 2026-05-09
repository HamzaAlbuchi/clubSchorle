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
      {/* Decorative hand-drawn circles scattered across page */}
      {decorativeCircles && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '10%',
              right: '8%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <HandDrawnCircle size={140} pathIndex={0} opacity={0.24} animate={true} />
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: '20%',
              left: '5%',
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'floatingBubble 8s ease-in-out infinite',
              animationDelay: '1s',
            }}
          >
            <HandDrawnCircle size={160} pathIndex={1} opacity={0.26} />
          </div>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              right: '12%',
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'floatingBubble 7s ease-in-out infinite',
              animationDelay: '0.5s',
            }}
          >
            <HandDrawnCircle size={120} pathIndex={2} opacity={0.22} />
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: '5%',
              right: '20%',
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'floatingBubble 9s ease-in-out infinite',
              animationDelay: '1.5s',
            }}
          >
            <HandDrawnCircle size={100} pathIndex={3} opacity={0.25} />
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
