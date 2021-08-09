// outsource dependencies
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { SIGN_IN } from './reducer';
import { PAGES } from '../../reducer';
import { publicAPI } from '../../../utils/API';
import { TOKEN } from '../../../constants/local-storage';
import { PRIVATE } from '../../private/reducer';
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
    yield put({ type: SIGN_IN.META, payload: { disabled: true } });
    const response = yield call(getTokenFromApi, payload);
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: PAGES.META, payload: response.data });
    yield put({ type: PRIVATE.VALID_TOKEN, payload: response.data.accessToken });
    yield put({ type: PAGES.CHECK_ACCESS_TOKEN });
  } catch (error) {
    console.log(error);
    yield call(removeLocalStorage, TOKEN);
  }
  yield delay(500);
  yield put({ type: SIGN_IN.META, payload: { disabled: false } });
}

function * signInWatcher () {
  yield takeEvery(SIGN_IN.SET_TOKEN, authorizationWorker);
}

export default function * signInSaga () {
  yield fork(signInWatcher);
}
