import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute ({ component: Component, isUserAuthed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthed ? <Component {...props} {...rest} /> : <Redirect to="/public/sign-in" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isUserAuthed: PropTypes.bool.isRequired
};
