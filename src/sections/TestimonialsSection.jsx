export default function TestimonialsSection() {
  const reviews = [
    { q: 'Picked up my Land Cruiser feeling like I bought a new car. The Alcantara headliner alone is worth the trip.', n: 'Dinesh P.', c: 'Land Cruiser 300' },
    { q: 'I have used three shops in Colombo. ASP is on another planet. Quiet, organised, obsessive.', n: 'Shanika R.', c: 'BMW M340i' },
    { q: 'They sent me daily photos for 11 days. I have never been so calm leaving a car at a workshop.', n: 'Mohamed F.', c: 'Range Rover Sport' },
  ]
  return (
    <section className="sec sec-white">
      <div className="sec-head">
        <span className="sec-tag">/ 04 — The owners</span>
        <h2 className="sec-h">Real cars. Real <em>owners.</em></h2>
      </div>
      <div className="tst-grid">
        {reviews.map((r, i) => (
          <figure key={i} className="tst-card">
            <div className="tst-mark">"</div>
            <blockquote className="tst-q">{r.q}</blockquote>
            <figcaption className="tst-c">
              <strong>{r.n}</strong>
              <span>{r.c}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
