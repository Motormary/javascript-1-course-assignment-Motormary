import { getCurrentCart } from "../../components/product-card.mjs";
import { createEmptyCart, setFormTotalValue } from "../../pages/cart-page.mjs";
import { handleAddToCart, updateNavBarCartIcon } from "./add-to-cart.mjs";

/**
 * @param {event} - Click event containing product ID in "data-product-id"
 * @returns - Removes selected product from cart
 */

const path = window.location.pathname;

export function handleRemoveFromCart(event) {
  const productId = event.currentTarget.getAttribute("product-id");
  setButtonValues(event);
  checkAndRemoveFromCart(productId);
  updateNavBarCartIcon();

  if (path === "/cart.html") {
    event.currentTarget.parentElement.remove();
    const current_cart = getCurrentCart();
    setFormTotalValue();
    if (current_cart.length === 0) createEmptyCart();
  }
}

function setButtonValues(event) {
  event.currentTarget.textContent = "Add to Cart";
  event.currentTarget.classList.remove("bg-green");
  event.currentTarget.setAttribute("aria-selected", false);
  event.currentTarget.removeEventListener("click", handleRemoveFromCart);
  event.currentTarget.addEventListener("click", handleAddToCart);
}

function checkAndRemoveFromCart(productId) {
  const current_cart = getCurrentCart();

  if (current_cart.length > 0) {
    const updatedCart = current_cart.filter((item) => item.id !== productId);
    localStorage.cart = JSON.stringify(updatedCart)
  } else {
    localStorage.removeItem("cart");

  }
}
