import { handleAddToCart } from "../functions/add-to-cart.mjs";
import handleProductClicked from "../functions/product-clicked.mjs";
import { handleRemoveFromCart } from "../functions/remove-from-cart.mjs";

const content = document.getElementById("list-of-products");

function formatSizes(sizes) {
  const formattedSizes = sizes.join(" - ");

  return formattedSizes;
}

function formatGenders(gender) {
  const formatted_gender =
    gender === "Female" ? "Women" : gender === "Male" ? "Men" : "";

  return formatted_gender;
}

function checkCurrentCart() {
  const current_cart = localStorage?.cart
    ? JSON.parse(localStorage.cart).find((id) => id === product.id)
    : false;

  return current_cart;
}

function createProductButton(id) {
  const current_cart = checkCurrentCart();
  let product_button = null;

  if (current_cart) {
    product_button = createRemoveFromCart(id);
  } else {
    product_button = createAddToCart(id);
  }

  return product_button;
}

function createProductContainer() {
  const product_container = document.createElement("div");
  product_container.className = "product-container";

  return product_container;
}

function createImageContainer(id) {
  const image_container = document.createElement("div");
  image_container.className = "product";
  image_container.setAttribute("data-product-id", id);
  image_container.addEventListener("click", handleProductClicked);

  return image_container;
}

function createOnSaleText(isOnSale) {
  const on_sale_text = document.createElement("p");
  on_sale_text.textContent = `${isOnSale ? "ON SALE!" : ""}`;
  on_sale_text.className = "on-sale";

  return on_sale_text;
}

function createProductTitle(title) {
  const product_title = document.createElement("h2");
  product_title.textContent = title;

  return product_title;
}

function createProductImage(image) {
  const product_image = document.createElement("img");
  product_image.src = image;
  product_image.className = "product-image";

  return product_image;
}

function createProductDescription(description) {
  const product_description = document.createElement("p");
  product_description.textContent = description;

  return product_description;
}

function createProductDetails() {
  const product_details = document.createElement("div");
  product_details.className = "product-details";

  return product_details;
}

function createProductSizes(sizes) {
  const newSizes = formatSizes(sizes);

  const product_sizes = document.createElement("p");
  product_sizes.textContent = newSizes;

  return product_sizes;
}

function createProductGender(gender) {
  const formatted_gender = formatGenders(gender);

  const product_gender = document.createElement("p");
  product_gender.textContent = formatted_gender;

  return product_gender;
}

function createProductColor(baseColor) {
  const product_color = document.createElement("p");

  product_color.textContent = baseColor;

  return product_color;
}

function createProductPrice(price) {
  const product_price = document.createElement("p");
  product_price.textContent = `Price: ${price},-`;

  return product_price;
}

function createAddToCart(id) {
  const add_btn = document.createElement("button");
  add_btn.textContent = "Add to Cart";
  add_btn.setAttribute("data-product-id", id);
  add_btn.setAttribute("aria-selected", false);

  add_btn.addEventListener("click", handleAddToCart);

  return add_btn;
}

function createRemoveFromCart(id) {
  const remove_btn = document.createElement("button");
  remove_btn.textContent = "Remove from Cart";
  remove_btn.className = "bg-green";
  remove_btn.setAttribute("data-product-id", id);
  remove_btn.setAttribute("aria-selected", true);

  remove_btn.addEventListener("click", handleRemoveFromCart);

  return remove_btn;
}

/**
 * @param {product} - Object containg product information
 * @returns - Products displayed in a grid
 */
function createProductElements(product) {
  if (!product) {
    console.error("Error creating product-list, product param missing.");
    return false;
  }

  // Parent
  const product_container = createProductContainer();
  // Child 1
  const image_container = createImageContainer(product.id);
  const on_sale_text = createOnSaleText(product.onSale);
  const product_title = createProductTitle(product.title);
  const product_image = createProductImage(product.image);
  const product_description = createProductDescription(product.description);
  // Child 2
  const product_details = createProductDetails();
  const product_sizes = createProductSizes(product.sizes);
  const product_gender = createProductGender(product.gender);
  const product_color = createProductColor(product.baseColor);
  const product_price = createProductPrice(product.price);
  const product_button = createProductButton(product.id);

  product_container.append(image_container, product_details, product_button);
  image_container.append(
    on_sale_text,
    product_title,
    product_image,
    product_description
  );
  product_details.append(
    product_sizes,
    product_gender,
    product_color,
    product_price
  );

  content.appendChild(product_container);
}

export default createProductElements;


