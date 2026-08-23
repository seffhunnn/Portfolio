import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env so the dev middleware can access GITHUB_TOKEN server-side
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      // Dev-only plugin: serves /api/github-contributions without Vercel CLI
      {
        name: 'github-contributions-api',
        configureServer(server) {
          server.middlewares.use('/api/github-contributions', async (req, res) => {
            const token = env.GITHUB_TOKEN
            const username = env.GITHUB_USERNAME || 'seffhunnn'

            if (!token || token === 'your_github_token_here') {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'GITHUB_TOKEN not set in .env' }))
              return
            }

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
              const ghRes = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                  'User-Agent': 'portfolio-contributions-widget',
                },
                body: JSON.stringify({ query, variables: { username } }),
              })

              const data = await ghRes.json()

              if (data.errors) {
                res.writeHead(502, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'GitHub GraphQL error', details: data.errors }))
                return
              }

              const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar
              if (!calendar) {
                res.writeHead(502, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'Unexpected response shape' }))
                return
              }

              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
              })
              res.end(JSON.stringify({
                totalContributions: calendar.totalContributions,
                weeks: calendar.weeks,
                months: calendar.months,
              }))
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: err.message }))
            }
          })
        },
      },
    ],
    css: {
      postcss: './postcss.config.js',
    },
  }
})

