async function getAllProducts(searchParameters) {

  const response = await fetch("https://api.noroff.dev/api/v1/rainy-days", {
    method: "GET",
  });

  const products = await response.json();

  console.log(products);

  return products
}

function handleSelectProduct(productId) {
  alert(`Clicked on ${productId}`)
} 


export default getAllProducts()