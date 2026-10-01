import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts'
import Heart from './Heart'
import { PillButton } from './ui'
import { fadeUp, stagger } from './motion'

const finaleHeartColors = ['text-rose/40', 'text-gold/35', 'text-blush/25']
const ease = [0.22, 1, 0.36, 1]

export default function Finale() {
  const [step, setStep] = useState(0)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-burgundy to-burgundy-deep text-cream">
      <FloatingHearts count={9} seed={11} colors={finaleHeartColors} />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/25 blur-3xl"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger(0.15)}
        className="relative mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center px-5 py-24 text-center"
      >
        <motion.div variants={fadeUp}>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="h-16 w-16 text-rose drop-shadow-[0_0_24px_rgba(217,103,123,0.8)] sm:h-20 sm:w-20" />
          </motion.div>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-8 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
        >
          So… are we okay, <span className="italic text-gold-soft">Jaanu</span>? 🥺❤️
        </motion.h2>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="ask"
              variants={fadeUp}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
              className="mt-10"
            >
              <PillButton
                onClick={() => setStep(1)}
                className="bg-cream text-burgundy shadow-black/20 ring-gold/50 hover:bg-white"
              >
                One Last Chance 👉👈
              </PillButton>
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mt-10"
            >
              <p className="font-display text-2xl sm:text-3xl">I promise to be less stupid.</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-2 font-hand text-xl text-gold-soft/90 sm:text-2xl"
              >
                (terms and conditions may apply 😭)
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.9, ease }}
                className="mx-auto mt-12 max-w-sm border-t border-gold/30 pt-8"
              >
                <p className="font-display text-xl italic sm:text-2xl">Sorry, Jaanu.</p>
                <p className="mt-2 text-lg text-cream/90">Come back and be cute with me again. ❤️</p>
              </motion.div>

              <motion.button
                type="button"
                onClick={() =>
                  document.getElementById('date')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 6, 0] }}
                transition={{
                  opacity: { delay: 2.8, duration: 0.8 },
                  y: { delay: 2.8, duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="mt-12 cursor-pointer font-hand text-2xl text-gold-soft outline-none focus-visible:underline"
              >
                wait… one more question 👇
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
