// outsource dependencies
import { push } from 'connected-react-router';
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { TYPE } from '../reducer';
import usersSaga from './users/saga';
import { TYPE as PRIVATE_TYPE } from './reducer';
import { TOKEN } from '../../constants/local-storage';
import { PUBLIC_SIGN_IN } from '../../constants/routes';
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
    yield put({ type: TYPE.META, payload: { user: response.data } });
    yield put({ type: TYPE.META, payload: { auth: true } });
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield delay(200);
  yield put({ type: PRIVATE_TYPE.META, payload: { initialized: true } });
}

function * logOutWorker () {
  try {
    yield call(logOut);
    yield put({ type: TYPE.CLEAR });
    yield call(removeLocalStorage, TOKEN);
    yield put(push(PUBLIC_SIGN_IN));
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
  }
}

function * watchGettingUser () {
  yield takeEvery(PRIVATE_TYPE.VALID_TOKEN, gettingUserDataWorker);
  yield takeEvery(PRIVATE_TYPE.LOGOUT, logOutWorker);
}

export default function * privateSaga () {
  yield fork(watchGettingUser);
  yield fork(usersSaga);
}
