// outsource dependencies
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { META, SAGA_SET_TOKEN } from './reducer';
import { privateAPI } from '../../../utils/API';
import { TOKEN } from '../../../constants/local-storage';
import { PRIVATE_SAGA_VALID_TOKEN } from '../../private/reducer';
import { removeLocalStorage, setLocalStorage } from '../../../utils/local-storage';

function getTokenFromApi (payload) {
  return privateAPI({
    method: 'POST',
    url: 'auth/token',
    data: payload
  });
}

function * authorizationWorker ({ type, payload }) {
  try {
    yield put({ type: META, payload: { disabled: true } });
    yield delay(2000);
    const response = yield call(getTokenFromApi, payload);
    yield call(setLocalStorage, TOKEN, response.data);
    yield put({ type: META, payload: response.data.accessToken });
    yield put({ type: PRIVATE_SAGA_VALID_TOKEN, payload: response.data.accessToken });
  } catch (error) {
    console.log(error);
    yield call(removeLocalStorage, TOKEN);
  }
  yield put({ type: META, payload: { disabled: false } });
}

function * signInWatcher () {
  yield takeEvery(SAGA_SET_TOKEN, authorizationWorker);
}

export default function * signInSaga () {
  yield fork(signInWatcher);
}
