import { useEffect, useState } from 'react';
import BakerLayout from '../components/BakerLayout';
import Icon from '../components/Icon';
import { formatNpr } from '../utils/currency';

const CATEGORIES = ['Birthday', 'Anniversary', 'Baby Shower', 'Graduation', 'Cupcakes', 'Custom'];

export default function BakerProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch('http://localhost:5000/api/products/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load cakes.');
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError('Please choose an image under 4 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setName('');
    setCategory(CATEGORIES[0]);
    setPrice('');
    setDescription('');
    setImageData('');
    setEditingId(null);
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setDescription(product.description || '');
    setImageData(product.imageData);
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('bakecraft_token');
      const endpoint = editingId
        ? `http://localhost:5000/api/products/${editingId}`
        : 'http://localhost:5000/api/products';
      const res = await fetch(endpoint, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, category, price, description, imageData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add cake.');

      setProducts((prev) => (
        editingId
          ? prev.map((product) => (product._id === editingId ? data.product : product))
          : [data.product, ...prev]
      ));
      setMessage(editingId ? 'Cake updated in Trending Creations.' : 'Cake added to customer trending section.');
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete cake.');

      setProducts((prev) => prev.filter((product) => product._id !== id));
      if (editingId === id) resetForm();
      setMessage('Cake removed from Trending Creations.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <BakerLayout>
      <h1 style={styles.pageTitle}>Cake Gallery</h1>
      <p style={styles.pageSubtitle}>Upload cakes here. Customers will see active uploads in Trending Creations.</p>

      <div className="baker-products-grid" style={styles.grid}>
        <form onSubmit={handleSubmit} className="baker-products-form" style={styles.formCard}>
          <p style={styles.cardTitle}><Icon name="camera" size={15} /> {editingId ? 'Edit Cake' : 'Add a Cake'}</p>

          <label style={styles.label}>Cake name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />

          <div className="baker-products-fields" style={styles.fieldRow}>
            <div style={styles.fieldHalf}>
              <label style={styles.label}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
                {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div style={styles.fieldHalf}>
              <label style={styles.label}>Price (NPR)</label>
              <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} required />
            </div>
          </div>

          <label style={styles.label}>Short description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            placeholder="Fresh berries, vanilla sponge, custom message..."
          />

          <label style={styles.label}>Cake image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} required={!imageData} />

          {imageData && <img src={imageData} alt="Cake preview" style={styles.preview} />}
          {error && <p style={styles.errorText}>{error}</p>}
          {message && <p style={styles.successText}>{message}</p>}

          <button className="btn-primary" type="submit" disabled={saving} style={styles.submitBtn}>
            {saving ? 'Saving...' : <><Icon name={editingId ? 'check' : 'camera'} size={16} /> {editingId ? 'Save Changes' : 'Upload Cake'}</>}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={styles.cancelBtn}>
              Cancel Edit
            </button>
          )}
        </form>

        <div className="baker-products-gallery" style={styles.galleryCard}>
          <p style={styles.cardTitle}>Your Uploaded Cakes</p>
          {loading && <p style={styles.stateText}>Loading cakes...</p>}
          {!loading && products.length === 0 && (
            <p style={styles.stateText}>No cakes uploaded yet.</p>
          )}
          {!loading && products.length > 0 && (
            <div className="baker-products-gallery-grid" style={styles.galleryGrid}>
              {products.map((product) => (
                <div key={product._id} style={styles.productCard}>
                  <img src={product.imageData} alt={product.name} style={styles.productImg} />
                  <p style={styles.productName}>{product.name}</p>
                  <p style={styles.productMeta}>{product.category} - {formatNpr(product.price)}</p>
                  <div style={styles.productActions}>
                    <button type="button" onClick={() => startEdit(product)} style={styles.editBtn}>
                      <Icon name="edit" size={13} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(product._id)} style={styles.deleteBtn}>
                      <Icon name="trash" size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BakerLayout>
  );
}

const styles = {
  pageTitle: { fontSize: '22px', marginBottom: '6px' },
  pageSubtitle: { fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: '420px 1fr', gap: '22px', alignItems: 'start' },
  formCard: { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 16px rgba(0,0,0,0.04)' },
  galleryCard: { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 16px rgba(0,0,0,0.04)' },
  cardTitle: { fontSize: '15px', fontWeight: 600, color: 'var(--rose-deep)', marginBottom: '18px' },
  fieldRow: { display: 'flex', gap: '12px' },
  fieldHalf: { flex: 1 },
  label: { display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', marginTop: '14px' },
  input: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '13.5px', background: '#fff' },
  textarea: { width: '100%', minHeight: '78px', padding: '11px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '13.5px', resize: 'none' },
  preview: { width: '100%', height: '190px', objectFit: 'cover', display: 'block', borderRadius: '12px', marginTop: '14px' },
  submitBtn: { width: '100%', marginTop: '18px' },
  cancelBtn: { width: '100%', marginTop: '10px', background: '#fff', color: 'var(--rose-deep)', border: '1px solid var(--rose-deep)', borderRadius: '20px', padding: '12px', cursor: 'pointer' },
  errorText: { color: '#C1121F', fontSize: '12.5px', marginTop: '12px' },
  successText: { color: '#2E7D32', fontSize: '12.5px', marginTop: '12px' },
  stateText: { fontSize: '13.5px', color: 'var(--text-muted)' },
  galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' },
  productCard: { border: '1px solid #f2e6e9', borderRadius: '14px', padding: '12px', background: '#fff' },
  productImg: { width: '100%', height: '130px', objectFit: 'cover', display: 'block', borderRadius: '10px', marginBottom: '10px' },
  productName: { fontSize: '13.5px', fontWeight: 600 },
  productMeta: { fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize' },
  productActions: { display: 'flex', gap: '8px', marginTop: '10px' },
  editBtn: { flex: 1, border: '1px solid #f2e6e9', background: '#fff', color: 'var(--rose-deep)', borderRadius: '12px', padding: '8px', fontSize: '12px', cursor: 'pointer' },
  deleteBtn: { flex: 1, border: 'none', background: '#FDEBEC', color: '#C1121F', borderRadius: '12px', padding: '8px', fontSize: '12px', cursor: 'pointer' },
};
