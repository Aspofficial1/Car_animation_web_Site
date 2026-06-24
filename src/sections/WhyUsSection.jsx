import { useEffect, useRef } from 'react'

const stats = [
  { number: '500+', label: 'Cars Transformed' },
  { number: '8+', label: 'Years Experience' },
  { number: '100%', label: 'Custom Built' },
  { number: '24/7', label: 'Client Support' }
]

const reasons = [
  { title: 'Master Craftsmen', desc: 'Our artisans bring 10+ years of upholstery and customization expertise to every vehicle.' },
  { title: 'Premium Materials', desc: 'We source only the finest leathers, Alcantara, carbon fiber, and exotic trims from global suppliers.' },
  { title: 'Lifetime Warranty', desc: 'Every installation comes with our signature lifetime workmanship guarantee.' }
]

export default function WhyUsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view')
      })
    }, { threshold: 0.1 })

    const els = sectionRef.current?.querySelectorAll('.fade-up')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="whyus" className="whyus-section" ref={sectionRef}>
      {/* Left: Text & Stats */}
      <div>
        <div className="fade-up">
          <div className="section-eyebrow">Why Choose Us</div>
          <h2 className="section-title">BUILT FOR<br />PERFECTION</h2>
          <div className="section-divider" />
        </div>

        <div className="fade-up" style={{ transitionDelay: '0.1s' }}>
          {reasons.map((r, i) => (
            <div key={i} style={{ marginBottom: '1.75rem' }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.1rem',
                color: 'var(--white)',
                letterSpacing: '0.05em',
                marginBottom: '0.4rem'
              }}>
                <span style={{ color: 'var(--red)', marginRight: '0.5rem' }}>—</span>
                {r.title}
              </div>
              <p style={{
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: '1.7',
                paddingLeft: '1.2rem',
                fontWeight: 300
              }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="whyus-stats fade-up" style={{ transitionDelay: '0.2s' }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Visual Frame */}
      <div className="whyus-visual fade-up" style={{ transitionDelay: '0.15s' }}>
        <div className="whyus-image-frame">
          <div className="interior-placeholder">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
            <div>INTERIOR SHOWCASE</div>
            <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', color: 'rgba(255,255,255,0.1)' }}>
              Place your showcase image here
            </div>
          </div>
        </div>

        {/* Tag labels */}
        <div style={{
          position: 'absolute',
          top: '-1rem',
          right: '-1rem',
          background: 'var(--red)',
          padding: '0.5rem 1.25rem',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          color: 'white'
        }}>
          SINCE 2016
        </div>
      </div>
    </section>
  )
}
