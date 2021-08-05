import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SignUp from './sign-up';
import PublicForm from './sign-in';
import { PUBLIC_SIGN_IN } from '../../utils/constants';

function Public () {
  return (
    <Switch>
      <Route path={PUBLIC_SIGN_IN} component={PublicForm}/>
      <Route path={PUBLIC_SIGN_IN} component={SignUp}/>
      <Redirect to={PUBLIC_SIGN_IN}/>
    </Switch>
  );
}

export default Public;
