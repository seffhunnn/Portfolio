export const personal = {
  name: 'Saif',
  fullName: 'Mohd Saif Ansari',
  title: 'Software Developer · Open Source Contributor',
  status: "CSE Undergrad '27",
  bio: [
    { text: 'Building & Contributing', highlight: true },
    { text: 'Open source and real world software.', highlight: false },
    { text: 'Learning from what happens.', highlight: false },
  ],
  tagline: 'I enjoy creating software, turning ideas into meaningful products, and contributing to the open source community.',
  email: 'mohdsaifansari8888@gmail.com',
  github: 'https://github.com/seffhunnn',
  linkedin: 'https://www.linkedin.com/in/seffhunnn/',
  leetcode: 'https://leetcode.com/u/seffhunnn/',
  discord: 'https://discord.com/users/seffhunnn',
  steam: 'https://steamcommunity.com/id/mylurf/',
  codechef: 'https://www.codechef.com/users/seffhunnn',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1E-7iLORxoHsuBpfIM71EXj6Jhs6kZraF',
}

export const about = {
  intro: `I am a CS undergrad ’27 who focuses on building minimal and clean software. I also contribute to open-source projects, with an interest in performance, accessibility, stability, and user experience. Alongside this, I have gained practical experience in software testing and machine learning.`,
  education: [
    {
      degree: 'B.Tech — Computer Science & Engineering',
      institution: 'Galgotias University',
      period: '2023 — 2027',
      grade: 'CGPA 8.38 / 10',
      icon: 'https://cdn-icons-png.flaticon.com/512/10748/10748395.png',
    },
    {
      degree: 'Higher Secondary (Class XII)',
      institution: 'St. Dominic Savio College',
      period: '2023',
      grade: '84%',
      icon: 'https://cdn-icons-png.flaticon.com/512/8074/8074800.png',
    },
    {
      degree: 'Secondary School (Class X)',
      institution: 'St. Dominic Savio College',
      period: '2021',
      grade: '83%',
      icon: 'https://cdn-icons-png.flaticon.com/512/3858/3858688.png',
    },
  ],
  interests: ['Software Development', 'Open Source', 'Software Testing', 'AI / Machine Learning', 'Video Editing', 'Gaming'],
}

export const experiences = [
  {
    type: 'Part-time',
    role: 'Software Tester',
    company: 'Nothing Technology Limited',
    period: 'October 2024 – Present',
    logo: 'https://img.logo.dev/nothing.tech?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=true&format=png',
    description: 'Conducted User Acceptance Testing (UAT) on consumer devices and software, identifying and documenting bugs while providing actionable feedback to improve product stability, usability, and overall software quality.',
    tags: ['User Acceptance Testing (UAT)', 'Bug Reporting', 'Quality Assurance', 'Performance Testing', 'Usability Testing', 'Collaboration', 'Product Quality'],
  },
  {
    type: 'Open Source',
    role: 'Contributor',
    company: 'GirlScript Summer of Code 2026',
    period: 'May 2026 – August',
    logo: 'https://gssoc.girlscript.org/logo.png',
    description: "Contributed to real-world open-source projects by fixing bugs, improving UI/UX, and implementing features to make applications more reliable, accessible, and user-friendly.",
    tags: ['GSSoC', 'Open Source', 'GitHub', 'Community', 'Bug Fixes', 'UI/UX', 'Collaboration'],
  },
  {
    type: 'Open Source',
    role: 'Open Source Contributor',
    company: 'Open Source Ecosystem',
    period: null,
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc7oV-AkBAnySGoTki2J1yszdp1HV5cEkRmVzZMsfFZA&s',
    description: 'Worked on real-world open-source projects, improving performance, accessibility, and the overall user experience. Fixed UI and configuration issues, optimized existing features, and built improvements that worked smoothly across desktop and mobile.',
    tags: ['Open Source', 'GitHub', 'Performance', 'Accessibility', 'State Persistence', 'UI/UX Refinements', 'Stability & Debugging'],
  },
  {
    type: 'Internship',
    role: 'Machine Learning Intern',
    company: 'Infosys Springboard',
    period: 'November 2025 – January 2026',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGVr1-FuEwRlBCq3-7ozw0fm3AGXIri8VKVvgCMWqxGaZsXTFGRx9yMDde&s=10',
    description: 'Developed an AI-based crop disease identification platform for rice and pulses. Worked on dataset preparation, CNN model training and evaluation, and integrated the model into a user-friendly interface.',
    tags: ['Python', 'Pytorch', 'TensorFlow', 'CNN', 'Data Preprocessing', 'Model Training', 'Model Evaluation', 'Model Integration', 'Project Presentation'],
  },
  {
    type: 'Internship',
    role: 'Web Development Intern',
    company: 'IBM SkillsBuild',
    period: 'July 2025 – August 2025',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZccH9m1-lzQxBhQ9tPml81hrxDGX8kRUvwylWanc0Q&s=10',
    description: 'Worked with a team to build and pitch a project through IBM SkillsBuild, focusing on frontend development and creating a simple, user-friendly interface.',
    tags: ['Web Development', 'Teamwork', 'Creative Thinking','Front-end Development', 'User-Friendly Interfaces'],
  },
]

export const techStack = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Backend & Data',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Firebase', 'Supabase'],
  },
  {
    category: 'AI / ML',
    skills: ['PyTorch', 'TensorFlow', 'Machine Learning', 'Streamlit'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Postman', 'Vercel'],
  },
  {
    category: 'Languages',
    skills: ['Java', 'Python'],
  },
]

export const projects = [
  {
    title: 'FragVerse Wallpaper App',
    description: 'A wallpaper platform to discover vibe based collections, curated drops, and exclusive FragVerse uploads.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Cloudinary', 'Firebase'],
    github: 'https://github.com/seffhunnn/frag-verse-wallpaper-app',
    live: 'https://fragverse.vercel.app/',
    image: '/projects/fragverse.png',
    featured: true,
  },
  {
    title: 'AI Crop Disease Detection',
    description: 'An AI-powered web app for detecting rice and pulse crop diseases through image analysis.',
    tags: ['PyTorch', 'Python', 'Streamlit', 'CNN', 'Machine Learning'],
    github: 'https://github.com/Springboard-Internship-2025/AI-Driven-Web-Application-for-Automated-Disease-Detection-in-Rice-and-Pulse-Crops_Nov_Batch-6_2025/tree/Mohd-Saif-Ansari',
    image: '/projects/cropdisease.png',
    featured: true,
  },
  {
    title: 'Queryo Docs-AI PDF Assistant',
    description: 'A RAG-based AI system for querying PDF documents with semantic search and context-aware answers.',
    tags: ['Python', 'LangChain', 'PyTorch', 'TinyLlama', 'RAG'],
    github: 'https://github.com/seffhunnn/rag-pdf-chatbot',
    live: null,
    image: '/projects/queryodocs.png',
    featured: false,
  },
  {
    title: 'Skill-Bee (Front-end)',
    description: 'A responsive tool-rental platform that helps students and creators access equipment affordably.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/seffhunnn/Skill-Bee',
    live: 'https://skillrentbee.netlify.app/',
    image: '/projects/skillbee.png',
    featured: false,
  },
]
