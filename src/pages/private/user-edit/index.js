// outsource dependencies
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo } from 'react';

// local dependencies
import { selector, TYPE } from './reducer';
import UserForm from '../../../components/user-form';

function UserEdit ({ match }) {
  const userId = useMemo(() => match?.params?.id, [match?.params?.id]);
  const { user, disabled } = useSelector(selector);
  const dispatch = useDispatch();
  const handleEditUserSubmit = useCallback((value) => dispatch({
    type: TYPE.EDIT_USER,
    payload: value
  }), [dispatch]);
  const handleCreateUserSubmit = useCallback((value) => dispatch({
    type: TYPE.CREATE_USER,
    payload: value
  }), [dispatch]);

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE, payload: { userId } });
  }, [dispatch, userId]);

  return <div className="content d-flex flex-column vh-100">
    <header className="p-3 d-flex justify-content-between">
      <h2 className="text-info mb-0">User edit page</h2>
      <Col xs="4" className="text-right">
        <button disabled={disabled} type="button" className="btn btn-danger">Delete User</button>
      </Col>
    </header>
    <UserForm
      form="UserEdit"
      isUserId={!!userId}
      disabled={disabled}
      initialValues={user}
      handleSubmit={userId ? handleEditUserSubmit : handleCreateUserSubmit}
    />
    <div className="px-3 py-2 text-right">
      <button disabled={disabled} type="button" className="btn btn-success" onClick={() => dispatch(submit('UserEdit'))}>
        Save
      </button>
    </div>
  </div>;
}

UserEdit.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserEdit;
