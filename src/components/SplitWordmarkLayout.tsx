'use client'

import Image from 'next/image'

export function SplitWordmarkLayout({ children }: { children: React.ReactNode }) {
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
      <div className="split-hero-center-scroll">{children}</div>
    </div>
  )
}
