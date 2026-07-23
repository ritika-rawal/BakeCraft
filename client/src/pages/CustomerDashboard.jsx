import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Header from '../components/Header';
import Icon from '../components/Icon';

const CATEGORIES = ['All', 'Birthday', 'Anniversary', 'Baby Shower', 'Graduation'];

const CREATIONS = [
  { id: 1, name: 'Velvet Peony Bliss', price: 85, tag: 'Best seller', category: 'Anniversary', image: '/cake-strawberry.png' },
  { id: 2, name: 'Midnight Truffle', price: 92, tag: 'Popular', category: 'Birthday', image: '/cake-black-forest.png' },
  { id: 3, name: 'Lavender Mist', price: 78, tag: 'New', category: 'Baby Shower', image: '/cake-lavender.png' },
  { id: 4, name: 'Caramel Cascade', price: 95, tag: "Chef's choice", category: 'Graduation', image: '/dessert-assortment.png' },
];

export default function CustomerDashboard() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadedCreations, setUploadedCreations] = useState([]);

  useEffect(() => {
    const fetchUploadedCakes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load uploaded cakes.');

        const mapped = data.products.map((product) => ({
          id: product._id,
          name: product.name,
          price: Number(product.price),
          tag: product.baker?.name || 'Local baker',
          category: product.category,
          image: product.imageData,
          description: product.description || 'Freshly made by a BakeCraft baker.',
        }));

        setUploadedCreations(mapped);
      } catch (err) {
        setUploadedCreations([]);
      }
    };

    fetchUploadedCakes();
  }, []);

  const creations = uploadedCreations.length > 0 ? uploadedCreations : CREATIONS;

  const filtered = creations.filter((c) => {
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <Header searchValue={searchTerm} onSearchChange={setSearchTerm} />

      {/* Hero banner + AI card */}
      <div className="customer-hero-row" style={styles.heroRow}>
        <div className="customer-hero-banner" style={styles.heroBanner}>
          <img src="/Cake1.jpg" alt="Chocolate raspberry cake" style={styles.heroImg} />
          <div style={styles.heroOverlay} />
          <div style={styles.heroText}>
            <p style={styles.heroKicker}>Fresh picks near you</p>
            <h2 style={styles.heroTitle}>Design Your Own Dream Cake</h2>
            <p style={styles.heroDesc}>
              From flavor to frosting, create a masterpiece that's uniquely
              yours with our 3D builder.
            </p>
            <div style={styles.heroActions}>
              <Link to="/builder">
                <button style={styles.heroBtn}><Icon name="edit" size={14} /> Start Designing</button>
              </Link>
              <Link to="/saved-designs">
                <button style={styles.heroGhostBtn}><Icon name="heart" size={14} /> Saved Cakes</button>
              </Link>
            </div>
            <div style={styles.heroStats}>
              <span style={styles.heroStatPill}>24h pickup</span>
              <span style={styles.heroStatPill}>30+ designs</span>
              <span style={styles.heroStatPill}>Local bakers</span>
            </div>
          </div>
        </div>

        <div className="customer-ai-card" style={styles.aiCard}>
          <div style={styles.aiGlow} />
          <p style={styles.aiCardIcon}><Icon name="sparkle" size={22} /></p>
          <p style={styles.aiCardTitle}>AI Cake Magic</p>
          <p style={styles.aiCardDesc}>
            Let our AI analyze your mood and occasion to suggest the perfect
            flavor profile.
          </p>
          <Link to="/ai-generator">
            <button style={styles.aiCardBtn}><Icon name="sparkle" size={14} /> Try AI Suggest</button>
          </Link>
        </div>
      </div>

      {/* Trending creations */}
      <div className="customer-trending-header" style={styles.trendingHeader}>
        <div>
          <h3 style={styles.trendingTitle}>Trending Creations</h3>
          <p style={styles.trendingSub}>Handcrafted delights from our top master bakers</p>
        </div>
        <div className="customer-tabs" style={styles.tabs}>
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
        <div className="customer-product-grid trending-market-grid" style={styles.productGrid}>
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="trending-card"
              style={{
                ...styles.productCard,
                transform: `rotate(${[-1.4, 1.2, -0.8, 1.5][index % 4]}deg)`,
              }}
            >
              <div className="customer-product-img" style={styles.productImgWrap}>
                <img src={item.image} alt={item.name} style={styles.productImg} />
                <span style={styles.heartIcon}><Icon name="heart" size={13} /></span>
                <span style={styles.imageBadge}>{item.category}</span>
              </div>
              <div style={styles.productBody}>
                <div style={styles.productMetaRow}>
                  <span style={styles.productTag}><Icon name="store" size={12} /> {item.tag}</span>
                  <span style={styles.productRating}><Icon name="star" size={12} /> 4.9</span>
                </div>
                <p style={styles.productName}>{item.name}</p>
                <p style={styles.productDesc}>{item.description || 'Custom celebration cake made fresh to order.'}</p>
              </div>
              <div style={styles.productFooter}>
                <div>
                  <p style={styles.priceLabel}>Starting from</p>
                  <span style={styles.productPrice}>${item.price.toFixed(2)}</span>
                </div>
                <Link to="/builder">
                  <button style={styles.orderBtnSmall}><Icon name="cart" size={13} /> Order Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom row: helpful, non-fake dashboard content */}
      <div className="customer-bottom-row" style={styles.bottomRow}>
        <div style={styles.processCard}>
          <div style={styles.sectionHeaderRow}>
            <div>
              <p style={styles.cardHeading}>From Idea to Delivery</p>
              <p style={styles.cardSubheading}>A simple flow for custom cake orders.</p>
            </div>
            <Icon name="track" size={20} />
          </div>
          <div className="customer-step-grid" style={styles.stepGrid}>
            <div style={styles.stepItem}>
              <span style={styles.stepIcon}><Icon name="edit" size={16} /></span>
              <p style={styles.stepTitle}>Design</p>
              <p style={styles.stepText}>Choose layers, flavor, toppings, and message.</p>
            </div>
            <div style={styles.stepItem}>
              <span style={styles.stepIcon}><Icon name="message" size={16} /></span>
              <p style={styles.stepTitle}>Confirm</p>
              <p style={styles.stepText}>Share details with the baker before baking starts.</p>
            </div>
            <div style={styles.stepItem}>
              <span style={styles.stepIcon}><Icon name="package" size={16} /></span>
              <p style={styles.stepTitle}>Track</p>
              <p style={styles.stepText}>Follow order status from placed to delivered.</p>
            </div>
          </div>
        </div>

        <div style={styles.highlightCard}>
          <p style={styles.recTag}>BakeCraft Promise</p>
          <p style={styles.recTitle}>Custom cakes without scattered messages</p>
          <p style={styles.recDesc}>
            Browse baker uploads, design your cake, save ideas, place an order, and chat with the baker from one place.
          </p>
          <div style={styles.recActions}>
            <Link to="/builder">
              <button style={styles.recBtnPrimary}><Icon name="edit" size={14} /> Build Cake</button>
            </Link>
            <Link to="/order-tracking">
              <button style={styles.recBtnGhost}><Icon name="track" size={14} /> Track Orders</button>
            </Link>
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
    minHeight: '285px',
    display: 'flex',
    alignItems: 'flex-end',
    background: 'var(--rose-deep)',
  },
  heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(42,27,34,0.82), rgba(42,27,34,0.28) 58%, rgba(42,27,34,0.06))' },
  heroText: { position: 'relative', padding: '30px', color: '#fff', maxWidth: '470px' },
  heroKicker: {
    display: 'inline-flex',
    background: 'rgba(255,255,255,0.16)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '999px',
    padding: '5px 12px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  heroTitle: { fontSize: '31px', lineHeight: 1.08, color: '#fff', marginBottom: '10px' },
  heroDesc: { fontSize: '13.5px', marginBottom: '18px', opacity: 0.92, maxWidth: '390px' },
  heroActions: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' },
  heroBtn: {
    background: '#fff',
    color: 'var(--rose-deep)',
    border: 'none',
    padding: '11px 20px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  heroGhostBtn: {
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.34)',
    padding: '11px 18px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  heroStats: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  heroStatPill: {
    background: 'rgba(255,255,255,0.13)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '999px',
    padding: '5px 10px',
    fontSize: '11.5px',
    color: '#fff',
  },
  aiCard: {
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(160deg, #fff, var(--card-bg))',
    borderRadius: '20px',
    padding: '24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(139,41,66,0.08)',
    boxShadow: '0 14px 34px rgba(139,41,66,0.08)',
  },
  aiGlow: {
    position: 'absolute',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'rgba(200,107,133,0.16)',
    top: '-46px',
    right: '-36px',
  },
  aiCardIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    background: '#fff',
    color: 'var(--rose-mid)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    boxShadow: '0 8px 18px rgba(139,41,66,0.08)',
  },
  aiCardTitle: { fontSize: '17px', fontWeight: 700, marginBottom: '8px' },
  aiCardDesc: { fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 },
  aiCardBtn: {
    background: 'var(--rose-deep)',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 230px))',
    justifyContent: 'start',
    gap: '24px',
    marginBottom: '32px',
  },
  productCard: {
    background: '#fff',
    borderRadius: '6px',
    padding: '12px 12px 14px',
    overflow: 'hidden',
    boxShadow: '0 16px 32px rgba(42,27,34,0.10)',
    border: '1px solid rgba(139,41,66,0.05)',
    transformOrigin: 'center',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
  },
  productImgWrap: {
    height: '205px',
    borderRadius: '3px',
    position: 'relative',
    overflow: 'hidden',
    background: '#f8eef1',
  },
  productImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
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
  imageBadge: {
    position: 'absolute',
    left: '10px',
    bottom: '10px',
    background: 'rgba(255,255,255,0.92)',
    color: 'var(--rose-deep)',
    borderRadius: '999px',
    padding: '4px 10px',
    fontSize: '10.5px',
    fontWeight: 600,
  },
  productBody: { padding: '12px 2px 8px' },
  productMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  productTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '11px',
    color: 'var(--rose-mid)',
    fontWeight: 500,
    minWidth: 0,
  },
  productRating: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: '#8A6A2D',
    background: '#FFF7DF',
    borderRadius: '999px',
    padding: '4px 8px',
    flexShrink: 0,
  },
  productName: { fontSize: '15.5px', fontWeight: 700, marginBottom: '5px', color: 'var(--text-dark)' },
  productDesc: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    lineHeight: 1.45,
    minHeight: '36px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 2px 0',
    borderTop: '1px solid #f6eef0',
  },
  priceLabel: { fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.1 },
  productPrice: { fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--rose-deep)', lineHeight: 1.1 },
  orderBtnSmall: {
    background: 'var(--rose-deep)',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
  },
  bottomRow: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' },
  processCard: { background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 8px 22px rgba(0,0,0,0.04)' },
  sectionHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', color: 'var(--rose-deep)', marginBottom: '16px' },
  cardHeading: { fontSize: '14px', fontWeight: 600, marginBottom: '14px' },
  cardSubheading: { fontSize: '12px', color: 'var(--text-muted)', marginTop: '-10px' },
  stepGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
  stepItem: { background: '#fdf6f7', borderRadius: '14px', padding: '14px', border: '1px solid #f6eef0' },
  stepIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    color: 'var(--rose-deep)',
    marginBottom: '10px',
  },
  stepTitle: { fontSize: '13px', fontWeight: 700, marginBottom: '4px' },
  stepText: { fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.45 },
  highlightCard: { background: 'linear-gradient(160deg, var(--pink-soft), #fff)', borderRadius: '16px', padding: '22px', border: '1px solid rgba(139,41,66,0.08)' },
  recTag: { fontSize: '11px', color: 'var(--rose-mid)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' },
  recTitle: { fontSize: '15px', fontWeight: 600, marginBottom: '8px', color: 'var(--rose-deep)' },
  recDesc: { fontSize: '12.5px', color: 'var(--text-dark)', marginBottom: '16px' },
  recActions: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  recBtnPrimary: {
    background: 'var(--rose-deep)',
    color: '#fff',
    border: 'none',
    padding: '9px 18px',
    borderRadius: '18px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  recBtnGhost: {
    background: '#fff',
    color: 'var(--rose-deep)',
    border: '1px solid rgba(139,41,66,0.12)',
    padding: '9px 14px',
    borderRadius: '18px',
    fontSize: '12px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
};
