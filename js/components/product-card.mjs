import { handleAddToCart } from "../functions/cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "../functions/cart/remove-from-cart.mjs";

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
    console.log(this.shadowRoot.querySelector(".image"))
  }

  disconnectedCallback() {
    const buttonElement = this.shadowRoot.querySelector("button.add_btn");
    const imageElement = this.shadowRoot.querySelector(".image");
    removeProductCardEventlisteners(buttonElement, imageElement);
    console.log("disconnected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "title": {
        this.shadowRoot.querySelector(".title").textContent = newValue;
        break;
      }
      case "product-id": {
        const imageElement = this.shadowRoot.querySelector(".image");
        imageElement.setAttribute("product-id", newValue);
        imageElement.addEventListener("click", redirectOnClickedImage);

        break;
      }
      case "image": {
        this.shadowRoot.querySelector(".image").setAttribute("src", newValue);
        break;
      }
      case "price": {
        this.shadowRoot.querySelector(".price").textContent = newValue + "$";
        break;
      }
      case "description": {
        this.shadowRoot.querySelector(".description").textContent = newValue;
        break;
      }
      case "gender": {
        this.shadowRoot.querySelector(".gender").textContent =
          formatGenders(newValue);
        break;
      }
      case "onsale": {
        if (newValue === "true") {
          this.shadowRoot.querySelector(".onsale").textContent = "ON SALE!";
        }
        break;
      }
      case "sizes": {
        this.shadowRoot.querySelector(".sizes").textContent =
          formatSizes(newValue);
        break;
      }
      case "colors": {
        this.shadowRoot.querySelector(".colors").textContent = newValue;
        break;
      }
      case "add_btn": {
        const buttonElement = this.shadowRoot.querySelector(".add_btn");
        const isProductInCart = checkCurrentCart(newValue);
        buttonElement.textContent = getBtnTextContent(newValue);
        AddBtnEventListener(buttonElement, isProductInCart, newValue);
        break;
      }
    }
  }
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

export function AddBtnEventListener(buttonElement, isProductInCart, newValue) {
  if (!isProductInCart) {
    buttonElement.addEventListener("click", handleAddToCart);
    buttonElement.setAttribute("data-product-id", newValue);
  } else {
    buttonElement.addEventListener("click", handleRemoveFromCart);
    buttonElement.setAttribute("data-product-id", newValue);
    buttonElement.classList.add("bg-green");
  }
}

export function removeProductCardEventlisteners(buttonElement, imageElement) {
  imageElement.removeEventListener("click", redirectOnClickedImage);
  buttonElement.removeEventListener("click", handleAddToCart);
  buttonElement.removeEventListener("click", handleRemoveFromCart);
}

export function redirectOnClickedImage(event) {
  location.href = `/product.html?product=${event.target.getAttribute(
    "product-id"
  )}`;
}

export function checkCurrentCart(id) {
  const cartContent = localStorage?.cart
    ? JSON.parse(localStorage.cart).find((item) => item === id)
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

function formatSizes(sizes) {
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
