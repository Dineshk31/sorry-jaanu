import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Heart from './Heart'
import { Section, SectionHeading } from './ui'
import { fadeUp, stagger } from './motion'

const lines = [
  'I know I messed up, Jaanu.',
  'I didn’t mean to hurt you.',
  'And yes… I am officially admitting that I was being a little stupid. 🥲',
  'You’re too precious to me to stay upset with.',
]

function SorryCard() {
  const [flipped, setFlipped] = useState(false)
  const face = {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
    transition: { duration: 0.3 },
  }

  return (
    <motion.div variants={fadeUp} className="flex justify-center">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? 'Flip the card back' : 'Flip the sorry card'}
          animate={{ rotate: flipped ? 2 : -3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ perspective: 800 }}
          className="relative block h-64 w-52 cursor-pointer rounded-3xl border border-gold/40 bg-gradient-to-br from-white to-blush p-5 shadow-[0_20px_50px_-15px_rgba(110,31,46,0.35)] outline-none focus-visible:ring-4 focus-visible:ring-rose/40 sm:h-72 sm:w-60"
        >
          <span className="absolute inset-2.5 rounded-[1.1rem] border border-dashed border-rose/30" />
          <AnimatePresence mode="wait" initial={false}>
            {!flipped ? (
              <motion.span key="front" {...face} className="relative flex h-full flex-col items-center justify-center">
                <motion.span
                  className="block"
                  animate={{ scale: [1, 1.12, 1, 1.08, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6 }}
                >
                  <Heart className="glow-rose h-20 w-20 text-rose sm:h-24 sm:w-24" />
                </motion.span>
                <span className="mt-4 font-hand text-4xl font-bold text-burgundy">sorry</span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">tap me</span>
              </motion.span>
            ) : (
              <motion.span
                key="back"
                {...face}
                className="relative flex h-full flex-col items-center justify-center gap-1 text-center font-hand text-2xl text-burgundy"
              >
                <span>sorry sorry sorry</span>
                <span className="text-rose">sorry sorry</span>
                <span>sorry ×1000</span>
                <span className="mt-3 text-lg text-ink/70">(I mean every one)</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function Apology() {
  return (
    <Section id="apology" className="scroll-mt-4">
      <div className="grid items-center gap-14 md:grid-cols-[1.2fr_1fr]">
        <div className="text-center md:text-left">
          <SectionHeading>Okay okay… I’m sorry 😭</SectionHeading>
          <motion.div variants={stagger(0.14, 0.1)} className="mt-7 space-y-3 text-lg leading-relaxed sm:text-xl">
            {lines.map((line) => (
              <motion.p key={line} variants={fadeUp}>
                {line}
              </motion.p>
            ))}
            <motion.p variants={fadeUp} className="pt-2 text-ink/80">
              So here I am…
            </motion.p>
            <motion.p variants={fadeUp} className="text-3xl">
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0, -3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
              >
                🥺 👉 👈
              </motion.span>
            </motion.p>
            <motion.p variants={fadeUp} className="font-display text-2xl italic text-rose-dark">
              saying sorry properly.
            </motion.p>
          </motion.div>
        </div>
        <SorryCard />
      </div>
    </Section>
  )
}
