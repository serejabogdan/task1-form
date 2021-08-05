// outsource dependencies
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { connectRouter } from 'connected-react-router';

// local dependencies
import pagesReducer from '../../pages/reducer';

export function selector (state) {
  return state.root;
}

export default function rootReducer (history) {
  return combineReducers({
    root: pagesReducer,
    form: reduxForm,
    router: connectRouter(history)
  });
}
