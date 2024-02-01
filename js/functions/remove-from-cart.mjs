import { handleAddToCart } from "./add-to-cart.mjs";

/**
 * @param {product} - Product ID
 * @returns - Removes selected product from basket
 */

export function handleRemoveFromCart(event) {
  const product_id = event.currentTarget.getAttribute("data-product-id");
  event.currentTarget.textContent = "Add to Cart";
  event.currentTarget.className = "";
  event.currentTarget.setAttribute("aria-selected", false);
  var current_cart = JSON.parse(localStorage.cart);
  if (current_cart) {
    const index = current_cart.indexOf(product_id);
    if (index !== -1) {
      current_cart.splice(index, 1);
      localStorage.cart = JSON.stringify(current_cart);
    }
  }

  // Remove from cart / local

  event.currentTarget.removeEventListener("click", handleRemoveFromCart);
  event.currentTarget.addEventListener("click", handleAddToCart);
}
