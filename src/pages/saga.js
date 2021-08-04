import { fork, put, takeEvery } from 'redux-saga/effects';
import publicSaga from './public/saga';
import { APP_INITIALIZING, asyncSetUser } from './reducer';
import { delay } from '../utils/API';

function * appInitializeWorker (action) {
  yield delay(2);
  yield put(asyncSetUser(action.payload));
}

function * watchInitializeApp () {
  yield takeEvery(APP_INITIALIZING, appInitializeWorker);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(watchInitializeApp);
}
