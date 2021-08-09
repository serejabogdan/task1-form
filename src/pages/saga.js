// outsource dependencies
import { push } from 'connected-react-router';
import { fork, put, takeEvery, delay, call, take, cancel, cancelled } from 'redux-saga/effects';


// local dependencies
import { PAGES } from './reducer';
import publicSaga from './public/saga';
import privateSaga from './private/saga';
import { PRIVATE } from './private/reducer';
import { TOKEN } from '../constants/local-storage';
import { PUBLIC_SIGN_IN } from '../constants/routes';
import { addAuthorizationHeader, getUserData, publicAPI } from '../utils/API';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/local-storage';

function updateTokenApi (token) {
  return publicAPI({
    method: 'POST',
    url: 'auth/token/refresh',
    data: token
  });
}

function * appInitialize ({ type, payload }) {
  yield delay(500);
  try {
    const { accessToken } = yield call(getLocalStorage, TOKEN);
    yield call(addAuthorizationHeader, accessToken);

    yield call(getUserData);
    yield put({ type: PRIVATE.VALID_TOKEN, payload: accessToken });
    yield put({ type: PAGES.CHECK_ACCESS_TOKEN });
  } catch ({ message }) {
    yield put({ type: PAGES.META, payload: { errorMessage: message } });
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: PAGES.META, payload: { initialized: true } });
}

function * checkAccessToken () {
  try {
    yield delay(10000);
    const { accessToken } = yield call(getLocalStorage, TOKEN);
    yield call(getUserData, { accessToken });
  } catch ({ message }) {
    yield put({ type: PAGES.META, payload: { errorMessage: message } });
    yield put({ type: PAGES.UPDATE_TOKEN });
  } finally {
    if (yield cancelled()) {
      console.log('checkToken is stopped');
    }
  }
  yield put({ type: PAGES.CHECK_ACCESS_TOKEN });
}

function * stopRefreshingToken () {
  const refreshForked = yield fork(checkAccessToken);
  yield take(PAGES.STOP_REFRESHING_TOKEN);
  yield cancel(refreshForked);
}

function * updateToken () {
  try {
    const { refreshToken } = yield call(getLocalStorage, TOKEN);
    const response = yield call(updateTokenApi, { refreshToken });
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: PAGES.META, payload: { token: response.data } });
    yield call(addAuthorizationHeader, response.data.accessToken);
  } catch ({ message }) {
    yield put({ type: PAGES.META, payload: { errorMessage: message } });
    yield put({ type: PAGES.CLEAR });
    yield call(removeLocalStorage, TOKEN);
    yield put(push(PUBLIC_SIGN_IN));
  }
}

function * initializingPages () {
  yield takeEvery(PAGES.INITIALIZE, appInitialize);
  yield takeEvery(PAGES.CHECK_ACCESS_TOKEN, stopRefreshingToken);
  yield takeEvery(PAGES.UPDATE_TOKEN, updateToken);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(privateSaga);
  yield fork(initializingPages);
}
