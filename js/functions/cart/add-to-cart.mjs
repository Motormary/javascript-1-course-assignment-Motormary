import superFetch from "../../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../../api/urls.mjs";
import { checkCurrentCart, getCurrentCart } from "../product-card-functions.mjs";
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
    setAddedToCartText(event.currentTarget)
    checkAndAddToCart(productId, quantity, size);
    showToast("Go to Cart", "/cart.html", 8000);
  } else {
    setMissingSize(currentCard, event.currentTarget);
  }
}

async function checkAndAddToCart(productId, quantity = "1", size) {
  const product = await superFetch(URL_PRODUCTS, productId); // TODO get data directly from component?
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

function setMissingSize(container, event) {
  const button = event
  const radioGroup = container.querySelector(".radio-grp");
  const style = document.createElement("style")

  style.textContent = `
  label {
    border-color: red;
  }
  `
  radioGroup.appendChild(style)

  const errorMessage = document.createElement("p");
  errorMessage.textContent = "Size required*";
  errorMessage.style = "color: red;"

  button.style = "border-color: red; border-radius: 4px;"

  radioGroup.after(errorMessage);

  setTimeout(() => {
    button.style = ""
    errorMessage.remove()
    style.remove()
  }, 3000)
}

function setAddedToCartText(event) {
  const button = event
  button.textContent = "Successfully added"
  button.classList.add("bg-green")
  button.style = "border-radius: 4px;"

  setTimeout(() => {
    button.textContent = "Add to Cart"
    button.classList.remove("bg-green")
    button.style = ""
  }, 700)

}