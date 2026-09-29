import { motion } from 'motion/react'
import { specimens } from '../data/content'

const cardBg = (i) => (i % 2 === 0 ? 'bg-paper' : 'bg-stone')
const COLUMNS = 2

// "Physical stagger" — delay each card by its distance from the grid's
// top-left corner (in the spirit of motion.dev's staggered-grid example,
// which staggers by physical distance rather than plain index order), so
// the reveal sweeps diagonally across the grid instead of ticking down
// row by row.
function physicalDelay(i, columns = COLUMNS, unit = 0.22) {
  const col = i % columns
  const row = Math.floor(i / columns)
  return Math.sqrt(col * col + row * row) * unit
}

export default function Specimens() {
  return (
    <section id="specimens" className="relative border-t border-ink/10">
      <div className="bg-olive-dark px-6 py-14 md:px-12">
        <span className="font-mono text-[12px] uppercase tracking-widest2 text-rose">{specimens.eyebrow}</span>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl text-cream md:text-5xl">{specimens.title}</h2>
          <span className="font-mono text-[12px] uppercase tracking-widest2 text-cream/50">{specimens.archiveLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {specimens.items.map((item, i) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: false, margin: '-10% 0px' }}
            transition={{ duration: 0.7, delay: physicalDelay(i), ease: [0.16, 1, 0.3, 1] }}
            className={`${cardBg(i)} border-b border-ink/10 p-8 transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(43,33,25,0.35)] md:border-r md:p-12 md:[&:nth-child(2n)]:border-r-0`}
          >
            <span className="font-mono text-[12px] uppercase tracking-widest2 text-clay">
              {item.index} / {item.category}
            </span>
            <h3 className="mt-4 font-display text-3xl text-ink md:text-4xl">{item.name}</h3>

            <dl className="mt-8 space-y-5">
              <div className="grid grid-cols-[90px_1fr] gap-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40">Problem</dt>
                <dd className="text-[15px] leading-relaxed text-ink/75">{item.problem}</dd>
              </div>
              <div className="grid grid-cols-[90px_1fr] gap-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40">Solution</dt>
                <dd className="text-[15px] leading-relaxed text-ink/75">{item.solution}</dd>
              </div>
              <div className="grid grid-cols-[90px_1fr] gap-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40">Scale</dt>
                <dd className="text-[15px] leading-relaxed text-ink/75">{item.scale}</dd>
              </div>
            </dl>

            <div className="mt-8 border border-clay/40 px-5 py-4">
              <p className="font-display italic text-ink/85">Result: {item.result}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
