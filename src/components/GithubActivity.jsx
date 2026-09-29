import { useMemo, useRef, useState, useEffect } from 'react'
import { useInView } from 'motion/react'
import { useGithubContributions } from '../hooks/useGithubContributions'
import { activity, profile } from '../data/content'
import { TraceLine } from './TraceLine'

const LEVEL_COLORS = ['#E7E1D2', '#BFC6A0', '#98A56E', '#586636', '#333A22']
const CELL = 11
const GAP = 3
const STEP = CELL + GAP

function buildWeeks(days) {
  if (!days?.length) return []
  const first = new Date(days[0].date)
  const leadingBlanks = first.getDay() // 0 = Sunday
  const padded = [...Array(leadingBlanks).fill(null), ...days]
  const weeks = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7))
  }
  return weeks
}

function monthLabels(weeks) {
  const labels = []
  let lastMonth = null
  weeks.forEach((week, wi) => {
    const firstReal = week.find(Boolean)
    if (!firstReal) return
    const month = new Date(firstReal.date).getMonth()
    if (month !== lastMonth) {
      labels.push({ index: wi, label: new Date(firstReal.date).toLocaleString('en-US', { month: 'short' }) })
      lastMonth = month
    }
  })
  return labels
}

export default function GithubActivity() {
  const { days, total, isLive } = useGithubContributions(profile.githubUsername)
  const weeks = useMemo(() => buildWeeks(days), [days])
  const months = useMemo(() => monthLabels(weeks), [weeks])

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    if (inView) setRevealed(true)
  }, [inView])

  const totalCount = total ?? days.reduce((s, d) => s + (d?.count ?? 0), 0)
  const weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  return (
    <section id="activity" className="relative border-t border-ink/10">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-ink/10 px-6 py-16 md:flex-row md:items-end md:px-12">
        <div>
          <span className="font-mono text-[12px] uppercase tracking-widest2 text-clay">{activity.eyebrow}</span>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">{activity.title}</h2>
        </div>
        <div className="flex items-baseline gap-2 font-mono text-sm text-ink/60">
          <span className="text-2xl text-ink">{totalCount.toLocaleString()}</span>
          <span>contributions / {activity.yearLabel}</span>
        </div>
      </div>

      <div ref={ref} className="overflow-x-auto px-6 py-14 md:px-12">
        <div className="flex items-start gap-2" style={{ minWidth: weeks.length * STEP + 32 }}>
          <div className="flex flex-col gap-[3px] pt-[18px] text-right text-[10px] font-mono text-ink/30" style={{ width: 26 }}>
            {weekdayLabels.map((l, i) => (
              <span key={i} style={{ height: CELL, lineHeight: `${CELL}px` }}>
                {l}
              </span>
            ))}
          </div>

          <div>
            <div className="relative mb-1 h-[14px]" style={{ width: weeks.length * STEP }}>
              {months.map((m) => (
                <span
                  key={m.index}
                  className="absolute top-0 text-[10px] font-mono text-ink/40"
                  style={{ left: m.index * STEP }}
                >
                  {m.label}
                </span>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => {
                    const delay = (wi * 7 + di) * 1.4
                    return (
                      <div
                        key={di}
                        title={day ? `${day.count} contributions on ${day.date}` : undefined}
                        className="rounded-[2px] transition-all ease-out"
                        style={{
                          width: CELL,
                          height: CELL,
                          backgroundColor: day ? LEVEL_COLORS[day.level] : 'transparent',
                          opacity: day ? (revealed ? 1 : 0) : 0,
                          transform: revealed ? 'scale(1)' : 'scale(0.4)',
                          transitionDuration: '420ms',
                          transitionDelay: `${delay}ms`,
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40">
            {isLive ? `@${profile.githubUsername}` : 'Sample pattern — connect your GitHub username in content.js'}
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-ink/50">
            <span>Dormant</span>
            {LEVEL_COLORS.map((c) => (
              <span key={c} className="h-[11px] w-[11px] rounded-[2px]" style={{ backgroundColor: c }} />
            ))}
            <span>Active</span>
          </div>
        </div>
      </div>

      <div className="hidden justify-center pb-10 md:flex">
        <TraceLine vertical length={64} nodes={1} opacity={0.4} />
      </div>
    </section>
  )
}
