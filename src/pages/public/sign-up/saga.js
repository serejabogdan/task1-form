import { fork } from 'redux-saga/effects';

function * signUpWatcher () {

}

export default function * signUpSaga () {
  yield fork(signUpWatcher);
}
