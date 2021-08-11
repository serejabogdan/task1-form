// outsource dependencies
import { call, fork, put, takeLatest } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import { privateAPI } from '../../../utils/API';
import { replace } from 'connected-react-router';

function getUsersApi ({ data, params }) {
  return privateAPI({
    method: 'POST',
    url: 'admin-service/users/filter',
    data: data || {},
    params
  });
}

function * getUsers ({ type, payload }) {
  try {
    const users = yield call(getUsersApi, payload);
    yield put({ type: TYPE.META, payload: { data: users.data } });
  } catch (error) {
    console.log(error);
  }
  yield call(initializeSaga, payload);
}

function * initializeSaga (payload) {
  yield put(replace(`?s=${payload.params.size}&p=${payload.params.page}`));
  yield put({ type: TYPE.META, payload: { initialized: true } });
}

function * usersWatcher () {
  yield takeLatest(TYPE.GET_USERS, getUsers);
}

export default function * usersSaga () {
  yield fork(usersWatcher);
}
