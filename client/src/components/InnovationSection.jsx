const features = [
  {
    title: '3D cake builder',
    desc: 'Visualize your dream cake in 3D. Experiment with layers, textures, and toppings in real time before we bake it.',
    icon: '◆',
  },
  {
    title: 'AI cake magic',
    desc: 'Share your theme or mood board and our AI will suggest flavor and design concepts tailored to your event.',
    icon: '✦',
  },
  {
    title: 'Handcrafted quality',
    desc: 'Every design is executed by our pastry chefs using only the finest organic ingredients and artisan skill.',
    icon: '❋',
  },
];

export default function InnovationSection() {
  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <h2 style={styles.heading}>Innovation in every bite</h2>
        <p style={styles.subtext}>
          We combine cutting-edge technology with traditional baking
          techniques to deliver perfection for every celebration.
        </p>
        <div style={styles.grid}>
          {features.map((f) => (
            <div key={f.title} style={styles.card}>
              <div style={styles.iconCircle}>{f.icon}</div>
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  heading: {
    fontSize: '30px',
    marginBottom: '14px',
  },
  subtext: {
    color: 'var(--text-muted)',
    fontSize: '15px',
    maxWidth: '480px',
    margin: '0 auto 48px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '28px',
    textAlign: 'left',
  },
  card: {
    background: 'var(--card-bg)',
    borderRadius: '16px',
    padding: '28px',
  },
  iconCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: '#fff',
    color: 'var(--rose-mid)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    marginBottom: '18px',
  },
  cardTitle: {
    fontSize: '17px',
    marginBottom: '10px',
  },
  cardDesc: {
    fontSize: '13.5px',
    color: 'var(--text-muted)',
  },
};