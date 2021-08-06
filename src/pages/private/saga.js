// outsource dependencies
import { push } from 'connected-react-router';
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { SAGA_LOGOUT } from './user/reducer';
import { PAGES_CLEAR, PAGES_META } from '../reducer';
import { TOKEN } from '../../constants/local-storage';
import { PRIVATE_META, PRIVATE_SAGA_VALID_TOKEN } from './reducer';
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
  const token = yield call(getLocalStorage, TOKEN);
  try {
    yield call(addAuthorizationHeader, token);
    const response = yield call(getUserData, token.accessToken);
    yield put({ type: PAGES_META, payload: { user: response.data } });
  } catch (error) {
    console.dir(error);
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield delay(500);
  yield put(push(PRIVATE_USER));
  yield put({ type: PRIVATE_META, payload: { initialized: true } });
}

function * logOutWorker () {
  try {
    yield call(logOut);
    yield put({ type: PAGES_CLEAR });
    yield call(removeLocalStorage, TOKEN);
    yield put(push(PUBLIC_SIGN_IN));
  } catch (error) {
    console.log(error);
  }
}

function * watchGettingUser () {
  yield takeEvery(PRIVATE_SAGA_VALID_TOKEN, gettingUserDataWorker);
  yield takeEvery(SAGA_LOGOUT, logOutWorker);
}

export default function * privateSaga () {
  yield fork(watchGettingUser);
}
