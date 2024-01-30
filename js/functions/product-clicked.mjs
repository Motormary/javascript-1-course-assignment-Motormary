/**
 * @param {productId} - Product ID
 * @returns - Redirects user to selected product page
 */

import { removeProductEventListeners } from "./remove-all-product-listeners.mjs";
import removeFilterEventListeners from "./remove-filter-listeners.mjs";

function handleProductClicked(event) {
  const product_id = event.currentTarget.getAttribute("data-product-id");

    removeFilterEventListeners();
    removeProductEventListeners();
    window.location.href(`/product.html?product=${product_id}`);
}

export default handleProductClicked;
