// outsource dependencies
import { push } from 'connected-react-router';
import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { PAGES_META } from '../reducer';
import { getUserData } from '../../utils/API';
import { PRIVATE_META, PRIVATE_SAGA_VALID_TOKEN } from './reducer';
import { PRIVATE_USER, PUBLIC_SIGN_IN } from '../../constants/routes';

function * gettingUserDataWorker ({ type, payload }) {
  yield put(push(PRIVATE_USER));

  yield delay(500);
  try {
    const response = yield call(getUserData, payload);
    yield put({ type: PAGES_META, payload: { user: response.data } });
  } catch (error) {
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
