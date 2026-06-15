'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import MorphBlob from './MorphBlob'

const WebGLBackground = dynamic(() => import('./WebGLBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-sand" />,
})

const ease = [0.25, 0.1, 0.25, 1] as const
const letters = 'BOHÈME'.split('')
const taglineWords = 'Live slowly. Live well.'.split(' ')

function WordMask({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.9, ease }}
      >
        {word}&nbsp;
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-sand">
      {/* WebGL organic background */}
      <WebGLBackground />

      {/* Morphing blob — behind text */}
      <MorphBlob />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Pre-title */}
        <motion.span
          className="font-dm text-[10px] tracking-[0.5em] uppercase text-earth/50 mb-10 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Premium Wellness
        </motion.span>

        {/* BOHÈME — letter stagger */}
        <h1
          className="font-playfair font-black leading-none text-earth select-none"
          style={{ fontSize: 'clamp(4.5rem, 14vw, 16rem)' }}
        >
          {letters.map((l, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block' }}
              initial={prefersReduced ? false : { opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.08,
                duration: 1,
                ease,
              }}
            >
              {l}
            </motion.span>
          ))}
        </h1>

        {/* Tagline — word mask reveal */}
        <div className="mt-6 flex flex-wrap justify-center font-dm text-[10px] md:text-xs tracking-[0.45em] uppercase text-earth/50">
          {taglineWords.map((word, i) => (
            <WordMask key={i} word={word} delay={1.2 + i * 0.1} />
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease }}
        >
          <button
            data-cursor="hover"
            className="font-dm text-[11px] tracking-[0.3em] uppercase bg-earth text-cream px-8 py-3.5 hover:bg-terracotta transition-colors duration-500"
          >
            Explore Ritual
          </button>
          <button
            data-cursor="hover"
            className="font-dm text-[11px] tracking-[0.3em] uppercase border border-earth/40 text-earth px-8 py-3.5 hover:border-earth transition-colors duration-500"
          >
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span className="font-dm text-[8px] tracking-[0.45em] uppercase text-earth/30">Scroll</span>
        <div className="w-px h-12 overflow-hidden relative bg-earth/10">
          <motion.div
            className="absolute top-0 left-0 w-full bg-terracotta"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
