import React from 'react';
import ReactDOM from 'react-dom';

import store from './redux'
import {Provider} from "react-redux";

import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import PublicForm from "./pages/public/sign-in";
import User from "./pages/private/user";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/' component={PublicForm}/>
                <Route path='/user' component={User}/>
                <Redirect to='/'/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
