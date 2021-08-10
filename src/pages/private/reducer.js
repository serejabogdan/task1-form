export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    VALID_TOKEN: `${prefix}VALID_TOKEN`,
    LOGOUT: `${prefix}LOGOUT`,
  };
})('@private/');

const initial = {
  initialized: false,
  errorMessage: '',
  disabled: false,
};

export default function privateReducer (state= initial, action) {
  const { type, payload } = action;
  switch (type) {
    case TYPE.META: return { ...state, ...payload };
    case TYPE.CLEAR: return initial;
    default: return state;
  }
}

export function selector (state) {
  return state.root.pages.private;
}
