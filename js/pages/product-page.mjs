import superFetch from "../api/super-fetch.mjs";
import { URL_PRODUCTS } from "../api/urls.mjs";
import { createProductCard } from "../components/product-card.mjs";
import setProductLoading from "../functions/loading.mjs";
import {
  createProductButton,
  formatSizes,
} from "../functions/product-list/product-functions.mjs";

const path = window.location.pathname;

if (path === "/product.html") {
  fetchProduct();
}

function setProductName(name) {
  const title = document.querySelector("p.current_name");
  title.textContent = name;
}

function setProductDescription(text) {
  const description = document.querySelector("p.current_description");
  description.textContent = text;
}

function setProductSizes(size) {
  const sizes = formatSizes(size);
  const parapgraph = document.querySelector("p.current_sizes");
  parapgraph.textContent = sizes;
}

function setProductColors(color) {
  const colors = document.querySelector("p.current_colors");
  colors.textContent = color;
}

function setProductGender(genders) {
  const gender = document.querySelector("p.current_gender");
  gender.textContent = genders;
}

function setProductPrice(prices) {
  const price = document.querySelector("p.current_price")
  price.textContent = prices + ",-"
}

function setProductImage(link) {
const image = document.querySelector("img.current_image")
image.setAttribute("src", link)
}

async function fetchProduct() {
  let params = new URLSearchParams(document.location.search);
  let id = params.get("product");
  const docu = document.getElementById("view-product")

  const response = await superFetch(URL_PRODUCTS, id);
  if (response) {
    setProductLoading(false)
    const card = createProductCard(response)
    docu.appendChild(card)
  }
}

function createProductPageBtn(id) {
  const content = document.querySelector("div.product-info");
  const product_btn = createProductButton(id);
  content.appendChild(product_btn);
}
