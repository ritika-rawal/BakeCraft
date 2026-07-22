import { Link } from 'react-router-dom';

export default function Header({ greeting, subtext, searchValue, onSearchChange }) {
  const user = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');

  return (
    <div style={styles.topbar}>
      <div>
        <p style={styles.greeting}>{greeting || `Hello, ${user?.name || 'there'}`}</p>
        <p style={styles.greetingSub}>{subtext || 'Ready for something sweet today?'}</p>
      </div>
      <div style={styles.topbarRight}>
        <div style={styles.searchWrap}>
          <SearchIcon style={styles.searchIcon} />
          <input
            value={searchValue || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search flavors, themes, or bakers..."
            style={styles.search}
          />
        </div>
        <span className="icon-btn" style={styles.bell}><BellIcon /></span>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <div className="avatar-block" style={styles.avatarBlock}>
            <div style={styles.avatar} />
            <div>
              <p style={styles.avatarName}>{user?.name || 'Guest'}</p>
              <p style={styles.avatarTier}>
                {user?.role === 'baker' ? 'Baker Account' : 'Gold Member'}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function BellIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  greeting: { fontSize: '18px', fontWeight: 500, color: 'var(--text-dark)' },
  greetingSub: { fontSize: '13px', color: 'var(--text-muted)' },
  topbarRight: { display: 'flex', alignItems: 'center', gap: '18px' },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: '14px', color: 'var(--text-muted)', pointerEvents: 'none' },
  search: {
    border: '1px solid #eee',
    borderRadius: 'var(--radius-pill)',
    padding: '9px 16px 9px 36px',
    fontSize: '13px',
    width: '260px',
    background: '#fafafa',
  },
  bell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  avatarBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '6px 10px 6px 6px',
    borderRadius: 'var(--radius-pill)',
    transition: 'background var(--transition)',
  },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pink-soft)' },
  avatarName: { fontSize: '13px', fontWeight: 500 },
  avatarTier: { fontSize: '11px', color: 'var(--rose-mid)' },
};
