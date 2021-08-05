import { call, fork, put, takeEvery } from 'redux-saga/effects';

import { PAGES_META } from '../reducer';
import { publicAPI } from '../../utils/API';
import { SAGA_SET_TOKEN } from './sign-in/reducer';
import { PRIVATE_SAGA_VALID_TOKEN } from '../private/reducer';

export function getTokenFromApi (payload) {
  return publicAPI({
    method: 'POST',
    url: 'auth/token',
    data: { ...payload }
  });
}

function * setTokenWorker (action) {
  try {
    const response = yield call(getTokenFromApi, action.payload);
    yield call([localStorage, localStorage.setItem], 'token', response.data.accessToken);
    yield put({ type: PAGES_META, payload: { accessToken: response.data.accessToken } });
    yield put({ type: PRIVATE_SAGA_VALID_TOKEN, payload: response.data.accessToken });
  } catch (error) {
    console.log(error);
    yield call([localStorage, localStorage.removeItem], 'token');
  }
}

function * watchPublicPages () {
  yield takeEvery(SAGA_SET_TOKEN, setTokenWorker);
}

export default function * publicSaga () {
  yield fork(watchPublicPages);
}
