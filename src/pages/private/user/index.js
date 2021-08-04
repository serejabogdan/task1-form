import React from 'react';
import PropTypes from 'prop-types';
import UserData from '../../../components/user-data';

export default function User ({ user }) {
  return (
    <UserData user={user}/>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired
};
