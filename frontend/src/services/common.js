import config from '../config/config';

export function handleFetchResponse(response) {
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

export function fetchOptions() {
  return {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };
}

export function fetchOptionsPost(data) {
  return {
    ...fetchOptions(),
    ...{
      method: 'POST',
      body: JSON.stringify(data),
    },
  };
}

export const BASE_API_URL = config.API_URL;