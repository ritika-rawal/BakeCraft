import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { apiUrl } from '../utils/api';

const STATUS_LABELS = {
  pending: 'Order placed',
  confirmed: 'Order confirmed',
  baking: 'Cake is baking',
  'out-for-delivery': 'Out for delivery',
  delivered: 'Order delivered',
  cancelled: 'Order cancelled',
};

export default function Header({ greeting, subtext, searchValue, onSearchChange }) {
  const user = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (user?.role !== 'customer') return undefined;
    let isMounted = true;

    const fetchOrderUpdates = async () => {
      try {
        const token = localStorage.getItem('bakecraft_token');
        const res = await fetch(apiUrl('/api/orders/my-orders'), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok || !isMounted) return;

        const latestOrders = data.orders.slice(0, 5);
        const messageResults = await Promise.all(
          latestOrders.map(async (order) => {
            const messageRes = await fetch(apiUrl(`/api/messages/${order._id}`), {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!messageRes.ok) return [];
            const messageData = await messageRes.json();
            return messageData.messages
              .filter((message) => message.senderRole === 'baker')
              .slice(-1)
              .map((message) => ({
                id: `message-${message._id}`,
                text: 'New message from Baker Admin',
                meta: `Order #${order._id.slice(-6).toUpperCase()}`,
                timestamp: message.createdAt,
              }));
          })
        );

        if (!isMounted) return;
        const orderEvents = latestOrders.map((order) => ({
          id: `order-${order._id}-${order.status}`,
          text: STATUS_LABELS[order.status] || order.status,
          meta: `Order #${order._id.slice(-6).toUpperCase()}`,
          timestamp: order.updatedAt,
        }));
        const latestNotifications = [...orderEvents, ...messageResults.flat()]
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 6);
        const seenIds = JSON.parse(localStorage.getItem('bakecraft_seen_notifications') || '[]');
        setNotifications(latestNotifications);
        setUnreadCount(latestNotifications.filter((item) => !seenIds.includes(item.id)).length);
      } catch (err) {
        // The rest of the dashboard remains usable if notification polling fails.
      }
    };

    fetchOrderUpdates();
    const interval = setInterval(fetchOrderUpdates, 8000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?.role]);

  const toggleNotifications = () => {
    const nextOpen = !notificationsOpen;
    setNotificationsOpen(nextOpen);
    if (nextOpen) {
      localStorage.setItem('bakecraft_seen_notifications', JSON.stringify(notifications.map((item) => item.id)));
      setUnreadCount(0);
    }
  };

  return (
    <div className="dashboard-header" style={styles.topbar}>
      <div>
        <p style={styles.greeting}>{greeting || `Hello, ${user?.name || 'there'}`}</p>
        <p style={styles.greetingSub}>{subtext || 'Ready for something sweet today?'}</p>
      </div>
      <div className="dashboard-header-actions" style={styles.topbarRight}>
        <div className="dashboard-search" style={styles.searchWrap}>
          <Icon name="search" size={15} style={styles.searchIcon} />
          <input
            value={searchValue || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search flavors, themes, or cakes..."
            style={styles.search}
          />
        </div>
        <div className="dashboard-notification-wrap" style={styles.notificationWrap}>
          <button
            type="button"
            className="icon-btn"
            style={styles.bell}
            aria-label={`Order notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={notificationsOpen}
            onClick={toggleNotifications}
          >
            <Icon name="bell" size={18} />
            {unreadCount > 0 && <span style={styles.notificationBadge}>{unreadCount}</span>}
          </button>
          {notificationsOpen && (
            <div style={styles.notificationPanel}>
              <div style={styles.notificationHeader}>
                <p style={styles.notificationTitle}>Order updates</p>
                <Link to="/order-tracking" style={styles.viewAll}>View all</Link>
              </div>
              {notifications.length === 0 ? (
                <p style={styles.notificationEmpty}>No order updates yet.</p>
              ) : notifications.map((notification) => (
                <Link key={notification.id} to="/order-tracking" style={styles.notificationItem}>
                  <span style={styles.notificationIcon}><Icon name="track" size={14} /></span>
                  <span>
                    <strong style={styles.notificationText}>{notification.text}</strong>
                    <small style={styles.notificationMeta}>{notification.meta}</small>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <div className="avatar-block dashboard-avatar-block" style={styles.avatarBlock}>
            <div style={styles.avatar} />
            <div>
              <p style={styles.avatarName}>{user?.name || 'Guest'}</p>
              <p style={styles.avatarTier}>
                {user?.role === 'baker' ? 'Baker Admin' : 'Gold Member'}
              </p>
            </div>
          </div>
        </Link>
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
    border: 'none',
    background: 'transparent',
    position: 'relative',
  },
  notificationWrap: { position: 'relative' },
  notificationBadge: {
    position: 'absolute',
    top: '-3px',
    right: '-3px',
    minWidth: '17px',
    height: '17px',
    borderRadius: '999px',
    background: 'var(--rose-deep)',
    color: '#fff',
    fontSize: '9px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
  },
  notificationPanel: {
    position: 'absolute',
    top: '44px',
    right: 0,
    width: '300px',
    background: '#fff',
    border: '1px solid #EEDFE3',
    borderRadius: '8px',
    boxShadow: '0 16px 36px rgba(42,27,34,0.14)',
    zIndex: 80,
    overflow: 'hidden',
  },
  notificationHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #F3E8EB' },
  notificationTitle: { fontSize: '13px', fontWeight: 700 },
  viewAll: { fontSize: '11.5px', color: 'var(--rose-deep)', fontWeight: 600 },
  notificationItem: { display: 'flex', gap: '10px', padding: '12px 16px', borderBottom: '1px solid #F7EFF1' },
  notificationIcon: { width: '30px', height: '30px', borderRadius: '50%', background: 'var(--pink-soft)', color: 'var(--rose-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  notificationText: { display: 'block', fontSize: '12px', color: 'var(--text-dark)' },
  notificationMeta: { display: 'block', fontSize: '10.5px', color: 'var(--text-muted)' },
  notificationEmpty: { padding: '20px 16px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' },
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
