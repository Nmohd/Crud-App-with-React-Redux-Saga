import * as types from "./actionTypes";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
  searchUserSuccess,
  searchUserError,
} from "./actions";
import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  searchUserApi,
} from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(900);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}
//load user
function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

// create user

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);

    if (response.status === 201) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

// create user

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

//  delete user
function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(200);
    }
    yield put(deleteUserSuccess(response.data));
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}
// update user
function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess(response.data));
    }
  } catch (error) {
    yield put(updateUserError(error));
  }
}

export function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

// search user
function* onSearchUserStartAsync({ payload: { id } }) {
  try {
    const response = yield call(searchUserApi, id);
    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (error) {
    yield put(searchUserError(error));
  }
}

export function* onSearchUser() {
  yield takeLatest(types.SEARCH_USER_START, onSearchUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
  fork(onSearchUser),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
