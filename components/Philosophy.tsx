'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.25, 0.1, 0.25, 1] as const

const paragraphs = [
  'Bohème was born from a single conviction: that beauty and wellness are not products to be purchased, but practices to be cultivated. In a world that moves faster than the seasons, we chose to slow down.',
  'Every formula begins in the field. We work with small-batch growers across Provence, the Atlas Mountains, and the Basque coast — selecting botanicals at their peak potency, harvested by hand.',
  'Nothing enters a Bohème formula unless it has a reason to be there. No fillers. No fragrance. No compromise. Just the earth, rendered thoughtfully.',
]

function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.p
        className="font-dm text-sm leading-loose text-earth/65"
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay, duration: 0.9, ease }}
      >
        {text}
      </motion.p>
    </div>
  )
}

export default function Philosophy() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Pull quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
        className="font-playfair italic text-[clamp(1.6rem,4vw,4rem)] font-normal leading-[1.3] text-earth mb-20 md:mb-28 max-w-4xl"
      >
        &ldquo;We believe wellness is not a destination. It is a practice, a rhythm, a return to yourself.&rdquo;
      </motion.blockquote>

      {/* Two column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left — image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease }}
          className="relative aspect-[3/4] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80&fit=crop"
            alt="Bohème philosophy"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-earth/20" />
        </motion.div>

        {/* Right — text */}
        <div className="flex flex-col justify-center gap-7 pt-0 md:pt-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-dm text-[9px] tracking-[0.45em] uppercase text-terracotta/70"
          >
            Our Philosophy
          </motion.span>

          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <RevealText key={i} text={p} delay={i * 0.12} />
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="mt-4 h-px bg-terracotta/30 origin-left"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="flex items-center gap-10"
          >
            {[['2019', 'Founded'], ['32', 'Botanicals'], ['100%', 'Natural']].map(([n, l]) => (
              <div key={l}>
                <p className="font-playfair text-3xl font-bold text-earth">{n}</p>
                <p className="font-dm text-[9px] tracking-[0.25em] uppercase text-earth/40 mt-1">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
