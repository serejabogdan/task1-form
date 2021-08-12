// outsource dependencies
import qs from 'qs';
import { replace } from 'connected-react-router';
import { call, fork, put, takeLatest, select } from 'redux-saga/effects';

// local dependencies
import { history } from '../../../redux';
import { selector, TYPE } from './reducer';
import { privateAPI } from '../../../utils/API';

function getUsersApi ({ data, params }) {
  return privateAPI({
    method: 'POST',
    url: 'admin-service/users/filter',
    data: data || {},
    params
  });
}

function * getUsers (payload) {
  try {
    const users = yield call(getUsersApi, payload);
    yield put({ type: TYPE.META, payload: { data: users.data } });
  } catch (error) {
    console.log(error);
  }
}

function * updateFilters () {
  const { page, size } = yield select(selector);
  yield call(setFilters, { size, page });
}

function * setFilters ({ size, page }) {
  yield put(replace(`?size=${size}&page=${page}`));
  yield call(getUsers, { params: { size, page } });
  yield put({ type: TYPE.META, payload: { size: Number(size), page: Number(page) } });
}

function * initializeSaga () {
  const queryParams = history.location.search.substr(1);
  if (queryParams) {
    const { size, page } = qs.parse(queryParams);
    yield call(setFilters, { size, page });
  } else {
    const { page, size } = yield select(selector);
    yield call(setFilters, { size, page });
  }
  yield put({ type: TYPE.META, payload: { initialized: true } });
}

function * usersWatcher () {
  yield takeLatest(TYPE.UPDATE_FILTERS, updateFilters);
  yield takeLatest(TYPE.INITIALIZE, initializeSaga);
}

export default function * usersSaga () {
  yield fork(usersWatcher);
}
