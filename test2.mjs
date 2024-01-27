import getAllProducts from "./js/api/get-all-products.mjs";
import createProductElements from "./js/components/products.mjs";
import createFilterButtons from "./js/functions/create-filter-buttons.mjs";
import setProductLoading from "./js/functions/loading.mjs";

var products = null;

async function fetchProducts() {
  const response = await getAllProducts();

  if (response) {
    setProductLoading(false);
    products = response;
    createFilterButtons();
    products.map((object) => createProductElements(object));
  }
}

fetchProducts();

const filters = {
  keys: [],
  values: [],
};

function handleFilters(key, value) {
  filters.keys.find((current) => {
    if (current === key) {
      const index_of_key = filters.keys.indexOf(key);
      filters.keys.splice(index_of_key, 1);
      filters.values.splice(index_of_key, 1);
    } else {
      filters.keys.push(key);
      filters.values.push(value);
    }
  });
}

export function filterProducts(key, value) {
  handleFilters(key, value);
  const content = document.getElementById("list-of-products");
  content.replaceChildren("");

  let sortedProducts = products;

  sortedProducts = object.filter((value) => {
    if (filters.keys.length === filters.values.length) {
      return filters.keys.every(
        (k, index) => value[k] === filters.values[index]
      );
    } else {
      return value;
    }
  });

 sortedProducts.map((object) => createProductElements(object));
}
