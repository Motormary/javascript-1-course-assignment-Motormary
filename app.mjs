import getAllProducts from "./js/api/get-all-products.mjs";
import createProductElements from "./js/components/products.mjs";
import {
  colorFilter,
  genderFilter,
} from "./js/functions/create-filter-buttons.mjs";
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

var key = [];
var filter = [];

export function filterProducts(keyValue, filterValue) {
  /**
   * @description - Filters the product list depending on the key and filter value.
   * If the keyValue is passed alone, the selected filter will be removed from the filter-list.
   *
   * @param {keyValue} - Key to filter
   * @param {filterValue} - Value to filter
   * @returns - Filtered product list
   */

  const content = document.getElementById("list-of-products");
  content.replaceChildren("");

  if (keyValue && filterValue) {
    key.push(keyValue);
    filter.push(filterValue);
    console.log(
      key.map((key) => "Key:" + key),
      filter.map((key) => "filter:" + key)
    );

    let sortedProducts = products;

    if (filter.length === key.length) {
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



//handle filters