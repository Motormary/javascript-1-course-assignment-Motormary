import getAllProducts from "./js/api/get-all-products.mjs";
import createProductElements from "./js/components/products.mjs";
import { colorFilter, genderFilter } from "./js/functions/create-filter-buttons.mjs";
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
}

fetchProducts();

export function filterProducts(keyValue, filterValue) {
  const content = document.getElementById("list-of-products");
  content.replaceChildren("");

  if (keyValue && filterValue) {
    let filter = [filterValue];

    let key = [keyValue];

    let sortedProducts = products;

    if (filter.length === key.length && filter.length > 0) {
      sortedProducts = products.filter((product) => {
        // Check if all key/value pairs match
        return key.every((k, index) => product[k] === filter[index]);
      });
      sortedProducts.map((object) => createProductElements(object));
    }
  } else {
    products.map((object) => createProductElements(object));
  }
}
