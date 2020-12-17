import UserService from './user.service';
import config from '../config/config';

export function fetchOptions() {
  let options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  const token = UserService.getJWT();

  if (token) {
    options = {
      ...options,
      ...{
        headers: new Headers({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
        redirect: 'follow',
        mode: 'cors',
      },
    };
  }

  return options;
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