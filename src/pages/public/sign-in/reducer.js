export const SAGA_SET_TOKEN = 'SAGA_SET_TOKEN';

const initial = {
  initialValues: {
    client: 'admin_application'
  },
};

function signInReducer (state = initial, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function selector (state) {
  return state.root.pages.public.signin;
}

export default signInReducer;
