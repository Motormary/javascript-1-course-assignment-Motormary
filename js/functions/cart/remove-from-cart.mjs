import {
  getCurrentCard,
  getCurrentCart,
} from "../../components/product-card.mjs";
import { createEmptyCart, fetchCartItems, setFormItemsIncart, setFormTotalValue } from "../../pages/cart-page.mjs";
import {
  handleAddToCart,
  isSelectedSize,
  updateNavBarCartIcon,
} from "./add-to-cart.mjs";

/**
 * @param {event} - Click event containing product ID in "data-product-id"
 * @returns - Removes selected product from cart
 */

const path = window.location.pathname;

export function handleRemoveFromCart(event) {
  const productId = event.currentTarget.getAttribute("product-id");
  const radioButtons =
    event.currentTarget.parentElement.querySelectorAll("input[name=size]");
  const size = isSelectedSize(radioButtons);
  checkAndRemoveFromCart(productId, size);
  updateNavBarCartIcon();
  const currentCard = getCurrentCard(productId, size);

  if (path === "/cart.html") {
    currentCard.remove()
    const current_cart = getCurrentCart();
    if (current_cart.length > 0) {
      setFormTotalValue();
      setFormItemsIncart()
    }
    if (current_cart.length === 0) createEmptyCart();
  }
}

function checkAndRemoveFromCart(productId, size) {
  const current_cart = getCurrentCart();

  if (current_cart.length > 0) {
    const updatedCart = current_cart.filter(
      (item) => !(item.id === productId && item.selectedSize === size)
    );
    localStorage.cart = JSON.stringify(updatedCart);
  } else {
    localStorage.removeItem("cart");
  }
}
