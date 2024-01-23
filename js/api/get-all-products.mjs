/**
 * @returns {products} - A list of jackets from Rainy Days.
*/

async function getAllProducts() {
    try {
      var response = await fetch("https://api.noroff.dev/api/v1/rainy-days", {
        method: "GET",
      });
    } catch (error) {
      throw new Error("Error fetching products:", error);
    }
  
    const products = await response.json();
    console.log(products);
  
    return products; 
  }
  
  export default getAllProducts;
  