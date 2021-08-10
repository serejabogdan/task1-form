// outsource dependencies
import { combineReducers } from 'redux';

// local dependencies
import signInReducer from './sign-in/reducer';
import signUpReducer from './sign-up/reducer';

export default combineReducers({
  signin: signInReducer,
  signup: signUpReducer
});
