async function superFetch(url) {
  try {
    const response = await fetch(url, {
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
