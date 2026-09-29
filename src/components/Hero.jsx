import { motion } from 'motion/react'
import { hero } from '../data/content'
import { TraceLine } from './TraceLine'

const wordVariants = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
}

// The panel's "staggered grid" assembly — a mosaic of cream tiles laid
// over the gradient, dissolving outward from the center with a delay
// proportional to each tile's physical distance from it (the same idea
// as motion.dev's staggered-grid example), so the image reads as
// materializing into its own box rather than just fading in flat.
const MOSAIC_COLS = 8
const MOSAIC_ROWS = 6
const mosaicTiles = Array.from({ length: MOSAIC_COLS * MOSAIC_ROWS }, (_, i) => {
  const col = i % MOSAIC_COLS
  const row = Math.floor(i / MOSAIC_COLS)
  const centerX = (MOSAIC_COLS - 1) / 2
  const centerY = (MOSAIC_ROWS - 1) / 2
  const maxDist = Math.hypot(centerX, centerY)
  const dist = Math.hypot(col - centerX, row - centerY)
  return { id: i, col, row, delay: 0.55 + (dist / maxDist) * 0.65 }
})

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-20 pt-14 md:grid-cols-2 md:gap-8 md:px-12 md:pt-20">
        {/* left column */}
        <div className="relative flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="font-mono text-[12px] uppercase tracking-widest2 text-clay">{hero.eyebrow}</span>
            <TraceLine vertical={false} length={48} nodes={1} opacity={0.6} color="#C98F6E" />
          </motion.div>

          <h1 className="font-display text-[13vw] leading-[0.98] text-ink sm:text-[64px] md:text-[68px] lg:text-[76px]">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="show"
                  className={`block ${line === hero.italicWord ? '' : ''}`}
                >
                  {line.split(' ').map((word, wi) => (
                    <span key={wi} className={word.replace('.', '') === hero.italicWord ? 'italic text-olive' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 max-w-md text-balance text-lg leading-relaxed text-ink/70"
          >
            {hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={hero.primaryCta.href}
              className="border border-olive bg-olive px-8 py-4 font-mono text-[13px] uppercase tracking-widest2 text-cream transition-colors hover:bg-olive-dark"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="border border-ink/25 px-8 py-4 font-mono text-[13px] uppercase tracking-widest2 text-ink/80 transition-colors hover:border-ink hover:text-ink"
            >
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </div>

        {/* right column — ambient gradient panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[340px] overflow-hidden rounded-sm md:min-h-[560px]"
        >
          <motion.div
            className="absolute inset-[-20%]"
            style={{
              background:
                'radial-gradient(circle at 20% 20%, #1c2a52 0%, transparent 45%), radial-gradient(circle at 75% 30%, #4b3a86 0%, transparent 50%), radial-gradient(circle at 30% 80%, #b23a2e 0%, transparent 45%), radial-gradient(circle at 85% 85%, #7a3fae 0%, transparent 50%), linear-gradient(135deg, #16213e, #3a2e6e)',
            }}
            animate={{ rotate: [0, 8, -4, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="absolute bottom-6 right-6 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-olive-dark/90 text-center backdrop-blur-sm"
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-cream/30"
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-[9px] uppercase tracking-widest2 text-cream/70">{hero.focusBadge.label}</span>
            <span className="mt-1 px-3 text-[12px] font-medium leading-tight text-cream">{hero.focusBadge.value}</span>
          </motion.div>

          {/* mosaic assembly reveal — dissolves outward from center */}
          <div
            className="pointer-events-none absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${MOSAIC_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${MOSAIC_ROWS}, 1fr)`,
            }}
            aria-hidden="true"
          >
            {mosaicTiles.map((tile) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0.35 }}
                transition={{ duration: 0.55, delay: tile.delay, ease: [0.16, 1, 0.3, 1] }}
                style={{ gridColumn: tile.col + 1, gridRow: tile.row + 1 }}
                className="bg-cream"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
