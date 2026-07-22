import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';

const NAV_ITEMS = [
  { label: 'Home', icon: 'home', path: '/dashboard/customer' },
  { label: 'Cake Builder', icon: 'edit', path: '/builder' },
  { label: 'AI Generator', icon: 'sparkle', path: '/ai-generator' },
  { label: 'Chat', icon: 'message', path: '/chat' },
  { label: 'Order Tracking', icon: 'track', path: '/order-tracking' },
  { label: 'Checkout', icon: 'cart', path: '/checkout' },
  { label: 'Saved Designs', icon: 'heart', path: '/saved-designs' },
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
          {collapsed ? '>' : '<'}
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
              <span style={styles.navIcon}><Icon name={item.icon} size={16} /></span>
              {!collapsed && item.label}
            </div>
          </Link>
        ))}
      </nav>

      <div style={styles.sidebarBottom}>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
        <div style={{ ...styles.navItem, justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <span style={styles.navIcon}><Icon name="settings" size={16} /></span>
            {!collapsed && 'Settings'}
         </div>
        </Link>
        <div
          onClick={handleLogout}
          style={{ ...styles.navItem, justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <span style={styles.navIcon}><Icon name="logout" size={16} /></span>
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
