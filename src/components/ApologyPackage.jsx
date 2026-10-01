import { motion } from 'framer-motion'
import { Section, SectionHeading } from './ui'
import { fadeUp, stagger } from './motion'

const items = [
  { emoji: '❤️', label: 'One genuine sorry', qty: '×1', tone: 'from-blush to-white' },
  { emoji: '🫂', label: 'Unlimited hugs', qty: '×∞', tone: 'from-gold-soft/60 to-white' },
  { emoji: '😚', label: 'One forehead kiss', qty: '×1', tone: 'from-blush-deep/70 to-white' },
  { emoji: '😭', label: 'Me trying to behave… probably', qty: '×?', tone: 'from-cream to-blush/60' },
]

const wiggle = {
  rest: { rotate: 0, y: 0 },
  hover: { rotate: [0, -3, 3, -2, 0], y: -6, transition: { duration: 0.5 } },
}

export default function ApologyPackage() {
  return (
    <Section>
      <div className="text-center">
        <SectionHeading>My official apology package 🎁</SectionHeading>
        <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-sm text-ink/70">
          Non-refundable. Hand-packed by one very guilty boyfriend.
        </motion.p>
      </div>

      <motion.ol
        variants={stagger(0.1, 0.15)}
        className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-6"
      >
        {items.map((item, i) => (
          <motion.li key={item.label} variants={fadeUp}>
            <motion.div
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              variants={wiggle}
              className={`relative flex items-center gap-4 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br ${item.tone} p-5 shadow-[0_10px_30px_-15px_rgba(110,31,46,0.35)] sm:p-6`}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-inner">
                <motion.span
                  className="inline-block"
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.25, rotate: -8 } }}
                >
                  {item.emoji}
                </motion.span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Item {i + 1}</p>
                <p className="font-display text-lg font-semibold leading-snug text-burgundy sm:text-xl">
                  {item.label}
                </p>
              </div>
              <span className="mr-5 font-hand text-3xl font-bold text-rose">{item.qty}</span>
              {/* ribbon */}
              <span
                aria-hidden="true"
                className="absolute -right-8 top-3 w-24 rotate-45 bg-burgundy/90 py-0.5 text-center text-[10px] font-bold uppercase tracking-wider text-cream"
              >
                free
              </span>
            </motion.div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  )
}
