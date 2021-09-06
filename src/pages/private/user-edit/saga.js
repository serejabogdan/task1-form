// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import { TYPE as usersType } from '../users/reducer';
import { privateAPI } from '../../../utils/API';
import { USERS, USERS_EDIT } from '../../../constants/routes';

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

function deleteUser (user) {
  return privateAPI({
    method: 'DELETE',
    url: 'admin-service/users',
    data: user
  });
}

function * handleEditUser ({ payload }) {
  yield put({ type: TYPE.META, payload: { disabled: true } });
  try {
    if (payload.id) {
      yield call(editUser, payload);
      toastr.success('Successful!', 'User was successfully edited');
    } else {
      const { data } = yield call(createUser, payload);
      toastr.success('Successful!', 'User was successfully created');
      yield put(push(USERS_EDIT.link(data.id)));
    }
  } catch (error) {
    toastr.error('Failed!', error.message);
    yield put({ type: TYPE.META, payload: { errorMessage: error.message } });
  }
  yield put({ type: TYPE.META, payload: { disabled: false } });
}

function * handleDeleteUser ({ payload }) {
  try {
    yield put({ type: TYPE.META, payload: { disabled: true } });
    yield call(deleteUser, payload);
    toastr.success('Successful!', 'User was successfully deleted');
    yield put({ type: usersType.INITIALIZE });
  } catch (error) {
    toastr.error('Failed!', error.message);
    yield put({ type: TYPE.META, payload: { errorMessage: error.message } });
  }
  yield put({ type: TYPE.META, payload: { disabled: false } });
  yield put(push(USERS.link()));
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
  yield takeLatest(TYPE.DELETE_USER, handleDeleteUser);
}

export default function * userEditSaga () {
  yield fork(userEditWatcher);
}
