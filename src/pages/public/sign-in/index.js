// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';

// local dependencies
import { selector, SAGA_SET_TOKEN } from './reducer';
import InputField from '../../../components/input-field';
import { compose } from 'redux';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

function SignIn (props) {
  const signIn = useSelector(selector);
  const dispatch = useDispatch();

  function submit (values) {
    dispatch({ type: SAGA_SET_TOKEN, payload: { client: signIn.initialValues.client, ...values } });
  }

  return <div style={{ minHeight: '100vh' }} className="d-flex flex-column justify-content-center align-items-center">
    <h1>Public form</h1>
    <Form onSubmit={props.handleSubmit(submit)}>
      <Field type="text" name="username" id="username" component={InputField}/>
      <Field type="password" name="password" id="password" component={InputField}/>
      <Button>Go!</Button>
    </Form>
  </div>;
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default compose(connect(), reduxForm({ form: 'userForm' }))(SignIn);
