// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import signUpSaga from './sign-up/saga';
import signInSaga from './sign-in/saga';

export default function * publicSaga () {
  yield fork(signUpSaga);
  yield fork(signInSaga);
}
