import { handleFetchResponse, BASE_API_URL, fetchOptions, fetchOptionsPost } from './common';

class ProjectService {
  getAll() {
    return fetch(`${BASE_API_URL}/project/get-all`, fetchOptions()).then(handleFetchResponse);
  }

  create(data) {
    return fetch(`${BASE_API_URL}/project/create`, fetchOptionsPost(data)).then(handleFetchResponse);
  }

  delete(data) {
    return fetch(`${BASE_API_URL}/project/delete`, fetchOptionsPost(data)).then(handleFetchResponse);
  }

  createWebPage(data) {
    return fetch(`${BASE_API_URL}/project/webpage/create`, fetchOptionsPost(data)).then(handleFetchResponse);
  }

  runSingleTest(data, webPageId) {
    return fetch(`${BASE_API_URL}/project/webpage/${webPageId}/run-test`, fetchOptionsPost(data)).then(handleFetchResponse);
  }
}

export default new ProjectService();