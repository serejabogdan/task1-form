import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from 'redux-saga'

const store = createStore(rootReducer, applyMiddleware(createSagaMiddleware()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;