import { combineReducers } from 'redux'
import tokenReducer from "./tokenReducer";

import {reducer as formReducer} from 'redux-form'

export default combineReducers({
    token: tokenReducer,
    form: formReducer
});
