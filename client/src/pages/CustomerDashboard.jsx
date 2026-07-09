import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          Welcome back{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p style={styles.subtext}>Here's what's happening with your orders.</p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <p style={styles.cardLabel}>Active orders</p>
            <p style={styles.cardValue}>0</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardLabel}>Saved cake designs</p>
            <p style={styles.cardValue}>0</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardLabel}>Favorite bakers</p>
            <p style={styles.cardValue}>0</p>
          </div>
        </div>

        <div style={styles.actions}>
          <Link to="/builder"><button className="btn-primary">Design a new cake</button></Link>
          <Link to="/#bakers"><button className="btn-secondary">Browse bakers</button></Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    padding: '50px 24px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '6px',
  },
  subtext: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '36px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
  },
  cardLabel: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
  },
  cardValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '26px',
    color: 'var(--rose-deep)',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
};