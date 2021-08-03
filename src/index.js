import React from 'react';
import ReactDOM from 'react-dom';

import store from './redux'
import {Provider} from "react-redux";

import {Redirect, Route, Switch} from "react-router-dom";

import PublicForm from "./pages/public/sign-in";
import User from "./pages/private/user";
import {ConnectedRouter} from "connected-react-router";

import {history} from "./redux";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/' component={PublicForm}/>
                <Route path='/user' component={User}/>
                <Redirect to='/'/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
