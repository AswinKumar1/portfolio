import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { experience } from '../data/experience'
import { experienceSection } from '../data/content'

const COLLAPSED_COUNT = 3

function RoleBlock({ role }) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = role.bullets.length > COLLAPSED_COUNT
  const visible = expanded ? role.bullets : role.bullets.slice(0, COLLAPSED_COUNT)

  return (
    <div className="mt-6 first:mt-0">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-[15px] font-medium text-ink">{role.title}</h4>
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40">
          {role.period} · {role.duration}
        </span>
      </div>
      {role.note && <p className="mb-2 font-mono text-[11px] uppercase tracking-widest2 text-clay">{role.note}</p>}

      <motion.ul layout className="space-y-2">
        <AnimatePresence initial={false}>
          {visible.map((bullet) => (
            <motion.li
              key={bullet}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex gap-3 text-[14px] leading-relaxed text-ink/70"
            >
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-clay/70" />
              <span>{bullet}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-ink/40 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-olive"
        >
          {expanded ? 'Show less' : `+${role.bullets.length - COLLAPSED_COUNT} more`}
        </button>
      )}
    </div>
  )
}

function CompanyBlock({ entry, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-ink/10 py-10 first:pt-0 last:border-b-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-2xl text-ink md:text-[28px]">
          {entry.website ? (
            <a
              href={entry.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-clay"
            >
              <span>{entry.company}</span>
              <svg className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            entry.company
          )}
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40">{entry.location}</span>
      </div>

      <div className="mt-4 border-l border-ink/10 pl-6">
        {entry.roles.map((role) => (
          <RoleBlock key={role.title} role={role} />
        ))}
      </div>
    </motion.article>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-ink/10">
      {/* Dark Green Banner Header */}
      <div className="bg-olive-dark px-6 py-16 md:px-12">
        <span className="font-mono text-[12px] uppercase tracking-widest2 text-rose">{experienceSection.eyebrow}</span>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl text-cream md:text-5xl">
            {experienceSection.title}
          </h2>
          <span className="font-mono text-[12px] uppercase tracking-widest2 text-cream/50">{experienceSection.archiveLabel}</span>
          </div>
        </div>

      {/* Main Experience Content */}
      <div className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-[900px]">
          <div>
            {experience.map((entry, i) => (
              <CompanyBlock key={entry.company} entry={entry} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}