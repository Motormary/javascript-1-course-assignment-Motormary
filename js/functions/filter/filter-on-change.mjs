/**
 *
 * @param {event} - Select onChange event
 */

import { getFilteredProducts } from "../../../app.mjs";

function handleFilterOnChange(event) {
  const value = event.currentTarget.value;
  const key = event.currentTarget.getAttribute("key");
  console.log(key, value);

  getFilteredProducts()
}

export default handleFilterOnChange;
