import Cookies from 'js-cookie';
import { fetchOptionsPost, BASE_API_URL, fetchOptions } from './options';
import { handleResponse } from './common';

const JWT_TOKEN = 'JWT_TOKEN';

class UserService {
  getJWT() {
    return Cookies.get(JWT_TOKEN);
  }

  isAuthenticated() {
    return !!this.getJWT();
  }

  setJWT(token) {
    return Cookies.set(JWT_TOKEN, token);
  }

  removeJWT() {
    return Cookies.remove(JWT_TOKEN);
  }

  signIn(data) {
    return fetch(`${BASE_API_URL}/auth/login`, fetchOptionsPost(data)).then(handleResponse);
  }

  getUser() {
    return fetch(`${BASE_API_URL}/auth/profile`, fetchOptions()).then(handleResponse);
  }
}

export default new UserService();