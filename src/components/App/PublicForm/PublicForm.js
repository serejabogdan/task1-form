import React from 'react';
import PropTypes from 'prop-types';

import './PublicForm.css'

import {Button, Form, FormGroup} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from "react-redux";

import {asyncSetToken, setToken} from '../../../redux/actions'
import {reduxForm, Field} from "redux-form";
import {email, maxLength15, required} from "../../../utils/formValidators";
import InputField from "../../common/InputField";

const PublicForm = (props) => {
    function submit(values) {
        console.log(values);
        props.asyncSetToken(values);
    }

    return (
        <div className="public-form">
            <h1>Public form</h1>
            <UserFormRedux onSubmit={submit}/>
        </div>
    );
};

const userForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FormGroup>
                <Field type="text" name="username" id="username" label="Username" component={InputField} validate={[required, email]}/>
            </FormGroup>
            <FormGroup>
                <Field type="password" name="password" id="password" label="Password" component={InputField} validate={[required, maxLength15]}/>
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
    asyncSetToken,
    setToken
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicForm);
