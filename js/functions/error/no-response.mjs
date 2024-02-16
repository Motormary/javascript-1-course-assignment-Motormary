
export default function handleNoResponse() {
  const error_container = document.createElement("div");
  const error_header = document.createElement("h3");
  const error_btn = document.createElement("button");

  error_container.style = "text-align: center;"
  error_header.textContent = "Something went wrong!";
  error_btn.textContent = "Try again";
  error_container.append(error_header, error_btn);
  error_container.id = "error-container";

  function handleRefetch() {
    error_btn.removeEventListener("click", handleRefetch);
    window.location.reload()
  }

  error_btn.addEventListener("click", handleRefetch);
  return error_container

}
