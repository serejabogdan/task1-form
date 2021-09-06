// outsource dependencies
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';

// local dependencies
import pagesReducer from '../../pages/reducer';

export function selector (state) {
  return state.root;
}

export default function rootReducer (history) {
  return combineReducers({
    form: reduxForm,
    root: pagesReducer,
    toastr: toastrReducer,
    router: connectRouter(history)
  });
}
