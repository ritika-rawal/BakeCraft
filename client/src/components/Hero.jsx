import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section style={styles.hero}>
      <div className="container" style={styles.inner}>
        <span style={styles.badge}>AI-powered bakery marketplace</span>
        <h1 style={styles.headline}>
          Find local bakers.<br />
          Design your <em style={styles.emphasis}>dream cake</em>.
        </h1>
        <p style={styles.subtext}>
          Browse home bakers near you, customize your cake with AI, and order
          in minutes - no more messaging five Instagram pages.
        </p>
        <div style={styles.ctaRow}>
          <Link to="/builder"><button className="btn-primary">Design your cake</button></Link>
          <a href="#bakers"><button className="btn-secondary">Browse bakers</button></a>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, var(--pink-soft), var(--bg))',
    padding: '70px 0',
  },
  inner: {
    maxWidth: '560px',
  },
  badge: {
    display: 'inline-block',
    background: '#fff',
    color: 'var(--rose-mid)',
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
  },
  emphasis: {
    color: 'var(--rose-mid)',
    fontStyle: 'italic',
  },
  subtext: {
    fontSize: '15px',
    color: 'var(--text-muted)',
    marginBottom: '32px',
  },
  ctaRow: {
    display: 'flex',
    gap: '14px',
  },
};
