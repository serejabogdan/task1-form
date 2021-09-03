// outsource dependencies
import { combineReducers } from 'redux';

// local dependencies
import usersReducer from './users/reducer';
import userEditReducer from './user-edit/reducer';

export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    LOGOUT: `${prefix}LOGOUT`,
    VALID_TOKEN: `${prefix}VALID_TOKEN`,
  };
})('@private/');

const initial = {
  disabled: false,
  errorMessage: '',
  initialized: false,

};

function privateReducer (state= initial, action) {
  const { type, payload } = action;
  switch (type) {
    case TYPE.META: return { ...state, ...payload };
    case TYPE.CLEAR: return initial;
    default: return state;
  }
}

export function selector (state) {
  return state.root.pages.private.state;
}

export default combineReducers({
  users: usersReducer,
  state: privateReducer,
  userEdit: userEditReducer
});
