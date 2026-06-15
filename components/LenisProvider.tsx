'use client'

import { useEffect, type ReactNode } from 'react'

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: import('lenis').default | null = null

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      lenis.on('scroll', () => ScrollTrigger.update())

      const tick = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      // Let ScrollTrigger know about Lenis
      ScrollTrigger.addEventListener('refresh', () => lenis?.resize())
      window.addEventListener('resize', () => ScrollTrigger.refresh())
    }

    init()

    return () => {
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
