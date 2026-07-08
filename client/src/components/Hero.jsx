export default function Hero() {
  return (
    <section style={styles.hero}>
      <div className="container" style={styles.grid}>
        <div>
          <span style={styles.badge}>Artisanal excellence</span>
          <h1 style={styles.headline}>
            Crafting your <em style={styles.emphasis}>sweetest</em> moments
          </h1>
          <p style={styles.subtext}>
            From AI-powered designs to handcrafted masterpieces, we bring your
            dream bakes to life with the precision of a professional bakery
            and the warmth of a home kitchen.
          </p>
          <div style={styles.ctaRow}>
            <button className="btn-primary">Start your order →</button>
            <button className="btn-secondary">View masterpieces</button>
          </div>
        </div>

        <div style={styles.imageWrap}>
        <img src="/Cake1.jpg" alt="Freshly baked cake" style={styles.image} />

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
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'center',
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
    fontSize: '44px',
    lineHeight: 1.15,
    marginBottom: '18px',
  },
  emphasis: {
    color: 'var(--rose-mid)',
    fontStyle: 'italic',
  },
  subtext: {
    fontSize: '15px',
    color: 'var(--text-muted)',
    maxWidth: '420px',
    marginBottom: '32px',
  },
  ctaRow: {
    display: 'flex',
    gap: '14px',
  },
  imageWrap: {
    position: 'relative',
  },
image: {
  width: '100%',
  maxHeight: '360px',
  objectFit: 'contain',
  display: 'block',
  margin: '0 auto',
},
  placeholderText: {
    color: 'rgba(0,0,0,0.35)',
    fontSize: '14px',
  },
  floatingCard: {
    position: 'absolute',
    bottom: '20px',
    left: '-20px',
    background: '#fff',
    borderRadius: '14px',
    padding: '12px 18px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatarStack: {
    display: 'flex',
  },
  avatar: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    background: 'var(--rose-mid)',
    border: '2px solid #fff',
    display: 'inline-block',
  },
  floatingText: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    fontWeight: 500,
  },
};