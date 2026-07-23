import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="landing-nav">
      <div className="container landing-nav-inner">
        <Link to="/" className="landing-brand" onClick={closeMenu} aria-label="BakeCraft home">
          <img className="landing-brand-logo" src="/logo-v2.png" alt="BakeCraft" />
        </Link>

        <button
          type="button"
          className="landing-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="landing-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={21} />
        </button>

        <div id="landing-navigation" className={`landing-nav-panel ${menuOpen ? 'is-open' : ''}`}>
          <nav className="landing-nav-links" aria-label="Main navigation">
            <a href="#cakes" onClick={closeMenu}>Collection</a>
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="#about" onClick={closeMenu}>Our studio</a>
          </nav>
          <div className="landing-nav-actions">
            <Link to="/login" className="landing-login-link" onClick={closeMenu}>Log in</Link>
            <Link to="/signup" className="landing-nav-cta" onClick={closeMenu}>
              Start creating <Icon name="arrowUpRight" size={15} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
