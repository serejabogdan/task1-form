import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './sign-in.css';

import {Button, Form, FormGroup} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from "react-redux";

import {asyncSetToken, setToken} from './reducer';
import {reduxForm, Field} from "redux-form";
// import {email, maxLength15, required} from "../../../utils/form-validators";
import InputField from "../../../components/input-field";

const PublicForm = (props) => {
    // const {login, token} = useSelector(state => state.pagesReducer.signInReducer);
    // const dispatch = useDispatch();
    const {asyncSetToken, client, initialized} = props;
    function submit(values) {
        asyncSetToken({client, ...values});
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

const UserForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FormGroup>
                <Field type="text" name="username" id="username" label="Username" component={InputField} />
            </FormGroup>
            <FormGroup>
                <Field type="password" name="password" id="password" label="Password" component={InputField} />
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

const mapStateToProps = (state) => {
    const {login, token} = state.pages.signin;
    return {
        initialized: state.pages.signin.initialized,
        token: token.accessToken,
        client: login.initialValues.client
    };
}

const mapDispatchToProps = {
    asyncSetToken,
    setToken
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicForm);
