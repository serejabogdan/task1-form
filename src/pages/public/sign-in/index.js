import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './sign-in.css';

import {Button, Form, FormGroup} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useDispatch, useSelector} from "react-redux";

import {asyncSetToken} from './reducer';
import {reduxForm, Field} from "redux-form";
import InputField from "../../../components/input-field";

export default function PublicForm(props) {
    const {accessToken} = useSelector(state => state.pages.signin.token);
    const {
        initialized,
        errorMessage,
        disabled,
        initialValues: {client, password, username}
    } = useSelector(state => state.pages.signin.login);
    const dispatch = useDispatch();

    function submit(values) {
        dispatch(asyncSetToken({client, ...values}));
    }

    /*useEffect(() => {
        setTimeout(() => setInitialized(true), 5000)
        return () => {

        };
    }, []);*/


    return (
        <div className="public-form">
            <h1>Public form</h1>
            <UserFormRedux onSubmit={submit}/>
        </div>
    );
};

function UserForm(props) {
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

const UserFormRedux = reduxForm({form: 'userForm'})(UserForm);

PublicForm.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func
};