export default function ProcessSection() {
  const steps = [
    { n: '01', t: 'Consultation', d: 'We sit down in the studio, talk vision, references and budget. No quotes over WhatsApp.' },
    { n: '02', t: 'Design & Mockup', d: '3D renders, material swatches and a fixed price before a single screw turns.' },
    { n: '03', t: 'Build', d: 'Your car lives in our climate-controlled bay. Daily progress photos, zero rush jobs.' },
    { n: '04', t: 'Handover', d: 'Detailed, photographed, warranty-papered and delivered to your door if you want.' },
  ]
  return (
    <section className="sec sec-red">
      <div className="sec-head light">
        <span className="sec-tag light">/ 02 — Our process</span>
        <h2 className="sec-h">From sketch to <em>street.</em></h2>
        <p className="sec-lead">Four deliberate steps. No shortcuts. No surprises on the invoice.</p>
      </div>
      <ol className="proc-list">
        {steps.map(s => (
          <li key={s.n} className="proc-row">
            <span className="proc-n">{s.n}</span>
            <div>
              <h3 className="proc-t">{s.t}</h3>
              <p className="proc-d">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
