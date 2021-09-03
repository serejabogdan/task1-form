// outsource dependencies
import { Spinner } from 'reactstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import Public from './public';
import Private from './private';
import { selector, TYPE } from './reducer';
import { PRIVATE, PUBLIC } from '../constants/routes';

function Pages () {
  const { initialized, token } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE, payload: token });
  }, [dispatch, token]);
  return initialized
    ? <Switch>
      <Route path={PUBLIC} component={Public}/>
      <Route path={PRIVATE} component={Private}/>
      <Redirect to={PUBLIC}/>
    </Switch>
    : <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner color="primary" />
    </div>;
}

export default Pages;
