import { filterProducts } from "../../../app.mjs";
import { filter_data } from "./filter-data.mjs";
import handleFilterOnChange from "./filter-on-change.mjs";

function createFilterContainer() {
  const container = document.getElementById("products-section");
  const header = container.querySelector("h1");

  /**
   * Creates a container for the filter buttons and places it below the "Our products" header.
   */
  const filter_container = document.createElement("div");
  filter_container.className = "filter-container";
  header.after(filter_container);

  return filter_container
}

/**
 *
 * @param {data} - Object with filter values
 * @returns {HTMLSelectElement} - With filter options
 */

export function createFilterButtons(data) {
  const filter_container = createFilterContainer();

  if (!data) return;
  filter_data.map((object) => {
    const btn_container = document.createElement("div");
    const btn_label = document.createElement("label");
    const select_btn = document.createElement("select");
    const select_btn_default = document.createElement("option");

    //----
    btn_container.className = "filter-btn-container";
    btn_label.textContent = object.label;
    select_btn_default.textContent = object.default.text;
    select_btn.className = "filter-btn";
    select_btn_default.value = object.default.value;
    select_btn.setAttribute("key", object.key);

    //----
    select_btn.appendChild(select_btn_default);
    btn_container.append(btn_label, select_btn);

    //----
    object.options.forEach((option) => {
      const select_option = document.createElement("option");
      select_option.text = option[0];
      select_option.value = option[1];
      select_btn.appendChild(select_option);
    });

    // ----

    select_btn.addEventListener("change", handleFilterOnChange);

    filter_container.appendChild(btn_container);
  });
}