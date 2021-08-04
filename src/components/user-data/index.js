import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

function UserData ({ user }) {
  const { id, name, coverImage } = user;
  const { url } = coverImage;
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <ListGroup>
        <ListGroupItem>id: { id }</ListGroupItem>
        <ListGroupItem>name: { name }</ListGroupItem>
        <ListGroupItem><img src={url} alt=""/></ListGroupItem>
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
    id: PropTypes.number,
    name: PropTypes.string,
    coverImage: PropTypes.shape({
      url: PropTypes.string
    })
  })
};

export default UserData;
