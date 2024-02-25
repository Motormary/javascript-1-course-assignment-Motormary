import superFetch from "../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../api/urls.mjs";
import setProductLoading from "../functions/error/loading.mjs";
import handleNoResponse from "../functions/error/no-response.mjs";
import { createProductCard } from "../functions/product-card-functions.mjs";

const path = window.location.pathname;

if (path === "/product.html") {
  fetchProduct();
}

/**
 * @description - Gets the product ID from the URL-param and fetches the product from server.
 * Creates a productCard component with new styling based on path.
 */
async function fetchProduct() {
  let params = new URLSearchParams(document.location.search);
  let id = params.get("product");
  const container = document.getElementById("view-product")

  const response = await superFetch(URL_PRODUCTS, id);
  if (response) {

    setProductLoading(false)

    const card = createProductCard(response)

    container.appendChild(card)
  } else {
    
    setProductLoading(false);

    const error = handleNoResponse();

    container.appendChild(error)
  }
}

