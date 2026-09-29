import { motion } from 'motion/react'
import { profile, nav } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { usePageTransition } from '../context/usePageTransition'

const SECTION_IDS = nav.map((item) => item.href.replace('#', ''))

export default function Nav() {
  const activeId = useActiveSection(SECTION_IDS)
  const navigate = usePageTransition()

  const handleClick = (e, href) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return // let modifier-clicks behave natively
    e.preventDefault()
    navigate(href)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-12">
        <a
          href="#top"
          onClick={(e) => handleClick(e, '#top')}
          className="font-display text-2xl italic text-olive tracking-tight"
        >
          {profile.name}
        </a>
        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => {
            const id = item.href.replace('#', '')
            const isActive = id === activeId
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative rounded-full px-4 py-2 font-mono text-[13px] uppercase tracking-widest2 transition-colors ${
                  isActive ? 'text-cream' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-olive"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            )
          })}
        </nav>
        <a
          href="#connect"
          onClick={(e) => handleClick(e, '#connect')}
          className="font-mono text-[13px] uppercase tracking-widest2 text-ink/80 transition-colors hover:text-ink md:hidden"
        >
          Connect
        </a>
      </div>
    </header>
  )
}
