import React from 'react';
import PropTypes from 'prop-types';

export default function User ({ user }) {
  return (
    <div>
      <div>{ user.id }</div>
      <div>{ user.name }</div>
    </div>
  );
}

User.defaultProps = {
  user: {}
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
};
