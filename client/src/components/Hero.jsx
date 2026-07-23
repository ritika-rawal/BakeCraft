import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="landing-hero" style={styles.hero}>
      <picture style={styles.media}>
        <source media="(max-width: 760px)" srcSet="/cake-strawberry.png" />
        <img className="landing-hero-image" src="/Cake1.jpg" alt="" style={styles.mediaImage} />
      </picture>
      <div style={styles.overlay} />
      <div style={styles.inner}>
        <span style={styles.badge}>AI-powered custom cake studio</span>
        <h1 className="landing-hero-title" style={styles.headline}>
          Custom cakes,<br />
          designed <em style={styles.emphasis}>your way</em>.
        </h1>
        <p style={styles.subtext}>
          Explore our cake collection, customize your design with AI, and order
          directly from the BakeCraft kitchen in minutes.
        </p>
        <div className="landing-hero-actions" style={styles.ctaRow}>
          <Link to="/builder"><button className="btn-primary">Design your cake</button></Link>
          <a href="#cakes"><button className="btn-secondary">Browse cakes</button></a>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: '560px',
    background: '#2A1B22',
    padding: '70px 0',
    overflow: 'hidden',
  },
  media: { position: 'absolute', inset: 0 },
  mediaImage: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 46%', display: 'block' },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(42, 27, 34, 0.66)',
  },
  inner: {
    position: 'relative',
    zIndex: 1,
    width: 'min(560px, calc(100% - 48px))',
    marginLeft: 'max(24px, calc((100vw - 1140px) / 2 + 24px))',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.14)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.32)',
    fontSize: '12px',
    fontWeight: 500,
    padding: '6px 16px',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  headline: {
    fontSize: '46px',
    lineHeight: 1.1,
    marginBottom: '18px',
    color: '#fff',
  },
  emphasis: {
    color: '#F6B9C9',
    fontStyle: 'italic',
  },
  subtext: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.88)',
    marginBottom: '32px',
  },
  ctaRow: {
    display: 'flex',
    gap: '14px',
  },
};
