export default function WhyUsSection() {
  const stats = [
    { k: '12+', l: 'Years in the trade' },
    { k: '840', l: 'Cabins rebuilt' },
    { k: '7', l: 'Master craftsmen' },
    { k: '5★', l: 'Average rating' },
  ]
  return (
    <section id="whyus" className="sec sec-black">
      <div className="why-grid">
        <div>
          <span className="sec-tag">/ 03 — Why ASP</span>
          <h2 className="sec-h light">We don't trim cars.<br/><em>We re-author them.</em></h2>
          <p className="sec-lead light">
            Big shops hand your keys to whoever is free. We don't. Every project gets one lead craftsman, one project manager,
            and a written warranty that outlives the trend cycle.
          </p>
        </div>
        <div className="why-stats">
          {stats.map(s => (
            <div key={s.l} className="why-stat">
              <div className="why-k">{s.k}</div>
              <div className="why-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
