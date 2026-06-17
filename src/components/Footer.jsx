import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p>AI-Powered E-Commerce Catalog • Built with React, Vite, and REST APIs.</p>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </footer>
  );
}

export default Footer;
