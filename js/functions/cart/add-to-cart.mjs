import superFetch from "../../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../../api/urls.mjs";
import {
  checkCurrentCart,
  getCurrentCard,
  getCurrentCart,
} from "../product-card-functions.mjs";
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
  checkAndSetMissingSize(currentCard, event.currentTarget, size);

  if (size) {
    setAddedToCartText(event.currentTarget);
    checkAndAddToCart(productId, quantity, size, currentCard.id);
    showToast("Go to Cart", "/cart.html", 8000);
  }
}
//-----------------------------------------------------------------------

/**
 *
 * @param {*} productId
 * @param {*} quantity
 * @param {*} size
 * @param {*} componentId
 * @description - Checks if product is in cart, if it is, updates quantity.
 * else if cart exists and product does not, add.
 * if no cart, create cart with new product.
 */

async function checkAndAddToCart(productId, quantity = "1", size, componentId) {
  const product = fetchComponentAttributes(componentId);
  // const product = await superFetch(URL_PRODUCTS, productId);
  const current_cart = getCurrentCart();
  const isProductInCart = checkCurrentCart(productId, size);
  const newProduct = { ...product, quantity: quantity, selectedSize: size };

  if (isProductInCart) {
    updateProductInCart(product, quantity, size); // Product already in cart, update object.
  } else if (!isProductInCart && current_cart) {
    localStorage.cart = JSON.stringify([...current_cart, newProduct]); // Product not in cart, add to cart.
  } else {
    localStorage.cart = JSON.stringify([newProduct]); // No cart, create cart and add product.
  }

  updateNavBarCartIcon();
}
//-----------------------------------------------------------------------

/**
 *
 * @param {*} product
 * @param {*} quantity
 * @param {*} size
 * @description - Called if product already exists in cart, then updates the quantity.
 */
function updateProductInCart(product, quantity, size) {
  const current_cart = getCurrentCart();
  const index = current_cart.findIndex(
    (item) => item.id === product.id && item.selectedSize === size
  );

  current_cart[index] = {
    ...current_cart[index],
    quantity: parseFloat(current_cart[index].quantity) + parseFloat(quantity),
    selectedSize: size,
  };

  localStorage.cart = JSON.stringify(current_cart);
}
//-----------------------------------------------------------------------

/**
 *
 * @param {*} buttons
 * @returns - Id(size) of selected radio button.
 */

export function isSelectedSize(buttons) {
  const button = Array.from(buttons).find((button) => button.checked);
  if (button) return button.id;
  else return false;
}
//-----------------------------------------------------------------------

/**
 *
 * @description - Update the floating navbar icon showing cart.length
 */
export function updateNavBarCartIcon() {
  const current_cart = getCurrentCart();

  const cartLength = current_cart ? current_cart.length : 0;
  const updateCartEvent = new CustomEvent("updateCart", {
    detail: { cartLength },
  });
  window.dispatchEvent(updateCartEvent);
}
//-----------------------------------------------------------------------
/**
 *
 * @param {*} currentCard
 * @param {*} event
 * @description - Creates error message if size has not been selected
 */
function checkAndSetMissingSize(currentCard, event, size) {
  const isErrorVisible = currentCard.querySelector("p.missing-size"); 
  const getButton = currentCard.querySelector("button.add_btn");
  const radioGroup = currentCard.querySelector(".radio-grp");
  const getStyle = radioGroup.querySelector("style#error");

  if (size && isErrorVisible) { // Removes error message if size has been selected and error is visible.
    getButton.style = "";
    isErrorVisible.remove();
    getStyle.remove();
    return;
  } else if (!size && !isErrorVisible) { // No size and no error visible, create error.
    const button = event;
    const style = document.createElement("style");
    style.id = "error";
    const errorMessage = document.createElement("p");

    style.textContent = `
    label {
      border-color: red;
    }
    `;
    radioGroup.appendChild(style);

    errorMessage.classList.add("missing-size");
    errorMessage.textContent = "Size required*";
    errorMessage.style = "color: red;";

    button.style = "border-color: red; border-radius: 4px;";

    radioGroup.after(errorMessage);
  }

}
//-----------------------------------------------------------------------

/**
 *
 * @param {*} event
 * @description - Changes button text to inform user product has been added to cart
 */
function setAddedToCartText(event) {
  const button = event;
  button.textContent = "Successfully added";
  button.classList.add("bg-green");
  button.style = "border-radius: 4px;";

  setTimeout(() => {
    button.textContent = "Add to Cart";
    button.classList.remove("bg-green");
    button.style = "";
  }, 700);
}
//-----------------------------------------------------------------------

/**
 * @description - Creates a product object from the card components attributes.
 * @param {*} componentId
 * @returns - Product object
 */
function fetchComponentAttributes(componentId) {
  const component = getCurrentCard(componentId);
  const product = {
    id: component.getAttribute("product-id"),
    title: component.getAttribute("title"),
    description: component.getAttribute("description"),
    image: component.getAttribute("image"),
    sizes: component.getAttribute("sizes").split(","),
    gender: component.getAttribute("gender"),
    onSale: component.getAttribute("onsale") === "true",
    price: parseFloat(component.getAttribute("price")),
    discountedPrice: parseFloat(component.getAttribute("discount")),
    baseColor: component.getAttribute("colors"),
  };

  // Attribute/variables/functions has to be changed everywhere before mapping out the attributes directly.....
  /*   const product = Object.fromEntries( 
    Array.from(component.attributes) 
    .map((attr) => [attr.name, attr.value]) 
  ); */

  return product;
}
