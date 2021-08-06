// outsource dependencies
import { fork, put, takeEvery, delay, call } from 'redux-saga/effects';

// local dependencies
import publicSaga from './public/saga';
import privateSaga from './private/saga';
import { getUserData, privateAPI, publicAPI } from '../utils/API';
import { push } from 'connected-react-router';
import { TOKEN } from '../constants/local-storage';
import { PUBLIC_SIGN_IN } from '../constants/routes';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';
import { APP_INITIALIZING, PAGES_META, REFRESH_TOKEN_SAGA } from './reducer';
import { PRIVATE_SAGA_VALID_TOKEN } from './private/reducer';

function refreshTokenApi (token) {
  return publicAPI({
    method: 'POST',
    url: 'auth/token/refresh',
    data: token
  });
}

function * appInitializeWorker ({ type, payload }) {
  yield delay(500);
  const token = yield call(getLocalStorage, TOKEN);
  if (token) {
    privateAPI.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
  }
  try {
    yield call(getUserData);
    yield put({ type: PRIVATE_SAGA_VALID_TOKEN, payload: token.accessToken });
    yield put({ type: REFRESH_TOKEN_SAGA });
  } catch (error) {
    console.log(error);
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: PAGES_META, payload: { initialized: true } });
}

function * refreshTokenWorker () {
  yield delay(10000);

  const { refreshToken } = yield call(getLocalStorage, TOKEN);
  try {
    const response = yield call(refreshTokenApi, { refreshToken });
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: PAGES_META, payload: response.data.refreshToken });
    privateAPI.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
  } catch (error) {
    console.log(error);
  }
  yield put({ type: REFRESH_TOKEN_SAGA });
}

function * watchInitializeApp () {
  yield takeEvery(APP_INITIALIZING, appInitializeWorker);
  yield takeEvery(REFRESH_TOKEN_SAGA, refreshTokenWorker);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(privateSaga);
  yield fork(watchInitializeApp);
}
