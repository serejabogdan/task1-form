// outsource dependencies
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import SignUp from './sign-up';
import SignIn from './sign-in';
import { SIGN_IN, SIGN_UP } from '../../constants/routes';

function Public () {
  return <Switch>
    <Route path={SIGN_IN.route} component={SignIn}/>
    <Route path={SIGN_UP.route} component={SignUp}/>
    <Redirect to={SIGN_IN.route} />
  </Switch>;
}

export default Public;
