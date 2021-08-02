import {fork} from 'redux-saga/effects'
import publicSaga from "./public/saga";

export default function* pagesSaga() {
    yield fork(publicSaga);
}