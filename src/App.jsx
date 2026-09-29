import { motion, useScroll } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import GithubActivity from './components/GithubActivity'
import CredentialsTicker from './components/CredentialsTicker'
import Specimens from './components/Specimens'
import Experience from './components/Experience' 
import Publications from './components/Publications'
import CredentialsSection from './components/CredentialsSection'
import Footer from './components/Footer'
import Mascot from './components/Mascot'
import IntroCurtain from './components/IntroCurtain'
import { PageTransitionProvider } from './context/PageTransitionContext'

export default function App() {
  const { scrollYProgress } = useScroll()

  return (
    <PageTransitionProvider>
      <div className="min-h-screen bg-cream text-ink">
        <IntroCurtain />
        <Mascot />

        {/* a literal infrastructure line, tracing overall scroll depth */}
        <motion.div
          className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-olive"
          style={{ scaleX: scrollYProgress }}
        />
        <Nav />
        <main>
          <Hero />
          <GithubActivity />
          <CredentialsTicker />
          <Specimens />
          <Experience />
          <Publications />
          <CredentialsSection />
        </main>
        <Footer />
      </div>
    </PageTransitionProvider>
  )
}
