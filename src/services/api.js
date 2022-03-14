export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const dataCategories = await response.json();
  return dataCategories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url);
  const dataCategoryAndQuery = await response.json();
  return dataCategoryAndQuery;
}

export async function getProductsFromQuery(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(url);
  const dataQuery = await response.json();
  return dataQuery;
}

export async function getProductsFromCategory(id) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${id}`;
  const response = await fetch(url);
  const dataQuery = await response.json();
  return dataQuery;
}
