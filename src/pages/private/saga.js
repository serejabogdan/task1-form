// outsource dependencies
import { push } from 'connected-react-router';
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { PAGES_META } from '../reducer';
import { getUserData, privateAPI } from '../../utils/API';
import { PRIVATE_META, PRIVATE_SAGA_VALID_TOKEN } from './reducer';
import { PRIVATE_USER, PUBLIC_SIGN_IN } from '../../constants/routes';
import { getLocalStorage } from '../../utils/local-storage';
import { TOKEN } from '../../constants/local-storage';

function * gettingUserDataWorker ({ type, payload }) {
  yield put(push(PRIVATE_USER));
  yield delay(500);
  const token = yield call(getLocalStorage, TOKEN);
  try {
    privateAPI.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
    const response = yield call(getUserData, token.accessToken);
    yield put({ type: PAGES_META, payload: { user: response.data } });
  } catch (error) {
    console.dir(error);
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: PRIVATE_META, payload: { initialized: true } });
}

function * watchGettingUser () {
  yield takeEvery(PRIVATE_SAGA_VALID_TOKEN, gettingUserDataWorker);
}

export default function * privateSaga () {
  yield fork(watchGettingUser);
}
