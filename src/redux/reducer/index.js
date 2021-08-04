import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { connectRouter } from 'connected-react-router';

import pagesReducer from '../../pages/reducer';

export default function rootReducer (history) {
  return combineReducers({
    root: pagesReducer,
    form: reduxForm,
    router: connectRouter(history)
  });
}
