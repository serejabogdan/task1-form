import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from '../../utils/private-route';
import User from './user';
import Homepage from './homepage';

function Private () {
  const { user } = useSelector(state => state.root.pagesInitialize);
  return (
    <Switch>
      <PrivateRoute path="/private/user" isUserAuthed={!!user} user={user} component={User}/>
      <PrivateRoute path="/private/homepage" isUserAuthed={!!user} user={user} component={Homepage}/>
    </Switch>
  );
}

export default Private;
