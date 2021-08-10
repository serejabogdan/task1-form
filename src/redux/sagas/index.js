// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import pagesSaga from '../../pages/saga';

export default function * rootSaga () {
  yield fork(pagesSaga);
}
