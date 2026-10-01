import { useMemo } from 'react'
import Heart from './Heart'

// Small deterministic PRNG so the layout is stable between renders
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const DEFAULT_COLORS = ['text-rose/40', 'text-blush-deep', 'text-gold/40']

export default function FloatingHearts({ count = 9, seed = 7, colors = DEFAULT_COLORS }) {
  const hearts = useMemo(() => {
    const rand = seeded(seed)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${4 + rand() * 92}%`,
      size: 10 + rand() * 14,
      duration: 14 + rand() * 12,
      delay: -rand() * 24,
      drift: (rand() - 0.5) * 60,
      rotate: (rand() - 0.5) * 40,
      opacity: 0.35 + rand() * 0.4,
      color: colors[i % colors.length],
    }))
  }, [count, seed, colors])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className={`float-heart absolute -bottom-8 ${h.color}`}
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            '--d': `${h.duration}s`,
            '--delay': `${h.delay}s`,
            '--dx': `${h.drift}px`,
            '--r': `${h.rotate}deg`,
            '--o': h.opacity,
          }}
        />
      ))}
    </div>
  )
}
