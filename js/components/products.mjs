import { handleAddToCart } from "../functions/add-to-cart.mjs";
import handleProductClicked from "../functions/product-clicked.mjs";
import { handleRemoveFromCart } from "../functions/remove-from-cart.mjs";

function createProductElements(product) {
  /**
   * @param {product} - Object containg product information
   * Check if there is a product before running
   */
  if (!product) {
    console.error("Error creating product, product param missing.");
    return;
  }

  /**
   * Static container to place new product inside
   */
  const content = document.getElementById("list-of-products");

  /**
   * Formats
   */
  const sizes = product.sizes.join(" - ");
  const formatted_gender =
    product.gender === "Female"
      ? "Women"
      : product.gender === "Male"
      ? "Men"
      : "";

  /**
   * Check if item is in cart
   */
  const current_cart = localStorage.cart
    ? JSON.parse(localStorage.cart).find((id) => id === product.id)
    : false;

  var product_button = null;

  if (current_cart) {
    product_button = createRemoveFromCart(product)
  } else {
    product_button = createAddToCart(product)
  }

  /**
   * Create elements for product
   */
  // Parent
  const product_container = document.createElement("div");
  // Child 1
  const image_container = document.createElement("div");
  const on_sale_text = document.createElement("p");
  const product_title = document.createElement("h2");
  const product_image = document.createElement("img");
  const product_description = document.createElement("p");
  // Child 2
  const product_details = document.createElement("div");
  const product_sizes = document.createElement("p");
  const product_gender = document.createElement("p");
  const product_color = document.createElement("p");
  const product_price = document.createElement("p");

  /**
   * Place the children into the parent containers
   */
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

  /**
   * Set attributes and values etc..
   */
  product_container.className = "product-container";
  image_container.className = "product";
  image_container.setAttribute("data-product-id", product.id);
  on_sale_text.textContent = `${product.onSale ? "ON SALE!" : ""}`;
  on_sale_text.className = "on-sale";
  product_title.textContent = product.title;
  product_image.src = product.image;
  product_image.className = "product-image";
  product_description.textContent = product.description;
  product_details.className = "product-details";
  product_sizes.textContent = sizes;
  product_gender.textContent = formatted_gender;
  product_color.textContent = product.baseColor;
  product_price.textContent = `Price: ${product.price},-`;

  /**
   * Event
   */
  image_container.addEventListener("click", handleProductClicked);

  /**
   * Adds the product to the list
   */
  content.appendChild(product_container);
}

export default createProductElements;

function createAddToCart(product) {
  const add_btn = document.createElement("button");
  add_btn.textContent = "Add to Cart";
  add_btn.setAttribute("data-product-id", product.id);
  add_btn.setAttribute("aria-selected", false);

  add_btn.addEventListener("click", handleAddToCart);

  return add_btn;
}

function createRemoveFromCart(product) {
  const remove_btn = document.createElement("button");
  remove_btn.textContent = "Remove from Cart";
  remove_btn.className = "bg-green";
  remove_btn.setAttribute("data-product-id", product.id);
  remove_btn.setAttribute("aria-selected", true);

  remove_btn.addEventListener("click", handleRemoveFromCart);

  return remove_btn;
}
