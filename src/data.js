// Portfolio Data — edit this file to personalise everything
export const personal = {
  name: 'Saif',
  title: 'Software Developer',
  tagline: 'I enjoy creating software, trying new ideas, and polishing them into meaningful solutions that feel simple, reliable, and useful.',
  email: 'mohdsaifansari8888@gmail.com',
  github: 'https://github.com/seffhunnn',
  linkedin: 'https://www.linkedin.com/in/seffhunnn/',
  leetcode: 'https://leetcode.com/u/seffhunnn/',
  codechef: 'https://www.codechef.com/users/seffhunnn',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1jtcVnIAWxxHRuDGxHEN-ESl0USbsdgt9',
}

export const about = {
  intro: `I’m a Computer Science Engineering undergraduate (Class of 2027) building software and testing applications with a focus on reliability, clean code, and performance. My experience includes working as a Software Tester at Nothing(R) and previously as an ML Intern at Infosys Springboard, where I worked with machine learning concepts and real-world implementations. Alongside development and testing, I continuously strengthen my problem-solving skills through Data Structures & Algorithms and apply AI-driven approaches to create smarter software solutions.`,
  education: [
    {
      degree: 'B.Tech — Computer Science & Engineering',
      institution: 'Galgotias University',
      period: '2023 – 2027',
      grade: 'CGPA 8.34 / 10',
    },
    {
      degree: 'Higher Secondary (Class XII)',
      institution: 'St. Dominic Savio College | Lucknow, Uttar Pradesh',
      period: '2023',
      grade: '84%',
    },
    {
      degree: 'Secondary School (Class X)',
      institution: 'St. Dominic Savio College | Lucknow, Uttar Pradesh',
      period: '2021',
      grade: '83%',
    },
  ],
  interests: ['Software Development', 'Software Testing', 'AI-Powered Solutions', 'Machine Learning','Deployment','Video Editing'],
}

export const experiences = [
  {
    type: 'Part-time',
    role: 'Software Tester',
    company: 'Nothing Technology Limited',
    period: 'October 2024 – Present',
    description: 'Conducted User Acceptance Testing (UAT) on devices to validate software functionality, performance, and overall user experience. Identified, reported, and documented bugs and issues in detail, helping reduce defects and improve product quality. Collaborated closely with development teams by providing actionable feedback, which contributed to making the software more stable, reliable, and production-ready.',
    tags: ['User Acceptance Testing (UAT)', 'Bug Reporting', 'Quality Assurance', 'Performance Testing', 'Usability Testing', 'Collaboration', 'Product Quality'],
  },
  {
    type: 'Internship',
    role: 'Machine Learning Intern',
    company: 'Infosys Springboard',
    period: 'November 2025 – January 2026',
    description: 'Developed an AI-based crop disease identification platform for rice and pulses. Collected and curated datasets, and implemented a CNN (Convolutional Neural Network) model for image-based disease detection. Gained hands-on experience in data preprocessing, model training, evaluation, and integrating the model with a user-friendly interface, along with presenting the project workflow and outcomes.',
    tags: ['Machine Learning', 'Python','Pytorch', 'TensorFlow', 'CNN', 'Data Preprocessing', 'Model Training', 'Model Evaluation', 'Model Integration', 'Project Presentation'],
  },
  {
    type: 'Internship',
    role: 'Web Development Intern',
    company: 'IBM SkillsBuild',
    period: 'July 2025 - August 2025',
    colorClass: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5',
    description: 'During the IBM SkillsBuild Web Development Program, I worked with a team to shape and pitch an innovative project idea. I handled the front-end design and development, which gave me hands-on experience in building user-friendly interfaces while improving my teamwork and creative thinking. The overall experience helped me better understand how ideas move from discussion to execution in a real project environment.',
    tags: ['Web Development', 'Teamwork', 'Creative Thinking', 'Project Pitching', 'Front-end Design', 'Front-end Development', 'User-Friendly Interfaces', 'Project Execution'],
  },
]

export const techStack = [
  'React.js','RAG','TensorFlow', 'PyTorch','Firebase', 'Scikit-learn', 'Convolutional Neural Network(CNN)', 'Semantic Search','NumPy', 'Pandas','Matplotlib', 'Hugging Face', 'LangChain','JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'HTML5', 'XML','TinyLlama','Vector Database','Embeddings','Node.js', 'Express.js', 'Next.js', 'TailwindCSS','Framer Motion', 'Redux', 'Bootstrap','Android', 'MongoDB', 'Supabase', 'Cloudinary'
]

export const toolsAndPlatforms = [
  'Git', 'GitHub','Vercel', 'Netlify','VS Code','Antigravity','Kiro','Figma','Adobe Premiere Pro','Adobe Photoshop','Adobe After Effects','Android Studio','Canva',
]

export const projects = [
  {
    title: 'FragVerse Wallpaper App',
    description: 'A wallpaper platform to discover vibe based collections, curated drops, and exclusive FragVerse uploads.',
    tags: ['React','Vite', 'Unsplash API', 'Cloudinary', 'Firebase Auth','React Router','Responsive User Interface','Supabase','Exclusive Uploads','Tailwind CSS'],
    github: 'https://github.com/seffhunnn/frag-verse-wallpaper-app',
    live: 'https://fragverse.vercel.app/',
    image: '/projects/fragverse.png',
    featured: true,
  },
  {
    title: 'AI Crop Disease Detection',
    description: 'An AI-powered web app for detecting rice and pulse crop diseases through image analysis.',
    tags: ['CNN','PyTorch','Data Preprocessing','Model Training','Model Evaluation','Model Integration','Project Presentation','Streamlit','Python','User Interface'],
    github: 'https://github.com/Springboard-Internship-2025/AI-Driven-Web-Application-for-Automated-Disease-Detection-in-Rice-and-Pulse-Crops_Nov_Batch-6_2025/tree/Mohd-Saif-Ansari',
    image: '/projects/cropdisease.png',
    featured: true,
  },
  {
    title: 'Queryo Docs-AI PDF Assistant',
    description: 'A RAG-based AI system for querying PDF documents with semantic search and context-aware answers.',
    tags: ['RAG','Vector Database','TinyLlama','LangChain','Semantic Search','Context-Aware Answers','PDF Processing','Embeddings'],
    github: 'https://github.com/saif/taskflow',
    live: null,
    image: '/projects/queryodocs.png',
    featured: false,
  },
  {
    title: 'Skill-Bee (Front-end)',
    description: 'A responsive tool-rental platform that helps students and creators access equipment affordably.',
    tags: ['HTML5','CSS3','JavaScript','CSS Grid','Rental Platform','Responsive Design','Modern UI','Search','Category Filter','Pricing Cards'],
    github: 'https://github.com/seffhunnn/Skill-Bee',
    live: 'https://skillrentbee.netlify.app/',
    image: '/projects/skillbee.png',
    featured: false,
  },
]
