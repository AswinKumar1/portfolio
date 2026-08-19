import { useEffect, useState } from 'react'

// Generates a plausible-looking placeholder year of contributions so the
// section never appears broken while data loads, or if the API is
// unreachable (e.g. offline preview, rate limiting).
function placeholderYear() {
  const days = []
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const weekday = d.getDay()
    const base = weekday === 0 || weekday === 6 ? 0.35 : 0.65
    const count = Math.random() < base ? Math.floor(Math.random() * 9) : 0
    days.push({
      date: d.toISOString().slice(0, 10),
      count,
      level: count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 7 ? 3 : 4,
    })
  }
  return days
}

/**
 * Pulls a year of real GitHub contribution data for `username` via a public,
 * CORS-enabled mirror of GitHub's contribution graph
 * (github-contributions-api.jogruber.de). Falls back to generated
 * placeholder data if the request fails, so the UI stays intact.
 */
export function useGithubContributions(username) {
  const [state, setState] = useState({ loading: true, days: placeholderYear(), total: null, isLive: false })

  useEffect(() => {
    let cancelled = false
    if (!username) return

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error('contribution fetch failed')
        return res.json()
      })
      .then((data) => {
        if (cancelled || !data?.contributions?.length) return
        const total = data.total?.lastYear ?? data.contributions.reduce((s, d) => s + d.count, 0)
        setState({ loading: false, days: data.contributions, total, isLive: true })
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false, isLive: false }))
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return state
}
