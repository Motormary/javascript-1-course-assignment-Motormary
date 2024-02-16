import superFetch from "../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../api/urls.mjs";
import { createProductCard } from "../components/product-card.mjs";
import setProductLoading from "../functions/loading.mjs";

const path = window.location.pathname;

if (path === "/product.html") {
  fetchProduct();
}

async function fetchProduct() {
  let params = new URLSearchParams(document.location.search);
  let id = params.get("product");
  const container = document.getElementById("view-product")

  const response = await superFetch(URL_PRODUCTS, id);
  if (response) {
    setProductLoading(false)
    const card = createProductCard(response)
    container.appendChild(card)
  }
}

