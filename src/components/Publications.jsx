import { motion } from 'motion/react'
import { publications } from '../data/content'
import { TraceLine } from './TraceLine'

export default function Publications() {
  return (
    <section id="publications" className="border-t border-ink/10 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-12 flex items-center gap-3">
          <span className="font-mono text-[12px] uppercase tracking-widest2 text-clay">Bibliography</span>
          <TraceLine vertical={false} length={40} nodes={1} opacity={0.5} color="#C98F6E" />
        </div>
        <h2 className="mb-14 font-display text-4xl text-ink md:text-5xl">Publications</h2>

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
                    <h3 className="font-display text-2xl text-ink transition-colors group-hover:text-olive md:text-[28px]">
                      {pub.title}
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
    </section>
  )
}
