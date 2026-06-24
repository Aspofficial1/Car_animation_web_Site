export default function ServicesSection() {
  const services = [
    { n: '01', t: 'Premium Leather', d: 'Hand-stitched Nappa, Alcantara & full-grain leather upholstery built for daily luxury.' },
    { n: '02', t: 'Carbon Fibre Trim', d: 'Forged & twill weave carbon panels replacing factory plastics with motorsport finish.' },
    { n: '03', t: 'Ambient Lighting', d: '64-colour fibre optic & RGB systems tuned to your mood, music and drive mode.' },
    { n: '04', t: 'Audio Engineering', d: 'Reference-grade speakers, sound deadening and DSP tuning for studio-quality cabins.' },
    { n: '05', t: 'Steering & Controls', d: 'Custom flat-bottom wheels, paddle shifters and tactile control re-skins.' },
    { n: '06', t: 'Digital Cockpit', d: 'Android Auto, CarPlay, head-up displays & 360° camera integrations.' },
  ]
  return (
    <section id="services" className="sec sec-white">
      <div className="sec-head">
        <span className="sec-tag">/ 01 — What we do</span>
        <h2 className="sec-h">Six disciplines.<br/><em>One obsession.</em></h2>
        <p className="sec-lead">Every cabin we touch becomes a personal signature. We mix old-world craft with modern engineering — nothing leaves the studio that we wouldn't drive ourselves.</p>
      </div>
      <div className="svc-grid">
        {services.map(s => (
          <article key={s.n} className="svc-card">
            <div className="svc-num">{s.n}</div>
            <h3 className="svc-t">{s.t}</h3>
            <p className="svc-d">{s.d}</p>
            <span className="svc-arrow">→</span>
          </article>
        ))}
      </div>
    </section>
  )
}
