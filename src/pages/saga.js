import { fork, put, takeEvery, delay, call } from 'redux-saga/effects';
// TODO: imports tree
import publicSaga from './public/saga';
import { APP_INITIALIZING, SET_INITIALIZED} from './reducer';
import { getUserData } from '../utils/API';
import { PRIVATE_SAGA_VALID_TOKEN } from './private/reducer';
import privateSaga from './private/saga';
import { push } from 'connected-react-router';
import { PUBLIC_SIGN_IN } from '../utils/constants';

function * appInitializeWorker (action) {
  yield delay(500);
  try {
    yield call(getUserData, action.payload);
    yield put({ type: PRIVATE_SAGA_VALID_TOKEN, payload: action.payload });
  } catch (error) {
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: SET_INITIALIZED, payload: true });
}

function * watchInitializeApp () {
  yield takeEvery(APP_INITIALIZING, appInitializeWorker);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(privateSaga);
  yield fork(watchInitializeApp);
}
