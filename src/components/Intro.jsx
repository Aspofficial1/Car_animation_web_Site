import { useEffect, useRef } from 'react'

export default function Intro({ onComplete }) {
  const introRef = useRef(null)
  const wipeRef = useRef(null)

  useEffect(() => {
    document.body.classList.add('no-scroll')

    // After logo animation plays (~2.2s), do the wipe transition
    const timer = setTimeout(() => {
      // Animate wipe up
      const wipe = wipeRef.current
      const intro = introRef.current
      if (!wipe || !intro) return

      // Slide wipe panel up over intro
      wipe.style.transition = 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)'
      wipe.style.transform = 'translateY(0%)'

      setTimeout(() => {
        // Hide intro, then slide wipe away
        if (intro) intro.style.display = 'none'
        wipe.style.transition = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)'
        wipe.style.transform = 'translateY(-100%)'

        setTimeout(() => {
          document.body.classList.remove('no-scroll')
          onComplete()
        }, 650)
      }, 720)
    }, 2200)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <>
      {/* Intro Screen */}
      <div className="intro-screen" ref={introRef}>
        <div className="intro-logo">
          ASP AUTO <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span> HUB
        </div>
        <div className="intro-line" />
        <div className="intro-tagline">Premium Car Interior Customization</div>
      </div>

      {/* Wipe Panel */}
      <div
        ref={wipeRef}
        className="page-wipe"
      />
    </>
  )
}
