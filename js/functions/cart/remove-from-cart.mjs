
import {
  createEmptyCart, setFormItemsIncart,
  setFormTotalValue
} from "../../pages/cart-page.mjs";
import { getCurrentCard, getCurrentCart } from "../product-card-functions.mjs";
import {
  isSelectedSize,
  updateNavBarCartIcon
} from "./add-to-cart.mjs";

const path = window.location.pathname;

/**
 * @param {event}
 * @description - Removes selected product from cart / cart list.
 */
export function handleRemoveFromCart(event) {
  const { productId, size, currentCard } = getDataToCheck(event);
  checkAndRemoveFromCart(productId, size);
  updateNavBarCartIcon();

  if (path === "/cart.html") {
    currentCard.remove();
    const current_cart = getCurrentCart();
    if (current_cart.length > 0) {
      setFormTotalValue();
      setFormItemsIncart();
    }
    if (current_cart.length === 0) createEmptyCart();
  }
}
//-----------------------------------------------------------------------

/**
 * 
 * @param {*} productId 
 * @param {*} size 
 * @description - Finds and removes the product by using productId and size
 */
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
//-----------------------------------------------------------------------

/**
 * 
 * @param {*} event 
 * @returns values needed to remove item from cart.
 */
function getDataToCheck(event) {
  const componentId = event.currentTarget.parentElement.getAttribute("id");
  const productId = event.currentTarget.getAttribute("product-id");
  const radioButtons =
    event.currentTarget.parentElement.querySelectorAll("input[name=size]");
  const size = isSelectedSize(radioButtons);
  const currentCard = getCurrentCard(componentId);

  return { productId, size, currentCard };
}
