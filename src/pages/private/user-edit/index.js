// outsource dependencies
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import { selector, TYPE } from './reducer';
import UserForm from '../../../components/user-form';

function UserEdit ({ match }) {
  const { user } = useSelector(selector);
  const dispatch = useDispatch();
  const handleSubmit = useCallback((value) => { console.log(value); }, []);

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE, payload: { userId: match?.params?.id } });
  }, [dispatch, match?.params?.id]);

  return <div className="content d-flex flex-column overflow-hidden vh-100">
    <header className="p-3 d-flex justify-content-between">
      <h2 className="text-info mb-0">User edit page</h2>
      <Col xs="4" className="text-right">
        <button type="button" className="btn btn-danger">Delete User</button>
      </Col>
    </header>
    <UserForm form="UserEdit" handleSubmit={handleSubmit} initialValues={user} />
    <div className="px-3 py-2 text-right">
      <button type="button" className="btn btn-success" onClick={() => dispatch(submit('UserEdit'))}>
        Save
      </button>
    </div>
  </div>;
}

UserEdit.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserEdit;
