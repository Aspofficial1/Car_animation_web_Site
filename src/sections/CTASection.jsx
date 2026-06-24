import { useEffect, useRef } from 'react'

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view')
      })
    }, { threshold: 0.15 })

    const els = sectionRef.current?.querySelectorAll('.fade-up')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section id="contact" className="cta-section" ref={sectionRef}>
        <div className="fade-up">
          <div className="section-eyebrow">Ready to Transform?</div>
          <h2 className="section-title" style={{ color: 'white' }}>
            YOUR CAR.<br />YOUR RULES.
          </h2>
          <p className="cta-desc">
            Book a consultation with our design team. We'll craft an interior that reflects who you are — down to the last stitch.
          </p>
          <div className="cta-btn-group">
            <button className="btn-white">Book Consultation</button>
            <button className="btn-outline-white">View Our Work</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">ASP <span>AUTO</span> HUB</div>
        <div className="footer-copy">© 2025 Asp Auto Hub. All rights reserved.</div>
        <div className="footer-copy" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Built by Build With Asp
        </div>
      </footer>
    </>
  )
}
