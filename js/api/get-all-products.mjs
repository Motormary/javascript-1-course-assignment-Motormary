/**
 * @returns {products} - A list of jackets from Rainy Days.
 */

async function getAllProducts() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/rainy-days", {
      method: "GET",
    });

    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export default getAllProducts;
