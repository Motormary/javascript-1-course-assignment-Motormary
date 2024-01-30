import { handleRemoveFromCart } from "./remove-from-cart.mjs";
/**
 * @param {product} - Product ID
 * @returns - Adds selected product to basket
 */

export function handleAddToCart(event) {
  const product_id = event.currentTarget.getAttribute("data-product-id");
  event.currentTarget.textContent = "Remove from Cart";
  event.currentTarget.className = "bg-green";
  event.currentTarget.setAttribute("aria-selected", true);
  console.log("ADDED:", product_id);
  // Add to cart / local

  event.currentTarget.removeEventListener("click", handleAddToCart);
  event.currentTarget.addEventListener("click", handleRemoveFromCart);
}
