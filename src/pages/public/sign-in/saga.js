import { push } from 'connected-react-router';
import { put, takeEvery, call } from 'redux-saga/effects';

import { ASYNC_SET_TOKEN, setToken } from './reducer';
import { getDataFromApi, getUserData } from '../../../utils/API';
import { ASYNC_SET_USER, asyncSetUser, setInitialized, setUser } from '../../reducer';

function * setTokenWorker (action) {
  try {
    const { data } = yield call(getDataFromApi, action.payload);
    yield call([localStorage, localStorage.setItem], 'token', data.accessToken);
    yield put(setToken(data.accessToken));
    yield put(asyncSetUser(data.accessToken));
  } catch (error) {
    if (error.response.status === 401) {
      yield call([localStorage, localStorage.removeItem], 'token');
    }
    console.dir(error.message);
  }
}

function * signinWorker (action) {
  try {
    const { data } = yield call(getUserData, action.payload);
    yield put(setUser(data));
    yield put(push('/private/user'));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(push('/public/sign-in'));
    }
  }
  yield put(setInitialized(true));
}

export default function * () {
  yield takeEvery(ASYNC_SET_TOKEN, setTokenWorker);
  yield takeEvery(ASYNC_SET_USER, signinWorker);
}
