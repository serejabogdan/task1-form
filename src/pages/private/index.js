// outsource dependencies
import React from 'react';
import { Spinner } from 'reactstrap';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// local dependencies
import User from './user';
import Homepage from './homepage';
import PrivateRoute from '../../utils/private-route';
import { selector as pagesSelector } from '../reducer';
import { selector as privateSelector } from './reducer';
import { PRIVATE_HOMEPAGE, PRIVATE_USER } from '../../constants/routes';

function Private () {
  const { user } = useSelector(pagesSelector);
  const { initialized } = useSelector(privateSelector);

  return initialized
    ? <Switch>
      <PrivateRoute
        path={PRIVATE_USER}
        isUserAuthed={!!user}
        user={user}
        component={User}/>
      <PrivateRoute
        path={PRIVATE_HOMEPAGE}
        isUserAuthed={!!user}
        user={user}
        component={Homepage}/>
    </Switch> : <div><Spinner color="primary" /> private</div>;
}

export default Private;
