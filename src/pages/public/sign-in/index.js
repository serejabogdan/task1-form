import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect, useDispatch, useSelector } from 'react-redux';

import { asyncSetToken, getClient } from './reducer';
import InputField from '../../../components/input-field';

function SignIn () {
  const client = useSelector(getClient());
  const dispatch = useDispatch();

  function submit (values) {
    const submitData = { client, ...values };
    dispatch(asyncSetToken(submitData));
  }

  return (
    <div style={{ minHeight: '100vh' }} className="d-flex flex-column justify-content-center align-items-center">
      <h1>Public form</h1>
      <UserFormRedux onSubmit={submit}/>
    </div>
  );
}

function UserForm (props) {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Field type="text" name="username" id="username" label="Username" component={InputField}/>
      <Field type="password" name="password" id="password" label="Password" component={InputField}/>
      <Button>Go!</Button>
    </Form>
  );
}

const UserFormRedux = reduxForm({ form: 'userForm' })(UserForm);

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default connect()(SignIn);
