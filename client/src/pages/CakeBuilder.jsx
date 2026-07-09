import { useState } from 'react';

const FLAVORS = [
  { id: 'vanilla', label: 'Vanilla', color: '#F5E6C8' },
  { id: 'chocolate', label: 'Chocolate', color: '#6B4226' },
  { id: 'strawberry', label: 'Strawberry', color: '#F4B8C4' },
];

const FROSTINGS = ['#FBCFE8', '#FDE68A', '#BBF7D0', '#BFDBFE', '#DDD6FE', '#FFFFFF'];

const SHAPES = ['round', 'square'];
const SIZES = [
  { id: 'small', scale: 0.8 },
  { id: 'medium', scale: 1 },
  { id: 'large', scale: 1.2 },
];

const TOPPINGS = ['sprinkles', 'fruit', 'flowers'];

export default function CakeBuilder() {
  const [shape, setShape] = useState('round');
  const [size, setSize] = useState('medium');
  const [flavor, setFlavor] = useState(FLAVORS[0]);
  const [frosting, setFrosting] = useState(FROSTINGS[0]);
  const [toppings, setToppings] = useState([]);
  const [message, setMessage] = useState('Happy Birthday');

  const scale = SIZES.find((s) => s.id === size).scale;

  const toggleTopping = (t) => {
    setToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.previewPane}>
          <p style={styles.previewLabel}>Your cake</p>
          <svg width="280" height="280" viewBox="0 0 280 280">
            <ellipse cx="140" cy="230" rx={90 * scale} ry="14" fill="#000" opacity="0.06" />

            {shape === 'round' ? (
              <>
                <rect
                  x={140 - 80 * scale}
                  y={140}
                  width={160 * scale}
                  height={70}
                  rx="10"
                  fill={flavor.color}
                />
                <ellipse cx="140" cy="140" rx={80 * scale} ry="18" fill={frosting} />
              </>
            ) : (
              <>
                <rect
                  x={140 - 75 * scale}
                  y={140}
                  width={150 * scale}
                  height={70}
                  rx="6"
                  fill={flavor.color}
                />
                <rect
                  x={140 - 75 * scale}
                  y={128}
                  width={150 * scale}
                  height={20}
                  rx="4"
                  fill={frosting}
                />
              </>
            )}

            {toppings.includes('sprinkles') &&
              Array.from({ length: 14 }).map((_, i) => (
                <rect
                  key={i}
                  x={140 - 70 * scale + i * 10}
                  y={132 + (i % 3) * 4}
                  width="4"
                  height="4"
                  fill={['#E24B4A', '#378ADD', '#F9C74F', '#43AA8B'][i % 4]}
                  transform={`rotate(${i * 25} ${140 - 70 * scale + i * 10} ${132 + (i % 3) * 4})`}
                />
              ))}

            {toppings.includes('fruit') &&
              Array.from({ length: 4 }).map((_, i) => (
                <circle
                  key={i}
                  cx={140 - 45 * scale + i * 30 * scale}
                  cy="136"
                  r="6"
                  fill="#C1121F"
                />
              ))}

            {toppings.includes('flowers') &&
              Array.from({ length: 3 }).map((_, i) => (
                <g key={i} transform={`translate(${140 - 40 * scale + i * 40 * scale}, 132)`}>
                  <circle cx="0" cy="0" r="3" fill="#F9C74F" />
                  <circle cx="-5" cy="-2" r="3" fill="#F4B8C4" />
                  <circle cx="5" cy="-2" r="3" fill="#F4B8C4" />
                  <circle cx="-3" cy="3" r="3" fill="#F4B8C4" />
                  <circle cx="3" cy="3" r="3" fill="#F4B8C4" />
                </g>
              ))}

            <text
              x="140"
              y="180"
              textAnchor="middle"
              fontSize="11"
              fontFamily="Work Sans, sans-serif"
              fill="#3B2415"
            >
              {message}
            </text>
          </svg>
        </div>

        <div style={styles.controls}>
          <h1 style={styles.heading}>Design your cake</h1>

          <div style={styles.group}>
            <p style={styles.label}>Shape</p>
            <div style={styles.row}>
              {SHAPES.map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  style={{ ...styles.optionBtn, ...(shape === s ? styles.optionBtnActive : {}) }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.group}>
            <p style={styles.label}>Size</p>
            <div style={styles.row}>
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  style={{ ...styles.optionBtn, ...(size === s.id ? styles.optionBtnActive : {}) }}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.group}>
            <p style={styles.label}>Flavor</p>
            <div style={styles.row}>
              {FLAVORS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFlavor(f)}
                  style={{ ...styles.optionBtn, ...(flavor.id === f.id ? styles.optionBtnActive : {}) }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.group}>
            <p style={styles.label}>Frosting color</p>
            <div style={styles.row}>
              {FROSTINGS.map((c) => (
                <button
                  key={c}
                  onClick={() => setFrosting(c)}
                  style={{
                    ...styles.swatch,
                    background: c,
                    border: frosting === c ? '3px solid var(--rose-deep)' : '1px solid #eee',
                  }}
                />
              ))}
            </div>
          </div>

          <div style={styles.group}>
            <p style={styles.label}>Toppings</p>
            <div style={styles.row}>
              {TOPPINGS.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTopping(t)}
                  style={{ ...styles.optionBtn, ...(toppings.includes(t) ? styles.optionBtnActive : {}) }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.group}>
            <p style={styles.label}>Message on cake</p>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={24}
              style={styles.input}
            />
          </div>

          <button className="btn-primary" style={styles.orderBtn}>
            Send this design to a baker →
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: 'var(--bg)',
    minHeight: '100vh',
    padding: '50px 24px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start',
  },
  previewPane: {
    background: '#fff',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'sticky',
    top: '40px',
  },
  previewLabel: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginBottom: '10px',
  },
  heading: {
    fontSize: '26px',
    marginBottom: '24px',
  },
  group: {
    marginBottom: '22px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-dark)',
    marginBottom: '8px',
    textTransform: 'capitalize',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  optionBtn: {
    border: '1px solid #eee',
    background: '#fff',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    cursor: 'pointer',
    textTransform: 'capitalize',
  },
  optionBtnActive: {
    background: 'var(--rose-deep)',
    color: '#fff',
    border: '1px solid var(--rose-deep)',
  },
  swatch: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #eee',
    fontSize: '14px',
  },
  orderBtn: {
    width: '100%',
    marginTop: '10px',
  },
};