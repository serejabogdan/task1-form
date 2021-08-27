import { fork } from 'redux-saga/effects';

function * userEditWatcher () {}

export default function * userEditSaga () {
  yield fork(userEditWatcher);
}
