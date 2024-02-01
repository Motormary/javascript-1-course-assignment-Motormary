import { handleAddToCart } from "../add-to-cart.mjs";
import handleProductClicked from "../product-clicked.mjs";
import { handleRemoveFromCart } from "../remove-from-cart.mjs";
import {
  createImageContainer,
  createOnSaleText,
  createProductButton,
  createProductColor,
  createProductContainer,
  createProductDescription,
  createProductDetails,
  createProductGender,
  createProductImage,
  createProductPrice,
  createProductSizes,
  createProductTitle,
} from "./product-functions.mjs";

const content = document.getElementById("list-of-products");

/**
 * @param {product} - Object containg product information
 * @returns - Products displayed in a grid
 */
function createProductElements(products) {
  if (!products) {
    console.error("Error creating product-list, product param missing.");
    return false;
  }

  products.map((product) => {
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
  });
}

export default createProductElements;
