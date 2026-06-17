import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFound() {
  return (
    <section className="notfound-page">
      <Helmet>
        <title>404 Not Found | AI E-Commerce Catalog</title>
        <meta name="description" content="Page not found in the AI-powered ecommerce catalog. Return to the home page or browse products." />
      </Helmet>
      <div className="notfound-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for doesn’t exist. Try browsing products or return home.</p>
        <Link to="/" className="button button-primary">Go Home</Link>
      </div>
    </section>
  );
}

export default NotFound;
