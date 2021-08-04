import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PublicForm from './sign-in';
import SignUp from './sign-up';

function Public () {
  return (
    <Switch>
      <Route path="/public/sign-in" component={PublicForm}/>
      <Route path="/public/sign-up" component={SignUp}/>
      <Route exact path="/public" render={() => <Redirect to="/public/sign-in"/>}/>
    </Switch>
  );
}

export default Public;
