import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import UserService from '../../services/user.service';

import {
  signInSuccess,
  signInFailure, signOutSuccess, signOutFailure,
} from './user.actions';

export function* signIn({ payload: emailAndPassword }) {
  try {
    yield call(UserService.signIn, emailAndPassword);
    const user = yield call(UserService.getUser);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield call(UserService.signOut);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* watchSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* watchSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(watchSignInStart),
    call(watchSignOutStart),
  ]);
}