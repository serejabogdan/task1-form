export const META = 'META';
export const SAGA_SET_TOKEN = 'SAGA_SET_TOKEN';

const initial = {
  initialValues: {
    client: 'admin_application'
  },
  disabled: false
};

function signInReducer (state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case META: return { ...state, ...payload };
    default:
      return state;
  }
}

export function selector (state) {
  return state.root.pages.public.signin;
}

export default signInReducer;
