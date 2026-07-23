import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '../components/Icon';
import AuthLayout from '../components/AuthLayout';
import { apiUrl } from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.justRegistered;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
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
    <AuthLayout
      eyebrow="Welcome back"
      title="Continue your creation."
      description="Log in to design, save, and follow every detail of your cake."
      image="/auth-baker-illustration.png"
      imageAlt="Baker designing a celebration cake on a tablet"
    >
        {justRegistered && (
          <p className="auth-status auth-status-success" role="status">
            <Icon name="check" size={16} /> Account created. You can log in now.
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email address</label>
            <div className="auth-input-wrap">
              <Icon name="mail" size={18} />
              <input
                id="login-email"
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
            <label htmlFor="login-password">Password</label>
            <div className="auth-input-wrap">
              <Icon name="lock" size={18} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
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
            <span>{loading ? 'Logging in...' : 'Log in'}</span>
            {!loading && <Icon name="arrowRight" size={17} />}
          </button>
        </form>

        <p className="auth-switch">
          New to BakeCraft? <Link to="/signup">Create an account</Link>
        </p>
    </AuthLayout>
  );
}
