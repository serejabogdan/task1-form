// outsource dependencies
import { push } from 'connected-react-router';
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { TYPE } from '../reducer';
import usersSaga from './users/saga';
import userEditSaga from './user-edit/saga';
import { SIGN_IN } from '../../constants/routes';
import { TYPE as PRIVATE_TYPE } from './reducer';
import { TOKEN } from '../../constants/local-storage';
import { getLocalStorage, removeLocalStorage } from '../../utils/local-storage';
import { addAuthorizationHeader, getUserData, privateAPI } from '../../utils/API';

function logOut () {
  return privateAPI({
    method: 'POST',
    url: 'auth/logout',
  });
}

function getRoles ({ data, params }) {
  return privateAPI({
    method: 'POST',
    url: 'admin-service/roles/filter',
    data: data || {},
    params: params || {},
  });
}

function * initialSaga () {
  try {
    const { accessToken } = yield call(getLocalStorage, TOKEN);
    yield call(addAuthorizationHeader, accessToken);
    const response = yield call(getUserData, accessToken);
    const { data } = yield call(getRoles, { params: { page: 0, size: 15 } });
    yield put({ type: TYPE.META, payload: { user: response.data, auth: true, roles: data.content } });
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
    yield put(push(SIGN_IN.link()));
  }
  yield delay(200);
  yield put({ type: PRIVATE_TYPE.META, payload: { initialized: true } });
}

function * logOutWorker () {
  try {
    yield call(logOut);
    yield put({ type: TYPE.CLEAR });
    yield call(removeLocalStorage, TOKEN);
    yield put(push(SIGN_IN.link()));
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
  }
}

function * watchGettingUser () {
  yield takeEvery(PRIVATE_TYPE.VALID_TOKEN, initialSaga);
  yield takeEvery(PRIVATE_TYPE.LOGOUT, logOutWorker);
}

export default function * privateSaga () {
  yield fork(usersSaga);
  yield fork(userEditSaga);
  yield fork(watchGettingUser);
}
