// outsource dependencies
import { fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';

function * initialSaga () {
  yield put({ type: TYPE.META, payload: { initialize: true } });
}

function * userCreateWatcher () {
  yield takeEvery(TYPE.INITIALIZE, initialSaga);
}

export default function * userCreateSaga () {
  yield fork(userCreateWatcher);
}
