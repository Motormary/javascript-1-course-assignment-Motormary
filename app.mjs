import getAllProducts from "./js/api/get-all-products.mjs";
import createProductElements from "./js/components/products.mjs";
import { filter_data } from "./js/filter-data.mjs";
import {
  createFilterButtons
} from "./js/functions/create-filter-buttons.mjs";
import emptySearchResult from "./js/functions/empty-search-result.mjs";
import setProductLoading from "./js/functions/loading.mjs";

var products = null;

async function fetchProducts() {
  const response = await getAllProducts();
  console.log(response)

  if (response) {
    setProductLoading(false);
    products = response;
    createFilterButtons(filter_data)
    products.map((object) => createProductElements(object));
  }

  // TODO
  // (!response)
}

fetchProducts();

var filters = {
  keys: [],
  values: [],
};

function handleFilters(key, value) {
  console.log("filters:", filters);

  if (filters.keys.length > 0) {
    const indexToRemove = filters.keys.indexOf(key);
    if (indexToRemove !== -1) {
      filters.keys.splice(indexToRemove, 1);
      filters.values.splice(indexToRemove, 1);
    }
  }

  if (key && value) {
    const newValue = value === "true" ? value === "true" : value

    filters.keys.push(key);
    filters.values.push(newValue);
  }
}

export function filterProducts(key, value) {
  handleFilters(key, value);
  const content = document.getElementById("list-of-products");
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
