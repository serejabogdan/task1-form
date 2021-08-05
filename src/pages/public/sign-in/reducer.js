export const SAGA_SET_TOKEN = 'SAGA_SET_TOKEN';

const loginInitialState = {
  initialValues: {
    client: 'admin_application'
  },
};

function signInReducer (state = loginInitialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function getClient () {
  return state => state.root.pages.public.signin.initialValues.client;
}

export default signInReducer;
