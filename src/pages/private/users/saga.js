// outsource dependencies
import qs from 'qs';
import { push } from 'connected-react-router';
import { call, fork, put, takeLatest, select } from 'redux-saga/effects';

// local dependencies
import { history } from '../../../redux';
import { selector, TYPE } from './reducer';
import { privateAPI } from '../../../utils/API';
import { FILTERS, SIZES, SORT_DOWN, SORT_FIELDS, SORT_UP } from '../../../constants/valid-query-params';

function getUsersApi ({ data, params }) {
  return privateAPI({
    method: 'POST',
    url: 'admin-service/users/filter',
    data: data || {},
    params: params || {}
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
  yield call(isAtLeastOneSelected);
}

function * handleSortBy ({ type, payload: fieldName }) {
  const { currentSortField, sortDirectionBoolean } = yield select(selector);
  if (currentSortField === fieldName) {
    yield put({
      type: TYPE.UPDATE_FILTERS,
      payload: {
        sortDirectionBoolean: !sortDirectionBoolean,
        sort: `${fieldName},${!sortDirectionBoolean ? SORT_DOWN : SORT_UP}`,
      }
    });
  } else {
    yield put({
      type: TYPE.UPDATE_FILTERS,
      payload: {
        sortDirectionBoolean: true,
        currentSortField: fieldName,
        sort: `${fieldName},${SORT_DOWN}`,
      }
    });
  }
}

function * updateFilters ({ type, payload }) {
  const { page, size, name, roles, sort } = yield select(selector);
  const filters = { page, size, name, roles, sort, ...payload };
  yield call(setFilters, filters);
  yield put({
    type: TYPE.META,
    payload: { ...filters, hasAllUsersChecked: false }
  });
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
  const { size, page, name, roles, sort } = filters;
  const queriesString = qs.stringify({ size, page, sort });
  yield put(push(`?${queriesString}`));
  yield call(getUsers, { params: { size, page, sort }, data: { name, roles } });
}

function * parseQueryParams (queryParams) {
  const state = yield select(selector);
  const queries = yield call(qs.parse, queryParams);
  const filters = FILTERS.reduce((acc, filter) => {
    const hasQuery = queries[filter] ? queries[filter] : state[filter];
    return { ...acc, [filter]: hasQuery };
  }, {});
  return yield call(validParsedQueryParams, filters, state);
}

function validParsedQueryParams (filters, state) {
  // parsed sort params like sorted field and direction
  const [sortField, sortDirection] = filters.sort.split(',');
  const pageNumber = Number(filters.page);
  const validPage = pageNumber >= 0 ? pageNumber : state.page;
  const validSize = SIZES.includes(filters.size) ? filters.size : state.size;
  const validSortField = Object.values(SORT_FIELDS).includes(sortField) ? sortField : state.sortField;
  const validSortDirection = sortDirection === SORT_DOWN || sortDirection === SORT_UP ? sortDirection : SORT_DOWN;
  const sortDirectionBoolean = validSortDirection === SORT_DOWN;
  return {
    size: validSize,
    page: validPage,
    sortDirectionBoolean,
    sortField: validSortField,
    sort: `${validSortField},${validSortDirection}`,
  };
}

function * initializeSaga () {
  const queryParams = history.location.search.substr(1);
  if (queryParams) {
    const filters = yield call(parseQueryParams, queryParams);
    yield call(updateFilters, { payload: filters });
    yield put({ type: TYPE.META, payload: filters });
  } else {
    yield call(updateFilters, {});
  }
  yield put({ type: TYPE.META, payload: { initialized: true } });
}

function * usersWatcher () {
  yield takeLatest(TYPE.SORT_BY, handleSortBy);
  yield takeLatest(TYPE.INITIALIZE, initializeSaga);
  yield takeLatest(TYPE.USER_SELECTED, userSelected);
  yield takeLatest(TYPE.USERS_SELECTED, usersSelected);
  yield takeLatest(TYPE.UPDATE_FILTERS, updateFilters);
}

export default function * usersSaga () {
  yield fork(usersWatcher);
}
