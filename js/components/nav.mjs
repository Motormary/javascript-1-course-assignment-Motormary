class CustomNav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    container.className = "nav-content";

    const homeLink = document.createElement("a");
    homeLink.className = "navlink"
    homeLink.href = "/";
    homeLink.textContent = "Home";

    const cartLink = document.createElement("a");
    cartLink.className = "navlink"
    cartLink.href = "/cart.html";
    cartLink.textContent = "Cart";


    container.appendChild(homeLink);
    container.appendChild(cartLink);

    this.shadowRoot.appendChild(container);

    this.updateCartLength();

    // Listen for changes in cart
    window.addEventListener("updateCart", this.updateCartLength.bind(this));
  }

  updateCartLength() {
    // Get cart and update length
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartLength = cart.length;

    // Update cart length display
    this.shadowRoot.querySelectorAll(
      "a"
    )[1].textContent = `Cart (${cartLength})`;
  }
}

customElements.define("nav-bar", CustomNav);
