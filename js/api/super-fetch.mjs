async function superFetch(url, id) {
  try {
    const response = await fetch(`${url}/${id ? id : ""}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export default superFetch;
