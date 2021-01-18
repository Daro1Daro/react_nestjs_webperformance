import { handleFetchResponse, BASE_API_URL, fetchOptions, fetchOptionsPost } from './common';

class ResultsService {
  get(resultsId) {
    return fetch(`${BASE_API_URL}/project/results/single/get/${resultsId}`, fetchOptions()).then(handleFetchResponse);
  }

  getAllSingle() {
    return fetch(`${BASE_API_URL}/project/results/single/get-all`, fetchOptions()).then(handleFetchResponse);
  }

  delete(data) {
    return fetch(`${BASE_API_URL}/project/results/delete`, fetchOptionsPost(data)).then(handleFetchResponse);
  }
}

export default new ResultsService();