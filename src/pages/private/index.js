// outsource dependencies
import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import User from './user';
import Homepage from './homepage';
import { selector as pagesSelector, TYPE } from '../reducer';
import { selector as privateSelector } from './reducer';
import { PRIVATE_HOMEPAGE, PRIVATE_USER } from '../../constants/routes';

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
        path={PRIVATE_USER}
        render={() => <User user={user}/>}
      />
      <Route
        path={PRIVATE_HOMEPAGE}
        component={() => <Homepage user={user}/>}
      />
    </Switch>
    : <div>
      <Spinner color="primary" />
      private
    </div>;
}

export default Private;
