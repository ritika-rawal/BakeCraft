import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Header from '../components/Header';

const CATEGORIES = ['All', 'Birthday', 'Anniversary', 'Baby Shower', 'Graduation'];

const CREATIONS = [
  { id: 1, name: 'Velvet Peony Bliss', price: 85, tag: 'Best seller', category: 'Anniversary' },
  { id: 2, name: 'Midnight Truffle', price: 92, tag: 'Popular', category: 'Birthday' },
  { id: 3, name: 'Lavender Mist', price: 78, tag: 'New', category: 'Baby Shower' },
  { id: 4, name: 'Caramel Cascade', price: 95, tag: "Chef's choice", category: 'Graduation' },
];

export default function CustomerDashboard() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = CREATIONS.filter((c) => {
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <Header searchValue={searchTerm} onSearchChange={setSearchTerm} />

      {/* Hero banner + AI card */}
      <div style={styles.heroRow}>
        <div style={styles.heroBanner}>
          <div style={styles.heroImgPlaceholder}>{/* your image goes here */}</div>
          <div style={styles.heroText}>
            <h2 style={styles.heroTitle}>Design Your Own Dream Cake</h2>
            <p style={styles.heroDesc}>
              From flavor to frosting, create a masterpiece that's uniquely
              yours with our 3D builder.
            </p>
            <Link to="/builder">
              <button style={styles.heroBtn}>Order Now</button>
            </Link>
          </div>
        </div>

        <div style={styles.aiCard}>
          <p style={styles.aiCardIcon}>✦</p>
          <p style={styles.aiCardTitle}>AI Cake Magic</p>
          <p style={styles.aiCardDesc}>
            Let our AI analyze your mood and occasion to suggest the perfect
            flavor profile.
          </p>
          <button style={styles.aiCardBtn}>Try AI Suggest</button>
        </div>
      </div>

      {/* Trending creations */}
      <div style={styles.trendingHeader}>
        <div>
          <h3 style={styles.trendingTitle}>Trending Creations</h3>
          <p style={styles.trendingSub}>Handcrafted delights from our top master bakers</p>
        </div>
        <div style={styles.tabs}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              style={{ ...styles.tab, ...(activeCategory === c ? styles.tabActive : {}) }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={styles.noResults}>No creations match "{searchTerm}". Try a different search.</p>
      ) : (
        <div style={styles.productGrid}>
          {filtered.map((item) => (
            <div key={item.id} style={styles.productCard}>
              <div style={styles.productImgPlaceholder}>
                <span style={styles.heartIcon}>♡</span>
              </div>
              <p style={styles.productTag}>{item.tag}</p>
              <p style={styles.productName}>{item.name}</p>
              <div style={styles.productFooter}>
                <span style={styles.productPrice}>${item.price.toFixed(2)}</span>
                <button style={styles.orderBtnSmall}>🛒 Order Now</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom row: activity + recommendation */}
      <div style={styles.bottomRow}>
        <div style={styles.activityCard}>
          <p style={styles.cardHeading}>Recent Activity</p>
          <div style={styles.activityItem}>
            <span style={styles.activityIcon}>📦</span>
            <div>
              <p style={styles.activityTitle}>Order #CK9281 Out for Delivery</p>
              <p style={styles.activitySub}>Estimated arrival 2:30 PM today</p>
            </div>
            <span style={styles.activityTime}>15m ago</span>
          </div>
          <div style={styles.activityItem}>
            <span style={styles.activityIcon}>✎</span>
            <div>
              <p style={styles.activityTitle}>Design "Summer Glow" Saved</p>
              <p style={styles.activitySub}>You updated your personal cake design</p>
            </div>
            <span style={styles.activityTime}>2h ago</span>
          </div>
          <p style={styles.viewAllLink}>View All Notifications</p>
        </div>

        <div style={styles.recCard}>
          <p style={styles.recTag}>Personalized for you</p>
          <p style={styles.recTitle}>Host a Birthday Party Next Week?</p>
          <p style={styles.recDesc}>
            We noticed your calendar has an event coming up. Our AI
            recommends the "Strawberry Serenade" for a group of 12.
          </p>
          <div style={styles.recActions}>
            <button style={styles.recBtnPrimary}>Get Started</button>
            <button style={styles.recBtnGhost}>Dismiss</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  heroRow: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '32px' },
  heroBanner: {
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    minHeight: '210px',
    display: 'flex',
    alignItems: 'flex-end',
    background: 'var(--rose-deep)',
  },
  heroImgPlaceholder: { position: 'absolute', inset: 0, background: '#c98a9a' },
  heroText: { position: 'relative', padding: '24px', color: '#fff', maxWidth: '380px' },
  heroTitle: { fontSize: '22px', color: '#fff', marginBottom: '8px' },
  heroDesc: { fontSize: '13px', marginBottom: '16px', opacity: 0.9 },
  heroBtn: {
    background: '#fff',
    color: 'var(--rose-deep)',
    border: 'none',
    padding: '10px 22px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  aiCard: {
    background: 'var(--card-bg)',
    borderRadius: '20px',
    padding: '24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiCardIcon: { fontSize: '20px', color: 'var(--rose-mid)', marginBottom: '8px' },
  aiCardTitle: { fontSize: '15px', fontWeight: 600, marginBottom: '8px' },
  aiCardDesc: { fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' },
  aiCardBtn: {
    background: '#fff',
    color: 'var(--rose-deep)',
    border: 'none',
    padding: '9px 18px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  trendingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '18px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  trendingTitle: { fontSize: '18px', color: 'var(--rose-deep)' },
  trendingSub: { fontSize: '12.5px', color: 'var(--text-muted)' },
  tabs: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  tab: {
    border: 'none',
    background: 'transparent',
    padding: '7px 14px',
    borderRadius: '16px',
    fontSize: '12.5px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  tabActive: { background: 'var(--pink-soft)', color: 'var(--rose-deep)', fontWeight: 500 },
  noResults: {
    fontSize: '13.5px',
    color: 'var(--text-muted)',
    padding: '30px 0',
    textAlign: 'center',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gap: '18px',
    marginBottom: '32px',
  },
  productCard: { background: '#fff', borderRadius: '16px', padding: '14px', boxShadow: '0 6px 16px rgba(0,0,0,0.04)' },
  productImgPlaceholder: {
    background: 'var(--pink-soft)',
    borderRadius: '12px',
    height: '130px',
    marginBottom: '10px',
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#fff',
    borderRadius: '50%',
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    color: 'var(--rose-mid)',
  },
  productTag: {
    fontSize: '10.5px',
    color: 'var(--rose-mid)',
    fontWeight: 500,
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  productName: { fontSize: '14px', fontWeight: 500, marginBottom: '10px' },
  productFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--text-dark)' },
  orderBtnSmall: {
    background: 'var(--pink-soft)',
    color: 'var(--rose-deep)',
    border: 'none',
    padding: '7px 12px',
    borderRadius: '16px',
    fontSize: '11.5px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  bottomRow: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' },
  activityCard: { background: '#fff', borderRadius: '16px', padding: '22px' },
  cardHeading: { fontSize: '14px', fontWeight: 600, marginBottom: '14px' },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid #f6eef0',
  },
  activityIcon: { fontSize: '16px' },
  activityTitle: { fontSize: '13px', fontWeight: 500 },
  activitySub: { fontSize: '11.5px', color: 'var(--text-muted)' },
  activityTime: { marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)' },
  viewAllLink: { fontSize: '12.5px', color: 'var(--rose-deep)', fontWeight: 500, marginTop: '12px', cursor: 'pointer' },
  recCard: { background: 'var(--pink-soft)', borderRadius: '16px', padding: '22px' },
  recTag: { fontSize: '11px', color: 'var(--rose-mid)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' },
  recTitle: { fontSize: '15px', fontWeight: 600, marginBottom: '8px', color: 'var(--rose-deep)' },
  recDesc: { fontSize: '12.5px', color: 'var(--text-dark)', marginBottom: '16px' },
  recActions: { display: 'flex', gap: '10px' },
  recBtnPrimary: {
    background: 'var(--rose-deep)',
    color: '#fff',
    border: 'none',
    padding: '9px 18px',
    borderRadius: '18px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  recBtnGhost: { background: 'transparent', color: 'var(--rose-deep)', border: 'none', fontSize: '12px', cursor: 'pointer' },
};