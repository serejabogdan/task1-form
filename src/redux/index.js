import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./reducer";
import createSagaMiddleware from 'redux-saga';
import pagesSaga from "../pages/saga";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(pagesSaga);

export default store;