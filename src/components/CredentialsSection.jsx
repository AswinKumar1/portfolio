import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { certifications, voices } from '../data/content'
import { TraceLine } from './TraceLine'

function CertificationMarquee() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const loop = [...certifications, ...certifications]
  const duration = certifications.length * 3.4

  return (
    <div
      ref={ref}
      className="marquee-wrap relative h-[420px] overflow-hidden"
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
      }}
    >
      {inView && (
        <div className="marquee-track" style={{ '--marquee-duration': `${duration}s` }}>
          {loop.map((cert, i) => (
            <div key={i} className="flex items-center justify-between gap-6 border-b border-cream/10 py-5">
              <span className="text-[15px] leading-snug text-cream/90">{cert.name}</span>
              <span className="shrink-0 font-mono text-[12px] text-cream/40">{cert.year}</span>
            </div>
          ))}
        </div>
      )}
      <span className="pointer-events-none absolute -bottom-1 right-0 font-mono text-[10px] uppercase tracking-widest2 text-cream/25">
        Hover to pause
      </span>
    </div>
  )
}

function VoiceAvatar({ voice, initials }) {
  return (
    <a
      href={voice.linkedin}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      title={`${voice.name} on LinkedIn`}
      className="group/avatar relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sage-400/30 font-mono text-sm text-cream ring-1 ring-cream/0 transition-all hover:ring-cream/40"
    >
      {voice.photo ? (
        <img src={voice.photo} alt={voice.name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-ink/70 opacity-0 transition-opacity group-hover/avatar:opacity-100">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-cream">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.5H5.67v7.84h2.67zM7 9.36a1.56 1.56 0 1 0 0-3.11 1.56 1.56 0 0 0 0 3.11zM18.34 18.34v-4.3c0-2.3-1.23-3.37-2.87-3.37a2.47 2.47 0 0 0-2.24 1.23h-.03V10.5H10.5v7.84h2.67v-4.11c0-1.08.2-2.13 1.55-2.13 1.32 0 1.34 1.24 1.34 2.2v4.04h2.28z" />
        </svg>
      </span>
    </a>
  )
}

const AUTO_ADVANCE_MS = 6500

function VoiceCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % voices.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [paused])

  const goTo = (i) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  const voice = voices[index]
  const initials = voice.name.split(' ').map((n) => n[0]).join('')

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="cursor-default">
      <div className="min-h-[280px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.figure
            key={voice.name}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-4xl italic text-clay/70">&ldquo;</span>
            <blockquote
              className={`-mt-4 text-xl leading-relaxed text-cream/95 transition-all duration-300 md:text-2xl ${
                paused ? '' : 'line-clamp-3'
              }`}
            >
              {voice.quote}
            </blockquote>
            {!paused && (
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest2 text-cream/30">
                Hover to read the rest &amp; pause
              </span>
            )}

            <figcaption className="mt-6 flex items-center gap-3">
              <VoiceAvatar voice={voice} initials={initials} />
              <span>
                <span className="block text-[15px] font-medium text-cream">{voice.name}</span>
                <span className="block font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
                  {voice.role}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-2">
        {voices.map((v, i) => (
          <button
            key={v.name}
            onClick={() => goTo(i)}
            aria-label={`Show recommendation from ${v.name}`}
            className="group/dot relative h-6 w-6"
          >
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/25 transition-colors group-hover/dot:bg-cream/50" />
            {i === index && (
              <motion.span
                layoutId="voice-dot-active"
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function CredentialsSection() {
  return (
    <section id="credentials" className="border-t border-ink/10 bg-ink text-cream">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b border-cream/10 px-6 py-14 md:border-b-0 md:border-r md:px-12">
          <div className="mb-10 flex items-center gap-3">
            <span className="font-mono text-[12px] uppercase tracking-widest2 text-cream/50">Verification</span>
            <TraceLine vertical={false} length={40} nodes={1} color="#F5F1E8" opacity={0.3} />
          </div>
          <h2 className="mb-10 font-display text-4xl md:text-5xl">Certifications</h2>
          <CertificationMarquee />
        </div>

        <div className="px-6 py-14 md:px-12">
          <div className="mb-10 flex items-center gap-3">
            <span className="font-mono text-[12px] uppercase tracking-widest2 text-cream/50">Collaboration</span>
            <TraceLine vertical={false} length={40} nodes={1} color="#F5F1E8" opacity={0.3} />
          </div>
          <h2 className="mb-10 font-display text-4xl md:text-5xl">Voices</h2>
          <VoiceCarousel />
        </div>
      </div>
    </section>
  )
}
