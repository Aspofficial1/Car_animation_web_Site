import { useEffect, useRef, useState } from 'react'
import { useScrollFrame } from '../hooks/useScrollFrame'
import { preloadFrames } from '../utils/preloadImages'

const TOTAL_FRAMES = 240
const VIDEO_CUT_TIME = 6.0  // force stop at exactly 6 seconds

export default function HeroSection({ onHeroReady }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const [videoActive, setVideoActive] = useState(false)
  const [canvasActive, setCanvasActive] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [images, setImages] = useState([])
  const [loadingFrames, setLoadingFrames] = useState(true)

  const { containerRef, progress } = useScrollFrame(canvasRef, images, TOTAL_FRAMES)

  // ── FIX 1: Force video to cut at exactly 6.0s via timeupdate ──
  const handleTimeUpdate = () => {
    const vid = videoRef.current
    if (!vid) return
    if (vid.currentTime >= VIDEO_CUT_TIME) {
      vid.pause()
      switchToCanvas()
    }
  }

  // Also handle natural end (in case video is shorter than 6s)
  const handleVideoEnd = () => {
    switchToCanvas()
  }

  const switchToCanvas = () => {
    // Prevent double-trigger
    const vid = videoRef.current
    if (vid) {
      vid.ontimeupdate = null
      vid.onended = null
    }
    setCanvasActive(true)
    setVideoActive(false)

    setTimeout(() => {
      setTextVisible(true)
      if (onHeroReady) onHeroReady()
    }, 400)
  }

  // ── Start video after intro transition ──
  useEffect(() => {
    const t1 = setTimeout(() => {
      setVideoActive(true)
      const vid = videoRef.current
      if (vid) {
        vid.currentTime = 0.01
        vid.play().catch(() => {
          // Autoplay blocked — skip straight to canvas
          switchToCanvas()
        })
      }
    }, 300)
    return () => clearTimeout(t1)
  }, [])

  // ── Preload all frames in background while video plays ──
  useEffect(() => {
    preloadFrames(TOTAL_FRAMES).then((imgs) => {
      setImages(imgs)
      setLoadingFrames(false)
    })
  }, [])

  // Scroll lock handled inside useScrollFrame hook

  return (
    // FIX 2: Container no longer needs huge height for native scroll.
    // The wheel hijack in useScrollFrame handles frame progression.
    // We give it 100vh so it stays as one sticky block.
    <div
      ref={containerRef}
      style={{ height: '100vh', position: 'relative' }}
    >
      {/* Sticky hero viewport */}
      <div className="hero-section" style={{ position: 'sticky', top: 0 }}>

        {/* ── Video Layer ── */}
        <video
          ref={videoRef}
          className={`hero-video ${videoActive ? 'active' : ''}`}
          src="/assets/hero_section/Hero Video.mp4"
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
        />

        {/* ── Canvas Scroll Animation ── */}
        <canvas
          ref={canvasRef}
          className={`hero-canvas ${canvasActive ? 'active' : ''}`}
        />

        {/* Loading overlay while frames preload */}
        {loadingFrames && canvasActive && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px', height: '40px',
                border: '2px solid rgba(255,255,255,0.1)',
                borderTop: '2px solid #E8001D',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 1rem'
              }} />
              <p style={{
                fontSize: '0.7rem', letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase'
              }}>
                Loading experience...
              </p>
            </div>
          </div>
        )}

        {/* ── Hero Text ── */}
        <div className={`hero-text ${textVisible ? 'visible' : ''}`}>
          <div className="hero-eyebrow">Premium Interior Studio</div>
          <h1 className="hero-title">
            REDEFINE<br />
            YOUR <span className="red">DRIVE</span>
          </h1>
          <p className="hero-subtitle">
            Luxury custom interiors crafted for those who demand perfection behind the wheel.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Builds</button>
            <button className="btn-secondary">View Gallery</button>
          </div>
        </div>

        {/* ── Scroll Indicator — hides when animation is done ── */}
        <div className={`scroll-indicator ${textVisible ? 'visible' : ''}`}
          style={{ opacity: progress >= 99 ? 0 : undefined, transition: 'opacity 0.5s' }}
        >
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>

        {/* ── Frame Progress Bar ── */}
        {canvasActive && (
          <div
            className="frame-progress"
            style={{ width: `${progress}%` }}
          />
        )}

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '30%',
          background: 'linear-gradient(to top, var(--black), transparent)',
          zIndex: 5, pointerEvents: 'none'
        }} />

      </div>
    </div>
  )
}
