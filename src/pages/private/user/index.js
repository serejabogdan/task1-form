// outsource dependencies
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

// local dependencies
import { TYPE } from '../reducer';
import { selector } from '../../reducer';

function User () {
  const dispatch = useDispatch();
  const { user } = useSelector(selector);

  const { id, name, coverImage } = useMemo(() => {
    if (user instanceof Object) {
      const coverImage = user.coverImage instanceof Object
        ? user.coverImage : {};
      return { ...user, coverImage };
    }
    return {};
  }, [user]);

  function logOut () {
    dispatch({ type: TYPE.LOGOUT });
  }

  return <div style={{ maxWidth: '700px', margin: '0 auto' }}>
    <ListGroup>
      <ListGroupItem>id: { id }</ListGroupItem>
      <ListGroupItem>name: { name }</ListGroupItem>
      <ListGroupItem>
        <img src={coverImage.url} alt="Here is should be user"/>
      </ListGroupItem>
    </ListGroup>
    <Button color="primary" onClick={logOut}>
      LogOut
    </Button>
  </div>;
}

export default User;
