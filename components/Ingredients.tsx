'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1] as const

interface Stat {
  from: number
  to: number
  suffix: string
  prefix: string
  label: string
}

const stats: Stat[] = [
  { from: 0, to: 100, suffix: '%', prefix: '', label: 'Natural Ingredients' },
  { from: 0, to: 12, suffix: '', prefix: '', label: 'Wild Botanicals' },
  { from: 50, to: 0, suffix: '', prefix: '', label: 'Synthetics Used' },
  { from: 2000, to: 2019, suffix: '', prefix: 'Est.', label: 'Year Founded' },
]

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(stat.from)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 2200

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(stat.from + (stat.to - stat.from) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, stat.from, stat.to])

  return (
    <span ref={ref}>
      {stat.prefix && <span className="font-dm text-base mr-2 opacity-60">{stat.prefix}</span>}
      {val}{stat.suffix}
    </span>
  )
}

export default function Ingredients() {
  return (
    <section className="bg-earth py-24 md:py-36 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="block font-dm text-[9px] tracking-[0.45em] uppercase text-terracotta/60 mb-4">
              What We Promise
            </span>
            <h2 className="font-playfair text-[clamp(2rem,5vw,6rem)] font-bold leading-none text-cream">
              The Standard
            </h2>
          </div>
          <p className="font-dm text-sm leading-loose text-cream/40 max-w-sm">
            Every number here represents a commitment — to purity, to provenance, to the people who trust us with their skin.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-cream/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="py-10 md:py-14 pr-6 border-b border-cream/10 md:border-b-0 md:border-r md:border-cream/10 last:border-r-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.9, ease }}
            >
              <p className="font-playfair text-[clamp(2.5rem,6vw,7rem)] font-black text-cream leading-none mb-3 tabular-nums">
                <Counter stat={stat} />
              </p>
              <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-cream/35">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
