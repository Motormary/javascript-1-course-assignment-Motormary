import superFetch from "./js/api/super-fetch.mjs";
import { URL_PRODUCTS } from "./js/api/urls.mjs";
import { filter_data } from "./js/functions/filter/filter-data.mjs";
import { createFilterButtons } from "./js/functions/filter/create-filter-buttons.mjs";
import setProductLoading from "./js/functions/loading.mjs";
import noResponse from "./js/functions/no-response.mjs";
import { createProductCard } from "./js/components/product-card.mjs";

const path = window.location.pathname;
if (path === "/" || path === "/index.html") {
  fetchProducts();
  createFilterButtons(filter_data);
}

let products = []

export async function fetchProducts() {
  const response = await superFetch(URL_PRODUCTS);

  if (response) {
    products = response
    getFilteredProducts();
  } else {
    setProductLoading(false);
    noResponse();
  }
}

function createProductList(products) {
  const container = document.querySelector("div.product-list");

  removeCurrentProductList();

  products.forEach((product) => {
    const card = createProductCard(product);

    container.appendChild(card);
  });
}

export function getFilteredProducts() {
  const filterKeysAndValues = Array.from(
    document.querySelectorAll(".filter-btn")
  )
    .map((button) => ({ key: button.getAttribute("key"), value: button.value }))
    .filter(({ value }) => value);

  const filteredProducts = products.filter((product) => {
    return filterKeysAndValues.every(({ key, value }) => {
      if (value === "true") {
        return product[key] === (value === "true"); // Turn boolean-strings into actual booleans before checking
      } else {
        return product[key] === value;
      }
    });
  });

  createProductList(filteredProducts);
}

function removeCurrentProductList() {
  const container = document.querySelector("div.product-list");
  container.replaceChildren("");
}
