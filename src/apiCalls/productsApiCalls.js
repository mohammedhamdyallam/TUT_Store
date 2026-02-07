// Get products based on page number
export async function getProducts(page) {
  const res = await fetch(`${process.env.api}/api/products?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("API Error:", res.status);
    return null;
  }

  const text = await res.text();
  if (!text) return null;

  return JSON.parse(text);
}

// Get products count
export async function getProductsCount() {
  const res = await fetch(`http://localhost:3000/api/products/count`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("API Error:", res.status);
    return null;
  }

  const { productsCount } = await res.json();
  if (!productsCount) return null;

  return JSON.parse(productsCount);
}

// Get products by search key
export async function getSearchProducts(searchKey) {
  const res = await fetch(`http://localhost:3000/api/products/search?searchKey=${searchKey}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("API Error:", res.status);
    return null;
  }

  const products = await res.text();
  if (!products) return null;

  return JSON.parse(products);
}
