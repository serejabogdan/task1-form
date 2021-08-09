// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

// local dependencies
import { TYPE } from '../reducer';

function User ({ user }) {
  const dispatch = useDispatch();

  function logOut () {
    dispatch({ type: TYPE.LOGOUT });
  }

  return <div style={{ maxWidth: '700px', margin: '0 auto' }}>
    <ListGroup>
      <ListGroupItem>id: { user.id }</ListGroupItem>
      <ListGroupItem>name: { user.name }</ListGroupItem>
      <ListGroupItem>
        <img src={user.coverImage.url} alt="Here is should be user"/>
      </ListGroupItem>
    </ListGroup>
    <Button color="primary" onClick={logOut}>
      LogOut
    </Button>
  </div>;
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coverImage: PropTypes.shape({
      url: PropTypes.string
    })
  }).isRequired
};

export default User;
