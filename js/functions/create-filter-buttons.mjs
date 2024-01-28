import { filterProducts } from "../../app.mjs";
import { gender_data as gender, color_data as colors } from "../filter-data.mjs"

const container = document.getElementById("products-section");
const header = container.querySelector("h1");

/**
 * Creates a container for the filter buttons and places it after the sections header.
 */
const filter_container = document.createElement("div");
filter_container.className = "filter-container";
header.after(filter_container);

/**
 *
 *
 * Gender filter
 *
 *
 */

export function genderFilter() {
  // Elements
  const gender_btn_container = document.createElement("div");
  const gender_btn_label = document.createElement("label");
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
  gender_btn_container.append(gender_btn_label, gender_btn);

  // Values
  gender_btn_container.className = "filter-btn-container";
  gender_btn_label.textContent = gender.label;
  gender_option_default.textContent = gender.default.text;
  gender_option_default.value = gender.default.value;
  gender_option_female.textContent = gender.female.text;
  gender_option_female.value = gender.female.value;
  gender_option_male.textContent = gender.male.text;
  gender_option_male.value = gender.male.value;

  // Events
  gender_btn.addEventListener("change", (event) => {
    const value = event.currentTarget.value;

    if (!value) filterProducts(gender.key);
    
    filterProducts(gender.key, value)
  });

  filter_container.appendChild(gender_btn_container);
}

/**
 *
 *
 * Color filter
 *
 */

export function colorFilter() {
  // Elements
  const color_btn_container = document.createElement("div");
  const color_btn_label = document.createElement("label");
  const color_btn = document.createElement("select");
  const color_option_default = document.createElement("option");

  // Values etc..
  color_btn_container.className = "filter-btn-container";
  color_btn_label.textContent = colors.label;
  color_option_default.textContent = colors.default.text;
  color_option_default.value = colors.default.value;

  // Appending
  color_btn.appendChild(color_option_default);
  color_btn_container.append(color_btn_label, color_btn);

  colors.options.forEach((color) => {
    const color_option = document.createElement("option");
    color_option.text = color;
    color_option.value = color;
    color_btn.appendChild(color_option);
  });

  // Events
  color_btn.addEventListener("change", (event) => {
    const value = event.currentTarget.value;

    if (!value) filterProducts(colors.key);
    
    filterProducts(colors.key, value)
  });

  filter_container.appendChild(color_btn_container);
}
