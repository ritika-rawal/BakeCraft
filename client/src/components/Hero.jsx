import { Link } from 'react-router-dom';
import CakeScene from './CakeScene';
import Icon from './Icon';

export default function Hero() {
  return (
    <section className="landing-hero">
      <CakeScene />
      <div className="container landing-hero-content">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">A new way to create cake</p>
          <h1>Made from<br /><em>imagination.</em></h1>
          <p className="landing-hero-subtext">
            Shape your idea in 3D, explore it with AI, and let our baker bring every detail to life.
          </p>
          <div className="landing-hero-actions">
            <Link to="/builder" className="landing-primary-link">
              Create your cake <Icon name="arrowUpRight" size={17} />
            </Link>
            <a href="#cakes" className="landing-text-link">
              Explore creations <Icon name="chevronDown" size={16} />
            </a>
          </div>
        </div>
        <div className="landing-hero-detail" aria-hidden="true">
          <span>01</span>
          <p>Move your pointer<br />to explore the cake</p>
        </div>
      </div>
      <div className="landing-hero-scroll" aria-hidden="true">
        <span>Scroll to discover</span>
        <i />
      </div>
    </section>
  );
}
