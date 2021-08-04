import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Public from './public';
import Private from './private';
import { useDispatch, useSelector } from 'react-redux';
import { appInitializing } from './reducer';
import Preloader from '../components/preloader';

function Pages () {
  const { initialized } = useSelector(state => state.root.pagesInitialize);
  const { accessToken } = useSelector(state => state.root.pages.public.signin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appInitializing(accessToken));
  }, [accessToken, dispatch]);

  return (
    <>
      { initialized
        ? <Switch>
          <Route path="/public" component={Public}/>
          <Route path="/private" component={Private}/>
          <Route exact path="/" render={() => <Redirect to="/public"/>}/>
        </Switch> : <Preloader/> }
    </>
  );
}

export default Pages;
