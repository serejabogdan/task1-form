// outsource dependencies
import { fork, put, takeEvery, delay, call } from 'redux-saga/effects';

// local dependencies
import publicSaga from './public/saga';
import privateSaga from './private/saga';
import { getUserData } from '../utils/API';
import { push } from 'connected-react-router';
import { PUBLIC_SIGN_IN } from '../constants/routes';
import { APP_INITIALIZING, PAGES_META } from './reducer';
import { PRIVATE_SAGA_VALID_TOKEN } from './private/reducer';

function * appInitializeWorker ({ type, payload }) {
  yield delay(500);
  try {
    yield call(getUserData, payload);
    yield put({ type: PRIVATE_SAGA_VALID_TOKEN, payload });
  } catch (error) {
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: PAGES_META, payload: { initialized: true } });
}

function * watchInitializeApp () {
  yield takeEvery(APP_INITIALIZING, appInitializeWorker);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(privateSaga);
  yield fork(watchInitializeApp);
}
