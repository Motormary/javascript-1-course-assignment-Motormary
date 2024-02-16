import { getCurrentCart } from "./product-card.mjs";

class CustomNav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    container.className = "nav-content";

    const homeLink = document.createElement("a");
    homeLink.classList.add("nav-link");
    homeLink.href = "/";
    homeLink.textContent = "Home";

    const cartLink = document.createElement("a");
    cartLink.classList.add("nav-link", "cart");
    cartLink.href = "/cart.html";
    cartLink.textContent = "Cart";

    container.appendChild(homeLink);
    container.appendChild(cartLink);

    const style = document.createElement("style")
    style.textContent = `
    .nav-content {
      box-sizing: border-box;
      display: flex;
      height: 5rem;
      width: 100%;
      max-width: 1920px;
      padding: 0 3rem;
      gap: 1rem;
      align-items: center;
      justify-content: right;
      background-color: green;
      color: #fff;
    }
    a {
      text-decoration: none;
      color: #fff;
      font-size: 20px;
    }
    `

    this.shadowRoot.append(style, container);

    this.updateCartLength();

    window.addEventListener("updateCart", this.updateCartLength.bind(this));
  }

  updateCartLength() {
    const cart = getCurrentCart()
    const cartLength = cart?.length

    this.shadowRoot.querySelector("a.cart").textContent = `Cart ${cartLength > 0 ? `(${cartLength})` : ""}`;
  }
}

customElements.define("nav-bar", CustomNav);
