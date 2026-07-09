import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real API call to backend once auth is wired up
    const stored = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');
    const role = stored?.role || 'customer';
    navigate(role === 'baker' ? '/dashboard/baker' : '/dashboard/customer');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subtext}>Log in to your BakeCraft account.</p>

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

          <button type="submit" className="btn-primary" style={styles.submitBtn}>
            Log in
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
  heading: {
    fontSize: '24px',
    marginBottom: '6px',
  },
  subtext: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginBottom: '24px',
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
  submitBtn: {
    width: '100%',
    marginTop: '24px',
  },
  footerText: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: 'var(--rose-deep)',
    fontWeight: 500,
  },
};