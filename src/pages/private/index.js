// outsource dependencies
import { Spinner } from 'reactstrap';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import User from './user';
import Users from './users';
import Homepage from './homepage';
import UserEdit from './user-edit';
import Navigation from '../../components/navigation';
import { selector as privateSelector } from './reducer';
import { selector as pagesSelector, TYPE } from '../reducer';
import { PRIVATE_HOMEPAGE, PRIVATE_USER, PRIVATE_USERS, PRIVATE_USERS_EDIT, PRIVATE_USERS_NEW } from '../../constants/routes';

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
          path={PRIVATE_USERS}
          component={Users}
        />
        <Route exact
          path={PRIVATE_USERS_NEW}
          component={UserEdit}
        />
        <Route exact
          path={PRIVATE_USERS_EDIT}
          component={UserEdit}
        />
        <Route
          path={PRIVATE_USER}
          component={User}
        />
        <Route
          path={PRIVATE_HOMEPAGE}
          component={Homepage}
        />
      </Switch>
    </>
    : <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner color="primary" />
    </div>;
}

export default Private;
