import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { profile, footer, nav } from '../data/content'
import ScrambleText from './ScrambleText'
import { usePageTransition } from '../context/usePageTransition'

/**
 * A plain, always-reachable last section (so #connect always scrolls to
 * something real) — with just the "fades from transparent to opaque as
 * scroll uncovers it" quality from motion.dev's Footer reveal example,
 * done via useScroll/useTransform on the footer's own entry into view.
 *
 * (An earlier version tried the literal sticky/negative-margin overlap
 * technique that example implies. Worked out by hand, it had a real bug —
 * the sticky container was sized identically to the footer itself, so it
 * had no room to actually stick — and I don't have a browser here to
 * verify a fix against, so this simpler version trades a bit of visual
 * fanciness for something I can be confident actually works.)
 */
export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 45%'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [24, 0])
  const navigate = usePageTransition()

  const handleClick = (e, href) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    navigate(href)
  }

  return (
    <motion.footer
      id="connect"
      ref={ref}
      style={{ opacity, y }}
      className="border-t border-ink/10 bg-cream"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 py-24 text-center md:px-12">
        <span className="mb-8 flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest2 text-ink/50">
          <motion.span
            className="h-2 w-2 rounded-full bg-sage-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {profile.availability}
        </span>

        <a href={`mailto:${profile.email}`} className="group inline-block">
          <ScrambleText
            text={profile.email}
            className="block font-display text-[9vw] leading-none text-ink transition-colors group-hover:text-olive sm:text-6xl md:text-7xl lg:text-8xl"
          />
        </a>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group relative font-mono text-[13px] uppercase tracking-widest2 text-ink/70 hover:text-ink"
            >
              {s.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-olive transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>

      {/* broad utility bar — the closing "just like in companies" band */}
      <div className="border-t border-ink/10 bg-ink text-cream/60">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-5 text-center font-mono text-[11px] uppercase tracking-widest2 sm:flex-row sm:text-left md:px-12">
          <span>{footer.note}</span>
          <div className="flex items-center gap-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="transition-colors hover:text-cream"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
