// outsource dependencies
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

// local dependencies
import { TYPE } from '../reducer';
import { selector } from '../../reducer';

function User () {
  const dispatch = useDispatch();
  const state = useSelector(selector);

  const user = useMemo(() => {
    if (state.user instanceof Object) {
      const coverImage = state.user.coverImage instanceof Object
        ? state.user.coverImage : {};
      return { ...state.user, coverImage };
    }
    return {};
  }, [state.user]);

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

export default User;
