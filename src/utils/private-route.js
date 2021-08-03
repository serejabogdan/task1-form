import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute ({ component: Component, isUserAuthed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthed ? <Component {...props} /> : <Redirect to="/public/sign-in" />
      }
    />
  );
}

PrivateRoute.defaultProps = {
  component: () => {},
  isUserAuthed: false
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isUserAuthed: PropTypes.bool
};
