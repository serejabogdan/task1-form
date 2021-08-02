import {SET_LOGIN} from "../types";

const initialState = {
    client: "admin_application",
    password: "",
    username: "",
};

export default function tokenReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case SET_LOGIN:
            return {...state, username: action.username, password: action.password};
        default:
            return state;
    }
}
