import { handleAddToCart } from "../functions/cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "../functions/cart/remove-from-cart.mjs";

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

  }

  disconnectedCallback() {
    console.log("disconnected");
  }

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
      "aria-selected",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "title": {
        this.shadowRoot.querySelector(".title").textContent = newValue;
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
        console.log(newValue)
        buttonElement.textContent = getBtnTextContent(newValue);

        const current_cart = checkCurrentCart(newValue);
        if (!current_cart) {
          buttonElement.addEventListener("click", handleAddToCart);
          buttonElement.setAttribute("aria-selected", false);
        } else {
          buttonElement.addEventListener("click", handleRemoveFromCart);
          buttonElement.setAttribute("aria-selected", true);
        }
        break;
      }
    }
  }
}

export function checkCurrentCart(id) {
  const current_cart = localStorage?.cart
    ? JSON.parse(localStorage.cart).find((item) => console.log(item === id, item, id))
    : false;

  return current_cart;
}

export function getBtnTextContent(productId) {
  const current_cart = checkCurrentCart(productId);
  console.log(current_cart);

  if (!current_cart) {
    console.log("returned")
    return "Add to Cart";
  } else {
    console.log("returned")
    return "Remove from Cart";
  }
}

export function getBtnEventListener(productId) {
  const current_cart = checkCurrentCart(productId);

  if (current_cart) {
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 35rem;
        background-color: #fff;
        padding: 1rem 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
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
    `;

  return style;
}

export function createOnSaleText() {
  const on_sale_text = document.createElement("p");
  on_sale_text.textContent = "ON SALE!";
  on_sale_text.className = "on-sale";

  return on_sale_text;
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
  const formatted_gender =
    gender === "Female" ? "Women" : gender === "Male" ? "Men" : "Unisex";

  return formatted_gender;
}
