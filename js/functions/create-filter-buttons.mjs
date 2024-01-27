import { filterProducts } from "../../app.mjs";

const container = document.getElementById("products-section");
const header = container.querySelector("h1");

const gender = {
  key: "gender",
  default: {
    text: "All",
    value: "",
  },
  male: {
    text: "Men",
    value: "Male",
  },
  female: {
    text: "Women",
    value: "Female",
  },
};

export function genderFilter() {

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
  gender_option_default.textContent = gender.default.text;
  gender_option_default.value = gender.default.value;
  gender_option_female.textContent = gender.female.text;
  gender_option_female.value = gender.female.value;
  gender_option_male.textContent = gender.male.text;
  gender_option_male.value = gender.male.value;

  // Events
  gender_option_default.addEventListener("click", () => {
    filterProducts();
  });

  gender_option_female.addEventListener("click", (event) => {
    const value = event.currentTarget.value;
    filterProducts(gender.key, value);
  });

  gender_option_male.addEventListener("click", (event) => {
    const value = event.currentTarget.value;
    filterProducts(gender.key, value);
  });

  header.after(gender_btn);
}

const colors = {
    key: "baseColor",
    default: {
        text: "All",
        value: ""
    },
    options: ["Red", "Orange", "Green", "Yellow", "Blue", "Purple", "Black", "Gray"]
}

export function colorFilter() {
    const color_btn = document.createElement("select")
    const color_option_default = document.createElement("option")
    color_option_default.textContent = colors.default.text;
    color_option_default.value = colors.default.value;
    color_btn.appendChild(color_option_default)

    colors.options.forEach(color => {
        const color_option = document.createElement("option");
        color_option.text = color;
        color_option.value = color;
        color_btn.appendChild(color_option);
    });

    header.after(color_btn)
}