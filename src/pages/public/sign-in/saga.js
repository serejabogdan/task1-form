import {put, takeEvery, call} from 'redux-saga/effects';
import {ASYNC_SET_TOKEN, ASYNC_SET_USER, asyncSetUser, setUser} from "./reducer";
import {getDataFromApi, getUserData} from '../../../utils/API';
import {setToken} from "./reducer";



function* setTokenWorker(action) {
    const {data} = yield call(getDataFromApi, action.payload);
    localStorage.setItem('token', JSON.stringify(data.accessToken));
    yield put(setToken(data.accessToken));
    yield put(asyncSetUser(data.accessToken));
}



function* setUserWorker(action) {
    const {data} = yield call(getUserData, action.payload);
    yield put(setUser(data));
}

export default function* () {
    yield takeEvery(ASYNC_SET_TOKEN, setTokenWorker);
    yield takeEvery(ASYNC_SET_USER, setUserWorker);
}
