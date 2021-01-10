import { handleFetchResponse, BASE_API_URL, fetchOptions } from './common';

class ResultsService {
  getAllSingle() {
    return fetch(`${BASE_API_URL}/project/results/single/get-all`, fetchOptions()).then(handleFetchResponse);
  }
}

export default new ResultsService();