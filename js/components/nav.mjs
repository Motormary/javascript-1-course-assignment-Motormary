import { getCurrentCart } from "../functions/product-card-functions.mjs";
import { navStyle } from "./styles.mjs";

class CustomNav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const container = createContainer();

    const homeLink = createHomeLink();

    const cartLink = createCartLink()

    container.appendChild(homeLink);
    container.appendChild(cartLink);

    const style = document.createElement("style");
    style.textContent = navStyle;

    this.shadowRoot.append(style, container);

    this.updateCartLength();

    window.addEventListener("updateCart", this.updateCartLength.bind(this));
  }

  updateCartLength() {
    const cart = getCurrentCart();
    const cartLength = cart?.length;

    this.shadowRoot.querySelector("a.cart").textContent = `Cart ${
      cartLength > 0 ? `(${cartLength})` : ""
    }`;
  }

  diconnectedCallback() {
    window.removeEventListener("updateCart", this.updateCartLength.bind(this));
  }
}

customElements.define("nav-bar", CustomNav);

/* -------------------------------------------------- */

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
