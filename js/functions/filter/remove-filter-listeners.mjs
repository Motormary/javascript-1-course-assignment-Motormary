import handleFilterOnChange from "./filter-on-change.mjs"

export default function removeFilterEventListeners() {
    const filter_btns = document.querySelectorAll("select")

    filter_btns.forEach((button) => {
        button.removeEventListener("change", handleFilterOnChange)
    })
    
}