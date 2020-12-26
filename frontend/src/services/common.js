export function handleResponse(response) {
  return response.text().then(text => {
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }

    if (!response.ok) {
      const error = (data?.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
