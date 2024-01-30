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
    console.log("REMOVED:", product_id);
    // Remove from cart / local
  
    event.currentTarget.removeEventListener("click", handleRemoveFromCart);
    event.currentTarget.addEventListener("click", handleAddToCart);
  }