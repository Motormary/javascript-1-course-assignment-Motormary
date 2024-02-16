export function showToast(message, href = "/", duration = 5000) {
  const toast = document.getElementById("toast");
  toast.style = ""
  toast.href = href
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, duration);
}
