import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function About() {
  return (
    <section id="about" className="landing-about">
      <div className="container landing-about-inner" data-reveal>
        <p className="landing-eyebrow">Made for your moment</p>
        <h2>Something beautiful<br /><em>is about to happen.</em></h2>
        <p>
          Begin with an idea, a favourite design, or simply a feeling. We will help shape the rest.
        </p>
        <Link to="/signup" className="landing-primary-link">
          Start your creation <Icon name="arrowRight" size={17} />
        </Link>
      </div>
    </section>
  );
}
