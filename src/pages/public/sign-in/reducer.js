import { combineReducers } from 'redux';

export const SET_INITIALIZED = 'SET_INITIALIZED';

const loginInitialState = {
  initialized: false,
  errorMessage: 'Something wrong',
  disabled: false,
  initialValues: {
    client: 'admin_application'
  }
};

function signInReducer (state = loginInitialState, action) {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, initialized: action.payload };
    default:
      return state;
  }
}

export default combineReducers({
  login: signInReducer
});


export function setInitialized (flag) {
  return {
    type: SET_INITIALIZED,
    payload: flag
  };
}
