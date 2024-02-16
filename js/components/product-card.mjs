import { handleAddToCart } from "../functions/cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "../functions/cart/remove-from-cart.mjs";
import removeFilterEventListeners from "../functions/filter/remove-filter-listeners.mjs";

const path = window.location.pathname;

class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const cardContainer = createCard();

    const titleElement = createTitle();

    const imageElement = createImage();

    const descriptionElement = createDescription();

    const sizesElement = createSizes();

    const colorsElement = createColors();

    const genderElement = createGender();

    const onSaleElement = createOnSale();

    const priceElement = createPrice();

    const buttonElement = createButton();

    const style = createStyle();

    cardContainer.append(
      titleElement,
      imageElement,
      descriptionElement,
      genderElement,
      colorsElement,
      sizesElement,
      onSaleElement,
      priceElement,
      buttonElement
    );

    this.shadowRoot.append(style, cardContainer);
  }

  connectedCallback() {
    // console.log("connected")
    setChildrenAttributesAndEvents(this.shadowRoot, this);
  }

  disconnectedCallback() {
    removeProductCardEventlisteners(this.shadowRoot);
    // console.log("disconnected");
  }
}
customElements.define("product-card", ProductCard);

/* -----------------------FUNCTIONS---------------------------- */

function setChildrenAttributesAndEvents(shadow, card) {
  shadow.querySelector(".title").textContent = card.getAttribute("title");
  shadow.querySelector(".description").textContent =
    card.getAttribute("description");
  shadow.querySelector(".gender").textContent = formatGenders(
    card.getAttribute("gender")
  );
  shadow.querySelector(".colors").textContent = card.getAttribute("colors");
  shadow.querySelector(".sizes").textContent = formatSizes(
    card.getAttribute("sizes")
  );
  shadow.querySelector(".onsale").textContent =
    card.getAttribute("onsale") === "true" ? "ON SALE!" : "";
  shadow.querySelector(".price").textContent = card.getAttribute("price") + "$";

  const productId = card.getAttribute("product-id");

  const imageElement = shadow.querySelector(".image");
  if (path !== "/product.html") imageElement.classList.add("hover")
  imageElement.setAttribute("src", card.getAttribute("image"));
  imageElement.setAttribute("product-id", productId);
  imageElement.addEventListener("click", redirectOnClickedImage);

  const buttonElement = shadow.querySelector(".add_btn");
  buttonElement.setAttribute("product-id", productId);
  const isProductInCart = checkCurrentCart(productId);
  buttonElement.textContent = getBtnTextContent(productId);
  AddBtnEventListener(buttonElement, isProductInCart);
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
  card.setAttribute("colors", product.baseColor);
  card.setAttribute("add_btn", product.id);

  return card;
}

function AddBtnEventListener(buttonElement, isProductInCart) {
  if (!isProductInCart) {
    buttonElement.addEventListener("click", handleAddToCart);
  } else {
    buttonElement.addEventListener("click", handleRemoveFromCart);
    buttonElement.classList.add("bg-green");
  }
}

function removeProductCardEventlisteners(shadow) {
  const buttonElement = shadow.querySelector("button.add_btn");
  const imageElement = shadow.querySelector(".image");
  imageElement.removeEventListener("click", redirectOnClickedImage);
  buttonElement.removeEventListener("click", handleAddToCart);
  buttonElement.removeEventListener("click", handleRemoveFromCart);
}

function redirectOnClickedImage(event) {
  if (path !== "/product.html") {
    removeFilterEventListeners();
    location.href = `/product.html?product=${event.target.getAttribute(
      "product-id"
    )}`;
  }
}

export function checkCurrentCart(productId) {
  const cartContent = localStorage?.cart
    ? JSON.parse(localStorage.cart).find((item) => item === productId)
    : false;

  return cartContent;
}

function getBtnTextContent(productId) {
  const isProductInCart = checkCurrentCart(productId);

  if (!isProductInCart) {
    return "Add to Cart";
  } else {
    return "Remove from Cart";
  }
}

export function createStyle() {
  const style = document.createElement("style");

  if (path !== "/cart.html") {
    style.textContent = `
    .card {
      position: relative;
      min-width: 250px;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 35rem;
      background-color: #fff;
      padding: 1rem 2rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      text-align: center;
    }
    .card > * {
      margin: 0;
    }
    .image {
      width: auto;
      max-height: 250px;
      object-fit: contain;
      border-radius: 4px;
    }
    .onsale {
      position: absolute;
      top: 0px;
      right: -40px;
      font-size: 26px;
      font-family: "helvetica";
      font-weight: bold;
      color: green;
      transform: rotate(30deg);
    }
    .bg-green {
      background-color: greenyellow;
    }
    .hover:hover {
      cursor: pointer;
    }
  `;
  } else if (path === "/cart.html") {
    style.textContent = `
    .card {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 1rem 2rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      text-align: center;
      margin: 0.5rem 0;
    }
    .card > * {
      flex: 1;
    }
    .image {
      width: auto;
      max-height: 100px;
      object-fit: contain;
      border-radius: 4px;
    }
    .bg-green {
      background-color: greenyellow;
    }
    .description {
      display: none;
    }
    .sizes {
      display: none;
    }
    `
  }

  return style;
}

function createCard() {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  return cardContainer;
}

function createTitle() {
  const titleElement = document.createElement("h2");
  titleElement.classList.add("title");

  return titleElement;
}

function createImage() {
  const imageElement = document.createElement("img");
  imageElement.classList.add("image");

  return imageElement;
}

function createDescription() {
  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("description");

  return descriptionElement;
}

function createGender() {
  const genderElement = document.createElement("p");
  genderElement.classList.add("gender");

  return genderElement;
}

function createSizes() {
  const product_sizes = document.createElement("p");
  product_sizes.classList.add("sizes");

  return product_sizes;
}

function createOnSale() {
  const onSaleElement = document.createElement("p");
  onSaleElement.classList.add("onsale");

  return onSaleElement;
}

function createButton() {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("add_btn");

  return buttonElement;
}

function createPrice() {
  const priceElement = document.createElement("p");
  priceElement.classList.add("price");

  return priceElement;
}

function createColors() {
  const colorsElement = document.createElement("p");
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
