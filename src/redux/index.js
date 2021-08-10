// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

// local dependencies
import rootSaga from './sagas';
import rootReducer from './reducer';

export const history = createBrowserHistory();

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleWare,
      routerMiddleware(history)
    )
  )
);

sagaMiddleWare.run(rootSaga);

export default store;
