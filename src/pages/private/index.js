// outsource dependencies
import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import User from './user';
import Users from './users';
import Homepage from './homepage';
import { selector as privateSelector } from './reducer';
import { selector as pagesSelector, TYPE } from '../reducer';
import { PRIVATE_HOMEPAGE, PRIVATE_USER, PRIVATE_USERS } from '../../constants/routes';

function Private () {
  const { user, auth } = useSelector(pagesSelector);
  const { initialized } = useSelector(privateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: TYPE.AUTH });
  }, [dispatch]);

  return initialized
    ? auth && <Switch>
      <Route
        path={PRIVATE_USERS}
        component={Users}
      />
      <Route
        path={PRIVATE_USER}
        render={() => <User user={user}/>}
      />
      <Route
        path={PRIVATE_HOMEPAGE}
        component={() => <Homepage user={user}/>}
      />
      <Redirect to={PRIVATE_USERS}/>
    </Switch>
    : <div>
      <Spinner color="primary" />
      private
    </div>;
}

export default Private;
