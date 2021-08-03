import { put, takeEvery, call } from 'redux-saga/effects';
import { getDataFromApi, getUserData } from '../../../utils/API';
import { ASYNC_SET_TOKEN, ASYNC_SET_USER, asyncSetUser, setToken, setUser } from '../../reducer';
import { push } from 'connected-react-router';

function * setTokenWorker (action) {
  const { data } = yield call(getDataFromApi, action.payload);
  localStorage.setItem('token', data.accessToken);
  yield put(setToken(data.accessToken));
  yield put(asyncSetUser(data.accessToken));
}

function * setUserWorker (action) {
  const data = yield call(getUserData, action.payload);
  yield put(setUser(data.data));
  yield put((push('/user')));
  localStorage.removeItem('token');
}

export default function * () {
  yield takeEvery(ASYNC_SET_TOKEN, setTokenWorker);
  yield takeEvery(ASYNC_SET_USER, setUserWorker);
}
