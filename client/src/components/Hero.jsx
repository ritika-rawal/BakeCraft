import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section style={styles.hero}>
      <div className="container" style={styles.inner}>
        <span style={styles.badge}>AI-powered custom cake studio</span>
        <h1 style={styles.headline}>
          Your cake, your way.<br />
          Design your <em style={styles.emphasis}>dream cake</em>.
        </h1>
        <p style={styles.subtext}>
          Explore our cake collection, customize your design with AI, and order
          directly from the BakeCraft kitchen in minutes.
        </p>
        <div style={styles.ctaRow}>
          <Link to="/builder"><button className="btn-primary">Design your cake</button></Link>
          <a href="#cakes"><button className="btn-secondary">Browse cakes</button></a>
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
