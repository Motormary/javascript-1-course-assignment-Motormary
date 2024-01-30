/**
 * 
 * @param {event} - Select onChange event 
 */

import { filterProducts } from "../../app.mjs";

function handleOnChange(event) {
  const value = event.currentTarget.value;
  const key = event.currentTarget.getAttribute("key");
  console.log(key, value)

  if (!value) filterProducts(key);

  filterProducts(key, value);
}

export default handleOnChange;
