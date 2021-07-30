import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './PublicForm.css'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from "react-redux";

import { setToken } from '../../../redux/actions'

const PublicForm = ({setToken, token, ...props}) => {
    console.log(props)

    useEffect(() => {
        console.log(token)
    }, [token]);


    return (
        <div className="public-form">
            <h1>Public form</h1>
            <Form>
                <FormGroup>
                    <Label for="username">Email</Label>
                    <Input type="text" name="username" id="username" placeholder="Enter your name" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter password" />
                </FormGroup>

                <Button onClick={() => setToken('123')}>Go!</Button>
            </Form>
        </div>
    );
};

PublicForm.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        token: state.token
    }
}

const mapDispatchToProps = {
    setToken
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicForm);
