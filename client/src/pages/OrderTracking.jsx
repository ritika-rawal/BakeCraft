import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Icon from '../components/Icon';
import { cakeImageFor } from '../utils/cakeImages';

const STATUS_STEPS = ['pending', 'confirmed', 'baking', 'out-for-delivery', 'delivered'];

const STATUS_LABELS = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  baking: 'Baking',
  'out-for-delivery': 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('bakecraft_token');
        if (!token) {
          throw new Error('Please log in to see your orders.');
        }

        const res = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to load orders.');
        }

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
      <h1 style={styles.pageTitle}>Order Tracking</h1>
      <p style={styles.pageSubtitle}>Track the status of your cake orders in real time.</p>

      {loading && <p style={styles.stateText}>Loading your orders...</p>}

      {!loading && error && <p style={styles.errorText}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyTitle}>No orders yet</p>
          <p style={styles.emptyText}>Once you place an order, you'll be able to track it here.</p>
          <Link to="/builder">
            <button className="btn-primary">Design a Cake</button>
          </Link>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div style={styles.list}>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

function OrderCard({ order }) {
  const isCancelled = order.status === 'cancelled';
  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div>
          <p style={styles.orderId}>Order #{order._id.slice(-6).toUpperCase()}</p>
          <p style={styles.orderDate}>Placed on {orderDate}</p>
        </div>
        <span
          style={{
            ...styles.statusBadge,
            ...(isCancelled ? styles.statusBadgeCancelled : {}),
          }}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div style={styles.cakeInfo}>
        <img src={cakeImageFor(`${order.cake.flavor} ${order.cake.shape}`)} alt={`${order.cake.flavor} cake`} style={styles.cakeThumb} />
        <div>
          <p style={styles.cakeName}>
            {order.cake.flavor} Cake ({order.cake.layers} {order.cake.layers > 1 ? 'Layers' : 'Layer'})
          </p>
          <p style={styles.cakeSub}>
            {order.cake.shape} shape - {order.cake.frosting}
            {order.cake.toppings?.length > 0 && ` - ${order.cake.toppings.join(', ')}`}
          </p>
        </div>
        <p style={styles.cakePrice}>NPR {order.pricing.grandTotal.toFixed(0)}</p>
      </div>

      {!isCancelled && (
        <div style={styles.progressRow}>
          {STATUS_STEPS.map((step, i) => (
            <div key={step} style={styles.progressStep}>
              <div
                style={{
                  ...styles.progressDot,
                  ...(i <= currentStepIndex ? styles.progressDotActive : {}),
                }}
              />
              <p
                style={{
                  ...styles.progressLabel,
                  ...(i <= currentStepIndex ? styles.progressLabelActive : {}),
                }}
              >
                {STATUS_LABELS[step]}
              </p>
              {i < STATUS_STEPS.length - 1 && (
                <div
                  style={{
                    ...styles.progressLine,
                    ...(i < currentStepIndex ? styles.progressLineActive : {}),
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div style={styles.deliveryInfo}>
        <span><Icon name="pin" size={13} /> {order.delivery.street}, {order.delivery.neighborhood}, {order.delivery.city}</span>
        <span><Icon name="clock" size={13} /> {order.delivery.deliveryDate} - {order.delivery.timeSlot}</span>
      </div>

      <Link to={`/chat/${order._id}`}>
        <button style={styles.chatBtn}><Icon name="message" size={14} /> Message Baker</button>
      </Link>
    </div>
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

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '18px',
  },
  orderId: { fontSize: '14px', fontWeight: 600 },
  orderDate: { fontSize: '12px', color: 'var(--text-muted)' },
  statusBadge: {
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    fontSize: '11.5px',
    fontWeight: 500,
    padding: '6px 14px',
    borderRadius: '16px',
  },
  statusBadgeCancelled: {
    background: '#FDEBEC',
    color: '#C1121F',
  },

  cakeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    paddingBottom: '18px',
    borderBottom: '1px solid #f6eef0',
    marginBottom: '18px',
  },
  cakeThumb: {
    width: '52px',
    height: '52px',
    borderRadius: '12px',
    objectFit: 'cover',
    display: 'block',
    flexShrink: 0,
  },
  cakeName: {
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  cakeSub: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    textTransform: 'capitalize',
  },
  cakePrice: {
    marginLeft: 'auto',
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--rose-deep)',
  },

  progressRow: {
    display: 'flex',
    marginBottom: '18px',
  },
  progressStep: {
    flex: 1,
    position: 'relative',
    textAlign: 'center',
  },
  progressDot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: '#eee',
    margin: '0 auto 8px',
    position: 'relative',
    zIndex: 1,
  },
  progressDotActive: {
    background: 'var(--rose-deep)',
  },
  progressLabel: {
    fontSize: '10.5px',
    color: 'var(--text-muted)',
  },
  progressLabelActive: {
    color: 'var(--rose-deep)',
    fontWeight: 500,
  },
  progressLine: {
    position: 'absolute',
    top: '6px',
    left: '50%',
    width: '100%',
    height: '2px',
    background: '#eee',
    zIndex: 0,
  },
  progressLineActive: {
    background: 'var(--rose-deep)',
  },

  deliveryInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '14px',
  },

  chatBtn: {
    width: '100%',
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    border: 'none',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '12.5px',
    fontWeight: 500,
    cursor: 'pointer',
  },
};
