// outsource dependencies
import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// local dependencies
import User from './user';
import Homepage from './homepage';
import { Spinner } from 'reactstrap';
import { selector } from '../../redux/reducer';
import PrivateRoute from '../../utils/private-route';
import { PRIVATE_HOMEPAGE, PRIVATE_USER } from '../../constants/routes';

function Private () {
  const root = useSelector(selector);

  return <>
    {
      root.pages.private.initialized ? <Switch>
        <PrivateRoute path={PRIVATE_USER} isUserAuthed={!!root.pagesData.user}
          user={root.pagesData.user} component={User}/>
        <PrivateRoute path={PRIVATE_HOMEPAGE} isUserAuthed={!!root.pagesData.user}
          user={root.pagesData.user} component={Homepage}/>
      </Switch> : <div><Spinner color="primary" /> private</div>
    }
  </>;
}

export default Private;
