export async function fetchData(
  url,
  isInternalApi = false,
  method = "GET",
  data = null,
  timeout = 5000
) {
  try {
    const response = await fetchWithTimeout(
      url,
      isInternalApi,
      timeout,
      method,
      data
    );

    const responseData = await response.json();

    if (response.ok) {
      return responseData; // Return the data if the request is successful
    } else {
      if (response.status != 422) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        return responseData;
      }
    }
  } catch (error) {
    // Handle errors and return an error object
    return { error: error.message };
  }
}

export async function fetchWithTimeout(
  url,
  isInternalApi = false,
  timeout,
  method = "GET",
  data = null
) {
  const init = {
    method: method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  //  Set the API key to call internal task management APIs in the internal backend server
  if (isInternalApi) {
    init.headers["x-api-key"] = import.meta.env.VITE_API_KEY;
  }

  return Promise.race([
    fetch(url, init),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
}
