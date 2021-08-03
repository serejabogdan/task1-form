import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetUser } from '../../reducer';

export default function User () {
  const { user } = useSelector(state => state.pages.publicPages);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(asyncSetUser(token));
    }
  }, [dispatch]);

  return (
    <div>
      <div>{ user.id }</div>
      <div>{ user.name }</div>
    </div>
  );
}
