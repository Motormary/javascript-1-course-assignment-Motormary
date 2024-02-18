import { handleAddToCart } from "../functions/cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "../functions/cart/remove-from-cart.mjs";
import { setFormTotalValue } from "../pages/cart-page.mjs";
import {
  cardCartStyle,
  cardRadioStyle,
  cardStyle,
  quantityStyle,
} from "./styles.mjs";

const path = window.location.pathname;

class ProductCard extends HTMLElement {
  static observedAttributes = ["quantity"];
  constructor() {
    super();
  }

  updateQuantity(newValue) {
    this.setAttribute("quantity", newValue);
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const cardContainer = createCard();

    const titleElement = createTitle(this.getAttribute("title"));

    const imageElement = createImage(
      this.getAttribute("image"),
      this.getAttribute("product-id")
    );

    const descriptionElement = createDescription(
      this.getAttribute("description")
    );

    const colorsElement = createColors(this.getAttribute("colors"));

    const genderElement = createGender(this.getAttribute("gender"));

    const onSaleElement = createOnSale(this.getAttribute("onsale"));

    const priceElement = createPrice(
      this.getAttribute("price"),
      this.getAttribute("quantity"),
      this.getAttribute("onsale"),
      this.getAttribute("discount")
    );

    const buttonElement = createButton(this.getAttribute("product-id"));

    const sizesButton = createSizesButton(
      this.getAttribute("sizes").split(","),
      this.getAttribute("selectedSize")
    );

    const style = createStyle();

    const quantityElement = createQuantity(this.getAttribute("quantity"), this);

    cardContainer.append(
      titleElement,
      imageElement,
      descriptionElement,
      genderElement,
      colorsElement,
      sizesButton,
      onSaleElement,
      quantityElement,
      priceElement,
      buttonElement
    );

    this.shadowRoot.append(style, cardContainer);
    // console.log("connected")
  }

  disconnectedCallback() {
    removeProductCardEventlisteners(this.shadowRoot);
    // console.log("disconnected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.shadowRoot) {
      const price = getPrice(
        this.getAttribute("price"),
        this.getAttribute("discount"),
        this.getAttribute("onsale")
      );
      const priceElement = this.shadowRoot.querySelector(".price");
      priceElement.textContent = (price * newValue).toFixed(2) + "$";
    }
  }
}
customElements.define("product-card", ProductCard);

/* -----------------------FUNCTIONS---------------------------- */

ProductCard.prototype.updateQuantity = function (newValue) {
  this.setAttribute("quantity", newValue);
};

function createQuantity(quantity) {
  const container = document.createElement("div");
  const inputElement = document.createElement("input");
  const minusElement = document.createElement("button");
  const plusELement = document.createElement("button");
  const style = document.createElement("style");

  container.classList.add("quantity-container");
  minusElement.classList.add("sub-quantity");
  plusELement.classList.add("add-quantity");

  style.textContent = quantityStyle;

  inputElement.id = "quantity";
  inputElement.type = "number";
  inputElement.value = quantity ? quantity : 1;
  inputElement.readOnly = true;
  minusElement.textContent = "-";
  plusELement.textContent = "+";

  plusELement.addEventListener("click", addQuantity);
  minusElement.addEventListener("click", subtractQuantity);

  container.append(style, minusElement, inputElement, plusELement);

  return container;
}

function subtractQuantity(event) {
  const container = event.target.parentElement;
  const card = container.parentElement;
  const inputElement = event.target.nextElementSibling;
  const productId = card
    .querySelector("[product-id]")
    .getAttribute("product-id");
  const currentCard = getCurrentCard(productId);

  const quantity = inputElement.value;
  if (isNaN(quantity) || quantity <= 1) {
    inputElement.value = 1;
  } else inputElement.value--;
  currentCard.updateQuantity(inputElement.value);
  if (path === "/cart.html") setFormTotalValue();
}

function addQuantity(event) {
  const container = event.target.parentElement;
  const card = container.parentElement;
  const inputElement = event.target.previousElementSibling;
  const productId = card
    .querySelector("[product-id]")
    .getAttribute("product-id");
  const currentCard = getCurrentCard(productId);

  inputElement.value++;
  currentCard.updateQuantity(inputElement.value);
  if (path === "/cart.html") setFormTotalValue();
}

export function getCurrentCard(productId) {
  const currentCard = Array.from(
    document.querySelectorAll("product-card")
  ).find((item) => item.getAttribute("product-id") === productId);

  return currentCard;
}

function AddBtnEventListener(buttonElement) {
  if (path !== "/cart.html") {
    buttonElement.addEventListener("click", handleAddToCart);
  } else {
    buttonElement.addEventListener("click", handleRemoveFromCart);
    buttonElement.classList.add("bg-green");
  }
}

function removeProductCardEventlisteners(shadow) {
  const buttonElement = shadow.querySelector("button.add_btn");
  const labelElements = shadow.querySelectorAll("label");
  const addElement = shadow.querySelector(".add-quantity");
  const minusElement = shadow.querySelector(".sub-quantity");
  if (buttonElement) {
    buttonElement.removeEventListener("click", handleAddToCart);
    buttonElement.removeEventListener("click", handleRemoveFromCart);
  }
  if (labelElements) {
    labelElements.forEach((label) =>
      label.removeEventListener("keydown", handleChangeLabels)
    );
  }
  if (addElement) {
    addElement.removeEventListener("click", addQuantity); //TODO
    minusElement.removeEventListener("click", subtractQuantity); //TODO
  }
}

function getBtnTextContent() {
  if (path == "/cart.html") return "Remove from Cart";
  else return "Add to cart";
}

export function createStyle() {
  const style = document.createElement("style");

  if (path !== "/cart.html") style.textContent = cardStyle;
  else if (path === "/cart.html") style.textContent = cardCartStyle;

  return style;
}

function createSizesButton(sizes, selectedSize) {
  const container = document.createElement("div");
  container.classList.add("radio-grp");

  const style = document.createElement("style");
  style.textContent = cardRadioStyle;

  container.appendChild(style);

  sizes.forEach((size) => {
    const inputElement = document.createElement("input");
    const labelElement = document.createElement("label");

    inputElement.type = "radio";
    inputElement.id = size;
    inputElement.name = "size";
    inputElement.value = size;
    inputElement.checked = selectedSize === inputElement.id ? true : false

    labelElement.setAttribute("for", size);
    labelElement.textContent = size;
    labelElement.tabIndex = "0";

    labelElement.addEventListener("keydown", handleChangeLabels);

    container.append(inputElement, labelElement);
  });

  return container;
}

function handleChangeLabels(event) {
  const labelElement = event.target;
  const inputElement = labelElement.previousElementSibling;
  if (event.code === "Space" || event.code === "Enter") {
    inputElement.checked = true;

    const allLabels = document.querySelectorAll(".size-label");
    allLabels.forEach((label) => label.classList.remove("selected"));
    labelElement.classList.add("selected");
  }
}

function createCard() {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  return cardContainer;
}

function createTitle(title) {
  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  titleElement.classList.add("title");

  return titleElement;
}

function createImage(src, productId) {
  const imageContainer = document.createElement("a");

  const imageElement = document.createElement("img");
  imageElement.setAttribute("src", src);
  imageElement.setAttribute("product-id", productId);
  imageElement.classList.add("image");

  if (path !== "/product.html") {
    imageElement.classList.add("hover");
    imageContainer.href = `/product.html?product=${productId}`;
  }

  imageContainer.appendChild(imageElement);
  return imageContainer;
}

function createDescription(description) {
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;
  descriptionElement.classList.add("description");

  return descriptionElement;
}

function createGender(gender) {
  const genderElement = document.createElement("p");
  genderElement.textContent = formatGenders(gender);
  genderElement.classList.add("gender");

  return genderElement;
}

function createOnSale(isOnSale) {
  const onSaleElement = document.createElement("p");
  onSaleElement.textContent = isOnSale === "true" ? "ON SALE!" : "";
  onSaleElement.classList.add("onsale");

  return onSaleElement;
}

function createButton(productId) {
  const buttonElement = document.createElement("button");
  const isProductInCart = checkCurrentCart(productId);

  buttonElement.classList.add("add_btn");
  buttonElement.setAttribute("product-id", productId);
  buttonElement.textContent = getBtnTextContent(productId);
  AddBtnEventListener(buttonElement, isProductInCart);
  return buttonElement;
}

function createPrice(price, quantity, onsale, discountedPrice) {
  const checkedPrice = getPrice(price, discountedPrice, onsale);
  const priceElement = document.createElement("p");
  priceElement.textContent = (checkedPrice * quantity).toFixed(2) + "$";
  priceElement.classList.add("price");

  return priceElement;
}

export function getPrice(price, discountedPrice, onsale) {
  if (onsale) return discountedPrice;
  else return price;
}

function createColors(color) {
  const colorsElement = document.createElement("p");
  colorsElement.textContent = color;
  colorsElement.classList.add("colors");

  return colorsElement;
}

export function formatSizes(sizes) {
  const formattedSizes = sizes.replaceAll(",", " - ");

  return formattedSizes;
}

export function formatGenders(gender) {
  const formattedGender =
    gender === "Female" ? "Women" : gender === "Male" ? "Men" : "Unisex";

  return formattedGender;
}

export function getCurrentCart() {
  const current_cart = JSON.parse(localStorage.getItem("cart")) || [];

  return current_cart;
}

export function checkCurrentCart(productId) {
  const current_cart = getCurrentCart();

  if (current_cart) {
    return current_cart.find((item) => item.id === productId);
  }
  return false;
}

export function createProductCard(product) {
  const card = document.createElement("product-card");

  card.setAttribute("product-id", product.id);
  card.setAttribute("title", product.title);
  card.setAttribute("image", product.image);
  card.setAttribute("description", product.description);
  card.setAttribute("sizes", product.sizes);
  card.setAttribute("gender", product.gender);
  card.setAttribute("onsale", product.onSale);
  card.setAttribute("price", product.price);
  card.setAttribute("discount", product.discountedPrice);
  card.setAttribute("colors", product.baseColor);
  card.setAttribute("add_btn", product.id);
  card.setAttribute("quantity", product?.quantity || "1");
  card.setAttribute("selectedSize", product?.selectedSize || "");

  return card;
}
