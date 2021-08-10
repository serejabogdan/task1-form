export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}/CLEAR`,
    //complex actions
    SIGN_IN: `${prefix}SIGN_IN`,
  };
})('@sign-in/');

const initial = {
  initialValues: {
    client: 'admin_application'
  },
  initialized: false,
  errorMessage: '',
  disabled: false,
};

function signInReducer (state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case TYPE.META: return { ...state, ...payload };
    case TYPE.CLEAR: return initial;
    default:
      return state;
  }
}

export function selector (state) {
  return state.root.pages.public.signin;
}

export default signInReducer;
