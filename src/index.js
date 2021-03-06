// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

// local dependencies
import Pages from './pages';
import store, { history } from './redux';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Pages/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
