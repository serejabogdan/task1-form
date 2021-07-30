import React from 'react';
import PropTypes from 'prop-types';

import './PublicForm.css'

import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from "react-redux";

import {setToken} from '../../../redux/actions'

const PublicForm = (props) => {

    return (
        <div className="public-form">
            <h1>Public form</h1>
            <Form>
                <FormGroup>
                    <Label for="username">Email</Label>
                    <Input type="text" name="username" id="username" placeholder="Enter your name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter password"/>
                </FormGroup>

                <Button>Go!</Button>
            </Form>
        </div>
    );
};

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
