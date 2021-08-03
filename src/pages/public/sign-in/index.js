import React from 'react';
import PropTypes from 'prop-types';

import './sign-in.css';

import { Button, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect, useDispatch, useSelector } from 'react-redux';

import { reduxForm, Field } from 'redux-form';
import InputField from '../../../components/input-field';
import { asyncSetToken } from '../../reducer';

function PublicForm () {
  const { initialValues: { client } }
    = useSelector(state => state.pages.public.signin.login);
  const dispatch = useDispatch();

  function submit (values) {
    dispatch(asyncSetToken({ client, ...values }));
  }

  return (
    <div className="public-form">
      <h1>Public form</h1>
      <UserFormRedux onSubmit={submit}/>
    </div>
  );
}

function UserForm (props) {
  const { disabled } = useSelector(state => state.pages.public.signin.login);
  return (
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Field disabled={disabled} type="text" name="username" id="username" label="Username" component={InputField}/>
      </FormGroup>
      <FormGroup>
        <Field disabled={disabled} type="password" name="password" id="password" label="Password" component={InputField}/>
      </FormGroup>

      <Button disabled={disabled}>Go!</Button>
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
