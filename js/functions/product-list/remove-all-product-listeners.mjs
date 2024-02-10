import { handleAddToCart } from "../cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "../cart/remove-from-cart.mjs";

/**
 * @description - Finds all the current products and it's buttons, then removes the event listeners.
 */

export function removeProductEventListeners() {
  const content = document.getElementById("list-of-products");
  const buttons = content.querySelectorAll("[data-product-id]");

  buttons.forEach((button) => {
    const check_value = button.getAttribute("aria-selected");

    if (check_value === "false") {
      button.removeEventListener("click", handleAddToCart);
    } else if (check_value === "true") {
      button.removeEventListener("click", handleRemoveFromCart);
    } 
  });
}

// TODO: Check for dependencies and delete this file