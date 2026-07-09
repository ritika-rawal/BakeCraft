const bakers = [
  { name: 'Rose & Rye Bakery', specialty: 'Custom celebration cakes', rating: '4.9', tilt: -2 },
  { name: 'The Sourdough Room', specialty: 'Artisan breads & loaves', rating: '4.8', tilt: 2 },
  { name: 'Little Sugar Studio', specialty: 'Cupcakes & mini desserts', rating: '5.0', tilt: -1 },
];

export default function FeaturedBakers() {
  return (
    <section id="bakers" style={{ padding: '70px 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Featured bakers</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '36px' }}>
          Home and small-batch bakers near you, ready to take your order.
        </p>
        <div style={styles.grid}>
          {bakers.map((b) => (
            <div key={b.name} style={{ ...styles.card, transform: `rotate(${b.tilt}deg)` }}>
              <div style={styles.avatar} />
              <p style={styles.name}>{b.name}</p>
              <p style={styles.specialty}>{b.specialty}</p>
              <p style={styles.rating}>★ {b.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'var(--pink-soft)',
    marginBottom: '14px',
  },
  name: {
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '4px',
  },
  specialty: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginBottom: '10px',
  },
  rating: {
    fontSize: '13px',
    color: 'var(--rose-deep)',
    fontWeight: 500,
  },
};