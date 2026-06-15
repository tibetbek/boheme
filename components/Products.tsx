'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { products } from '@/lib/products'

const ease = [0.25, 0.1, 0.25, 1] as const

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.div
      data-cursor="product"
      className="group relative flex-shrink-0 w-[300px] md:w-[360px] cursor-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.8, ease }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-linen mb-5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="360px"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-earth/0 group-hover:bg-earth/10 transition-colors duration-500" />
        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className="font-dm text-[9px] tracking-[0.25em] uppercase text-white/70 bg-earth/30 backdrop-blur-sm px-2 py-1">
            {product.category}
          </span>
        </div>
      </div>

      {/* Info */}
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
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [sectionH, setSectionH] = useState('400vh')
  const [travel, setTravel] = useState(0)

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return
      const t = Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 80)
      setTravel(t)
      setSectionH(`calc(100vh + ${t}px)`)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel])

  return (
    <section
      ref={containerRef}
      style={{ height: sectionH }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section header — visible above cards */}
        <div className="absolute top-12 left-6 md:left-16 z-10">
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

        {/* Horizontal track */}
        <div className="h-full flex items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 md:gap-8 pl-6 md:pl-16 pr-16"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3">
          <span className="font-dm text-[9px] tracking-[0.3em] uppercase text-earth/30">Scroll to explore</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-px bg-earth/30"
          />
        </div>
      </div>
    </section>
  )
}
