import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.inner}>
        <Link to="/"><span style={styles.logo}>BakeCraft</span></Link>
        <div style={styles.links}>
          <Link to="/" style={styles.activeLink}>Home</Link>
          <a href="#bakers">Bakers</a>
          <Link to="/builder">Cake builder</Link>
        </div>
        <div style={styles.actions}>
          <input placeholder="Search flavors..." style={styles.search} />
          <span style={styles.icon}>♡</span>
          <Link to="/login">
            <span style={styles.loginLink}>Log in</span>
          </Link>
          <Link to="/signup">
            <button className="btn-primary" style={styles.orderBtn}>Sign up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#fff',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    padding: '16px 0',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: 600,
    color: 'var(--rose-deep)',
  },
  links: {
    display: 'flex',
    gap: '24px',
    fontSize: '14px',
    color: 'var(--text-muted)',
  },
  activeLink: {
    color: 'var(--rose-deep)',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  search: {
    border: '1px solid #eee',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '13px',
    width: '160px',
  },
  icon: {
    fontSize: '18px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  loginLink: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  orderBtn: {
    padding: '10px 22px',
    fontSize: '14px',
  },
};