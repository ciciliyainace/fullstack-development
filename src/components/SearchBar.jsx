function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="catalog-search" className="sr-only">
        Search products
      </label>
      <input
        id="catalog-search"
        type="search"
        className="search-field"
        placeholder="Search products, categories, or brands"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}

export default SearchBar;
