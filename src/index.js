import React from 'react';
import ReactDOM from 'react-dom';

import store, { history } from './redux';
import { Provider, useSelector } from 'react-redux';

import { Redirect, Route, Switch } from 'react-router-dom';

import PublicForm from './pages/public/sign-in';
import User from './pages/private/user';
import { ConnectedRouter } from 'connected-react-router';

import PrivateRoute from './utils/private-route';

function App (props) {
  const { user } = useSelector(state => state.pages.pages);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={PublicForm}/>
        <PrivateRoute path="/user" isUserAuthed={user} component={User}/>
        <Redirect to="/"/>
      </Switch>
    </ConnectedRouter>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
