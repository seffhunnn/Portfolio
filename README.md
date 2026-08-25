<div align="center">

# Mohd Saif Ansari 

### Software Developer · Open Source Contributor
**CSE Undergrad '27**

<br />

[![Portfolio Live](https://img.shields.io/badge/Live_Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fragverse.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seffhunnn)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/seffhunnn/)
[![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/u/seffhunnn/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mohdsaifansari8888@gmail.com)

<br />

> *"I enjoy creating software, turning ideas into meaningful products, and contributing to the open-source community."*

---

</div>

## 🌟 Overview

Welcome to my personal developer portfolio! This web application is crafted with a focus on minimalism, high-performance typography, fluid micro-interactions, and real-time developer telemetry.

### ✨ Key Features

- 🌌 **Minimalist Campfire Aesthetic**: Deep dark theme (`#000000` / `#0a0a0c`) with warm amber accents (`#ffdd00`) and editorial typography using **Space Grotesk** and **Space Mono**.
- 📊 **Real-Time GitHub Telemetry**:
  - **Daily Activity Wave**: Continuous SVG telemetry curve tracking the last 28 days of commit velocity and trend lines.
  - **6-Month Contribution Heatmap**: Interactive, scalable GitHub contribution matrix with zero-clipping portal tooltips.
- ⚡ **Smooth GPU Hardware Acceleration**: Staggered, fluid left-to-right landing animations powered by **Framer Motion** with `transform-gpu` and `will-change` optimization.
- 📜 **Lenis Smooth Scrolling**: Decelerated native-feel inertial smooth scrolling.
- 🛠️ **Curated Technologies Matrix**: Symmetrical categorized icon matrix covering Frontend, Backend, Machine Learning, and DevOps tools.
- 💼 **Interactive Experience Timeline**: Detailed career progression showcasing roles at Nothing Technology Limited, GSSoC, Infosys Springboard, and IBM SkillsBuild.
- 🎨 **Selected Work Grid**: Project cards featuring live previews, tech stack badges, GitHub source links, and responsive hover overlays.
- 🐱 **Interactive Easter Eggs**: Physics-based interactive cursor and pull-string interactions.

---

## 🛠️ Tech Stack & Architecture

### Frontend & Core
- **Framework:** React 19 / Vite 8
- **Styling:** Vanilla CSS & TailwindCSS (Custom Palette, Glassmorphism, Micro-borders)
- **Animations:** Framer Motion & GSAP
- **Smooth Scroll:** Lenis Smooth Scroll
- **Icons:** Lucide React & Custom SVG Brand Badges

### API & Data Fetching
- **GitHub GraphQL API:** Real-time contribution matrix and commit activity telemetry
- **Deployment:** Vercel (Edge network & Serverless API routes)

---

## 💻 Tech Stack Summary

<div align="left">

| Category | Technologies & Tools |
| :--- | :--- |
| **Languages** | JavaScript (ES6+), Python, Java, TypeScript, SQL, HTML5/CSS3 |
| **Frontend** | React.js, Next.js, TailwindCSS, Framer Motion, Redux Toolkit, Vite |
| **Backend & Database** | Node.js, Express.js, MongoDB, Supabase, Firebase, PostgreSQL |
| **AI, ML & Data** | PyTorch, TensorFlow, Scikit-Learn, LangChain, RAG Systems, Hugging Face |
| **Testing & Tools** | User Acceptance Testing (UAT), Git/GitHub, Postman, Linux, Vercel |

</div>

---

## 🚀 Getting Started Locally

To run this portfolio locally on your machine, follow these simple steps:

### 1. Clone the Repository
```bash
git clone https://github.com/seffhunnn/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
GITHUB_TOKEN=your_personal_access_token_here
GITHUB_USERNAME=seffhunnn
```
*(Note: `GITHUB_TOKEN` is optional for local development; if omitted, the portfolio gracefully falls back to realistic baseline telemetry).*

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```text
Portfolio/
├── api/
│   └── github-contributions.js     # Vercel Serverless Function for GitHub GraphQL API
├── public/
│   ├── favicon.svg
│   └── ...
├── src/
│   ├── assets/                     # Profile photos, covers, and static media
│   ├── components/
│   │   ├── About.jsx               # 'Who Am I ?' editorial description & education
│   │   ├── ContributionStatsChart.jsx # 28-day daily activity SVG telemetry chart
│   │   ├── CursorCat.jsx           # Interactive cursor follower
│   │   ├── DynamicBackground.jsx   # Ambient background lighting
│   │   ├── Experience.jsx          # Experience & internships timeline
│   │   ├── Hero.jsx                # Header, avatar, bio, and live telemetry grid
│   │   ├── Navbar.jsx              # Fixed navigation bar
│   │   ├── Projects.jsx            # Selected work grid with hover overlays
│   │   ├── Skills.jsx              # Technologies matrix & interactive badges
│   │   └── Social.jsx              # Connect 3x2 social grid & contact block
│   ├── hooks/
│   │   ├── useGithubContributions.js # GitHub contributions fetcher & cache
│   │   └── useSmoothScroll.js      # Lenis smooth scroll provider
│   ├── utils/
│   │   └── techIcons.jsx           # SVG tech stack badge library
│   ├── data.js                     # Centralized personal info, projects & experience data
│   ├── App.jsx                     # Root application container
│   ├── index.css                   # Global design tokens and utilities
│   └── main.jsx                    # Application entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 💼 Experience & Roles

- **Software Tester** @ *Nothing Technology Limited* (Oct 2024 – Present)
  - Conducted User Acceptance Testing (UAT) on consumer devices, isolating bugs and improving software stability.
- **Open Source Contributor** @ *GirlScript Summer of Code 2026* (May 2026 – Aug 2026)
  - Contributed to real-world open-source repositories, enhancing accessibility, UI/UX, and component reliability.
- **Machine Learning Intern** @ *Infosys Springboard* (Nov 2025 – Jan 2026)
  - Developed AI-powered crop disease detection platform with CNN architectures in PyTorch/TensorFlow.
- **Web Development Intern** @ *IBM SkillsBuild* (July 2025 – Aug 2025)
  - Built and presented frontend solutions focused on intuitive, accessible user interfaces.

---

## 📫 Connect with Me

- 📧 **Email:** [mohdsaifansari8888@gmail.com](mailto:mohdsaifansari8888@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/seffhunnn](https://www.linkedin.com/in/seffhunnn/)
- 🐙 **GitHub:** [github.com/seffhunnn](https://github.com/seffhunnn)
- 🧩 **LeetCode:** [leetcode.com/u/seffhunnn](https://leetcode.com/u/seffhunnn/)
- 💬 **Discord:** [discord.com/users/seffhunnn](https://discord.com/users/seffhunnn)

---

<div align="center">

Designed and engineered with care by **Mohd Saif Ansari**.

</div>