import {
  handleAddToCart,
  isSelectedSize,
} from "../functions/cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "../functions/cart/remove-from-cart.mjs";
import { setFormItemsIncart, setFormTotalValue } from "../pages/cart-page.mjs";
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

    this.attachShadow({ mode: "open" });

    const cardContainer = createCard();

    const titleElement = createTitle();

    const imageElement = createImage();

    const descriptionElement = createDescription();

    const colorsElement = createColors();

    const genderElement = createGender();

    const onSaleElement = createOnSale();

    const priceElement = createPrice();

    const buttonElement = createButton();

    const style = createStyle();

    const quantityElement = createQuantity();

    cardContainer.append(
      titleElement,
      imageElement,
      descriptionElement,
      genderElement,
      colorsElement,
      onSaleElement,
      quantityElement,
      priceElement,
      buttonElement
    );

    this.shadowRoot.append(style, cardContainer);
  }

  updateQuantity(newValue) {
    this.setAttribute("quantity", newValue);
  }

  getComponentId() {
    return this.getAttribute("id");
  }
  getProductId() {
    return this.getAttribute("product-id");
  }
  getTitle() {
    return this.getAttribute("title");
  }
  getDescription() {
    return this.getAttribute("description");
  }
  getImage() {
    return this.getAttribute("image");
  }
  getGender() {
    return this.getAttribute("gender");
  }
  getColor() {
    return this.getAttribute("colors");
  }
  getSizes() {
    return this.getAttribute("sizes");
  }
  getSelectedSize() {
    return this.getAttribute("selectedSize");
  }
  getOnsale() {
    return this.getAttribute("onsale");
  }
  getQuantity() {
    return this.getAttribute("quantity");
  }
  getPrice() {
    return this.getAttribute("price");
  }
  getDiscount() {
    return this.getAttribute("discount");
  }

  connectedCallback() {
    setCardAttributes(this);
    setTitleAttributes(this);
    setDescriptionAttributes(this);
    setImageAttributes(this);
    setGenderAttributes(this);
    const colorElement = setColorAttributes(this);
    const sizesElement = setSizesAttributes(this);
    setSizesAttributes(this);
    setOnsaleAttributes(this);
    setQuantityAttributes(this);
    setPriceAttributes(this);
    setButtonAttributes(this)

    colorElement.after(sizesElement);

    // console.log("connected")
  }

  disconnectedCallback() {
    removeProductCardEventlisteners(this.shadowRoot);
    // console.log("disconnected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.shadowRoot) {
      const price = getCorrectPrice(
        this.getPrice(),
        this.getDiscount(),
        this.getOnsale()
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

function setCardAttributes(productcard) {
  const CardElement = productcard.shadowRoot.querySelector(".card");
  CardElement.setAttribute("id", productcard.getComponentId());
}

function setTitleAttributes(productcard) {
  const titleElement = productcard.shadowRoot.querySelector(".title");
  titleElement.textContent = productcard.getTitle();
}
function setDescriptionAttributes(productcard) {
  const descriptionElement =
    productcard.shadowRoot.querySelector(".description");
  descriptionElement.textContent = productcard.getDescription();
}
function setImageAttributes(productcard) {
  const imageContainerElement = productcard.shadowRoot.querySelector("a");
  const imageElement = productcard.shadowRoot.querySelector(".image");
  imageElement.setAttribute("src", productcard.getImage());
  imageElement.setAttribute("product-id", productcard.getProductId());
  if (path !== "/product.html") {
    imageContainerElement.href = `/product.html?product=${productcard.getProductId()}`;
    imageElement.classList.add("hover");
  }
}

function setGenderAttributes(productcard) {
  const genderElement = productcard.shadowRoot.querySelector(".gender");
  genderElement.textContent = formatGenders(productcard.getGender());
}
function setColorAttributes(productcard) {
  const colorElement = productcard.shadowRoot.querySelector(".colors");
  colorElement.textContent = productcard.getColor();
  return colorElement;
}
function setSizesAttributes(productcard) {
  const sizesElement = createSizesButton(
    productcard.getSizes().split(","),
    productcard.getSelectedSize()
  );
  return sizesElement;
}

function setOnsaleAttributes(productcard) {
  const onsaleElement = productcard.shadowRoot.querySelector(".onsale");
  onsaleElement.textContent =
    productcard.getOnsale() === "true" ? "ON SALE!" : "";
}
function setQuantityAttributes(productcard) {
  const quantityContainer = productcard.shadowRoot.querySelector(
    ".quantity-container"
  );
  quantityContainer.setAttribute("id", productcard.getComponentId());

  const quantityElement = productcard.shadowRoot.querySelector("#quantity");
  quantityElement.value = productcard.getQuantity();
}

function setPriceAttributes(productcard) {
  const priceElement = productcard.shadowRoot.querySelector(".price");
  priceElement.textContent =
    (
      getCorrectPrice(
        productcard.getPrice(),
        productcard.getDiscount(),
        productcard.getOnsale()
      ) * productcard.getQuantity()
    ).toFixed(2) + "$";
}
function setButtonAttributes(productcard) {
  const buttonElement = productcard.shadowRoot.querySelector("button.add_btn");
  buttonElement.setAttribute("product-id", productcard.getProductId());
}

function createQuantity() {
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
  inputElement.value = 1;
  inputElement.readOnly = true;
  minusElement.textContent = "-";
  plusELement.textContent = "+";

  plusELement.addEventListener("click", addQuantity);
  minusElement.addEventListener("click", subtractQuantity);

  container.append(style, minusElement, inputElement, plusELement);

  return container;
}

function subtractQuantity(event) {
  const { inputElement, currentCard } = getInputAndCurrentComponent(event);

  const quantity = inputElement.value;
  if (isNaN(quantity) || quantity <= 1) {
    inputElement.value = 1;
  } else inputElement.value--;
  currentCard.updateQuantity(inputElement.value);

  if (path === "/cart.html") {
    setFormTotalValue();
    setFormItemsIncart();
  }
}

function addQuantity(event) {
  const { inputElement, currentCard } = getInputAndCurrentComponent(event);

  inputElement.value++;
  currentCard.updateQuantity(inputElement.value);

  if (path === "/cart.html") {
    setFormTotalValue();
    setFormItemsIncart();
  }
}

function getInputAndCurrentComponent(event) {
  const componentId = event.target.parentElement.getAttribute("id");
  const currentCard = getCurrentCard(componentId);
  const inputElement = currentCard.shadowRoot.querySelector("input#quantity");

  return { inputElement, currentCard };
}

export function getCurrentCard(componentId) {
  const card = Array.from(document.querySelectorAll("product-card")).find(
    (item) => item.getAttribute("id") === componentId
  );
  return card;
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
  const labelElements = shadow.querySelectorAll("label#labelsize");
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
  if (addElement && minusElement) {
    addElement.removeEventListener("click", addQuantity);
    minusElement.removeEventListener("click", subtractQuantity);
  }
}

function getBtnTextContent() {
  if (path == "/cart.html") return "Remove from Cart";
  else return "Add to Cart";
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
    const inputElement = createInputElement(size, selectedSize);
    const labelElement = createLabelElement(size);

    if (path === "/cart.html") {
      labelElement.style = `cursor: default; user-select: none; ${
        !inputElement.checked && "display: none;"
      }`;
    }

    container.append(inputElement, labelElement);
  });

  return container;
}

function createLabelElement(size) {
  const labelElement = document.createElement("label");

  labelElement.setAttribute("for", size);
  labelElement.id = "labelsize";
  labelElement.textContent = size;
  labelElement.tabIndex = "0";

  labelElement.addEventListener("keydown", handleChangeLabels);

  return labelElement;
}

function createInputElement(size, selectedSize) {
  const inputElement = document.createElement("input");

  inputElement.type = "radio";
  inputElement.id = size;
  inputElement.name = "size";
  inputElement.value = size;
  inputElement.checked = selectedSize === inputElement.id ? true : false;
  inputElement.disabled = path === "/cart.html" ? true : false;

  return inputElement;
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

function createTitle() {
  const titleElement = document.createElement("h2");
  titleElement.classList.add("title");

  return titleElement;
}

function createImage() {
  const imageContainer = document.createElement("a");

  const imageElement = document.createElement("img");
  imageElement.classList.add("image");

  imageContainer.appendChild(imageElement);
  return imageContainer;
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

function createOnSale() {
  const onSaleElement = document.createElement("p");
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

function createPrice() {
  const priceElement = document.createElement("p");
  priceElement.classList.add("price");

  return priceElement;
}

export function getCorrectPrice(price, discountedPrice, onsale) {
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

export function checkCurrentCart(productId, size) {
  const current_cart = getCurrentCart();

  if (current_cart) {
    return current_cart.find(
      (item) => item.id === productId && item.selectedSize === size
    );
  }
  return false;
}

export function createProductCard(product) {
  const card = document.createElement("product-card");

  card.setAttribute("id", self.crypto.randomUUID());
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
  card.setAttribute("selectedsize", product?.selectedSize || "");

  return card;
}
