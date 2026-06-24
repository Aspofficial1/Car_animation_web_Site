import { useEffect, useRef, useState } from 'react'

const annotations = [
  {
    id: 1,
    label: 'Premium Leather Seats',
    desc: 'Full Nappa leather upholstery with custom stitching',
    price: 'LKR 185,000',
    // position as % of image width/height
    x: 22,
    y: 62,
    direction: 'left', // arrow points left → label on right
  },
  {
    id: 2,
    label: 'Alcantara Dashboard',
    desc: 'Full dash wrap with suede-feel Alcantara & carbon trim',
    price: 'LKR 120,000',
    x: 52,
    y: 28,
    direction: 'up',
  },
  {
    id: 3,
    label: 'Custom Steering Wheel',
    desc: 'Flat-bottom sport wheel with perforated leather grip',
    price: 'LKR 95,000',
    x: 38,
    y: 52,
    direction: 'left',
  },
  {
    id: 4,
    label: 'Ambient Lighting',
    desc: 'Multi-zone RGB system — 16M colors, app-controlled',
    price: 'LKR 65,000',
    x: 72,
    y: 55,
    direction: 'right',
  },
  {
    id: 5,
    label: 'Carbon Fibre Trim',
    desc: 'Forged carbon inserts across doors & centre console',
    price: 'LKR 78,000',
    x: 78,
    y: 35,
    direction: 'right',
  },
]

function AnnotationPin({ ann, active, onClick, imgRef }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePos = () => {
      if (!imgRef.current) return
      const rect = imgRef.current.getBoundingClientRect()
      setPos({
        x: rect.left + (ann.x / 100) * rect.width,
        y: rect.top + (ann.y / 100) * rect.height,
      })
    }
    updatePos()
    window.addEventListener('resize', updatePos)
    window.addEventListener('scroll', updatePos)
    return () => {
      window.removeEventListener('resize', updatePos)
      window.removeEventListener('scroll', updatePos)
    }
  }, [ann, imgRef])

  const isRight = ann.direction === 'right'
  const isUp = ann.direction === 'up'

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
        cursor: 'pointer',
      }}
      onClick={() => onClick(ann.id)}
    >
      {/* Pulse ring */}
      <div style={{
        position: 'absolute',
        inset: '-8px',
        borderRadius: '50%',
        border: '1px solid rgba(232,0,29,0.4)',
        animation: active ? 'none' : 'pinPulse 2s ease-in-out infinite',
        opacity: active ? 0 : 1,
      }} />

      {/* Dot */}
      <div style={{
        width: '14px', height: '14px',
        borderRadius: '50%',
        background: active ? '#E8001D' : 'white',
        border: `2px solid ${active ? '#E8001D' : 'rgba(255,255,255,0.8)'}`,
        boxShadow: active ? '0 0 16px rgba(232,0,29,0.7)' : '0 0 8px rgba(0,0,0,0.5)',
        transition: 'all 0.3s',
        position: 'relative',
        zIndex: 1,
      }} />

      {/* Arrow line + label card */}
      {isUp ? (
        // Arrow going up
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          opacity: active ? 1 : 0.85,
          transition: 'opacity 0.3s',
        }}>
          <LabelCard ann={ann} active={active} />
          <div style={{
            width: '1px',
            height: active ? '48px' : '32px',
            background: 'linear-gradient(to bottom, transparent, white)',
            transition: 'height 0.4s',
            marginTop: '4px',
          }} />
          {/* Arrowhead */}
          <div style={{
            width: 0, height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '6px solid white',
          }} />
        </div>
      ) : (
        // Arrow going left or right
        <div style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          [isRight ? 'left' : 'right']: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: isRight ? 'row' : 'row-reverse',
          pointerEvents: 'none',
          opacity: active ? 1 : 0.85,
          transition: 'opacity 0.3s',
        }}>
          {/* Arrowhead */}
          <div style={{
            width: 0, height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            [isRight ? 'borderRight' : 'borderLeft']: '6px solid white',
            flexShrink: 0,
          }} />
          {/* Line */}
          <div style={{
            width: active ? '48px' : '32px',
            height: '1px',
            background: 'linear-gradient(to right, white, rgba(255,255,255,0.3))',
            transition: 'width 0.4s',
            flexShrink: 0,
          }} />
          <LabelCard ann={ann} active={active} />
        </div>
      )}
    </div>
  )
}

function LabelCard({ ann, active }) {
  return (
    <div style={{
      background: active ? 'rgba(232,0,29,0.95)' : 'rgba(10,10,10,0.88)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
      padding: '0.6rem 0.9rem',
      minWidth: '160px',
      maxWidth: '200px',
      transition: 'all 0.3s',
      transform: active ? 'scale(1.04)' : 'scale(1)',
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '0.9rem',
        letterSpacing: '0.06em',
        color: 'white',
        marginBottom: '0.2rem',
      }}>{ann.label}</div>
      {active && (
        <div style={{
          fontSize: '0.68rem',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.5,
          marginBottom: '0.4rem',
        }}>{ann.desc}</div>
      )}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: active ? '1rem' : '0.8rem',
        color: active ? 'white' : '#E8001D',
        letterSpacing: '0.05em',
      }}>{ann.price}</div>
    </div>
  )
}

export default function CustomizationSection() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [activePin, setActivePin] = useState(null)
  const [pinsVisible, setPinsVisible] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  // Intersection observer — animate in when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          setTimeout(() => setPinsVisible(true), 800)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handlePin = (id) => {
    setActivePin(prev => prev === id ? null : id)
  }

  const totalPackage = annotations.reduce((sum, a) => {
    const num = parseInt(a.price.replace(/[^0-9]/g, ''))
    return sum + num
  }, 0)

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0A0A0A',
        padding: '6rem 0 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '40vw',
        background: 'radial-gradient(ellipse, rgba(232,0,29,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: '0 6%',
        marginBottom: '3rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{
          fontSize: '0.72rem', letterSpacing: '0.35em',
          textTransform: 'uppercase', color: '#E8001D',
          fontWeight: 600, marginBottom: '0.75rem',
          fontFamily: 'Inter, sans-serif',
        }}>
          What's Possible
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          color: 'white', letterSpacing: '0.05em',
          lineHeight: 1,
        }}>
          INSIDE YOUR <span style={{ color: '#E8001D' }}>DREAM</span>
        </h2>
        <p style={{
          fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)',
          marginTop: '0.75rem', fontFamily: 'Inter, sans-serif',
          fontWeight: 300, maxWidth: '460px', lineHeight: 1.7,
        }}>
          Tap any point to explore what we customized — and exactly what it costs in Sri Lanka.
        </p>
      </div>

      {/* ── Image + Pins ── */}
      <div style={{
        position: 'relative',
        margin: '0 6%',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.2s',
      }}>
        {/* Red accent border */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(232,0,29,0.2)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '-6px', left: '-6px', right: '-6px', bottom: '-6px',
          border: '1px solid rgba(255,255,255,0.03)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Main image */}
        <img
          ref={imgRef}
          src="/assets/Customzied_Image/inside of the car.png"
          alt="Customized Car Interior"
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%',
            display: 'block',
            maxHeight: '75vh',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.88) contrast(1.05)',
          }}
        />

        {/* Subtle dark vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)',
          pointerEvents: 'none', zIndex: 3,
        }} />

        {/* "Click pins" hint */}
        {pinsVisible && !activePin && (
          <div style={{
            position: 'absolute', bottom: '1.5rem', right: '1.5rem',
            zIndex: 10,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '0.5rem 1rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            animation: 'fadeInUp 0.6s ease forwards',
          }}>
            ● Tap any pin to explore
          </div>
        )}
      </div>

      {/* ── Annotation Pins (rendered via fixed positioning) ── */}
      {pinsVisible && imgLoaded && annotations.map((ann, i) => (
        <div
          key={ann.id}
          style={{
            opacity: pinsVisible ? 1 : 0,
            transition: `opacity 0.5s ease ${i * 0.12}s`,
          }}
        >
          <AnnotationPin
            ann={ann}
            active={activePin === ann.id}
            onClick={handlePin}
            imgRef={imgRef}
          />
        </div>
      ))}

      {/* ── Price Summary Card ── */}
      <div style={{
        margin: '3rem 6% 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1px',
        background: 'rgba(255,255,255,0.05)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s',
      }}>
        {annotations.map((ann, i) => (
          <div
            key={ann.id}
            onClick={() => handlePin(ann.id)}
            style={{
              background: activePin === ann.id ? 'rgba(232,0,29,0.12)' : '#0A0A0A',
              padding: '1.5rem',
              cursor: 'pointer',
              borderBottom: `2px solid ${activePin === ann.id ? '#E8001D' : 'transparent'}`,
              transition: 'all 0.3s',
            }}
          >
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1rem', letterSpacing: '0.05em',
              color: activePin === ann.id ? 'white' : 'rgba(255,255,255,0.6)',
              marginBottom: '0.4rem',
              transition: 'color 0.3s',
            }}>{ann.label}</div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.3rem',
              color: '#E8001D',
              letterSpacing: '0.05em',
            }}>{ann.price}</div>
          </div>
        ))}

        {/* Total */}
        <div style={{
          background: '#E8001D',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '0.4rem',
          }}>Full Package</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.6rem',
            color: 'white',
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}>
            LKR {totalPackage.toLocaleString()}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '0.4rem',
          }}>Complete interior transformation</div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pinPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
