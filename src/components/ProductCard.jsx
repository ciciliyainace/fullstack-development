import { Link } from 'react-router-dom';

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link" aria-label={`View details for ${product.title}`}>
        <img src={product.image} alt={product.title} loading="lazy" className="product-image" />
        <div className="product-meta">
          <p className="product-category">{product.category}</p>
          <h3>{product.title}</h3>
        </div>
      </Link>
      <div className="product-footer">
        <div className="product-price-rating">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating" aria-label={`Rating ${product.rating?.rate || 0} out of 5`}>
            ⭐ {product.rating?.rate ?? '0'}
          </span>
        </div>
        <button type="button" className="button button-primary" onClick={() => onAdd(product)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
