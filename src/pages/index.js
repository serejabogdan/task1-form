import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Public from './public';
import Private from './private';
import Preloader from '../components/preloader';
import { APP_INITIALIZING, getAccessToken, getPagesData } from './reducer';

function Pages () {
  const { initialized } = useSelector(getPagesData());
  const accessToken = useSelector(getAccessToken());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: APP_INITIALIZING, payload: accessToken });
  }, [accessToken, dispatch]);

  return (
    <>
      { initialized
        ? <Switch>
          <Route path="/public" component={Public}/>
          <Route path="/private" component={Private}/>
          <Redirect to="/public"/>
        </Switch> : <div><Preloader/> pages</div> }
    </>
  );
}

export default Pages;
