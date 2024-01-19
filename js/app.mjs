async function getAllProducts(searchParameters) {
  const response = await fetch("https://api.noroff.dev/api/v1/rainy-days", {
    method: "GET",
  });
  const products = await response.json();

  console.log(products);

  const productList = products.map((product) => {

    const sizes = product.sizes.map((size) => size).splice(",").join(" - ")

    return `
        <div class="product" onclick="handleSelectProduct('${product.id}')">
          <div>
            <h2>${product.title}</h2>
            <img src=${product.image} class="product-image">
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
          <div class="product-details">
            <p>${product.gender}</p>
            <p>${product.baseColor}</p>
            <p>${sizes}</p>
          </div>
        </div>
    `;
  });

  const productListHTML = productList.join("");

  const productListContainer = document.getElementById("productList");

  productListContainer.innerHTML = productListHTML;
}

function handleSelectProduct(productId) {
  alert(`Clicked on ${productId}`)
} 

getAllProducts();
