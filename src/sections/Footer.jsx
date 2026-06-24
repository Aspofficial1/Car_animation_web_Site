export default function Footer() {
  return (
    <footer className="sec-black ftr">
      <div className="ftr-top">
        <div>
          <div className="ftr-logo">ASP <span>AUTO</span> HUB</div>
          <p className="ftr-tag">Premium car interior customization, based in Kurunegala, serving all of Sri Lanka.</p>
        </div>
        <div className="ftr-cols">
          <div>
            <span className="ftr-h">Studio</span>
            <a>Services</a><a>Portfolio</a><a>Pricing</a><a>Process</a>
          </div>
          <div>
            <span className="ftr-h">Company</span>
            <a>About</a><a>Careers</a><a>Press</a><a>Contact</a>
          </div>
          <div>
            <span className="ftr-h">Social</span>
            <a>Instagram</a><a>TikTok</a><a>YouTube</a><a>Facebook</a>
          </div>
        </div>
      </div>
      <div className="ftr-btm">
        <span>© {new Date().getFullYear()} ASP Auto Hub. All rights reserved.</span>
        <span>Kurunegala · Sri Lanka</span>
      </div>
    </footer>
  )
}
