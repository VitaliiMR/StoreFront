import { getCategories, getProductsByCategory } from "./model.js";
import { renderCategoryHub, renderMessage, renderProducts } from "./view.js";

const categoryHub = document.createElement("div");
categoryHub.id = "category-hub";

const productList = document.createElement("div");
productList.id = "product-list";
productList.setAttribute("aria-live", "polite");

document.body.append(categoryHub, productList);

let currentProducts = [];
let sortAscending = true;

function renderCurrentProducts() {
	renderProducts(productList, currentProducts, sortAscending, () => {
		sortAscending = !sortAscending;
		renderCurrentProducts();
	});
}

async function handleCategoryClick(categorySlug) {
	renderMessage(productList, "Loading products...");

	try {
		currentProducts = await getProductsByCategory(categorySlug);
		renderCurrentProducts();
	} catch (error) {
		renderMessage(productList, error.message);
	}
}

categoryHub.addEventListener("click", (event) => {
	const button = event.target.closest("[data-category-slug]");
	if (button && categoryHub.contains(button)) {
		handleCategoryClick(button.dataset.categorySlug);
	}
});

async function initializeCategoryHub() {
	renderMessage(categoryHub, "Loading categories...");

	try {
		const categories = await getCategories();
		renderCategoryHub(categoryHub, categories);
	} catch (error) {
		renderMessage(categoryHub, error.message);
	}
}

initializeCategoryHub();
