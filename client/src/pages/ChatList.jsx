import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { cakeImageFor } from '../utils/cakeImages';

export default function ChatList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('bakecraft_token');
        const res = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load orders.');
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <DashboardLayout>
      <h1 style={styles.pageTitle}>Chats</h1>
      <p style={styles.pageSubtitle}>Message a baker about any of your orders.</p>

      {loading && <p style={styles.stateText}>Loading...</p>}
      {!loading && error && <p style={styles.errorText}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyTitle}>No conversations yet</p>
          <p style={styles.emptyText}>Place an order to start chatting with a baker.</p>
          <Link to="/builder"><button className="btn-primary">Design a Cake</button></Link>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div style={styles.list}>
          {orders.map((order) => (
            <Link key={order._id} to={`/chat/${order._id}`} style={{ textDecoration: 'none' }}>
              <div style={styles.row}>
                <img src={cakeImageFor(`${order.cake.flavor} ${order.cake.shape}`)} alt={`${order.cake.flavor} cake`} style={styles.thumb} />
                <div style={styles.info}>
                  <p style={styles.orderName}>
                    {order.cake.flavor} Cake - Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p style={styles.orderStatus}>Status: {order.status}</p>
                </div>
                <span style={styles.arrow}>Open</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

const styles = {
  pageTitle: { fontSize: '22px', marginBottom: '6px' },
  pageSubtitle: { fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '28px' },
  stateText: { fontSize: '14px', color: 'var(--text-muted)' },
  errorText: { fontSize: '14px', color: '#C1121F' },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    maxWidth: '380px',
    margin: '0 auto',
  },
  emptyTitle: { fontSize: '18px', fontWeight: 600, marginBottom: '8px' },
  emptyText: { fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '20px' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: '#fff',
    borderRadius: '14px',
    padding: '16px 18px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  thumb: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    objectFit: 'cover',
    display: 'block',
    flexShrink: 0,
  },
  info: { flex: 1 },
  orderName: { fontSize: '13.5px', fontWeight: 500, color: 'var(--text-dark)', textTransform: 'capitalize' },
  orderStatus: { fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize' },
  arrow: { fontSize: '16px', color: 'var(--rose-deep)' },
};
