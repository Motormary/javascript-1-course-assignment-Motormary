/**
 *@description Calls the filter function onChange
 */

import { fetchProducts, getFilteredProducts } from "../../../app.mjs";

function handleFilterOnChange() {

  fetchProducts()
}

export default handleFilterOnChange;
