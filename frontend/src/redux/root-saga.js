import { all, call } from 'redux-saga/effects';

import { userSagas } from "./user/user.sagas";
import { projectSagas } from './project/project.sagas';
import { resultsSagas } from './results/results.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(projectSagas),
    call(resultsSagas),
  ]);
};
