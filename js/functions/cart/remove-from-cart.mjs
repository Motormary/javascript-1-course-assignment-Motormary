import { getCurrentCart } from "../../components/product-card.mjs";
import { handleAddToCart, updateNavBarCartIcon } from "./add-to-cart.mjs";

/**
 * @param {event} - Click event containing product ID in "data-product-id"
 * @returns - Removes selected product from cart
 */

const path = window.location.pathname

export function handleRemoveFromCart(event) {
  const productId = event.currentTarget.getAttribute("product-id");
  setButtonValues(event);
  checkAndRemoveFromCart(productId);
  updateNavBarCartIcon();

  if (path === "/cart.html") event.currentTarget.parentElement.remove()
  
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

  if (current_cart) {
    const index = current_cart.indexOf(productId);
    if (index !== -1) {
      current_cart.splice(index, 1);
      localStorage.cart = JSON.stringify(current_cart);
      if (current_cart.length === 0) {
        localStorage.removeItem("cart");
      }
    }
  }
}


