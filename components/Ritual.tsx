'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.25, 0.1, 0.25, 1] as const

const steps = [
  {
    n: '01',
    title: 'Cleanse',
    body: 'Begin with warm water and our Stone & Clay Mask. Let the minerals work for three minutes while you breathe.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1">
        <circle cx="20" cy="20" r="16" />
        <path d="M20 10 Q 28 20 20 30 Q 12 20 20 10Z" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Nourish',
    body: 'While skin is still damp, press three drops of Morning Ritual Oil between palms and apply upward, slowly.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1">
        <path d="M20 6 C20 6 8 18 8 26 a12 12 0 0 0 24 0 C32 18 20 6 20 6Z" />
        <path d="M20 30 C18 28 16 25 16 23" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Ground',
    body: 'Close with a cup of Ceremonial Cacao. Hold the warmth. Notice the pause. This is the ritual.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1">
        <path d="M10 14 h20 l-3 16 H13 Z" />
        <path d="M30 18 C36 18 36 26 30 26" />
        <path d="M15 14 C15 10 18 8 20 8 C22 8 25 10 25 14" />
      </svg>
    ),
  },
]

export default function Ritual() {
  return (
    <section className="py-24 md:py-36 bg-linen">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="mb-16 md:mb-20"
        >
          <span className="block font-dm text-[9px] tracking-[0.45em] uppercase text-terracotta/70 mb-4">
            Step by Step
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="font-playfair text-[clamp(2.5rem,6vw,7rem)] font-bold leading-none text-earth"
            >
              The Morning Ritual
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                className="flex gap-8 items-start"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.15, duration: 0.9, ease }}
              >
                <div className="text-earth/30 flex-shrink-0 mt-1">{step.icon}</div>
                <div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-dm text-[9px] tracking-[0.3em] uppercase text-terracotta/60">{step.n}</span>
                    <h3 className="font-playfair text-2xl font-semibold text-earth">{step.title}</h3>
                  </div>
                  <p className="font-dm text-sm leading-loose text-earth/55 max-w-sm">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Atmospheric image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&fit=crop"
              alt="Morning ritual atmosphere"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-earth/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
