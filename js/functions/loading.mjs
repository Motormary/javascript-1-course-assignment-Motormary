import noResponse from "./no-response.mjs";

function setProductLoading(isLoading) {
  const loading = document.getElementById("loading-spinner");

  
  if (isLoading) {
    loading.className = "";
  } else {
    const loading = document.getElementById("loading-spinner");

    loading.className = "hidden";
  }
}

export default setProductLoading;
