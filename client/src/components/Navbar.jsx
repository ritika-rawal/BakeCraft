import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="landing-nav" style={styles.nav}>
      <div className="container landing-nav-inner" style={styles.inner}>
        <Link to="/"><span style={styles.logo}>BakeCraft</span></Link>
        <div className="landing-nav-links" style={styles.links}>
          <Link to="/" style={styles.activeLink}>Home</Link>
          <a href="#cakes" className="nav-link" style={styles.link}>Cakes</a>
          <Link to="/builder" className="nav-link" style={styles.link}>Cake builder</Link>
        </div>
        <div className="landing-nav-actions" style={styles.actions}>
          <Link to="/login">
            <span className="nav-link" style={styles.loginLink}>Log in</span>
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
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(139,41,66,0.06)',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  inner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' },
  logo: { fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: 'var(--rose-deep)' },
  links: { display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-muted)' },
  link: { transition: 'color var(--transition)' },
  activeLink: { color: 'var(--rose-deep)', fontWeight: 500 },
  actions: { display: 'flex', alignItems: 'center', gap: '18px' },
  loginLink: { fontSize: '14px', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color var(--transition)' },
  orderBtn: { padding: '10px 22px', fontSize: '14px' },
};
