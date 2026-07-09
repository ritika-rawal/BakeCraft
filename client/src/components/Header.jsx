export default function Header({ greeting, subtext }) {
  const user = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');

  return (
    <div style={styles.topbar}>
      <div>
        <p style={styles.greeting}>{greeting || `Hello, ${user?.name || 'there'} 👋`}</p>
        <p style={styles.greetingSub}>{subtext || 'Ready for something sweet today?'}</p>
      </div>
      <div style={styles.topbarRight}>
        <input placeholder="Search flavors, themes, or bakers..." style={styles.search} />
        <span style={styles.bell}>🔔</span>
        <div style={styles.avatarBlock}>
          <div style={styles.avatar} />
          <div>
            <p style={styles.avatarName}>{user?.name || 'Guest'}</p>
            <p style={styles.avatarTier}>
              {user?.role === 'baker' ? 'Baker Account' : 'Gold Member'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  greeting: {
    fontSize: '18px',
    fontWeight: 500,
    color: 'var(--text-dark)',
  },
  greetingSub: {
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  search: {
    border: '1px solid #eee',
    borderRadius: '20px',
    padding: '9px 16px',
    fontSize: '13px',
    width: '260px',
    background: '#fafafa',
  },
  bell: {
    fontSize: '17px',
    cursor: 'pointer',
  },
  avatarBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'var(--pink-soft)',
  },
  avatarName: {
    fontSize: '13px',
    fontWeight: 500,
  },
  avatarTier: {
    fontSize: '11px',
    color: 'var(--rose-mid)',
  },
};