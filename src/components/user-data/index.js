import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

function UserData ({ user }) {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <ListGroup>
        <ListGroupItem>id: { user.id }</ListGroupItem>
        <ListGroupItem>name: { user.name }</ListGroupItem>
        <ListGroupItem><img src={user.coverImage.url} alt=""/></ListGroupItem>
      </ListGroup>
    </div>
  );
}

UserData.defaultProps = {
  user: {
    id: 0,
    name: '',
    coverImage: ''
  }
};

UserData.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coverImage: PropTypes.shape({
      url: PropTypes.string
    })
  })
};

export default UserData;
