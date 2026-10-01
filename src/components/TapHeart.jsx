import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Heart from './Heart'
import { PillButton, Section, SectionHeading } from './ui'
import { fadeUp } from './motion'

const BURST = 16
const burstColors = ['text-rose', 'text-blush-deep', 'text-gold', 'text-rose-dark']

function Burst({ id }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: BURST }, (_, i) => {
        const angle = (i / BURST) * Math.PI * 2 + (id % 2 ? 0.2 : 0)
        const dist = 110 + (i % 3) * 40
        return (
          <motion.span
            key={`${id}-${i}`}
            className={`absolute ${burstColors[i % burstColors.length]}`}
            initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist - 20,
              scale: [0.2, 1, 0.6],
              opacity: [1, 1, 0],
              rotate: (i % 2 ? 1 : -1) * 30,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.span>
        )
      })}
    </div>
  )
}

export default function TapHeart() {
  const [bursts, setBursts] = useState([])
  const [revealed, setRevealed] = useState(false)

  const tap = () => {
    const id = Date.now()
    setBursts((b) => [...b.slice(-2), id])
    setRevealed(true)
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1400)
  }

  return (
    <Section className="text-center">
      <SectionHeading>Okay… one last thing.</SectionHeading>

      <motion.div variants={fadeUp} className="relative mx-auto mt-10 flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
        <div className="absolute inset-8 rounded-full bg-rose/25 blur-3xl" aria-hidden="true" />
        <motion.button
          type="button"
          onClick={tap}
          aria-label="Tap the heart"
          className="relative cursor-pointer rounded-full outline-none focus-visible:ring-4 focus-visible:ring-rose/40"
          animate={{ scale: [1, 1.08, 1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.4 }}
          whileTap={{ scale: 0.85 }}
        >
          <Heart className="glow-rose h-32 w-32 text-rose sm:h-40 sm:w-40" />
          <span className="absolute inset-0 flex items-center justify-center pb-2 font-hand text-2xl font-bold text-cream">
            you
          </span>
        </motion.button>
        {bursts.map((id) => (
          <Burst key={id} id={id} />
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-4">
        <PillButton onClick={tap} className="bg-rose text-white shadow-rose/30 ring-rose/40 hover:bg-rose-dark">
          Tap me ❤️
        </PillButton>
      </motion.div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 max-w-md rounded-3xl border border-gold/40 bg-white/80 px-6 py-7 shadow-[0_20px_50px_-20px_rgba(110,31,46,0.4)] backdrop-blur"
          >
            <p className="font-display text-xl font-semibold text-burgundy sm:text-2xl">Jaanu, I’m really sorry.</p>
            <p className="mt-2 text-lg text-ink/85">You mean way too much to me. ❤️</p>
            <p className="mt-4 font-hand text-2xl leading-snug text-rose-dark sm:text-3xl">
              Now please come here so I can annoy you again.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
