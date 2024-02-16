import superFetch from "../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../api/urls.mjs";
import {
  createProductCard,
  getCurrentCart,
} from "../components/product-card.mjs";
import setProductLoading from "../functions/error/loading.mjs";
import handleNoResponse from "../functions/error/no-response.mjs";

const path = window.location.pathname;

if (path === "/cart.html") {
  fetchCartItems();
}
let total = 0;

async function fetchCartItems() {
  const container = document.querySelector("ul.cart-list");
  const current_cart = getCurrentCart();

  if (current_cart.length > 0) {
    setProductLoading(false);
    setFormItemsIncart(current_cart);
    current_cart.forEach(async (item) => {
      const response = await superFetch(URL_PRODUCTS, item);
      if (response) {
        total += response.price;
        createCartItem(response);
        setFormTotalValue()
      } else {
        const error = handleNoResponse();
        container.replaceWith(error);
      }
    });
  } else {
    setProductLoading(false);
    createEmptyCart();
  }
}

function createCartItem(product) {
  const container = document.querySelector("ul.cart-list");

  const card = createProductCard(product);

  const listElement = document.createElement("li");
  listElement.style = "list-style: none;";

  listElement.appendChild(card);
  container.appendChild(listElement);
}

export function createEmptyCart() {
  const container = document.querySelector("ul.cart-list");
  const emptyContainer = document.createElement("div");

  const emptyCart = document.createElement("p");
  const pls = document.createElement("a");

  pls.textContent = "pls buy";
  pls.style = "text-decoration: underline; display: inline; color: black;";
  pls.href = "/";

  emptyCart.style = "font-size: 24px; color: black;";
  emptyCart.textContent = "You have no items in the cart, ";

  emptyCart.appendChild(pls);
  emptyContainer.appendChild(emptyCart);
  container.replaceWith(emptyContainer);
}

function setFormItemsIncart(products) {
  document.getElementById("items_in_cart").value = products;
}

export function setFormTotalValue(removedValue) {
  if (removedValue) {
    total -= removedValue;
  }
  document.getElementById("total").value = total.toFixed(2);
}
