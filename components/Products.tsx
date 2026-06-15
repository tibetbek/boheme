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
  const handleClick = () => {
    console.log(`Product clicked: ${product.name} — €${product.price}`)
    // TODO: open product detail modal
  }

  return (
    <motion.div
      data-cursor="product"
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="group relative flex-shrink-0 w-[300px] md:w-[360px] cursor-none outline-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.8, ease }}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-linen mb-5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="360px"
        />
        {/* pointer-events-none so the overlay never swallows clicks */}
        <div className="pointer-events-none absolute inset-0 bg-earth/0 group-hover:bg-earth/10 transition-colors duration-500" />
        <div className="pointer-events-none absolute top-4 left-4">
          <span className="font-dm text-[9px] tracking-[0.25em] uppercase text-white/70 bg-earth/30 backdrop-blur-sm px-2 py-1">
            {product.category}
          </span>
        </div>
      </div>

      {/* Text info */}
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

    gsap.registerPlugin(ScrollTrigger)

    // Amount the track must travel so the last card reaches the viewport edge
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
      {/* Section header — sits above the scrolling track */}
      <div className="absolute top-12 left-6 md:left-16 z-10 pointer-events-none">
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

      {/* Full-viewport height container — GSAP pins this */}
      <div className="h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 pl-6 md:pl-16 pr-16 will-change-transform"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3 pointer-events-none">
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
