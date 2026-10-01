import { motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts'
import Heart from './Heart'
import { PillButton } from './ui'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const scrollDown = () =>
    document.getElementById('apology')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <header className="relative flex min-h-svh items-center justify-center overflow-hidden bg-gradient-to-b from-blush via-[#fcebe6] to-cream px-5">
      <div className="grain absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/20 blur-3xl sm:h-[36rem] sm:w-[36rem]"
      />
      <FloatingHearts count={10} seed={3} />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-hand text-2xl text-rose-dark sm:text-3xl"
        >
          psst… this one’s for you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="mt-3 font-display text-[3.4rem] font-semibold leading-[1.05] tracking-tight text-burgundy sm:text-7xl md:text-8xl"
        >
          Sorry{' '}
          <span className="relative inline-block italic text-rose">
            Jaanu
            <svg
              viewBox="0 0 200 20"
              aria-hidden="true"
              className="absolute -bottom-2 left-0 w-full text-gold"
            >
              <motion.path
                d="M4 14 C 50 4, 120 4, 196 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.9, ease: 'easeInOut' }}
              />
            </svg>
          </span>
          <br />
          <motion.span
            className="mt-2 inline-block"
            animate={{ rotate: [0, -6, 6, -3, 0] }}
            transition={{ duration: 1.6, delay: 1.4, repeat: Infinity, repeatDelay: 3.5 }}
          >
            🥺❤️
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-ink/80 sm:text-xl"
        >
          I may have messed up…
          <br />
          <span className="font-semibold text-burgundy">so I made you this instead.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-10"
        >
          <PillButton
            onClick={scrollDown}
            className="bg-burgundy text-cream shadow-burgundy/25 ring-rose/40 hover:bg-burgundy-deep"
          >
            Forgive me? 🥹
          </PillButton>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -ml-2 text-rose/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart className="h-4 w-4" />
      </motion.div>
    </header>
  )
}
