function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="category-filters" role="group" aria-label="Product categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={selected === category ? 'chip chip-active' : 'chip'}
          onClick={() => onSelect(category)}
        >
          {category === 'all' ? 'All' : category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
