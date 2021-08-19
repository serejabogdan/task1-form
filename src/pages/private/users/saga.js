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

function * userSelected ({ type, payload }) {
  const { data } = yield select(selector);
  const users = yield data.content.map(user => {
    if (user.id === payload.userId) {
      return { ...user, checked: !user.checked };
    }
    return user;
  });
  yield put({
    type: TYPE.META,
    payload: {
      hasAllUsersChecked: false,
      data: { ...data, content: users }
    }
  });
  yield call(isAtLeastOneSelected);
}

function * usersSelected ({ type, payload }) {
  const state = yield select(selector);
  const { data, hasAllUsersChecked } = state;
  const users = data.content.map(user => ({ ...user, checked: !hasAllUsersChecked }));
  yield put({
    type: TYPE.META,
    payload: {
      hasAllUsersChecked: !hasAllUsersChecked,
      data: { ...data, content: users }
    }
  });
  yield call(isAtLeastOneSelected);
}

function * getUsers (payload) {
  try {
    const { data } = yield call(getUsersApi, payload);
    yield put({ type: TYPE.META, payload: { data } });
  } catch (error) {
    console.log(error);
  }
}

function * updateFilters ({ type, payload }) {
  const { page, size, name, roles } = yield select(selector);
  const filters = { page, size, name, roles, ...payload };
  yield call(setFilters, filters);
  yield put({ type: TYPE.META, payload: { ...filters, hasAllUsersChecked: false } });
}

function * isAtLeastOneSelected () {
  const { data } = yield select(selector);
  const isActionsDropdownDisabled = yield !data.content.some(user => user.checked);
  yield put({
    type: TYPE.META,
    payload: { isActionsDropdownDisabled }
  });
}

function * setFilters (filters) {
  const { size, page, name, roles } = filters;
  const queriesString = qs.stringify({ size, page, name });
  yield put(replace(`?${queriesString}`));
  yield call(getUsers, { params: { size, page }, data: { name, roles } });
}

function * parseQueryParams (queryParams) {
  const validFilters = ['page', 'size', 'sort'];
  const queries = yield call(qs.parse, queryParams);
  let filters = validFilters.reduce((acc, filter) => {
    return { ...acc, [filter]: queries[filter] };
  }, {});
  filters = { ...filters, size: Number(filters.size), page: Number(filters.page) };
  return filters;
}

function * initializeSaga () {
  const queryParams = history.location.search.substr(1);
  if (queryParams) {
    const filters = yield call(parseQueryParams, queryParams);
    yield call(setFilters, filters);
    yield put({ type: TYPE.META, payload: filters });
  } else {
    const { page, size, name, roles } = yield select(selector);
    yield call(setFilters, { size, page, name, roles });
  }
  yield put({ type: TYPE.META, payload: { initialized: true } });
}

function * usersWatcher () {
  yield takeLatest(TYPE.UPDATE_FILTERS, updateFilters);
  yield takeLatest(TYPE.INITIALIZE, initializeSaga);
  yield takeLatest(TYPE.USER_SELECTED, userSelected);
  yield takeLatest(TYPE.USERS_SELECTED, usersSelected);
}

export default function * usersSaga () {
  yield fork(usersWatcher);
}
