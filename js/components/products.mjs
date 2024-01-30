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
   * Create elements for product
   */
  // Parent
  const product_container = document.createElement("div");
  // Child 1
  const image_container = document.createElement("div");
  const product_title = document.createElement("h2");
  const product_image = document.createElement("img");
  const product_description = document.createElement("p");
  // Child 2
  const product_details = document.createElement("div");
  const product_sizes = document.createElement("p");
  const product_gender = document.createElement("p");
  const product_color = document.createElement("p");
  const product_price = document.createElement("p");
  const product_button = document.createElement("button");

  /**
   * Place the children into the parent containers
   */
  product_container.append(image_container, product_details, product_button);
  image_container.append(product_title, product_image, product_description);
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
  product_title.textContent = product.title;
  product_image.src = product.image;
  product_image.className = "product-image";
  product_description.textContent = product.description;
  product_details.className = "product-details";
  product_sizes.textContent = sizes;
  product_gender.textContent = formatted_gender;
  product_color.textContent = product.baseColor;
  product_price.textContent = `Price: ${product.price},-`;
  product_button.textContent = "Add to Cart";
  product_button.setAttribute("data-product-id", product.id);
  product_button.setAttribute("aria-selected", false);

  /**
   * Event
   */
  product_button.addEventListener("click", handleAddToCart);

  /**
   * Adds the product to the list
   */
  content.appendChild(product_container);
}

export default createProductElements;

export function handleRemoveFromCart(event) {
  const product_id = event.currentTarget.getAttribute("data-product-id");
  event.currentTarget.textContent = "Add to Cart";
  event.currentTarget.className = "";
  event.currentTarget.setAttribute("aria-selected", false);
  console.log("REMOVED:", product_id);
  // Remove from cart / local

  event.currentTarget.removeEventListener("click", handleRemoveFromCart);
  event.currentTarget.addEventListener("click", handleAddToCart);
}

export function handleAddToCart(event) {
  const product_id = event.currentTarget.getAttribute("data-product-id");
  event.currentTarget.textContent = "Remove";
  event.currentTarget.className = "bg-green";
  event.currentTarget.setAttribute("aria-selected", true);
  console.log("ADDED:", product_id);
  // Add to cart / local

  event.currentTarget.removeEventListener("click", handleAddToCart);
  event.currentTarget.addEventListener("click", handleRemoveFromCart);
}

export function removeProductEventListeners() {
  const content = document.getElementById("list-of-products");
  const buttons = content.querySelectorAll("button[data-product-id]");

  buttons.forEach((button) => {
    const check_value = button.getAttribute("aria-selected");

    if (check_value === "false") {
      button.removeEventListener("click", handleAddToCart);
    } else {
      button.removeEventListener("click", handleRemoveFromCart);
    }
  });

  return
}
