import { useState } from 'react'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import ServicesSection from './sections/ServicesSection'
import CustomizationSection from './sections/CustomizationSection'
import WhyUsSection from './sections/WhyUsSection'
import CTASection from './sections/CTASection'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [navVisible, setNavVisible] = useState(false)

  return (
    <>
      {!introDone && (
        <Intro onComplete={() => setIntroDone(true)} />
      )}

      <Navbar visible={navVisible} />

      {introDone && (
        <main>
          <HeroSection onHeroReady={() => setNavVisible(true)} />

          <div className="section-wrapper">
            <CustomizationSection />
            <ServicesSection />
            <WhyUsSection />
            <CTASection />
          </div>
        </main>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}