// outsource dependencies
import { fork, put, takeEvery, delay, call, take, cancel, cancelled } from 'redux-saga/effects';

// local dependencies
import publicSaga from './public/saga';
import privateSaga from './private/saga';
import { push } from 'connected-react-router';
import { TOKEN } from '../constants/local-storage';
import { PUBLIC_SIGN_IN } from '../constants/routes';
import { PRIVATE_SAGA_VALID_TOKEN } from './private/reducer';
import { addAuthorizationHeader, getUserData, publicAPI } from '../utils/API';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/local-storage';
import { APP_INITIALIZING, CHECK_ACCESS_TOKEN_SAGA, PAGES_CLEAR, PAGES_META, UPDATE_TOKEN_SAGA } from './reducer';

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
    yield put({ type: PRIVATE_SAGA_VALID_TOKEN, payload: accessToken });
    yield put({ type: CHECK_ACCESS_TOKEN_SAGA });
  } catch (error) {
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: PAGES_META, payload: { initialized: true } });
}

function * checkAccessToken () {
  try {
    yield delay(10000);
    const { accessToken } = yield call(getLocalStorage, TOKEN);
    yield call(getUserData, { accessToken });
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_TOKEN_SAGA });
  } finally {
    if (yield cancelled()) {
      console.log('checkToken is stopped');
    }
  }
  yield put({ type: CHECK_ACCESS_TOKEN_SAGA });
}

function * startChecking () {
  const refreshForked = yield fork(checkAccessToken);
  yield take('STOP_REFRESHING_TOKEN');
  yield cancel(refreshForked);
}

function * updateToken () {
  try {
    const { refreshToken } = yield call(getLocalStorage, TOKEN);
    const response = yield call(updateTokenApi, { refreshToken });
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: PAGES_META, payload: { token: response.data } });
    yield call(addAuthorizationHeader, response.data.accessToken);
  } catch (error) {
    console.log(error);
    yield put({ type: PAGES_CLEAR });
    yield call(removeLocalStorage, TOKEN);
    yield put(push(PUBLIC_SIGN_IN));
  }
}

function * initializingPages () {
  yield takeEvery(APP_INITIALIZING, appInitialize);
  yield takeEvery(CHECK_ACCESS_TOKEN_SAGA, startChecking);
  yield takeEvery(UPDATE_TOKEN_SAGA, updateToken);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(privateSaga);
  yield fork(initializingPages);
}
