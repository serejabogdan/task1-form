import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';
import { PRIVATE_META, PRIVATE_SAGA_VALID_TOKEN } from './reducer';
import { getUserData } from '../../utils/API';
import { push } from 'connected-react-router';
import { PAGES_META } from '../reducer';
import { PRIVATE_USER, PUBLIC_SIGN_IN } from '../../utils/constants';

function * gettingUserDataWorker (action) {
  yield delay(500);
  yield put(push(PRIVATE_USER));
  try {
    const response = yield call(getUserData, action.payload);
    yield put({ type: PAGES_META, payload: { user: response.data } });
    yield put({ type: PRIVATE_META, payload: { initialized: true } });
  } catch (error) {
    yield put(push(PUBLIC_SIGN_IN));
  }
}


function * watchGettingUser () {
  yield takeEvery(PRIVATE_SAGA_VALID_TOKEN, gettingUserDataWorker);
}

export default function * privateSaga () {
  yield fork(watchGettingUser);
}
