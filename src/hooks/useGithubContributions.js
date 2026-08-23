import { useEffect, useState } from 'react'

// Generates placeholder data starting from Jan 1, 2024 to today
function placeholderFrom2024() {
  const days = []
  const start = new Date('2024-01-01')
  const today = new Date()

  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const weekday = d.getDay()
    const isWeekend = weekday === 0 || weekday === 6
    // Give ~75% of weekdays and ~40% of weekends activity
    const baseProb = isWeekend ? 0.4 : 0.75
    const count = Math.random() < baseProb ? Math.floor(Math.random() * 8) + 1 : 0
    
    days.push({
      date: d.toISOString().slice(0, 10),
      count,
      level: count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 7 ? 3 : 4,
    })
  }
  return days
}

export function useGithubContributions(username) {
  const [state, setState] = useState({
    loading: true,
    days: placeholderFrom2024(),
    total: null,
    isLive: false,
  })

  useEffect(() => {
    let cancelled = false
    if (!username) return

    const startYear = 2024
    const currentYear = new Date().getFullYear()
    const years = []
    for (let y = startYear; y <= currentYear; y++) {
      years.push(y)
    }

    // Fetch all years concurrently (2024, 2025, 2026...)
    Promise.all(
      years.map((y) =>
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${y}`)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      )
    )
      .then((results) => {
        if (cancelled) return

        const validResults = results.filter(Boolean)
        if (!validResults.length) throw new Error('All fetches failed')

        // Combine all days into one chronological array
        const allDays = validResults
          .flatMap((r) => r.contributions || [])
          .sort((a, b) => new Date(a.date) - new Date(b.date))

        // Deduplicate days by date key
        const uniqueDaysMap = new Map()
        allDays.forEach((d) => uniqueDaysMap.set(d.date, d))
        const combinedDays = Array.from(uniqueDaysMap.values())

        const totalCount = combinedDays.reduce((sum, d) => sum + (d?.count || 0), 0)

        setState({
          loading: false,
          days: combinedDays.length ? combinedDays : placeholderFrom2024(),
          total: totalCount,
          isLive: true,
        })
      })
      .catch(() => {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, isLive: false }))
        }
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return state
}