const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export function createProductCard(product) {
    const card = document.createElement("section");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.thumbnail || product.images?.[0] || "";
    image.alt = product.title;
    image.loading = "lazy";

    const name = document.createElement("h2");
    name.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = currencyFormatter.format(product.price);

    card.append(image, name, price);
    return card;
}

export function renderCategoryHub(container, categories) {
    const heading = document.createElement("h1");
    heading.textContent = "Shop by category";

    const buttons = document.createElement("nav");
    buttons.setAttribute("aria-label", "Product categories");

    for (const categorySlug of categories) {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.categorySlug = categorySlug;
        button.style.backgroundColor = "#f1f5f9";
        button.style.border = "1px solid #cbd5e1";
        button.style.borderRadius = "4px";
        button.style.padding = "6px 10px";
        button.style.margin = "4px";
        button.textContent = categorySlug
            .replaceAll("'", "")
            .replaceAll("-", " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
        buttons.append(button);
    }

    container.replaceChildren(heading, buttons);
}

export function renderProducts(container, products, sortAscending, onSort) {
    const toolbar = document.createElement("div");
    toolbar.style.display = "flex";
    toolbar.style.justifyContent = "flex-end";
    toolbar.style.marginBottom = "12px";

    const sortButton = document.createElement("button");
    sortButton.type = "button";
    sortButton.textContent = sortAscending
        ? "Price: low to high"
        : "Price: high to low";
    sortButton.setAttribute("aria-label", `Sort by price: ${sortButton.textContent}`);
    sortButton.style.backgroundColor = "#f1f5f9";
    sortButton.style.border = "1px solid #cbd5e1";
    sortButton.style.borderRadius = "4px";
    sortButton.style.padding = "6px 10px";
    sortButton.addEventListener("click", onSort);
    toolbar.append(sortButton);

    const sortedProducts = [...products].sort((first, second) =>
        sortAscending ? first.price - second.price : second.price - first.price
    );
    const cards = sortedProducts.map(createProductCard);
    container.replaceChildren(toolbar, ...cards);
}

export function renderMessage(container, message) {
    const status = document.createElement("p");
    status.setAttribute("role", "status");
    status.textContent = message;
    container.replaceChildren(status);
}