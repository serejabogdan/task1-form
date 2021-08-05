export const SET_TOKEN = 'SET_TOKEN';
export const ASYNC_SET_TOKEN = 'ASYNC_SET_TOKEN';

const loginInitialState = {
  initialValues: {
    client: 'admin_application'
  },
};

function signInReducer (state = loginInitialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
}

export function actionCreator (type, payload) {
  return {
    type,
    payload
  };
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
