import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer(history), compose(applyMiddleware(sagaMiddleWare, routerMiddleware(history))));

sagaMiddleWare.run(rootSaga);

export default store;
