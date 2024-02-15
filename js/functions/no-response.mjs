import { fetchProducts } from "../../app.mjs";
import setProductLoading from "./loading.mjs";

export default function noResponse() {
  const content = document.getElementById("products-section");

  const error_container = document.createElement("div");
  const error_header = document.createElement("h3");
  const error_btn = document.createElement("button");

  error_header.textContent = "Something went wrong!";
  error_btn.textContent = "Try again";
  error_container.append(error_header, error_btn);
  error_container.id = "error-container";
  content.append(error_container);

  function handleRefetch() {
    content.removeChild(error_container);
    setProductLoading(true);
    fetchProducts();
    error_btn.removeEventListener("click", handleRefetch);
  }

  error_btn.addEventListener("click", handleRefetch);
}
