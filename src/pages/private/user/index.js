import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetUser } from '../../reducer';

export default function User (props) {
  const { user } = useSelector(state => state.pages.pages);
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
      <div>{ user.clinicRole }</div>
    </div>
  );
}
