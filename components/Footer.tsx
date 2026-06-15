'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1] as const

const links = [
  { label: 'Collection', href: '#' },
  { label: 'Ritual', href: '#' },
  { label: 'Philosophy', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setJoined(true)
  }

  return (
    <footer className="bg-earth text-cream pt-20 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 pb-16 border-b border-cream/10">
          {/* Brand */}
          <div>
            <p className="font-playfair text-4xl md:text-5xl font-black tracking-wide mb-4">BOHÈME</p>
            <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-cream/35 mb-8">
              Live slowly. Live well.
            </p>
            <p className="font-dm text-sm leading-loose text-cream/40 max-w-xs">
              Premium wellness rituals rooted in nature, crafted for the intentional life.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-dm text-[9px] tracking-[0.4em] uppercase text-cream/30 mb-6">Navigate</p>
            <nav className="flex flex-col gap-3">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  data-cursor="hover"
                  className="font-dm text-sm text-cream/50 hover:text-cream transition-colors duration-300 w-fit"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-dm text-[9px] tracking-[0.4em] uppercase text-cream/30 mb-6">
              Join the Ritual
            </p>
            {joined ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-playfair italic text-lg text-cream/70"
              >
                Welcome. Slowly.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="font-dm text-sm text-cream/35 leading-relaxed">
                  Monthly rituals, field notes, and early access. Nothing more.
                </p>
                <div className="flex border-b border-cream/20 focus-within:border-cream/50 transition-colors duration-300">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent font-dm text-sm text-cream placeholder:text-cream/20 py-2 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    data-cursor="hover"
                    className="font-dm text-[9px] tracking-[0.3em] uppercase text-terracotta hover:text-cream transition-colors duration-300 pb-2 pl-4"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-dm text-[9px] tracking-[0.2em] uppercase text-cream/20">
            © 2025 Bohème. All rights reserved.
          </p>
          <p className="font-dm text-[9px] tracking-[0.2em] uppercase text-cream/20">
            Privacy · Terms · Barcelona, Spain
          </p>
        </div>
      </div>
    </footer>
  )
}
