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
   *
   * A list of products
   */
  const content = document.getElementById("list-of-products");

  /**
   * Joins the list of sizes neatly before passing it
   */
  const sizes = product.sizes.join(" - ");

  /**
   * Create elements for product
   *
   * Sorted as is: HTML-format top-down
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
  product_container.append(image_container, product_details);
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
  product_gender.textContent = product.gender;
  product_color.textContent = product.baseColor;
  product_price.textContent = `Price: ${product.price},-`;
  product_button.textContent = "Add to Cart";
  product_button.setAttribute("data-product-id", product.id);

  // Append the newly created product to the product list
  /**
   * @returns {HTMLDivElement} - Box containing product+info
   */
  content.appendChild(product_container);
}

export default createProductElements;
