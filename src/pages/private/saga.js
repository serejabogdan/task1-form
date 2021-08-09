// outsource dependencies
import { push } from 'connected-react-router';
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { PAGES } from '../reducer';
import { PRIVATE } from './reducer';
import { TOKEN } from '../../constants/local-storage';
import { PRIVATE_USER, PUBLIC_SIGN_IN } from '../../constants/routes';
import { getLocalStorage, removeLocalStorage } from '../../utils/local-storage';
import { addAuthorizationHeader, getUserData, privateAPI } from '../../utils/API';

function logOut () {
  return privateAPI({
    method: 'POST',
    url: 'auth/logout',
  });
}

function * gettingUserDataWorker ({ type, payload }) {
  try {
    const { accessToken } = yield call(getLocalStorage, TOKEN);
    yield call(addAuthorizationHeader, accessToken);
    const response = yield call(getUserData, accessToken);
    yield put({ type: PAGES.META, payload: { user: response.data } });
  } catch ({ message }) {
    yield put({ type: PAGES.META, payload: { errorMessage: message } });
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield delay(500);
  yield put(push(PRIVATE_USER));
  yield put({ type: PRIVATE.META, payload: { initialized: true } });
}

function * logOutWorker () {
  try {
    yield call(logOut);
    yield put({ type: PAGES.CLEAR });
    yield call(removeLocalStorage, TOKEN);
    yield put(push(PUBLIC_SIGN_IN));
  } catch ({ message }) {
    yield put({ type: PAGES.META, payload: { errorMessage: message } });
  }
}

function * watchGettingUser () {
  yield takeEvery(PRIVATE.VALID_TOKEN, gettingUserDataWorker);
  yield takeEvery(PRIVATE.LOGOUT, logOutWorker);
}

export default function * privateSaga () {
  yield fork(watchGettingUser);
}
