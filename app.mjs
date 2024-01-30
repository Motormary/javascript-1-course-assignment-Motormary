import getAllProducts from "./js/api/get-all-products.mjs";
import createProductElements from "./js/components/products.mjs";
import { filter_data } from "./js/filter-data.mjs";
import { createFilterButtons } from "./js/functions/create-filter-buttons.mjs";
import emptySearchResult from "./js/functions/empty-search-result.mjs";
import setProductLoading from "./js/functions/loading.mjs";
import noResponse from "./js/functions/no-response.mjs";
import { removeProductEventListeners } from "./js/functions/remove-all-product-listeners.mjs";

var products = null;

export async function fetchProducts() {
  const response = await getAllProducts();

  if (response) {
    setProductLoading(false);
    products = response;
    createFilterButtons(filter_data);
    products.map((object) => createProductElements(object));
  } else {
    setProductLoading(false);
    noResponse();
  }
}

fetchProducts();

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

  if (sortedProducts.length === 0) {
    emptySearchResult();
  } else {
    sortedProducts.map((object) => createProductElements(object));
  }
}


let cart = localStorage.cart

console.log("Cart:", cart)