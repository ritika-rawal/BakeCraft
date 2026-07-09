import { useState, useMemo } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const SHAPES = [
  { id: 'round', label: 'Round', icon: '○' },
  { id: 'heart', label: 'Heart', icon: '♡' },
  { id: 'square', label: 'Square', icon: '□' },
];

const FLAVORS = [
  { id: 'vanilla', label: 'Vanilla', price: 0 },
  { id: 'strawberry', label: 'Strawberry', price: 0 },
  { id: 'dark-chocolate', label: 'Dark Chocolate', price: 5 },
  { id: 'red-velvet', label: 'Red Velvet', price: 5 },
  { id: 'white-forest', label: 'White Forest', price: 8 },
  { id: 'black-forest', label: 'Black Forest', price: 8 },
];

const FROSTINGS = ['Swiss Meringue Cream', 'Classic Buttercream', 'Fresh Whipped Cream'];

const TOPPINGS = [
  { id: 'sprinkles', label: 'Sprinkles', price: 2 },
  { id: 'berries', label: 'Berries', price: 4 },
  { id: 'flowers', label: 'Flowers', price: 5 },
  { id: 'chocolate', label: 'Chocolate', price: 3 },
  { id: 'pearls', label: 'Pearls', price: 3 },
  { id: 'fruits', label: 'Fruits', price: 4 },
];

const FLAVOR_COLORS = {
  vanilla: '#F5E6C8',
  strawberry: '#F4B8C4',
  'dark-chocolate': '#4A2C1A',
  'red-velvet': '#8B1E3F',
  'white-forest': '#FFF8F0',
  'black-forest': '#2E1A12',
};

const FROSTING_COLORS = {
  'Swiss Meringue Cream': '#FFF8F0',
  'Classic Buttercream': '#FFE9C7',
  'Fresh Whipped Cream': '#FFFFFF',
};

const BASE_PRICE_PER_LAYER = 20;

export default function CakeBuilder() {
  const [shape, setShape] = useState('round');
  const [layers, setLayers] = useState(2);
  const [flavor, setFlavor] = useState(FLAVORS[0]);
  const [frosting, setFrosting] = useState(FROSTINGS[0]);
  const [toppings, setToppings] = useState([]);
  const [message, setMessage] = useState('');

  const toggleTopping = (id) => {
    setToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const pricing = useMemo(() => {
    const base = layers * BASE_PRICE_PER_LAYER + 5;
    const toppingsTotal = toppings.reduce((sum, id) => {
      const t = TOPPINGS.find((x) => x.id === id);
      return sum + (t?.price || 0);
    }, 0);
    const total = base + flavor.price + toppingsTotal;
    return { base, toppingsTotal, total };
  }, [layers, flavor, toppings]);

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div style={styles.topbar}>
        <h1 style={styles.pageTitle}>Custom Cake Studio</h1>
        <div style={styles.topbarRight}>
          <span style={styles.pickupBadge}>🕓 Estimated Pickup: Tomorrow, 2:00 PM</span>
          <span style={styles.icon}>♡</span>
          <span style={styles.icon}>🔔</span>
          <div style={styles.avatar} />
        </div>
      </div>

      <div style={styles.grid}>
        {/* Left column */}
        <div style={styles.column}>
          <div style={styles.card}>
            <p style={styles.cardTitle}>🍰 Base Structure</p>

            <p style={styles.label}>Cake Shape</p>
            <div style={styles.shapeRow}>
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShape(s.id)}
                  style={{ ...styles.shapeBtn, ...(shape === s.id ? styles.shapeBtnActive : {}) }}
                >
                  <span style={styles.shapeIcon}>{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>

            <p style={styles.label}>
              Cake Layers <span style={styles.labelBold}>{layers} Layers</span>
            </p>
            <input
              type="range"
              min="1"
              max="4"
              value={layers}
              onChange={(e) => setLayers(Number(e.target.value))}
              style={styles.slider}
            />

            <p style={styles.label}>Cake Flavor</p>
            <div style={styles.flavorGrid}>
              {FLAVORS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFlavor(f)}
                  style={{ ...styles.flavorBtn, ...(flavor.id === f.id ? styles.flavorBtnActive : {}) }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <p style={styles.cardTitle}>🎀 Frosting Style</p>
            {FROSTINGS.map((f) => (
              <label key={f} style={styles.radioRow}>
                <input
                  type="radio"
                  name="frosting"
                  checked={frosting === f}
                  onChange={() => setFrosting(f)}
                  style={styles.radio}
                />
                {f}
              </label>
            ))}
          </div>
        </div>

        {/* Center column */}
        <div style={styles.column}>
          <div style={styles.previewCard}>
  <div style={styles.previewHeader}>
    <span>🔄 Live 3D Preview</span>
  </div>
  <div style={styles.previewCircleWrap}>
    <svg width="220" height="220" viewBox="0 0 220 220">
      <defs>
        <clipPath id="previewClip">
          {shape === 'round' && <circle cx="110" cy="110" r="105" />}
          {shape === 'square' && <rect x="10" y="10" width="200" height="200" rx="16" />}
          {shape === 'heart' && (
            <path d="M110 190 C40 140 10 90 40 55 C60 30 95 35 110 65 C125 35 160 30 180 55 C210 90 180 140 110 190 Z" />
          )}
        </clipPath>
      </defs>

      <g clipPath="url(#previewClip)">
        <rect x="0" y="0" width="220" height="220" fill={FLAVOR_COLORS[flavor.id]} />
        <rect x="0" y="0" width="220" height="60" fill={FROSTING_COLORS[frosting]} />

        {toppings.includes('sprinkles') &&
          Array.from({ length: 18 }).map((_, i) => (
            <rect
              key={i}
              x={20 + (i % 9) * 22}
              y={20 + Math.floor(i / 9) * 14}
              width="4"
              height="4"
              fill={['#E24B4A', '#378ADD', '#F9C74F', '#43AA8B'][i % 4]}
              transform={`rotate(${i * 37} ${20 + (i % 9) * 22} ${20 + Math.floor(i / 9) * 14})`}
            />
          ))}

        {toppings.includes('berries') &&
          Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx={40 + i * 35} cy="35" r="7" fill="#C1121F" />
          ))}

        {toppings.includes('chocolate') &&
          Array.from({ length: 4 }).map((_, i) => (
            <path
              key={i}
              d={`M${30 + i * 45} 15 Q${45 + i * 45} 5 ${60 + i * 45} 20`}
              stroke="#3B2415"
              strokeWidth="4"
              fill="none"
            />
          ))}

        {toppings.includes('pearls') &&
          Array.from({ length: 10 }).map((_, i) => (
            <circle key={i} cx={20 + i * 20} cy="55" r="3" fill="#F5F0E8" />
          ))}

        {toppings.includes('flowers') &&
          [50, 110, 170].map((cx, i) => (
            <g key={i} transform={`translate(${cx}, 30)`}>
              <circle cx="0" cy="0" r="4" fill="#F9C74F" />
              <circle cx="-6" cy="-3" r="4" fill="#F4B8C4" />
              <circle cx="6" cy="-3" r="4" fill="#F4B8C4" />
              <circle cx="-4" cy="4" r="4" fill="#F4B8C4" />
              <circle cx="4" cy="4" r="4" fill="#F4B8C4" />
            </g>
          ))}

        {toppings.includes('fruits') &&
          Array.from({ length: 4 }).map((_, i) => (
            <circle key={i} cx={45 + i * 40} cy="40" r="6" fill="#F77F00" />
          ))}
      </g>

      {message && (
        <text
          x="110"
          y="115"
          textAnchor="middle"
          fontSize="11"
          fontFamily="Work Sans, sans-serif"
          fill="#3B2415"
        >
          {message}
        </text>
      )}
    </svg>
  </div>
  <div style={styles.previewActions}>
    <span style={styles.previewIcon}>🔍</span>
    <span style={styles.previewIcon}>📷</span>
    <span style={styles.previewIcon}>🔄</span>
  </div>
</div>
        </div>

        {/* Right column */}
        <div style={styles.column}>
          <div style={styles.card}>
            <p style={styles.cardTitle}>✨ Toppings</p>
            <div style={styles.toppingRow}>
              {TOPPINGS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggleTopping(t.id)}
                  style={{ ...styles.toppingTag, ...(toppings.includes(t.id) ? styles.toppingTagActive : {}) }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p style={styles.label}>Cake Message (Text)</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              maxLength={40}
              style={styles.textarea}
            />
          </div>

          <div style={styles.summaryCard}>
            <p style={styles.cardTitle}>Order Summary</p>
            <div style={styles.summaryRow}>
              <span>Base Cake ({layers} Layers)</span>
              <span>${pricing.base.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Flavor: {flavor.label}</span>
              <span>+${flavor.price.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Toppings</span>
              <span>+${pricing.toppingsTotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Custom Text</span>
              <span>{message ? 'Included' : 'None'}</span>
            </div>
            <div style={styles.summaryTotalRow}>
              <span>Total</span>
              <span style={styles.totalValue}>${pricing.total.toFixed(2)}</span>
            </div>

            <button className="btn-primary" style={styles.orderBtn}>
              🛒 Order This Cake
            </button>
            <button style={styles.saveBtn}>💾 Save Design</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
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
  pageTitle: {
    fontSize: '20px',
  },

  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  pickupBadge: {
    background: '#fff',
    border: '1px solid #f1e5e8',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '12.5px',
    color: 'var(--text-muted)',
  },
  icon: {
    fontSize: '17px',
    cursor: 'pointer',
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'var(--pink-soft)',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr 1.1fr',
    gap: '20px',
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
    padding: '20px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--rose-deep)',
    marginBottom: '16px',
  },
  label: {
    fontSize: '12.5px',
    color: 'var(--text-muted)',
    marginTop: '18px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  labelBold: {
    color: 'var(--rose-deep)',
    fontWeight: 600,
  },

  shapeRow: {
    display: 'flex',
    gap: '8px',
  },
  shapeBtn: {
    flex: 1,
    border: '1px solid #eee',
    background: '#fff',
    borderRadius: '10px',
    padding: '10px 4px',
    fontSize: '11.5px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  shapeBtnActive: {
    border: '1px solid var(--rose-deep)',
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
  },
  shapeIcon: {
    fontSize: '16px',
  },

  slider: {
    width: '100%',
    accentColor: 'var(--rose-deep)',
  },

  flavorGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  flavorBtn: {
    border: '1px solid #eee',
    background: '#fff',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '12.5px',
    color: 'var(--text-dark)',
    cursor: 'pointer',
  },
  flavorBtnActive: {
    border: '1px solid var(--rose-deep)',
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    fontWeight: 500,
  },

  radioRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    color: 'var(--text-dark)',
    padding: '10px 0',
    cursor: 'pointer',
  },
  radio: {
    accentColor: 'var(--rose-deep)',
    width: '15px',
    height: '15px',
  },

  previewCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  previewHeader: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-dark)',
    marginBottom: '20px',
    alignSelf: 'flex-start',
  },
  previewCircleWrap: {
  marginBottom: '20px',
},
  previewActions: {
  display: 'flex',
  gap: '20px',
},

previewIcon: {
  fontSize: '16px',
  cursor: 'pointer',
  color: 'var(--text-muted)',
},
  toppingRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '8px',
  },
  toppingTag: {
    border: '1px solid #eee',
    background: '#fdf6f7',
    borderRadius: '16px',
    padding: '7px 14px',
    fontSize: '12px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  toppingTagActive: {
    background: 'var(--rose-deep)',
    color: '#fff',
    border: '1px solid var(--rose-deep)',
  },
  textarea: {
    width: '100%',
    minHeight: '70px',
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #eee',
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
    resize: 'none',
  },

  summaryCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--text-muted)',
    padding: '8px 0',
    borderBottom: '1px solid #f6eef0',
  },
  summaryTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-dark)',
    padding: '12px 0',
  },
  totalValue: {
    color: 'var(--rose-deep)',
    fontSize: '17px',
  },
  orderBtn: {
    width: '100%',
    marginTop: '10px',
  },
  saveBtn: {
    width: '100%',
    marginTop: '10px',
    background: 'transparent',
    border: '1px solid var(--rose-deep)',
    color: 'var(--rose-deep)',
    padding: '13px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
};