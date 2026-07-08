export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.inner}>
        <span style={styles.logo}>BakeCraft</span>
        <div style={styles.links}>
          <a href="#home" style={styles.activeLink}>Home</a>
          <a href="#gallery">Gallery</a>
          <a href="#customize">Customize</a>
        </div>
        <div style={styles.actions}>
          <input placeholder="Search flavors..." style={styles.search} />
          <span style={styles.icon}>♡</span>
          <span style={styles.icon}>⊕</span>
          <button className="btn-primary" style={styles.orderBtn}>Order now</button>
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
    borderBottom: '2px solid var(--rose-deep)',
    paddingBottom: '4px',
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
  orderBtn: {
    padding: '10px 22px',
    fontSize: '14px',
  },
};