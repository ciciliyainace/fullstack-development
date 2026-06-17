const BASE_URL = 'https://fakestoreapi.com';

async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Unable to fetch products.');
  }
  return response.json();
}

async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Unable to fetch product details.');
  }
  return response.json();
}

export { fetchProducts, fetchProductById };
