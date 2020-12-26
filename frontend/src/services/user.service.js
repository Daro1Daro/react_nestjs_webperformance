import { fetchOptionsPost, BASE_API_URL, fetchOptions } from './options';
import { handleResponse } from './common';

class UserService {
  signIn(data) {
    return fetch(`${BASE_API_URL}/auth/login`, fetchOptionsPost(data)).then(handleResponse);
  }

  signOut() {
    return fetch(`${BASE_API_URL}/auth/logout`, fetchOptionsPost()).then(handleResponse);
  }

  getUser() {
    return fetch(`${BASE_API_URL}/auth/profile`, fetchOptions()).then(handleResponse);
  }
}

export default new UserService();