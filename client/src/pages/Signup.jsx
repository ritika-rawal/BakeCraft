import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../components/Icon';
import AuthLayout from '../components/AuthLayout';
import { apiUrl } from '../utils/api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
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
    <AuthLayout
      eyebrow="Join BakeCraft"
      title="Create something personal."
      description="Open your customer account and bring your cake ideas to life."
      image="/auth-customer-illustration.png"
      imageAlt="Customer customizing a cake design on a laptop"
    >
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="signup-name">Full name</label>
            <div className="auth-input-wrap">
              <Icon name="user" size={18} />
              <input
                id="signup-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">Email address</label>
            <div className="auth-input-wrap">
              <Icon name="mail" size={18} />
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="signup-password">Password</label>
              <span>At least 6 characters</span>
            </div>
            <div className="auth-input-wrap">
              <Icon name="lock" size={18} />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                required
                minLength={6}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </div>
          </div>

          {error && <p className="auth-status auth-status-error" role="alert">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            <span>{loading ? 'Creating account...' : 'Create account'}</span>
            {!loading && <Icon name="arrowRight" size={17} />}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
    </AuthLayout>
  );
}
