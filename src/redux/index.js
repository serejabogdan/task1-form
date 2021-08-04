import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';

import rootSaga from './sagas';
import rootReducer from './reducer';

export const history = createBrowserHistory();

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer(history), compose(applyMiddleware(sagaMiddleWare, routerMiddleware(history))));

sagaMiddleWare.run(rootSaga);

export default store;
