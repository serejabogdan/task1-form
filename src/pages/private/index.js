import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import User from './user';
import Homepage from './homepage';
import PrivateRoute from '../../utils/private-route';
import { getPagesData } from '../reducer';
import { getPrivateState } from './reducer';
import Preloader from '../../components/preloader';

function Private () {
  const privateState = useSelector(getPrivateState());
  const { user } = useSelector(getPagesData());

  return <>
    {
      privateState.initialized ? <Switch>
        <PrivateRoute path="/private/user" isUserAuthed={!!user} user={user} component={User}/>
        <PrivateRoute path="/private/homepage" isUserAuthed={!!user} user={user} component={Homepage}/>
      </Switch> : <div><Preloader/> private</div>
    }
  </>;
}

export default Private;
