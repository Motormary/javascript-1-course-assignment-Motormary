/**
@component ProductList - List of products with image and description.
*/

import getAllProducts from "../api/get-all-products.mjs";
import handleAddToCart from "../functions/add-to-cart.mjs";
import handleProductClicked from "../functions/product-clicked.mjs";

class ProductList extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const products = await getAllProducts();

    const productList = products.map((product) => {
      const sizes = product.sizes.join(" - ");

      return `
        <div class="product-container">
          <div class="product" data-product-id="${product.id}">
            <h2>${product.title}</h2>
            <img src="${product.image}" class="product-image">
            <p>${product.description}</p>
            </div>
          <div class="product-details">
            <p>${sizes}</p>
            <p>${product.gender}</p>
            <p>${product.baseColor}</p>
            <p>Price: ${product.price}</p>
          </div>
          <button class="add" data-product-id="${product.id}">Add to cart</button>
        </div>
      `;
    });

    this.innerHTML = productList.join("");

    const productClickArea = this.querySelectorAll("div.product")

    const addButtons = this.querySelectorAll("button.add");


    productClickArea.forEach((product) => {
      product.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-product-id");
        if (productId) {
          handleProductClicked(productId);
        }
      });
    });

    addButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-product-id");
        if (productId) {
          handleAddToCart(productId);
        }
      });
    });

  }
}

customElements.define("product-list", ProductList);
