import { handleFetchResponse, BASE_API_URL, fetchOptions } from './common';

class ProjectService {
  getAll() {
    return fetch(`${BASE_API_URL}/project/get-all`, fetchOptions()).then(handleFetchResponse);
  }
}

export default new ProjectService();