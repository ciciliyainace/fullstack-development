function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="cart-item-copy">
        <h2>{item.title}</h2>
        <p className="cart-item-category">{item.category}</p>
        <p>${item.price.toFixed(2)}</p>
        <div className="cart-item-controls">
          <button type="button" onClick={() => onDecrement(item.id)} aria-label={`Decrease quantity for ${item.title}`}>
            −
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onIncrement(item.id)} aria-label={`Increase quantity for ${item.title}`}>
            +
          </button>
          <button type="button" className="button button-secondary" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
