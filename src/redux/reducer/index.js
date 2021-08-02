import pagesReducer from '../../pages/reducer';
import {reduxForm} from "redux-form";
import {combineReducers} from "redux";

export default combineReducers({
    pages: pagesReducer,
    form: reduxForm
});