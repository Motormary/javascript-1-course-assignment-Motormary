import getAllProducts from "./js/api/get-all-products.mjs";
import createProductElements from "./js/components/products.mjs";
import {
  colorFilter,
  genderFilter,
} from "./js/functions/create-filter-buttons.mjs";
import emptySearchResult from "./js/functions/empty-search-result.mjs";
import setProductLoading from "./js/functions/loading.mjs";

var products = null;

async function fetchProducts() {
  const response = await getAllProducts();

  if (response) {
    setProductLoading(false);
    products = response;
    genderFilter();
    colorFilter();
    products.map((object) => createProductElements(object));
  }

  // TODO
  // setTimeout 10s, try again
}

fetchProducts();

var filters = {
  keys: [],
  values: [],
};

function handleFilters(key, value) {
  if (filters.keys.length > 0) {
    filters.keys.find((current) => {
      if (current === key) {
        const index_of_key = filters.keys.indexOf(key);
        filters.keys.splice(index_of_key, 1);
        filters.values.splice(index_of_key, 1);
      }
    });
  }

  if (key && value) {
    filters.keys.push(key);
    filters.values.push(value);
  }
}

export function filterProducts(key, value) {
  handleFilters(key, value);
  const content = document.getElementById("list-of-products");
  content.replaceChildren("");

  let sortedProducts = products.filter((value) => {
    if (filters.keys.length === filters.values.length) {
      return filters.keys.every(
        (k, index) => value[k] === filters.values[index]
      );
    } else {
      return value;
    }
  });

  if (sortedProducts.length === 0) {
    emptySearchResult();
  } else {
    sortedProducts.map((object) => createProductElements(object));
  }
}
