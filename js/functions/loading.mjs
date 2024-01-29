import noResponse from "./no-response.mjs";

function setProductLoading(isLoading) {
  const content = document.getElementById("list-of-products");

  const loading = document.createElement("img");
  loading.id = "loading-spinner";
  loading.src = "/assets/svg/spinner.svg";
  loading.alt = "Loading...";
  if (isLoading) {

    content.appendChild(loading);
  } else {
    const loading = document.getElementById("loading-spinner");

    content.removeChild(loading);
  }
}

export default setProductLoading;
