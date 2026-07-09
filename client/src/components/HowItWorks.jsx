const steps = [
  { num: '1', title: 'Browse bakers', desc: 'Explore local bakers by style, price, and rating.' },
  { num: '2', title: 'Customize with AI', desc: 'Describe your cake in words or design it visually.' },
  { num: '3', title: 'Order & track', desc: 'Confirm your order and follow it right to your door.' },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: '50px 0' }}>
      <div className="container" style={styles.grid}>
        {steps.map((s) => (
          <div key={s.num} style={styles.step}>
            <div style={styles.numCircle}>{s.num}</div>
            <p style={styles.stepTitle}>{s.title}</p>
            <p style={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  step: {
    textAlign: 'center',
  },
  numCircle: {
    width: '44px',
    height: '44px',
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    fontSize: '17px',
    fontWeight: 500,
  },
  stepTitle: {
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--text-dark)',
    marginBottom: '6px',
  },
  stepDesc: {
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
};