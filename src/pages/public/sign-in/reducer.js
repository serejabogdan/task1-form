export const SIGN_IN = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}/CLEAR`,
    //complex actions
    SET_TOKEN: `${prefix}SET_TOKEN`,
  };
})('@sign-in/');

const initial = {
  initialValues: {
    client: 'admin_application'
  },
  disabled: false
};

function signInReducer (state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN.META: return { ...state, ...payload };
    case SIGN_IN.CLEAR: return initial;
    default:
      return state;
  }
}

export function selector (state) {
  return state.root.pages.public.signin;
}

export default signInReducer;
