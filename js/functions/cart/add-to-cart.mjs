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
  const current_cart = localStorage.cart ? JSON.parse(localStorage.cart) : localStorage.cart
  
  var cart = []
  if (current_cart) {
    cart = [...current_cart, product_id]
  } else {
    cart = [product_id]
  }
  localStorage.cart = JSON.stringify(cart)

  const updateCartEvent = new CustomEvent('updateCart', {
    detail: { cartLength: cart.length }
  });
  window.dispatchEvent(updateCartEvent);
  

  event.currentTarget.removeEventListener("click", handleAddToCart);
  event.currentTarget.addEventListener("click", handleRemoveFromCart);
}
