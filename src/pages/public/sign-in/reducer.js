export const SET_TOKEN = 'SET_TOKEN';
export const ASYNC_SET_TOKEN = 'ASYNC_SET_TOKEN';

const loginInitialState = {
  initialValues: {
    client: 'admin_application'
  },
  accessToken: localStorage.getItem('token') || '',
};

function signInReducer (state = loginInitialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
}

export function asyncSetToken (data) {
  return {
    type: ASYNC_SET_TOKEN,
    payload: data
  };
}

export function setToken (token) {
  return {
    type: SET_TOKEN,
    payload: token
  };
}

export function getClient () {
  return state => state.root.pages.public.signin.initialValues.client;
}

export default signInReducer;
