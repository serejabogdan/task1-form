import React from 'react';
import ReactDOM from 'react-dom';

import store, { history } from './redux';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';
import Pages from './pages';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Pages/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
