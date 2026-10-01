const API_URL = "https://dummyjson.com/products";

export async function getCategories() {
    const response = await fetch(`${API_URL}/category-list`);

    if (!response.ok) {
        throw new Error("Unable to load product categories.");
    }

    return response.json();
}

export async function getProductsByCategory(categorySlug) {
    const response = await fetch(
        `${API_URL}/category/${encodeURIComponent(categorySlug)}`
    );

    if (!response.ok) {
        throw new Error(`Unable to load products for ${categorySlug}.`);
    }

    const data = await response.json();
    return data.products;
}