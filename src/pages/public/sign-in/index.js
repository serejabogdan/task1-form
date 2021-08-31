// outsource dependencies
import React from 'react';
import { Field } from 'redux-form';
import { Button, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import { selector, TYPE } from './reducer';
import { ReduxForm } from '../../../utils/redux-form';
import InputField from '../../../components/input-field';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

function formValidation (values) {
  const errors = {};
  const isEmailRegEx = (value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const MAX_CHARACTERS = 30;

  if (!values.username) {
    errors.username = 'Email must be required';
  } else if (values.username.length > MAX_CHARACTERS) {
    errors.username = `Maximum ${MAX_CHARACTERS} characters`;
  } else if (isEmailRegEx(values.username)) {
    errors.username = 'It is not an email';
  }

  if (!values.password) {
    errors.password = 'Password must be required';
  } else if (values.password.length > MAX_CHARACTERS) {
    errors.password = `Maximum ${MAX_CHARACTERS} characters`;
  }

  return errors;
}

function SignIn () {
  const signIn = useSelector(selector);
  const dispatch = useDispatch();

  function submit (values) {
    dispatch({ type: TYPE.SIGN_IN, payload: values });
  }
  return <div style={{ minHeight: '100vh' }} className="d-flex flex-column justify-content-center align-items-center">
    <h1>Public form</h1>
    <ReduxForm form="SignInForm" onSubmit={submit} validate={formValidation} initialValues={signIn.initialValues}>
      <Field type="text" disabled={signIn.disabled} name="username" id="username" label="Email Address" component={InputField}/>
      <Field type="password" disabled={signIn.disabled} name="password" id="password" label="Password" component={InputField}/>
      <Button disabled={signIn.disabled}>Go!</Button>
    </ReduxForm>
    { signIn.disabled && <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner color="primary" />
    </div> }
  </div>;
}

export default SignIn;
