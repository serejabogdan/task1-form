// outsource dependencies
import { Spinner } from 'reactstrap';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import Users from './users';
import Homepage from './homepage';
import UserEdit from './user-edit';
import Navigation from '../../components/navigation';
import { selector as privateSelector } from './reducer';
import { selector as pagesSelector, TYPE } from '../reducer';
import { HOMEPAGE, NEW_USER, USERS, USERS_EDIT } from '../../constants/routes';

function Private () {
  const { auth } = useSelector(pagesSelector);
  const { initialized } = useSelector(privateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: TYPE.AUTH });
  }, [dispatch]);

  return initialized
    ? auth && <>
      <Navigation />
      <Switch>
        <Route
          exact
          path={USERS.route}
          component={Users}
        />
        <Route exact
          path={NEW_USER.route}
          component={UserEdit}
        />
        <Route exact
          path={USERS_EDIT.route}
          component={UserEdit}
        />
        <Route
          path={HOMEPAGE.route}
          component={Homepage}
        />
      </Switch>
    </>
    : <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner color="primary" />
    </div>;
}

export default Private;
