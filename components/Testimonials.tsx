'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'The Morning Ritual Oil changed how I start every single day. My skin has never looked more alive.',
    author: 'Margot L.',
    title: 'Artist, Lyon',
    rating: 5,
    product: 'Morning Ritual Oil',
    initials: 'ML',
  },
  {
    quote: 'I have never found a wellness brand that genuinely slows me down. Bohème does. The Ceremonial Cacao is sacred.',
    author: 'Elena K.',
    title: 'Writer, Barcelona',
    rating: 5,
    product: 'Ceremonial Cacao',
    initials: 'EK',
  },
  {
    quote: 'Everything about this brand — the formulas, the packaging, the philosophy — feels considered. Nothing is accidental.',
    author: 'Simone A.',
    title: 'Architect, Amsterdam',
    rating: 5,
    product: 'Forest Bath Serum',
    initials: 'SA',
  },
  {
    quote: 'The Sleep Tonic is the only thing that has genuinely helped me find quiet at the end of a long day.',
    author: 'Naomi R.',
    title: 'Stylist, London',
    rating: 5,
    product: 'Sleep Tonic',
    initials: 'NR',
  },
  {
    quote: 'Forest Bath Serum is extraordinary. My skin is calmer, more even, more itself. I recommend it to everyone.',
    author: 'Cécile M.',
    title: 'Florist, Paris',
    rating: 5,
    product: 'Forest Bath Serum',
    initials: 'CM',
  },
]

// Duplicate for seamless loop
const doubled = [...testimonials, ...testimonials]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className={`w-3 h-3 ${i < n ? 'fill-terracotta' : 'fill-earth/15'}`}
        >
          <path d="M6 .5l1.39 2.82L10.5 3.8l-2.25 2.2.53 3.1L6 7.6 3.22 9.1l.53-3.1L1.5 3.8l3.11-.48z" />
        </svg>
      ))}
    </div>
  )
}

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

      {/* Auto-drifting carousel */}
      <div className="relative">
        <div className="flex animate-drift-left w-max gap-6 px-6">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[380px] bg-linen p-8 md:p-10 flex flex-col"
            >
              <Stars n={t.rating} />

              <p className="font-playfair italic text-lg md:text-xl leading-relaxed text-earth mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="border-t border-earth/10 pt-5 flex items-center gap-3">
                {/* Avatar initials */}
                <div className="w-9 h-9 rounded-full bg-earth/8 flex items-center justify-center flex-shrink-0">
                  <span className="font-dm text-[10px] font-medium text-earth/60">{t.initials}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-dm text-sm font-medium text-earth">{t.author}</p>
                  <p className="font-dm text-[10px] tracking-[0.2em] uppercase text-earth/40 mt-0.5">{t.title}</p>
                </div>
                {/* Verified badge */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-terracotta/70">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.4 5.8L7.6 10.8a.6.6 0 01-.85 0L4.6 8.7a.6.6 0 11.85-.85l1.72 1.72 3.38-4.68a.6.6 0 11.96.72z" />
                  </svg>
                  <span className="font-dm text-[9px] tracking-[0.15em] uppercase text-earth/35">Verified</span>
                </div>
              </div>

              {/* Product tag */}
              <div className="mt-3">
                <span className="font-dm text-[9px] tracking-[0.2em] uppercase text-terracotta/50 bg-terracotta/8 px-2.5 py-1">
                  {t.product}
                </span>
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
