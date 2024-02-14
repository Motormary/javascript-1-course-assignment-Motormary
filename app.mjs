import superFetch from "./js/api/super-fetch.mjs";
import { URL_PRODUCTS } from "./js/api/urls.mjs";
import { filter_data } from "./js/functions/filter/filter-data.mjs";
import { createFilterButtons } from "./js/functions/filter/create-filter-buttons.mjs";
import emptySearchResult from "./js/functions/product-list/empty-search-result.mjs";
import setProductLoading from "./js/functions/loading.mjs";
import noResponse from "./js/functions/no-response.mjs";
import createProductElements from "./js/functions/product-list/products.mjs";
import { removeProductEventListeners } from "./js/functions/product-list/remove-all-product-listeners.mjs";

const path = window.location.pathname;

if (path === "/" || "/index.html") {
  fetchProducts();
}

var products = null;

export async function fetchProducts() {
  const response = await superFetch(URL_PRODUCTS);

  if (response) {
    createProductList(response);
    createFilterButtons(filter_data)
  } else {
    setProductLoading(false);
    noResponse();
  }
}

var filters = {
  keys: [],
  values: [],
};

function handleFilters(key, value) {
  if (filters.keys.length > 0) {
    const indexToRemove = filters.keys.indexOf(key);
    if (indexToRemove !== -1) {
      filters.keys.splice(indexToRemove, 1);
      filters.values.splice(indexToRemove, 1);
    }
  }

  if (key && value) {
    const newValue = value === "true" ? value === "true" : value;

    filters.keys.push(key);
    filters.values.push(newValue);
  }
}

export function filterProducts(key, value) {
  const content = document.getElementById("list-of-products");
  handleFilters(key, value);
  removeProductEventListeners();
  content.replaceChildren("");

  let sortedProducts = products.filter((value) => {
    if (filters.keys.length === filters.values.length) {
      return filters.keys.every(
        (k, index) => value[k] == filters.values[index]
      );
    }
  });

  if (!sortedProducts.length) {
    emptySearchResult();
  } else {
    createProductElements(sortedProducts);
  }
}

function createProductList(products) {
  const container = document.querySelector("div.product-list");

  products.forEach((product) => {
    const card = document.createElement("product-card");

    card.setAttribute("title", product.title);
    card.setAttribute("image", product.image);
    card.setAttribute("description", product.description);
    card.setAttribute("sizes", product.sizes)
    card.setAttribute("gender", product.gender)
    card.setAttribute("onsale", product.onSale)
    card.setAttribute("price", product.price);
    card.setAttribute("colors", product.baseColor);
    card.setAttribute("add_btn", product.id);

    container.appendChild(card);
  });
}
