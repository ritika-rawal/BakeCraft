import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.justRegistered;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please try again.');
      }

      localStorage.setItem('bakecraft_token', data.token);
      localStorage.setItem('bakecraft_user', JSON.stringify(data.user));

      navigate(data.user.role === 'baker' ? '/dashboard/baker' : '/dashboard/customer');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subtext}>Log in to your BakeCraft account.</p>

        {justRegistered && (
          <p style={styles.successBanner}>✓ Account created! Please log in.</p>
        )}

        <form onSubmit={handleSubmit}>
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
          />

          {error && <p style={styles.errorText}>{error}</p>}

          <button type="submit" className="btn-primary" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
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
  successBanner: {
    background: '#E8F5E9',
    color: '#2E7D32',
    fontSize: '12.5px',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
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