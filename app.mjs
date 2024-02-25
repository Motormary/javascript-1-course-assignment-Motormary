import superFetch from "./js/api/super-fetch.mjs";
import { URL_PRODUCTS } from "./js/api/urls.mjs";
import { filter_data } from "./js/functions/filter/filter-data.mjs";
import { createFilterButtons } from "./js/functions/filter/create-filter-buttons.mjs";
import setProductLoading from "./js/functions/error/loading.mjs";
import handleNoResponse from "./js/functions/error/no-response.mjs";
import emptySearchResult from "./js/functions/filter/empty-search-result.mjs";
import { createProductCard } from "./js/functions/product-card-functions.mjs";

const path = window.location.pathname;
if (path === "/" || path === "/index.html") {
  fetchProducts();
  createFilterButtons(filter_data);
}

const container = document.querySelector("div.product-list");

/**
 * @description - Fetch all products
 * Remove loading
 * if no response:
 * Create error with retry button
 */
export async function fetchProducts() {
  const response = await superFetch(URL_PRODUCTS);

  if (response) {
    getFilteredProducts(response);
    setProductLoading(false);
  } else {
    setProductLoading(false);
    const error = handleNoResponse();
    container.appendChild(error)
  }
}
//-----------------------------------------------------------------------

/**
 * 
 * @param {*} products 
 * @description - Iterate through product-array and create card components for the products
 */
function createProductList(products) {

  removeCurrentProductList();

  products.forEach((product) => {
    const card = createProductCard(product);

    container.appendChild(card);
  });
}
//-----------------------------------------------------------------------

/**
 * 
 * @param {*} products 
 * @returns - Filtered / All products
 * @description - Get all the filter buttons and create an array of objects with key/value pairs, filter out objects with empty values.
 * Values set to lowercase for failsafe.
 * key e.g "gender"
 * value e.g "male"
 * Then .filter() the product-list against the newly created filter-array.
 */

export function getFilteredProducts(products) {
  const filterKeysAndValues = Array.from( 
    document.querySelectorAll(".filter-btn") 
  )
    .map((button) => ({ key: button.getAttribute("key"), value: button.value })) 
    .filter(({ value }) => value);

  const filteredProducts = products.filter((product) => {
    return filterKeysAndValues.every(({ key, value }) => {
      if (value === "true") {
        return product[key] === (value === "true"); // Turn boolean-strings into actual booleans
      } else {
        return product[key].toLowerCase() === value.toLowerCase();
      }
    });
  });

  if (filteredProducts) createProductList(filteredProducts);
  if (filteredProducts.length === 0) {
    emptySearchResult()
  } 
}
//-----------------------------------------------------------------------

/**
 * @description - Flushes the product-list
 */
function removeCurrentProductList() {
  container.replaceChildren("");
}
