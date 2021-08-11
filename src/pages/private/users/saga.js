// outsource dependencies
import qs from 'qs';
import { call, fork, put, takeLatest, select } from 'redux-saga/effects';

// local dependencies
import { history } from '../../../redux';
import { selector, TYPE } from './reducer';
import { privateAPI } from '../../../utils/API';
import { push, replace } from 'connected-react-router';

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
  yield put(replace(`?size=${size}&page=${page}`));
  yield call(getUsers, { params: { size, page } });
  yield put({ type: TYPE.META, payload: { size, page } });
}

function * initializeSaga () {
  const queryParams = history.location.search.substr(1);
  if (queryParams) {
    const { size, page } = qs.parse(queryParams);
    const sizeNumber = Number(size);
    const pageNumber = Number(page);
    yield put(replace(`?size=${sizeNumber}&page=${pageNumber}`));
    yield call(getUsers, { params: { size: sizeNumber, page: pageNumber } });
    yield put({ type: TYPE.META, payload: { size: sizeNumber, page: pageNumber } });
  } else {
    const { page, size } = yield select(selector);
    yield put(push(`?size=${size}&page=${page}`));
    yield call(getUsers, { params: { size, page } });
    yield put({ type: TYPE.META, payload: { size, page } });
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
