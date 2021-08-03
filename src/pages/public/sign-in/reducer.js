import {combineReducers} from "redux";

export const ASYNC_SET_TOKEN = 'ASYNC_SET_TOKEN';
export const SET_USER = 'SET_USER';
export const ASYNC_SET_USER = 'ASYNC_SET_USER';
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
            return {
                ...state,
                initialValues: {...state.initialValues, username: action.username, password: action.password}
            };
        case SET_INITIALIZED:
            return {...state, initialized: action.payload}
        default:
            return state;
    }
}

export default combineReducers({
    login: loginReducer
});

export function asyncSetToken(data) {
    return {
        type: ASYNC_SET_TOKEN,
        payload: data
    }
}

export function setUser(data) {
    return {
        type: SET_USER,
        payload: data
    }
}

export function asyncSetUser(data) {
    return {
        type: ASYNC_SET_USER,
        payload: data
    }
}

export function setInitialized(flag) {
    return {
        type: SET_INITIALIZED,
        payload: flag
    }
}