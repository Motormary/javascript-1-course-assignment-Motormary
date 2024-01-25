function setProductLoading(isLoading) {
  const container = document.getElementById("list-of-products");

  if (isLoading) {
    const loading = document.createElement("img");
    loading.id = "loading-spinner";
    loading.src = "assets/svg/spinner.svg";

    container.appendChild(loading);
  } else {
    const loading = document.getElementById("loading-spinner");
    
    container.removeChild(loading);
  }

  //set timeout bla bla
}

export default setProductLoading;
