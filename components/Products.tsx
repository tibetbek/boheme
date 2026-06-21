'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '@/lib/products'

const ease = [0.25, 0.1, 0.25, 1] as const

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0]
  index: number
}) {
  return (
    <motion.div
      data-cursor="product"
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
      className="group relative flex-shrink-0 w-[260px] md:w-[360px] cursor-pointer outline-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.8, ease }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-linen mb-5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="360px"
        />
        <div className="pointer-events-none absolute inset-0 bg-earth/0 group-hover:bg-earth/10 transition-colors duration-500" />
        <div className="pointer-events-none absolute top-4 left-4">
          <span className="font-dm text-[9px] tracking-[0.25em] uppercase text-white/70 bg-earth/30 backdrop-blur-sm px-2 py-1">
            {product.category}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-playfair text-xl font-medium text-earth leading-tight group-hover:text-terracotta transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-dm text-[11px] text-earth/50 mt-2 leading-relaxed max-w-[220px]">
            {product.description}
          </p>
        </div>
        <p className="font-playfair text-lg text-earth/60 whitespace-nowrap">{product.price}</p>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Skip GSAP horizontal scroll on mobile — use native touch scroll instead
    if (window.innerWidth < 768) return

    gsap.registerPlugin(ScrollTrigger)

    const getTravel = () =>
      Math.max(0, track.scrollWidth - window.innerWidth + 80)

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getTravel(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getTravel()}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-cream overflow-hidden">
      {/* Section header */}
      <div className="absolute top-8 md:top-12 left-6 md:left-16 z-10 pointer-events-none">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="block font-dm text-[9px] tracking-[0.45em] uppercase text-terracotta/70 mb-3"
        >
          The Collection
        </motion.span>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="font-playfair text-3xl md:text-5xl font-bold text-earth leading-none"
          >
            Ritual Objects
          </motion.h2>
        </div>
      </div>

      {/* Mobile: native horizontal scroll */}
      <div className="md:hidden pt-28 pb-12">
        <div
          className="flex gap-5 pl-6 pr-6 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' as never }}
        >
          {products.map((product, i) => (
            <div key={product.id} className="snap-start">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center font-dm text-[9px] tracking-[0.3em] uppercase text-earth/25">
          Swipe to explore
        </p>
      </div>

      {/* Desktop: GSAP pinned horizontal scroll */}
      <div className="hidden md:flex h-screen items-center">
        <div
          ref={trackRef}
          className="flex gap-8 pl-16 pr-16 will-change-transform"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* Desktop scroll hint */}
      <div className="hidden md:flex absolute bottom-8 right-16 items-center gap-3 pointer-events-none">
        <span className="font-dm text-[9px] tracking-[0.3em] uppercase text-earth/30">
          Scroll to explore
        </span>
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-px bg-earth/30"
        />
      </div>
    </section>
  )
}
