import pagesReducer from '../../pages/reducer';
import {reducer as reduxForm} from "redux-form";
import {combineReducers} from "redux";

export default combineReducers({
    pages: pagesReducer,
    form: reduxForm
});