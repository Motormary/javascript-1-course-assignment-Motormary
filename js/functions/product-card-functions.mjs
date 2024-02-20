import ProductCard from "../components/product-card.mjs";
import {
  cardCartStyle,
  cardRadioStyle,
  cardStyle,
  quantityStyle,
} from "../components/styles.mjs";
import { setFormItemsIncart, setFormTotalValue } from "../pages/cart-page.mjs";
import { handleAddToCart } from "./cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "./cart/remove-from-cart.mjs";

const path = window.location.pathname;

ProductCard.prototype.updateQuantity = function (newValue) {
  this.setAttribute("quantity", newValue);
};

/**
 *
 * @description - Product container
 */
export function createCard() {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  return cardContainer;
}

export function setCardAttributes(productcard) {
  const CardElement = productcard.shadowRoot.querySelector(".card");
  CardElement.setAttribute("id", productcard.getComponentId());
}

/**
 *
 * @description - Product title
 */
export function createTitle() {
  const titleElement = document.createElement("h2");
  titleElement.classList.add("title");

  return titleElement;
}

export function setTitleAttributes(productcard) {
  const titleElement = productcard.shadowRoot.querySelector(".title");
  titleElement.textContent = productcard.getTitle();
}

/**
 *
 * @description - Product image
 */
export function createImage() {
  const imageContainer = document.createElement("a");

  const imageElement = document.createElement("img");
  imageElement.classList.add("image");

  imageContainer.appendChild(imageElement);
  return imageContainer;
}

export function setImageAttributes(productcard) {
  const imageContainerElement = productcard.shadowRoot.querySelector("a");
  const imageElement = productcard.shadowRoot.querySelector(".image");
  imageElement.setAttribute("src", productcard.getImage());
  imageElement.setAttribute("product-id", productcard.getProductId());
  if (path !== "/product.html") {
    imageContainerElement.href = `/product.html?product=${productcard.getProductId()}`;
    imageElement.classList.add("hover");
  }
}

/**
 *
 * @description - Product description
 */
export function createDescription() {
  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("description");

  if (path === "/") descriptionElement.style = "display: none;"

  return descriptionElement;
}

export function setDescriptionAttributes(productcard) {
  const descriptionElement =
    productcard.shadowRoot.querySelector(".description");
  descriptionElement.textContent = productcard.getDescription();
}

/**
 *
 * @description - Product gender
 * 
 */
export function createGender() {
  const genderElement = document.createElement("p");
  genderElement.classList.add("gender");

  if (path === "/") genderElement.style = "display: none;"


  return genderElement;
}

export function setGenderAttributes(productcard) {
  const genderElement = productcard.shadowRoot.querySelector(".gender");
  genderElement.textContent = formatGenders(productcard.getGender());

  if (path === "/") genderElement.style = "display: none;"

}

export function formatGenders(gender) {
  const formattedGender =
    gender === "Female" ? "Women" : gender === "Male" ? "Men" : "Unisex";

  return formattedGender;
}

/**
 *
 * @description - Product color
 */
export function createColors(color) {
  const colorsElement = document.createElement("p");
  colorsElement.textContent = color;
  colorsElement.classList.add("colors");

  if (path === "/") colorsElement.style = "display: none;"


  return colorsElement;
}

export function setColorAttributes(productcard) {
  const colorElement = productcard.shadowRoot.querySelector(".colors");
  colorElement.textContent = productcard.getColor();
  return colorElement;
}

/**
 *
 * @description - Product sizes
 *
 * Hidden radio buttons with label onClick
 * Is disabled @ "/cart.html" and unchecked buttons are hidden
 */
export function createSizesButton(sizes, selectedSize) {
  const container = document.createElement("div");
  container.classList.add("radio-grp");
  if (path === "/") container.style = "display: none;"


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

export function setSizesAttributes(productcard) {
  const sizesElement = createSizesButton(
    productcard.getSizes().split(","),
    productcard.getSelectedSize()
  );
  return sizesElement;
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

/**
 *
 * @description - Product discount
 *
 * If on sale, renders floating "on sale" text.
 * position: absolute; is removed @ "/cart.html"
 */
export function createOnSale() {
  const onSaleElement = document.createElement("p");
  onSaleElement.classList.add("onsale");

  return onSaleElement;
}
export function setOnsaleAttributes(productcard) {
  const onsaleElement = productcard.shadowRoot.querySelector(".onsale");
  onsaleElement.textContent =
    productcard.getOnsale() === "true" ? "ON SALE!" : "";
}

/**
 *
 * @description - Product price
 *
 * onSale value is checked before setting price and multiplying it by the current quantity.
 * Is updated by attributeChangedCallback() inside the card component when the quantity changes.
 */
export function createPrice() {
  const priceElement = document.createElement("p");
  priceElement.classList.add("price");
  priceElement.style = "font-weight: bold;"

  return priceElement;
}

export function setPriceAttributes(productcard) {
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

export function getCorrectPrice(price, discountedPrice, onsale) {
  if (onsale) return discountedPrice;
  else return price;
}

/**
 *
 * @description - Product "Add to - / Remove from Cart" button
 *
 * Contains product ID and passes it to the addTo/removeFromCart function.
 * Renders as "Remove from Cart" @ "/cart.html"
 */
export function createButton() {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("add_btn");

  if (path === "/") buttonElement.style = "display: none;"

  
  return buttonElement;
}

function getBtnTextContent() {
  if (path == "/cart.html") return "Remove from Cart";
  else return "Add to Cart";
}

export function setButtonAttributes(productcard) {
  const productId = productcard.getProductId();
  const buttonElement = productcard.shadowRoot.querySelector("button.add_btn");
  const isProductInCart = checkCurrentCart(productId);

  buttonElement.setAttribute("product-id", productId);
  buttonElement.textContent = getBtnTextContent(productId);
  AddBtnEventListener(buttonElement, isProductInCart);
}

function AddBtnEventListener(buttonElement) {
  if (path !== "/cart.html") {
    buttonElement.addEventListener("click", handleAddToCart);
  } else {
    buttonElement.addEventListener("click", handleRemoveFromCart);
    buttonElement.classList.add("bg-green");
  }
}

/**
 *
 * @description - ProductCard style
 *
 * Conditional styling. If (path === "/cart.html") Then style as a table row / List style.
 * else normal.
 */
export function createStyle() {
  const style = document.createElement("style");

  if (path !== "/cart.html") style.textContent = cardStyle;
  else if (path === "/cart.html") style.textContent = cardCartStyle;

  return style;
}

/**
 *
 * @description - Product quantity
 *
 * Input element with 2 adjacent buttons to subtract/add to product quantity.
 * Updates the "quantity" attribute of the component and triggers the attributeChangedCallback()
 *
 */
export function createQuantity() {
  const container = document.createElement("div");
  const inputElement = document.createElement("input");
  const minusElement = document.createElement("button");
  const plusELement = document.createElement("button");
  const style = document.createElement("style");

  if (path === "/") container.style = "display: none;"


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

export function setQuantityAttributes(productcard) {
  const quantityContainer = productcard.shadowRoot.querySelector(
    ".quantity-container"
  );
  quantityContainer.setAttribute("id", productcard.getComponentId()); // Needed for updating quantity attribute

  const quantityElement = productcard.shadowRoot.querySelector("#quantity");
  quantityElement.value = productcard.getQuantity();
}

export function subtractQuantity(event) {
  const { inputElement, currentCard } = getInputAndCurrentComponent(event);

  const quantity = inputElement.value;
  if (isNaN(quantity) || quantity <= 1) {
    inputElement.value = 1;
  } else inputElement.value--;
  currentCard.updateQuantity(inputElement.value);

  if (path === "/cart.html") { // Updates the hidden form input + total value @checkout
    setFormTotalValue();
    setFormItemsIncart();
  }
}

export function addQuantity(event) {
  const { inputElement, currentCard } = getInputAndCurrentComponent(event);

  inputElement.value++;
  currentCard.updateQuantity(inputElement.value);

  if (path === "/cart.html") { // Updates the hidden form input + total value @checkout
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

/**
 *
 * @description - Finds the current component by looking for the UUID.
 *
 */
export function getCurrentCard(componentId) {
  const card = Array.from(document.querySelectorAll("product-card")).find(
    (item) => item.getAttribute("id") === componentId
  );
  return card;
}

/**
 *
 * @description - Product eventListeners removed @ disconnectedCallback()
 *
 */
export function removeProductCardEventlisteners(shadow) {
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

/**
 * 
 * @returns localStorage "cart"
 * 
 */
export function getCurrentCart() {
  const current_cart = JSON.parse(localStorage.getItem("cart")) || [];

  return current_cart;
}

/**
 * 
 * @description - Checks if currently added product is already in cart.
 * 
 */
export function checkCurrentCart(productId, size) {
  const current_cart = getCurrentCart();

  if (current_cart) {
    return current_cart.find(
      (item) => item.id === productId && item.selectedSize === size
    );
  }
  return false;
}

/**
 * 
 * @description - Sets Product Card attributes
 * @returns Card component
 * 
 */
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
