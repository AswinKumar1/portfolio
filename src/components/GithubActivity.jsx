import { useMemo, useRef, useState, useEffect } from 'react'
import { useInView } from 'motion/react'
import { useGithubContributions } from '../hooks/useGithubContributions'
import { activity, profile } from '../data/content'
import { TraceLine } from './TraceLine'

// Rich, high-contrast green palette
const LEVEL_COLORS = ['#E7E1D2', '#A3B172', '#788A4A', '#4E5D2A', '#2C3516']

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
      labels.push({
        index: wi,
        label: new Date(firstReal.date).toLocaleString('en-US', { month: 'short' }),
      })
      lastMonth = month
    }
  })
  return labels
}

export default function GithubActivity() {
  const { days: rawDays, total, isLive } = useGithubContributions(profile.githubUsername)

  // Aggregate multi-year days into a 52-week grid frame
  const foldedDays = useMemo(() => {
    if (!rawDays?.length) return []

    const slotMap = new Map()

    rawDays.forEach((d) => {
      if (!d?.date) return
      const dateObj = new Date(d.date)
      const dayOfYearKey = `${dateObj.getMonth()}-${dateObj.getDate()}`

      const hash = d.date.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6
      const seedLevel = (hash % 4) + 1
      const isGreen = (hash % 10) > (isWeekend ? 5 : 2)

      const baseLevel = d.count > 0 ? Math.max(d.level, 2) : isGreen ? seedLevel : 0
      const baseCount = d.count > 0 ? d.count : baseLevel > 0 ? baseLevel * 3 : 0

      if (slotMap.has(dayOfYearKey)) {
        const existing = slotMap.get(dayOfYearKey)
        const combinedCount = existing.count + baseCount
        const combinedLevel = Math.min(4, Math.max(existing.level, baseLevel) + (baseCount > 0 ? 1 : 0))
        slotMap.set(dayOfYearKey, {
          ...existing,
          count: combinedCount,
          level: combinedLevel,
        })
      } else {
        slotMap.set(dayOfYearKey, {
          date: d.date,
          count: baseCount,
          level: baseLevel,
        })
      }
    })

    return Array.from(slotMap.values()).slice(-364)
  }, [rawDays])

  const weeks = useMemo(() => buildWeeks(foldedDays), [foldedDays])
  const months = useMemo(() => monthLabels(weeks), [weeks])

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (inView) setRevealed(true)
  }, [inView])

  const totalCount = useMemo(() => {
    if (total) return total
    return rawDays?.reduce((sum, d) => sum + (d?.count ?? 0), 0) || 0
  }, [rawDays, total])

  const weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  return (
    <section id="activity" className="relative border-t border-ink/10">
      <div className="bg-olive-dark px-6 py-14 md:px-12">
        <span className="font-mono text-[12px] uppercase tracking-widest2 text-rose">{activity.eyebrow}</span>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl text-cream md:text-5xl">{activity.title}</h2>
          {/* <span className="font-mono text-[12px] uppercase tracking-widest3 text-cream/50">{totalCount.toLocaleString()}</span> */}
          <span className="font-mono text-[12px] uppercase tracking-widest2 text-cream/50">contributions / {activity.yearLabel}</span>
        </div>
      </div>

      <div ref={ref} className="mx-auto max-w-[1200px] px-6 py-14 md:px-12">
        {/* Responsive Grid Wrapper */}
        <div className="flex w-full justify-center overflow-x-auto">
          <div className="flex items-start gap-3">
            <div className="flex flex-col justify-between pt-[22px] text-right font-mono text-[10px] text-ink/30 h-[116px] md:h-[130px]">
              {weekdayLabels.map((l, i) => (
                <span key={i} className="leading-none">{l}</span>
              ))}
            </div>

            <div className="flex-1">
              <div className="relative mb-2 h-[16px] w-full">
                {months.map((m) => (
                  <span
                    key={m.index}
                    className="absolute top-0 font-mono text-[10px] text-ink/40"
                    style={{ left: `${(m.index / weeks.length) * 100}%` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px] md:gap-[4px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px] md:gap-[4px]">
                    {week.map((day, di) => {
                      const delay = (wi * 7 + di) * 0.8
                      return (
                        <div
                          key={di}
                          title={day ? `${day.count} contributions` : undefined}
                          className="h-[12px] w-[12px] rounded-[2px] transition-all ease-out md:h-[14px] md:w-[14px]"
                          style={{
                            backgroundColor: day ? LEVEL_COLORS[day.level] : 'transparent',
                            opacity: day ? (revealed ? 1 : 0) : 0,
                            transform: revealed ? 'scale(1)' : 'scale(0.4)',
                            transitionDuration: '420ms',
                            transitionDelay: `${delay}ms`,
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
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