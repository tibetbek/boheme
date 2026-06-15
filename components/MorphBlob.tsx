'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'

const paths = [
  'M 0,-150 C 70,-160 160,-80 160,0 C 160,90 90,155 0,155 C -90,155 -165,90 -165,-10 C -165,-100 -80,-140 0,-150 Z',
  'M -10,-140 C 75,-165 170,-70 155,25 C 140,110 60,165 -20,155 C -100,145 -170,75 -160,-25 C -150,-115 -85,-120 -10,-140 Z',
  'M 15,-145 C 90,-155 165,-65 150,30 C 135,115 65,160 -15,165 C -95,170 -160,85 -155,-15 C -150,-110 -70,-135 15,-145 Z',
]

export default function MorphBlob() {
  const blobX = useSpring(0, { stiffness: 18, damping: 12 })
  const blobY = useSpring(0, { stiffness: 18, damping: 12 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      blobX.set((e.clientX / window.innerWidth - 0.5) * 40)
      blobY.set((e.clientY / window.innerHeight - 0.5) * 30)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [blobX, blobY])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ x: blobX, y: blobY }}
    >
      <svg
        viewBox="-200 -200 400 400"
        className="w-[min(70vw,600px)] h-[min(70vw,600px)] opacity-60"
        aria-hidden
      >
        <defs>
          <linearGradient id="blob-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8DDD0" />
            <stop offset="45%" stopColor="#C4714A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7A8C6E" stopOpacity="0.25" />
          </linearGradient>
          <filter id="blob-blur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <motion.path
          d={paths[0]}
          fill="url(#blob-grad)"
          filter="url(#blob-blur)"
          animate={{ d: paths }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      </svg>
    </motion.div>
  )
}
