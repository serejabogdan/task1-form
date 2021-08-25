// outsource dependencies
import { push } from 'connected-react-router';
import { fork, put, takeEvery, delay, call } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import publicSaga from './public/saga';
import privateSaga from './private/saga';
import { getUserData } from '../utils/API';
import { TOKEN } from '../constants/local-storage';
import { PUBLIC_SIGN_IN } from '../constants/routes';
import { TYPE as PRIVATE_TYPE } from './private/reducer';
import { getLocalStorage } from '../utils/local-storage';

function * appInitialize ({ type, payload }) {
  yield delay(200);
  try {
    const { accessToken } = yield call(getLocalStorage, TOKEN);
    yield call(getUserData);
    yield put({ type: PRIVATE_TYPE.VALID_TOKEN, payload: accessToken });
    yield put({ type: TYPE.META, payload: { auth: true } });
  } catch ({ message }) {
    yield put({ type: TYPE.META, payload: { errorMessage: message } });
    yield put(push(PUBLIC_SIGN_IN));
  }
  yield put({ type: TYPE.META, payload: { initialized: true } });
}

function * initializingPages () {
  yield takeEvery(TYPE.INITIALIZE, appInitialize);
}

export default function * pagesSaga () {
  yield fork(publicSaga);
  yield fork(privateSaga);
  yield fork(initializingPages);
}
