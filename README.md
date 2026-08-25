<div align="center">

# Mohd Saif Ansari

Software Developer · Open Source Contributor  
Computer Science & Engineering Undergrad (2023–2027)

[Portfolio](https://fragverse.vercel.app/) · [GitHub](https://github.com/seffhunnn) · [LinkedIn](https://www.linkedin.com/in/seffhunnn/) · [LeetCode](https://leetcode.com/u/seffhunnn/) · [Email](mailto:mohdsaifansari8888@gmail.com)

</div>

---

Personal developer portfolio built with React 19, Vite, and Tailwind CSS. Features live GitHub telemetry, GPU-accelerated motion interactions, and an editorial design system.

## Overview

- **Design System:** Dark palette with warm amber accents, Space Grotesk typography, and symmetrical layout hierarchy.
- **GitHub Telemetry:** Real-time dual dashboard with a 28-day continuous SVG activity curve and a 6-month contribution heatmap using portal tooltips.
- **Motion & Performance:** Viewport-triggered scroll animations via Framer Motion with hardware acceleration, paired with Lenis inertial scrolling.
- **Work Showcase:** Responsive selected projects grid with desktop hover overlays, live deployment links, and tech stack tags.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Scrolling & Animation:** Lenis, CSS Transform Optimization
- **API & Backend:** GitHub GraphQL API, Vercel Serverless Functions
- **Core Languages:** JavaScript (ES6+), Python, Java, TypeScript, SQL

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/seffhunnn/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Environment variables (optional for local testing):
Create a `.env` file from `.env.example`:
```env
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=seffhunnn
```
*(If omitted, the application uses built-in baseline telemetry data).*

4. Run development server:
```bash
npm run dev
```

5. Production build:
```bash
npm run build
npm run preview
```

## Project Structure

```text
Portfolio/
├── api/
│   └── github-contributions.js        # Serverless endpoint for GitHub GraphQL API
├── public/
├── src/
│   ├── assets/                        # Media and static assets
│   ├── components/
│   │   ├── About.jsx                  # Bio and education
│   │   ├── ContributionStatsChart.jsx # 28-day SVG activity wave chart
│   │   ├── CursorCat.jsx              # Interactive cursor accessory
│   │   ├── DynamicBackground.jsx      # Ambient background effects
│   │   ├── Experience.jsx             # Experience timeline
│   │   ├── Hero.jsx                   # Profile, cover, and live telemetry grid
│   │   ├── Navbar.jsx                 # Navigation header
│   │   ├── Projects.jsx               # Selected work showcase
│   │   ├── Skills.jsx                 # Categorized tech stack grid
│   │   └── Social.jsx                 # Contact section and social channels
│   ├── hooks/
│   │   ├── useGithubContributions.js    # Telemetry data handler and cache
│   │   └── useSmoothScroll.js         # Lenis scroll controller
│   ├── utils/
│   │   └── techIcons.jsx              # SVG icon registry
│   ├── data.js                        # Content and configuration
│   ├── App.jsx                        # Root application component
│   └── index.css                      # Global styles and design tokens
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Experience

- **Software Tester** — *Nothing Technology Limited* (Oct 2024 – Present)  
  Conducted User Acceptance Testing (UAT) on consumer devices to identify software bugs and validate product stability.
- **Contributor** — *GirlScript Summer of Code 2026* (May 2026 – Aug 2026)  
  Contributed to open-source repositories with bug fixes, UI improvements, and accessibility enhancements.
- **Machine Learning Intern** — *Infosys Springboard* (Nov 2025 – Jan 2026)  
  Built an AI crop disease detection platform with CNN architectures in PyTorch and TensorFlow.
- **Web Development Intern** — *IBM SkillsBuild* (July 2025 – Aug 2025)  
  Developed accessible, user-friendly frontend web interfaces.

## Contact

- **Email:** [mohdsaifansari8888@gmail.com](mailto:mohdsaifansari8888@gmail.com)
- **LinkedIn:** [linkedin.com/in/seffhunnn](https://www.linkedin.com/in/seffhunnn/)
- **GitHub:** [github.com/seffhunnn](https://github.com/seffhunnn)
- **LeetCode:** [leetcode.com/u/seffhunnn](https://leetcode.com/u/seffhunnn/)
- **Discord:** [discord.com/users/seffhunnn](https://discord.com/users/seffhunnn)

---

<div align="center">
Mohd Saif Ansari · 2026
</div>