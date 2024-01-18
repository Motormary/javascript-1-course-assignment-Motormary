async function getAllProducts() {
  const response = await fetch("https://api.noroff.dev/api/v1/rainy-days", {
    method: "GET",
  });
  const products = await response.json();
  console.log("All products:", products);
}

getAllProducts()