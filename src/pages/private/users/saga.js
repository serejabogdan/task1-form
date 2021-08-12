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
  const { page, size, name } = yield select(selector);
  yield call(setFilters, { size, page, name });
}

function * setFilters (filters) {
  const queriesString = qs.stringify(filters);
  yield put(replace(`?${queriesString}`));
  yield call(getUsers, { params: { ...filters } });
  yield put({ type: TYPE.META, payload: { ...filters } });
}

function * initializeSaga () {
  const validFilters = ['page', 'size', 'name'];
  const queryParams = history.location.search.substr(1);
  if (queryParams) {
    const queries = qs.parse(queryParams);
    let filters = validFilters.reduce((acc, filter) => ({ ...acc, [filter]: queries[filter] }), {});
    filters = { ...filters, size: Number(filters.size), page: Number(filters.page) };
    yield call(setFilters, filters);
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
