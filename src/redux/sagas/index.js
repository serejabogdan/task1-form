import { fork } from 'redux-saga/effects';
import pagesSaga from '../../pages/saga';

export default function * rootSaga () {
  yield fork(pagesSaga);
}
