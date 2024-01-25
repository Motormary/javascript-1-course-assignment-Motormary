import { filterProducts } from "../../app.mjs";

function createFilterButtons() {
  const container = document.getElementById("products-section");
  const header = container.querySelector("h1");

  // Elements
  const gender_btn = document.createElement("select");
  const gender_option_default = document.createElement("option");
  const gender_option_male = document.createElement("option");
  const gender_option_female = document.createElement("option");

  // Append
  gender_btn.append(
    gender_option_default,
    gender_option_female,
    gender_option_male
  );

  // Values
  gender_option_default.textContent = "All";
  gender_option_default.value = "";
  gender_option_female.textContent = "Female";
  gender_option_female.value = "Female";
  gender_option_male.textContent = "Male";
  gender_option_male.value = "Male";

  // Events
  gender_option_default.addEventListener("click", () => {
    filterProducts();
  });

  gender_option_female.addEventListener("click", (event) => {
    const value = event.currentTarget.value;
    filterProducts("gender", value);
  });

  gender_option_male.addEventListener("click", (event) => {
    const value = event.currentTarget.value;
    filterProducts("gender", value);
  });

  header.after(gender_btn);
}

export default createFilterButtons;
