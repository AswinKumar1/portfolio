import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { wrap } from 'motion'
import { issuers } from '../data/content'
import { getBrandIcon } from '../data/brandIcons'

/**
 * A slim band between "The Generative Garden" (Artifact 01) and "Technical
 * Specimens" (Artifact 02) — the companies behind the credentials, as
 * marks rather than text, sitting quiet in the page until you notice them.
 * Built in the spirit of motion.dev's "Scroll Text Lines": rows moving
 * horizontally at different speeds tied to scroll, using the free
 * useScroll/useTransform APIs that example uses, plus Motion's `wrap()`
 * helper so the loop is genuinely seamless no matter how far the page
 * scrolls.
 */
function IssuerMark({ issuer }) {
  const icon = issuer.icon ? getBrandIcon(issuer.icon) : null
  const brand = icon?.hex ?? '#C98F6E' // clay — the theme's own accent, for issuers with no logo

  return (
    <span title={issuer.name} style={{ '--brand': brand }} className="group flex shrink-0 items-center gap-3">
      <span className="relative flex h-11 w-11 items-center justify-center">
        {/* ambient glow, always on, blooms further on hover */}
        <span className="absolute inset-[-6px] rounded-full opacity-45 blur-md transition-all duration-500 ease-out group-hover:inset-[-12px] group-hover:opacity-80 [background:var(--brand)]" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-cream text-[color:var(--brand)] opacity-80 transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100 group-hover:border-transparent">
          {icon ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d={icon.path} />
            </svg>
          ) : (
            <span className="font-mono text-[10px] font-medium tracking-wide">{issuer.monogram}</span>
          )}
        </span>
      </span>
      <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink/35 transition-colors duration-500 group-hover:text-[color:var(--brand)]">
        {issuer.name}
      </span>
    </span>
  )
}

function TickerRow({ items, factor, reverse = false }) {
  const setRef = useRef(null)
  const [setWidth, setSetWidth] = useState(0)

  useLayoutEffect(() => {
    if (setRef.current) setSetWidth(setRef.current.getBoundingClientRect().width)
  }, [items])

  const { scrollY } = useScroll()
  const baseX = useTransform(scrollY, (v) => v * factor * (reverse ? 1 : -1))
  const x = useTransform(baseX, (v) => (setWidth ? `${wrap(-setWidth, 0, v)}px` : '0px'))

  return (
    <div className="overflow-hidden">
      <motion.div style={{ x }} className="flex w-max items-center gap-14 whitespace-nowrap">
        <div ref={setRef} className="flex shrink-0 items-center gap-14">
          {items.map((issuer, i) => (
            <IssuerMark key={`a-${i}`} issuer={issuer} />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-14">
          {items.map((issuer, i) => (
            <IssuerMark key={`b-${i}`} issuer={issuer} />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-14">
          {items.map((issuer, i) => (
            <IssuerMark key={`c-${i}`} issuer={issuer} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function CredentialsTicker() {
  const half = Math.ceil(issuers.length / 2)
  const rowA = issuers.slice(0, half)
  const rowB = issuers.slice(half)

  return (
    <div className="space-y-8 border-y border-ink/10 bg-stone/40 py-10">
      <TickerRow items={rowA} factor={0.55} />
      <TickerRow items={rowB} factor={0.4} reverse />
    </div>
  )
}
