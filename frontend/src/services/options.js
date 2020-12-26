import config from '../config/config';

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