'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { products } from '@/lib/products'

const ease = [0.25, 0.1, 0.25, 1] as const

const questions = [
  {
    key: 'skinType',
    question: 'What is your skin like?',
    options: ['Dry & Sensitive', 'Combination', 'Oily', 'Normal & Balanced'],
  },
  {
    key: 'concern',
    question: 'Your primary concern?',
    options: ['Radiance & Glow', 'Deep Hydration', 'Calm & Balance', 'Slow Mornings'],
  },
  {
    key: 'time',
    question: 'When do you prefer to ritualise?',
    options: ['Morning, before the world', 'Evening, to wind down', 'Both — fully committed'],
  },
]

type Answers = Record<string, string>

function getRecommendation(answers: Answers): number[] {
  const { skinType, concern, time } = answers
  const ids: number[] = []

  if (skinType === 'Dry & Sensitive' || concern === 'Deep Hydration') ids.push(1, 4)
  if (skinType === 'Oily' || concern === 'Calm & Balance') ids.push(2, 3)
  if (concern === 'Radiance & Glow') ids.push(1, 3)
  if (time === 'Morning, before the world' || concern === 'Slow Mornings') ids.push(5)
  if (time === 'Evening, to wind down') ids.push(6, 4)
  if (time === 'Both — fully committed') ids.push(1, 3, 6)

  // De-dup, limit to 3, fallback
  const seen = new Set<number>()
  const unique = ids.filter((id) => (seen.has(id) ? false : seen.add(id))).slice(0, 3)
  return unique.length >= 2 ? unique : [1, 3, 5]
}

function RitualName(answers: Answers): string {
  const { skinType, time } = answers
  if (time === 'Evening, to wind down') return 'The Evening Unwind'
  if (skinType === 'Dry & Sensitive') return 'The Nourishing Ritual'
  if (skinType === 'Oily') return 'The Clarifying Ritual'
  return 'The Morning Bohème Ritual'
}

export default function RitualQuiz() {
  const [step, setStep] = useState<number>(-1) // -1 = intro
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)

  const current = questions[step]

  function choose(val: string) {
    const next = { ...answers, [current.key]: val }
    setAnswers(next)
    if (step < questions.length - 1) {
      setStep((s) => s + 1)
    } else {
      setDone(true)
    }
  }

  function reset() {
    setStep(-1)
    setAnswers({})
    setDone(false)
  }

  const recommendedIds = done ? getRecommendation(answers) : []
  const recommended = products.filter((p) => recommendedIds.includes(p.id))
  const ritualName = done ? RitualName(answers) : ''

  return (
    <section className="py-24 md:py-32 bg-sand">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="text-center mb-14"
        >
          <span className="block font-dm text-[9px] tracking-[0.45em] uppercase text-terracotta/60 mb-4">
            Find Your Ritual
          </span>
          <h2 className="font-playfair text-[clamp(2rem,5vw,5rem)] font-bold leading-none text-earth">
            The Ritual Builder
          </h2>
          <p className="mt-4 font-dm text-sm leading-loose text-earth/45 max-w-md mx-auto">
            Three questions. A ritual made for you.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Intro */}
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease }}
              className="text-center"
            >
              <div className="w-px h-16 bg-earth/15 mx-auto mb-8" />
              <button
                onClick={() => setStep(0)}
                className="font-dm text-[11px] tracking-[0.35em] uppercase bg-earth text-cream px-10 py-4 hover:bg-terracotta transition-colors duration-500 cursor-pointer"
              >
                Begin
              </button>
            </motion.div>
          )}

          {/* Question */}
          {!done && step >= 0 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease }}
            >
              {/* Progress */}
              <div className="flex gap-2 justify-center mb-10">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-px transition-all duration-500 ${i <= step ? 'w-12 bg-terracotta' : 'w-6 bg-earth/20'}`}
                  />
                ))}
              </div>

              <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-earth/35 text-center mb-2">
                {step + 1} / {questions.length}
              </p>
              <h3 className="font-playfair text-2xl md:text-4xl font-semibold text-earth text-center mb-10">
                {current.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => choose(opt)}
                    className="w-full py-5 px-6 border border-earth/15 text-left font-dm text-sm text-earth/70 hover:border-earth hover:text-earth hover:bg-earth/4 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="flex items-center justify-between">
                      {opt}
                      <span className="w-4 h-px bg-earth/20 group-hover:bg-earth/60 group-hover:w-6 transition-all duration-300" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {done && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="text-center"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease }}
                className="w-16 h-px bg-terracotta mx-auto mb-8 origin-left"
              />
              <span className="font-dm text-[9px] tracking-[0.35em] uppercase text-terracotta/60 block mb-3">
                Your ritual
              </span>
              <h3 className="font-playfair text-3xl md:text-5xl font-bold text-earth mb-3">
                {ritualName}
              </h3>
              <p className="font-dm text-sm text-earth/40 mb-12">
                Curated from your answers — three pieces to begin.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-left">
                {recommended.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease }}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-linen mb-4">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <h4 className="font-playfair text-lg font-medium text-earth">{p.name}</h4>
                    <p className="font-dm text-[10px] text-earth/40 mt-1">{p.price}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  className="font-dm text-[11px] tracking-[0.3em] uppercase bg-earth text-cream px-8 py-3.5 hover:bg-terracotta transition-colors duration-500 cursor-pointer"
                >
                  Shop this ritual
                </button>
                <button
                  onClick={reset}
                  className="font-dm text-[11px] tracking-[0.25em] uppercase border border-earth/30 text-earth/60 px-8 py-3.5 hover:border-earth hover:text-earth transition-all duration-300 cursor-pointer"
                >
                  Start over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
