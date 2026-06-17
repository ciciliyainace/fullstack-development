import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);

    const handleUpdate = () => {
      const updated = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(updated);
    };

    window.addEventListener('cart-update', handleUpdate);
    return () => window.removeEventListener('cart-update', handleUpdate);
  }, []);

  const updateQuantity = (productId, delta) => {
    const updated = cart.map((item) => {
      if (item.id !== productId) return item;
      return { ...item, quantity: Math.max(1, item.quantity + delta) };
    });
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-update'));
  };

  const removeItem = (productId) => {
    const updated = cart.filter((item) => item.id !== productId);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-update'));
  };

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return (
    <section className="cart-page">
      <Helmet>
        <title>Cart | AI E-Commerce Catalog</title>
        <meta name="description" content="Review your shopping cart, update item quantities, and proceed with the AI-powered catalog checkout preview." />
      </Helmet>
      <div className="section-header">
        <p className="eyebrow">Cart</p>
        <h1>Your shopping bag</h1>
      </div>
      {cart.length === 0 ? (
        <div className="status-message">
          <p>Your cart is empty. Add products from the catalog to continue.</p>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="cart-item-copy">
                  <h2>{item.title}</h2>
                  <p className="cart-item-category">{item.category}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="cart-item-controls">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease quantity for ${item.title}`}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase quantity for ${item.title}`}>
                      +
                    </button>
                    <button type="button" className="button button-secondary" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <div className="summary-card">
              <p className="eyebrow">Order summary</p>
              <h2>Total</h2>
              <p className="summary-total">${total.toFixed(2)}</p>
              <button type="button" className="button button-primary">Proceed to checkout</button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

export default CartPage;
