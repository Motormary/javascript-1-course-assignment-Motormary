import { getCurrentCart } from "../functions/product-card-functions.mjs";
import { navStyle } from "./styles.mjs";

class CustomNav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const container = createContainer();

    const homeLink = createHomeLink();

    const cartLink = createCartLink()

    const floater = createFloatingLength()

    container.append(homeLink, cartLink, floater);

    const style = document.createElement("style");
    style.textContent = navStyle;

    this.shadowRoot.append(style, container);

    this.updateCartLength();

    window.addEventListener("updateCart", this.updateCartLength.bind(this));
  }

  updateCartLength() {
    const cart = getCurrentCart();
    const cartLength = cart?.length;
    const floater = this.shadowRoot.querySelector("div.floater")
    floater.style = ""

    floater.textContent = `${
      cartLength > 0 ? `${cartLength}` : ""
    }`;
    if (cartLength === 0) {
      floater.style = "display: none;"
    }
  }

  diconnectedCallback() {
    window.removeEventListener("updateCart", this.updateCartLength.bind(this));
  }
}

customElements.define("nav-bar", CustomNav);

/* -------------------------------------------------- */

function createFloatingLength() {
  const floatingElement = document.createElement("div")
  floatingElement.classList.add("floater")

  return floatingElement

}

function createContainer() {
  const container = document.createElement("div");
  container.className = "nav-content";

  return container;
}

function createHomeLink() {
  const homeLink = document.createElement("a");
  homeLink.classList.add("nav-link");
  homeLink.href = "/";
  homeLink.textContent = "Home";

  return homeLink;
}

function createCartLink() {
  const cartLink = document.createElement("a");
  cartLink.classList.add("nav-link", "cart");
  cartLink.href = "/cart.html";
  cartLink.textContent = "Cart";

  return cartLink;
}
