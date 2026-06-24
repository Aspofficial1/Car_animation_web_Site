import { useState } from 'react'

export default function FAQSection() {
  const [open, setOpen] = useState(0)
  const faqs = [
    { q: 'How long does a full cabin build take?', a: 'Signature builds average 8–14 working days. Bespoke can run 3–6 weeks. We give you a calendar before we start.' },
    { q: 'Do you work on all car brands?', a: 'Yes — from a 1989 Mitsubishi Lancer to a 2025 G-Wagon. We also handle classics and electric platforms.' },
    { q: 'Is there a warranty?', a: '12 to 24 months on materials and stitching depending on package. Bespoke includes lifetime craftsmanship coverage.' },
    { q: 'Can I bring my own materials?', a: 'You can. We will inspect them, advise on suitability, and stitch them in. Warranty terms adjust accordingly.' },
    { q: 'Do you deliver outside Kurunegala?', a: 'Pickup and delivery available island-wide. Colombo, Kandy and Galle are weekly routes.' },
  ]
  return (
    <section className="sec sec-black">
      <div className="sec-head">
        <span className="sec-tag">/ 06 — Questions</span>
        <h2 className="sec-h light">Things people<br/><em>ask first.</em></h2>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <div key={i} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <div className="faq-q">
              <span>{f.q}</span>
              <span className="faq-plus">{open === i ? '–' : '+'}</span>
            </div>
            {open === i && <p className="faq-a">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
