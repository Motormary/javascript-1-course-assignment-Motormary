import superFetch from "../../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../../api/urls.mjs";
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
  showToast("Go to Cart", "/cart.html", 8000)

}

function setButtonValues(event) {
  event.currentTarget.textContent = "Remove from Cart";
  event.currentTarget.classList.add("bg-green");
  event.currentTarget.setAttribute("aria-selected", true);
  event.currentTarget.removeEventListener("click", handleAddToCart);
  event.currentTarget.addEventListener("click", handleRemoveFromCart);
}

async function checkAndAddToCart(productId) {
  const current_cart = getCurrentCart();
  const product = await superFetch(URL_PRODUCTS, productId)

  if (current_cart) {
    localStorage.cart = JSON.stringify([...current_cart, product]);
  } else {
    localStorage.cart = JSON.stringify([product]);
  }
  updateNavBarCartIcon()
}

export function updateNavBarCartIcon() {
  const current_cart = getCurrentCart();

  const cartLength = current_cart ? current_cart.length : 0;
  const updateCartEvent = new CustomEvent("updateCart", {
    detail: { cartLength },
  });
  window.dispatchEvent(updateCartEvent);
}