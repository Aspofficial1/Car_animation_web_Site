export default function Navbar({ visible }) {
  return (
    <nav className={`navbar ${visible ? 'visible' : ''}`}>
      <div className="nav-logo">
        ASP <span>AUTO</span> HUB
      </div>

      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#whyus">Why Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <button className="nav-cta">Book Now</button>
    </nav>
  )
}
