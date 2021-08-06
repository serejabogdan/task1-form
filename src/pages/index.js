// outsource dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import Public from './public';
import Private from './private';
import { Spinner } from 'reactstrap';
import { PRIVATE, PUBLIC } from '../constants/routes';
import { APP_INITIALIZING, selector } from './reducer';

function Pages () {
  const { initialized, token } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: APP_INITIALIZING, payload: token });
    return () => {
      dispatch({ type: 'STOP_REFRESHING_TOKEN' });
    };
  }, [dispatch, token]);

  return <>
    { initialized
      ? <Switch>
        <Route path={PUBLIC} component={Public}/>
        <Route path={PRIVATE} component={Private}/>
        <Redirect to={PUBLIC}/>
      </Switch> : <div><Spinner color="primary" /> pages</div> }
  </>;
}

export default Pages;
