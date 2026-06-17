import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero-section">
      <Helmet>
        <title>AI E-Commerce Catalog | Home</title>
        <meta name="description" content="Browse AI-powered products, filter by category, and manage your cart with a modern responsive ecommerce catalog." />
      </Helmet>
      <div className="hero-copy">
        <p className="eyebrow">Smart Shopping</p>
        <h1>Modern AI-Powered Product Catalog</h1>
        <p>Explore curated products, manage your cart, and enjoy fast, accessible navigation with dark mode support.</p>
        <div className="hero-actions">
          <Link to="/products" className="button button-primary">Browse Products</Link>
          <Link to="/cart" className="button button-secondary">View Cart</Link>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-card">
          <span>Top Products</span>
          <h2>Fast, accessible, and ready for deployment.</h2>
        </div>
      </div>
    </section>
  );
}

export default Home;
