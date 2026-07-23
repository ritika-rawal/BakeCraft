import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function AuthLayout({
  children,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}) {
  return (
    <div className="auth-page">
      <div className="auth-backdrop" aria-hidden="true">
        <img src="/dessert-assortment.png" alt="" />
      </div>
      <header className="auth-header">
        <Link to="/" className="auth-brand" aria-label="BakeCraft home">
          <img src="/logo-v2.png" alt="BakeCraft" />
        </Link>
        <Link to="/" className="auth-home-link">
          <Icon name="chevronLeft" size={16} />
          Back to home
        </Link>
      </header>

      <div className="auth-layout">
        <section className="auth-visual" aria-label="BakeCraft studio">
          <img src={image} alt={imageAlt} />
        </section>

        <main className="auth-form-area">
          <div className="auth-panel">
            <div className="auth-heading">
              <p className="auth-eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
