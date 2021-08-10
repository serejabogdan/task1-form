// outsource dependencies
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import SignUp from './sign-up';
import SignIn from './sign-in';
import { PUBLIC_SIGN_IN, PUBLIC_SIGN_UP } from '../../constants/routes';

function Public () {
  return <Switch>
    <Route path={PUBLIC_SIGN_IN} component={SignIn}/>
    <Route path={PUBLIC_SIGN_UP} component={SignUp}/>
    <Redirect to={PUBLIC_SIGN_IN}/>
  </Switch>;
}

export default Public;
