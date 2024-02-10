const content = document.getElementById("list-of-products");


export function emptySearchResult() {
    const result_container = document.createElement("h3")
    result_container.textContent = "No matching results found."


    content.appendChild(result_container)
    
}

export default emptySearchResult;