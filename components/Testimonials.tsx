'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'The Morning Ritual Oil changed how I start every single day. My skin has never looked more alive.',
    author: 'Margot L.',
    title: 'Artist, Lyon',
  },
  {
    quote: 'I have never found a wellness brand that genuinely slows me down. Bohème does. The Ceremonial Cacao is sacred.',
    author: 'Elena K.',
    title: 'Writer, Barcelona',
  },
  {
    quote: 'Everything about this brand — the formulas, the packaging, the philosophy — feels considered. Nothing is accidental.',
    author: 'Simone A.',
    title: 'Architect, Amsterdam',
  },
  {
    quote: 'The Sleep Tonic is the only thing that has genuinely helped me find quiet at the end of a long day.',
    author: 'Naomi R.',
    title: 'Stylist, London',
  },
  {
    quote: 'Forest Bath Serum is extraordinary. My skin is calmer, more even, more itself. I recommend it to everyone.',
    author: 'Cécile M.',
    title: 'Florist, Paris',
  },
]

// Duplicate for seamless loop
const doubled = [...testimonials, ...testimonials]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 overflow-hidden bg-cream">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="block font-dm text-[9px] tracking-[0.45em] uppercase text-terracotta/60 mb-4"
        >
          From the Community
        </motion.span>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-playfair text-[clamp(2rem,5vw,6rem)] font-bold leading-none text-earth"
          >
            Voices
          </motion.h2>
        </div>
      </div>

      {/* Auto-drifting carousel — CSS animation for reliability */}
      <div className="relative">
        <div className="flex animate-drift-left w-max gap-6 px-6">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] md:w-[400px] bg-linen p-8 md:p-10"
            >
              {/* Terracotta quote mark */}
              <span className="block font-playfair text-5xl leading-none text-terracotta mb-6 select-none">&ldquo;</span>
              <p className="font-playfair italic text-lg md:text-xl leading-relaxed text-earth mb-8">
                {t.quote}
              </p>
              <div className="border-t border-earth/10 pt-5">
                <p className="font-dm text-sm font-medium text-earth">{t.author}</p>
                <p className="font-dm text-[10px] tracking-[0.2em] uppercase text-earth/40 mt-1">{t.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream to-transparent" />
      </div>
    </section>
  )
}
