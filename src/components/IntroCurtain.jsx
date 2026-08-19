import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { profile } from '../data/content'

/**
 * A clip-path curtain wipe played once on first load, in the spirit of
 * motion.dev's "Curtains: Clip wipe" page-transition example. That example
 * uses Motion+'s paid `useCurtains`/`clipWipe` APIs, built for transitions
 * between routes — this site is a single scrolling page with no routing,
 * so there's nothing to transition *between*. This is a from-scratch
 * equivalent built on the free `motion` package: two panels wipe away on
 * load to reveal the hero underneath.
 */
const SESSION_KEY = 'portfolio-intro-played'
// Only gate repeat plays in a real production build — in `npm run dev`
// this always replays so it's actually testable across refreshes.
const shouldGate = import.meta.env.PROD

export default function IntroCurtain() {
  const alreadyPlayed = shouldGate && typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY)
  const [done, setDone] = useState(!!alreadyPlayed)

  useEffect(() => {
    if (alreadyPlayed) return
    if (shouldGate) sessionStorage.setItem(SESSION_KEY, '1')
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      document.body.style.overflow = ''
      setDone(true)
    }, 1050)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <div className="fixed inset-0 z-[100]" aria-hidden="true">
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-olive-dark"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.85, delay: 0, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-2xl italic text-cream"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            {profile.name}
          </motion.span>
        </div>
      )}
    </AnimatePresence>
  )
}
