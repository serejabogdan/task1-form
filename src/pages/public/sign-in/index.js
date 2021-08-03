import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './sign-in.css';

import { Button, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect, useDispatch, useSelector } from 'react-redux';

import { reduxForm, Field } from 'redux-form';
import InputField from '../../../components/input-field';
import { asyncSetToken, asyncSetUser } from '../../reducer';

function PublicForm (props) {
  const {
    initialized,
    errorMessage,
    disabled,
    initialValues: { client }
  } = useSelector(state => state.pages.public.signin.login);
  const dispatch = useDispatch();

  function submit (values) {
    dispatch(asyncSetToken({ client, ...values }));
  }

  useEffect(() => {
  }, []);


  return (
    <div className="public-form">
      <h1>Public form</h1>
      <UserFormRedux onSubmit={submit}/>
    </div>
  );
}

function UserForm (props) {
  return (
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Field type="text" name="username" id="username" label="Username" component={InputField}/>
      </FormGroup>
      <FormGroup>
        <Field type="password" name="password" id="password" label="Password" component={InputField}/>
      </FormGroup>

      <Button>Go!</Button>
    </Form>
  );
}

const UserFormRedux = reduxForm({ form: 'userForm' })(UserForm);

UserForm.defaultProps = {
  handleSubmit: () => {}
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default connect()(PublicForm);
