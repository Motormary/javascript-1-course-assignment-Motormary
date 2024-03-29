
import setProductLoading from "../functions/error/loading.mjs";
import { createProductCard, getCorrectPrice, getCurrentCart } from "../functions/product-card-functions.mjs";

const path = window.location.pathname;

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  if (path === "/cart.html") {
    fetchCartItems();
  }
});

/**
 * @description - Gets products from cart.
 * Updates the total and sets the products in cart to a hidden input as the value.
 */
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
//-----------------------------------------------------------------------

/**
 * 
 * @param {*} product 
 * @description - Creates productCard component forEach item in cart and puts them into a list.
 */
function createCartItem(product) {
  const container = document.querySelector("ul.cart-box");

  const card = createProductCard(product);

  const listElement = document.createElement("li");
  listElement.style = "list-style: none;";

  listElement.appendChild(card);
  container.appendChild(listElement);
}
//-----------------------------------------------------------------------

/**
 * @description - If no items in cart, create some text.
 */
export function createEmptyCart() {
  const container = document.querySelector("ul.cart-list");
  const checkoutForm = document.getElementById("checkout");

  const emptyContainer = document.createElement("div");
  const emptyCart = document.createElement("p");
  const specialPrice = document.createElement("a");

  specialPrice.textContent = "Special price for you, my friend.";
  specialPrice.style = "text-decoration: underline; text-underline-offset: 3px; display: inline; color: black;";
  specialPrice.href = "/";

  emptyCart.style = "font-size: 24px; color: black;";
  emptyCart.textContent = "You have no items in cart. ";

  emptyCart.appendChild(specialPrice);
  emptyContainer.appendChild(emptyCart);
  container.replaceWith(emptyContainer);
  checkoutForm.remove();
}
//-----------------------------------------------------------------------

/**
 * @description - Sets value of hidden form input.
 */
export function setFormItemsIncart() {
  const data = getCheckoutData()
  document.getElementById("items_in_cart").value = JSON.stringify(data);
}

export function setFormTotalValue() {
  const total = getTotal();

  document.getElementById("total").value = total.toFixed(2);
}
//-----------------------------------------------------------------------

/**
 * @description - Get all prices from products in cart, multiply by quantity.
 * @returns - total price
 */
function getTotal() {
  const prices = Array.from(document.getElementsByTagName("product-card")).map((product) => {
    const price = getCorrectPrice(
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
//-----------------------------------------------------------------------

/**
 * @description - Formats cart content for hidden input.
 * @returns - Formatted cart-data
 */
function getCheckoutData() {
  const data = Array.from(document.getElementsByTagName("product-card")).map((product) => {
    return {
      id: product.getAttribute("product-id"),
      color: product.getAttribute("colors"),
      size: product.getAttribute("selectedSize"),
      quantity: product.getAttribute("quantity"),
      price: getCorrectPrice(product.getAttribute("price"), product.getAttribute("discount"), product.getAttribute("onsale"))
    }
  })

  return data
}