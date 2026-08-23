import useSmoothScroll from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Social from './components/Social'
import Footer from './components/Footer'
import DynamicBackground from './components/DynamicBackground'
import CursorCat from './components/CursorCat'

export default function App() {
  useSmoothScroll()
  return (
    <div className="relative min-h-screen text-white bg-black select-none">
      
      {/* Dynamic Layered Illustration Background */}
      <DynamicBackground />

      {/* Oneko.js Desktop Cat Easter Egg */}
      <CursorCat />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />

        <About />
        <Experience />
        <Skills />
        <Projects />
        <Social />
      </main>
      <Footer />
    </div>
  )
}
