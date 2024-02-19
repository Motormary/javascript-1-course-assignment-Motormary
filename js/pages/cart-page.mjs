import {
  createProductCard,
  getCurrentCart,
  getPrice,
} from "../components/product-card.mjs";
import setProductLoading from "../functions/error/loading.mjs";

const path = window.location.pathname;

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  if (path === "/cart.html") {
    fetchCartItems();
  }
});

export function fetchCartItems() {
  const current_cart = getCurrentCart();

  if (current_cart.length > 0) {
    current_cart.forEach((item) => {
      createCartItem(item);
    });
    setProductLoading(false);
    setFormTotalValue();
    setFormItemsIncart(current_cart);
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
  const checkoutForm = document.getElementById("checkout");

  const emptyContainer = document.createElement("div");
  const emptyCart = document.createElement("p");
  const plsBuy = document.createElement("a");

  plsBuy.textContent = "Special price for you, my friend.";
  plsBuy.style = "text-decoration: underline; display: inline; color: black;";
  plsBuy.href = "/";

  emptyCart.style = "font-size: 24px; color: black;";
  emptyCart.textContent = "You have no items in cart. ";

  emptyCart.appendChild(plsBuy);
  emptyContainer.appendChild(emptyCart);
  container.replaceWith(emptyContainer);
  checkoutForm.remove();
}

export function setFormItemsIncart() {
  const data = getCheckoutData()
  document.getElementById("items_in_cart").value = JSON.stringify(data);
}

export function setFormTotalValue() {
  const total = getTotal();

  document.getElementById("total").value = total.toFixed(2);
}

function getTotal() {
  const prices = Array.from(document.getElementsByTagName("product-card")).map((product) => {
    const price = getPrice(
      product.getAttribute("price"),
      product.getAttribute("discount"),
      product.getAttribute("onsale")
    );

    return parseFloat(price) * parseFloat(product.getAttribute("quantity"));
  });

  const total = prices.reduce(
    (totalValue, productValue) => totalValue + productValue,
    0
  );


  return total;
}

function getCheckoutData() {
  const data = Array.from(document.getElementsByTagName("product-card")).map((product) => {
    return {
      id: product.getAttribute("product-id"),
      color: product.getAttribute("colors"),
      size: product.getAttribute("selectedSize"),
      quantity: product.getAttribute("quantity"),
      price: getPrice(product.getAttribute("price"), product.getAttribute("discount"), product.getAttribute("onsale"))
    }
  })

  return data
}