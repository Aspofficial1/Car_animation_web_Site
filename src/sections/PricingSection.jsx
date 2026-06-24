export default function PricingSection() {
  const tiers = [
    { t: 'Essentials', p: '185,000', d: 'Single-area upgrade. Seats, dash or steering.', f: ['One zone refresh', 'Premium materials', '12-month warranty', 'Pickup in Kurunegala'] },
    { t: 'Signature', p: '460,000', d: 'Full cabin transformation. Our most-booked package.', f: ['Full leather/Alcantara', 'Ambient lighting', 'Carbon trim', '24-month warranty'], featured: true },
    { t: 'Bespoke', p: 'On request', d: 'Concours-level builds. Limited to four per year.', f: ['3D renders included', 'Hand-stitched everything', 'Audio + electronics', 'Lifetime craftsmanship'] },
  ]
  return (
    <section className="sec sec-red">
      <div className="sec-head light">
        <span className="sec-tag light">/ 05 — Investment</span>
        <h2 className="sec-h">Transparent pricing.<br/><em>No hidden trim.</em></h2>
        <p className="sec-lead">All packages quoted in LKR. Final price locked after consultation.</p>
      </div>
      <div className="prc-grid">
        {tiers.map(t => (
          <div key={t.t} className={`prc-card ${t.featured ? 'is-feat' : ''}`}>
            {t.featured && <span className="prc-flag">Most booked</span>}
            <h3 className="prc-t">{t.t}</h3>
            <div className="prc-p">{t.p.match(/\d/) ? <><span>LKR</span>{t.p}</> : t.p}</div>
            <p className="prc-d">{t.d}</p>
            <ul className="prc-list">
              {t.f.map(f => <li key={f}>— {f}</li>)}
            </ul>
            <button className="prc-btn">Book consult</button>
          </div>
        ))}
      </div>
    </section>
  )
}
