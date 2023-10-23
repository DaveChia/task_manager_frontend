export async function fetchData(url, timeout, method = "GET", data = null) {
  try {
    const response = await fetchWithTimeout(url, timeout, method, data);
    if (response.ok) {
      const responseData = await response.json();
      return responseData; // Return the data if the request is successful
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    // Handle errors and return an error object
    return { error: error.message };
  }
}

export async function fetchWithTimeout(
  url,
  timeout,
  method = "GET",
  data = null
) {
  const init = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  return Promise.race([
    fetch(url, init),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
}
