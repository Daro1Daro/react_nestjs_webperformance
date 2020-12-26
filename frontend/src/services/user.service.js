import { handleFetchResponse, fetchOptionsPost, BASE_API_URL, fetchOptions } from './common';

class UserService {
  signIn(data) {
    return fetch(`${BASE_API_URL}/auth/login`, fetchOptionsPost(data)).then(handleFetchResponse);
  }

  signOut() {
    return fetch(`${BASE_API_URL}/auth/logout`, fetchOptions()).then(handleFetchResponse);
  }

  getUser() {
    return fetch(`${BASE_API_URL}/auth/profile`, fetchOptions()).then(handleFetchResponse);
  }
}

export default new UserService();