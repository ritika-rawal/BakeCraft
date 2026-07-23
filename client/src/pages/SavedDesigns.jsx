import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Icon from '../components/Icon';
import { cakeImageFor } from '../utils/cakeImages';
import { formatNpr } from '../utils/currency';

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
      image: design.image,
    };
    localStorage.setItem('bakecraft_draft_order', JSON.stringify(draftOrder));
    navigate('/checkout', { state: draftOrder });
  };

  return (
    <DashboardLayout>
      <h1 style={styles.pageTitle}>Saved Designs</h1>
      <p style={styles.pageSubtitle}>Your saved cake ideas - order one anytime.</p>

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
        <div className="saved-polaroid-grid" style={styles.grid}>
          {designs.map((d, index) => (
            <div
              key={d._id}
              className="saved-polaroid-card"
              style={{
                ...styles.card,
                transform: `rotate(${[-1.2, 1, -0.7, 1.3][index % 4]}deg)`,
              }}
            >
              <div style={styles.photoWrap}>
                <img src={d.image || cakeImageFor(`${d.name} ${d.flavor}`)} alt={`${d.name} cake design`} style={styles.thumb} />
                <button
                  type="button"
                  aria-label={`Unsave ${d.name}`}
                  title="Remove from saved designs"
                  style={styles.unsaveBtn}
                  onClick={() => handleDelete(d._id)}
                >
                  <Icon name="heart" size={14} style={{ fill: 'currentColor' }} />
                </button>
              </div>
              <div style={styles.body}>
                <p style={styles.name}>{d.name}</p>
                <p style={styles.details}>
                  {d.shape || 'Custom'} - {d.layers || 1} {(d.layers || 1) > 1 ? 'layers' : 'layer'} - {d.frosting || 'Baker selected'}
                </p>
                {d.toppings?.length > 0 && (
                  <p style={styles.toppings}>{d.toppings.join(', ')}</p>
                )}
                {d.message && <p style={styles.message}>"{d.message}"</p>}

                <div style={styles.footer}>
                  <p style={styles.price}>{formatNpr(d.total)}</p>
                  <button className="btn-primary" style={styles.orderBtn} onClick={() => handleReorder(d)}>
                    <Icon name="cart" size={13} /> Order This
                  </button>
                </div>
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 230px))',
    justifyContent: 'start',
    gap: '24px',
  },
  card: {
    background: '#fff',
    borderRadius: '6px',
    padding: '12px 12px 14px',
    boxShadow: '0 16px 32px rgba(42,27,34,0.10)',
    border: '1px solid rgba(139,41,66,0.05)',
    transformOrigin: 'center',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
  },
  photoWrap: {
    height: '205px',
    borderRadius: '3px',
    overflow: 'hidden',
    position: 'relative',
    background: '#f8eef1',
  },
  thumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  unsaveBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    padding: 0,
    background: 'var(--rose-deep)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(42,27,34,0.16)',
  },
  body: { padding: '12px 2px 0' },
  name: { fontSize: '15px', fontWeight: 700, marginBottom: '5px' },
  details: { fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize', marginBottom: '4px' },
  toppings: { fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' },
  message: { fontSize: '11.5px', color: 'var(--rose-mid)', fontStyle: 'italic', marginBottom: '8px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f6eef0' },
  price: { fontFamily: 'var(--font-display)', fontSize: '17px', color: 'var(--rose-deep)' },
  orderBtn: { padding: '9px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' },
};
