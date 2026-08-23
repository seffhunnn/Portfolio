export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN environment variable is not set' })
  }

  const username = process.env.GITHUB_USERNAME || 'seffhunnn'

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
            months {
              name
              firstDay
              totalWeeks
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'portfolio-contributions-widget',
      },
      body: JSON.stringify({ query, variables: { username } }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('GitHub API error:', response.status, text)
      return res.status(502).json({ error: 'GitHub API request failed', status: response.status })
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors)
      return res.status(502).json({ error: 'GitHub GraphQL error', details: data.errors })
    }

    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) {
      return res.status(502).json({ error: 'Unexpected GitHub API response shape' })
    }

    // Cache for 1 hour via CDN/browser
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Access-Control-Allow-Origin', '*')

    return res.status(200).json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      months: calendar.months,
    })
  } catch (err) {
    console.error('Handler error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
