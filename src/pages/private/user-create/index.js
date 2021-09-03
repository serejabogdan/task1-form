// outsource dependencies
import { Col } from 'reactstrap';
import { submit } from 'redux-form';
import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';

// local dependencies
import { TYPE } from './reducer';
import UserForm from '../../../components/user-form';

function UserCreate () {
  const dispatch = useDispatch();
  const handleSubmit = useCallback((value) => dispatch({
    type: TYPE.CREATE_USER,
    payload: value
  }), [dispatch]);

  return <div className="content d-flex flex-column overflow-hidden vh-100">
    <header className="p-3 d-flex justify-content-between">
      <h2 className="text-info mb-0">User edit page</h2>
      <Col xs="4" className="text-right">
        <button type="button" className="btn btn-danger">Delete User</button>
      </Col>
    </header>
    <UserForm form="CreateUser" handleSubmit={handleSubmit} isUserCreationForm />
    <div className="px-3 py-2 text-right">
      <button type="button" className="btn btn-success" onClick={() => dispatch(submit('CreateUser'))}>
        Save
      </button>
    </div>
  </div>;
}

export default UserCreate;
