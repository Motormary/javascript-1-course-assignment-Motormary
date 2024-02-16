import superFetch from "../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../api/urls.mjs";
import { createProductCard, getCurrentCart } from "../components/product-card.mjs";

async function fetchCartItems() {
  const current_cart = getCurrentCart();

  if (current_cart.length > 0) {
    current_cart.forEach(async (item) => {
      const product = await superFetch(URL_PRODUCTS, item);
      createCartItem(product);
    });
  }
}

function createCartItem(product) {
  const content = document.querySelector("ul.cart-list")

  const listElement = document.createElement("li");
  const card = createProductCard(product);
  listElement.style = "list-style: none;"
  listElement.appendChild(card);
  content.appendChild(listElement)
}

fetchCartItems();
