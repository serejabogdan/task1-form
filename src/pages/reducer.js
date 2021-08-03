import publicReducers from './public/reducer';
import {combineReducers} from "redux";

export const SET_TOKEN = "SET_TOKEN";

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

export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token
    };
}

export default combineReducers({
    public: publicReducers,
    token: tokenReducer
});