import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

/**
 * The "intuitive lines" motif (bklit.com-style): a thin path that draws
 * itself once it enters the viewport, with small node markers that pulse
 * once the line reaches them. Used as connective tissue between sections —
 * literal infrastructure lines for a page about infrastructure.
 */
export function TraceLine({
  vertical = true,
  length = 140,
  nodes = 1,
  className = '',
  delay = 0,
  color = '#47502F',
  opacity = 0.5,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })

  const w = vertical ? 3 : length
  const h = vertical ? length : 3
  const d = vertical ? `M1.5 0 L1.5 ${length}` : `M0 1.5 L${length} 1.5`

  const nodePositions = Array.from({ length: nodes }, (_, i) =>
    nodes === 1 ? length : (length / (nodes - 1)) * i
  )

  return (
    <svg
      ref={ref}
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="1.4"
        strokeDasharray="3 4"
        strokeLinecap="round"
        style={{ opacity }}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      {nodePositions.map((pos, i) => (
        <motion.circle
          key={i}
          cx={vertical ? 1.5 : pos}
          cy={vertical ? pos : 1.5}
          r="3"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: [0, 1.6, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.9 + i * 0.15 }}
        />
      ))}
    </svg>
  )
}
