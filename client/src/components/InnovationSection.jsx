import { Link } from 'react-router-dom';
import Icon from './Icon';

const features = [
  {
    title: '3D cake builder',
    desc: 'Shape layers, flavours, colours, and finishes while your cake updates in real time.',
    icon: 'edit',
  },
  {
    title: 'AI cake magic',
    desc: 'Describe a mood or celebration and turn your words into a visual cake concept.',
    icon: 'sparkle',
  },
  {
    title: 'Handcrafted quality',
    desc: 'Your digital idea is finished by hand with careful details and a baker you can talk to.',
    icon: 'cake',
  },
];

export default function InnovationSection() {
  return (
    <section className="landing-studio">
      <div className="container landing-studio-grid">
        <div className="landing-studio-visual" data-reveal>
          <img src="/cake.jpg" alt="Chocolate cake being prepared in the BakeCraft studio" />
          <div className="landing-studio-caption">
            <Icon name="sparkle" size={18} />
            <span>Where imagination becomes edible</span>
          </div>
        </div>

        <div className="landing-studio-content" data-reveal>
          <p className="landing-eyebrow landing-eyebrow-light">Creativity meets craft</p>
          <h2>Designed digitally.<br /><em>Finished by hand.</em></h2>
          <p className="landing-studio-intro">
            Modern tools make your idea easy to see. Our baker makes every detail feel personal.
          </p>
          <div className="landing-feature-list">
          {features.map((f) => (
              <div key={f.title} className="landing-feature-row">
                <span><Icon name={f.icon} size={19} /></span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
          ))}
          </div>
          <Link to="/builder" className="landing-primary-link landing-light-link">
            Open the cake builder <Icon name="arrowRight" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
