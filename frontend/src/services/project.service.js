import { handleFetchResponse, BASE_API_URL, fetchOptions, fetchOptionsPost } from './common';

class ProjectService {
  getAll() {
    return fetch(`${BASE_API_URL}/project/get-all`, fetchOptions()).then(handleFetchResponse);
  }

  create(data) {
    return fetch(`${BASE_API_URL}/project/create`, fetchOptionsPost(data)).then(handleFetchResponse);
  }
}

export default new ProjectService();