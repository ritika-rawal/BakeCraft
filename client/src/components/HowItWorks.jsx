import Icon from './Icon';

const steps = [
  { num: '01', title: 'Find your direction', desc: 'Explore signature cakes or begin with an idea of your own.', icon: 'search' },
  { num: '02', title: 'Make it personal', desc: 'Shape every detail with our builder or create a concept with AI.', icon: 'sparkle' },
  { num: '03', title: 'We bring it to life', desc: 'Place your order, talk to our baker, and follow every stage.', icon: 'track' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="landing-process">
      <div className="container">
        <div className="landing-section-heading" data-reveal>
          <div>
            <p className="landing-eyebrow">From idea to icing</p>
            <h2>A thoughtful journey to something uniquely yours.</h2>
          </div>
          <p>Everything you need to create, order, and follow your cake in one calm place.</p>
        </div>

        <div className="landing-steps-grid">
          {steps.map((s) => (
            <article key={s.num} className="landing-step" data-reveal>
              <div className="landing-step-top">
                <span>{s.num}</span>
                <Icon name={s.icon} size={22} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
