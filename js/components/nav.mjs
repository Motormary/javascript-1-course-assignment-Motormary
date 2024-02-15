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

    this.shadowRoot.appendChild(container);

    this.updateCartLength();

    window.addEventListener("updateCart", this.updateCartLength.bind(this));
  }

  updateCartLength() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart)
    const cartLength = cart?.length

    this.shadowRoot.querySelector("a.cart").textContent = `Cart (${cartLength})`;
  }
}

customElements.define("nav-bar", CustomNav);
