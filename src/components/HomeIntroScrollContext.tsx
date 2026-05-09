'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

const HomeIntroProgressContext = createContext<number | null>(null)
const HomeIntroSetterContext = createContext<((progress: number) => void) | null>(null)

export function HomeIntroScrollProvider({ children }: { children: ReactNode }) {
  const [introProgress, setIntroProgressState] = useState(0)

  const setIntroProgress = useCallback((progress: number) => {
    setIntroProgressState(progress)
  }, [])

  return (
    <HomeIntroSetterContext.Provider value={setIntroProgress}>
      <HomeIntroProgressContext.Provider value={introProgress}>{children}</HomeIntroProgressContext.Provider>
    </HomeIntroSetterContext.Provider>
  )
}

/** Navigation / UI that should react to intro scroll progress (home only). */
export function useHomeIntroProgress() {
  return useContext(HomeIntroProgressContext)
}

/** GSAP intro: publish scrub progress without subscribing to updates. */
export function useHomeIntroProgressSetter() {
  return useContext(HomeIntroSetterContext)
}
