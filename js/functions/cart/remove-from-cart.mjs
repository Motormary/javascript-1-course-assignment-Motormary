import { getCurrentCard, getCurrentCart } from "../../components/product-card.mjs";
import { createEmptyCart, setFormTotalValue } from "../../pages/cart-page.mjs";
import { handleAddToCart, updateNavBarCartIcon } from "./add-to-cart.mjs";

/**
 * @param {event} - Click event containing product ID in "data-product-id"
 * @returns - Removes selected product from cart
 */

const path = window.location.pathname;

export function handleRemoveFromCart(event) {
  const productId = event.currentTarget.getAttribute("product-id");
  checkAndRemoveFromCart(productId);
  updateNavBarCartIcon();
  const currentCard = getCurrentCard(productId)

  if (path === "/cart.html") {
    currentCard.remove();
    const current_cart = getCurrentCart();
    if (current_cart.length > 0) setFormTotalValue();
    if (current_cart.length === 0) createEmptyCart();
  }
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
