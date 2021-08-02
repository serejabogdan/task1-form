import React from 'react';
import PropTypes from 'prop-types';

import './PublicForm.css'

import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from "react-redux";

import {setToken} from '../../../redux/actions'
import {reduxForm, Field} from "redux-form";

const PublicForm = (props) => {
    function submit(values) {
        console.log(values)
    }

    return (
        <div className="public-form">
            <h1>Public form</h1>
            <UserFormRedux onSubmit={submit}/>
        </div>
    );
};

function InputField ({input, type, id, label, meta: {touched, warning, error}, ...props}) {
    const hasError = touched && ((error && <span>{error}</span>) || warning && <span>{warning}</span>);
    return (
        <div>
            <Label for={id}>{label}</Label>
            <Input id={id} placeholder={label} {...input}/>
            {hasError}
        </div>
    );
}

const userForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FormGroup>
                <Field type="text" name="username" id="username" label="Username" component={InputField}/>
            </FormGroup>
            <FormGroup>
                <Field type="password" name="password" id="password" label="Password" component={InputField}/>

                {/*<Input type="password" name="password" id="password" placeholder="Enter password"/>*/}
            </FormGroup>

            <Button>Go!</Button>
        </Form>
    );
}

const UserFormRedux = reduxForm({form: 'userForm'})(userForm);

PublicForm.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = {
    setToken
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicForm);
