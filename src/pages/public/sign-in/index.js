// outsource dependencies
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Button, Form, Spinner } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';

// local dependencies
import { selector, SAGA_SET_TOKEN } from './reducer';
import InputField from '../../../components/input-field';

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
      <Field type="text" disabled={signIn.disabled} name="username" id="username" component={InputField}/>
      <Field type="password" disabled={signIn.disabled} name="password" id="password" component={InputField}/>
      <Button disabled={signIn.disabled}>Go!</Button>
    </Form>
    { signIn.disabled && <div><Spinner color="primary" /> authorization</div> }
  </div>;
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default compose(connect(), reduxForm({ form: 'userForm' }))(SignIn);
