import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProductById } from '../services/api';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadProduct() {
      try {
        setStatus('loading');
        const data = await fetchProductById(id);
        if (active) {
          setProduct(data);
          setStatus('success');
        }
      } catch (err) {
        if (active) {
          setError(err.message);
          setStatus('error');
        }
      }
    }
    loadProduct();
    return () => {
      active = false;
    };
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
  };

  if (status === 'loading') {
    return <p className="status-message">Loading product details…</p>;
  }

  if (status === 'error') {
    return (
      <div className="status-message status-error">
        <p>{error || 'Unable to load the selected product.'}</p>
        <button type="button" className="button button-secondary" onClick={() => navigate('/products')}>
          Back to catalog
        </button>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <section className="product-details-page">
      <Helmet>
        <title>{product.title} | AI E-Commerce Catalog</title>
        <meta name="description" content={`View details for ${product.title}, including pricing, stock, description, category, and rating.`} />
      </Helmet>
      <div className="product-details-grid">
        <div className="details-image-card">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>
        <div className="details-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <div className="details-meta">
            <div>
              <span className="detail-label">Price</span>
              <p className="detail-value">${product.price.toFixed(2)}</p>
            </div>
            <div>
              <span className="detail-label">Rating</span>
              <p className="detail-value">{product.rating?.rate ?? 'N/A'} / 5</p>
            </div>
            <div>
              <span className="detail-label">Stock</span>
              <p className="detail-value">{product.rating?.count ?? 'In stock'}</p>
            </div>
          </div>
          <div className="details-actions">
            <button type="button" className="button button-primary" onClick={addToCart}>
              Add to cart
            </button>
            <button type="button" className="button button-secondary" onClick={() => navigate('/products')}>
              Back to products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
