'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'product'

export default function Cursor() {
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const springX = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.1 })

  const [state, setState] = useState<CursorState>('default')
  const [isTouch, setIsTouch] = useState(true)
  const stateRef = useRef<CursorState>('default')
  stateRef.current = state

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    // Event delegation — works with dynamically rendered elements
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      if (!el) {
        if (stateRef.current !== 'default') setState('default')
        return
      }
      const next = el.dataset.cursor === 'product' ? 'product' : 'hover'
      if (stateRef.current !== next) setState(next)
    }

    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null
      if (!to?.closest('[data-cursor]')) setState('default')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [rawX, rawY])

  if (isTouch) return null

  const isHover = state !== 'default'

  return (
    <>
      {/* Filled dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-terracotta pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: isHover ? 0 : 12, height: isHover ? 0 : 12, opacity: isHover ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      />
      {/* Ring — mix-blend-mode difference */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHover ? 56 : 12,
          height: isHover ? 56 : 12,
          border: isHover ? '1.5px solid white' : '1.5px solid transparent',
          backgroundColor: isHover ? 'rgba(255,255,255,0.05)' : 'transparent',
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {state === 'product' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="font-dm text-[8px] tracking-[0.25em] uppercase text-white select-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
