import { createContext, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export const PageTransitionContext = createContext(null)

/**
 * A reusable version of the intro curtain, triggered on demand — gives
 * nav navigation between major sections a "page change" feel even though
 * this is one scrolling document with no routing. Covers the viewport,
 * jumps the scroll position while hidden, then wipes away.
 */
export function PageTransitionProvider({ children }) {
  const [phase, setPhase] = useState('idle') // idle | covering | revealing
  const pendingId = useRef(null)

  const navigate = (href) => {
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (!target || phase !== 'idle') return
    pendingId.current = id
    setPhase('covering')
  }

  useEffect(() => {
    if (phase !== 'covering') return
    const t = setTimeout(() => {
      const target = document.getElementById(pendingId.current)
      target?.scrollIntoView({ behavior: 'auto', block: 'start' })
      setPhase('revealing')
    }, 420)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'revealing') return
    const t = setTimeout(() => setPhase('idle'), 480)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <PageTransitionContext.Provider value={navigate}>
      {children}
      {phase !== 'idle' && (
        <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={
              phase === 'covering'
                ? { clipPath: 'inset(0% 0% 0% 0%)' }
                : { clipPath: 'inset(0% 0% 100% 0%)' }
            }
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-olive-dark"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={
              phase === 'covering'
                ? { clipPath: 'inset(0% 0% 0% 0%)' }
                : { clipPath: 'inset(0% 0% 100% 0%)' }
            }
            transition={{ duration: 0.42, delay: 0.06, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      )}
    </PageTransitionContext.Provider>
  )
}
