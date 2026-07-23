import Icon from './Icon';
import { Link } from 'react-router-dom';

const cakes = [
  { name: 'Strawberry Reverie', type: 'Celebration cake', image: '/cake-strawberry.png', className: 'landing-cake-featured' },
  { name: 'Midnight Truffle', type: 'Chocolate collection', image: '/cake-black-forest.png' },
  { name: 'Lavender Garden', type: 'Floral collection', image: '/cake-lavender.png' },
];

export default function FeaturedBakers() {
  return (
    <section id="cakes" className="landing-collection">
      <div className="container">
        <div className="landing-collection-header" data-reveal>
          <div>
            <p className="landing-eyebrow">The BakeCraft collection</p>
            <h2>Designed to feel<br />like your celebration.</h2>
          </div>
          <Link to="/signup" className="landing-arrow-link">
            Explore the collection <Icon name="arrowUpRight" size={17} />
          </Link>
        </div>

        <div className="landing-cake-grid">
          {cakes.map((cake, index) => (
            <Link
              to="/signup"
              key={cake.name}
              className={`landing-cake-card ${cake.className || ''}`}
              data-reveal
              style={{ '--reveal-delay': `${index * 90}ms` }}
            >
              <div className="landing-cake-image-wrap">
                <img src={cake.image} alt={cake.name} />
                <span className="landing-cake-index">0{index + 1}</span>
                <span className="landing-cake-view" aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
              </div>
              <div className="landing-cake-meta">
                <h3>{cake.name}</h3>
                <span>{cake.type}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
