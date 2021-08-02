import {SET_TOKEN} from "../types";

const initialState = {
    token: ''
};

export default function tokenReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case SET_TOKEN:
            return {token: action.payload};
        default:
            return state;
    }
}
