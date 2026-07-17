import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

export default function SavedDesigns() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch('http://localhost:5000/api/saved-designs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load designs.');
      setDesigns(data.designs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch(`http://localhost:5000/api/saved-designs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete.');
      setDesigns((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReorder = (design) => {
    const draftOrder = {
      shape: design.shape,
      layers: design.layers,
      flavor: design.flavor,
      frosting: design.frosting,
      toppings: design.toppings,
      message: design.message,
      total: design.total,
    };
    localStorage.setItem('bakecraft_draft_order', JSON.stringify(draftOrder));
    navigate('/checkout', { state: draftOrder });
  };

  return (
    <DashboardLayout>
      <h1 style={styles.pageTitle}>Saved Designs</h1>
      <p style={styles.pageSubtitle}>Your saved cake ideas — order one anytime.</p>

      {loading && <p style={styles.stateText}>Loading...</p>}
      {!loading && error && <p style={styles.errorText}>{error}</p>}

      {!loading && !error && designs.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyTitle}>No saved designs yet</p>
          <p style={styles.emptyText}>Build a cake and click "Save Design" to keep it here.</p>
          <button className="btn-primary" onClick={() => navigate('/builder')}>
            Go to Cake Builder
          </button>
        </div>
      )}

      {!loading && !error && designs.length > 0 && (
        <div style={styles.grid}>
          {designs.map((d) => (
            <div key={d._id} style={styles.card}>
              <div style={styles.thumb} />
              <p style={styles.name}>{d.name}</p>
              <p style={styles.details}>
                {d.shape} · {d.layers} {d.layers > 1 ? 'layers' : 'layer'} · {d.frosting}
              </p>
              {d.toppings?.length > 0 && (
                <p style={styles.toppings}>{d.toppings.join(', ')}</p>
              )}
              {d.message && <p style={styles.message}>"{d.message}"</p>}
              <p style={styles.price}>${d.total?.toFixed(2)}</p>

              <div style={styles.actions}>
                <button className="btn-primary" style={styles.orderBtn} onClick={() => handleReorder(d)}>
                  Order This
                </button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(d._id)}>
                  🗑
                </button>
              </div>
            </div>
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

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '18px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  thumb: {
    height: '110px',
    borderRadius: '12px',
    background: 'var(--pink-soft)',
    marginBottom: '12px',
  },
  name: { fontSize: '14.5px', fontWeight: 600, marginBottom: '4px' },
  details: { fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize', marginBottom: '4px' },
  toppings: { fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' },
  message: { fontSize: '11.5px', color: 'var(--rose-mid)', fontStyle: 'italic', marginBottom: '8px' },
  price: { fontSize: '16px', fontWeight: 600, color: 'var(--rose-deep)', marginBottom: '12px' },
  actions: { display: 'flex', gap: '8px' },
  orderBtn: { flex: 1, padding: '9px', fontSize: '12.5px' },
  deleteBtn: {
    background: '#FDEBEC',
    color: '#C1121F',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 12px',
    fontSize: '13px',
    cursor: 'pointer',
  },
};