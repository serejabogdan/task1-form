export const PRIVATE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    VALID_TOKEN: `${prefix}VALID_TOKEN`
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
    case PRIVATE.META: return { ...state, ...payload };
    case PRIVATE.CLEAR: return initial;
    default: return state;
  }
}

export function selector (state) {
  return state.root.pages.private;
}
