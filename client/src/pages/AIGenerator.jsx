import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const SUGGESTIONS = [
  'Pink birthday cake with butterflies',
  'Tropical beach cake with waves',
  'Enchanted forest cake',
];

const RECENT_CREATIONS = [
  { id: 1, name: 'Ethereal Pink Butterfly', desc: 'Velvet pink sponge with raspberry filling and hand-...', tag: 'New match' },
  { id: 2, name: 'Ocean Whisper Tier', desc: 'Coconut cream layers with pineapple glaze and blue curaca...', tag: 'New match' },
  { id: 3, name: 'Midnight Forest Moss', desc: 'Dark chocolate fudge with pistachio moss and forest berry...', tag: 'New match' },
];

export default function AIGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    // TODO: replace with real API call to your AI backend endpoint
    setTimeout(() => setGenerating(false), 1500);
  };

  return (
    <DashboardLayout>
      <div style={styles.hero}>
        <h1 style={styles.title}>
          <span style={styles.titleAccent}>CakeCraft</span> AI
        </h1>
        <p style={styles.subtitle}>
          Turn your wildest dessert fantasies into reality. Describe your dream
          cake and let our AI baker whisk up a masterpiece just for you.
        </p>

        <div style={styles.promptCard}>
          <p style={styles.promptLabel}>✨ What cake are you dreaming of?</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g. A three-tier lavender ombre cake with edible gold leaf and fresh blackberries..."
            style={styles.textarea}
          />

          <div style={styles.chipRow}>
            <span style={styles.chipLabel}>Try these:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => setPrompt(s)} style={styles.chip}>
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            className="btn-primary"
            style={styles.generateBtn}
            disabled={generating}
          >
            {generating ? 'Generating...' : '⚡ Generate AI Design'}
          </button>
        </div>
      </div>

      <div style={styles.recentHeader}>
        <h3 style={styles.recentTitle}>Recent Creations</h3>
        <span style={styles.filterLink}>Filter</span>
      </div>

      <div style={styles.grid}>
        {RECENT_CREATIONS.map((c) => (
          <div key={c.id} style={styles.card}>
            <div style={styles.imgPlaceholder}>
              <span style={styles.tag}>{c.tag}</span>
            </div>
            <p style={styles.cardName}>{c.name}</p>
            <p style={styles.cardDesc}>{c.desc}</p>
            <div style={styles.cardFooter}>
              <button style={styles.orderSmallBtn}>🛒 Order</button>
              <span style={styles.iconBtn}>✎</span>
              <span style={styles.iconBtn}>🔖</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

const styles = {
  hero: {
    textAlign: 'center',
    maxWidth: '640px',
    margin: '0 auto 48px',
  },
  title: {
    fontSize: '30px',
    marginBottom: '10px',
  },
  titleAccent: {
    color: 'var(--rose-deep)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '28px',
  },
  promptCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    textAlign: 'left',
  },
  promptLabel: {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '12px',
  },
  textarea: {
    width: '100%',
    minHeight: '80px',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #eee',
    fontSize: '13.5px',
    fontFamily: 'var(--font-body)',
    resize: 'none',
    marginBottom: '14px',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '22px',
  },
  chipLabel: {
    fontSize: '12.5px',
    color: 'var(--text-muted)',
    marginRight: '4px',
  },
  chip: {
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    border: 'none',
    borderRadius: '16px',
    padding: '7px 14px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  generateBtn: {
    width: '100%',
    padding: '15px',
    fontSize: '14.5px',
  },

  recentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
  },
  recentTitle: {
    fontSize: '17px',
    color: 'var(--rose-deep)',
  },
  filterLink: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '14px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
  },
  imgPlaceholder: {
    background: 'var(--pink-soft)', // swap for: background: `url(/your-image.jpg) center/cover`
    borderRadius: '12px',
    height: '150px',
    marginBottom: '12px',
    position: 'relative',
  },
  tag: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    borderRadius: '12px',
    padding: '4px 10px',
    fontSize: '10px',
    fontWeight: 500,
    color: 'var(--rose-deep)',
  },
  cardName: {
    fontSize: '14.5px',
    fontWeight: 500,
    marginBottom: '4px',
  },
  cardDesc: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '12px',
    lineHeight: 1.4,
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  orderSmallBtn: {
    background: 'var(--rose-deep)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    flex: 1,
  },
  iconBtn: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
};