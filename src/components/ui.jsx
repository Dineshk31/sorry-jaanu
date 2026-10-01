import { motion } from 'framer-motion'
import { fadeUp, stagger } from './motion'

export function SectionHeading({ children, className = '' }) {
  return (
    <motion.h2
      variants={fadeUp}
      className={`font-display text-3xl font-semibold leading-tight tracking-tight text-burgundy sm:text-4xl md:text-5xl ${className}`}
    >
      {children}
    </motion.h2>
  )
}

export function Section({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger(0.12)}
      className={`relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function PillButton({ children, className = '', ...props }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-bold shadow-lg outline-none focus-visible:ring-4 sm:text-lg ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
