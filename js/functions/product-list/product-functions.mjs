import { handleAddToCart } from "../cart/add-to-cart.mjs";
import { handleRemoveFromCart } from "../cart/remove-from-cart.mjs";

export function formatSizes(sizes) {
  const formattedSizes = sizes.replaceAll(",", " - ")

  return formattedSizes;
}

export function formatGenders(gender) {
  const formatted_gender =
    gender === "Female" ? "Women" : gender === "Male" ? "Men" : "";

  return formatted_gender;
}



export function createProductButton(id) {
  const current_cart = checkCurrentCart(id);
  let product_button = null;

  if (current_cart) {
    product_button = createRemoveFromCart(id);
  } else {
    product_button = createAddToCart(id);
  }

  return product_button;
}

export function createProductContainer() {
  const product_container = document.createElement("div");
  product_container.className = "product-container";

  return product_container;
}

export function createImageContainer(id) {
  const image_container = document.createElement("a");
  image_container.className = "product";
  image_container.href = `/product.html?product=${id}`

  return image_container;
}

export function createOnSaleText(isOnSale) {
  const on_sale_text = document.createElement("p");
  on_sale_text.textContent = `${isOnSale ? "ON SALE!" : ""}`;
  on_sale_text.className = "on-sale";

  return on_sale_text;
}

export function createProductTitle(title) {
  const product_title = document.createElement("h2");
  product_title.textContent = title;

  return product_title;
}

export function createProductImage(image) {
  const product_image = document.createElement("img");
  product_image.src = image;
  product_image.className = "product-image";

  return product_image;
}

export function createProductDescription(description) {
  const product_description = document.createElement("p");
  product_description.textContent = description;

  return product_description;
}

export function createProductDetails() {
  const product_details = document.createElement("div");
  product_details.className = "product-details";

  return product_details;
}

export function createProductSizes(sizes) {
  const newSizes = formatSizes(sizes);

  const product_sizes = document.createElement("p");
  product_sizes.textContent = newSizes;

  return product_sizes;
}

export function createProductGender(gender) {
  const formatted_gender = formatGenders(gender);

  const product_gender = document.createElement("p");
  product_gender.textContent = formatted_gender;

  return product_gender;
}

export function createProductColor(baseColor) {
  const product_color = document.createElement("p");

  product_color.textContent = baseColor;

  return product_color;
}

export function createProductPrice(price) {
  const product_price = document.createElement("p");
  product_price.textContent = `Price: ${price},-`;

  return product_price;
}

export function createAddToCart(id) {
  const add_btn = document.createElement("button");
  add_btn.textContent = "Add to Cart";
  add_btn.classList.add("add_btn")
  add_btn.setAttribute("data-product-id", id);
  add_btn.setAttribute("aria-selected", false);

  add_btn.addEventListener("click", handleAddToCart);

  return add_btn;
}

export function createRemoveFromCart(id) {
  const remove_btn = document.createElement("button");
  remove_btn.textContent = "Remove from Cart";
  remove_btn.classList.add("bg-green")
  remove_btn.setAttribute("data-product-id", id);
  remove_btn.setAttribute("aria-selected", true);

  remove_btn.addEventListener("click", handleRemoveFromCart);

  return remove_btn;
}
