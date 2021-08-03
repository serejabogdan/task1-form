export const SET_INITIALIZED = 'SET_INITIALIZED';
export const SET_DISABLED = 'SET_DISABLED';

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

export function setInitialized (flag) {
  return {
    type: SET_INITIALIZED,
    payload: flag
  };
}

export function setDisabled (flag) {
  return {
    type: SET_DISABLED,
    payload: flag
  };
}

export default signInReducer;
