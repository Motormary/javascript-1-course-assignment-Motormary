import { getCurrentCart } from "../../components/product-card.mjs";
import { showToast } from "../toast.mjs";
import { handleRemoveFromCart } from "./remove-from-cart.mjs";
/**
 * @param {event} - Click event containing product ID in "data-product-id"
 * @returns - Adds selected product to cart
 */

export function handleAddToCart(event) {
  const productId = event.currentTarget.getAttribute("product-id");
  checkAndAddToCart(productId);
  setButtonValues(event)
  updateNavBarCartIcon()
  showToast("Go to Cart", "/cart.html", 8000)

}

function setButtonValues(event) {
  event.currentTarget.textContent = "Remove from Cart";
  event.currentTarget.classList.add("bg-green");
  event.currentTarget.setAttribute("aria-selected", true);
  event.currentTarget.removeEventListener("click", handleAddToCart);
  event.currentTarget.addEventListener("click", handleRemoveFromCart);
}

function checkAndAddToCart(productId) {
  const current_cart = getCurrentCart();

  let newCart = [];
  if (current_cart) {
    newCart = [...current_cart, productId];
  } else {
    newCart = [productId];
  }
  localStorage.cart = JSON.stringify(newCart);
}

export function updateNavBarCartIcon() {
  const current_cart = getCurrentCart();

  const cartLength = current_cart ? current_cart.length : 0;
  const updateCartEvent = new CustomEvent("updateCart", {
    detail: { cartLength },
  });
  window.dispatchEvent(updateCartEvent);
}