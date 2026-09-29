import { useEffect, useState } from 'react'

/**
 * Tracks which section id currently "owns" the viewport, for the nav's
 * sliding active-tab indicator. Uses IntersectionObserver with a band
 * through the vertical center of the screen, rather than top/bottom
 * edges, so the active tab changes when a section is actually what's
 * being read, not the instant its top pixel appears.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        // Prefer whichever intersecting section is closest to the top —
        // reads as "the one you've scrolled to" rather than jumping to
        // whichever fires last.
        const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
        setActiveId(top.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
