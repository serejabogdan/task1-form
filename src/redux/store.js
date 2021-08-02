import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from 'redux-saga';
import setTokenWatcher from "./sagas/setToken";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(setTokenWatcher);

export default store;