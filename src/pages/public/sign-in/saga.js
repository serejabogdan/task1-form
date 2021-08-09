// outsource dependencies
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { TYPE as SIGN_IN_TYPE } from './reducer';
import { TYPE } from '../../reducer';
import { publicAPI } from '../../../utils/API';
import { TYPE as PRIVATE_TYPE } from '../../private/reducer';
import { TOKEN } from '../../../constants/local-storage';
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
    yield put({ type: SIGN_IN_TYPE.META, payload: { disabled: true } });
    const response = yield call(getTokenFromApi, payload);
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: TYPE.META, payload: response.data });
    yield put({ type: PRIVATE_TYPE.VALID_TOKEN, payload: response.data.accessToken });
    yield put({ type: TYPE.CHECK_ACCESS_TOKEN });
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
    yield call(removeLocalStorage, TOKEN);
  }
  yield delay(500);
  yield put({ type: SIGN_IN_TYPE.META, payload: { disabled: false } });
}

function * signInWatcher () {
  yield takeEvery(SIGN_IN_TYPE.SIGN_IN, authorizationWorker);
}

export default function * signInSaga () {
  yield fork(signInWatcher);
}
