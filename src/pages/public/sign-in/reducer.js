import {combineReducers} from "redux";

export const SET_TOKEN = "SET_TOKEN";
export const ASYNC_SET_TOKEN = 'ASYNC_SET_TOKEN';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_INITIALIZED = 'SET_INITIALIZED';

const loginInitialState = {
    initialized: false,
    errorMessage: 'Something wrong',
    disabled: false,
    initialValues: {
        client: "admin_application",
        password: "",
        username: "",
    }
};

function loginReducer(state = loginInitialState, action) {
    switch (action.type) {
        case SET_LOGIN:
            return {...state, initialValues: {...state.initialValues, username: action.username, password: action.password}};
        case SET_INITIALIZED:
            return {...state, initialized: action.payload}
        default:
            return state;
    }
}

const tokenInitialState = {
    accessToken: localStorage.getItem('token') || ''
};

function tokenReducer(state = tokenInitialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {token: action.payload};
        default:
            return state;
    }
}

export default combineReducers({
    login: loginReducer,
    token: tokenReducer
});

export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export function asyncSetToken(data) {
    return {
        type: ASYNC_SET_TOKEN,
        payload: data
    }
}

export function setInitialized(flag) {
    return {
        type: SET_INITIALIZED,
        payload: flag
    }
}