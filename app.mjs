import getAllProducts from "./js/api/get-all-products.mjs";
import createProductElements from "./js/components/products.mjs";
import setProductLoading from "./js/functions/loading.mjs";

var products = null;

async function fetchProducts() {
  const response = await getAllProducts();

  if (response) {
    setProductLoading(false);
    products = response;
    response.map((object) => createProductElements(object));
  }
}

fetchProducts();

export function filterProducts() {

  let valueFilter = ["Male"];

  let key = ["gender"];

  let sortedProducts = products;

  if (valueFilter.length === key.length && valueFilter.length > 0) {
    sortedProducts = products.filter((product) => {
      // Check if all key/value pairs match
      return key.every((k, index) => product[k] === valueFilter[index]);
    });

    sortedProducts.map((object) => createProductElements(object))
  }
}

