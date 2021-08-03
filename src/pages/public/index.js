import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicForm from './sign-in';
import SignUp from './sign-up';

function Public () {
  return (
    <Switch>
      <Route path="/public/sign-in" component={PublicForm}/>
      <Route path="/public/sign-up" component={SignUp}/>
    </Switch>
  );
}

export default Public;
