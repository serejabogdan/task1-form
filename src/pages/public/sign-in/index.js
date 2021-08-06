// outsource dependencies
import React from 'react';
import { Button, Spinner } from 'reactstrap';
import { Field } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import { selector, SAGA_SET_TOKEN } from './reducer';
import InputField from '../../../components/input-field';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReduxForm } from '../../../utils/redux-form';

function SignIn () {
  const signIn = useSelector(selector);
  const dispatch = useDispatch();

  function submit (values) {
    dispatch({ type: SAGA_SET_TOKEN, payload: { client: signIn.initialValues.client, ...values } });
  }
  return <div style={{ minHeight: '100vh' }} className="d-flex flex-column justify-content-center align-items-center">
    <h1>Public form</h1>
    <ReduxForm form="SignInForm" onSubmit={submit}>
      <Field type="text" disabled={signIn.disabled} name="username" id="username" component={InputField}/>
      <Field type="password" disabled={signIn.disabled} name="password" id="password" component={InputField}/>
      <Button disabled={signIn.disabled}>Go!</Button>
    </ReduxForm>
    { signIn.disabled && <div><Spinner color="primary" /> authorization</div> }
  </div>;
}

export default SignIn;
