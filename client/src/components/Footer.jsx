import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="container landing-footer-main">
        <div>
          <Link to="/" className="landing-brand landing-footer-brand">
            <img className="landing-brand-logo landing-footer-logo" src="/logo-v2.png" alt="BakeCraft" />
          </Link>
          <p>Custom cake design, thoughtfully made in Kathmandu.</p>
        </div>
        <div className="landing-footer-links">
          <div>
            <span>Explore</span>
            <a href="#cakes">Collection</a>
            <a href="#how-it-works">How it works</a>
            <Link to="/builder">Cake builder</Link>
          </div>
          <div>
            <span>Account</span>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Create account</Link>
          </div>
          <div>
            <span>Contact</span>
            <a href="mailto:hello@bakecraft.com">hello@bakecraft.com</a>
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
      </div>
      <div className="container landing-footer-bottom">
        <span>© 2026 BakeCraft</span>
        <span>Made for meaningful celebrations</span>
      </div>
    </footer>
  );
}
