import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/#bakers?search=${encodeURIComponent(searchTerm)}`);
      document.getElementById('bakers')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.inner}>
        <Link to="/"><span style={styles.logo}>BakeCraft</span></Link>
        <div style={styles.links}>
          <Link to="/" style={styles.activeLink}>Home</Link>
          <a href="#bakers" className="nav-link" style={styles.link}>Bakers</a>
          <Link to="/builder" className="nav-link" style={styles.link}>Cake builder</Link>
        </div>
        <div style={styles.actions}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <SearchIcon style={styles.searchIcon} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search flavors..."
              style={styles.search}
            />
          </form>
          <span className="icon-btn" style={styles.iconBtn}><HeartIcon /></span>
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

function HeartIcon(props) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M20.8 4.6c-1.9-1.9-5-1.9-6.9 0L12 5.5l-1.9-.9c-1.9-1.9-5-1.9-6.9 0-1.9 1.9-1.9 5 0 6.9L12 20.8l8.8-8.8c1.9-1.9 1.9-5 0-6.9z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
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
  searchForm: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: '14px', color: 'var(--text-muted)', pointerEvents: 'none' },
  search: {
    border: '1px solid #eee',
    borderRadius: 'var(--radius-pill)',
    padding: '9px 16px 9px 36px',
    fontSize: '13px',
    width: '170px',
    background: '#fdfafb',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'background var(--transition), color var(--transition)',
  },
  loginLink: { fontSize: '14px', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color var(--transition)' },
  orderBtn: { padding: '10px 22px', fontSize: '14px' },
};