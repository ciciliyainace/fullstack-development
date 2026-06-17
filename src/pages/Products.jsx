import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const categories = ['all', "men's clothing", "women's clothing", 'jewelery', 'electronics'];

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setStatus('loading');
        const data = await fetchProducts();
        if (isMounted) {
          setProducts(data);
          setStatus('success');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setStatus('error');
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
      const matchesFilter = filter === 'all' || product.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((product) => product.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
  };

  return (
    <section className="products-page">
      <Helmet>
        <title>Products | AI E-Commerce Catalog</title>
        <meta name="description" content="Search and filter products in the AI-powered ecommerce catalog with instant results and responsive product cards." />
      </Helmet>
      <div className="section-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Browse Products</h1>
          <p>Search by name or category, filter by top collections, and add items to your cart instantly.</p>
        </div>
      </div>
      <div className="filters-panel">
        <label htmlFor="search-input" className="sr-only">Search products</label>
        <input id="search-input" className="search-field" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products or categories" />
        <div className="category-filters" role="group" aria-label="Product categories">
          {categories.map((category) => (
            <button key={category} type="button" className={filter === category ? 'chip chip-active' : 'chip'} onClick={() => setFilter(category)}>
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {status === 'loading' && <p className="status-message">Loading products…</p>}
      {status === 'error' && (
        <div className="status-message status-error">
          <p>Problem loading products.</p>
          <button type="button" className="button button-secondary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}
      {status === 'success' && filteredProducts.length === 0 && <p className="status-message">No products match your search.</p>}

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
        ))}
      </div>
    </section>
  );
}

export default Products;
