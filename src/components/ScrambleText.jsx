import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]

/**
 * A from-scratch equivalent of motion.dev's "Scramble text" example (its
 * `ScrambleText` component is part of the paid Motion+ UI kit). Each
 * character cycles through random glyphs, then locks into place left to
 * right, using a plain requestAnimationFrame loop — no extra dependency.
 */
function useScrambleText(text, active, { charDelay = 32, lockWindow = 320 } = {}) {
  // Start from a fully-scrambled string, not the final text — otherwise
  // the "before" and "after" states are identical outside the ~1s
  // transition and the effect is easy to miss entirely on a quick look.
  const [display, setDisplay] = useState(() => text.split('').map((ch) => (ch === ' ' ? ch : randomChar())).join(''))
  const startedRef = useRef(false)

  useEffect(() => {
    if (!active || startedRef.current) return
    startedRef.current = true

    let raf
    const start = performance.now()
    const totalDuration = text.length * charDelay + lockWindow + 100

    const tick = (now) => {
      const elapsed = now - start
      let allLocked = true
      const next = text.split('').map((ch, i) => {
        if (ch === ' ') return ch
        const lockAt = i * charDelay + lockWindow
        if (elapsed >= lockAt) return ch
        allLocked = false
        return randomChar()
      })
      setDisplay(next.join(''))
      if (!allLocked && elapsed < totalDuration) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, text, charDelay, lockWindow])

  return display
}

export default function ScrambleText({ text, as: Tag = 'span', className = '', once = true, ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-10% 0px' })
  const display = useScrambleText(text, inView)

  return (
    <Tag ref={ref} className={className} {...props}>
      {display}
    </Tag>
  )
}
