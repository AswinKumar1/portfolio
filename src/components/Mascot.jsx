import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'motion/react'
import { mascotSectionIds, mascotPoses } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'

/**
 * The site's companion — small, fixed in the corner, travels with you for
 * the whole scroll. The artwork itself is custom-illustrated (not drawn
 * by this component) and swaps per section via `mascotPoses` in
 * content.js, crossfading as the active section changes. Each SVG
 * carries its own built-in animation (blink, wave, speech-bubble pop) via
 * embedded CSS — this component only handles position, the fade-in on
 * scroll, the lean tied to scroll speed, and the pose crossfade itself.
 */
export default function Mascot() {
  const { scrollY } = useScroll()
  const rawVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(rawVelocity, { damping: 50, stiffness: 220, mass: 0.6 })
  const lean = useTransform(smoothVelocity, [-1800, 0, 1800], [8, 0, -8], { clamp: true })
  // Eases in gradually over a longer scroll range so it never competes
  // with the hero's own content at the very top of the page.
  const presence = useTransform(scrollY, [0, 160, 320], [0, 0.7, 1])

  const activeId = useActiveSection(mascotSectionIds)
  const pose = mascotPoses[activeId] ?? mascotPoses.default

  return (
    <motion.div
      className="pointer-events-none fixed bottom-4 left-4 z-30 w-28 aspect-[900/620] sm:bottom-6 sm:left-6 sm:w-32"
      style={{ rotate: lean, opacity: presence }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={pose}
          src={pose}
          alt=""
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full w-full object-contain object-bottom"
        />
      </AnimatePresence>
    </motion.div>
  )
}
