const products = [
  { name: 'Sourdough loaf', price: '$8', tilt: -3 },
  { name: 'Cinnamon rolls', price: '$5', tilt: 2 },
  { name: 'Almond croissant', price: '$4.5', tilt: -2 },
];

export default function FeaturedProducts() {
  return (
    <section id="products" style={{ padding: '80px 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>Today's favorites</h2>
        <div style={styles.grid}>
          {products.map((p) => (
            <div
              key={p.name}
              style={{ ...styles.ticket, transform: `rotate(${p.tilt}deg)` }}
            >
              <p style={styles.ticketLabel}>Baked today</p>
              <h3 style={styles.ticketName}>{p.name}</h3>
              <p style={styles.ticketPrice}>{p.price}</p>
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px',
  },
  ticket: {
    background: 'var(--cream)',
    border: '1px solid var(--tan)',
    borderTop: '4px dashed var(--rust)',
    padding: '24px 20px',
    boxShadow: '2px 4px 0 rgba(59,36,21,0.08)',
  },
  ticketLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--gold)',
    fontWeight: 500,
    marginBottom: '8px',
  },
  ticketName: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  ticketPrice: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    color: 'var(--rust)',
  },
};
