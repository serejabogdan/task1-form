import pagesReducer from '../../pages/reducer';
import {reducer as reduxForm} from "redux-form";
import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

export default function rootReducer(history) {
    return combineReducers({
        pages: pagesReducer,
        form: reduxForm,
        router: connectRouter(history)
    });
}