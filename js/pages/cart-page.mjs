import superFetch from "../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../api/urls.mjs";
import { createProductCard, getCurrentCart } from "../components/product-card.mjs";
import setProductLoading from "../functions/error/loading.mjs";
import handleNoResponse from "../functions/error/no-response.mjs";

async function fetchCartItems() {
    const container = document.querySelector("ul.cart-list")
  const current_cart = getCurrentCart();

  if (current_cart.length > 0) {
    current_cart.forEach(async (item) => {
      const response = await superFetch(URL_PRODUCTS, item);
      if (response) {
        setProductLoading(false)
          createCartItem(response);
      } else {
       const error = handleNoResponse()
       container.replaceWith(error)
      }
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
