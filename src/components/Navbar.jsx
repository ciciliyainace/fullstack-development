import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/cart', label: 'Cart' },
];

function Navbar() {
  const [theme, setTheme] = useLocalStorageState('app-theme', 'light');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const quantity = storedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(quantity);
  }, []);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <header className="site-header">
      <div className="site-branding">
        <Link to="/" className="brand-link">
          <span className="brand-mark">AI</span>
          <span className="brand-title">Shop</span>
        </Link>
      </div>
      <nav className="primary-nav" aria-label="Primary">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="toolbar">
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <Link to="/cart" className="cart-button" aria-label="View cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
