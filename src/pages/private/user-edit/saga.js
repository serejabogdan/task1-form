// outsource dependencies
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import { privateAPI } from '../../../utils/API';

function getUserById (userId) {
  return privateAPI({
    method: 'GET',
    url: `admin-service/users/${userId}`,
  });
}

function createUser (user) {
  return privateAPI({
    method: 'POST',
    url: 'admin-service/users',
    data: user
  });
}

function editUser (user) {
  return privateAPI({
    method: 'PUT',
    url: 'admin-service/users',
    data: user
  });
}

function * handleCreateUser ({ payload }) {
  try {
    yield put({ type: TYPE.META, payload: { disabled: true } });
    yield call(createUser, payload);
  } catch (error) {
    yield put({ type: TYPE.META, payload: { errorMessage: error.message } });
  }
  yield put({ type: TYPE.META, payload: { disabled: false } });
}

function * handleEditUser ({ payload }) {
  try {
    yield put({ type: TYPE.META, payload: { disabled: true } });
    yield call(editUser, payload);
  } catch (error) {
    yield put({ type: TYPE.META, payload: { errorMessage: error.message } });
  }
  yield put({ type: TYPE.META, payload: { disabled: false } });
}

function * initialSaga ({ payload }) {
  if (payload.userId) {
    try {
      const { data } = yield call(getUserById, payload.userId);
      yield put({ type: TYPE.META, payload: { user: data } });
    } catch (error) {
      yield put({ type: TYPE.META, payload: { errorMessage: error.message } });
    }
  }
  yield put({ type: TYPE.META, payload: { initialize: true } });
}

function * userEditWatcher () {
  yield takeEvery(TYPE.INITIALIZE, initialSaga);
  yield takeLatest(TYPE.EDIT_USER, handleEditUser);
  yield takeLatest(TYPE.CREATE_USER, handleCreateUser);
}

export default function * userEditSaga () {
  yield fork(userEditWatcher);
}
