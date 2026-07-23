import { useState, useEffect, useRef } from 'react';
import BakerLayout from '../components/BakerLayout';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { apiUrl } from '../utils/api';

const STATUS_TRANSITIONS = {
  pending: ['pending', 'confirmed', 'cancelled'],
  confirmed: ['confirmed', 'baking', 'cancelled'],
  baking: ['baking', 'out-for-delivery', 'cancelled'],
  'out-for-delivery': ['out-for-delivery', 'delivered'],
  delivered: ['delivered'],
  cancelled: ['cancelled'],
};

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
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [newOrderNotice, setNewOrderNotice] = useState('');
  const knownOrderIds = useRef(new Set());
  const hasLoadedOrders = useRef(false);

  const user = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async (isInitialLoad = false) => {
      if (isInitialLoad) setLoading(true);
      try {
        const token = localStorage.getItem('bakecraft_token');
        const res = await fetch(apiUrl('/api/orders/all'), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load orders.');
        if (!isMounted) return;

        if (hasLoadedOrders.current) {
          const newOrders = data.orders.filter((order) => !knownOrderIds.current.has(order._id));
          if (newOrders.length > 0) {
            const latest = newOrders[0];
            setNewOrderNotice(
              newOrders.length === 1
                ? `New order from ${latest.delivery.firstName || 'a customer'}.`
                : `${newOrders.length} new orders received.`
            );
          }
        }

        knownOrderIds.current = new Set(data.orders.map((order) => order._id));
        hasLoadedOrders.current = true;
        setOrders(data.orders);
        setError('');
      } catch (err) {
        if (isMounted && isInitialLoad) setError(err.message);
      } finally {
        if (isMounted && isInitialLoad) setLoading(false);
      }
    };

    fetchOrders(true);
    const refreshInterval = setInterval(() => fetchOrders(false), 4000);

    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    setActionError('');
    setActionMessage('');
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch(apiUrl(`/api/orders/${orderId}/status`), {
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
      setActionMessage(`Order #${orderId.slice(-6).toUpperCase()} updated to ${STATUS_LABELS[newStatus]}.`);
    } catch (err) {
      setActionError(err.message);
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
      <div style={styles.pageHeadingRow}>
        <div>
          <h1 style={styles.pageTitle}>Welcome back{user?.name ? `, ${user.name}` : ''}</h1>
          <p style={styles.pageSubtitle}>Manage incoming orders and update their status.</p>
        </div>
        <span style={styles.liveStatus}><span style={styles.liveDot} /> Live orders</span>
      </div>

      {newOrderNotice && (
        <div className="status-banner status-banner-highlight" role="status">
          <Icon name="bell" size={16} />
          <span>{newOrderNotice}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setNewOrderNotice('')} style={styles.dismissBtn}><Icon name="close" size={15} /></button>
        </div>
      )}
      {actionMessage && <p className="status-banner status-banner-success" role="status"><Icon name="check" size={14} /> {actionMessage}</p>}
      {actionError && <p className="status-banner status-banner-error" role="alert">{actionError}</p>}
      {!loading && error && <p className="status-banner status-banner-error" role="alert">{error}</p>}

      <div className="baker-stats-grid" style={styles.statsGrid}>
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

      <div className="baker-table-card" style={styles.tableCard}>
        <p style={styles.cardTitle}>Incoming Orders</p>

        {loading && <p style={styles.stateText}>Loading orders...</p>}
        {!loading && !error && orders.length === 0 && (
          <p style={styles.stateText}>No orders yet.</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="baker-table" style={styles.table}>
            <div className="baker-table-header" style={styles.tableHeaderRow}>
              <span>Customer</span>
              <span>Cake</span>
              <span>Delivery</span>
              <span>Total</span>
              <span>Status</span>
            </div>

            {orders.map((order) => (
              <div key={order._id} className="baker-table-row" style={styles.tableRow}>
                <div className="baker-table-cell" data-label="Customer" style={styles.cellCustomer}>
                  <p style={styles.customerName}>
                    {order.delivery.firstName} {order.delivery.lastName}
                  </p>
                  <p style={styles.customerSub}>{order.user?.email}</p>
                </div>

                <div className="baker-table-cell" data-label="Cake">
                  <p style={styles.cakeName}>
                    {order.cake.flavor} ({order.cake.layers}L)
                  </p>
                  <p style={styles.cakeSub}>
                    {order.cake.shape} - {order.cake.frosting}
                  </p>
                </div>

                <div className="baker-table-cell" data-label="Delivery">
                  <p style={styles.deliveryDate}>{order.delivery.deliveryDate}</p>
                  <p style={styles.deliverySlot}>{order.delivery.timeSlot}</p>
                </div>

                <p className="baker-table-cell" data-label="Total" style={styles.price}>NPR {order.pricing.grandTotal.toFixed(0)}</p>

                <div className="baker-table-cell" data-label="Status" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  disabled={updatingId === order._id}
                  style={styles.statusSelect}
                   >
                   {STATUS_TRANSITIONS[order.status].map((s) => (
                   <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
                <Link to={`/baker/chat/${order._id}`} style={{ fontSize: '11.5px', color: 'var(--rose-deep)', textAlign: 'center' }}>
                <Icon name="message" size={13} /> Chat
                </Link>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BakerLayout>
  );
}

const styles = {
  pageHeadingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' },
  pageTitle: { fontSize: '22px', marginBottom: '6px' },
  pageSubtitle: { fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '28px' },
  liveStatus: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    background: '#fff',
    border: '1px solid #EADDE0',
    borderRadius: '999px',
    padding: '7px 12px',
    color: 'var(--text-muted)',
    fontSize: '11.5px',
    fontWeight: 600,
  },
  liveDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#2E7D32', boxShadow: '0 0 0 3px rgba(46,125,50,0.12)' },
  dismissBtn: { marginLeft: 'auto', border: 'none', background: 'transparent', color: 'inherit', fontSize: '18px', lineHeight: 1, cursor: 'pointer' },

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
