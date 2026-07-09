import useSmoothScroll from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import ScrollSpy from './components/ScrollSpy'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Social from './components/Social'
import Footer from './components/Footer'
import BackgroundParticles from './components/BackgroundParticles'
import ScrollRevealWrapper from './components/ScrollRevealWrapper'
import RunningLabel from './components/RunningLabel'

export default function App() {
  useSmoothScroll()
  return (
    <div className="relative bg-black min-h-screen">
      <BackgroundParticles />
      {/* Global Background Grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <Navbar />
      <ScrollSpy />
      <main className="relative z-10">
        <ScrollRevealWrapper>
          <Hero />
        </ScrollRevealWrapper>
        
        <RunningLabel />

        <ScrollRevealWrapper>
          <About />
        </ScrollRevealWrapper>
        <ScrollRevealWrapper>
          <Experience />
        </ScrollRevealWrapper>
        <ScrollRevealWrapper>
          <Skills />
        </ScrollRevealWrapper>
        <Projects />
        <ScrollRevealWrapper>
          <Social />
        </ScrollRevealWrapper>
      </main>
      <Footer />
    </div>
  )
}

