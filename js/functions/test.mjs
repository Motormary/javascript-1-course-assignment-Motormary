import { filterProducts } from "../../app.mjs";

const button = document.querySelector("button.getList");

const container = document.getElementById("list-of-products")

button.addEventListener("click", () => {
    container.innerHTML = ""
    filterProducts()
})