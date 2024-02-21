import handleFilterOnChange from "./filter-on-change.mjs";

function createFilterContainer() {
  const container = document.getElementById("products-section");
  const header = container.querySelector("h1");

  const filter_container = document.createElement("div");
  filter_container.className = "filter-container";
  header.after(filter_container);

  return filter_container;
}

/**
 *
 * @param {data} - Object with filter values
 * @returns {HTMLSelectElement} - With filter options
 */

export function createFilterButtons(data) {
  if (!data) return;
  const filter_container = createFilterContainer();

  data.forEach((filter) => {
    const btn_container = document.createElement("div");
    btn_container.className = "filter-btn-container";

    //----
    const btn_label = document.createElement("label");
    btn_label.textContent = filter.label;
    
    //----
    const select_btn = document.createElement("select");
    select_btn.className = "filter-btn";
    select_btn.setAttribute("key", filter.key);
    
    //----
    const select_btn_default = document.createElement("option");
    select_btn_default.textContent = filter.default.text;
    select_btn_default.value = filter.default.value;

    //----
    select_btn.appendChild(select_btn_default);
    btn_container.append(btn_label, select_btn);
    
    //----
    filter.options.forEach((option) => {
      const select_option = document.createElement("option");
      select_option.text = option.label;
      select_option.value = option.value;
      select_btn.appendChild(select_option);
    });

    // ----
    select_btn.addEventListener("change", handleFilterOnChange);

    filter_container.appendChild(btn_container);
  });
}
