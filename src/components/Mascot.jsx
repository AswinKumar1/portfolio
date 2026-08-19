import { useEffect, useState } from 'react'
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'motion/react'

/**
 * The site's companion — small, fixed in the corner, travels with you for
 * the whole scroll. Holds one steaming cup the whole time; the "life"
 * comes from idle bobbing/blinking, an occasional wave, and a slow, soft
 * lean that responds to how fast you're scrolling.
 */
export default function Mascot() {
  const { scrollY } = useScroll()
  const rawVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(rawVelocity, { damping: 50, stiffness: 220, mass: 0.6 })
  const lean = useTransform(smoothVelocity, [-1800, 0, 1800], [8, 0, -8], { clamp: true })
  // Eases in gradually over a longer scroll range so it never competes
  // with the hero's own content at the very top of the page.
  const presence = useTransform(scrollY, [0, 160, 320], [0, 0.7, 1])

  const [waving, setWaving] = useState(true)
  useEffect(() => {
    const id = setInterval(() => {
      setWaving(true)
      setTimeout(() => setWaving(false), 1500)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  const stroke = '#2B2119'
  const strokeW = 2.3

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-5 z-30 h-16 w-16 sm:bottom-7 sm:left-7 sm:h-[76px] sm:w-[76px]"
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 100 112"
        width="100%"
        height="100%"
        fill="none"
        style={{ rotate: lean, opacity: presence }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ellipse cx="48" cy="106" rx="23" ry="3" fill={stroke} opacity="0.1" />

        <g stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          {/* torso — a touch broader at the shoulder, plain crew-neck collar */}
          <path d="M48 63 C 27 63, 16 74, 18 96 L 18 100" />
          <path d="M48 63 C 69 63, 80 74, 78 96 L 78 100" />
          <path d="M39 61.5 Q48 68 57 61.5" />
          <path d="M40 60 Q48 65 56 60" opacity="0.5" />

          {/* head — a touch taller/softer than a perfect circle */}
          <path d="M48 12.5 C 61 12.5, 70 22, 70 35 C 70 49, 60 58, 48 58 C 36 58, 26 49, 26 35 C 26 22, 35 12.5, 48 12.5 Z" />

          {/* earrings, both sides */}
          <circle cx="26.5" cy="38" r="1.7" fill={stroke} />
          <circle cx="69.5" cy="38" r="1.7" fill={stroke} />

          {/* hair — swept up from the left, flipped across to the right */}
          <path d="M26.5 27 C 25 18, 31 10, 40 9 C 45 8.5, 47 11, 45 14" />
          <path d="M45 14 C 49 8, 57 6, 62 11 C 66 15, 65 19, 61 19" />
          <path d="M61 19 C 66 20, 70 24, 69.5 29" />
          <path d="M31 13 C 34 16, 35 20, 33 24" opacity="0.7" />
          <path d="M52 10.5 C 55 13, 55 16, 53 18" opacity="0.6" />

          {/* rounded rectangular glasses */}
          <rect x="32.5" y="30" width="15" height="11" rx="4" />
          <rect x="49.5" y="30" width="15" height="11" rx="4" />
          <path d="M47.5 34.5 L49.5 34.5" />
          <path d="M32.5 33 L27 31.5" />
          <path d="M64.5 33 L70 31.5" />

          {/* eyes — blink on a loop, sit inside the lenses */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.08, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.9, 0.94, 1], repeatDelay: 1 }}
            style={{ transformOrigin: '48px 35.5px' }}
          >
            <circle cx="40" cy="35.5" r="1.6" fill={stroke} />
            <circle cx="57" cy="35.5" r="1.6" fill={stroke} />
          </motion.g>

          {/* nose + smile */}
          <path d="M48 39 L 47 44" opacity="0.55" />
          <path d="M41 48 Q48 52.5 55 48" />

          {/* left arm — rests, or waves during its periodic window */}
          <motion.path
            d="M29 69 C 19 75, 15 85, 17 93"
            animate={{ opacity: waving ? 0 : 1 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          />
          <motion.g animate={{ opacity: waving ? 1 : 0 }} transition={{ duration: 0.45, ease: 'easeInOut' }}>
            <motion.g
              animate={waving ? { rotate: [0, -22, 10, -22, 0] } : { rotate: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ transformOrigin: '29px 69px' }}
            >
              <path d="M29 69 C 15 63, 7 51, 9 39" />
              <path d="M3 35 l6 5 m-8 -1 l6 7 m-8 -2 l4 8" />
            </motion.g>
          </motion.g>

          {/* right arm — always holding the mug */}
          <path d="M67 69 C 78 75, 82 83, 80 89" />
          <g transform="translate(72, 85)">
            <rect x="0" y="0" width="16" height="13" rx="2.5" />
            <path d="M16 3 q7 1.5 0 8" />
          </g>
          <motion.g
            stroke={stroke}
            strokeWidth="1.3"
            animate={{ y: [0, -5, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M76 81 q2.5 -5 0 -8" />
            <path d="M81 81 q2.5 -5 0 -8" />
          </motion.g>
        </g>
      </motion.svg>
    </div>
  )
}
