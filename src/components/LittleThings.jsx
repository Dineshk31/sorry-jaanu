import { motion } from 'framer-motion'
import { Section, SectionHeading } from './ui'
import { fadeUp, stagger } from './motion'

const things = [
  { emoji: '🥹', title: 'Your smile', note: 'my favourite thing, honestly' },
  { emoji: '🎶', title: 'Your voice', note: 'even when you’re scolding me' },
  { emoji: '💬', title: 'Your random talks', note: 'the 2am ones especially' },
  { emoji: '🌸', title: 'Your cute little habits', note: 'yes, I notice all of them' },
  { emoji: '😂', title: 'Making me laugh', note: 'even on my worst days' },
  { emoji: '🫶', title: 'Just having you around', note: 'that’s it. that’s the list.' },
]

const tilts = [-2, 1.5, -1, 2, -1.5, 1]

export default function LittleThings() {
  return (
    <div className="relative bg-gradient-to-b from-cream via-blush/50 to-cream">
      <Section>
        <div className="text-center">
          <motion.p variants={fadeUp} className="font-hand text-2xl text-rose-dark">
            a tiny reminder
          </motion.p>
          <SectionHeading className="mt-1">Things I still love about you ❤️</SectionHeading>
        </div>

        <motion.ul
          variants={stagger(0.09, 0.15)}
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3"
        >
          {things.map((t, i) => (
            <motion.li
              key={t.title}
              variants={{
                hidden: { opacity: 0, y: 30, rotate: 0 },
                show: {
                  opacity: 1,
                  y: 0,
                  rotate: tilts[i],
                  transition: { type: 'spring', stiffness: 120, damping: 14 },
                },
              }}
              whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative rounded-3xl border border-white/80 bg-white/70 p-5 text-center shadow-[0_12px_30px_-14px_rgba(110,31,46,0.3)] backdrop-blur-sm transition-shadow hover:shadow-[0_18px_40px_-12px_rgba(217,103,123,0.45)] sm:p-7"
            >
              <span className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-gold-soft/80" aria-hidden="true" />
              <motion.span
                className="inline-block text-4xl sm:text-5xl"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              >
                {t.emoji}
              </motion.span>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-burgundy sm:text-xl">
                {t.title}
              </h3>
              <p className="mt-1 font-hand text-lg leading-tight text-rose-dark sm:text-xl">{t.note}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Section>
    </div>
  )
}
