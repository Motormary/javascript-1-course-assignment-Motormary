import { handleAddToCart } from "./add-to-cart.mjs";
import handleProductClicked from "./product-clicked.mjs";
import { handleRemoveFromCart } from "./remove-from-cart.mjs";

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
    } else {
      button.removeEventListener("click", handleProductClicked);
    }
  });
}
