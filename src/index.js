// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { ConnectedRouter } from 'connected-react-router';

// local dependencies
import Pages from './pages';
import store, { history } from './redux';

// styles
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <ReduxToastr
          progressBar
          timeOut={1000}
          preventDuplicates
          closeOnToastrClick
          position="top-left"
          newestOnTop={false}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          getState={(state) => state.toastr}
        />
        <Pages/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
