import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts'
import Heart from './Heart'
import { fadeUp, stagger } from './motion'

const noLines = [
  'No',
  'are you sure?',
  'Jaanu pls 🥺',
  'wrong button',
  'nice try 😭',
  'nope, not allowed',
  'just press yes',
  'I’ll cry 🥲',
]

const YES_POS = { x: 30, y: 50 }
const MAX_YES_GROWTH = 0.4

// Pick a new spot (as % of the arena) for the No button's centre that keeps it
// fully inside the arena, clear of the Yes button, and away from where it was.
function nextSpot(current, arenaEl, yesEl) {
  const arena = arenaEl.getBoundingClientRect()
  const yes = yesEl.getBoundingClientRect()
  const W = arena.width
  const H = arena.height
  // Leave room for the longest label and for Yes growing a bit more
  const halfW = Math.min(100, W / 2 - 4)
  const halfH = 26
  const pad = 22
  const yesBox = {
    left: yes.left - arena.left - pad,
    right: yes.right - arena.left + pad,
    top: yes.top - arena.top - pad,
    bottom: yes.bottom - arena.top + pad,
  }
  const cur = { x: (current.x / 100) * W, y: (current.y / 100) * H }

  let best = null
  for (let i = 0; i < 60; i++) {
    const x = halfW + Math.random() * (W - halfW * 2)
    const y = halfH + Math.random() * (H - halfH * 2)
    const hitsYes =
      x + halfW > yesBox.left && x - halfW < yesBox.right && y + halfH > yesBox.top && y - halfH < yesBox.bottom
    if (hitsYes) continue
    const moved = Math.hypot(x - cur.x, y - cur.y)
    if (moved > 70) return { x: (x / W) * 100, y: (y / H) * 100 }
    if (!best || moved > best.moved) best = { x, y, moved }
  }
  if (best) return { x: (best.x / W) * 100, y: (best.y / H) * 100 }
  return { x: current.x, y: current.y > 50 ? 12 : 88 }
}

// Generated once at load so render stays pure
const showerHearts = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 12 + Math.random() * 22,
  delay: Math.random() * 1.2,
  duration: 2.6 + Math.random() * 1.8,
  drift: (Math.random() - 0.5) * 120,
  spin: (Math.random() - 0.5) * 120,
  color: ['text-rose', 'text-blush-deep', 'text-gold', 'text-rose-dark'][i % 4],
}))

function HeartShower() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {showerHearts.map((h) => (
        <motion.span
          key={h.id}
          className={`absolute -top-10 ${h.color}`}
          style={{ left: `${h.left}%` }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: '110vh', x: h.drift, rotate: h.spin, opacity: [0, 1, 1, 0] }}
          transition={{ duration: h.duration, delay: h.delay, ease: 'easeIn' }}
        >
          <Heart style={{ width: h.size, height: h.size }} />
        </motion.span>
      ))}
    </div>
  )
}

function Celebration() {
  return (
    <motion.div
      key="yes"
      initial="hidden"
      animate="show"
      variants={stagger(0.25)}
      className="flex flex-col items-center"
    >
      <motion.div
        variants={{ hidden: { scale: 0, rotate: -20 }, show: { scale: 1, rotate: 0 } }}
        transition={{ type: 'spring', stiffness: 160, damping: 11 }}
        className="relative flex h-40 w-40 items-center justify-center"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-rose/40"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2.4, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.1, 1, 1.06, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3 }}
        >
          <Heart className="glow-rose h-28 w-28 text-rose" />
        </motion.div>
      </motion.div>

      <motion.h3
        variants={fadeUp}
        className="mt-8 font-display text-4xl font-semibold tracking-tight text-burgundy sm:text-5xl"
      >
        YAYYY 🥹❤️
      </motion.h3>
      <motion.p variants={fadeUp} className="mt-2 font-hand text-3xl text-rose-dark sm:text-4xl">
        It’s a date, Jaanu!
      </motion.p>

      {/* Little date ticket */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40, rotate: -6 },
          show: { opacity: 1, y: 0, rotate: -2, transition: { type: 'spring', stiffness: 110, damping: 13 } },
        }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        className="relative mt-10 w-full max-w-sm overflow-hidden rounded-3xl border border-gold/50 bg-white text-left shadow-[0_25px_60px_-20px_rgba(110,31,46,0.45)]"
      >
        <div className="flex items-center justify-between bg-burgundy px-6 py-3 text-cream">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-soft">Admit two</span>
          <span className="font-hand text-xl">No. 001 ❤️</span>
        </div>
        <dl className="space-y-3 px-6 py-5 text-sm sm:text-base">
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Who</dt>
            <dd className="font-display text-lg font-semibold text-burgundy">Jaanu &amp; her (sorry) boyfriend</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">When</dt>
            <dd>Whenever you say. I’m always free for you.</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Plan</dt>
            <dd>Good food, a long walk, holding hands, and me being annoying.</dd>
          </div>
        </dl>
        <div className="relative border-t-2 border-dashed border-blush-deep px-6 py-3 text-center font-hand text-lg text-rose-dark">
          <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-blush" aria-hidden="true" />
          <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-blush" aria-hidden="true" />
          valid forever · non-transferable
        </div>
      </motion.div>

      <motion.p variants={fadeUp} className="mt-8 text-ink/70">
        (no take-backs. I have screenshots 😌)
      </motion.p>
    </motion.div>
  )
}

export default function DateAsk() {
  const [said, setSaid] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const [tries, setTries] = useState(0)
  const [noPos, setNoPos] = useState({ x: 72, y: 50 })
  const arenaRef = useRef(null)
  const yesRef = useRef(null)

  const flee = () => {
    setNoPos((p) => nextSpot(p, arenaRef.current, yesRef.current))
    setTries((t) => t + 1)
  }

  const sayYes = () => {
    setSaid(true)
    setShowHearts(true)
  }

  useEffect(() => {
    if (!showHearts) return
    const t = setTimeout(() => setShowHearts(false), 5000)
    return () => clearTimeout(t)
  }, [showHearts])

  return (
    <section
      id="date"
      className="relative overflow-hidden bg-gradient-to-b from-blush via-[#fcebe6] to-cream"
    >
      <FloatingHearts count={8} seed={21} />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
        <AnimatePresence mode="wait">
          {!said ? (
            <motion.div
              key="ask"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger(0.15)}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.35 } }}
              className="w-full"
            >
              <motion.p variants={fadeUp} className="font-hand text-2xl text-rose-dark sm:text-3xl">
                okay, real question…
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-burgundy sm:text-6xl"
              >
                Will you go on a date with me? 🥺
              </motion.h2>

              {/* Button arena: the No button runs around inside it */}
              <motion.div ref={arenaRef} variants={fadeUp} className="relative mx-auto mt-8 h-72 w-full max-w-md">
                <motion.button
                  type="button"
                  ref={yesRef}
                  onClick={sayYes}
                  animate={{ scale: 1 + Math.min(tries * 0.08, MAX_YES_GROWTH) }}
                  whileHover={{ scale: 1.08 + Math.min(tries * 0.08, MAX_YES_GROWTH) }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  style={{ left: `${YES_POS.x}%`, top: `${YES_POS.y}%`, x: '-50%', y: '-50%' }}
                  className="absolute z-10 cursor-pointer whitespace-nowrap rounded-full bg-rose px-9 py-3.5 text-lg font-bold text-white shadow-lg shadow-rose/40 outline-none ring-rose/40 focus-visible:ring-4"
                >
                  Yes ❤️
                </motion.button>

                <motion.button
                  type="button"
                  aria-label="No (good luck)"
                  onPointerEnter={(e) => e.pointerType === 'mouse' && flee()}
                  onPointerDown={(e) => {
                    e.preventDefault()
                    flee()
                  }}
                  onClick={flee}
                  style={{ left: `${noPos.x}%`, top: `${noPos.y}%`, x: '-50%', y: '-50%' }}
                  className="absolute cursor-pointer transition-[left,top] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none touch-none select-none whitespace-nowrap rounded-full border border-burgundy/20 bg-white/90 px-6 py-3 text-base font-semibold text-burgundy/80 shadow-md outline-none focus-visible:ring-4 focus-visible:ring-rose/30"
                >
                  {noLines[tries % noLines.length]}
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {tries >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-hand text-xl text-ink/60"
                  >
                    hmm, the no button seems to be broken 🤷
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <Celebration key="yes" />
          )}
        </AnimatePresence>
      </div>

      {showHearts && <HeartShower />}

      <p className="relative pb-6 text-center font-hand text-lg text-ink/40">
        made with love (and a little guilt)
      </p>
    </section>
  )
}
