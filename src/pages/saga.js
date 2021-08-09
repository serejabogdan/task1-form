// outsource dependencies
import { push } from 'connected-react-router';
import { fork, put, takeEvery, delay, call, take, cancel, cancelled } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import publicSaga from './public/saga';
import privateSaga from './private/saga';
import { TYPE as PRIVATE_TYPE } from './private/reducer';
import { TOKEN } from '../constants/local-storage';
import { PUBLIC_SIGN_IN } from '../constants/routes';
import { getUserData, publicAPI } from '../utils/API';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/local-storage';
import request from '../utils/refresh-token';

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
    yield call(getUserData);
    yield put({ type: PRIVATE_TYPE.VALID_TOKEN, payload: accessToken });
    yield put({ type: TYPE.CHECK_ACCESS_TOKEN });
    yield put({ type: TYPE.META, payload: { auth: true } });
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: TYPE.META, payload: { initialized: true } });
}

function * checkAccessToken () {
  const data = getLocalStorage(TOKEN);
  setLocalStorage(TOKEN, {...data, accessToken: data.accessToken + '1'})
  try {
    yield delay(4000);
    yield call(getUserData);
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
    yield put({ type: TYPE.UPDATE_TOKEN });
  } finally {
    if (yield cancelled()) {
      console.log('checkToken is stopped');
    }
  }
  yield put({ type: TYPE.CHECK_ACCESS_TOKEN });
}

function * stopRefreshingToken () {
  const refreshForked = yield fork(checkAccessToken);
  yield take(TYPE.STOP_REFRESHING_TOKEN);
  yield cancel(refreshForked);
}

function * updateToken () {
  try {
    const { refreshToken } = yield call(getLocalStorage, TOKEN);
    const response = yield call(updateTokenApi, { refreshToken });
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: TYPE.META, payload: { token: response.data } });
    // yield call(addAuthorizationHeader, response.data.accessToken);
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
    yield put({ type: TYPE.CLEAR });
    yield call(removeLocalStorage, TOKEN);
    yield put(push(PUBLIC_SIGN_IN));
  }
}

function * initializingPages () {
  yield takeEvery(TYPE.INITIALIZE, appInitialize);
  yield takeEvery(TYPE.CHECK_ACCESS_TOKEN, stopRefreshingToken);
  // yield takeEvery(TYPE.UPDATE_TOKEN, updateToken);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(privateSaga);
  yield fork(initializingPages);
}
