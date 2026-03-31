import useSmoothScroll from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Social from './components/Social'
import Footer from './components/Footer'
export default function App() {
  useSmoothScroll()
  return (
    <div className="relative bg-black min-h-screen">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <Navbar />
      <main>
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
