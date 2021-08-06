// outsource dependencies
import { fork, put, takeEvery, delay, call, take, cancel, cancelled } from 'redux-saga/effects';

// local dependencies
import publicSaga from './public/saga';
import privateSaga from './private/saga';
import { push } from 'connected-react-router';
import { TOKEN } from '../constants/local-storage';
import { PUBLIC_SIGN_IN } from '../constants/routes';
import { PRIVATE_SAGA_VALID_TOKEN } from './private/reducer';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';
import { addAuthorizationHeader, getUserData, privateAPI } from '../utils/API';
import { APP_INITIALIZING, PAGES_META, REFRESH_TOKEN_SAGA } from './reducer';

function refreshTokenApi (token) {
  return privateAPI({
    method: 'POST',
    url: 'auth/token/refresh',
    data: token
  });
}

function * appInitializeWorker ({ type, payload }) {
  yield delay(500);
  try {
    const token = yield call(getLocalStorage, TOKEN);
    yield call(addAuthorizationHeader, token);

    yield call(getUserData);
    yield put({ type: PRIVATE_SAGA_VALID_TOKEN, payload: token.accessToken });
    yield put({ type: REFRESH_TOKEN_SAGA });
  } catch (error) {
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: PAGES_META, payload: { initialized: true } });
}

function * refreshTokenWorker () {
  try {
    const { refreshToken } = yield call(getLocalStorage, TOKEN);
    const response = yield call(refreshTokenApi, { refreshToken });
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: PAGES_META, payload: response.data });
    yield call(addAuthorizationHeader, response.data);
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      console.log('refreshToken is stopped');
    }
  }
  yield delay(10000);
  console.log('refreshToken isn`t stopped');
  yield put({ type: REFRESH_TOKEN_SAGA });
}

function * startRefreshWorker () {
  const refreshForked = yield fork(refreshTokenWorker);
  yield take('STOP_REFRESHING_TOKEN');
  yield cancel(refreshForked);
}

function * watchInitializeApp () {
  yield takeEvery(APP_INITIALIZING, appInitializeWorker);
  yield takeEvery(REFRESH_TOKEN_SAGA, startRefreshWorker);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(privateSaga);
  yield fork(watchInitializeApp);
}
