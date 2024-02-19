import superFetch from "../../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../../api/urls.mjs";
import {
  checkCurrentCart,
  getCurrentCart,
  getPrice,
} from "../../components/product-card.mjs";
import { showToast } from "../toast.mjs";
/**
 * @param {event} - Click event containing product ID in "data-product-id"
 * @returns - Adds selected product to cart
 */

export function handleAddToCart(event) {
  const productId = event.currentTarget.getAttribute("product-id");
  const currentCard = event.currentTarget.parentElement;
  const quantity = currentCard.querySelector("input#quantity").value;
  const radioButtons = currentCard.querySelectorAll("input[name=size]");
  const size = isSelectedSize(radioButtons);

  if (size) {
    checkAndAddToCart(productId, quantity, size);
    showToast("Go to Cart", "/cart.html", 8000);
  } else {
    setMissingSize(currentCard);
  }
}

async function checkAndAddToCart(productId, quantity = "1", size) {
  const product = await superFetch(URL_PRODUCTS, productId);
  const current_cart = getCurrentCart();
  const isProductInCart = checkCurrentCart(productId, size);
  const newProduct = { ...product, quantity: quantity, selectedSize: size };

  if (isProductInCart) {
    updateProductInCart(product, quantity, size); // Produt in cart, update object.
  } else if (!isProductInCart && current_cart) {
    localStorage.cart = JSON.stringify([...current_cart, newProduct]); // Product not in cart, add to cart.
  } else {
    localStorage.cart = JSON.stringify([newProduct]); // No cart, create cart and add product.
  }

  updateNavBarCartIcon();
}

function updateProductInCart(product, quantity, size) {
  const current_cart = getCurrentCart();
  const index = current_cart.findIndex((item) => item.id === product.id && item.selectedSize === size);

  current_cart[index] = {
    ...current_cart[index],
    quantity: parseFloat(current_cart[index].quantity) + parseFloat(quantity),
    selectedSize: size,
  };

  localStorage.cart = JSON.stringify(current_cart);
}

export function isSelectedSize(buttons) {
  const button = Array.from(buttons).find((button) => button.checked);
  if (button) return button.id;
  else return false;
}

export function updateNavBarCartIcon() {
  const current_cart = getCurrentCart();

  const cartLength = current_cart ? current_cart.length : 0;
  const updateCartEvent = new CustomEvent("updateCart", {
    detail: { cartLength },
  });
  window.dispatchEvent(updateCartEvent);
}

function setMissingSize(container) {
  const radioGroup = container.querySelector(".radio-grp");
  radioGroup.style = `
  border: 1px solid red;
  padding: 0.25rem 0;
`;

  const errorMessage = document.createElement("p");
  errorMessage.textContent = "Size required*";
  errorMessage.style = "color: red;"


  radioGroup.after(errorMessage);

  setTimeout(() => {
    errorMessage.remove()
    radioGroup.style = ""
  }, 5000)
}
