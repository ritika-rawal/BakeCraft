import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed. Please try again.');
      }

      navigate('/login', { state: { justRegistered: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create your account</h1>
        <p style={styles.subtext}>Join BakeCraft as a customer or a baker.</p>

        <div style={styles.roleToggle}>
          <button
            type="button"
            onClick={() => setRole('customer')}
            style={{ ...styles.roleBtn, ...(role === 'customer' ? styles.roleBtnActive : {}) }}
          >
            I'm a customer
          </button>
          <button
            type="button"
            onClick={() => setRole('baker')}
            style={{ ...styles.roleBtn, ...(role === 'baker' ? styles.roleBtnActive : {}) }}
          >
            I'm a baker
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            minLength={6}
          />

          {error && <p style={styles.errorText}>{error}</p>}

          <button type="submit" className="btn-primary" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)',
    padding: '24px',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
  },
  heading: { fontSize: '24px', marginBottom: '6px' },
  subtext: { fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' },
  roleToggle: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    background: 'var(--pink-soft)',
    padding: '4px',
    borderRadius: '30px',
  },
  roleBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '26px',
    border: 'none',
    background: 'transparent',
    color: 'var(--rose-deep)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  roleBtnActive: { background: 'var(--rose-deep)', color: '#fff' },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '6px',
    marginTop: '14px',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #eee',
    fontSize: '14px',
  },
  errorText: {
    color: '#C1121F',
    fontSize: '12.5px',
    marginTop: '12px',
  },
  submitBtn: { width: '100%', marginTop: '24px' },
  footerText: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginTop: '20px',
  },
  link: { color: 'var(--rose-deep)', fontWeight: 500 },
};