// outsource dependencies
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { publicAPI } from '../../../utils/API';
import { TOKEN } from '../../../constants/local-storage';
import { SAGA_SET_TOKEN, SIGN_IN_META } from './reducer';
import { PAGES_META, REFRESH_TOKEN_SAGA } from '../../reducer';
import { PRIVATE_SAGA_VALID_TOKEN } from '../../private/reducer';
import { removeLocalStorage, setLocalStorage } from '../../../utils/local-storage';

function getTokenFromApi (payload) {
  return publicAPI({
    method: 'POST',
    url: 'auth/token',
    data: payload
  });
}

function * authorizationWorker ({ type, payload }) {
  try {
    yield put({ type: SIGN_IN_META, payload: { disabled: true } });
    const response = yield call(getTokenFromApi, payload);
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: PAGES_META, payload: response.data });
    yield put({ type: PRIVATE_SAGA_VALID_TOKEN, payload: response.data.accessToken });
    yield put({ type: REFRESH_TOKEN_SAGA });
  } catch (error) {
    console.log(error);
    yield call(removeLocalStorage, TOKEN);
  }
  yield delay(500);
  yield put({ type: SIGN_IN_META, payload: { disabled: false } });
}

function * signInWatcher () {
  yield takeEvery(SAGA_SET_TOKEN, authorizationWorker);
}

export default function * signInSaga () {
  yield fork(signInWatcher);
}
