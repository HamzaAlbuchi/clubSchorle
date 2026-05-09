'use client'

import Navigation from '@/components/Navigation'
import { HomeIntroScrollProvider } from '@/components/HomeIntroScrollContext'
import { PageWrapper } from '@/components/PageWrapper'
import { SplitWordmarkLayout } from '@/components/SplitWordmarkLayout'

export default function Home() {
  return (
    <HomeIntroScrollProvider>
      <Navigation />
      <PageWrapper
        disableMountFade
        ambientEdgesOnNarrow
        risingBubbles
        filmGrain
        bubbleAmbientRevealOnScroll
        ambientGraphicCenterColumn
      >
        <SplitWordmarkLayout cinematicIntro comingSoon>
          <div className="coming-soon-scroll-body" aria-hidden />
        </SplitWordmarkLayout>
      </PageWrapper>
    </HomeIntroScrollProvider>
  )
}
