import { useState, useEffect } from 'react';
import BakerLayout from '../components/BakerLayout';

export default function BakerPricing() {
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/pricing')
      .then((res) => res.json())
      .then((data) => setPricing(data.pricing))
      .catch(() => setError('Failed to load pricing.'))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (field, value) => {
    setPricing((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateFlavorPrice = (id, price) => {
    setPricing((prev) => ({
      ...prev,
      flavors: prev.flavors.map((f) => (f.id === id ? { ...f, price: Number(price) } : f)),
    }));
    setSaved(false);
  };

  const updateToppingPrice = (id, price) => {
    setPricing((prev) => ({
      ...prev,
      toppings: prev.toppings.map((t) => (t.id === id ? { ...t, price: Number(price) } : t)),
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch('http://localhost:5000/api/pricing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pricing),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save.');
      setPricing(data.pricing);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <BakerLayout>
        <p style={styles.stateText}>Loading pricing...</p>
      </BakerLayout>
    );
  }

  return (
    <BakerLayout>
      <h1 style={styles.pageTitle}>Pricing & Menu</h1>
      <p style={styles.pageSubtitle}>
        Set prices for cake layers, flavors, toppings, and delivery. Changes apply instantly to the Cake Builder.
      </p>

      {error && <p style={styles.errorText}>{error}</p>}

      <div style={styles.card}>
        <p style={styles.cardTitle}>Base Pricing</p>
        <div style={styles.fieldRow}>
          <div style={styles.fieldHalf}>
            <label style={styles.label}>Price per layer (USD)</label>
            <input
              type="number"
              value={pricing.basePricePerLayer}
              onChange={(e) => updateField('basePricePerLayer', Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldHalf}>
            <label style={styles.label}>Flat base fee (USD)</label>
            <input
              type="number"
              value={pricing.baseFlatFee}
              onChange={(e) => updateField('baseFlatFee', Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldHalf}>
            <label style={styles.label}>Delivery fee (NPR)</label>
            <input
              type="number"
              value={pricing.deliveryFee}
              onChange={(e) => updateField('deliveryFee', Number(e.target.value))}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <p style={styles.cardTitle}>Flavor Prices (add-on cost, USD)</p>
        <div style={styles.grid2}>
          {pricing.flavors.map((f) => (
            <div key={f.id} style={styles.itemRow}>
              <span style={styles.itemLabel}>{f.label}</span>
              <input
                type="number"
                value={f.price}
                onChange={(e) => updateFlavorPrice(f.id, e.target.value)}
                style={styles.smallInput}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <p style={styles.cardTitle}>Topping Prices (add-on cost, USD)</p>
        <div style={styles.grid2}>
          {pricing.toppings.map((t) => (
            <div key={t.id} style={styles.itemRow}>
              <span style={styles.itemLabel}>{t.label}</span>
              <input
                type="number"
                value={t.price}
                onChange={(e) => updateToppingPrice(t.id, e.target.value)}
                style={styles.smallInput}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="btn-primary" onClick={handleSave} disabled={saving} style={styles.saveBtn}>
        {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
      </button>
    </BakerLayout>
  );
}

const styles = {
  pageTitle: { fontSize: '22px', marginBottom: '6px' },
  pageSubtitle: { fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '24px' },
  stateText: { fontSize: '14px', color: 'var(--text-muted)' },
  errorText: { fontSize: '13px', color: '#C1121F', marginBottom: '16px' },

  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
    marginBottom: '20px',
  },
  cardTitle: { fontSize: '14px', fontWeight: 600, color: 'var(--rose-deep)', marginBottom: '16px' },

  fieldRow: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  fieldHalf: { flex: 1, minWidth: '140px' },
  label: { display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #eee',
    fontSize: '13.5px',
  },

  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fdf6f7',
    borderRadius: '10px',
    padding: '10px 14px',
  },
  itemLabel: { fontSize: '13px', color: 'var(--text-dark)' },
  smallInput: {
    width: '70px',
    padding: '6px 8px',
    borderRadius: '6px',
    border: '1px solid #eee',
    fontSize: '13px',
    textAlign: 'right',
  },

  saveBtn: { padding: '14px 32px' },
};