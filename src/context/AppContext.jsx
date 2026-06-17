import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/api';
import useDebouncedValue from '../hooks/useDebouncedValue';
import useLocalStorageState from '../hooks/useLocalStorageState';

const AppContext = createContext();

function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState('app-theme', 'light');
  const [cart, setCart] = useLocalStorageState('cart', []);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const debouncedSearch = useDebouncedValue(search, 250);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setStatus('loading');
        const data = await fetchProducts();
        if (!mounted) return;
        setProducts(data);
        setStatus('success');
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Failed to load products.');
        setStatus('error');
      }
    }

    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((product) => product.category)));
    return ['all', ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
      const matchesFilter = filter === 'all' || product.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [products, filter, debouncedSearch]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const addToCart = useCallback(
    (product) => {
      setCart((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }
        return [...current, { ...product, quantity: 1 }];
      });
    },
    [setCart],
  );

  const updateQuantity = useCallback(
    (productId, delta) => {
      setCart((current) =>
        current
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (productId) => {
      setCart((current) => current.filter((item) => item.id !== productId));
    },
    [setCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const retryLoad = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        cart,
        cartCount,
        products,
        filteredProducts,
        categories,
        search,
        setSearch,
        filter,
        setFilter,
        status,
        error,
        retryLoad,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
