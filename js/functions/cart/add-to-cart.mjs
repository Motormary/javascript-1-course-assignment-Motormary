import superFetch from "../../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../../api/urls.mjs";
import {
  checkCurrentCart,
  getCurrentCart,
} from "../../components/product-card.mjs";
import { setFormTotalValue } from "../../pages/cart-page.mjs";
import { showToast } from "../toast.mjs";
import { handleRemoveFromCart } from "./remove-from-cart.mjs";
/**
 * @param {event} - Click event containing product ID in "data-product-id"
 * @returns - Adds selected product to cart
 */

export function handleAddToCart(event) {
  const productId = event.currentTarget.getAttribute("product-id");
  const currentCard = event.currentTarget.parentElement;
  const quantity = currentCard.querySelector("input#quantity").value;
  const sizes = currentCard.querySelector(".sizes");

  checkAndAddToCart(productId, quantity);
  setButtonValues(event);
  showToast("Go to Cart", "/cart.html", 8000);
}

function setButtonValues(event) {
  event.currentTarget.textContent = "Remove from Cart";
  event.currentTarget.classList.add("bg-green");
  event.currentTarget.setAttribute("aria-selected", true);
  event.currentTarget.removeEventListener("click", handleAddToCart);
  event.currentTarget.addEventListener("click", handleRemoveFromCart);
}

async function checkAndAddToCart(productId, quantity = "1") {
  const product = await superFetch(URL_PRODUCTS, productId);
  const current_cart = getCurrentCart();
  const isProductInCart = checkCurrentCart();
  const newProduct = { ...product, quantity: quantity, price: product.price * quantity };

  if (isProductInCart) {
    updateProductInCart(product, quantity);
  } else if (!isProductInCart && current_cart) {
    localStorage.cart = JSON.stringify([...current_cart, newProduct]);
  } else {
    localStorage.cart = JSON.stringify([newProduct]);
  }

  updateNavBarCartIcon();
}

function updateProductInCart(product, quantity) {
  const current_cart = getCurrentCart();
  const index = current_cart.indexOf(product.id);

  current_cart[index] = {
    ...current_cart[index],
    quantity: current_cart[index].quantity + quantity,
  };

  localStorage.cart = JSON.stringify([current_cart]);
}

function findSelectedRadioButton() {
  const radioButtons = document.querySelectorAll("[name=size]");

  console.log(radioButtons);
}

// findSelectedRadioButton()

export function updateNavBarCartIcon() {
  const current_cart = getCurrentCart();

  const cartLength = current_cart ? current_cart.length : 0;
  const updateCartEvent = new CustomEvent("updateCart", {
    detail: { cartLength },
  });
  window.dispatchEvent(updateCartEvent);
}
