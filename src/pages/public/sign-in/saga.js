import { put, takeEvery, call } from 'redux-saga/effects';
import { getDataFromApi, getUserData } from '../../../utils/API';
import { push } from 'connected-react-router';
import { ASYNC_SET_TOKEN, setToken } from './reducer';
import { ASYNC_SET_USER, asyncSetUser, setInitialized, setUser } from '../../reducer';

function * setTokenWorker (action) {
  const { data } = yield call(getDataFromApi, action.payload);
  localStorage.setItem('token', data.accessToken);
  yield put(setToken(data.accessToken));
  yield put(asyncSetUser(data.accessToken));
}

function * signinWorker (action) {
  try {
    const { data } = yield call(getUserData, action.payload);
    yield put(setUser(data));
    yield put(push('/private/user'));
  } catch (e) {
    const UNAUTHORIZED = 401;
    if (e.response.status === UNAUTHORIZED) {
      yield put(push('/public/sign-in'));
    }
  }
  yield put(setInitialized(true));
}

export default function * () {
  yield takeEvery(ASYNC_SET_TOKEN, setTokenWorker);
  yield takeEvery(ASYNC_SET_USER, signinWorker);
}
