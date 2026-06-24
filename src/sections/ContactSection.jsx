export default function ContactSection() {
  return (
    <section id="contact" className="sec sec-white sec-contact">
      <div className="ctc-grid">
        <div className="ctc-left">
          <span className="sec-tag">/ 07 — Find us</span>
          <h2 className="sec-h">Drive in.<br/><em>Or call ahead.</em></h2>
          <p className="sec-lead">The studio sits five minutes off the Kurunegala–Dambulla road. Bays are by appointment so each car gets undivided attention.</p>

          <div className="ctc-info">
            <div>
              <span className="ctc-label">Studio</span>
              <p>No. 142, Negombo Road<br/>Kurunegala 60000, Sri Lanka</p>
            </div>
            <div>
              <span className="ctc-label">Hours</span>
              <p>Mon–Sat · 09:00 — 19:00<br/>Sunday by appointment</p>
            </div>
            <div>
              <span className="ctc-label">Talk to us</span>
              <p>+94 77 123 4567<br/>hello@aspautohub.lk</p>
            </div>
          </div>

          <button className="btn-primary">Book a consultation</button>
        </div>

        <div className="ctc-map">
          <iframe
            title="ASP Auto Hub — Kurunegala"
            src="https://www.openstreetmap.org/export/embed.html?bbox=80.34%2C7.46%2C80.40%2C7.51&layer=mapnik&marker=7.4863%2C80.3647"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="ctc-pin">
            <span className="ctc-pin-dot" />
            <div>
              <strong>ASP Auto Hub</strong>
              <span>Kurunegala, Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
