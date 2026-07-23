import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

export default function NotFound() {
  const user = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');
  const destination = user?.role === 'baker'
    ? '/dashboard/baker'
    : user?.role === 'customer'
      ? '/dashboard/customer'
      : '/';

  return (
    <main style={styles.page}>
      <div style={styles.content}>
        <span style={styles.icon}><Icon name="search" size={26} /></span>
        <p style={styles.code}>404</p>
        <h1 style={styles.title}>This page is not on the menu</h1>
        <p style={styles.text}>The link may be outdated, or the page may have moved.</p>
        <Link to={destination}>
          <button type="button" className="btn-primary"><Icon name="home" size={15} /> Return Home</button>
        </Link>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: '24px',
    background: 'var(--bg)',
  },
  content: { width: '100%', maxWidth: '440px', textAlign: 'center' },
  icon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    color: 'var(--rose-deep)',
    boxShadow: 'var(--shadow-md)',
    marginBottom: '16px',
  },
  code: { fontSize: '12px', fontWeight: 700, color: 'var(--rose-mid)', marginBottom: '4px' },
  title: { fontSize: '28px', marginBottom: '8px' },
  text: { fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' },
};
