import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', icon: '⌂', path: '/dashboard/customer' },
  { label: 'Cake Builder', icon: '✎', path: '/builder' },
  { label: 'AI Generator', icon: '✦', path: '/ai-generator' },
  { label: 'Marketplace', icon: '⊞', path: '/#bakers' },
  { label: 'Chat', icon: '💬', path: '/chat' },
  { label: 'Order Tracking', icon: '◎', path: '/order-tracking' },
  { label: 'Checkout', icon: '🛒', path: '/checkout' },
  { label: 'Saved Designs', icon: '♡', path: '#' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('bakecraft_token');
    localStorage.removeItem('bakecraft_user');
    navigate('/login');
  };

  return (
    <aside style={{ ...styles.sidebar, width: collapsed ? '72px' : '230px' }}>
      <div style={styles.topRow}>
        <div style={styles.brand}>
          <img
            src="/logo-v2.png"
            alt="BakeCraft"
            style={collapsed ? styles.logoImgSmall : styles.logoImgLarge}
          />
        </div>
        <button onClick={onToggle} style={styles.toggleBtn}>
          {collapsed ? '»' : '«'}
        </button>
      </div>

      <nav style={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.label} to={item.path} style={{ textDecoration: 'none' }}>
            <div
              style={{
                ...styles.navItem,
                ...(location.pathname === item.path ? styles.navItemActive : {}),
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              title={collapsed ? item.label : undefined}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {!collapsed && item.label}
            </div>
          </Link>
        ))}
      </nav>

      <div style={styles.sidebarBottom}>
        <div style={{ ...styles.navItem, justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <span style={styles.navIcon}>⚙</span>
          {!collapsed && 'Settings'}
        </div>
        <div
          onClick={handleLogout}
          style={{ ...styles.navItem, justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <span style={styles.navIcon}>⏻</span>
          {!collapsed && 'Logout'}
        </div>
        <button className="btn-primary" style={styles.startBtn}>
          {collapsed ? '+' : '+ Start New Design'}
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    background: '#fff',
    borderRight: '1px solid #f1e5e8',
    padding: '24px 12px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s ease',
    overflow: 'hidden',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '32px',
    paddingLeft: '4px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'visible',
  },
  logoImgSmall: {
    width: '32px',
    height: '32px',
    objectFit: 'contain',
  },
  logoImgLarge: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain',
  },
  toggleBtn: {
    border: 'none',
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    fontSize: '11px',
    cursor: 'pointer',
    flexShrink: 0,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '10px',
    fontSize: '13.5px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  navItemActive: {
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    fontWeight: 500,
  },
  navIcon: {
    fontSize: '15px',
    width: '18px',
    textAlign: 'center',
    flexShrink: 0,
  },
  sidebarBottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginTop: '16px',
  },
  startBtn: {
    marginTop: '14px',
    fontSize: '13px',
    padding: '12px',
    whiteSpace: 'nowrap',
  },
};