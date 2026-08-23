import { useState, useEffect } from 'react'

const CACHE_KEY = 'gh_contributions_cache_v5_daily'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const WEEKS_COUNT = 26 // Last 6 months (26 weeks)
const DAILY_STATS_DAYS = 28 // Last 28 days for the dynamic telemetry line wave chart

function getMaxCount(weeks) {
  const counts = weeks.flatMap(w => w.contributionDays.map(d => d.contributionCount))
  return Math.max(...counts, 1)
}

function toLevel(count, maxCount) {
  if (count === 0) return 0
  const ratio = count / maxCount
  if (ratio <= 0.15) return 1
  if (ratio <= 0.40) return 2
  if (ratio <= 0.70) return 3
  return 4
}

/**
 * Builds a 26x7 grid of levels (0-4) for color rendering.
 */
function buildGrid(weeks) {
  const maxCount = getMaxCount(weeks)
  return weeks.map(week => {
    const col = Array(7).fill(0)
    week.contributionDays.forEach(day => {
      col[day.weekday] = toLevel(day.contributionCount, maxCount)
    })
    return col
  })
}

/**
 * Builds a 26x7 grid of { date, count, level } — used for tooltips.
 */
function buildDays(weeks) {
  const maxCount = getMaxCount(weeks)
  return weeks.map(week => {
    const col = Array(7).fill(null)
    week.contributionDays.forEach(day => {
      col[day.weekday] = {
        date: day.date,
        count: day.contributionCount,
        level: toLevel(day.contributionCount, maxCount),
      }
    })
    return col
  })
}

/**
 * Derives accurate month labels and column start positions for the 6-month window.
 */
function buildMonthLabels(weeks) {
  const labels = []
  let lastMonth = ''
  weeks.forEach((week, colIdx) => {
    const firstDay = week.contributionDays?.[0]
    if (firstDay) {
      try {
        const month = new Date(firstDay.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })
        if (month !== lastMonth) {
          labels.push({ name: month, colIndex: colIdx })
          lastMonth = month
        }
      } catch {
        // ignore date format fallback
      }
    }
  })
  return labels
}

function computeTotal(weeks) {
  return weeks
    .flatMap(w => w.contributionDays.map(d => d.contributionCount))
    .reduce((sum, count) => sum + count, 0)
}

function buildRecentDaily(allWeeks, count = DAILY_STATS_DAYS) {
  const allDays = (allWeeks || []).flatMap(w => w.contributionDays || [])
  const recent = allDays.slice(-count)
  return recent.map(d => ({
    date: d.date,
    dayNumber: parseInt(d.date.split('-')[2], 10),
    count: d.contributionCount || 0,
    weekday: d.weekday,
  }))
}

export function useGithubContributions() {
  const [state, setState] = useState({
    grid: null,
    days: null,
    monthLabels: null,
    recentDaily: null,
    total: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      // 1. Check session cache first
      try {
        const raw = sessionStorage.getItem(CACHE_KEY)
        if (raw) {
          const { data, ts } = JSON.parse(raw)
          if (Date.now() - ts < CACHE_TTL_MS) {
            const recentWeeks = (data.weeks || []).slice(-WEEKS_COUNT)
            if (!cancelled) {
              setState({
                grid: buildGrid(recentWeeks),
                days: buildDays(recentWeeks),
                monthLabels: buildMonthLabels(recentWeeks),
                recentDaily: buildRecentDaily(data.weeks || []),
                total: computeTotal(recentWeeks),
                loading: false,
                error: null,
              })
            }
            return
          }
        }
      } catch {
        // Ignore cache parse errors
      }

      // 2. Fetch from secure API route
      try {
        const res = await fetch('/api/github-contributions')
        if (!res.ok) throw new Error(`API returned ${res.status}`)
        const data = await res.json()

        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
        } catch { /* full */ }

        const recentWeeks = (data.weeks || []).slice(-WEEKS_COUNT)

        if (!cancelled) {
          setState({
            grid: buildGrid(recentWeeks),
            days: buildDays(recentWeeks),
            monthLabels: buildMonthLabels(recentWeeks),
            recentDaily: buildRecentDaily(data.weeks || []),
            total: computeTotal(recentWeeks),
            loading: false,
            error: null,
          })
        }
      } catch (err) {
        if (!cancelled) {
          setState(prev => ({ ...prev, loading: false, error: err.message }))
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return state
}
