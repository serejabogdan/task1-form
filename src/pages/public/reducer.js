import signInReducer from './sign-in/reducer';
import signUpReducer from './sign-up/reducer';
import {combineReducers} from "redux";

export default combineReducers({
    signin: signInReducer,
    signup: signUpReducer
});
