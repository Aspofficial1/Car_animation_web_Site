import { useEffect, useRef } from 'react'

const services = [
  {
    number: '01',
    icon: '🪑',
    name: 'Custom Seating',
    desc: 'Handcrafted leather and Alcantara seats tailored to your body and style. From sport bolsters to full recliners.'
  },
  {
    number: '02',
    icon: '🎛️',
    name: 'Dashboard Overhaul',
    desc: 'Full dashboard reskins with premium materials, ambient lighting, and bespoke trim options.'
  },
  {
    number: '03',
    icon: '💡',
    name: 'Ambient Lighting',
    desc: 'Multi-zone RGB & white ambient lighting systems with app control and mood presets.'
  },
  {
    number: '04',
    icon: '🔊',
    name: 'Sound Systems',
    desc: 'Concert-grade audio installations from Burmester, Bang & Olufsen, and custom setups.'
  },
  {
    number: '05',
    icon: '🛞',
    name: 'Steering & Controls',
    desc: 'Custom steering wheels, paddle shifters, and control panel upgrades with premium finishes.'
  },
  {
    number: '06',
    icon: '🖤',
    name: 'Headliner & Roof',
    desc: 'Suede headliners, starlight roof kits, and full ceiling panel replacements.'
  }
]

export default function ServicesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, { threshold: 0.1 })

    const els = sectionRef.current?.querySelectorAll('.fade-up')
    els?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="fade-up">
        <div className="section-eyebrow">What We Do</div>
        <h2 className="section-title">OUR SERVICES</h2>
        <div className="section-divider" />
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <div
            className="service-card fade-up"
            key={i}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="service-number">{s.number}</div>
            <div className="service-icon">{s.icon}</div>
            <div className="service-name">{s.name}</div>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
