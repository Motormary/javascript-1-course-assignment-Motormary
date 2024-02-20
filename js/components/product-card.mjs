import {
  createButton,
  createCard,
  createColors,
  createDescription,
  createGender,
  createImage,
  createOnSale,
  createPrice,
  createQuantity,
  createStyle,
  createTitle,
  getCorrectPrice,
  removeProductCardEventlisteners,
  setButtonAttributes,
  setCardAttributes,
  setColorAttributes,
  setDescriptionAttributes,
  setGenderAttributes,
  setImageAttributes,
  setOnsaleAttributes,
  setPriceAttributes,
  setQuantityAttributes,
  setSizesAttributes,
  setTitleAttributes,
} from "../functions/product-card-functions.mjs";

class ProductCard extends HTMLElement {
  static observedAttributes = ["quantity"];
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const cardContainer = createCard();

    const titleElement = createTitle();

    const imageElement = createImage();

    const descriptionElement = createDescription();

    const genderElement = createGender();
    
    const colorsElement = createColors();

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
    setButtonAttributes(this);

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

export default ProductCard