// outsource dependencies
import qs from 'qs';
import { push } from 'connected-react-router';
import { call, fork, put, takeLatest, select, delay } from 'redux-saga/effects';

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
    params: params || {},
  });
}

function * getUsers (payload) {
  try {
    const { data } = yield call(getUsersApi, payload);
    yield put({ type: TYPE.META, payload: { data } });
  } catch (error) {
    yield put({ type: TYPE.META, payload: { errorMessage: error.message } });
  }
}

function * updateFilters ({ payload }) {
  yield put({ type: TYPE.META, payload: { disabled: true } });
  yield delay(300);
  const { page, size, name, role, sort } = yield select(selector);
  const filters = { page, size, name, role, sort, ...payload };
  yield call(updateUrlFilters, filters);
  yield put({
    type: TYPE.META,
    payload: { ...filters, selectedUsers: [], disabled: false }
  });
}

function * updateUrlFilters ({ size, page, name, role, sort }) {
  const queriesString = qs.stringify({ size, page, name, role, sort }, { arrayFormat: 'repeat' });
  yield put(push(`?${queriesString}`));
  yield call(getUsers, { params: { size, page, sort: [sort, 'id,DESC'] }, data: { name, roles: role ? [role] : [] } });
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
    ...filters,
    size: validSize,
    page: validPage,
    role: filters.role,
    sortDirectionBoolean,
    currentSortField: validSortField,
    sort: `${validSortField},${validSortDirection}`,
  };
}

function * initialSaga () {
  const queryParams = history.location.search.substr(1);
  if (queryParams) {
    const filters = yield call(parseQueryParams, queryParams);
    yield call(updateFilters, { payload: filters });
    yield put({ type: TYPE.META, payload: filters });
  } else {
    yield call(updateFilters, { payload: {} });
  }
  yield put({ type: TYPE.META, payload: { initialized: true } });
}

function * usersWatcher () {
  yield takeLatest(TYPE.INITIALIZE, initialSaga);
  yield takeLatest(TYPE.UPDATE_FILTERS, updateFilters);
}

export default function * usersSaga () {
  yield fork(usersWatcher);
}
