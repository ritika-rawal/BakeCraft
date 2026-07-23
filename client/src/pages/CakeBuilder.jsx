import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Icon from '../components/Icon';
import { formatNpr } from '../utils/currency';
import { apiUrl } from '../utils/api';

const SHAPES = [
  { id: 'round', label: 'Round', icon: 'track' },
  { id: 'heart', label: 'Heart', icon: 'heart' },
  { id: 'square', label: 'Square', icon: 'package' },
];

const FROSTINGS = ['Swiss Meringue Cream', 'Classic Buttercream', 'Fresh Whipped Cream'];

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

export default function CakeBuilder() {
  const navigate = useNavigate();

  const [pricingConfig, setPricingConfig] = useState(null);
  const [loadingPricing, setLoadingPricing] = useState(true);
  const [pricingError, setPricingError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [shape, setShape] = useState('round');
  const [layers, setLayers] = useState(2);
  const [flavor, setFlavor] = useState(null);
  const [frosting, setFrosting] = useState(FROSTINGS[0]);
  const [toppings, setToppings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(apiUrl('/api/pricing'))
      .then((res) => res.json())
      .then((data) => {
        setPricingConfig(data.pricing);
        setFlavor(data.pricing.flavors[0]);
      })
      .catch(() => setPricingError('Could not load current pricing. Using defaults may be inaccurate.'))
      .finally(() => setLoadingPricing(false));
  }, []);

  const toggleTopping = (id) => {
    setToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const pricing = useMemo(() => {
    if (!pricingConfig || !flavor) {
      return { base: 0, toppingsTotal: 0, total: 0 };
    }
    const base = layers * pricingConfig.basePricePerLayer + pricingConfig.baseFlatFee;
    const toppingsTotal = toppings.reduce((sum, id) => {
      const t = pricingConfig.toppings.find((x) => x.id === id);
      return sum + (t?.price || 0);
    }, 0);
    const total = base + flavor.price + toppingsTotal;
    return { base, toppingsTotal, total };
  }, [layers, flavor, toppings, pricingConfig]);

  const handleOrder = () => {
    const draftOrder = {
      shape,
      layers,
      flavor: flavor.label,
      frosting,
      toppings: toppings.map((id) => pricingConfig.toppings.find((t) => t.id === id)?.label),
      message,
      total: pricing.total,
    };

    localStorage.setItem('bakecraft_draft_order', JSON.stringify(draftOrder));
    navigate('/checkout', { state: draftOrder });
  };

  const handleSaveDesign = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      const token = localStorage.getItem('bakecraft_token');
      if (!token) {
        throw new Error('Please log in to save a design.');
      }

      const res = await fetch(apiUrl('/api/saved-designs'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: `${flavor.label} Cake`,
          shape,
          layers,
          flavor: flavor.label,
          frosting,
          toppings: toppings.map((id) => pricingConfig.toppings.find((t) => t.id === id)?.label),
          message,
          total: pricing.total,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save design.');

      setSaveMessage('Saved!');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (err) {
      setSaveMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loadingPricing) {
    return (
      <DashboardLayout>
        <p style={styles.stateText}>Loading cake builder...</p>
      </DashboardLayout>
    );
  }

  if (!pricingConfig || !flavor) {
    return (
      <DashboardLayout>
        <p style={styles.errorText}>
          {pricingError || 'Something went wrong loading the cake builder. Please refresh.'}
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div className="builder-topbar" style={styles.topbar}>
        <h1 style={styles.pageTitle}>Custom Cake Studio</h1>
        <div className="builder-topbar-actions" style={styles.topbarRight}>
          <span style={styles.pickupBadge}><Icon name="clock" size={15} /> Estimated Pickup: Tomorrow, 2:00 PM</span>
          <span style={styles.icon}><Icon name="heart" size={17} /></span>
          <span style={styles.icon}><Icon name="bell" size={17} /></span>
          <div style={styles.avatar} />
        </div>
      </div>

      <div className="builder-grid" style={styles.grid}>
        {/* Left column */}
        <div className="builder-column" style={styles.column}>
          <div className="builder-card" style={styles.card}>
            <p style={styles.cardTitle}><Icon name="cake" size={15} /> Base Structure</p>

            <p style={styles.label}>Cake Shape</p>
            <div className="builder-shape-row" style={styles.shapeRow}>
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShape(s.id)}
                  style={{ ...styles.shapeBtn, ...(shape === s.id ? styles.shapeBtnActive : {}) }}
                >
                  <span style={styles.shapeIcon}><Icon name={s.icon} size={17} /></span>
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
            <div className="builder-flavor-grid" style={styles.flavorGrid}>
              {pricingConfig.flavors.map((f) => (
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

          <div className="builder-card" style={styles.card}>
            <p style={styles.cardTitle}><Icon name="sparkle" size={15} /> Frosting Style</p>
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
        <div className="builder-column builder-preview-column" style={styles.column}>
          <div className="builder-preview-card" style={styles.previewCard}>
            <div style={styles.previewHeader}>
              <span><Icon name="refresh" size={15} /> Live Preview</span>
            </div>
            <div className="builder-preview-wrap" style={styles.previewCircleWrap}>
              <CakePreview
                shape={shape}
                layers={layers}
                flavor={flavor}
                frosting={frosting}
                toppings={toppings}
                message={message}
              />
            </div>
            <div style={styles.previewActions}>
              <span style={styles.previewIcon}><Icon name="search" size={16} /></span>
              <span style={styles.previewIcon}><Icon name="camera" size={16} /></span>
              <span style={styles.previewIcon}><Icon name="refresh" size={16} /></span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="builder-column" style={styles.column}>
          <div className="builder-card" style={styles.card}>
            <p style={styles.cardTitle}><Icon name="sparkle" size={15} /> Toppings</p>
            <div className="builder-topping-row" style={styles.toppingRow}>
              {pricingConfig.toppings.map((t) => (
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

          <div className="builder-summary-card" style={styles.summaryCard}>
            <p style={styles.cardTitle}>Order Summary</p>
            <div style={styles.summaryRow}>
              <span>Base Cake ({layers} Layers)</span>
              <span>{formatNpr(pricing.base)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Flavor: {flavor.label}</span>
              <span>+{formatNpr(flavor.price)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Toppings</span>
              <span>+{formatNpr(pricing.toppingsTotal)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Custom Text</span>
              <span>{message ? 'Included' : 'None'}</span>
            </div>
            <div style={styles.summaryTotalRow}>
              <span>Total</span>
              <span style={styles.totalValue}>{formatNpr(pricing.total)}</span>
            </div>

            <button className="btn-primary" style={styles.orderBtn} onClick={handleOrder}>
              <Icon name="cart" size={16} /> Order This Cake
            </button>
            <button style={styles.saveBtn} onClick={handleSaveDesign} disabled={saving}>
              {saving ? 'Saving...' : <><Icon name="bookmark" size={16} /> Save Design</>}
            </button>
            {saveMessage && <p style={styles.saveMessage}>{saveMessage}</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function CakePreview({ shape, layers, flavor, frosting, toppings, message }) {
  const flavorBase = FLAVOR_COLORS[flavor.id] || '#F5E6C8';
  const flavorLight = shadeColor(flavorBase, 25);
  const frostingColor = FROSTING_COLORS[frosting] || '#FFF8F0';
  const frostingDark = shadeColor(frostingColor, -15);

  const layerHeight = 42;
  const layerWidth = 170;
  const shrinkPerLayer = 12;
  const totalHeight = layers * layerHeight + 40;
  const svgHeight = totalHeight + 50;

  const layerBlocks = [];
  for (let i = 0; i < layers; i++) {
    const widthAtLayer = layerWidth - i * shrinkPerLayer;
    const yPos = svgHeight - 50 - (i + 1) * layerHeight;
    const xPos = 120 - widthAtLayer / 2;
    layerBlocks.push(
      <g key={i}>
        <rect
          x={xPos}
          y={yPos}
          width={widthAtLayer}
          height={layerHeight}
          rx={shape === 'square' ? 6 : widthAtLayer / 2}
          fill={`url(#grad-${i})`}
        />
        <ellipse
          cx="120"
          cy={yPos}
          rx={widthAtLayer / 2}
          ry="8"
          fill={i === layers - 1 ? frostingColor : flavorLight}
        />
      </g>
    );
  }

  const topWidth = layerWidth - (layers - 1) * shrinkPerLayer;
  const topY = svgHeight - 50 - layers * layerHeight;

  return (
    <svg width="240" height="260" viewBox={`0 0 240 ${svgHeight + 10}`}>
      <defs>
        {Array.from({ length: layers }).map((_, i) => (
          <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={shadeColor(flavorBase, -20)} />
            <stop offset="50%" stopColor={flavorBase} />
            <stop offset="100%" stopColor={shadeColor(flavorBase, -35)} />
          </linearGradient>
        ))}
      </defs>

      <ellipse cx="120" cy={svgHeight - 12} rx="95" ry="13" fill="#000" opacity="0.1" />

      {layerBlocks}

      <path
        d={`M${120 - topWidth / 2} ${topY} 
            Q${120 - topWidth / 2 + topWidth * 0.15} ${topY + 14} ${120 - topWidth / 2 + topWidth * 0.3} ${topY}
            Q${120 - topWidth / 2 + topWidth * 0.45} ${topY + 14} ${120 - topWidth / 2 + topWidth * 0.6} ${topY}
            Q${120 - topWidth / 2 + topWidth * 0.75} ${topY + 14} ${120 - topWidth / 2 + topWidth * 0.9} ${topY}
            L${120 + topWidth / 2} ${topY}`}
        fill="none"
        stroke={frostingDark}
        strokeWidth="3"
        opacity="0.6"
      />

      {toppings.includes('sprinkles') &&
        Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x={120 - topWidth / 2 + 15 + (i % 6) * (topWidth / 7)}
            y={topY - 4 + Math.floor(i / 6) * 5}
            width="4"
            height="4"
            fill={['#E24B4A', '#378ADD', '#F9C74F', '#43AA8B'][i % 4]}
            transform={`rotate(${i * 33} ${120 - topWidth / 2 + 15 + (i % 6) * (topWidth / 7)} ${topY - 4})`}
          />
        ))}

      {toppings.includes('berries') &&
        Array.from({ length: 3 }).map((_, i) => (
          <circle key={i} cx={120 - 35 + i * 35} cy={topY - 6} r="7" fill="#C1121F" />
        ))}

      {toppings.includes('chocolate') &&
        Array.from({ length: 3 }).map((_, i) => (
          <path
            key={i}
            d={`M${120 - 40 + i * 40} ${topY - 15} Q${120 - 25 + i * 40} ${topY - 22} ${120 - 10 + i * 40} ${topY - 10}`}
            stroke="#3B2415"
            strokeWidth="4"
            fill="none"
          />
        ))}

      {toppings.includes('pearls') &&
        Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={120 - topWidth / 2 + 10 + i * (topWidth / 8)} cy={topY - 8} r="3" fill="#F5F0E8" />
        ))}

      {toppings.includes('flowers') &&
        [-40, 0, 40].map((dx, i) => (
          <g key={i} transform={`translate(${120 + dx}, ${topY - 10})`}>
            <circle cx="0" cy="0" r="4" fill="#F9C74F" />
            <circle cx="-6" cy="-3" r="4" fill="#F4B8C4" />
            <circle cx="6" cy="-3" r="4" fill="#F4B8C4" />
            <circle cx="-4" cy="4" r="4" fill="#F4B8C4" />
            <circle cx="4" cy="4" r="4" fill="#F4B8C4" />
          </g>
        ))}

      {toppings.includes('fruits') &&
        Array.from({ length: 3 }).map((_, i) => (
          <circle key={i} cx={120 - 35 + i * 35} cy={topY - 6} r="6" fill="#F77F00" />
        ))}

      <rect x="115" y={topY - 40} width="8" height="26" rx="2" fill="#F5E6C8" />
      <path
        d={`M119 ${topY - 40} Q114 ${topY - 50} 119 ${topY - 58} Q124 ${topY - 50} 119 ${topY - 40}`}
        fill="#F4A340"
      />

      {message && (
        <text
          x="120"
          y={svgHeight - 65}
          textAnchor="middle"
          fontSize="10"
          fontFamily="Work Sans, sans-serif"
          fill="#3B2415"
        >
          {message}
        </text>
      )}
    </svg>
  );
}

function shadeColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

const styles = {
  stateText: { fontSize: '14px', color: 'var(--text-muted)', padding: '40px' },
  errorText: { fontSize: '14px', color: '#C1121F', padding: '40px' },

  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  pageTitle: { fontSize: '20px' },
  topbarRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  pickupBadge: {
    background: '#fff',
    border: '1px solid #f1e5e8',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '12.5px',
    color: 'var(--text-muted)',
  },
  icon: { fontSize: '17px', cursor: 'pointer' },
  avatar: { width: '34px', height: '34px', borderRadius: '50%', background: 'var(--pink-soft)' },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr 1.1fr',
    gap: '20px',
    alignItems: 'start',
  },
  column: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  cardTitle: { fontSize: '13px', fontWeight: 600, color: 'var(--rose-deep)', marginBottom: '16px' },
  label: {
    fontSize: '12.5px',
    color: 'var(--text-muted)',
    marginTop: '18px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  labelBold: { color: 'var(--rose-deep)', fontWeight: 600 },

  shapeRow: { display: 'flex', gap: '8px' },
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
  shapeIcon: { fontSize: '16px' },

  slider: { width: '100%', accentColor: 'var(--rose-deep)' },

  flavorGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
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
  radio: { accentColor: 'var(--rose-deep)', width: '15px', height: '15px' },

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
    minHeight: '260px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  previewActions: { display: 'flex', gap: '20px' },
  previewIcon: { fontSize: '16px', cursor: 'pointer', color: 'var(--text-muted)' },

  toppingRow: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' },
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
  totalValue: { color: 'var(--rose-deep)', fontSize: '17px' },
  orderBtn: { width: '100%', marginTop: '10px' },
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
  saveMessage: {
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '8px',
    color: 'var(--rose-deep)',
  },
};  
