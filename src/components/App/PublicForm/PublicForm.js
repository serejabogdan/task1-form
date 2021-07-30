import React from 'react';
import PropTypes, {func} from 'prop-types';

import './PublicForm.css'

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {logDOM} from "@testing-library/react";

const PublicForm = props => {
    /*function test() {


        const user = {
            client: "admin_application",
            password: "#=!!4966",
            name: "admin@example.com",
        }
        const URL = 'https://healthene-gateway-dev.intelliceed.cf:443/api/auth/token';
        axios.get(URL, {
            params: {
                ...user
            },
            headers: {'Authrorization': 'Basic TOKEN'}
        })
            .then((res) => console.log(res));
        axios({
            method: 'post',
            url: URL,
            user,
            headers: {'Authrorization': 'Basic TOKEN'}
        }).then((res) => console.log(res));
    }*/

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

                <Button>Go!</Button>
            </Form>
        </div>
    );
};

PublicForm.propTypes = {

};

export default PublicForm;
