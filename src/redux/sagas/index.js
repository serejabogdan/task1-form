// import {put, takeEvery, call} from 'redux-saga/effects';
// import {ASYNC_SET_TOKEN} from "../types";
// import API from "../../utils/API";
// import {setToken} from "../actions";
//
// function getDataFromApi(payload) {
//     return API({
//         method: 'POST',
//         url: 'auth/token',
//         data: {...payload}
//     });
// }
//
// function* setTokenWorker(action) {
//     const {data} = yield call(getDataFromApi, action.payload);
//     localStorage.setItem('token', JSON.stringify(data.accessToken));
//     yield put(setToken(data.accessToken));
// }
//
// export default function* setTokenWatcher() {
//     yield takeEvery(ASYNC_SET_TOKEN, setTokenWorker);
// }