/**
 *@description - Refetches the product list with filter params
 */

import { fetchProducts, getFilteredProducts } from "../../../app.mjs";

function handleFilterOnChange() {

  fetchProducts()
}

export default handleFilterOnChange;
