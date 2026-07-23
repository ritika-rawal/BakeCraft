import Icon from './Icon';

const cakes = [
  { name: 'Velvet Celebration', specialty: 'Fresh berries and rose-piped frosting', rating: '4.9', tilt: -2, image: '/cake-strawberry.png' },
  { name: 'Midnight Truffle', specialty: 'Dark chocolate layers and ganache', rating: '4.8', tilt: 2, image: '/cake-black-forest.png' },
  { name: 'Dessert Selection', specialty: 'Mini treats for parties and gifting', rating: '5.0', tilt: -1, image: '/dessert-assortment.png' },
];

export default function FeaturedBakers() {
  return (
    <section id="cakes" style={{ padding: '70px 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Signature cakes</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '36px' }}>
          Customer favorites handcrafted in the BakeCraft kitchen.
        </p>
        <div style={styles.grid}>
          {cakes.map((b) => (
            <div key={b.name} style={{ ...styles.card, transform: `rotate(${b.tilt}deg)` }}>
              <img src={b.image} alt={`${b.name} featured cake`} style={styles.avatar} />
              <p style={styles.name}>{b.name}</p>
              <p style={styles.specialty}>{b.specialty}</p>
              <p style={styles.rating}><Icon name="star" size={13} /> {b.rating}</p>
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
    width: '100%',
    height: '128px',
    borderRadius: '12px',
    objectFit: 'cover',
    display: 'block',
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
