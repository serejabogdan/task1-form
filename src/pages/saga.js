import { fork, put, takeEvery, delay } from 'redux-saga/effects';

import publicSaga from './public/saga';
import { APP_INITIALIZING, asyncSetUser } from './reducer';

function * appInitializeWorker (action) {
  yield delay(500);
  yield put(asyncSetUser(action.payload));
}

function * watchInitializeApp () {
  yield takeEvery(APP_INITIALIZING, appInitializeWorker);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(watchInitializeApp);
}
