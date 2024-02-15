import { handleAddToCart } from "../functions/cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "../functions/cart/remove-from-cart.mjs";
import removeFilterEventListeners from "../functions/filter/remove-filter-listeners.mjs";

class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return [
      "title",
      "image",
      "description",
      "price",
      "gender",
      "onsale",
      "sizes",
      "add_btn",
      "colors",
      "product-id",
    ];
  }

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
    //console.log("connected")
    setChildrenAttributes(this.shadowRoot, this);
  }

  disconnectedCallback() {
    removeProductCardEventlisteners(this.shadowRoot);
    //console.log("disconnected");
  }
}

export function setChildrenAttributes(shadow, card) {
  shadow.querySelector(".title").textContent = card.getAttribute("title");
  shadow.querySelector(".description").textContent = card.getAttribute("description");
  shadow.querySelector(".gender").textContent = formatGenders(card.getAttribute("gender"));
  shadow.querySelector(".colors").textContent = card.getAttribute("colors");
  shadow.querySelector(".sizes").textContent = formatSizes(card.getAttribute("sizes"));
  shadow.querySelector(".onsale").textContent = card.getAttribute("onsale") === "true" ? "ON SALE!" : "";
  shadow.querySelector(".price").textContent = card.getAttribute("price") + "$";

  const productId = card.getAttribute("product-id");
  
  const imageElement = shadow.querySelector(".image");
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

export function AddBtnEventListener(buttonElement, isProductInCart) {

  if (!isProductInCart) {
    buttonElement.addEventListener("click", handleAddToCart);
  } else {
    buttonElement.addEventListener("click", handleRemoveFromCart);
    buttonElement.classList.add("bg-green");
  }
}

export function removeProductCardEventlisteners(shadow) {
  const buttonElement = shadow.querySelector("button.add_btn");
  const imageElement = shadow.querySelector(".image");
  imageElement.removeEventListener("click", redirectOnClickedImage);
  buttonElement.removeEventListener("click", handleAddToCart);
  buttonElement.removeEventListener("click", handleRemoveFromCart);
}

export function redirectOnClickedImage(event) {
  removeFilterEventListeners()
  location.href = `/product.html?product=${event.target.getAttribute(
    "product-id"
  )}`;
}

export function checkCurrentCart(productId) {
  const cartContent = localStorage?.cart
    ? JSON.parse(localStorage.cart).find((item) => item === productId)
    : false;

  return cartContent;
}

export function getBtnTextContent(productId) {
  const isProductInCart = checkCurrentCart(productId);

  if (!isProductInCart) {
    return "Add to Cart";
  } else {
    return "Remove from Cart";
  }
}

export function getBtnEventListener(productId) {
  const isProductInCart = checkCurrentCart(productId);

  if (isProductInCart) {
    return handleRemoveFromCart;
  } else {
    return handleAddToCart;
  }
}

customElements.define("product-card", ProductCard);

export function createStyle() {
  const style = document.createElement("style");
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
      .image:hover {
        cursor: pointer;
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
    `;

  return style;
}

export function createOnSaleText() {
  const onSaleElement = document.createElement("p");
  onSaleElement.textContent = "ON SALE!";
  onSaleElement.className = "on-sale";

  return onSaleElement;
}

export function createCard() {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  return cardContainer;
}

export function createTitle() {
  const titleElement = document.createElement("h2");
  titleElement.classList.add("title");

  return titleElement;
}

export function createImage() {
  const imageElement = document.createElement("img");
  imageElement.classList.add("image");

  return imageElement;
}

export function createDescription() {
  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("description");

  return descriptionElement;
}

export function createGender() {
  const genderElement = document.createElement("p");
  genderElement.classList.add("gender");

  return genderElement;
}

export function createSizes() {
  const product_sizes = document.createElement("p");
  product_sizes.classList.add("sizes");

  return product_sizes;
}

export function createOnSale() {
  const onSaleElement = document.createElement("p");
  onSaleElement.classList.add("onsale");

  return onSaleElement;
}

export function createButton() {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("add_btn");

  return buttonElement;
}

export function createPrice() {
  const priceElement = document.createElement("p");
  priceElement.classList.add("price");

  return priceElement;
}

export function createColors() {
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
