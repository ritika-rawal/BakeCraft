import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import BakerLayout from '../components/BakerLayout';
import Icon from '../components/Icon';

export default function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('bakecraft_user') || 'null');
  const Layout = storedUser?.role === 'baker' ? BakerLayout : DashboardLayout;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('bakecraft_token');
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load profile.');
        setName(data.user.name);
        setEmail(data.user.email);
      } catch (err) {
        setProfileError(err.message);
        if (err.message.toLowerCase().includes('token') || err.message.toLowerCase().includes('unauthorized')) {
          localStorage.removeItem('bakecraft_token');
          localStorage.removeItem('bakecraft_user');
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage('');
    setProfileError('');
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile.');

      localStorage.setItem('bakecraft_user', JSON.stringify(data.user));
      setProfileMessage('Profile updated.');
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setSavingPassword(true);
    setPasswordMessage('');
    setPasswordError('');
    try {
      const token = localStorage.getItem('bakecraft_token');
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change password.');

      setPasswordMessage('Password changed.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p style={styles.stateText}>Loading profile...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 style={styles.pageTitle}>Settings</h1>
      <p style={styles.pageSubtitle}>Manage your account details and password.</p>

      <div style={styles.card}>
        <p style={styles.cardTitle}>Profile Information</p>
        <form onSubmit={handleProfileSave}>
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

          <label style={styles.label}>Account type</label>
          <input
            value={storedUser?.role === 'baker' ? 'Baker Admin' : 'Customer'}
            disabled
            style={{ ...styles.input, background: '#f7f7f7', color: 'var(--text-muted)' }}
          />

          {profileError && <p style={styles.errorText}>{profileError}</p>}
          {profileMessage && <p style={styles.successText}><Icon name="check" size={14} /> {profileMessage}</p>}

          <button type="submit" className="btn-primary" style={styles.saveBtn} disabled={savingProfile}>
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <p style={styles.cardTitle}>Change Password</p>
        <form onSubmit={handlePasswordSave}>
          <label style={styles.label}>Current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            required
            minLength={6}
          />

          {passwordError && <p style={styles.errorText}>{passwordError}</p>}
          {passwordMessage && <p style={styles.successText}><Icon name="check" size={14} /> {passwordMessage}</p>}

          <button type="submit" className="btn-primary" style={styles.saveBtn} disabled={savingPassword}>
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </Layout>
  );
}

const styles = {
  stateText: { fontSize: '14px', color: 'var(--text-muted)' },
  pageTitle: { fontSize: '22px', marginBottom: '6px' },
  pageSubtitle: { fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '28px' },

  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
    marginBottom: '20px',
    maxWidth: '460px',
  },
  cardTitle: { fontSize: '15px', fontWeight: 600, color: 'var(--rose-deep)', marginBottom: '18px' },
  label: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '6px',
    marginTop: '14px',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #eee',
    fontSize: '13.5px',
  },
  errorText: { color: '#C1121F', fontSize: '12.5px', marginTop: '12px' },
  successText: { color: '#2E7D32', fontSize: '12.5px', marginTop: '12px' },
  saveBtn: { width: '100%', marginTop: '20px', padding: '13px' },
};
