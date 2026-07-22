import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Icon from '../components/Icon';
import { cakeImageFor } from '../utils/cakeImages';

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: 'money' },
  { id: 'esewa', label: 'eSewa', icon: 'card' },
  { id: 'khalti', label: 'Khalti', icon: 'card' },
  { id: 'mobile', label: 'Mobile Banking', icon: 'store' },
];

const TIME_SLOTS = [
  'Morning (08:00 AM - 11:00 AM)',
  'Afternoon (12:00 PM - 03:00 PM)',
  'Evening (04:00 PM - 07:00 PM)',
];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [order] = useState(() => {
    if (location.state) return location.state;
    const savedDraft = localStorage.getItem('bakecraft_draft_order');
    return savedDraft ? JSON.parse(savedDraft) : null;
  });

  const [deliveryFee, setDeliveryFee] = useState(150); // fallback until real value loads

  useEffect(() => {
    fetch('http://localhost:5000/api/pricing')
      .then((res) => res.json())
      .then((data) => setDeliveryFee(data.pricing.deliveryFee))
      .catch(() => {}); // keep fallback if this fails
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Kathmandu');
  const [neighborhood, setNeighborhood] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [promoCode, setPromoCode] = useState('');
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState('');

  if (!order) {
    return (
      <DashboardLayout>
        <div style={styles.emptyState}>
          <p style={styles.emptyTitle}>No cake selected yet</p>
          <p style={styles.emptyText}>Head back to the Cake Builder to design your cake first.</p>
          <button className="btn-primary" onClick={() => navigate('/builder')}>
            Go to Cake Builder
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const subtotal = order.total;
  const discount = promoCode.trim().toUpperCase() === 'FIRSTCAKE' ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = subtotal + deliveryFee - discount;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setPlacing(true);

    try {
      const token = localStorage.getItem('bakecraft_token');
      if (!token) {
        throw new Error('Please log in before placing an order.');
      }

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cake: {
            shape: order.shape,
            layers: order.layers,
            flavor: order.flavor,
            frosting: order.frosting,
            toppings: order.toppings,
            message: order.message,
          },
          delivery: {
            firstName,
            lastName,
            contact,
            street,
            city,
            neighborhood,
            deliveryDate,
            timeSlot,
          },
          payment: {
            method: paymentMethod,
          },
          pricing: {
            subtotal,
            deliveryFee,
            discount,
            grandTotal,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order.');
      }

      localStorage.removeItem('bakecraft_draft_order');
      setPlaced(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return (
      <DashboardLayout>
        <div style={styles.emptyState}>
          <p style={styles.successIcon}><Icon name="check" size={40} /></p>
          <p style={styles.emptyTitle}>Order placed!</p>
          <p style={styles.emptyText}>
            Your cake is on its way to being baked. You'll get updates in Order Tracking.
          </p>
          <button className="btn-primary" onClick={() => navigate('/dashboard/customer')}>
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={styles.grid}>
        {/* Left: forms */}
        <form onSubmit={handlePlaceOrder} style={styles.column}>
          <div style={styles.card}>
            <p style={styles.cardTitle}><Icon name="pin" size={15} /> Delivery Details</p>

            <div style={styles.fieldRow}>
              <div style={styles.fieldHalf}>
                <label style={styles.label}>First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.fieldHalf}>
                <label style={styles.label}>Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <label style={styles.label}>Contact Number</label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+977 9800000000"
              style={styles.input}
              required
            />

            <label style={styles.label}>Street Address</label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="123 Bakery Lane"
              style={styles.input}
              required
            />

            <div style={styles.fieldRow}>
              <div style={styles.fieldHalf}>
                <label style={styles.label}>City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.fieldHalf}>
                <label style={styles.label}>Location/Neighborhood</label>
                <input
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Jhamsikhel"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.fieldRow}>
              <div style={styles.fieldHalf}>
                <label style={styles.label}>Delivery Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.fieldHalf}>
                <label style={styles.label}>Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  style={styles.select}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <p style={styles.cardTitle}><Icon name="card" size={15} /> Payment Method</p>
            <div style={styles.paymentGrid}>
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id)}
                  style={{
                    ...styles.paymentCard,
                    ...(paymentMethod === pm.id ? styles.paymentCardActive : {}),
                  }}
                >
                  <span style={styles.paymentIcon}><Icon name={pm.icon} size={18} /></span>
                  {pm.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p style={styles.errorText}>{error}</p>}
        </form>

        {/* Right: order summary */}
        <div style={styles.summaryCard}>
          <p style={styles.cardTitle}>Order Summary</p>

          <div style={styles.itemRow}>
            <img src={cakeImageFor(`${order.flavor} ${order.shape}`)} alt={`${order.flavor} cake`} style={styles.itemThumb} />
            <div style={styles.itemInfo}>
              <p style={styles.itemName}>
                {order.flavor} Cake ({order.layers} {order.layers > 1 ? 'Layers' : 'Layer'})
              </p>
              <p style={styles.itemSub}>{order.shape} shape, {order.frosting}</p>
            </div>
            <span style={styles.itemPrice}>NPR {(order.total * 133).toFixed(0)}</span>
          </div>

          <div style={styles.promoRow}>
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code (try FIRSTCAKE)"
              style={styles.promoInput}
            />
          </div>

          <div style={styles.divider} />

          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>NPR {(subtotal * 133).toFixed(0)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Delivery Fee</span>
            <span>NPR {deliveryFee}</span>
          </div>
          {discount > 0 && (
            <div style={{ ...styles.summaryRow, color: '#2E7D32' }}>
              <span>Discount (FIRSTCAKE)</span>
              <span>- NPR {(discount * 133).toFixed(0)}</span>
            </div>
          )}

          <div style={styles.summaryTotalRow}>
            <span>Grand Total</span>
            <span style={styles.totalValue}>
              NPR {((subtotal + deliveryFee / 133 - discount) * 133).toFixed(0)}
            </span>
          </div>
          <p style={styles.taxNote}>Inclusive of taxes</p>

          <button
            onClick={handlePlaceOrder}
            className="btn-primary"
            style={styles.placeOrderBtn}
            disabled={placing}
          >
            {placing ? 'Placing order...' : 'Place Order'}
          </button>
          <p style={styles.secureNote}><Icon name="lock" size={13} /> Secure checkout by BakeCraft Pay</p>

          <div style={styles.freshNote}>
            <Icon name="sparkle" size={13} /> Every cake is freshly baked and hand-delivered within your selected time slot to
            ensure maximum deliciousness.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--rose-deep)',
    marginBottom: '18px',
  },
  fieldRow: {
    display: 'flex',
    gap: '14px',
  },
  fieldHalf: {
    flex: 1,
  },
  label: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '6px',
    marginTop: '14px',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #eee',
    fontSize: '13.5px',
  },
  select: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #eee',
    fontSize: '13.5px',
    background: '#fff',
  },

  paymentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  paymentCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #eee',
    background: '#fff',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '13px',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    textAlign: 'left',
  },
  paymentCardActive: {
    border: '1px solid var(--rose-deep)',
    background: 'var(--pink-soft)',
  },
  paymentIcon: {
    fontSize: '18px',
  },

  errorText: {
    color: '#C1121F',
    fontSize: '13px',
    marginTop: '4px',
  },

  summaryCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
    position: 'sticky',
    top: '24px',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  itemThumb: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    objectFit: 'cover',
    display: 'block',
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: '13px',
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  itemSub: {
    fontSize: '11.5px',
    color: 'var(--text-muted)',
    textTransform: 'capitalize',
  },
  itemPrice: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-dark)',
  },
  promoRow: {
    marginBottom: '16px',
  },
  promoInput: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #eee',
    fontSize: '12.5px',
  },
  divider: {
    borderTop: '1px solid #f6eef0',
    margin: '10px 0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--text-muted)',
    padding: '6px 0',
  },
  summaryTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text-dark)',
    padding: '12px 0 2px',
    borderTop: '1px solid #f6eef0',
    marginTop: '8px',
  },
  totalValue: {
    color: 'var(--rose-deep)',
    fontSize: '18px',
  },
  taxNote: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textAlign: 'right',
    marginBottom: '18px',
  },
  placeOrderBtn: {
    width: '100%',
    padding: '15px',
    fontSize: '14.5px',
  },
  secureNote: {
    textAlign: 'center',
    fontSize: '11.5px',
    color: 'var(--text-muted)',
    marginTop: '10px',
  },
  freshNote: {
    marginTop: '18px',
    background: 'var(--pink-soft)',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '11.5px',
    color: 'var(--rose-deep)',
    lineHeight: 1.5,
  },

  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '13.5px',
    color: 'var(--text-muted)',
    marginBottom: '24px',
  },
  successIcon: {
    fontSize: '40px',
    color: 'var(--rose-deep)',
    marginBottom: '10px',
  },
};
