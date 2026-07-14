import { useState, useEffect } from 'react';
import BakerLayout from '../components/BakerLayout';

const STATUS_OPTIONS = ['pending', 'confirmed', 'baking', 'out-for-delivery', 'delivered', 'cancelled'];

const STATUS_LABELS = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  baking: 'Baking',
  'out-for-delivery': 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function BakerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const user = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch('http://localhost:5000/api/orders/all', {
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

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status.');

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    active: orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <BakerLayout>
      <h1 style={styles.pageTitle}>Welcome back{user?.name ? `, ${user.name}` : ''}</h1>
      <p style={styles.pageSubtitle}>Manage incoming orders and update their status.</p>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Orders</p>
          <p style={styles.statValue}>{stats.total}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>New / Pending</p>
          <p style={styles.statValue}>{stats.pending}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>In Progress</p>
          <p style={styles.statValue}>{stats.active}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Delivered</p>
          <p style={styles.statValue}>{stats.delivered}</p>
        </div>
      </div>

      <div style={styles.tableCard}>
        <p style={styles.cardTitle}>Incoming Orders</p>

        {loading && <p style={styles.stateText}>Loading orders...</p>}
        {!loading && error && <p style={styles.errorText}>{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p style={styles.stateText}>No orders yet.</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div style={styles.table}>
            <div style={styles.tableHeaderRow}>
              <span>Customer</span>
              <span>Cake</span>
              <span>Delivery</span>
              <span>Total</span>
              <span>Status</span>
            </div>

            {orders.map((order) => (
              <div key={order._id} style={styles.tableRow}>
                <div style={styles.cellCustomer}>
                  <p style={styles.customerName}>
                    {order.delivery.firstName} {order.delivery.lastName}
                  </p>
                  <p style={styles.customerSub}>{order.user?.email}</p>
                </div>

                <div>
                  <p style={styles.cakeName}>
                    {order.cake.flavor} ({order.cake.layers}L)
                  </p>
                  <p style={styles.cakeSub}>
                    {order.cake.shape} · {order.cake.frosting}
                  </p>
                </div>

                <div>
                  <p style={styles.deliveryDate}>{order.delivery.deliveryDate}</p>
                  <p style={styles.deliverySlot}>{order.delivery.timeSlot}</p>
                </div>

                <p style={styles.price}>NPR {order.pricing.grandTotal.toFixed(0)}</p>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  disabled={updatingId === order._id}
                  style={styles.statusSelect}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </BakerLayout>
  );
}

const styles = {
  pageTitle: { fontSize: '22px', marginBottom: '6px' },
  pageSubtitle: { fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '28px' },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '28px',
  },
  statCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  statLabel: { fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '8px' },
  statValue: { fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--rose-deep)' },

  tableCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  cardTitle: { fontSize: '15px', fontWeight: 600, marginBottom: '18px' },
  stateText: { fontSize: '13.5px', color: 'var(--text-muted)' },
  errorText: { fontSize: '13.5px', color: '#C1121F' },

  table: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableHeaderRow: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1.2fr 1fr 0.8fr 1.2fr',
    fontSize: '11.5px',
    color: 'var(--text-muted)',
    fontWeight: 600,
    textTransform: 'uppercase',
    paddingBottom: '12px',
    borderBottom: '1px solid #f6eef0',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1.2fr 1fr 0.8fr 1.2fr',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid #f6eef0',
    fontSize: '13px',
  },
  cellCustomer: {},
  customerName: { fontWeight: 500 },
  customerSub: { fontSize: '11.5px', color: 'var(--text-muted)' },
  cakeName: { fontWeight: 500, textTransform: 'capitalize' },
  cakeSub: { fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'capitalize' },
  deliveryDate: { fontWeight: 500 },
  deliverySlot: { fontSize: '11px', color: 'var(--text-muted)' },
  price: { fontWeight: 600, color: 'var(--rose-deep)' },
  statusSelect: {
    border: '1px solid #eee',
    borderRadius: '20px',
    padding: '8px 12px',
    fontSize: '12px',
    background: '#fff',
    color: 'var(--text-dark)',
    cursor: 'pointer',
  },
};