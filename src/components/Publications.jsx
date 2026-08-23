import { motion } from 'motion/react'
import { publications, publicationsSection } from '../data/content'

export default function Publications() {
  return (
    <section id="publications" className="relative border-t border-ink/10">
      {/* Dark Green Banner Header */}
      <div className="bg-olive-dark px-6 py-16 md:px-12">
        <span className="font-mono text-[12px] uppercase tracking-widest2 text-rose">{publicationsSection.eyebrow}</span>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl text-cream md:text-5xl">
            {publicationsSection.title}
          </h2>
          <span className="font-mono text-[12px] uppercase tracking-widest2 text-cream/50">{publicationsSection.archiveLabel}</span>
          </div>
        </div>

      {/* Main Publications Content */}
      <div className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-[1000px]">
          <div className="space-y-0">
            {publications.map((pub, i) => {
              const Wrapper = pub.href ? 'a' : 'div'
              return (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group border-b border-ink/10 py-8"
                >
                  <Wrapper
                    {...(pub.href ? { href: pub.href, target: '_blank', rel: 'noreferrer' } : {})}
                    className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto] md:items-start md:gap-8"
                  >
                    <div>
                      <h3 className="inline-flex items-baseline gap-2 font-display text-2xl text-ink transition-colors group-hover:text-olive md:text-[28px]">
                        <span className="underline decoration-ink/20 underline-offset-4 transition-colors group-hover:decoration-olive">
                          {pub.title}
                        </span>
                        {pub.href && (
                          <svg
                            className="h-4 w-4 shrink-0 translate-y-[-2px] opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:translate-y-[-4px] group-hover:opacity-100 group-hover:text-olive"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        )}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/65">{pub.description}</p>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-ink/40">{pub.venue}</p>
                    </div>
                    <span className="font-mono text-[13px] uppercase tracking-widest2 text-clay md:pt-1 md:text-right">
                      {pub.year}
                    </span>
                  </Wrapper>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}