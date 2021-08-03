import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Public from './public';
import Private from './private';

function Pages () {
  return (
    <Switch>
      <Route path="/public" component={Public}/>
      <Route path="/private" component={Private}/>
    </Switch>
  );
}

export default Pages;
