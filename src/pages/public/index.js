import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SignUp from './sign-up';
import PublicForm from './sign-in';

function Public () {
  return (
    <Switch>
      <Route path="/public/sign-in" component={PublicForm}/>
      <Route path="/public/sign-up" component={SignUp}/>
      <Redirect to="/public/sign-in"/>
    </Switch>
  );
}

export default Public;
